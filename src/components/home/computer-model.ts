import * as THREE from "three";
import { RoundedBoxGeometry } from "three/examples/jsm/geometries/RoundedBoxGeometry.js";

type Triple = [number, number, number];

function roundedRect(width: number, height: number, radius: number) {
  const path = new THREE.Shape();
  const x = -width / 2,
    y = -height / 2;
  path.moveTo(x + radius, y);
  path.lineTo(-x - radius, y);
  path.quadraticCurveTo(-x, y, -x, y + radius);
  path.lineTo(-x, -y - radius);
  path.quadraticCurveTo(-x, -y, -x - radius, -y);
  path.lineTo(x + radius, -y);
  path.quadraticCurveTo(x, -y, x, -y - radius);
  path.lineTo(x, y + radius);
  path.quadraticCurveTo(x, y, x + radius, y);
  return path;
}

function paintedTexture(
  width: number,
  height: number,
  paint: (ctx: CanvasRenderingContext2D) => void,
) {
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d")!;
  paint(ctx);
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 4;
  return texture;
}

function crtTexture() {
  return paintedTexture(768, 548, (ctx) => {
    const glow = ctx.createRadialGradient(360, 250, 24, 380, 255, 440);
    glow.addColorStop(0, "#293e36");
    glow.addColorStop(0.72, "#1b2b27");
    glow.addColorStop(1, "#101917");
    ctx.fillStyle = glow;
    ctx.fillRect(0, 0, 768, 548);
    ctx.font = "16px monospace";
    ctx.fillStyle = "#7f9b86";
    ctx.fillText("SN-OS  /  1.0", 43, 46);
    ctx.fillText("ONLINE", 663, 46);
    ctx.fillRect(644, 34, 9, 9);

    const face = [
      "00001111110000",
      "00110000001100",
      "01000000000010",
      "01001100110010",
      "10001100110001",
      "10000000000001",
      "10010000001001",
      "10001111110001",
      "01000000000010",
      "00110000001100",
      "00001111110000",
    ];
    ctx.fillStyle = "#a8d9aa";
    ctx.shadowBlur = 8;
    ctx.shadowColor = "#80e4a77a";
    face.forEach((row, y) =>
      [...row].forEach((pixel, x) => {
        if (pixel === "1") ctx.fillRect(251 + x * 19, 97 + y * 19, 19, 19);
      }),
    );
    ctx.font = "bold 48px monospace";
    ctx.textAlign = "center";
    ctx.fillText("hello, world_", 384, 395);
    ctx.shadowBlur = 0;
    ctx.fillStyle = "#93b09a";
    ctx.font = "15px monospace";
    ctx.fillText("SYSTEM READY", 384, 460);
    for (let y = 0; y < 548; y += 4) {
      ctx.fillStyle = "rgba(9,20,15,.17)";
      ctx.fillRect(0, y, 768, 1);
    }
    const reflection = ctx.createLinearGradient(0, 0, 600, 480);
    reflection.addColorStop(0, "rgba(235,255,240,.11)");
    reflection.addColorStop(0.45, "rgba(235,255,240,.02)");
    reflection.addColorStop(1, "rgba(235,255,240,0)");
    ctx.fillStyle = reflection;
    ctx.fillRect(0, 0, 768, 548);
  });
}

