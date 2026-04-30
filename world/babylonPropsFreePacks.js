// world/babylonPropsFreePacks.js — Props from Stylized Nature MegaKit

import { loadGltfMesh, createInstance } from '../core/assetLoader.js';
import { Vector3 } from '@babylonjs/core';
import { CONFIG } from '../core/config.js';
import { getTerrainHeight } from './babylonTerrain.js';

const _propTemplates = new Map(); // biome → {type → mesh}
const _chunks = new Map(); // chunkId → [instances]

const BIOME_PROPS_FREE_PACKS = {
  grassland: [
    { type: 'CommonTree_1', model: 'assets/free-packs/Stylized Nature MegaKit[Standard]/glTF/CommonTree_1.gltf', scale: 1.0 },
    { type: 'CommonTree_2', model: 'assets/free-packs/Stylized Nature MegaKit[Standard]/glTF/CommonTree_2.gltf', scale: 1.0 },
    { type: 'Bush_Common', model: 'assets/free-packs/Stylized Nature MegaKit[Standard]/glTF/Bush_Common.gltf', scale: 1.0 },
    { type: 'Rock_Medium_1', model: 'assets/free-packs/Stylized Nature MegaKit[Standard]/glTF/Rock_Medium_1.gltf', scale: 1.0 },
    { type: 'Mushroom_Common', model: 'assets/free-packs/Stylized Nature MegaKit[Standard]/glTF/Mushroom_Common.gltf', scale: 0.8 },
  ],
  ashlands: [
    { type: 'DeadTree_1', model: 'assets/free-packs/Stylized Nature MegaKit[Standard]/glTF/DeadTree_1.gltf', scale: 1.0 },
    { type: 'DeadTree_3', model: 'assets/free-packs/Stylized Nature MegaKit[Standard]/glTF/DeadTree_3.gltf', scale: 1.0 },
    { type: 'TwistedTree_1', model: 'assets/free-packs/Stylized Nature MegaKit[Standard]/glTF/TwistedTree_1.gltf', scale: 1.0 },
    { type: 'Rock_Medium_3', model: 'assets/free-packs/Stylized Nature MegaKit[Standard]/glTF/Rock_Medium_3.gltf', scale: 1.2 },
  ],
  ironrain: [
    { type: 'DeadTree_2', model: 'assets/free-packs/Stylized Nature MegaKit[Standard]/glTF/DeadTree_2.gltf', scale: 1.0 },
    { type: 'TwistedTree_2', model: 'assets/free-packs/Stylized Nature MegaKit[Standard]/glTF/TwistedTree_2.gltf', scale: 1.0 },
    { type: 'Rock_Medium_1', model: 'assets/free-packs/Stylized Nature MegaKit[Standard]/glTF/Rock_Medium_1.gltf', scale: 1.5 },
  ],
  rootblight: [
    { type: 'TwistedTree_3', model: 'assets/free-packs/Stylized Nature MegaKit[Standard]/glTF/TwistedTree_3.gltf', scale: 1.0 },
    { type: 'DeadTree_4', model: 'assets/free-packs/Stylized Nature MegaKit[Standard]/glTF/DeadTree_4.gltf', scale: 0.9 },
    { type: 'Mushroom_Laetiporus', model: 'assets/free-packs/Stylized Nature MegaKit[Standard]/glTF/Mushroom_Laetiporus.gltf', scale: 1.1 },
    { type: 'Rock_Medium_2', model: 'assets/free-packs/Stylized Nature MegaKit[Standard]/glTF/Rock_Medium_2.gltf', scale: 1.0 },
  ],
  schism: [
    { type: 'DeadTree_5', model: 'assets/free-packs/Stylized Nature MegaKit[Standard]/glTF/DeadTree_5.gltf', scale: 1.0 },
    { type: 'TwistedTree_4', model: 'assets/free-packs/Stylized Nature MegaKit[Standard]/glTF/TwistedTree_4.gltf', scale: 1.0 },
  ],
};

let _scene = null;
let _useFreePacks = false;

export async function initPropsFreePacks(scene, biomeName, useFreePacks = true) {
  _scene = scene;
  _useFreePacks = useFreePacks;

  if (!_useFreePacks) return;

  // Pré-charger les modèles du biome actuel
  const propDefs = BIOME_PROPS_FREE_PACKS[biomeName] || [];
  for (const def of propDefs) {
    if (!_propTemplates.has(biomeName)) {
      _propTemplates.set(biomeName, new Map());
    }
    if (!_propTemplates.get(biomeName).has(def.type)) {
      try {
        const mesh = await loadGltfMesh(def.model, `prop_tpl_${biomeName}_${def.type}`, scene);
        mesh.scaling.scaleInPlace(def.scale);
        _propTemplates.get(biomeName).set(def.type, mesh);
        console.log(`✅ Prop template chargé: ${def.type} (${biomeName})`);
      } catch (e) {
        console.warn(`⚠️ Prop model manquant: ${def.type}`, e);
      }
    }
  }
}

export function spawnChunkPropsFreePacks(cx, cz, biome, scene, densityScale = 1) {
  if (!_useFreePacks) return null;

  const chunkId = `${cx}:${cz}`;
  if (_chunks.has(chunkId)) return _chunks.get(chunkId);

  const propDefs = BIOME_PROPS_FREE_PACKS[biome?.name] || [];
  if (propDefs.length === 0) return null;

  const instances = [];
  const count = Math.max(6, Math.round(CONFIG.world.propsPerChunk * densityScale));
  
  const rng = _rng(`chunk_${cx}_${cz}`);
  const templates = _propTemplates.get(biome?.name) || new Map();

  for (let i = 0; i < count && templates.size > 0; i++) {
    const propDef = propDefs[i % propDefs.length];
    const template = templates.get(propDef.type);
    
    if (!template) continue;

    // Position aléatoire dans le chunk
    const px = cx + rng() * CONFIG.world.chunkSize;
    const pz = cz + rng() * CONFIG.world.chunkSize;
    const py = getTerrainHeight(px, pz);

    try {
      const instance = createInstance(template, `prop_${chunkId}_${i}`);
      instance.position.set(px, py, pz);
      instance.rotation.y = rng() * Math.PI * 2;
      instance.isPickable = false;
      instances.push(instance);
    } catch (e) {
      console.warn(`Erreur spawn prop: ${e}`);
    }
  }

  _chunks.set(chunkId, instances);
  return instances;
}

export function disposeChunkPropsFreePacks(cx, cz) {
  const chunkId = `${cx}:${cz}`;
  const instances = _chunks.get(chunkId);
  if (!instances) return;

  for (const inst of instances) {
    try { inst.dispose(); } catch (e) {}
  }
  _chunks.delete(chunkId);
}

export function despawnChunkPropsFreePacks(cx, cz) {
  disposeChunkPropsFreePacks(cx, cz);
}

function _rng(seed) {
  let value = seed.split('').reduce((a, b) => a + b.charCodeAt(0), 0);
  return function() {
    value = (value * 9301 + 49297) % 233280;
    return value / 233280;
  };
}

export function getPropsFreePacaksCacheState() {
  return {
    useFreePacks: _useFreePacks,
    templatesLoaded: Array.from(_propTemplates.keys()),
    chunksActive: _chunks.size,
  };
}
