export const CHEATSHEETS = [
  {
    id: 1,
    title: 'TOEIC Grammar Essentials',
    icon: '✏️',
    category: 'TOEIC',
    sections: [
      {
        title: 'Articles (a / an / the)',
        items: [
          { term: 'a / an', definition: 'Devant un nom singulier non spécifique. "a" avant consonne, "an" avant voyelle. Ex: a report, an email' },
          { term: 'the', definition: 'Devant un nom spécifique ou déjà mentionné. Ex: the meeting we discussed' },
          { term: 'No article', definition: 'Pluriels généraux, noms abstraits, noms propres. Ex: Computers are useful. / She studies management.' },
        ]
      },
      {
        title: 'Verb Tenses (TOEIC essentials)',
        items: [
          { term: 'Simple Present', definition: 'Habitudes, faits. Subject + V(s). Ex: She works at the headquarters.' },
          { term: 'Present Progressive', definition: 'Action en cours maintenant. Subject + am/is/are + V-ing. Ex: We are reviewing the report.' },
          { term: 'Simple Past', definition: 'Action terminée. Subject + V-ed/irregular. Ex: The company launched its app last year.' },
          { term: 'Present Perfect', definition: 'Action passée avec lien présent. Subject + have/has + V-ed. Ex: We have signed the contract.' },
          { term: 'Future (will)', definition: 'Décisions immédiates, prédictions. Subject + will + V. Ex: I will send the report tomorrow.' },
        ]
      },
      {
        title: 'Prepositions (fréquentes TOEIC)',
        items: [
          { term: 'at', definition: 'Lieu précis, heure. at the office / at 3pm / at the conference' },
          { term: 'in', definition: 'Lieu général, mois, année. in Paris / in January / in 2024' },
          { term: 'on', definition: 'Surface, jour, date. on the table / on Monday / on July 15th' },
          { term: 'by', definition: 'Délai, moyen. by Friday (avant) / by email / made by the team' },
          { term: 'for', definition: 'Durée, bénéficiaire. for 3 hours / a report for the manager' },
          { term: 'since', definition: 'Depuis un point précis. since 2020 / since the meeting' },
        ]
      },
      {
        title: 'Passive Voice',
        items: [
          { term: 'Formula', definition: 'Subject + be (conjugated) + past participle. The report WAS WRITTEN by the team.' },
          { term: 'When to use', definition: 'Quand l\'action est plus importante que qui l\'a faite. "The decision was made" (sans préciser qui).' },
          { term: 'Common tenses', definition: 'IS sent (présent), WAS sent (passé), HAS BEEN sent (perfect), WILL BE sent (futur)' },
        ]
      },
      {
        title: 'Comparative & Superlative',
        items: [
          { term: 'Comparative (2 things)', definition: 'Adj-er + than / more + adj + than. This method is faster than the old one.' },
          { term: 'Superlative (3+ things)', definition: 'the + adj-est / the most + adj. This is the most efficient solution.' },
          { term: 'Irregular', definition: 'good → better → best / bad → worse → worst / far → farther → farthest' },
        ]
      },
    ]
  },
  {
    id: 2,
    title: 'Business English Phrases',
    icon: '💼',
    category: 'TOEIC',
    sections: [
      {
        title: 'Meeting Phrases',
        items: [
          { term: 'Opening', definition: '"Let\'s get started." / "Shall we begin?" / "The purpose of today\'s meeting is..."' },
          { term: 'Giving the floor', definition: '"I\'d like to hand it over to..." / "Let\'s hear from..." / "What do you think, [name]?"' },
          { term: 'Agreeing', definition: '"Absolutely." / "That\'s a good point." / "I think you\'re right."' },
          { term: 'Disagreeing politely', definition: '"I see your point, but..." / "With respect, I think..." / "Could we consider another option?"' },
          { term: 'Summarizing', definition: '"To sum up..." / "In summary..." / "So, to recap what we\'ve discussed..."' },
          { term: 'Action items', definition: '"Who will be responsible for...?" / "Can you take the lead on...?" / "The deadline for this is..."' },
          { term: 'Closing', definition: '"That\'s all for today." / "Thank you for your time." / "I\'ll send the minutes by tomorrow."' },
        ]
      },
      {
        title: 'Email Phrases',
        items: [
          { term: 'Opening formal', definition: '"Dear Mr./Ms. [Name]," / "To whom it may concern,"' },
          { term: 'Opening semi-formal', definition: '"Hi [Name]," / "Hello [Name],"' },
          { term: 'Reference', definition: '"I am writing to..." / "Further to our conversation..." / "As discussed..."' },
          { term: 'Request', definition: '"Could you please..." / "I would appreciate it if..." / "Would it be possible to..."' },
          { term: 'Attachment', definition: '"Please find attached..." / "I have attached..." / "Attached is..."' },
          { term: 'Follow-up', definition: '"I am following up on..." / "Just a quick reminder about..." / "Could you provide an update on..."' },
          { term: 'Closing', definition: '"Best regards," / "Sincerely," / "Kind regards," / "Many thanks,"' },
        ]
      },
      {
        title: 'Presentation Phrases',
        items: [
          { term: 'Introduction', definition: '"Good morning/afternoon, everyone. Today I\'d like to talk about..."' },
          { term: 'Structure', definition: '"I\'ve divided my presentation into three parts: First... Then... Finally..."' },
          { term: 'Transition', definition: '"Moving on to..." / "Now let\'s turn to..." / "This brings me to my next point..."' },
          { term: 'Charts & data', definition: '"As you can see from this chart..." / "The figures show..." / "This graph illustrates..."' },
          { term: 'Conclusion', definition: '"To conclude..." / "In conclusion..." / "Let me leave you with this key takeaway..."' },
          { term: 'Q&A', definition: '"Are there any questions?" / "I\'d be happy to answer any questions." / "That\'s a great question."' },
        ]
      },
    ]
  },
  {
    id: 3,
    title: 'Jira & Agile Quick Reference',
    icon: '🎯',
    category: 'Jira',
    sections: [
      {
        title: 'Rôles Scrum',
        items: [
          { term: 'Product Owner', definition: 'Priorise le backlog, maximise la valeur, représente le business. Décide QUOI faire.' },
          { term: 'Scrum Master', definition: 'Facilitateur, lève les obstacles, coache sur Scrum. Protège l\'équipe.' },
          { term: 'Dev Team', definition: 'Auto-organisée, pluridisciplinaire, 5-9 personnes. Décide COMMENT faire.' },
        ]
      },
      {
        title: 'Cérémonies Scrum',
        items: [
          { term: 'Sprint Planning', definition: 'Début de sprint. Sélection des stories + planification. Durée : 4h/sprint de 2 semaines.' },
          { term: 'Daily Standup', definition: 'Chaque jour, 15 min max. Hier ? Aujourd\'hui ? Obstacles ?' },
          { term: 'Sprint Review', definition: 'Fin de sprint. Démonstration du produit aux parties prenantes.' },
          { term: 'Sprint Retrospective', definition: 'Fin de sprint. Améliorer le processus d\'équipe. 1h30/sprint de 2 semaines.' },
        ]
      },
      {
        title: 'Artefacts',
        items: [
          { term: 'Product Backlog', definition: 'Liste priorisée de toutes les fonctionnalités à réaliser. Géré par le PO.' },
          { term: 'Sprint Backlog', definition: 'Stories sélectionnées pour le sprint en cours.' },
          { term: 'Increment', definition: 'Résultat livrable et utilisable à la fin de chaque sprint.' },
          { term: 'Definition of Done', definition: 'Critères communs que chaque ticket doit respecter pour être "Done".' },
        ]
      },
      {
        title: 'Template User Story',
        items: [
          { term: 'Format', definition: '"En tant que [RÔLE], je veux [ACTION] afin de [BÉNÉFICE]."' },
          { term: 'Critères INVEST', definition: 'Indépendante, Négociable, Valeur, Estimable, Small, Testable' },
          { term: 'Bon exemple', definition: '"En tant qu\'acheteur, je veux recevoir un email de confirmation, afin de savoir que ma commande est bien enregistrée."' },
          { term: 'Critères d\'acceptation', definition: 'Liste des conditions à remplir pour que la story soit "Done". Rend la story testable.' },
        ]
      },
      {
        title: 'Estimation',
        items: [
          { term: 'Story Points', definition: 'Unité relative d\'effort. Ne représente pas des heures.' },
          { term: 'Fibonacci', definition: '1, 2, 3, 5, 8, 13, 21... (incertitude croissante pour grandes tâches)' },
          { term: 'Planning Poker', definition: 'Vote simultané pour éviter l\'influence. Discuter les désaccords.' },
          { term: 'Vélocité', definition: 'Moyenne de story points par sprint. S\'observe, ne se fixe pas.' },
        ]
      },
    ]
  },
  {
    id: 4,
    title: 'Data & BI Glossaire',
    icon: '📊',
    category: 'Data',
    sections: [
      {
        title: 'Architecture Data',
        items: [
          { term: 'Data Lake', definition: 'Stockage brut de tout type de données. Flexible, économique, mais besoin de gouvernance.' },
          { term: 'Data Warehouse', definition: 'Données structurées, nettoyées, optimisées pour l\'analyse. Snowflake, BigQuery, Redshift.' },
          { term: 'ETL', definition: 'Extract → Transform → Load. Processus pour charger les données dans le DW.' },
          { term: 'ELT', definition: 'Extract → Load → Transform. Transformer avec SQL dans le DW (dbt, BigQuery).' },
          { term: 'Data Mart', definition: 'Sous-ensemble du DW dédié à un département (Finance, Marketing...).' },
        ]
      },
      {
        title: 'Outils BI',
        items: [
          { term: 'Power BI', definition: 'Microsoft. Intégration Office 365. DAX. Très répandu en France.' },
          { term: 'Tableau', definition: 'Visualisations puissantes. Drag & drop. Cher. Pour équipes data analytiques.' },
          { term: 'Looker', definition: 'Google Cloud. LookML pour governance. Single source of truth.' },
          { term: 'Metabase', definition: 'Open-source, gratuit, simple. Idéal pour startups et non-techniques.' },
        ]
      },
      {
        title: 'Concepts clés',
        items: [
          { term: 'KPI', definition: 'Key Performance Indicator. Mesure liée à un objectif. SMART : spécifique, mesurable, atteignable, réaliste, temporel.' },
          { term: 'Dashboard', definition: 'Vue temps réel des KPIs. Répondre à une question métier. Simple et actionnable.' },
          { term: 'Data Quality', definition: '6 dimensions : exactitude, complétude, cohérence, actualité, unicité, validité.' },
          { term: 'SQL', definition: 'Langage requête bases de données. SELECT FROM WHERE GROUP BY JOIN essentiels.' },
          { term: 'A/B Testing', definition: 'Comparer 2 versions. Décisions basées sur données, pas opinions.' },
        ]
      },
      {
        title: 'Gouvernance',
        items: [
          { term: 'Data Governance', definition: 'Règles, responsabilités et processus pour gérer les données comme actif stratégique.' },
          { term: 'Data Catalog', definition: 'Inventaire de toutes les données. "Google" des données internes.' },
          { term: 'MDM', definition: 'Master Data Management. Un seul "Golden Record" pour clients, produits, fournisseurs.' },
          { term: 'Data Lineage', definition: 'Traçabilité d\'une donnée : source → transformations → utilisation.' },
          { term: 'RGPD', definition: 'Règlement européen protection données. Consentement, droit à l\'oubli, notification 72h.' },
        ]
      },
    ]
  },
  {
    id: 5,
    title: 'IA & Concepts pour Managers',
    icon: '🤖',
    category: 'Data',
    sections: [
      {
        title: 'LLMs & IA Générative',
        items: [
          { term: 'LLM', definition: 'Large Language Model. Modèle entraîné sur milliards de textes. GPT, Claude, Gemini, Mistral.' },
          { term: 'Token', definition: 'Unité de texte traitée par le LLM. ~0,75 mot. Coûts = nb de tokens.' },
          { term: 'Hallucination', definition: 'IA qui invente des informations fausses avec confiance. Toujours vérifier les faits critiques.' },
          { term: 'GenAI', definition: 'IA générative : crée texte, images, code. LLMs + Diffusion Models (DALL-E, Midjourney).' },
          { term: 'Multimodal', definition: 'IA traitant plusieurs types de données : texte + image + audio + vidéo (GPT-4o, Gemini).' },
        ]
      },
      {
        title: 'Techniques IA avancées',
        items: [
          { term: 'RAG', definition: 'Retrieval-Augmented Generation. LLM qui puise dans vos documents. Évite hallucinations, protège données privées.' },
          { term: 'Fine-tuning', definition: 'Ré-entraîner un LLM sur vos données pour le spécialiser. Plus cher que RAG mais modèle expert.' },
          { term: 'Embedding', definition: 'Représentation vectorielle d\'un texte. Textes similaires → vecteurs proches. Base du RAG.' },
          { term: 'Prompt Engineering', definition: 'Écrire des instructions efficaces pour obtenir les meilleures réponses de l\'IA.' },
          { term: 'Agentic AI', definition: 'IA qui agit de façon autonome en plusieurs étapes pour atteindre un objectif.' },
        ]
      },
      {
        title: 'Prompt Engineering (recette)',
        items: [
          { term: '1. Rôle', definition: '"Tu es [expert]. Ex: Tu es un consultant SI senior..."' },
          { term: '2. Contexte', definition: 'Qui, quoi, pour qui. Ex: "Pour le COMEX, entreprise de 500 personnes..."' },
          { term: '3. Tâche précise', definition: 'Ce que vous voulez exactement. Pas "analyse ça" mais "liste les 3 risques majeurs".' },
          { term: '4. Format', definition: '"Réponds en bullet points / 3 paragraphes / tableau avec colonnes X, Y, Z."' },
          { term: '5. Contraintes', definition: '"Maximum 1 page. Langage simple. Évite le jargon technique."' },
        ]
      },
      {
        title: 'Éthique IA',
        items: [
          { term: 'Biais', definition: 'Décisions injustes car données d\'entraînement biaisées. Audit nécessaire avant déploiement.' },
          { term: 'Explicabilité (XAI)', definition: 'Capacité à expliquer les décisions de l\'IA. Obligatoire pour décisions automatisées (RGPD).' },
          { term: 'Responsible AI', definition: 'Cadre : éthique, transparence, robustesse, privacy, durabilité, gouvernance.' },
          { term: 'AI Act EU', definition: 'Règlement européen sur l\'IA. Classifie les systèmes par niveau de risque (interdit → minimal).' },
        ]
      },
    ]
  },
  {
    id: 6,
    title: 'SI Management Frameworks',
    icon: '🏗️',
    category: 'SI',
    sections: [
      {
        title: 'ITIL 4 — Gestion des services IT',
        items: [
          { term: 'Objet', definition: 'Bonnes pratiques pour gérer les services IT. Centré sur la valeur pour le client.' },
          { term: '7 Principes', definition: 'Focus valeur / Partir de l\'existant / Itérer / Collaborer / Holisme / Simplicité / Automatiser' },
          { term: 'Usages clés', definition: 'Service Desk, gestion incidents, changements, améliorations continues.' },
          { term: 'Certification', definition: 'Foundation → Practitioner → Strategic Leader → Master' },
        ]
      },
      {
        title: 'COBIT 2019 — Gouvernance IT',
        items: [
          { term: 'Objet', definition: 'Gouvernance et management des SI. Alignement IT-Business. Audit et conformité.' },
          { term: 'Distinction clé', definition: 'Gouvernance (CA, direction) vs Management (DSI, managers). Niveaux différents.' },
          { term: 'Usages clés', definition: 'Audit SI, conformité SOX/RGPD, tableau de bord gouvernance pour la direction.' },
          { term: 'Éditeur', definition: 'ISACA (organisation internationale d\'audit et contrôle des SI).' },
        ]
      },
      {
        title: 'TOGAF — Architecture d\'entreprise',
        items: [
          { term: 'Objet', definition: 'Cadre pour développer l\'architecture d\'entreprise. Méthode ADM (9 phases).' },
          { term: '4 domaines', definition: 'Architecture Business / Données / Applications / Technologie' },
          { term: 'Usages clés', definition: 'Transformation SI, rationalisation portefeuille applicatif, migration cloud.' },
          { term: 'Certification', definition: 'TOGAF 10 Foundation → Practitioner (The Open Group)' },
        ]
      },
      {
        title: 'DevOps — Culture et pratiques',
        items: [
          { term: 'CALMS', definition: 'Culture, Automation, Lean, Measurement, Sharing. Les 5 piliers.' },
          { term: 'CI/CD', definition: 'Continuous Integration + Continuous Delivery. Tests et déploiement automatisés.' },
          { term: 'IaC', definition: 'Infrastructure as Code. L\'infra gérée comme du code (Terraform, Ansible).' },
          { term: 'Résultat', definition: 'Livraisons plus fréquentes, moins d\'incidents, meilleure collaboration Dev/Ops.' },
        ]
      },
      {
        title: 'Lean IT — Élimination des gaspillages',
        items: [
          { term: '7 Gaspillages IT', definition: 'Surproduction / Attentes / Mouvements / Surtraitement / Stocks / Défauts / Sous-utilisation compétences' },
          { term: 'Value Stream Map', definition: 'Cartographie du flux de valeur. Identifier les gaspillages et blocages.' },
          { term: 'Principe Pull', definition: 'Travailler à la demande (Kanban) plutôt qu\'en mode prévisionnel.' },
          { term: 'Kaizen', definition: 'Amélioration continue, petits pas, tous les jours. Impliquer tout le monde.' },
        ]
      },
    ]
  },
  {
    id: 7,
    title: 'Cloud Computing Essentials',
    icon: '☁️',
    category: 'SI',
    sections: [
      {
        title: 'Modèles de service',
        items: [
          { term: 'IaaS', definition: 'Infrastructure as a Service. Location de serveurs/stockage/réseau. Gérez OS + applis. Ex: AWS EC2, Azure VM.' },
          { term: 'PaaS', definition: 'Platform as a Service. Environnement de développement. Gérez les applis seulement. Ex: Google App Engine, Heroku.' },
          { term: 'SaaS', definition: 'Software as a Service. Logiciel clé en main. Ne gérez rien. Ex: Microsoft 365, Salesforce, Jira.' },
          { term: 'Mnémotechnique', definition: 'IaaS = location de terrain / PaaS = location de maison / SaaS = location de chambre d\'hôtel' },
        ]
      },
      {
        title: 'Modèles de déploiement',
        items: [
          { term: 'Cloud Public', definition: 'Partagé entre clients. Économique, scalable. Ex: AWS, Azure, Google Cloud. Pour : entreprises standard.' },
          { term: 'Cloud Privé', definition: 'Dédié à une seule org. Plus sécurisé, contrôlé. Pour : banques, santé, défense, données très sensibles.' },
          { term: 'Cloud Hybride', definition: 'Combine public + privé. Données sensibles en privé, workloads variables en public.' },
          { term: 'Multi-Cloud', definition: 'Plusieurs fournisseurs cloud. Évite la dépendance, optimise coûts. Ex: AWS + Azure + GCP.' },
        ]
      },
      {
        title: 'Grands fournisseurs',
        items: [
          { term: 'AWS (Amazon)', definition: 'Leader mondial. +200 services. EC2, S3, Lambda, RDS, SageMaker.' },
          { term: 'Azure (Microsoft)', definition: '2ème mondial. Intégration Microsoft parfaite. Teams, Office 365, Active Directory.' },
          { term: 'Google Cloud', definition: '3ème mondial. Expertise data (BigQuery), IA (Vertex AI), Kubernetes natif (GKE).' },
          { term: 'OVHcloud', definition: 'Leader européen. Souveraineté données. RGPD natif. Datacenter en France.' },
        ]
      },
      {
        title: 'Stratégies de migration (6R)',
        items: [
          { term: 'Rehost (Lift & Shift)', definition: 'Déplacer l\'appli telle quelle vers le cloud. Rapide, économies limitées. À faire en premier.' },
          { term: 'Replatform', definition: 'Légère optimisation (ex: passer à une base managée). Migration plus rapide à bénéfices modérés.' },
          { term: 'Refactor', definition: 'Réécrire pour le cloud natif (microservices, serverless). Long, coûteux, mais bénéfices max.' },
          { term: 'Retire / Retain', definition: 'Retire = supprimer les applis inutiles. Retain = conserver on-premise (légal, technique, coût).' },
        ]
      },
    ]
  },
  {
    id: 8,
    title: 'Cybersécurité pour Managers',
    icon: '🔒',
    category: 'SI',
    sections: [
      {
        title: 'Piliers : Trilogie CIA',
        items: [
          { term: 'Confidentialité', definition: 'Seules les personnes autorisées accèdent aux données. → Chiffrement, contrôle d\'accès, MFA.' },
          { term: 'Intégrité', definition: 'Les données ne sont pas altérées sans autorisation. → Signatures digitales, journalisation, checksums.' },
          { term: 'Disponibilité', definition: 'Les systèmes sont accessibles quand on en a besoin. → Redondance, PRA/PCA, anti-DDoS.' },
        ]
      },
      {
        title: 'Menaces courantes',
        items: [
          { term: 'Ransomware', definition: 'Chiffre vos fichiers, demande rançon. Protection : sauvegardes hors ligne, patch management, formation.' },
          { term: 'Phishing', definition: 'Email frauduleux pour voler identifiants. Protection : formation utilisateurs, filtre email, MFA.' },
          { term: 'Insider Threat', definition: 'Menace interne (employé malveillant ou négligent). Protection : principe moindre privilège, SIEM, audit.' },
          { term: 'DDoS', definition: 'Attaque par déni de service. Sature le serveur. Protection : WAF, CDN, anti-DDoS provider.' },
          { term: 'Social Engineering', definition: 'Manipulation psychologique. "Je suis le DSI, donnez-moi votre mot de passe." Formation = meilleure défense.' },
        ]
      },
      {
        title: 'Outils et concepts clés',
        items: [
          { term: 'MFA', definition: 'Multi-Factor Authentication. Mot de passe + code SMS/appli. Bloque 99% des attaques compte.' },
          { term: 'Zero Trust', definition: 'Ne faire confiance à personne par défaut. Vérifier chaque accès. "Never trust, always verify."' },
          { term: 'SOC', definition: 'Security Operations Center. Équipe qui surveille la sécurité 24/7. Utilise SIEM.' },
          { term: 'SIEM', definition: 'Collecte et corrèle les logs de sécurité. Détecte les comportements suspects.' },
          { term: 'PRA/PCA', definition: 'Plans de Reprise/Continuité d\'Activité. RTO (temps de reprise) et RPO (données perdues).' },
        ]
      },
      {
        title: 'RGPD — Points clés',
        items: [
          { term: 'Périmètre', definition: 'Toute organisation traitant des données de résidents UE. Mondial si B2C en Europe.' },
          { term: 'Droits des personnes', definition: 'Accès, rectification, effacement, portabilité, opposition, limitation du traitement.' },
          { term: 'Obligations', definition: 'Base légale obligatoire, notification violation < 72h, DPO si traitement massif, Privacy by Design.' },
          { term: 'Sanctions', definition: 'Jusqu\'à 20M€ ou 4% du CA mondial annuel (le plus élevé des deux).' },
          { term: 'DPO', definition: 'Délégué à la Protection des Données. Obligatoire pour certaines organisations. Conseille sur la conformité.' },
        ]
      },
    ]
  },
];
