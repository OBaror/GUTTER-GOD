# GUTTER GOD — PLAN RPG ULTIME
## Audit complet + Corrections + Améliorations + Prompts d'exécution
**Date : 30 avril 2026**
**Hardware : Intel i7-1255U / 16 Go RAM / Iris Xe iGPU**
**Stack : Babylon.js 9.5.0 + Rapier 0.14 + Vite 6.4**

---

## PARTIE 1 — AUDIT DE L'EXISTANT

### 1.1 Structure du projet (74 fichiers JS, ~8 800 lignes)

```
ÉTAT ACTUEL :
core/           10 fichiers  1 419 lignes  ✅ Solide
engine/babylon/  5 fichiers    296 lignes  ✅ Solide
world/          14 fichiers  1 252 lignes  ⚠️ Moyen
gameplay/       17 fichiers  2 872 lignes  ⚠️ Moyen
ui/              8 fichiers  1 431 lignes  ⚠️ Moyen
persistence/     4 fichiers    333 lignes  ✅ Solide
tests/           3 fichiers    707 lignes  ✅ OK
racine/         13 fichiers    ~470 lignes ❌ CODE MORT (legacy brouillons)
```

### 1.2 Ce qui MARCHE bien (garder)
- ✅ Architecture modulaire propre (bootstrap → systèmes → game loop)
- ✅ Physique Rapier (grounded raycast, capsules dynamiques, terrain heightfield)
- ✅ Caméra TPS avec anti-clip via raycast Rapier
- ✅ Combat 3-step combo + lock-on (anneau visuel) + bullet-time + dodge i-frames
- ✅ Traversal complet (walk/sprint/jump/glide) avec stamina
- ✅ Terrain procédural multi-octave simplex avec zone spawn plate
- ✅ 5 biomes avec fog/couleurs/props différents
- ✅ Mini-boss 3 phases + Boss final (Gutter God) multi-phases
- ✅ 20+ quêtes sur 5 actes (proximity, kill, pickup)
- ✅ Factions (Gardiens vs Héritiers) avec alignement -100/+100
- ✅ Save/Load IndexedDB (Dexie) + autosave + checkpoints auto
- ✅ Minimap style BotW (topographie, POI, ennemis, boussole)
- ✅ Grande carte ouvrable [M]
- ✅ Portails de téléportation interactifs entre biomes
- ✅ Audio réactif (musique par acte, SFX combat/pas, combat pulse)
- ✅ Post-processing par acte (contrast, vignette)
- ✅ Fog of War avec zones de révélation
- ✅ HUD complet (HP/stamina/level/quête/combo/notifications)
- ✅ Menu principal + Pause + Death screen
- ✅ Machine à états animation (prête mais non connectée aux modèles)
- ✅ Système d'interaction (pickup, lore, faction markers, portails)
- ✅ Config tunables centralisée (CONFIG)
- ✅ Debug overlay + perf overlay

### 1.3 Ce qui est CASSÉ ou INCOMPLET

