import * as THREE from "three";
import { mergeGeometries } from "three/examples/jsm/utils/BufferGeometryUtils.js";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";
import { createComputer } from "./computer-model";
import { studioAccessories } from "./studio-accessories";

type Point = [number, number, number];
const orbitDurationSeconds = 60;

// Batch each moving assembly separately so the keyboard, drive and display can travel independently.
function batchPart(
  source: THREE.Object3D,
  pivot: Point,
  originals: Set<THREE.BufferGeometry>,
) {
  source.updateMatrixWorld(true);
  const batches = new Map<THREE.Material, THREE.BufferGeometry[]>();
  source.traverse((node) => {
    if (!(node instanceof THREE.Mesh)) return;
    const geometry = node.geometry.index
      ? node.geometry.toNonIndexed()
      : node.geometry.clone();
    geometry.applyMatrix4(node.matrixWorld);
    geometry.translate(-pivot[0], -pivot[1], -pivot[2]);
    if (!batches.has(node.material)) batches.set(node.material, []);
    batches.get(node.material)!.push(geometry);
    originals.add(node.geometry);
  });
  const group = new THREE.Group();
  group.position.set(...pivot);
  batches.forEach((shapes, material) => {
    group.add(new THREE.Mesh(mergeGeometries(shapes), material));
    shapes.forEach((shape) => shape.dispose());
  });
  return group;
}

