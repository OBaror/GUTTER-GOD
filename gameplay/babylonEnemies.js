// gameplay/babylonEnemies.js

import { Vector3, MeshBuilder, StandardMaterial, Color3, DynamicTexture } from '@babylonjs/core';
import { createDynamicCapsule, getWorld } from '../engine/babylon/physics.js';
import { getPlayerRoot }   from './babylonPlayerCharacter.js';
import { getTerrainHeight } from '../world/babylonTerrain.js';
import { takeDamage }      from './babylonPlayerHealth.js';
import { Events }          from '../core/events.js';
import { CONFIG }          from '../core/config.js';

// Apparence par type
const TYPE_DEF = {
  scout:   { color: new Color3(0.85, 0.15, 0.15), h: 1.6, r: 0.32, label: 'Scout'   },
  armored: { color: new Color3(0.20, 0.20, 0.80), h: 1.9, r: 0.38, label: 'Armored' },
  elite:   { color: new Color3(0.85, 0.65, 0.05), h: 2.0, r: 0.40, label: 'Elite'   },
  mutant:  { color: new Color3(0.15, 0.70, 0.25), h: 1.8, r: 0.36, label: 'Mutant'  },
};

const _enemies = [];

// ── Spawn ──────────────────────────────────────────────────────────────────

export function spawnEnemy(type, position, scene) {
  const cfg = CONFIG.enemies[type];
  const def = TYPE_DEF[type];
  if (!cfg || !def) return null;

  // Corps
  const root = MeshBuilder.CreateCapsule(`e_${type}_${_enemies.length}`, {
    radius: def.r, height: def.h, subdivisions: 2, tessellation: 8,
  }, scene);
  const mat = new StandardMaterial(`em_${_enemies.length}`, scene);
  mat.diffuseColor  = def.color;
  mat.specularColor = Color3.Black();
  root.material     = mat;
  root.position.copyFrom(position);
  root.isPickable   = false;

  // Indicateur directionnel (triangle devant)
  const arrow = MeshBuilder.CreateCylinder(`ea_${_enemies.length}`, {
    height: 0.3, diameterTop: 0, diameterBottom: 0.25, tessellation: 3,
  }, scene);
  arrow.parent    = root;
  arrow.position  = new Vector3(0, def.h * 0.3, def.r + 0.05);
  arrow.rotation.x = Math.PI / 2;
  const arrowMat  = new StandardMaterial(`eam_${_enemies.length}`, scene);
  arrowMat.emissiveColor = new Color3(1, 1, 0);
  arrow.material  = arrowMat;
  arrow.isPickable = false;

  // Barre HP au-dessus
  const hpBar = _createHpBar(scene, def.h);
  hpBar.parent = root;

  // Corps physique
  const halfH = def.h / 2 - def.r;
  const body  = createDynamicCapsule(position.x, position.y, position.z, def.r, halfH);

  const enemy = {
    type, root, body, hpBar,
    hp: cfg.hp, maxHp: cfg.hp,
    speed: cfg.speed, xp: cfg.xp,
    detectRange: cfg.detectRange,
    attackRange: cfg.attackRange,
    damage: cfg.damage,
    isAlive: true,
    state: 'patrol',
    patrolOrigin: position.clone(),
    patrolTimer: 0, patrolTarget: null,
    attackTimer: 0, telegraphTimer: 0,
    aiTimer: Math.random() * 0.1,
    halfH,
    radius: def.r,   // stocker le radius pour la sync mesh
  };

  enemy.takeDamage = (amt) => _hit(enemy, amt);
  _enemies.push(enemy);
  return enemy;
}

function _createHpBar(scene, enemyHeight) {
  const bar = MeshBuilder.CreatePlane('hpbar', { width: 1.0, height: 0.12 }, scene);
  bar.position.y   = enemyHeight * 0.6 + 0.3;
  bar.billboardMode = 7; // face caméra
  bar.isPickable    = false;

  const tex = new DynamicTexture('hptex', { width: 128, height: 16 }, scene);
  _drawHpBar(tex, 1);
  const mat = new StandardMaterial('hpmat', scene);
  mat.diffuseTexture  = tex;
  mat.emissiveTexture = tex;
  mat.disableLighting = true;
  mat.useAlphaFromDiffuseTexture = true;
  bar.material = mat;
  bar._hpTex   = tex;
  return bar;
}

function _drawHpBar(tex, pct) {
  const ctx = tex.getContext();
  ctx.clearRect(0, 0, 128, 16);
  ctx.fillStyle = '#333';
  ctx.fillRect(0, 0, 128, 16);
  ctx.fillStyle = pct > 0.5 ? '#4ae84a' : pct > 0.25 ? '#e8c84a' : '#e84a4a';
  ctx.fillRect(2, 2, Math.max(0, (128 - 4) * pct), 12);
  tex.update();
}

