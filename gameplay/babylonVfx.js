// gameplay/babylonVfx.js — hit flash, loot pop, dodge trail, death

import { MeshBuilder, StandardMaterial, Color3, Color4, ParticleSystem, Texture } from '@babylonjs/core';
import { Events } from '../core/events.js';

let _scene = null;

export function initVfx(scene) {
  _scene = scene;

  Events.on('combat:hit',    ({ target }) => hitFlash(target?.root));
  Events.on('player:died',   ()           => deathEffect());
  Events.on('combat:dodge',  ()           => dodgeTrail());
  Events.on('enemy:died',    ({ position })=> lootPop(position));
}

// ── Hit flash ──────────────────────────────────────────────────────────────

export function hitFlash(mesh) {
  if (!mesh) return;
  const mats = mesh.getChildMeshes ? mesh.getChildMeshes(false) : [mesh];
  mats.forEach(m => {
    if (!m.material) return;
    const orig = m.material.emissiveColor?.clone?.() ?? new Color3(0, 0, 0);
    m.material.emissiveColor = new Color3(1, 0.3, 0.3);
    setTimeout(() => { if (m.material) m.material.emissiveColor = orig; }, 80);
  });
}

// ── Loot pop ───────────────────────────────────────────────────────────────

export function lootPop(position) {
  if (!position || !_scene) return;
  const sphere = MeshBuilder.CreateSphere('loot-pop', { diameter: 0.3 }, _scene);
  sphere.position.copyFrom(position);
  sphere.position.y += 0.5;
  const mat = new StandardMaterial('loot-mat', _scene);
  mat.emissiveColor = new Color3(1, 0.9, 0.2);
  sphere.material   = mat;

  let t = 0;
  const obs = _scene.onBeforeRenderObservable.add(() => {
    t += _scene.getEngine().getDeltaTime() / 1000;
    sphere.position.y += 0.8 * (1 / 60);
    sphere.scaling.setAll(1 - t * 1.5);
    if (t > 0.6) { sphere.dispose(); _scene.onBeforeRenderObservable.remove(obs); }
  });
}

// ── Dodge trail ────────────────────────────────────────────────────────────

export function dodgeTrail() {
  // Effet simple : flash blanc sur le canvas (overlay CSS)
  const el = document.createElement('div');
  Object.assign(el.style, {
    position: 'fixed', inset: '0',
    background: 'rgba(255,255,255,0.12)',
    pointerEvents: 'none', zIndex: '100',
    transition: 'opacity 0.2s',
  });
  document.body.appendChild(el);
  requestAnimationFrame(() => { el.style.opacity = '0'; });
  setTimeout(() => el.remove(), 250);
}

// ── Death effect ───────────────────────────────────────────────────────────

export function deathEffect() {
  const el = document.createElement('div');
  Object.assign(el.style, {
    position: 'fixed', inset: '0',
    background: 'rgba(180,0,0,0.35)',
    pointerEvents: 'none', zIndex: '100',
    transition: 'opacity 1s',
  });
  document.body.appendChild(el);
  setTimeout(() => { el.style.opacity = '0'; }, 100);
  setTimeout(() => el.remove(), 1200);
}
