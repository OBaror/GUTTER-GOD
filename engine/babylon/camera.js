// engine/babylon/camera.js — caméra third-person anti-clip

import { UniversalCamera, Vector3 } from '@babylonjs/core';
import { getWorld, getRapier }       from './physics.js';
import { CONFIG }                    from '../../core/config.js';

let _camera = null;

const _cam = {
  yaw:    0,
  pitch:  0.45,
  radius: CONFIG.camera.radius,
  target: new Vector3(0, 0, 0),
  locked: false,
};

// Limites pitch : pas trop bas (évite de voir sous le sol), pas trop haut
const PITCH_MIN  = 0.18;
const PITCH_MAX  = 1.30;
const MOUSE_SENS = 0.0025;
const RADIUS_MIN = 1.5;   // jamais moins de 1.5u même si terrain bloque
const RADIUS_MAX = CONFIG.camera.radiusMax;

export function initCamera(scene, canvas) {
  _camera = new UniversalCamera('cam', new Vector3(0, 5, -10), scene);
  _camera.minZ = 0.15;
  _camera.maxZ = 600;
  _camera.fov  = 1.05;
  _camera.inputs.clear(); // contrôles 100% manuels

  // ── Pointer lock ──────────────────────────────────────────────────────────
  canvas.addEventListener('click', () => {
    if (!_cam.locked) canvas.requestPointerLock();
    // Si déjà locké, le clic est géré par babylonCombat.js (mousedown)
  });
  document.addEventListener('pointerlockchange', () => {
    _cam.locked = document.pointerLockElement === canvas;
  });

  // ── Souris ────────────────────────────────────────────────────────────────
  document.addEventListener('mousemove', e => {
    if (!_cam.locked) return;
    _cam.yaw   += e.movementX * MOUSE_SENS;
    _cam.pitch  = Math.max(PITCH_MIN, Math.min(PITCH_MAX,
                    _cam.pitch + e.movementY * MOUSE_SENS));
  });

  // ── Molette zoom ──────────────────────────────────────────────────────────
  canvas.addEventListener('wheel', e => {
    _cam.radius = Math.max(RADIUS_MIN, Math.min(RADIUS_MAX,
                    _cam.radius + e.deltaY * 0.008));
  }, { passive: true });

  // Bloquer clic molette (button=1) — évite scroll auto navigateur
  canvas.addEventListener('mousedown', e => { if (e.button === 1) e.preventDefault(); });
  canvas.addEventListener('auxclick',  e => e.preventDefault());

  return _camera;
}

export function getCamera()  { return _camera; }
export function getCamYaw()  { return _cam.yaw; }

export function setCameraTarget(pos) {
  _cam.target.copyFrom(pos);
}

export function updateCamera(playerPos, dt) {
  if (!_camera || !playerPos) return;

  // ── Suivi smooth de la cible ──────────────────────────────────────────────
  const tx = playerPos.x;
  const ty = playerPos.y + CONFIG.camera.heightOffset;
  const tz = playerPos.z;
  const sp = Math.min(CONFIG.camera.followSpeed * dt, 1);
  _cam.target.x += (tx - _cam.target.x) * sp;
  _cam.target.y += (ty - _cam.target.y) * sp;
  _cam.target.z += (tz - _cam.target.z) * sp;

  // ── Direction caméra → derrière le joueur ────────────────────────────────
  const cp = Math.cos(_cam.pitch);
  const sp2 = Math.sin(_cam.pitch);
  const cy = Math.cos(_cam.yaw);
  const sy = Math.sin(_cam.yaw);

  // Vecteur de la cible vers la caméra (direction opposée au regard)
  const dirX =  sy * cp;
  const dirY =  sp2;
  const dirZ =  cy * cp;

  // ── Anti-clip Rapier : raycast cible → position caméra idéale ────────────
  let safeRadius = _cam.radius;
  const world  = getWorld();
  const rapier = getRapier();

  if (world && rapier) {
    const ray = new rapier.Ray(
      { x: _cam.target.x, y: _cam.target.y, z: _cam.target.z },
      { x: dirX, y: dirY, z: dirZ },
    );
    const hit = world.castRay(ray, _cam.radius, true);
    if (hit !== null) {
      // Reculer la caméra juste avant l'obstacle, minimum RADIUS_MIN
      safeRadius = Math.max(RADIUS_MIN, hit.toi - 0.25);
    }
  }

  // ── Position finale ───────────────────────────────────────────────────────
  _camera.position.set(
    _cam.target.x + dirX * safeRadius,
    _cam.target.y + dirY * safeRadius,
    _cam.target.z + dirZ * safeRadius,
  );

  _camera.setTarget(_cam.target);
}
