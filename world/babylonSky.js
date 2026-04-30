// world/babylonSky.js

import { MeshBuilder, StandardMaterial, Color3, Color4 } from '@babylonjs/core';

let _skyMesh = null;

const SKY_COLORS = {
  grassland:  { top: new Color3(0.35, 0.55, 0.85), horizon: new Color3(0.65, 0.78, 0.92) },
  ashlands:   { top: new Color3(0.20, 0.15, 0.12), horizon: new Color3(0.50, 0.35, 0.22) },
  ironrain:   { top: new Color3(0.15, 0.18, 0.25), horizon: new Color3(0.35, 0.38, 0.45) },
  rootblight: { top: new Color3(0.10, 0.18, 0.12), horizon: new Color3(0.25, 0.38, 0.28) },
  schism:     { top: new Color3(0.08, 0.05, 0.12), horizon: new Color3(0.22, 0.12, 0.28) },
};

export function initSky(scene, biome) {
  const colors = SKY_COLORS[biome.name] ?? SKY_COLORS.grassland;

  // Couleur de fond de la scène = couleur ciel horizon
  scene.clearColor = new Color4(colors.horizon.r, colors.horizon.g, colors.horizon.b, 1);

  // Dôme ciel
  _skyMesh = MeshBuilder.CreateSphere('sky', { diameter: 800, segments: 8, sideOrientation: 1 }, scene);
  _skyMesh.infiniteDistance = true;
  _skyMesh.isPickable       = false;

  const mat = new StandardMaterial('sky-mat', scene);
  mat.diffuseColor  = colors.top;
  mat.emissiveColor = colors.top;
  mat.backFaceCulling = false;
  mat.disableLighting = true;
  _skyMesh.material = mat;

  // Fog atmosphérique
  scene.fogMode    = 3; // EXP2
  scene.fogDensity = biome.fogDensity;
  scene.fogColor   = new Color3(colors.horizon.r, colors.horizon.g, colors.horizon.b);

  return _skyMesh;
}

export function updateSkyForBiome(scene, biome) {
  const colors = SKY_COLORS[biome.name] ?? SKY_COLORS.grassland;
  scene.fogDensity = biome.fogDensity;
  scene.fogColor   = new Color3(colors.horizon.r, colors.horizon.g, colors.horizon.b);
  scene.clearColor = new Color4(colors.horizon.r, colors.horizon.g, colors.horizon.b, 1);
}
