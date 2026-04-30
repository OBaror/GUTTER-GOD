// world/babylonWorldMutations.js — mutations monde cumulatives par acte

import { MeshBuilder, StandardMaterial, Color3, Vector3 } from '@babylonjs/core';
import { getTerrainHeight } from './babylonTerrain.js';
import { getCurrentAct }    from '../persistence/worldStateManager.js';
import { Events }           from '../core/events.js';

const _mutations = []; // meshes spawned
let   _scene     = null;

// Définitions des mutations par acte
const MUTATION_DEFS = {
  1: [
    // Tours calcinées
    { type: 'tower', x:  40, z:  40, color: new Color3(0.3, 0.2, 0.1), h: 8,  r: 1.2 },
    { type: 'tower', x: -35, z:  30, color: new Color3(0.3, 0.2, 0.1), h: 6,  r: 1.0 },
    // Ruines
    { type: 'ruin',  x:  20, z: -30, color: new Color3(0.4, 0.3, 0.2), h: 2,  r: 3.0 },
  ],
  2: [
    // Structures de fer rouillé
    { type: 'tower', x:  80, z:  60, color: new Color3(0.4, 0.25, 0.1), h: 12, r: 1.5 },
    { type: 'ruin',  x: -60, z: -40, color: new Color3(0.35, 0.2, 0.1), h: 3,  r: 4.0 },
    { type: 'pillar',x:  50, z: -50, color: new Color3(0.5, 0.3, 0.1),  h: 5,  r: 0.8 },
  ],
  3: [
    // Racines corrompues
    { type: 'root',  x: -20, z:  60, color: new Color3(0.1, 0.3, 0.1), h: 4,  r: 0.5 },
    { type: 'root',  x:  30, z:  70, color: new Color3(0.1, 0.25, 0.1),h: 3,  r: 0.4 },
    { type: 'altar', x:   0, z:  80, color: new Color3(0.2, 0.5, 0.2), h: 1.5,r: 2.5 },
  ],
};

export function initWorldMutations(scene) {
  _scene = scene;
  Events.on('act:changed', ({ act }) => _applyMutationsUpTo(act));
  _applyMutationsUpTo(getCurrentAct());
}

function _applyMutationsUpTo(act) {
  // Appliquer toutes les mutations des actes précédents (cumulatif)
  for (let a = 1; a <= act; a++) {
    const defs = MUTATION_DEFS[a];
    if (!defs) continue;
    for (const def of defs) {
      const key = `mut_${a}_${def.x}_${def.z}`;
      if (_mutations.find(m => m.name === key)) continue; // déjà spawné
      _spawnMutation(def, key);
    }
  }
}

function _spawnMutation(def, key) {
  const y = getTerrainHeight(def.x, def.z);
  let mesh;

  if (def.type === 'tower' || def.type === 'pillar') {
    mesh = MeshBuilder.CreateCylinder(key, {
      height: def.h, diameter: def.r * 2, tessellation: 6,
    }, _scene);
    mesh.position.set(def.x, y + def.h / 2, def.z);
  } else if (def.type === 'ruin') {
    mesh = MeshBuilder.CreateBox(key, {
      width: def.r * 2, height: def.h, depth: def.r * 1.5,
    }, _scene);
    mesh.position.set(def.x, y + def.h / 2, def.z);
    mesh.rotation.y = Math.random() * Math.PI;
  } else if (def.type === 'root') {
    mesh = MeshBuilder.CreateCylinder(key, {
      height: def.h, diameterTop: 0.1, diameterBottom: def.r * 2, tessellation: 5,
    }, _scene);
    mesh.position.set(def.x, y + def.h / 2, def.z);
    mesh.rotation.z = (Math.random() - 0.5) * 0.5;
  } else if (def.type === 'altar') {
    mesh = MeshBuilder.CreateCylinder(key, {
      height: def.h, diameter: def.r * 2, tessellation: 8,
    }, _scene);
    mesh.position.set(def.x, y + def.h / 2, def.z);
  }

  if (!mesh) return;

  const mat = new StandardMaterial(`mat_${key}`, _scene);
  mat.diffuseColor  = def.color;
  mat.specularColor = Color3.Black();
  mesh.material     = mat;
  mesh.isPickable   = false;
  _mutations.push(mesh);
}
