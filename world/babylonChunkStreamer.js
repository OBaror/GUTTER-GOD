// world/babylonChunkStreamer.js — streaming chunks synchrone

import { CONFIG }                              from '../core/config.js';
import { spawnChunkProps, despawnChunkProps }  from './babylonProps.js';
import { spawnChunkPropsFreePacks, despawnChunkPropsFreePacks } from './babylonPropsFreePacks.js';
import { Events }                              from '../core/events.js';

const _loaded  = new Set();
const _pending = []; // file d'attente — 1 chunk spawné par frame max

const _density = {
  scale: 1.0,
  lowStreak: 0,
  highStreak: 0,
  initialized: false,
};

function _bindAdaptiveDensity() {
  if (_density.initialized) return;
  _density.initialized = true;

  Events.on('perf:fps', ({ fps }) => {
    if (fps < 40) {
      _density.lowStreak += 1;
      _density.highStreak = 0;
      if (_density.lowStreak >= 2) _density.scale = 0.35;
      return;
    }

    if (fps < 50) {
      _density.lowStreak += 1;
      _density.highStreak = 0;
      if (_density.lowStreak >= 2) _density.scale = 0.5;
      return;
    }

    if (fps < 55) {
      _density.lowStreak += 1;
      _density.highStreak = 0;
      if (_density.lowStreak >= 2) _density.scale = 0.7;
      return;
    }

    _density.highStreak += 1;
    _density.lowStreak = 0;
    if (_density.highStreak >= 3) _density.scale = 1.0;
  });
}

function _key(cx, cz)      { return `${cx}_${cz}`; }
function _fromKey(k)       { const [cx,cz] = k.split('_').map(Number); return {cx,cz}; }
function _worldToChunk(x,z){ const cs = CONFIG.world.chunkSize; return { cx: Math.floor(x/cs), cz: Math.floor(z/cs) }; }

export function updateChunkStreamer(playerPos, biome, scene) {
  _bindAdaptiveDensity();

  const { cx: pcx, cz: pcz } = _worldToChunk(playerPos.x, playerPos.z);
  const R  = CONFIG.world.chunkLoadRadius;
  const RU = CONFIG.world.chunkUnloadRadius;

  // Enqueue les chunks manquants
  for (let dx = -R; dx <= R; dx++) {
    for (let dz = -R; dz <= R; dz++) {
      const k = _key(pcx + dx, pcz + dz);
      if (!_loaded.has(k) && !_pending.includes(k)) {
        _pending.push(k);
      }
    }
  }

  // Spawner 1 chunk par frame (évite les spikes)
  if (_pending.length > 0) {
    const k = _pending.shift();
    const { cx, cz } = _fromKey(k);
    _loaded.add(k);
    if (CONFIG.features.useFreePacks) {
      spawnChunkPropsFreePacks(cx, cz, biome, scene, _density.scale);
    } else {
      spawnChunkProps(cx, cz, biome, scene, _density.scale);
    }
  }

  // Décharger les chunks trop loin
  for (const k of [..._loaded]) {
    const { cx, cz } = _fromKey(k);
    if (Math.abs(cx - pcx) > RU || Math.abs(cz - pcz) > RU) {
      if (CONFIG.features.useFreePacks) {
        despawnChunkPropsFreePacks(cx, cz);
      } else {
        despawnChunkProps(cx, cz);
      }
      _loaded.delete(k);
    }
  }
}