// ── Dégâts ─────────────────────────────────────────────────────────────────

function _hit(enemy, amount) {
  if (!enemy.isAlive) return;
  enemy.hp -= amount;

  // Flash
  if (enemy.root.material) {
    enemy.root.material.emissiveColor = new Color3(1, 0.2, 0.2);
    setTimeout(() => { if (enemy.root?.material) enemy.root.material.emissiveColor = Color3.Black(); }, 120);
  }

  // Mettre à jour barre HP
  if (enemy.hpBar?._hpTex) _drawHpBar(enemy.hpBar._hpTex, Math.max(0, enemy.hp / enemy.maxHp));

  if (enemy.hp <= 0) _kill(enemy);
}

function _kill(enemy) {
  enemy.isAlive = false;
  const pos = enemy.root.position.clone();
  enemy.root.dispose();
  getWorld()?.removeRigidBody(enemy.body);
  Events.emit('enemy:died', { type: enemy.type, position: pos, xp: enemy.xp });
}

// ── IA ─────────────────────────────────────────────────────────────────────

const AI_FAR_DT = 1 / CONFIG.perf.aiThrottleHz;

export function updateEnemies(dt) {
  const player = getPlayerRoot();
  if (!player) return;

  for (const e of _enemies) {
    if (!e.isAlive) continue;
    const dist = Vector3.Distance(player.position, e.root.position);
    e.aiTimer += dt;
    const minDt = dist > CONFIG.perf.aiThrottleRange ? AI_FAR_DT : 1 / 60;
    if (e.aiTimer < minDt) continue;
    const adt = e.aiTimer; e.aiTimer = 0;
    _ai(e, player, dist, adt);
    // Sync mesh — coller au terrain comme le joueur
    const t        = e.body.translation();
    const terrainY = getTerrainHeight(t.x, t.z);
    const targetY  = terrainY + e.halfH + e.radius;
    // Forcer la position Y sur le terrain
    e.body.setTranslation({ x: t.x, y: targetY, z: t.z }, true);
    e.root.position.set(t.x, targetY, t.z);
  }
}

function _ai(e, player, dist, dt) {
  const vel = e.body.linvel();

  if (e.state === 'patrol') {
    e.patrolTimer -= dt;
    if (e.patrolTimer <= 0) {
      e.patrolTimer  = 2 + Math.random() * 3;
      const a = Math.random() * Math.PI * 2;
      const r = 4 + Math.random() * 6;
      e.patrolTarget = new Vector3(e.patrolOrigin.x + Math.cos(a) * r, e.patrolOrigin.y, e.patrolOrigin.z + Math.sin(a) * r);
    }
    if (e.patrolTarget) _moveTo(e, e.patrolTarget, e.speed * 0.4);
    if (dist < e.detectRange) e.state = 'chase';

  } else if (e.state === 'chase') {
    if (dist > e.detectRange * 1.5) { e.state = 'patrol'; return; }
    if (dist < e.attackRange)       { e.state = 'attack'; return; }
    _moveTo(e, player.position, e.speed);

  } else if (e.state === 'attack') {
    if (dist > e.attackRange * 1.4) { e.state = 'chase'; return; }
    e.body.setLinvel({ x: 0, y: vel.y, z: 0 }, true);
    if (e.telegraphTimer > 0) {
      e.telegraphTimer -= dt;
      // Flash orange pendant le telegraph
      if (e.root.material) e.root.material.emissiveColor = new Color3(0.8, 0.4, 0);
    } else if (e.attackTimer <= 0) {
      e.attackTimer    = 1.4;
      e.telegraphTimer = 0.5;
      if (e.root.material) e.root.material.emissiveColor = Color3.Black();
      takeDamage(e.damage, e.type);
      Events.emit('enemy:attack', { type: e.type });
    } else {
      e.attackTimer -= dt;
    }
  }
}

function _moveTo(e, target, speed) {
  const dx = target.x - e.root.position.x;
  const dz = target.z - e.root.position.z;
  const len = Math.sqrt(dx * dx + dz * dz);
  if (len < 0.5) return;
  const vel = e.body.linvel();
  e.body.setLinvel({ x: (dx / len) * speed, y: vel.y, z: (dz / len) * speed }, true);
  e.root.rotation.y = Math.atan2(dx, dz);
}

export function getAllEnemies() { return _enemies; }
export function clearEnemies()  { _enemies.forEach(e => { if (e.isAlive) e.root?.dispose(); }); _enemies.length = 0; }
