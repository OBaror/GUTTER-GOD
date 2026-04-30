// gameplay/storyData.js — quêtes Act 1, 2, 3, 4, 5

export const QUEST_DEFS = {
  // ── Act 1 ──────────────────────────────────────────────────────────────────
  'act1-awakening': {
    id: 'act1-awakening', title: 'L\'Éveil', act: 1,
    desc: 'Explore les ruines de Vael\'Dorn et découvre l\'archive souterraine.',
    steps: [
      { id: 'reach-ruins',   desc: 'Atteindre les ruines',   type: 'proximity', x: 40, z: 40, radius: 8 },
      { id: 'enter-archive', desc: 'Entrer dans l\'archive', type: 'proximity', x: 45, z: 45, radius: 5 },
    ],
    reward: { xp: 120, items: ['memory-shard'] },
  },
  'act1-first-blood': {
    id: 'act1-first-blood', title: 'Premier Sang', act: 1,
    desc: 'Élimine 5 éclaireurs dans la plaine.',
    steps: [
      { id: 'kill-scouts', desc: 'Éliminer 5 éclaireurs', type: 'kill', enemyType: 'scout', count: 5 },
    ],
    reward: { xp: 80, items: ['monster-core'] },
  },
  'act1-archive': {
    id: 'act1-archive', title: 'Les Archives de Vael\'Dorn', act: 1,
    desc: 'Récupère le fragment de mémoire dans l\'archive.',
    steps: [
      { id: 'find-fragment', desc: 'Trouver le fragment', type: 'pickup', itemId: 'memory-shard-archive' },
    ],
    reward: { xp: 150, items: ['rune-stone'] },
  },
  'act1-ruins-secret': {
    id: 'act1-ruins-secret', title: 'Secret des Ruines', act: 1,
    desc: 'Découvre le passage caché dans les ruines de l\'est.',
    steps: [
      { id: 'find-passage', desc: 'Trouver le passage caché', type: 'proximity', x: 60, z: -20, radius: 6 },
    ],
    reward: { xp: 100, items: ['rune-fragment'] },
  },
  'grassland-survivor': {
    id: 'grassland-survivor', title: 'Le Survivant', act: 1,
    desc: 'Retrouve le survivant caché dans la plaine.',
    steps: [
      { id: 'find-survivor', desc: 'Trouver le survivant', type: 'proximity', x: -30, z: 25, radius: 7 },
    ],
    reward: { xp: 60, items: ['health-potion'] },
  },
  'grassland-watchtower': {
    id: 'grassland-watchtower', title: 'La Tour de Guet', act: 1,
    desc: 'Atteins la tour de guet et élimine les gardes.',
    steps: [
      { id: 'reach-tower', desc: 'Atteindre la tour',       type: 'proximity', x: 0,   z: -50, radius: 10 },
      { id: 'kill-guards', desc: 'Éliminer 3 gardes armés', type: 'kill', enemyType: 'armored', count: 3 },
    ],
    reward: { xp: 140, items: ['iron-shard', 'iron-shard'] },
  },
  'grassland-old-road': {
    id: 'grassland-old-road', title: 'L\'Ancienne Route', act: 1,
    desc: 'Suis l\'ancienne route jusqu\'au carrefour maudit.',
    steps: [
      { id: 'follow-road', desc: 'Atteindre le carrefour', type: 'proximity', x: -60, z: -60, radius: 8 },
    ],
    reward: { xp: 90, items: ['survivor-map'] },
  },

  // ── Act 2 ──────────────────────────────────────────────────────────────────
  'act2-tower': {
    id: 'act2-tower', title: 'La Tour Majeure', act: 2,
    desc: 'Réactive la tour majeure au nord-est.',
    steps: [
      { id: 'reach-tower2', desc: 'Atteindre la tour majeure', type: 'proximity', x: 80, z: 60, radius: 12 },
    ],
    reward: { xp: 200, items: ['iron-shard', 'iron-shard', 'iron-shard'] },
  },
  'act2-armored': {
    id: 'act2-armored', title: 'Blindés de Fer', act: 2,
    desc: 'Élimine 5 gardes blindés dans la zone de pluie de fer.',
    steps: [
      { id: 'kill-armored2', desc: 'Éliminer 5 blindés', type: 'kill', enemyType: 'armored', count: 5 },
    ],
    reward: { xp: 180, items: ['armor-fragment', 'armor-fragment'] },
  },
  'act2-flooded': {
    id: 'act2-flooded', title: 'Les Zones Noyées', act: 2,
    desc: 'Explore les trois zones inondées par la pluie de fer.',
    steps: [
      { id: 'zone1', desc: 'Zone noyée 1', type: 'proximity', x:  60, z:  80, radius: 10 },
      { id: 'zone2', desc: 'Zone noyée 2', type: 'proximity', x: -40, z:  90, radius: 10 },
      { id: 'zone3', desc: 'Zone noyée 3', type: 'proximity', x:  90, z: -20, radius: 10 },
    ],
    reward: { xp: 220, items: ['rare-gem'] },
  },
  'mutant-hunter': {
    id: 'mutant-hunter', title: 'Chasseur de Mutants', act: 2,
    desc: 'Élimine 3 mutants apparus depuis la pluie de fer.',
    steps: [
      { id: 'kill-mutants', desc: 'Éliminer 3 mutants', type: 'kill', enemyType: 'mutant', count: 3 },
    ],
    reward: { xp: 160, items: ['mutant-tissue', 'mutant-tissue'] },
  },
  'faction-contact': {
    id: 'faction-contact', title: 'Premier Contact', act: 2,
    desc: 'Interagis avec un marqueur de faction pour choisir ton camp.',
    steps: [
      { id: 'contact-faction', desc: 'Interagir avec un marqueur faction', type: 'proximity', x: 25, z: 20, radius: 8 },
    ],
    reward: { xp: 100, items: ['faction-seal'] },
  },

  // ── Act 3 ──────────────────────────────────────────────────────────────────
  'act3-sanctuary': {
    id: 'act3-sanctuary', title: 'Le Sanctuaire Corrompu', act: 3,
    desc: 'Purge le sanctuaire corrompu au nord.',
    steps: [
      { id: 'reach-sanctuary', desc: 'Atteindre le sanctuaire',   type: 'proximity', x: 0, z: 80, radius: 12 },
      { id: 'kill-elite',      desc: 'Éliminer le gardien élite',  type: 'kill', enemyType: 'elite', count: 1 },
    ],
    reward: { xp: 280, items: ['veilleur-relic'] },
  },
  'act3-mutants': {
    id: 'act3-mutants', title: 'La Faune Mutante', act: 3,
    desc: 'Élimine 5 mutants dans la zone des racines.',
    steps: [
      { id: 'kill-mutants3', desc: 'Éliminer 5 mutants', type: 'kill', enemyType: 'mutant', count: 5 },
    ],
    reward: { xp: 200, items: ['mutant-tissue', 'mutant-tissue', 'mutant-tissue'] },
  },
  'act3-roots': {
    id: 'act3-roots', title: 'Les Racines Profondes', act: 3,
    desc: 'Suis les racines corrompues jusqu\'à leur source.',
    steps: [
      { id: 'root1', desc: 'Racine 1', type: 'proximity', x: -20, z:  60, radius: 8 },
      { id: 'root2', desc: 'Racine 2', type: 'proximity', x:  30, z:  70, radius: 8 },
      { id: 'root3', desc: 'Source',   type: 'proximity', x:   0, z:  80, radius: 8 },
    ],
    reward: { xp: 250, items: ['rune-fragment', 'rune-fragment'] },
  },

  // ── Act 4 ──────────────────────────────────────────────────────────────────
  'act4-faction': {
    id: 'act4-faction', title: 'Le Schisme des Veilleurs', act: 4,
    desc: 'Choisis définitivement ton camp — Gardiens ou Héritiers.',
    steps: [
      { id: 'choose-faction', desc: 'Choisir une faction', type: 'proximity', x: 0, z: 0, radius: 5 },
    ],
    reward: { xp: 300, items: ['faction-mark'] },
  },
  'act4-revelation': {
    id: 'act4-revelation', title: 'La Révélation', act: 4,
    desc: 'Accède aux archives complètes et lis le Codex des Veilleurs.',
    steps: [
      { id: 'reach-archives', desc: 'Atteindre les archives complètes', type: 'proximity', x: 45, z: 45, radius: 10 },
    ],
    reward: { xp: 350, items: ['memory-shard', 'rune-stone'] },
  },
  'act4-commerce': {
    id: 'act4-commerce', title: 'Les Marchands', act: 4,
    desc: 'Interagis avec les 3 marchands selon ton alignement.',
    steps: [
      { id: 'merchant1', desc: 'Marchand 1', type: 'proximity', x:  20, z:  10, radius: 6 },
      { id: 'merchant2', desc: 'Marchand 2', type: 'proximity', x: -20, z:  10, radius: 6 },
      { id: 'merchant3', desc: 'Marchand 3', type: 'proximity', x:   0, z: -20, radius: 6 },
    ],
    reward: { xp: 200, items: ['health-potion', 'health-potion'] },
  },

  // ── Act 5 ──────────────────────────────────────────────────────────────────
  'act5-elites': {
    id: 'act5-elites', title: 'Les Élites Territoriaux', act: 5,
    desc: 'Élimine les 3 élites territoriaux et récupère leurs reliques.',
    steps: [
      { id: 'kill-elite1', desc: 'Élite territorial 1', type: 'kill', enemyType: 'elite_territorial', count: 1 },
      { id: 'kill-elite2', desc: 'Élite territorial 2', type: 'kill', enemyType: 'elite_territorial', count: 2 },
      { id: 'kill-elite3', desc: 'Élite territorial 3', type: 'kill', enemyType: 'elite_territorial', count: 3 },
    ],
    reward: { xp: 500, items: ['veilleur-relic', 'veilleur-relic', 'veilleur-relic'] },
  },
  'act5-assault': {
    id: 'act5-assault', title: 'La Nuit du Gutter God', act: 5,
    desc: 'Converge les 5 reliques et affronte le Gutter God.',
    steps: [
      { id: 'reach-convergence', desc: 'Atteindre le point de convergence', type: 'proximity', x: 0, z: 0, radius: 8 },
    ],
    reward: { xp: 1000, items: [] },
  },
};

