import * as THREE from "three";
import { RoundedBoxGeometry } from "three/examples/jsm/geometries/RoundedBoxGeometry.js";

function block(
  parent: THREE.Group,
  size: [number, number, number],
  position: [number, number, number],
  color: string,
  radius: number,
  metalness = 0,
) {
  const mesh = new THREE.Mesh(
    new RoundedBoxGeometry(...size, 2, radius),
    new THREE.MeshStandardMaterial({
      color,
      metalness,
      roughness: metalness ? 0.27 : 0.38,
    }),
  );
  mesh.position.set(...position);
  parent.add(mesh);
}

function printLabel(
  parent: THREE.Group,
  width: number,
  height: number,
  y: number,
  z: number,
  paint: (c: CanvasRenderingContext2D) => void,
) {
  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 240;
  paint(canvas.getContext("2d")!);
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 4;
  const label = new THREE.Mesh(
    new THREE.PlaneGeometry(width, height),
    new THREE.MeshStandardMaterial({ map: texture, roughness: 0.66 }),
  );
  label.position.set(0, y, z);
  parent.add(label);
  return label;
}

export function studioAccessories() {
  const disk = new THREE.Group();
  block(disk, [1.09, 1.12, 0.09], [0, 0, 0], "#8971bd", 0.045);
  block(
    disk,
    [0.72, 0.32, 0.055],
    [-0.045, 0.36, 0.047],
    "#d9dbe3",
    0.018,
    0.9,
  );
  block(disk, [0.12, 0.22, 0.014], [0.14, 0.36, 0.081], "#31303b", 0.009);
  for (const x of [-0.44, 0.44])
    block(disk, [0.087, 0.087, 0.014], [x, -0.435, 0.052], "#302c3c", 0.012);
  printLabel(disk, 0.8, 0.49, -0.16, 0.051, (c) => {
    c.fillStyle = "#f5eacb";
    c.fillRect(0, 0, 512, 240);
    c.fillStyle = "#fd6d31";
    c.fillRect(0, 0, 512, 28);
    c.fillStyle = "#383836";
    c.font = "bold 53px monospace";
    c.fillText("STUDIO", 29, 102);
    c.font = "25px monospace";
    c.fillText("ARCHIVE / SN", 30, 145);
    c.fillRect(28, 173, 447, 2);
    c.fillRect(28, 199, 447, 2);
  });

  const escapeKey = new THREE.Group();
  block(escapeKey, [0.52, 0.47, 0.26], [0, 0, 0], "#4d465f", 0.055);
  block(escapeKey, [0.45, 0.4, 0.13], [0, 0.018, 0.14], "#b7a5e1", 0.05);
  printLabel(escapeKey, 0.31, 0.17, 0.028, 0.207, (c) => {
    c.fillStyle = "#b7a5e1";
    c.fillRect(0, 0, 512, 240);
    c.fillStyle = "#322d3d";
    c.font = "bold 142px monospace";
    c.fillText("esc", 105, 171);
  });

  const screw = new THREE.Group();
  const metal = new THREE.MeshStandardMaterial({
    color: "#d6d2e6",
    metalness: 0.91,
    roughness: 0.23,
  });
  const shaft = new THREE.Mesh(
    new THREE.CylinderGeometry(0.082, 0.061, 0.38, 20),
    metal,
  );
  screw.add(shaft);
  const head = new THREE.Mesh(
    new THREE.CylinderGeometry(0.15, 0.12, 0.085, 28),
    metal,
  );
  head.position.y = 0.21;
  screw.add(head);
  block(screw, [0.18, 0.008, 0.026], [0, 0.256, 0], "#4b4758", 0.003);
  for (let i = 0; i < 6; i++) {
    const thread = new THREE.Mesh(
      new THREE.TorusGeometry(0.076, 0.012, 5, 20),
      metal,
    );
    thread.position.y = -0.14 + i * 0.047;
    thread.rotation.x = 1.46;
    screw.add(thread);
  }
  return { disk, escapeKey, screw };
}