export function mountComputer(canvas: HTMLCanvasElement, context: WebGL2RenderingContext) {
  const renderer = new THREE.WebGLRenderer({ canvas, context });
  renderer.setPixelRatio(
    Math.min(window.devicePixelRatio, canvas.clientWidth < 640 ? 1.25 : 1.5),
  );
  renderer.setClearColor(0x000000, 0);
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.01;
  const scene = new THREE.Scene();
  const studio = new RoomEnvironment();
  const pmrem = new THREE.PMREMGenerator(renderer);
  const environment = pmrem.fromScene(studio, 0.045);
  scene.environment = environment.texture;
  scene.environmentIntensity = 0.54;
  studio.dispose();
  pmrem.dispose();

  const camera = new THREE.PerspectiveCamera(29, 1, 0.1, 60);
  const root = new THREE.Group();
  scene.add(root);
  const raw = createComputer();
  const originals = new Set<THREE.BufferGeometry>();
  const monitor = batchPart(raw.monitor, [0, 1.91, 0], originals);
  const drive = batchPart(raw.drive, [0, 0.5, 0], originals);
  const keyboard = batchPart(raw.keyboard, [-0.18, 0.15, 1.96], originals);
  const cable = batchPart(raw.cable, [1.65, 0.15, 0.75], originals);
  originals.forEach((g) => g.dispose());
  root.add(monitor, drive, keyboard, cable);
  const { disk, escapeKey, screw } = studioAccessories();
  root.add(disk, escapeKey, screw);
  scene.add(new THREE.HemisphereLight(0xe2dfff, 0x52405c, 0.64));
  const key = new THREE.DirectionalLight(0xffe4d1, 2.05);
  key.position.set(-3, 6, 6);
  const rim = new THREE.DirectionalLight(0xc4a9ff, 2.35);
  rim.position.set(4, 4, -4);
  const bounce = new THREE.DirectionalLight(0x9acbd2, 0.85);
  bounce.position.set(5, -1, 3);
  scene.add(key, rim, bounce);

  let distance = 10,
    progress = 0,
    pointerX = 0,
    pointerY = 0,
    time = 0;
  const target = new THREE.Vector3();
  function draw() {
    const spread = THREE.MathUtils.smoothstep(progress, 0.12, 0.91);
    const phase = ((time % orbitDurationSeconds) / orbitDurationSeconds) * 2 * Math.PI;
    const wave = Math.sin(phase * 2);
    monitor.position.set(-spread * 0.36, 1.94 + spread * 0.77, spread * -0.14);
    monitor.rotation.set(
      0.025 - spread * 0.1,
      spread * -0.27,
      0.015 + spread * 0.1,
    );
    drive.position.set(spread * 0.13, 0.43 - spread * 0.28, spread * 0.18);
    drive.rotation.set(-0.012, spread * 0.13, -spread * 0.067);
    keyboard.position.set(
      -0.18 + spread * 0.4,
      0.09 - spread * 0.37,
      1.96 + spread * 0.6,
    );
    keyboard.rotation.set(spread * 0.23, spread * -0.23, spread * -0.12);
    cable.scale.setScalar(1 - THREE.MathUtils.smoothstep(progress, 0.06, 0.45));
    cable.visible = cable.scale.x > 0.015;
    root.rotation.z = 0.075 + wave * 0.012 - spread * 0.19;
    root.position.y = wave * 0.047;
    disk.position.set(
      1.92 + spread * 0.95,
      3.29 + wave * 0.105 + spread * 0.1,
      -0.95,
    );
    disk.rotation.set(
      -0.24 + wave * 0.045,
      0.12 + spread * 1.65,
      -0.33 + spread * 0.58,
    );
    escapeKey.position.set(
      -1.85 - spread * 0.55,
      0.45 + wave * 0.07,
      1.76 + spread * 0.34,
    );
    escapeKey.rotation.set(
      -0.7 + spread * 0.52,
      0.4 + spread * 1.3,
      0.33 + wave * 0.04,
    );
    screw.position.set(-1.69 - spread * 0.46, 2.66 - wave * 0.085, -0.34);
    screw.rotation.set(0.73 + spread * 0.55, 0.21 + phase, -0.84);
    const angle = 0.56 + phase + pointerX * 0.1 - spread * 1.32;
    const height = THREE.MathUtils.clamp(
      0.29 + pointerY * 0.048 + spread * 0.16,
      -0.16,
      1.13,
    );
    const radius =
      distance * (1 + 0.21 * spread - 0.13 * Math.sin(Math.PI * spread));
    target.set(0.05, 1.52 + spread * 0.11, 0.47);
    camera.position
      .set(
        Math.sin(angle) * Math.cos(height),
        Math.sin(height),
        Math.cos(angle) * Math.cos(height),
      )
      .multiplyScalar(radius)
      .add(target);
    camera.lookAt(target);
    renderer.render(scene, camera);
  }
  function resize() {
    const width = canvas.clientWidth,
      height = canvas.clientHeight;
    if (!width || !height) return;
    camera.aspect = width / height;
    // Leave room for the disk arcing above the screen and the keyboard advancing toward the camera.
    const visibleHeight = Math.max(6.9, 8.6 / camera.aspect);
    distance =
      visibleHeight / (2 * Math.tan(THREE.MathUtils.degToRad(camera.fov / 2)));
    camera.updateProjectionMatrix();
    renderer.setSize(width, height, false);
    draw();
  }
  resize();
  const observer = new ResizeObserver(resize);
  observer.observe(canvas);
  let previousFrame = 0, slowFrames = 0;
  return {
    setPose(scroll: number, x: number, y: number, seconds: number) {
      const now = performance.now();
      const interval = now - previousFrame;
      previousFrame = now;
      slowFrames = interval > 65 && interval < 1000 ? slowFrames + 1 : 0;
      if (slowFrames >= 8 && renderer.getPixelRatio() > 0.85) {
        renderer.setPixelRatio(Math.max(0.85, renderer.getPixelRatio() * 0.8));
        slowFrames = 0;
      }
      progress = scroll;
      pointerX = x;
      pointerY = y;
      time = seconds;
      draw();
    },
    dispose() {
      observer.disconnect();
      const materials = new Set<THREE.Material>();
      scene.traverse((node) => {
        if (node instanceof THREE.Mesh) {
          node.geometry.dispose();
          materials.add(node.material);
        }
      });
      materials.forEach((mat) => {
        if ("map" in mat && mat.map instanceof THREE.Texture) mat.map.dispose();
        mat.dispose();
      });
      environment.dispose();
      renderer.dispose();
    },
  };
}