export const ITEM_DEFS = {
  'monster-core':   { id: 'monster-core',   name: 'Noyau de Monstre',    type: 'material',  icon: 'Crystal1.png',           stackable: true  },
  'iron-shard':     { id: 'iron-shard',     name: 'Éclat de Fer',        type: 'material',  icon: 'Mineral.png',            stackable: true  },
  'armor-fragment': { id: 'armor-fragment', name: 'Fragment d\'Armure',  type: 'material',  icon: 'Armor_Metal.png',        stackable: true  },
  'health-potion':  { id: 'health-potion',  name: 'Potion de Soin',      type: 'consumable',icon: 'Potion1_Filled_Red.png', stackable: true, healAmount: 40 },
  'elite-core':     { id: 'elite-core',     name: 'Noyau d\'Élite',      type: 'material',  icon: 'Crystal2.png',           stackable: true  },
  'rare-gem':       { id: 'rare-gem',       name: 'Gemme Rare',          type: 'material',  icon: 'Crystal3.png',           stackable: true  },
  'rune-fragment':  { id: 'rune-fragment',  name: 'Fragment de Rune',    type: 'material',  icon: 'Crystal4.png',           stackable: true  },
  'memory-shard':   { id: 'memory-shard',   name: 'Éclat de Mémoire',    type: 'key',       icon: 'Crystal5.png',           stackable: false },
  'veilleur-relic': { id: 'veilleur-relic', name: 'Relique du Veilleur', type: 'key',       icon: 'Crown.png',              stackable: false },
  'survivor-map':   { id: 'survivor-map',   name: 'Carte du Survivant',  type: 'key',       icon: 'Parchment.png',          stackable: false },
  'rune-stone':     { id: 'rune-stone',     name: 'Pierre de Rune',      type: 'material',  icon: 'Key1.png',               stackable: true  },
  'mutant-tissue':  { id: 'mutant-tissue',  name: 'Tissu Mutant',        type: 'material',  icon: 'Bone.png',               stackable: true  },
  'faction-seal':   { id: 'faction-seal',   name: 'Sceau de Faction',    type: 'key',       icon: 'Ring1.png',              stackable: false },
  'faction-mark':   { id: 'faction-mark',   name: 'Marque de Faction',   type: 'key',       icon: 'Ring2.png',              stackable: false },
};
