// core/assetLoader.js — Chargement centralisé des assets glTF + textures

import { SceneLoader, Texture, CubeTexture } from '@babylonjs/core';

const _meshCache = new Map();      // id → loaded mesh
const _textureCache = new Map();   // path → loaded texture
const _loading = new Map();        // promise tracking pour éviter double-chargement

/**
 * Charger un mesh glTF/gltb
 * @param {string} path - chemin relatif (assets/)
 * @param {string} id - identifiant unique
 * @param {Scene} scene - Babylon scene
 * @returns {Promise<AbstractMesh>} mesh chargé
 */
export async function loadGltfMesh(path, id, scene) {
  // Cache
  if (_meshCache.has(id)) return _meshCache.get(id);
  
  // Éviter double-loading
  if (_loading.has(id)) return _loading.get(id);

  const promise = _doLoadGltf(path, id, scene);
  _loading.set(id, promise);

  try {
    const mesh = await promise;
    _meshCache.set(id, mesh);
    return mesh;
  } finally {
    _loading.delete(id);
  }
}

async function _doLoadGltf(path, id, scene) {
  // SceneLoader.ImportMesh retourne {meshes, skeletons, animationGroups}
  const result = await SceneLoader.ImportMeshAsync(
    null, // tous les meshes
    path.substring(0, path.lastIndexOf('/') + 1),
    path.substring(path.lastIndexOf('/') + 1),
    scene
  );
  
  // Retourner le premier mesh ou fusionner
  if (result.meshes.length === 0) {
    throw new Error(`[assetLoader] Aucun mesh trouvé dans ${path}`);
  }

  // Fusionner tous les meshes en un seul
  let mainMesh = result.meshes[0];
  if (result.meshes.length > 1) {
    mainMesh.name = id;
    for (let i = 1; i < result.meshes.length; i++) {
      result.meshes[i].parent = mainMesh;
    }
  }

  // Retourner skeletons et animationGroups aussi
  mainMesh._skeletons = result.skeletons || [];
  mainMesh._animationGroups = result.animationGroups || [];
  
  return mainMesh;
}

/**
 * Charger une texture PBR (Color + Normal + Roughness + AO)
 * @param {string} basePath - répertoire contenant les textures
 * @param {Scene} scene 
 * @returns {Promise<Object>} {color, normal, roughness, ao}
 */
export async function loadPbrTextures(basePath, scene) {
  const textures = {};

  // Essayer différentes conventions de nommage
  const patterns = [
    { name: 'color', suffixes: ['_Color', '_BaseColor', '_Diffuse', '_color'] },
    { name: 'normal', suffixes: ['_Normal', '_NormalGL', '_normal'] },
    { name: 'roughness', suffixes: ['_Roughness', '_roughness'] },
    { name: 'ao', suffixes: ['_AmbientOcclusion', '_AO', '_ao'] },
  ];

  for (const pattern of patterns) {
    for (const suffix of pattern.suffixes) {
      try {
        // Essayer PNG puis JPG
        for (const ext of ['_4K.png', '.png', '_4K.jpg', '.jpg']) {
          const path = basePath + suffix + ext;
          try {
            const tex = new Texture(path, scene);
            await tex.onLoadObservable.addOnce(() => {
              textures[pattern.name] = tex;
            });
            if (textures[pattern.name]) break;
          } catch (e) {
            // Continue
          }
        }
        if (textures[pattern.name]) break;
      } catch (e) {
        // Continue
      }
    }
  }

  return textures;
}

/**
 * Cloner un mesh (deep clone with physics)
 * @param {AbstractMesh} original
 * @param {string} newName
 * @returns {AbstractMesh} cloned mesh
 */
export function cloneMesh(original, newName) {
  const clone = original.clone(newName);
  // Cloner aussi le material si présent
  if (original.material) {
    clone.material = original.material.clone(newName + '_mat');
  }
  return clone;
}

/**
 * Créer une instance (très léger, partage geometry)
 * @param {AbstractMesh} original
 * @param {string} newName
 * @returns {AbstractMesh} instance
 */
export function createInstance(original, newName) {
  if (!original.createInstance) {
    return cloneMesh(original, newName);
  }
  return original.createInstance(newName);
}

/**
 * Debug: lister tous les assets en cache
 */
export function getAssetCacheState() {
  return {
    meshes: Array.from(_meshCache.keys()),
    textures: Array.from(_textureCache.keys()),
    loading: Array.from(_loading.keys()),
  };
}

/**
 * Vider le cache (pour test/reload)
 */
export function clearAssetCache() {
  for (const mesh of _meshCache.values()) {
    try { mesh.dispose(); } catch (e) {}
  }
  for (const tex of _textureCache.values()) {
    try { tex.dispose(); } catch (e) {}
  }
  _meshCache.clear();
  _textureCache.clear();
  _loading.clear();
}
