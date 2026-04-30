// gameplay/babylonTraversal.js

import { getCamYaw }                    from '../engine/babylon/camera.js';
import { getWorld, getRapier }          from '../engine/babylon/physics.js';
import { getPlayerBody, getPlayerRoot } from './babylonPlayerCharacter.js';
import { getTerrainHeight }             from '../world/babylonTerrain.js';
import { CONFIG }                       from '../core/config.js';

const _keys = new Set();
const _state = {
  stamina:      CONFIG.stamina.max,
  isGrounded:   false,
  regenDelay:   0,
  jumpCooldown: 0,
  // Y cible lissé pour éviter les oscillations
  smoothY:      null,
};

// ── Grounded : raycast depuis le bas de la capsule ────────────────────────
function _checkGrounded(body) {
  const world  = getWorld();
  const rapier = getRapier();
  if (!world || !rapier) return true;

  const t       = body.translation();
  const bottomY = t.y - CONFIG.player.height / 2;

  const ray = new rapier.Ray(
    { x: t.x, y: bottomY + 0.08, z: t.z },
    { x: 0,   y: -1,              z: 0   },
  );
  return world.castRay(ray, 0.18, true) !== null;
}

// ── Input ─────────────────────────────────────────────────────────────────
export function initTraversalInput() {
  window.addEventListener('keydown', e => {
    _keys.add(e.code);
    if (e.code === 'Space') e.preventDefault();
  });
  window.addEventListener('keyup', e => _keys.delete(e.code));
}

function _isKey(...codes) { return codes.some(c => _keys.has(c)); }

// ── Update ────────────────────────────────────────────────────────────────
export function updateTraversal(dt) {
  const body = getPlayerBody();
  if (!body) return { stamina: _state.stamina, isGrounded: _state.isGrounded };

  const cfg    = CONFIG.player;
  const staCfg = CONFIG.stamina;

  // Direction caméra
  const yaw  = getCamYaw();
  const fwdX = -Math.sin(yaw);
  const fwdZ = -Math.cos(yaw);
  const rgtX =  Math.cos(yaw);
  const rgtZ = -Math.sin(yaw);

  let moveX = 0, moveZ = 0;
  if (_isKey('KeyW','ArrowUp','KeyZ'))   { moveX += fwdX; moveZ += fwdZ; }
  if (_isKey('KeyS','ArrowDown'))        { moveX -= fwdX; moveZ -= fwdZ; }
  if (_isKey('KeyD','ArrowRight'))       { moveX += rgtX; moveZ += rgtZ; }
  if (_isKey('KeyA','ArrowLeft','KeyQ')) { moveX -= rgtX; moveZ -= rgtZ; }

  const moving = moveX !== 0 || moveZ !== 0;
  const sprint = _isKey('ShiftLeft','ShiftRight') && moving && _state.stamina > 0;
  const speed  = sprint ? cfg.sprintSpeed : cfg.walkSpeed;

  // Stamina
  if (sprint) {
    _state.stamina    = Math.max(0, _state.stamina - staCfg.drainSprint * dt);
    _state.regenDelay = staCfg.regenDelay;
  } else {
    _state.regenDelay = Math.max(0, _state.regenDelay - dt);
    if (_state.regenDelay <= 0)
      _state.stamina = Math.min(staCfg.max, _state.stamina + staCfg.regen * dt);
  }

  // Grounded
  _state.isGrounded = _checkGrounded(body);
  if (_state.jumpCooldown > 0) {
    _state.jumpCooldown -= dt;
    _state.isGrounded    = false;
  }

  const vel = body.linvel();
  const t   = body.translation();

  // ── Horizontal ────────────────────────────────────────────────────────────
  let vx, vz;
  if (moving) {
    const len = Math.sqrt(moveX * moveX + moveZ * moveZ);
    vx = (moveX / len) * speed;
    vz = (moveZ / len) * speed;
  } else {
    // En l'air ou montée : friction très légère — préserve l'impulsion du dodge/saut
    vx = vel.x * 0.97;
    vz = vel.z * 0.97;
  }

  // ── Vertical — coller au terrain quand au sol ─────────────────────────────
  let vy = vel.y;

  if (_isKey('Space') && _state.isGrounded && _state.stamina >= staCfg.drainJump) {
    vy = cfg.jumpSpeed;
    _state.stamina     -= staCfg.drainJump;
    _state.regenDelay   = staCfg.regenDelay;
    _state.jumpCooldown = 0.55;  // assez long pour quitter le sol sans le re-détecter
    _state.smoothY      = null; // reset smooth au saut
  } else if (_state.isGrounded && vel.y <= 0.1) {
    // Au sol et pas en train de monter : coller au terrain.
    // La friction forte ne doit s'appliquer qu'a l'arret,
    // sinon on annule presque tout mouvement clavier.
    if (!moving) {
      vx = vel.x * 0.55;
      vz = vel.z * 0.55;
      if (Math.abs(vx) < 0.02) vx = 0;
      if (Math.abs(vz) < 0.02) vz = 0;
    }
    const terrainY = getTerrainHeight(t.x, t.z);
    const targetY  = terrainY + cfg.height / 2;
    if (_state.smoothY === null) _state.smoothY = t.y;
    _state.smoothY += (targetY - _state.smoothY) * Math.min(20 * dt, 1);
    body.setTranslation({ x: t.x, y: _state.smoothY, z: t.z }, true);
    vy = 0;
  } else {
    _state.smoothY = null;
    // Glide
    if (_isKey('Space') && vy < 0)
      vy = Math.max(vy, cfg.glideFallSpeed);
  }

  body.setLinvel({ x: vx, y: vy, z: vz }, true);

  // Orientation mesh
  const root = getPlayerRoot();
  if (root && moving) {
    const targetAngle = Math.atan2(moveX, moveZ);
    const diff = ((targetAngle - root.rotation.y + Math.PI * 3) % (Math.PI * 2)) - Math.PI;
    root.rotation.y += diff * Math.min(14 * dt, 1);
  }

  return { stamina: _state.stamina, isGrounded: _state.isGrounded };
}

export function getStamina()  { return _state.stamina;    }
export function setStamina(v) { _state.stamina = Math.max(0, Math.min(CONFIG.stamina.max, v)); }
export function isGrounded()  { return _state.isGrounded; }
