import { defineConfig } from 'vite';

export default defineConfig({
  // ── Dépendances ─────────────────────────────────────────────────────────
  optimizeDeps: {
    // Scanner uniquement index.html (évite les .html dans assets/)
    entries: ['index.html'],
    // Rapier WASM : ne pas pré-bundler, laisser le navigateur charger le .wasm
    exclude: ['@dimforge/rapier3d-compat'],
  },

  // ── Build production ────────────────────────────────────────────────────
  build: {
    target: 'es2022',
    sourcemap: true,
    assetsInlineLimit: 0,
    // Limite warning chunks (Babylon.js est naturellement gros)
    chunkSizeWarningLimit: 3000,
    rollupOptions: {
      input: 'index.html',
      output: {
        manualChunks(id) {
          // Séparer les gros vendors pour un meilleur caching navigateur
          if (id.includes('@babylonjs/inspector')) return 'vendor-inspector';
          if (id.includes('@babylonjs'))           return 'vendor-babylon';
          if (id.includes('@dimforge'))            return 'vendor-rapier';
          if (id.includes('simplex-noise'))        return 'vendor-noise';
          if (id.includes('dexie'))                return 'vendor-dexie';
        },
      },
    },
    // esbuild minification (défaut Vite 6 — rapide et suffisant pour Iris Xe)
    minify: 'esbuild',
  },

  // ── Dev server ──────────────────────────────────────────────────────────
  server: {
    watch: {
      // Ne pas surveiller les assets (trop de fichiers, ralentit le HMR)
      ignored: ['**/assets/**', '**/godot/**', '**/dist/**'],
    },
  },
});