export function createComputer() {
  const monitor = new THREE.Group();
  const material = (color: string, roughness = 0.5) =>
    new THREE.MeshStandardMaterial({ color, roughness });
  const orange = new THREE.MeshPhysicalMaterial({
      color: "#ee5c22",
      roughness: 0.36,
      metalness: 0.045,
      clearcoat: 0.44,
      clearcoatRoughness: 0.24,
    }),
    orangeDark = material("#9e411c"),
    cream = material("#dfd9c6");
  const trim = material("#bab5a5"),
    keys = material("#f1eddf"),
    graphite = material("#393a35");
  const well = material("#292923"),
    slot = material("#514f45"),
    vent = material("#933d1c");
  const black = material("#1d211e"),
    mint = new THREE.MeshBasicMaterial({ color: "#a2d98c" });
  const geometries = new Map<string, THREE.BufferGeometry>();

  function box(
    parent: THREE.Object3D,
    dimensions: Triple,
    position: Triple,
    mat: THREE.Material,
    radius = 0.03,
  ) {
    const key = dimensions.join(",") + "/" + radius;
    if (!geometries.has(key)) {
      geometries.set(
        key,
        radius
          ? new RoundedBoxGeometry(...dimensions, 2, radius)
          : new THREE.BoxGeometry(...dimensions),
      );
    }
    const mesh = new THREE.Mesh(geometries.get(key), mat);
    mesh.position.set(...position);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    parent.add(mesh);
    return mesh;
  }

  function facePanel(
    w: number,
    h: number,
    depth: number,
    radius: number,
    bevel: number,
    pos: Triple,
    mat: THREE.Material,
  ) {
    const geo = new THREE.ExtrudeGeometry(roundedRect(w, h, radius), {
      depth,
      bevelEnabled: true,
      bevelThickness: bevel,
      bevelSize: bevel,
      bevelSegments: 5,
      curveSegments: 12,
    });
    const mesh = new THREE.Mesh(geo, mat);
    mesh.position.set(...pos);
    mesh.castShadow = mesh.receiveShadow = true;
    monitor.add(mesh);
  }

  function label(
    parent: THREE.Object3D,
    text: string,
    pos: Triple,
    w: number,
    h: number,
    bg: string,
    ink: string,
  ) {
    const texture = paintedTexture(512, 96, (ctx) => {
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, 512, 96);
      ctx.font = "bold 59px monospace";
      ctx.fillStyle = ink;
      ctx.textBaseline = "middle";
      ctx.fillText(text, 25, 51, 467);
    });
    const plate = new THREE.Mesh(
      new THREE.PlaneGeometry(w, h),
      new THREE.MeshBasicMaterial({ map: texture }),
    );
    plate.position.set(...pos);
    parent.add(plate);
  }

  // A ventilated CRT housing, seam, recessed bezel and curved phosphor glass.
  box(monitor, [2.74, 2.06, 1.82], [0, 1.89, -0.23], orange, 0.2);
  box(monitor, [2.8, 2.12, 0.15], [0, 1.89, 0.55], orangeDark, 0.07);
  box(monitor, [2.85, 2.17, 0.55], [0, 1.89, 0.76], orange, 0.17);
  facePanel(2.45, 1.72, 0.035, 0.19, 0.075, [0, 1.97, 1.005], orangeDark);
  facePanel(2.31, 1.61, 0.055, 0.16, 0.05, [0, 1.97, 1.065], graphite);
  facePanel(2.17, 1.49, 0.042, 0.16, 0.048, [0, 1.97, 1.12], black);
  const screenGeometry = new THREE.ShapeGeometry(
    roundedRect(2.14, 1.46, 0.16),
    20,
  );
  const points = screenGeometry.getAttribute("position");
  const uv = screenGeometry.getAttribute("uv");
  for (let i = 0; i < points.count; i++)
    uv.setXY(i, points.getX(i) / 2.14 + 0.5, points.getY(i) / 1.46 + 0.5);
  const glass = new THREE.Mesh(
    screenGeometry,
    new THREE.MeshBasicMaterial({ map: crtTexture() }),
  );
  glass.position.set(0, 1.97, 1.218);
  monitor.add(glass);
  // Inset grille slots on both sides and a row across the lid.
  for (let i = 0; i < 14; i++) {
    const z = -0.91 + i * 0.088;
    for (const side of [-1, 1])
      box(monitor, [0.018, 0.63, 0.044], [side * 1.37, 2.16, z], vent, 0.008);
  }
  for (let i = 0; i < 21; i++)
    box(
      monitor,
      [0.041, 0.014, 0.49],
      [-0.98 + i * 0.095, 2.922, -0.55],
      vent,
      0.007,
    );
  for (const side of [-1, 1]) {
    for (const z of [-0.85, 0.25]) {
      const screw = new THREE.Mesh(
        new THREE.CylinderGeometry(0.027, 0.027, 0.018, 12),
        orangeDark,
      );
      screw.rotation.z = Math.PI / 2;
      screw.position.set(side * 1.37, 1.23, z);
      monitor.add(screw);
    }
  }
  label(
    monitor,
    "STUDIO TERMINAL",
    [-0.77, 0.98, 1.04],
    0.68,
    0.075,
    "#d95a20",
    "#442518",
  );
  box(monitor, [0.075, 0.032, 0.021], [1.13, 0.99, 1.04], mint, 0.009);
  const drive = new THREE.Group();
  // The separate disk unit and its rubber feet.
  box(drive, [2.24, 0.12, 1.48], [0, 0.81, -0.01], graphite, 0.055);
  box(drive, [2.89, 0.49, 1.98], [0, 0.52, 0.01], cream, 0.11);
  box(drive, [2.8, 0.13, 1.91], [0, 0.261, 0.015], trim, 0.046);
  for (const x of [-1.08, 1.08])
    for (const z of [-0.72, 0.76])
      box(drive, [0.36, 0.15, 0.26], [x, 0.145, z], graphite, 0.035);
  box(drive, [1.19, 0.18, 0.035], [0.6, 0.55, 1.015], trim, 0.025);
  box(drive, [1.02, 0.055, 0.03], [0.58, 0.56, 1.044], well, 0.013);
  box(drive, [0.14, 0.043, 0.045], [1.07, 0.458, 1.045], graphite, 0.006);
  label(
    drive,
    "SN / 01",
    [-0.99, 0.54, 1.012],
    0.46,
    0.088,
    "#d7d3c2",
    "#353730",
  );
  for (let i = 0; i < 4; i++)
    box(
      drive,
      [0.041, 0.093, 0.018],
      [-1.29 + i * 0.044, 0.54, 1.011],
      [orange, orangeDark, trim, graphite][i],
      0.001,
    );
  for (let i = 0; i < 9; i++)
    box(
      drive,
      [0.012, 0.17, 0.043],
      [1.446, 0.54, -0.65 + i * 0.1],
      slot,
      0.006,
    );
  // Connector plate, exhaust and cable strain relief at the back.
  box(monitor, [1.73, 1.25, 0.06], [0, 1.88, -1.14], orangeDark, 0.08);
  for (let i = 0; i < 10; i++)
    box(
      monitor,
      [1.22, 0.04, 0.035],
      [0, 1.53 + i * 0.082, -1.183],
      well,
      0.012,
    );
  box(drive, [0.76, 0.2, 0.055], [-0.65, 0.52, -0.993], graphite);
  // Separate keyboard with sculpted caps and individually printed legends.
  const keyboard = new THREE.Group();
  keyboard.position.set(-0.18, 0.15, 1.96);
  keyboard.rotation.x = 0.105;
  keyboard.rotation.y = -0.045;

  box(keyboard, [2.81, 0.19, 1.04], [0, 0, 0], cream, 0.09);
  box(keyboard, [2.59, 0.065, 0.82], [0, 0.098, -0.006], slot, 0.044);
  const layouts = [
    "1234567890-=",
    "QWERTYUIOP[]",
    "ASDFGHJKL;'↵",
    "ZXCVBNM,./↑↓",
  ];
  const legends = paintedTexture(1024, 512, (ctx) => {
    ctx.clearRect(0, 0, 1024, 512);
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillStyle = "#45453e";
    ctx.font = "bold 21px monospace";
    layouts.forEach((row, ri) =>
      [...row].forEach((char, ci) =>
        ctx.fillText(char, ((ci + 0.5) * 1024) / 12, ((ri + 0.5) * 512) / 4),
      ),
    );
  });
  layouts.forEach((row, ri) =>
    [...row].forEach((_, ci) => {
      const x = (ci - 5.5) * 0.211,
        z = -0.302 + ri * 0.152;
      const cap =
        (ri === 0 && ci === 0) || (ri === 2 && ci === 11)
          ? orange
          : ci === 11 || (ri === 3 && ci > 8)
            ? trim
            : keys;
      box(keyboard, [0.189, 0.075, 0.133], [x, 0.162, z], cap, 0.017);
    }),
  );
  const print = new THREE.Mesh(
    new THREE.PlaneGeometry(2.532, 0.608),
    new THREE.MeshBasicMaterial({
      map: legends,
      transparent: true,
      depthWrite: false,
    }),
  );
  print.rotation.x = -Math.PI / 2;
  print.position.set(0, 0.201, -0.074);
  keyboard.add(print);
  for (const [x, width, mat] of [
    [-1.07, 0.33, trim],
    [-0.79, 0.18, keys],
    [0, 1.32, keys],
    [0.83, 0.25, trim],
    [1.13, 0.22, orange],
  ] as const) {
    box(keyboard, [width, 0.075, 0.13], [x, 0.162, 0.317], mat, 0.017);
  }
  const cablePoints: THREE.Vector3[] = [];
  const addPoint = (x: number, y: number, z: number) =>
    cablePoints.push(new THREE.Vector3(x, y, z));
  addPoint(1.02, 0.19, 1.53);
  addPoint(1.4, 0.12, 1.49);
  for (let i = 0; i <= 126; i++) {
    const t = i / 126,
      a = t * Math.PI * 2 * 9;
    addPoint(
      1.61 + 0.47 * t + 0.071 * Math.cos(a),
      0.123 + 0.065 * Math.sin(a),
      1.41 - t * 0.78 + 0.043 * Math.cos(a),
    );
  }
  addPoint(2.08, 0.11, 0.39);
  addPoint(1.98, 0.105, -0.14);
  addPoint(1.62, 0.11, -0.54);
  addPoint(1.38, 0.45, -0.63);
  const cable = new THREE.Mesh(
    new THREE.TubeGeometry(
      new THREE.CatmullRomCurve3(cablePoints),
      330,
      0.023,
      8,
      false,
    ),
    graphite,
  );
  cable.castShadow = true;

  return { monitor, drive, keyboard, cable };
}