| # | Problème | Fichier(s) | Gravité |
|---|----------|------------|---------|
| B1 | **13 fichiers JS racine = code mort** — `game.js`, `enemies.js`, `playerController.js`, etc. contiennent du pseudo-code avec backticks markdown, imports Three.js impossibles. Polluent le repo | `*.js` racine | 🟡 Cleanup |
| B2 | **Pas de modèles 3D joueur** — Le joueur est une capsule procédurale invisible en jeu réel. Pas d'animation visuelle | `babylonPlayerCharacter.js` | 🔴 Critique |
| B3 | **AnimationStateMachine existe mais n'est jamais connectée** — `animationState.js` définit idle/walk/sprint/attack/dodge/dead mais aucun modèle glTF ne l'utilise | `animationState.js` | 🔴 Critique |
| B4 | **Ennemis = capsules colorées** — Aucun modèle 3D pour les ennemis, juste des formes procédurales | `babylonEnemies.js` | 🟠 Important |
| B5 | **Pas de système de dialogues** — Les quêtes ont des descriptions mais aucune UI de dialogue NPC | Absent | 🟠 Important |
| B6 | **Chunks streaming incomplet** — `spawnChunkProps` et `despawnChunkProps` dans `babylonProps.js` mais pas de props procéduraux variés, juste du spawning basique | `babylonProps.js` | 🟡 Moyen |
| B7 | **Pas de système de craft/upgrade** — L'inventaire stocke des items mais aucune recette de craft | `rpgProgression.js` | 🟡 Moyen |
| B8 | **Pas de système jour/nuit** — La lumière est statique (soleil fixe) | `lighting.js` | 🟡 Moyen |
| B9 | **Pas de son d'ambiance spatiale** — L'audio est 2D (HTML5 Audio), pas de son 3D positionnel | `audio.js` | 🟡 Moyen |
| B10 | **Pas de cinématiques** — Les transitions d'acte sont instantanées, pas de cutscenes | Absent | 🟡 Moyen |
| B11 | **Pas de NPC non-hostiles** — Le monde n'a que des ennemis et des objets statiques | Absent | 🟠 Important |
| B12 | **Collision terrain approximative** — Le HeightMapShape3D est calculé une fois, pas de LOD dynamique | `babylonTerrain.js` | 🟡 Moyen |
| B13 | **Pas de water shader** — Aucune eau dans les biomes | Absent | 🟡 Moyen |
| B14 | **Bullet-time utilise engine.timeScale** — Sur Babylon.js 9.x, `engine.timeScale` peut ne pas exister, vérifier la compatibilité | `babylonCombat.js` | 🟠 À vérifier |
| B15 | **Vite.config manque des optimisations** — Pas de tree-shaking agressif pour Babylon.js 9 | `vite.config.js` | 🟡 Moyen |

---

## PARTIE 2 — AMÉLIORATIONS POUR RPG ULTIME

### Tier S — Obligatoire pour un "vrai jeu" (impact visuel et gameplay immédiat)

| # | Amélioration | Description | Référence RPG |
|---|-------------|-------------|---------------|
| S1 | **Modèle joueur 3D animé** | Remplacer la capsule par un modèle glTF low-poly humanoïde avec animations (idle, walk, run, attack x3, dodge, jump, fall, death). Utiliser Mixamo (gratuit) ou Kenney | Zelda BotW, Elden Ring |
| S2 | **Modèles ennemis 3D** | 4 types d'ennemis avec modèles distincts (scout=rapide/petit, armored=gros/lent, elite=brillant, mutant=déformé). Free packs KayKit ou Quaternius | Dark Souls, Zelda |
| S3 | **Système de dialogues** | Boîte de dialogue avec portrait, texte progressif, choix de réponse qui affecte l'alignement faction. UI overlay style FF/Zelda | Witcher 3, Skyrim |
| S4 | **NPC amicaux** | Marchands, conteurs, survivants placés dans le monde. Certains donnent des quêtes, d'autres vendent/échangent. Cycle de vie simple (fixed, patrol around point) | Zelda, Skyrim |
| S5 | **Arbre de compétences / Upgrade** | Chaque niveau débloque un point de compétence. 3 branches : Combat (dégâts, combo speed), Survie (HP, stamina, regen), Traversal (sprint speed, glide duration, double jump) | Horizon, God of War |

### Tier A — Impact fort sur l'immersion

| # | Amélioration | Description | Référence |
|---|-------------|-------------|-----------|
| A1 | **Cycle jour/nuit** | Rotation soleil 10 min = 1 jour. Nuit = ennemis plus dangereux (+25% dégâts), torches éclairent, lune. Transition smooth couleur ciel/fog | Zelda BotW |
| A2 | **Eau et nage** | Plan d'eau avec shader simple (couleur + réflexion planaire). Le joueur peut nager (consomme stamina). Certains biomes ont des rivières | Zelda, Skyrim |
| A3 | **Environnement interactif en combat** | Pousser des rochers sur les ennemis, casser des objets pour récupérer des items, utiliser l'environnement comme arme. L'USP du jeu | BotW, Elden Ring |
| A4 | **Props 3D variés** | Arbres (3+ types), rochers (3+ types), champignons, fougères, ruines, coffres. Mixte procédural + placé. Free packs Quaternius/KayKit | Tout open world |
| A5 | **Effets particules améliorés** | Impact coup (sparks), mort ennemi (explosion XP), heal (cercle vert), dodge (trail fantôme), bullet-time (distortion shader) | Devil May Cry |
| A6 | **Musique dynamique layers** | Musique exploration → crossfade vers combat quand ennemis proches. Boss = track unique intense. Utiliser Web Audio API pour layering | Zelda BotW, Hades |
| A7 | **Système de craft** | Combiner des matériaux trouvés pour créer : potions, améliorations d'arme temporaires, runes. UI panel dédié [C] | Zelda TotK, Witcher 3 |

