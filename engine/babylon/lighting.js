// engine/babylon/lighting.js — lumières + ombres

import {
  HemisphericLight,
  DirectionalLight,
  ShadowGenerator,
  Vector3,
  Color3,
} from '@babylonjs/core';
import { CONFIG } from '../../core/config.js';

let _shadowGenerator = null;

export function initLighting(scene) {
  // Lumière ambiante hémisphérique
  const ambient = new HemisphericLight('ambient', new Vector3(0, 1, 0), scene);
  ambient.intensity    = 0.4;
  ambient.diffuse      = new Color3(0.8, 0.85, 1.0);
  ambient.groundColor  = new Color3(0.2, 0.15, 0.1);

  // Lumière directionnelle principale (soleil)
  const sun = new DirectionalLight('sun', new Vector3(-0.5, -1.0, -0.3), scene);
  sun.intensity = 1.2;
  sun.diffuse   = new Color3(1.0, 0.95, 0.85);
  sun.specular  = new Color3(0.3, 0.3, 0.3);

  // Shadow map 512 fixe — contrainte Iris Xe
  _shadowGenerator = new ShadowGenerator(CONFIG.render.shadowMapSize, sun);
  _shadowGenerator.useExponentialShadowMap = true;
  _shadowGenerator.darkness = 0.4;
  _shadowGenerator.bias     = 0.001;

  return { ambient, sun, shadowGenerator: _shadowGenerator };
}

export function getShadowGenerator() {
  return _shadowGenerator;
}

export function addShadowCaster(mesh) {
  _shadowGenerator?.addShadowCaster(mesh, true);
}
