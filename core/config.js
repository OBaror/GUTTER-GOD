// core/config.js — toutes les constantes tunables du jeu

export const CONFIG = {

  // ── Rendu ──────────────────────────────────────────────────────────────────
  render: {
    shadowMapSize:      512,      // fixe pour Iris Xe — ne pas augmenter
    msaa:               2,        // max 2x sur GPU intégré
    maxDrawCalls:       200,      // seuil alerte draw calls
    fxaa:               true,
    antialias:          false,    // géré via FXAA post-process
  },

  // ── Joueur ─────────────────────────────────────────────────────────────────
  player: {
    walkSpeed:          4.2,
    sprintSpeed:        7.3,
    jumpSpeed:          8.7,
    glideFallSpeed:    -2.25,
    height:             1.8,
    radius:             0.4,
    respawnDelay:       3.0,      // secondes avant respawn
    respawnHpRatio:     0.5,      // HP restauré à la réapparition checkpoint
    maxHp:              100,
  },

  // ── Stamina ────────────────────────────────────────────────────────────────
  stamina: {
    max:                100,
    drainSprint:        20,       // par seconde
    drainJump:          10,
    drainDodge:         16,
    regen:              14,       // par seconde
    regenDelay:         1.2,      // délai avant regen après dépense
  },

  // ── Combat ─────────────────────────────────────────────────────────────────
  combat: {
    lockOnRange:        16,
    lockBreakRange:     20,
    dodgeStaminaCost:   16,
    iFrameDuration:     0.22,     // secondes d'invincibilité dodge
    bulletTimeScale:    0.32,
    bulletTimeDuration: 2.0,
    fatigueDuration:    1.8,
    comboWindow:        0.6,      // secondes pour enchaîner combo
    comboDamage:        [18, 24, 32],
    attackRange:        2.2,
  },

  // ── Caméra ─────────────────────────────────────────────────────────────────
  camera: {
    radius:             6.0,
    radiusMin:          2.0,
    radiusMax:          12.0,
    heightOffset:       1.6,
    lowerBeta:          0.3,
    upperBeta:          1.4,
    sensitivity:        0.003,
    followSpeed:        8.0,
  },

  // ── Monde ──────────────────────────────────────────────────────────────────
  world: {
    chunkSize:          32,       // unités Babylon par chunk
    chunkLoadRadius:    1,        // chunks autour du joueur (1 = 3x3)
    chunkUnloadRadius:  2,
    terrainHeight:      7.0,      // amplitude max — collines visibles
    terrainScale:       0.032,    // fréquence — plaines larges
    propsPerChunk:      40,       // props instanciés par chunk
    grassPerChunk:      500,      // instances herbe par chunk (réduire si < 50 FPS)
  },

  // ── Physique ───────────────────────────────────────────────────────────────
  physics: {
    gravity:           -20.0,
    fixedStep:          0.016,    // 60 Hz physique
  },

  // ── Ennemis ────────────────────────────────────────────────────────────────
  enemies: {
    scout:    { hp: 80,  speed: 3.2, xp: 40,  detectRange: 18, attackRange: 1.8, damage: 12 },
    armored:  { hp: 180, speed: 1.8, xp: 80,  detectRange: 14, attackRange: 2.0, damage: 22 },
    elite:    { hp: 320, speed: 2.4, xp: 150, detectRange: 22, attackRange: 2.2, damage: 30 },
    mutant:   { hp: 140, speed: 2.6, xp: 70,  detectRange: 16, attackRange: 1.9, damage: 18 },
    elite_territorial: { hp: 500, speed: 2.8, xp: 250, detectRange: 24, attackRange: 2.4, damage: 40 },
  },

  // ── Mini-boss ──────────────────────────────────────────────────────────────
  miniBoss: {
    act1: { hp: 600,  phases: [1.0, 0.6, 0.3] },
    act2: { hp: 1000, phases: [1.0, 0.55, 0.25] },
    act3: { hp: 900,  phases: [1.0, 0.6, 0.25] },
    act5: { hp: 3000, phases: [1.0, 0.6, 0.3] },
  },

  // ── Progression ────────────────────────────────────────────────────────────
  progression: {
    xpPerLevel:         [0, 100, 250, 450, 700, 1000, 1400, 1900, 2500, 3200],
    maxLevel:           10,
    hpPerLevel:         15,
    damagePerLevel:     0.08,     // +8% dégâts par niveau
  },

  // ── Persistance ────────────────────────────────────────────────────────────
  persistence: {
    autosaveInterval:   60,       // secondes
    dbName:             'gutter-god-db',
    dbVersion:          1,
  },

  // ── Performance ────────────────────────────────────────────────────────────
  perf: {
    showOverlay:        true,     // désactiver en build release
    targetFps:          60,
    fallbackFps:        45,
    aiThrottleRange:    20,       // unités — throttle IA au-delà
    aiThrottleHz:       10,       // Hz IA hors zone Near
    lodNearRange:       15,
    lodFarRange:        40,
  },

  // ── Features (Phase 5+) ────────────────────────────────────────────────────
  features: {
    useFreePacks:       true,    // Charger assets glTF depuis free-packs/ (true = better visuals, false = better perf)
    useTerrainTextures: false,    // Utiliser textures PBR du terrain (true = detailed, false = procedural)
  },
};