### Tier B — Polish et profondeur

| # | Amélioration | Description | Référence |
|---|-------------|-------------|-----------|
| B1 | **Cinématiques in-engine** | Caméra scripted + texte overlay pour les moments clés (changement d'acte, rencontre boss, choix faction). 10-20 secondes max, skip possible | Dark Souls |
| B2 | **Système de réputation** | Réputation par zone/NPC. Tuer tous les ennemis d'une zone = la zone est « pacifiée ». Aider un NPC = réputation + | Skyrim, Fallout |
| B3 | **Bestiaire / Codex** | Panel [B] avec toutes les créatures rencontrées, leurs stats, faiblesses. Se remplit au fur et à mesure | Witcher 3 |
| B4 | **Photo mode** | Pause le jeu, libère la caméra, ajoute des filtres. Capture screenshot. Fun et gratuit à implémenter | Ghost of Tsushima |
| B5 | **Accessibilité** | Sous-titres, remapping touches, daltonisme (3 palettes), taille texte ajustable | Standard AAA |
| B6 | **PWA installable** | manifest.json + service worker. Le jeu est installable comme app desktop via Chrome | Web-specific |
| B7 | **Performance LOD** | 3 niveaux de LOD pour les props (near=full, mid=simplified, far=billboard). Réduit les draw calls de 40% | Standard 3D |
| B8 | **Décalcomanie combat** | Marques au sol après les attaques fortes, cratères boss. Shader décalcomanie simple | Dark Souls |

---

## PARTIE 3 — CORRECTIONS IMMÉDIATES

### C1 — Supprimer le code mort racine
Fichiers à supprimer : `game.js`, `gameEngine.js`, `player.js`, `playerController.js`, `enemies.js`, `enemyAI.js`, `gameplay.js`, `levels.js`, `ui.js`, `config.js`, `webgpu.js`, `temp_router.json`
> Ce sont des brouillons avec backticks markdown et imports impossibles (Three.js, WebGPU).
> Le vrai code est dans `core/`, `engine/`, `world/`, `gameplay/`, `ui/`, `persistence/`.

### C2 — Vérifier compatibilité Babylon.js 9.5
- `engine.timeScale` → vérifier si toujours supporté en 9.x. Sinon utiliser `scene._timeStep` ou delta multiplier custom
- `ShadowGenerator` → vérifier que `useExponentialShadowMap` est toujours la propriété correcte
- `ImageProcessingPostProcess` → vérifier l'API vignetteEnabled

### C3 — Optimiser Vite config pour Babylon.js 9
- Ajouter tree-shaking : `@babylonjs/core` en 9.x supporte les imports sélectifs
- Configurer `optimizeDeps.exclude` pour Rapier WASM
- Ajouter `build.target: 'es2022'` pour meilleur output

### C4 — Fix audio files manquants
Les chemins audio dans `audio.js` et `biomes.js` pointent vers `assets/audio/` mais ces fichiers doivent être vérifiés/sourcés depuis Kenney (gratuit).

---

## PARTIE 4 — PROMPTS D'EXÉCUTION

> Chaque prompt est autonome et peut être exécuté séquentiellement.
> Ordre recommandé : C1 → C2 → C3 → S1 → S2 → S3 → S4 → S5 → A1 → A2 → ...

---

### PROMPT 1 — Nettoyage code mort + Optimisation Vite
```
CONTEXTE : Le projet GUTTER GOD (C:\GUTTER-GOD-CLEAN) est un action-RPG web 
Babylon.js 9.5 + Rapier 0.14. Le vrai code est dans core/, engine/, world/, 
gameplay/, ui/, persistence/. 13 fichiers JS à la racine sont du code mort 
legacy (contiennent des backticks markdown, imports Three.js impossibles).

TÂCHE :
1. Supprimer les fichiers racine morts : game.js, gameEngine.js, player.js, 
   playerController.js, enemies.js, enemyAI.js, gameplay.js, levels.js, 
   ui.js, config.js (racine, PAS core/config.js), webgpu.js, temp_router.json
2. Mettre à jour vite.config.js pour Babylon.js 9.5 :
   - build.target: 'es2022'
   - Optimiser manualChunks pour séparer babylon, rapier, dexie
   - Exclure rapier3d-compat du pre-bundling (WASM)
3. Vérifier que le build passe toujours (npx vite build)
4. Commit : "[CLEANUP] Remove legacy root files + optimize Vite for BJS 9.5"
```

### PROMPT 2 — Compatibilité Babylon.js 9.5 
```
CONTEXTE : Projet GUTTER GOD, Babylon.js vient d'être upgradé de 8.56 à 9.5.0.
Le code utilise engine.timeScale, ShadowGenerator, ImageProcessingPostProcess.

TÂCHE :
1. Vérifier que engine.timeScale existe dans Babylon.js 9.5. 
   - Si non : créer un système de time scale custom dans core/timeScale.js
     qui multiplie le delta time au lieu de modifier le moteur
   - Mettre à jour babylonCombat.js (_bulletTime, _stopBulletTime)
2. Vérifier ShadowGenerator API (useExponentialShadowMap vs useBlurExponentialShadowMap)
3. Vérifier ImageProcessingPostProcess.imageProcessingConfiguration 
4. Lancer le jeu (npm run dev) et vérifier en console qu'il n'y a aucune erreur
5. Fix tout ce qui casse
6. Commit : "[FIX] Babylon.js 9.5 compatibility fixes"
```

### PROMPT 3 — Modèle joueur 3D animé (S1)
```
CONTEXTE : Le joueur est actuellement une capsule procédurale 
(babylonPlayerCharacter.js). Le jeu a besoin d'un personnage visible avec 
animations. animationState.js existe déjà avec une FSM prête.

TÂCHE :
1. Télécharger un modèle humanoïde gratuit depuis Mixamo ou Kenney 
   (format GLB, < 5 MB, low-poly pour Iris Xe)
   - Animations nécessaires : idle, walk, run, jump, fall, attack_1, 
     attack_2, attack_3, dodge, death
   - OU utiliser les Animated Characters de Quaternius (CC0)
2. Créer assets/models/player/ et y placer le GLB
3. Modifier babylonPlayerCharacter.js :
   - Charger le GLB avec SceneLoader.ImportMeshAsync
   - Remplacer la capsule mesh par le modèle chargé
   - Garder le corps physique Rapier (capsule invisible)
   - Sync la position/rotation du modèle sur le corps physique
4. Connecter animationState.js :
   - Récupérer les AnimationGroups du GLB
   - Créer une instance AnimationStateMachine
   - Dans updateTraversal : appeler play('walk'/'sprint'/'idle') selon l'état
   - Dans babylonCombat : appeler playOneShot('attack') sur chaque coup
   - Sur dodge : playOneShot('dodge')
   - Sur death : play('dead', false)
5. Ajouter le modèle au ShadowGenerator
6. Tester que les animations transitionnent correctement
7. Commit : "[FEAT] 3D animated player character with animation FSM"
```

### PROMPT 4 — Modèles ennemis 3D (S2)
```
CONTEXTE : Les ennemis (babylonEnemies.js) sont des capsules colorées avec 
barres HP. 4 types existent : scout, armored, elite, mutant.

TÂCHE :
1. Sourcer des modèles gratuits low-poly pour les 4 types :
   - Scout : petit humanoïde rapide (Quaternius Animated Characters)
   - Armored : grand humanoïde lourd (Quaternius Medieval Pack)
   - Elite : brillant, doré (même base avec material différent)
   - Mutant : créature organique (Quaternius Monster Pack)
   Format : GLB, < 3 MB chacun, animations idle+walk+attack
2. Créer assets/models/enemies/
3. Créer gameplay/enemyModelLoader.js :
   - Cache de modèles (charger une fois, cloner pour chaque instance)
   - Fonction loadEnemyModel(type) → Promise<mesh>
4. Modifier babylonEnemies.js :
   - Au spawn : charger le modèle via le cache au lieu de CreateCapsule
   - Garder le corps physique Rapier
   - Garder la barre HP label (positionner au-dessus du modèle)
   - Appliquer les animations idle/walk/attack selon l'état IA
5. S'assurer que les performances restent OK (instancing si possible)
6. Commit : "[FEAT] 3D enemy models with type-specific appearances"
```

### PROMPT 5 — Système de dialogues (S3)
```
CONTEXTE : Le jeu a des quêtes (storyData.js) et des interactables 
(babylonInteraction.js) mais aucun système de dialogue.

TÂCHE :
1. Créer ui/dialogueBox.js :
   - Boîte de dialogue en bas de l'écran (style JRPG/Zelda)
   - Portrait NPC (image ou icône) à gauche
   - Texte qui s'affiche lettre par lettre (typewriter effect)
   - Bouton "suivant" ou auto-progression
   - Support choix de réponse (2-3 options) qui affectent l'alignement
   - Fermeture avec [E] ou clic
2. Créer ui/dialogueBox.css avec style dark/gold cohérent
3. Créer gameplay/dialogueData.js :
   - Dialogues pour chaque NPC (format arbre avec branches)
   - Au minimum : 3 NPC par acte avec 5+ lignes de dialogue chacun
   - Certains dialogues débloquent des quêtes
   - Certains choix shiftAlignment(+/- 10-20)
4. Connecter dans babylonInteraction.js :
   - Nouveau type d'interactable 'npc'
   - Au [E] sur un NPC → ouvrir le dialogue
5. Commit : "[FEAT] Dialogue system with typewriter effect + choices"
```

### PROMPT 6 — NPC amicaux (S4)
```
CONTEXTE : Le monde ne contient que des ennemis et des objets. Il manque 
des personnages non-hostiles pour donner vie au monde.

TÂCHE :
1. Créer gameplay/npc.js :
   - Classe NPC : position fixe ou patrol (rayon 5-10u)
   - Types : merchant (vend items), lorekeeper (donne du lore), 
     questgiver (donne quête), survivor (dialogue simple)
   - Modèle : réutiliser un modèle humanoïde avec couleur différente
   - Animation idle + walk (si patrouille)
   - Label 3D flottant avec nom
2. Placer les NPC dans le monde :
   - Act 1 : 1 survivant (x:-30, z:25), 1 questgiver aux archives (x:45, z:45)
   - Act 2 : 1 merchant à la tour (x:80, z:60), 1 faction NPC (x:25, z:20)
   - Act 3-5 : au moins 2 NPC par acte
3. Connecter au système de dialogue (Prompt 5)
4. Les merchants ouvrent un panel d'achat/vente (extension du panel inventaire)
5. Commit : "[FEAT] Friendly NPCs — merchants, questgivers, lore characters"
```

### PROMPT 7 — Arbre de compétences (S5)
```
CONTEXTE : Le système de progression (rpgProgression.js) gère XP et niveaux 
(max 10) mais chaque level n'ajoute que +15 HP et +8% dégâts passivement.

TÂCHE :
1. Créer gameplay/skillTree.js :
   - 3 branches : Combat, Survie, Traversal
   - 9 compétences total (3 par branche), débloquables avec points de skill
   - Combat : Combo Speed (+20% vitesse combo), Critical Strike (15% chance 
     2x dégâts), Whirlwind (AoE 3e coup du combo)
   - Survie : Tough Skin (+30 HP max), Fast Regen (+50% regen stamina), 
     Second Wind (auto-heal 25% HP à 0, cooldown 120s)
   - Traversal : Wind Runner (+25% sprint), Sky Glide (glide 2x plus long), 
     Double Jump (2e saut en l'air)
   - 1 point par level up = 9 points max au level 10
2. Créer ui/skillPanel.js + skillPanel.css :
   - Panel ouvrable avec [T]
   - Affichage visuel des 3 branches avec icônes
   - Points disponibles en haut
   - Clic pour débloquer (irréversible)
3. Connecter les effets dans les systèmes existants :
   - Combat : modifier comboDamage/comboWindow dans babylonCombat.js
   - Survie : modifier maxHp dans babylonPlayerHealth.js, regen dans traversal
   - Traversal : modifier sprintSpeed, glideFallSpeed dans config runtime
4. Commit : "[FEAT] Skill tree — 3 branches, 9 skills, unlockable on level up"
```

### PROMPT 8 — Cycle jour/nuit (A1)
```
CONTEXTE : L'éclairage (lighting.js) est statique — soleil fixe. 
Le jeu n'a pas de notion de temps qui passe.

TÂCHE :
1. Créer world/dayNightCycle.js :
   - Cycle complet en 10 minutes réelles (600s)
   - Phases : aube (0-15%), jour (15-50%), crépuscule (50-65%), nuit (65-100%)
   - Rotation de la DirectionalLight (sun) autour de l'axe X
   - Couleur ambiante qui change (jour=chaud, nuit=froid/bleu)
   - Intensité lumière : jour=1.2, nuit=0.15
   - Fog color adapté (nuit = plus sombre)
   - Ciel : clearColor de la scène change progressivement
2. Effets gameplay nuit :
   - Ennemis +25% dégâts la nuit
   - Ennemis +50% detect range la nuit
   - Spawn d'ennemis "nocturnes" supplémentaires
3. Ajouter un indicateur temps dans le HUD (icône soleil/lune + heure fictive)
4. Événement Events.emit('time:changed', { phase, progress })
5. Commit : "[FEAT] Day/night cycle — 10min real-time, harder nights"
```

### PROMPT 9 — Eau et nage (A2)
```
CONTEXTE : Les biomes n'ont aucun plan d'eau. Le terrain est 100% terrestre.

TÂCHE :
1. Créer world/water.js :
   - Plan d'eau comme MeshBuilder.CreateGround positionné à Y = -0.5
   - Shader simple : StandardMaterial avec couleur bleutée + alpha 0.6
   - Animation : vertex displacement léger (vagues) via onBeforeRender
   - Placer de l'eau dans les zones basses (grassland: lac central, 
     ironrain: rivière)
2. Modifier babylonTraversal.js :
   - Détecter si le joueur est sous le niveau d'eau
   - En nage : vitesse réduite 50%, stamina drain continu, 
     pas de sprint, pas de jump
   - Animation de nage (si modèle dispo) ou flottement
3. Collider Rapier pour empêcher de couler (trigger zone)
4. Commit : "[FEAT] Water planes with swimming — stamina drain in water"
```

### PROMPT 10 — Combat environnemental (A3) — L'USP DU JEU
```
CONTEXTE : Le jeu promet une "utilisation ultra libre de l'environnement 
pour les combats". C'est l'USP principal. Actuellement les combats sont 
limités aux coups de poing/combo.

TÂCHE :
1. Créer gameplay/environmentCombat.js :
   - Objets ramassables dans le monde : rochers, branches, barils
   - [G] pour ramasser un objet proche (remplace temporairement le combo)
   - Lancer l'objet avec clic gauche (projectile physique Rapier)
   - Dégâts basés sur la masse + vitesse de l'objet
   - Les objets se brisent après impact (particules + son)
2. Créer world/destructibles.js :
   - Objets cassables dans le monde : caisses, pots, murs fragiles
   - Loot aléatoire à la destruction (health-potion, matériaux)
   - Particules de destruction
3. Physique avancée :
   - Pousser un objet lourd sur un ennemi = dégâts
   - Faire tomber un arbre (si frappé 3x) = zone de dégâts
   - Exploser un baril (rouge) = AoE feu
4. Spawner ces objets dans chaque chunk (10-15 par chunk)
5. Commit : "[FEAT] Environmental combat — throw objects, destructibles, physics kills"
```

### PROMPT 11 — Props 3D et peuplement du monde (A4)
```
CONTEXTE : Le chunk streamer (babylonChunkStreamer.js) existe mais les props 
sont basiques. Le monde paraît vide.

TÂCHE :
1. Sourcer des modèles 3D gratuits low-poly :
   - Arbres : 3+ variantes (Quaternius Nature Pack, CC0)
   - Rochers : 3+ tailles
   - Herbe/fougères : instances GPU pour la densité
   - Props biome-specific : champignons (rootblight), cristaux (schism), 
     débris métal (ironrain), cendres (ashlands)
   - Ruines : murs brisés, colonnes, arches
2. Créer world/propsPlacer.js :
   - Pour chaque chunk : placer N props selon le biome
   - Distribution basée sur le bruit (cohérence spatiale)
   - Instancing GPU (InstancedMesh) pour les props répétés = perf
   - LOD : near=mesh, far=billboard ou hide
3. Intégrer dans babylonChunkStreamer.js
4. Budget : max 50 draw calls ajoutés par les props
5. Commit : "[FEAT] 3D world props — trees, rocks, ruins per biome with instancing"
```

### PROMPT 12 — Effets particules améliorés (A5)
```
CONTEXTE : Les VFX (babylonVfx.js) sont minimalistes — flash CSS pour le 
dodge, sphère jaune pour le loot, overlay rouge pour la mort.

TÂCHE :
1. Remplacer les VFX CSS par des ParticleSystem Babylon.js :
   - Hit impact : étincelles jaunes/oranges jaillissant du point d'impact
   - Enemy death : explosion de particules XP (étoiles dorées montantes)
   - Player heal : cercle vert montant autour du joueur
   - Dodge : trail fantôme (clones semi-transparents du joueur, 3 frames)
   - Bullet-time activation : distortion ring + particules bleutées
   - Level up : pilier de lumière dorée + particules
2. Optimiser : max 200 particules simultanées, recycler les systèmes
3. Utiliser les ParticleSystem de Babylon.js (pas GPUParticles — Iris Xe)
4. Commit : "[FEAT] Enhanced particle VFX — hits, deaths, heals, dodges"
```

### PROMPT 13 — Musique dynamique (A6)
```
CONTEXTE : L'audio (audio.js) joue une musique par acte et switch entre 
exploration et combat. Mais les transitions sont brutales.

TÂCHE :
1. Migrer de HTML5 Audio vers Web Audio API :
   - AudioContext global
   - GainNode pour chaque canal (music, ambiance, sfx)
   - Crossfade smooth entre exploration et combat (2s fade)
2. Système de layers :
   - Exploration : piste base + piste additionnelle (strings) quand 
     altitude haute ou vue panoramique
   - Combat : drums layer s'ajoute quand enemies en chase
   - Boss : piste unique intense, monte en intensité par phase
3. Sons 3D positionnels :
   - PannerNode pour les SFX (coups, ennemis)
   - Sons d'ambiance localisés (vent près des falaises, eau près des lacs)
4. Sourcer des musiques libres de droit :
   - Kevin MacLeod (incompetech.com) — fantasy/epic
   - FreePD.com — ambiance
   - Kenney RPG SFX déjà présent
5. Commit : "[FEAT] Dynamic layered music with Web Audio API crossfades"
```

### PROMPT 14 — Système de craft (A7)
```
CONTEXTE : L'inventaire (rpgProgression.js) stocke des items avec quantités 
mais il n'y a aucune utilisation des matériaux sauf les potions de soin.

TÂCHE :
1. Créer gameplay/craftSystem.js :
   - Recettes de craft définies :
     * 3 monster-core → 1 health-potion
     * 2 iron-shard + 1 rune-fragment → 1 attack-rune (buff +20% dégâts 60s)
     * 3 mutant-tissue → 1 stamina-elixir (restaure 100% stamina)
     * 1 rare-gem + 2 rune-stone → 1 armor-charm (réduit dégâts 15% permanent)
     * 5 armor-fragment → 1 shield-aura (i-frames +50% durée permanent)
   - Vérifier les ingrédients, consommer, produire
2. Créer ui/craftPanel.js + craftPanel.css :
   - Panel ouvrable avec [C]
   - Liste des recettes connues
   - Ingrédients requis en vert/rouge (assez/pas assez)
   - Bouton craft avec feedback visuel
3. Connecter les buffs dans les systèmes existants
4. Commit : "[FEAT] Crafting system — 5 recipes with buffs and consumables"
```

### PROMPT 15 — Cinématiques in-engine (B1)
```
CONTEXTE : Les transitions d'acte sont instantanées. Le joueur passe 
d'un acte à l'autre sans aucune mise en scène.

TÂCHE :
1. Créer core/cutsceneManager.js :
   - Séquence scriptée : mouvements caméra + texte overlay + effets
   - API : playCutscene(id) → Promise (résolu à la fin ou skip)
   - Skip avec [Espace]
   - Pendant la cutscene : gameplay pausé, HUD masqué
2. Cutscenes à créer :
   - Intro : caméra survole le terrain, texte "GUTTER GOD" + "Le monde 
     est brisé. Toi seul peux le reforger." (10s)
   - Changement d'acte : zoom out, flash blanc, nouveau biome apparaît (5s)
   - Rencontre boss : caméra se rapproche du boss, nom s'affiche en grand (5s)
   - Fin du jeu : selon la faction, texte différent + caméra épique (15s)
3. Intégrer dans bootstrapBabylon.js et phase4Triggers.js
4. Commit : "[FEAT] In-engine cutscenes — intro, act transitions, boss reveals"
```

### PROMPT 16 — PWA installable (B6)
```
CONTEXTE : Le jeu tourne dans le navigateur mais n'est pas installable.

TÂCHE :
1. Créer public/manifest.json :
   - name: "GUTTER GOD"
   - short_name: "GutterGod"
   - display: "fullscreen"
   - background_color: "#0a0808"
   - theme_color: "#e8c84a"
   - icons: 192x192 et 512x512 (générer des icônes simples SVG)
2. Créer public/sw.js (service worker) :
   - Cache-first pour les assets statiques
   - Network-first pour le HTML
   - Précacher les fichiers JS critiques
3. Ajouter <link rel="manifest"> dans index.html
4. Enregistrer le SW dans bootstrapBabylon.js
5. Commit : "[FEAT] PWA installable — manifest + service worker"
```

---

## PARTIE 5 — ORDRE D'EXÉCUTION RECOMMANDÉ

```
Phase 1 — Fondations (Prompts 1-2)
  ├── P1: Cleanup code mort + Vite
  └── P2: Compatibilité Babylon.js 9.5

Phase 2 — Visuels core (Prompts 3-4)
  ├── P3: Modèle joueur 3D animé
  └── P4: Modèles ennemis 3D

Phase 3 — Monde vivant (Prompts 5-6, 11)
  ├── P5: Système de dialogues
  ├── P6: NPC amicaux
  └── P11: Props 3D monde

Phase 4 — Gameplay profondeur (Prompts 7, 10, 14)
  ├── P7: Arbre de compétences
  ├── P10: Combat environnemental (USP)
  └── P14: Système de craft

Phase 5 — Immersion (Prompts 8-9, 12-13)
  ├── P8: Cycle jour/nuit
  ├── P9: Eau et nage
  ├── P12: Particules VFX
  └── P13: Musique dynamique

Phase 6 — Polish (Prompts 15-16)
  ├── P15: Cinématiques
  └── P16: PWA
```

---

## PARTIE 6 — RESSOURCES GRATUITES RECOMMANDÉES

| Ressource | URL | Contenu | Licence |
|-----------|-----|---------|---------|
| Quaternius | quaternius.com | Modèles 3D low-poly (personnages, nature, monstres) | CC0 |
| KayKit | kaylousberg.itch.io | Packs 3D stylisés (RPG, aventure, donjon) | CC0 |
| Kenney | kenney.nl | Assets 2D/3D, SFX, UI | CC0 |
| Mixamo | mixamo.com | Animations humanoïdes (gratuit avec compte Adobe) | Gratuit |
| FreePD | freepd.com | Musiques libres | CC0 |
| Kevin MacLeod | incompetech.com | Musiques orchestrales/épiques | CC-BY |
| OpenGameArt | opengameart.org | Assets variés | CC/GPL |
| Poly Haven | polyhaven.com | HDRIs, textures, modèles | CC0 |
| Freesound | freesound.org | Sons et SFX | CC |

---

*Ce plan transforme GUTTER GOD d'un prototype technique en un vrai RPG 
jouable pendant 100+ heures. Chaque prompt est autonome et testable 
individuellement. L'ordre respecte les dépendances : visuels d'abord 
(impact immédiat), puis gameplay profondeur, puis polish.*
