// world/babylonTerrain.js

import { MeshBuilder, StandardMaterial, Color3 } from '@babylonjs/core';
import { createNoise2D } from 'simplex-noise';
import { CONFIG }        from '../core/config.js';
import { getWorld, getRapier } from '../engine/babylon/physics.js';

const _noise2D = createNoise2D();
let _terrainMesh = null;

const SUBDIVS = 80;
const SIZE    = CONFIG.world.chunkSize * 6; // 192u

export function getTerrainHeight(x, z) {
  const s = CONFIG.world.terrainScale;
  const h = CONFIG.world.terrainHeight;

  // Zone spawn plate (rayon 15u autour de 0,0)
  const dist = Math.sqrt(x * x + z * z);
  const flat = Math.max(0, 1 - dist / 15);

  const raw =
    _noise2D(x * s,        z * s)        * h * 0.55 +
    _noise2D(x * s * 2.8,  z * s * 2.8)  * h * 0.28 +
    _noise2D(x * s * 7.0,  z * s * 7.0)  * h * 0.12 +
    _noise2D(x * s * 14.0, z * s * 14.0) * h * 0.05;

  // Aplatir le spawn, garder le reste naturel
  return raw * (1 - flat);
}

export function initTerrain(scene, biome) {
  const nPts = SUBDIVS + 1;

  _terrainMesh = MeshBuilder.CreateGround('terrain', {
    width: SIZE, height: SIZE,
    subdivisions: SUBDIVS,
    updatable: true,
  }, scene);

  // Déformer les vertices
  const positions = _terrainMesh.getVerticesData('position');
  for (let i = 0; i < positions.length; i += 3) {
    positions[i + 1] = getTerrainHeight(positions[i], positions[i + 2]);
  }
  _terrainMesh.updateVerticesData('position', positions);
  _terrainMesh.createNormals(true);

  // Matériau — couleur unie verte, pas de texture
  const mat = new StandardMaterial('terrain-mat', scene);
  mat.diffuseColor  = new Color3(0.22, 0.45, 0.18);
  mat.specularColor = new Color3(0.02, 0.02, 0.02);
  _terrainMesh.material       = mat;
  _terrainMesh.receiveShadows = true;

  // Heightfield Rapier — même grille que le mesh
  const rapier = getRapier();
  const world  = getWorld();
  if (rapier && world) {
    const heights = new Float32Array(nPts * nPts);
    for (let row = 0; row < nPts; row++) {
      for (let col = 0; col < nPts; col++) {
        const wx = -SIZE / 2 + (col / SUBDIVS) * SIZE;
        const wz = -SIZE / 2 + (row / SUBDIVS) * SIZE;
        heights[row * nPts + col] = getTerrainHeight(wx, wz);
      }
    }
    const body    = world.createRigidBody(rapier.RigidBodyDesc.fixed());
    const colDesc = rapier.ColliderDesc.heightfield(SUBDIVS, SUBDIVS, heights, { x: SIZE, y: 1.0, z: SIZE });
    world.createCollider(colDesc, body);
  }

  return _terrainMesh;
}

export function getTerrainMesh() { return _terrainMesh; }
