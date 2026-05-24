export const siContent = {
  frameworks: [
    {
      id: 1,
      name: 'ITIL 4',
      description: 'Information Technology Infrastructure Library. Référentiel mondial des bonnes pratiques pour la gestion des services IT. La version 4 (2019) adopte une approche holistique centrée sur la valeur co-créée avec le client.',
      keyPrinciples: [
        'Se concentrer sur la valeur : tout ce que fait l\'organisation doit être lié à la valeur pour les parties prenantes',
        'Commencer là où on est : ne pas repartir de zéro, capitaliser sur l\'existant',
        'Progresser de façon itérative avec du feedback : améliorations continues et incrémentales',
        'Collaborer et promouvoir la visibilité : travailler ensemble, partager l\'information',
        'Penser et travailler de façon holistique : voir le système dans son ensemble',
        'Garder la simplicité et être pratique : éliminer ce qui n\'a pas de valeur',
        'Optimiser et automatiser : libérer l\'humain pour les tâches à haute valeur',
      ],
      useCase: 'Gestion des incidents (Service Desk), gestion des changements IT, catalogue de services, amélioration continue des processus IT. Très utilisé dans les DSI de grandes entreprises.',
      level: 'incontournable'
    },
    {
      id: 2,
      name: 'COBIT 2019',
      description: 'Control Objectives for Information and Related Technologies. Cadre de gouvernance et de management des SI, publié par l\'ISACA. Se concentre sur l\'alignement stratégique IT-Business et la conformité.',
      keyPrinciples: [
        'Satisfaire les besoins des parties prenantes',
        'Couvrir l\'entreprise de bout en bout',
        'Appliquer un cadre unique intégré',
        'Permettre une approche holistique',
        'Distinguer gouvernance et management',
        'Objectifs en cascade : depuis la stratégie jusqu\'aux objectifs IT',
        'Facteurs de conception pour adapter le cadre au contexte',
      ],
      useCase: 'Audit SI, conformité réglementaire (SOX, RGPD), gouvernance IT pour la direction générale et le conseil d\'administration, alignement IT-stratégie business.',
      level: 'avancé'
    },
    {
      id: 3,
      name: 'TOGAF',
      description: 'The Open Group Architecture Framework. Cadre pour développer et gérer l\'architecture d\'entreprise (EA). Fournit une méthode ADM (Architecture Development Method) pour guider la planification de l\'architecture SI.',
      keyPrinciples: [
        'ADM (Architecture Development Method) : cycle en 9 phases',
        'Alignement entre architecture business, données, applicative et technique',
        'Architecture Repository : conservation de tous les artefacts',
        'Architecture Governance : comité d\'architecture',
        'Principes d\'architecture : règles guidant les décisions',
        'Vue des parties prenantes : adapter la communication au public',
        'Conformité et certification : niveaux Bronze, Silver, Gold',
      ],
      useCase: 'Architecture d\'entreprise, transformation SI, rationalisation du portefeuille applicatif, migration cloud, grands projets de refonte du SI.',
      level: 'avancé'
    },
    {
      id: 4,
      name: 'Agile (Manifeste Agile)',
      description: 'Ensemble de valeurs et principes pour le développement logiciel, formalisé en 2001 par 17 experts. Privilégie l\'adaptabilité, la collaboration et la livraison continue de valeur plutôt que la planification rigide.',
      keyPrinciples: [
        'Les individus et interactions > les processus et outils',
        'Les logiciels opérationnels > la documentation exhaustive',
        'La collaboration avec le client > la négociation contractuelle',
        'L\'adaptation au changement > le suivi d\'un plan',
        'Livraison fréquente de logiciels fonctionnels (2-4 semaines)',
        'Les équipes auto-organisées sont les plus performantes',
        'Amélioration continue : la rétrospective régulière',
      ],
      useCase: 'Développement logiciel, gestion de produits, transformation digitale, projets d\'innovation avec beaucoup d\'incertitude, équipes produit et tech.',
      level: 'incontournable'
    },
    {
      id: 5,
      name: 'Lean IT',
      description: 'Application des principes Lean (issus du Toyota Production System) à l\'informatique. Objectif : maximiser la valeur pour le client en éliminant les gaspillages (MUDA) dans les processus IT.',
      keyPrinciples: [
        '7 gaspillages IT : surproduction, attentes, mouvements inutiles, surtraitement, stocks, défauts, sous-utilisation des compétences',
        'Définir la valeur du point de vue du client',
        'Cartographier le flux de valeur (Value Stream Mapping)',
        'Créer un flux continu (éliminer les blocages)',
        'Tirer la production (Kanban Pull System)',
        'Viser la perfection (kaizen : amélioration continue)',
        'Gemba : aller voir sur le terrain, pas dans les bureaux',
      ],
      useCase: 'Amélioration des processus IT, réduction des délais de livraison, service desk, opérations IT, gestion des incidents, optimisation des coûts.',
      level: 'intermédiaire'
    },
    {
      id: 6,
      name: 'DevOps',
      description: 'Culture et ensemble de pratiques qui rapprochent le développement (Dev) et les opérations (Ops) pour livrer des logiciels plus rapidement, plus souvent et avec plus de fiabilité. Basé sur l\'automatisation et la collaboration.',
      keyPrinciples: [
        'CALMS : Culture, Automation, Lean, Measurement, Sharing',
        'CI/CD : Continuous Integration / Continuous Delivery',
        'Infrastructure as Code (IaC) : l\'infra gérée comme du code',
        'Monitoring et observabilité : voir ce qui se passe en production',
        'Shift Left : tester et sécuriser tôt dans le cycle de développement',
        '"You build it, you run it" : les devs responsables de la prod',
        'Blameless post-mortems : apprendre des incidents sans punir',
      ],
      useCase: 'Transformation digitale, accélération des livraisons logicielles, réduction des incidents en production, modernisation des SI legacy.',
      level: 'incontournable'
    },
    {
      id: 7,
      name: 'PRINCE2',
      description: 'PRojects IN Controlled Environments. Méthode de gestion de projet structurée, très répandue en Europe (notamment UK et administrations françaises). Basée sur 7 principes, 7 thèmes et 7 processus.',
      keyPrinciples: [
        'Justification continue de l\'analyse de rentabilité (Business Case)',
        'Apprendre de l\'expérience',
        'Rôles et responsabilités définis',
        'Management par séquences',
        'Management par exception (délégation avec seuils)',
        'Focalisation sur les produits (livraisons)',
        'Adaptation à l\'environnement du projet',
      ],
      useCase: 'Projets gouvernementaux et publics, grands projets IT structurés, organisations cherchant un cadre formel et documenté, projets multi-équipes complexes.',
      level: 'intermédiaire'
    },
    {
      id: 8,
      name: 'PMI/PMBOK',
      description: 'Project Management Body of Knowledge. Guide des bonnes pratiques en gestion de projet publié par le PMI (Project Management Institute). La certification PMP (Project Management Professional) est la plus reconnue mondialement.',
      keyPrinciples: [
        '12 principes de management de projet (7e édition)',
        'Performance Domains : parties prenantes, équipe, cycle de vie, planification, travail, livraison, mesure, incertitude',
        'Approche basée sur les résultats plutôt que sur les processus (depuis la 7e édition)',
        'Tailoring : adapter les pratiques au contexte',
        'Gestion des risques, des parties prenantes, de la qualité',
        'Approche hybride : combine prédictif (cascade) et adaptatif (Agile)',
        'Triple contrainte : Périmètre / Coût / Délai',
      ],
      useCase: 'Certification internationale (PMP), gestion de programmes complexes, projets globaux, environnements multinationaux, intégration Agile-traditionnel.',
      level: 'avancé'
    },
  ],

  concepts: [
    { id: 1, term: 'ERP', definition: 'Enterprise Resource Planning. Logiciel intégré qui centralise et gère tous les processus business d\'une entreprise (finance, RH, supply chain, production, ventes) dans un système unique.', example: 'SAP ERP remplace 15 logiciels métier différents et offre une vision unifiée des données de l\'entreprise.', category: 'ERP' },
    { id: 2, term: 'SAP', definition: 'Système ERP allemand, leader mondial du marché. Module principal : SAP S/4HANA (nouvelle génération). Utilisé par la plupart des grands comptes français.', example: 'TotalEnergies utilise SAP pour gérer sa chaîne d\'approvisionnement mondiale, ses finances et ses RH.', category: 'ERP' },
    { id: 3, term: 'Oracle ERP', definition: 'Suite ERP d\'Oracle (Oracle Fusion Cloud ERP). Concurrent direct de SAP, très utilisé dans les secteurs finance, retail, manufacturing. ERP cloud natif.', example: 'Carrefour utilise Oracle pour la gestion financière et la supply chain de ses opérations mondiales.', category: 'ERP' },
    { id: 4, term: 'Salesforce', definition: 'Leader mondial du CRM (Customer Relationship Management) cloud. Gère les ventes, le marketing, le service client. Plateforme extensible avec de nombreux modules.', example: 'L\'équipe commerciale suit tous ses prospects dans Salesforce, du premier contact à la signature du contrat.', category: 'ERP' },
    { id: 5, term: 'CRM', definition: 'Customer Relationship Management. Logiciel qui centralise les informations sur les clients et prospects pour améliorer la relation client et les ventes.', example: 'CRM : historique des contacts, propositions envoyées, contrats signés, tickets support — tout dans une interface pour le commercial.', category: 'ERP' },
    { id: 6, term: 'HRIS / SIRH', definition: 'Human Resources Information System / Système d\'Information des Ressources Humaines. Logiciel qui gère la paie, les congés, la formation, la gestion des talents.', example: 'Workday ou SAGE HRMS : gestion des 5 000 employés de l\'entreprise (paie, congés, évaluations, formations).', category: 'ERP' },
    { id: 7, term: 'IaaS', definition: 'Infrastructure as a Service. Location d\'infrastructures informatiques (serveurs, stockage, réseau) dans le cloud. L\'entreprise gère le reste (OS, middleware, applications).', example: 'Amazon EC2 (AWS) : louer un serveur virtuel puissant en quelques minutes, payer à l\'usage, sans acheter de matériel.', category: 'Cloud' },
    { id: 8, term: 'PaaS', definition: 'Platform as a Service. Environnement de développement et de déploiement dans le cloud. Le provider gère l\'infrastructure, l\'OS et le middleware. L\'entreprise gère les applications.', example: 'Google App Engine : déployer une application web sans gérer les serveurs. Le provider s\'occupe de la scalabilité.', category: 'Cloud' },
    { id: 9, term: 'SaaS', definition: 'Software as a Service. Logiciel hébergé dans le cloud, accessible via navigateur, abonnement mensuel/annuel. Le provider gère tout (infra, OS, application).', example: 'Microsoft 365, Salesforce, Jira, Slack : des logiciels accessibles depuis n\'importe quel navigateur, sans installation.', category: 'Cloud' },
    { id: 10, term: 'Cloud public', definition: 'Infrastructure cloud partagée entre de nombreux clients, gérée par un fournisseur externe (AWS, Azure, Google Cloud). Économique, scalable, sécurisé.', example: 'Une startup héberge son application sur AWS (cloud public) : pas d\'investissement matériel, paiement à l\'usage.', category: 'Cloud' },
    { id: 11, term: 'Cloud privé', definition: 'Infrastructure cloud dédiée à une seule organisation. Peut être sur site (on-premise) ou hébergée. Plus sécurisé, plus contrôlé, mais plus cher.', example: 'Une banque choisit un cloud privé pour ses données sensibles : infrastructure dédiée, contrôle total, conformité réglementaire.', category: 'Cloud' },
    { id: 12, term: 'Cloud hybride', definition: 'Combinaison de cloud public et privé, avec orchestration entre les deux. Permet de garder les données sensibles en privé et de bénéficier de la scalabilité du cloud public.', example: 'Données clients sensibles dans le cloud privé, applications web dans le cloud public AWS. Les deux communiquent via une API sécurisée.', category: 'Cloud' },
    { id: 13, term: 'CI/CD', definition: 'Continuous Integration / Continuous Delivery. Pratiques DevOps pour automatiser les tests (CI) et le déploiement (CD) du code en production. Permet de livrer plus souvent et plus sûrement.', example: 'CI/CD pipeline : chaque commit déclenche automatiquement les tests → si OK, déploiement en staging → validation → déploiement en prod.', category: 'Architecture' },
    { id: 14, term: 'DevOps (pratique)', definition: 'Culture et pratiques qui rapprochent Dev et Ops pour livrer des logiciels plus rapidement avec plus de qualité. Basé sur l\'automatisation, la collaboration et la mesure continue.', example: 'Avant DevOps : livraison mensuelle avec 40% d\'incidents. Après DevOps : livraisons quotidiennes avec 5% d\'incidents.', category: 'Architecture' },
    { id: 15, term: 'Microservices', definition: 'Architecture logicielle où l\'application est décomposée en petits services indépendants, chacun responsable d\'une fonction. Chaque service peut être déployé et scalé indépendamment.', example: 'Netflix : 700+ microservices (authentification, recommandations, streaming, facturation) déployés indépendamment.', category: 'Architecture' },
    { id: 16, term: 'API (SI)', definition: 'Interface permettant à des systèmes SI différents de communiquer. Les APIs sont la colle du SI moderne. Permettent l\'interopérabilité entre ERP, CRM, e-commerce, etc.', example: 'L\'API du CRM Salesforce permet au site e-commerce de synchroniser automatiquement les nouveaux clients dans la base commerciale.', category: 'Architecture' },
    { id: 17, term: 'SOA', definition: 'Service-Oriented Architecture. Architecture où les fonctionnalités sont exposées comme des services réutilisables, accessibles via des interfaces standardisées. Précurseur des microservices.', example: 'La banque expose son service de vérification de crédit comme un service SOA réutilisable par toutes ses applications internes.', category: 'Architecture' },
    { id: 18, term: 'SOC', definition: 'Security Operations Center. Équipe de cybersécurité qui surveille, détecte et répond aux incidents de sécurité 24h/24 7j/7. Utilise des outils SIEM, SOAR pour analyser les événements.', example: 'Le SOC de la banque détecte une tentative d\'intrusion à 3h du matin et l\'isole en 15 minutes avant tout dommage.', category: 'Security' },
    { id: 19, term: 'SIEM', definition: 'Security Information and Event Management. Logiciel qui collecte et corrèle les logs de sécurité de tous les systèmes pour détecter les incidents et alerter le SOC.', example: 'SIEM Splunk détecte 50 tentatives de connexion échouées depuis la même IP en 5 minutes → alerte automatique au SOC.', category: 'Security' },
    { id: 20, term: 'Zero Trust', definition: 'Modèle de sécurité qui ne fait confiance à personne par défaut, même à l\'intérieur du réseau. Chaque accès est vérifié systématiquement. "Never trust, always verify".', example: 'Zero Trust : même un employé connecté au VPN de l\'entreprise doit s\'authentifier pour chaque application, avec MFA obligatoire.', category: 'Security' },
    { id: 21, term: 'Trilogie CIA', definition: 'Confidentialité, Intégrité, Disponibilité. Les trois piliers de la sécurité de l\'information. Tout contrôle de sécurité vise à protéger au moins l\'un de ces trois aspects.', example: 'Confidentialité : chiffrement. Intégrité : signatures digitales. Disponibilité : redondance et PRA.', category: 'Security' },
    { id: 22, term: 'RGPD (SI)', definition: 'Règlement Général sur la Protection des Données. Impact SI majeur : Privacy by Design, chiffrement, droit à l\'effacement, DPO obligatoire pour certains traitements, journalisation des accès.', example: 'Impact RGPD SI : pseudonymisation des bases de données, chiffrement des backups, purge automatique des données après 3 ans.', category: 'Security' },
    { id: 23, term: 'DSI', definition: 'Directeur des Systèmes d\'Information. Responsable de la stratégie SI de l\'entreprise, des équipes IT, du budget informatique et de l\'alignement IT-business.', example: 'Le DSI présente au COMEX le plan de transformation digitale sur 3 ans et demande un budget de 5M€.', category: 'Governance' },
    { id: 24, term: 'MOA', definition: 'Maîtrise d\'OuvrAge. Dans un projet SI, le MOA représente les besoins métier. C\'est le "client" du projet qui définit quoi faire et valide les livrables. Côté business.', example: 'La direction commerciale (MOA) exprime le besoin d\'un nouveau CRM et valide les fonctionnalités développées.', category: 'Governance' },
    { id: 25, term: 'MOE', definition: 'Maîtrise d\'Oeuvre. Dans un projet SI, le MOE réalise le projet selon les spécifications du MOA. C\'est la DSI ou le prestataire informatique. Côté technique.', example: 'L\'équipe IT (MOE) développe le CRM selon les spécifications de la direction commerciale (MOA).', category: 'Governance' },
    { id: 26, term: 'AMOA', definition: 'Assistance à la Maîtrise d\'Ouvrage. Consultant ou équipe qui aide le MOA à exprimer ses besoins, rédiger les cahiers des charges et piloter le projet côté métier.', example: 'Le cabinet de conseil (AMOA) aide la DRH à rédiger le cahier des charges du nouveau SIRH et à évaluer les offres des éditeurs.', category: 'Governance' },
    { id: 27, term: 'Schéma Directeur SI', definition: 'Document stratégique définissant la vision, les orientations et le plan d\'évolution du SI sur 3 à 5 ans. Aligné avec la stratégie de l\'entreprise.', example: 'Schéma Directeur SI 2024-2027 : migration cloud, refonte ERP, données et IA, cybersécurité renforcée. Budget : 12M€.', category: 'Governance' },
    { id: 28, term: 'PRA', definition: 'Plan de Reprise d\'Activité. Plan définissant comment reprendre l\'activité SI après un sinistre majeur (incendie, cyberattaque, inondation). Précise le RTO et RPO.', example: 'PRA : en cas d\'incendie du datacenter, reprise des systèmes critiques en 4h sur le site de secours (RTO = 4h).', category: 'Security' },
    { id: 29, term: 'PCA', definition: 'Plan de Continuité d\'Activité. Plan qui garantit le maintien des activités essentielles pendant un sinistre, sans interruption. Plus ambitieux que le PRA (continuité vs reprise).', example: 'PCA d\'une banque : redondance géographique → si le datacenter A tombe, le datacenter B prend le relais instantanément.', category: 'Security' },
    { id: 30, term: 'RTO / RPO', definition: 'Recovery Time Objective (durée maximale d\'interruption acceptable) et Recovery Point Objective (quantité maximale de données perdues acceptable). Deux KPIs clés du PRA/PCA.', example: 'RTO = 4h (on accepte 4h d\'arrêt max). RPO = 1h (on accepte de perdre max 1h de données, donc backups toutes les heures).', category: 'Security' },
    { id: 31, term: 'Transformation digitale', definition: 'Processus global d\'intégration des technologies numériques dans tous les aspects d\'une organisation, modifiant fondamentalement comment elle opère et délivre de la valeur à ses clients.', example: 'BNP Paribas : application mobile (10M utilisateurs), IA pour la détection de fraude, open banking, chatbot service client.', category: 'Digital' },
    { id: 32, term: 'Shadow IT', definition: 'Utilisation de systèmes IT, logiciels ou services sans l\'approbation de la DSI. Phénomène courant causé par la lenteur perçue de l\'IT. Représente un risque sécurité et de gouvernance.', example: 'L\'équipe marketing utilise des outils SaaS non approuvés (Dropbox, Trello) car la DSI prend trop de temps pour déployer des solutions.', category: 'Governance' },
    { id: 33, term: 'Legacy System', definition: 'Système informatique ancien et obsolète, souvent difficile à maintenir et à faire évoluer, mais critique pour le business. Le "vieux code" qui fait encore tourner l\'entreprise.', example: 'Mainframe COBOL datant des années 80 gérant encore les transactions bancaires critiques d\'une grande banque française.', category: 'Architecture' },
    { id: 34, term: 'Migration Cloud', definition: 'Processus de transfert d\'applications, données et infrastructures vers le cloud. Stratégies : Rehost (lift & shift), Replatform, Refactor, Repurchase, Retire, Retain (modèle des 6R).', example: 'La DSI migre le serveur de messagerie on-premise vers Microsoft 365 : plus de maintenance hardware, mises à jour automatiques.', category: 'Cloud' },
    { id: 35, term: 'Urbanisme SI', definition: 'Discipline qui vise à rationaliser et organiser le SI comme un système cohérent, évitant la redondance et les incohérences. Cartographie le SI et planifie son évolution.', example: 'L\'urbaniste SI cartographie les 120 applications de l\'entreprise pour identifier les doublons et planifier les fusions.', category: 'Architecture' },
    { id: 36, term: 'Middleware', definition: 'Logiciel qui fait le lien entre les applications et les services. Il gère les communications, la sécurité et la gestion des données entre systèmes hétérogènes.', example: 'IBM MQ (middleware de messagerie) connecte le système de commandes e-commerce à l\'ERP SAP en temps réel.', category: 'Architecture' },
    { id: 37, term: 'Intégration SI (ESB)', definition: 'Enterprise Service Bus. Middleware d\'intégration qui permet aux différents systèmes du SI de communiquer de façon standardisée. L\'autoroute de communication du SI.', example: 'ESB IBM WebSphere : centralise toutes les communications entre CRM, ERP, e-commerce et SIRH, avec transformation de données.', category: 'Architecture' },
    { id: 38, term: 'SLA', definition: 'Service Level Agreement. Accord contractuel définissant le niveau de service attendu (disponibilité, temps de réponse, temps de résolution des incidents) entre prestataire et client.', example: 'SLA hébergeur : 99.9% de disponibilité garantie, temps de réponse aux incidents critiques < 1h. Pénalités si non respecté.', category: 'Governance' },
    { id: 39, term: 'CMDB', definition: 'Configuration Management Database. Base de données centralisant tous les éléments de configuration du SI (serveurs, applications, réseaux) et leurs relations. Outil ITIL.', example: 'CMDB : le serveur SQL-PROD-01 supporte les applications ERP et BI. Si ce serveur tombe, l\'impact est immédiatement visible.', category: 'Governance' },
    { id: 40, term: 'Ticketing', definition: 'Système de gestion des demandes et incidents IT. Chaque demande est tracée dans un ticket avec un ID, une priorité, un SLA et un responsable.', example: 'Service Desk : utilisateur crée un ticket "Mon VPN ne fonctionne pas" → ticket assigné automatiquement → résolu en 2h.', category: 'Governance' },
    { id: 41, term: 'Containerisation', definition: 'Technologie qui empaquette une application et ses dépendances dans un conteneur portable et léger (Docker). Garantit que l\'application fonctionne partout identiquement.', example: 'Docker : l\'application fonctionne dans le conteneur exactement pareil sur le PC du dev, en test et en production.', category: 'Architecture' },
    { id: 42, term: 'Kubernetes (K8s)', definition: 'Plateforme open-source d\'orchestration de conteneurs. Gère le déploiement, la scalabilité et la disponibilité des applications containerisées.', example: 'Kubernetes : si l\'application a besoin de plus de capacité (pic de trafic), K8s déploie automatiquement 5 instances supplémentaires.', category: 'Architecture' },
    { id: 43, term: 'Business Intelligence (BI)', definition: 'Ensemble des outils, processus et méthodes permettant d\'analyser les données de l\'entreprise pour aider à la prise de décision. Comprend reporting, dashboards, analyses.', example: 'Solution BI : Power BI connecté au Data Warehouse pour fournir des dashboards quotidiens aux 50 managers de l\'entreprise.', category: 'Digital' },
    { id: 44, term: 'Gouvernance des données', definition: 'Ensemble de politiques, processus et responsabilités pour gérer les données comme un actif stratégique de l\'entreprise. Inclut qualité, sécurité, conformité et accessibilité.', example: 'Comité de gouvernance des données : DSI + DPO + DAF + DRH se réunissent mensuellement pour valider les politiques de données.', category: 'Governance' },
    { id: 45, term: 'Architecture N-tiers', definition: 'Architecture logicielle divisant l\'application en couches séparées : présentation (UI), logique métier (business layer) et données (data layer). Améliore la maintenabilité et la scalabilité.', example: 'Application 3-tiers : navigateur web (couche présentation) → serveur applicatif Java (logique métier) → base Oracle (données).', category: 'Architecture' },
  ],

  quizzes: [
    { id: 1, question: 'Que signifie l\'acronyme ERP ?', options: ['Electronic Resource Planning', 'Enterprise Resource Planning', 'Extended Risk Protocol', 'Enterprise Reporting Platform'], correct: 1, explanation: 'ERP = Enterprise Resource Planning. C\'est un logiciel intégré qui centralise tous les processus business (finance, RH, supply chain, ventes) dans un système unique. Les leaders du marché sont SAP et Oracle.', topic: 'ERP' },
    { id: 2, question: 'Quelle est la différence entre IaaS, PaaS et SaaS ?', options: ['Ce sont trois noms différents pour la même chose', 'IaaS = infrastructure, PaaS = plateforme de dev, SaaS = logiciel clé en main', 'IaaS est gratuit, PaaS payant, SaaS très cher', 'Ce sont trois fournisseurs cloud différents'], correct: 1, explanation: 'IaaS (ex: EC2) = infrastructure louée. PaaS (ex: App Engine) = plateforme de développement. SaaS (ex: Salesforce) = logiciel directement utilisable. Avec SaaS, le fournisseur gère TOUT.', topic: 'Cloud' },
    { id: 3, question: 'Qu\'est-ce que le Zero Trust en cybersécurité ?', options: ['Ne jamais faire confiance aux nouvelles technologies', 'Modèle où chaque accès est vérifié, même à l\'intérieur du réseau : "Never trust, always verify"', 'Approche sans budget de sécurité', 'Système de sécurité sans mot de passe'], correct: 1, explanation: 'Zero Trust remet en question le modèle "château fort" (tout ce qui est dans le réseau est sûr). Avec Zero Trust, chaque accès est authentifié et autorisé, que l\'utilisateur soit en interne ou externe.', topic: 'Security' },
    { id: 4, question: 'Quelle est la différence entre le MOA et le MOE dans un projet SI ?', options: ['Ce sont deux noms pour le chef de projet', 'MOA = côté métier (le client), MOE = côté technique (la réalisation)', 'MOA = fournisseur, MOE = acheteur', 'MOA gère le budget, MOE gère le planning'], correct: 1, explanation: 'MOA (Maîtrise d\'Ouvrage) = le côté métier, qui exprime les besoins et valide. MOE (Maîtrise d\'Oeuvre) = le côté technique, qui réalise. La relation MOA-MOE est centrale dans les projets SI français.', topic: 'Governance' },
    { id: 5, question: 'Qu\'est-ce que la trilogie CIA en sécurité de l\'information ?', options: ['Confiance, Innovation, Agilité', 'Confidentialité, Intégrité, Disponibilité', 'Conformité, Infrastructure, Architecture', 'Contrôle, Inspection, Audit'], correct: 1, explanation: 'CIA = Confidentialité (seules les personnes autorisées accèdent aux données), Intégrité (les données ne sont pas altérées), Disponibilité (les systèmes sont accessibles quand on en a besoin). Les 3 piliers de la sécurité.', topic: 'Security' },
    { id: 6, question: 'Quel est le principe fondamental du framework ITIL 4 ?', options: ['Se concentrer sur la réduction des coûts IT', 'Se concentrer sur la valeur délivrée aux parties prenantes', 'Automatiser tous les processus IT', 'Standardiser les technologies utilisées'], correct: 1, explanation: 'Le premier principe directeur d\'ITIL 4 est "Se concentrer sur la valeur" : tout ce que fait l\'organisation IT doit contribuer à la valeur perçue par les clients et parties prenantes. Les processus ne sont que des moyens.', topic: 'Frameworks' },
    { id: 7, question: 'Qu\'est-ce qu\'un Schéma Directeur SI ?', options: ['Le plan de câblage du réseau informatique', 'Document stratégique définissant la vision et le plan d\'évolution du SI sur 3 à 5 ans', 'Le manuel d\'utilisation des logiciels', 'Le budget annuel de l\'IT'], correct: 1, explanation: 'Le Schéma Directeur SI est le document de référence stratégique de la DSI, aligné sur la stratégie de l\'entreprise. Il définit les grandes orientations SI, les projets prioritaires et les investissements sur le moyen terme.', topic: 'Governance' },
    { id: 8, question: 'Que signifie l\'architecture Microservices ?', options: ['Utiliser de petits ordinateurs bon marché', 'Architecture où l\'application est divisée en services indépendants, chacun déployable séparément', 'Utiliser des API très petites et simples', 'Gérer des données très petites'], correct: 1, explanation: 'Les microservices découpent une application en services indépendants (authentication, paiement, catalogue...). Chaque service peut être développé, déployé et scalé indépendamment. Netflix et Amazon utilisent des centaines de microservices.', topic: 'Architecture' },
    { id: 9, question: 'Qu\'est-ce que le Shadow IT ?', options: ['La DSI qui travaille la nuit', 'Utilisation de logiciels et services IT non approuvés par la DSI', 'Un projet IT tenu secret par la direction', 'La maintenance des serveurs en dehors des heures de bureau'], correct: 1, explanation: 'Le Shadow IT est l\'utilisation de solutions IT (Dropbox, Trello, WhatsApp...) sans validation de la DSI. Souvent lié à la frustration des métiers face à la lenteur de l\'IT. Représente un risque de sécurité et de conformité.', topic: 'Governance' },
    { id: 10, question: 'Quelle est la différence entre PRA et PCA ?', options: ['PRA est pour les petites entreprises, PCA pour les grandes', 'PRA = reprendre l\'activité après un sinistre, PCA = maintenir l\'activité en continu malgré le sinistre', 'PRA gère les données, PCA gère les applications', 'Ce sont deux noms pour la même chose'], correct: 1, explanation: 'PRA (Plan de Reprise) : comment redémarrer après une interruption. PCA (Plan de Continuité) : comment ne jamais s\'arrêter. Le PCA est plus ambitieux et coûteux (redondance totale). Le PRA accepte une période d\'arrêt (définie par le RTO).', topic: 'Security' },
    { id: 11, question: 'Qu\'est-ce que COBIT 2019 apporte spécifiquement ?', options: ['Un cadre de développement logiciel Agile', 'Un cadre de gouvernance IT alignant stratégie business et management des SI', 'Un framework de sécurité opérationnelle', 'Un outil de gestion des projets'], correct: 1, explanation: 'COBIT se concentre sur la gouvernance IT : aligner l\'IT sur le business, gérer les risques, assurer la conformité. Il est particulièrement utilisé pour les audits SI et les comités d\'audit des grandes entreprises.', topic: 'Frameworks' },
    { id: 12, question: 'Qu\'est-ce que le CI/CD en DevOps ?', options: ['Customer Interface / Customer Design', 'Continuous Integration / Continuous Delivery : automatisation des tests et déploiements', 'Cost Integration / Cost Delivery', 'Cloud Infrastructure / Cloud Deployment'], correct: 1, explanation: 'CI = tests automatiques à chaque commit de code. CD = déploiement automatique en production si les tests passent. Le CI/CD permet de livrer plusieurs fois par jour au lieu d\'une fois par mois, avec plus de fiabilité.', topic: 'Architecture' },
    { id: 13, question: 'Qu\'est-ce que TOGAF concerne principalement ?', options: ['La gestion des réseaux informatiques', 'L\'architecture d\'entreprise : aligner systèmes business, données, applications et technologie', 'La gestion des contrats IT', 'Le développement mobile'], correct: 1, explanation: 'TOGAF est le cadre de référence pour l\'Architecture d\'Entreprise. L\'ADM (Architecture Development Method) guide la définition de l\'architecture sur 4 niveaux : Business, Données, Applications, Technologie.', topic: 'Frameworks' },
    { id: 14, question: 'Qu\'est-ce que le concept de "Legacy System" ?', options: ['Un système IT très récent et performant', 'Un ancien système informatique difficile à maintenir mais encore critique pour le business', 'Un système de sauvegarde des données', 'Un logiciel open-source'], correct: 1, explanation: 'Les Legacy Systems sont le "vieux code" qui fait encore tourner l\'entreprise (mainframe COBOL, vieux ERP...). Coûteux à maintenir, difficile à intégrer, mais trop risqué à remplacer brutalement. C\'est un défi majeur des DSI.', topic: 'Architecture' },
    { id: 15, question: 'Qu\'est-ce qu\'un SOC ?', options: ['System of Control : outil de supervision', 'Security Operations Center : équipe qui surveille la sécurité 24/7', 'Software Operations Center : centre de développement', 'Service Operations Catalog : catalogue de services'], correct: 1, explanation: 'Le SOC est une équipe (ou service externalisé) qui surveille en continu les événements de sécurité, détecte les incidents et y répond. Utilise des outils SIEM et SOAR pour analyser des millions d\'événements par jour.', topic: 'Security' },
    { id: 16, question: 'Qu\'est-ce que le SLA ?', options: ['Standard Language Architecture', 'Service Level Agreement : accord contractuel sur le niveau de service attendu', 'Software Licensing Agreement', 'System Load Analysis'], correct: 1, explanation: 'Le SLA définit les engagements de performance entre un prestataire IT et son client : disponibilité (99.9%), temps de réponse aux incidents, temps de résolution. En cas de non-respect, des pénalités contractuelles s\'appliquent.', topic: 'Governance' },
    { id: 17, question: 'Qu\'est-ce que l\'urbanisme SI ?', options: ['L\'aménagement physique des bureaux informatiques', 'Discipline qui rationalise et organise le SI comme un écosystème cohérent', 'La gestion des licences logicielles', 'L\'organisation de la DSI en services'], correct: 1, explanation: 'L\'urbanisme SI cartographie le SI existant (applications, flux, données) et planifie son évolution rationnelle. L\'objectif : un SI cohérent, sans redondance, aligné sur la stratégie. Métaphore : l\'urbaniste d\'une ville.', topic: 'Architecture' },
    { id: 18, question: 'Que signifie RTO dans le contexte du PRA ?', options: ['Return To Original : retour à l\'état initial', 'Recovery Time Objective : durée maximale d\'interruption acceptable', 'Real Time Operations : opérations temps réel', 'Risk Tolerance Overview : tolérance au risque'], correct: 1, explanation: 'RTO = durée maximale d\'interruption que l\'organisation peut tolérer. RPO = quantité maximale de données perdues tolerable. Ces deux métriques définissent les exigences du PRA. Plus ils sont bas, plus le PRA est coûteux.', topic: 'Security' },
    { id: 19, question: 'Quelle est la principale différence entre cloud public et cloud privé ?', options: ['Le cloud public est moins sécurisé qu\'un cloud privé', 'Le cloud public est partagé entre plusieurs clients, le cloud privé est dédié à une seule organisation', 'Le cloud privé est hébergé à l\'étranger', 'Le cloud public est gratuit'], correct: 1, explanation: 'Cloud public : infrastructure partagée chez AWS/Azure/GCP, économique et scalable. Cloud privé : infrastructure dédiée, plus contrôlé et souvent exigé pour données sensibles (banques, santé, défense). Le cloud hybride combine les deux.', topic: 'Cloud' },
    { id: 20, question: 'Qu\'est-ce qu\'un SIEM ?', options: ['Système d\'Information de l\'Entreprise et du Management', 'Security Information and Event Management : logiciel qui collecte et corrèle les logs de sécurité', 'Système d\'Intégration des Échanges Métier', 'Service Internet et Email Management'], correct: 1, explanation: 'Le SIEM collecte les logs de tous les systèmes (serveurs, firewall, applications, réseaux) et les corrèle pour détecter des comportements suspects. C\'est l\'outil central du SOC. Exemples : Splunk, IBM QRadar, Microsoft Sentinel.', topic: 'Security' },
    { id: 21, question: 'Qu\'est-ce que la containerisation avec Docker ?', options: ['Emballer des données dans des fichiers ZIP', 'Empaqueter une application et ses dépendances dans un conteneur portable qui fonctionne partout identiquement', 'Virtualiser un serveur complet', 'Compresser des images pour le web'], correct: 1, explanation: 'Docker empaquette l\'application et TOUTES ses dépendances dans un conteneur. "Works on my machine" n\'existe plus : le conteneur fonctionne identiquement en dev, test et production. Base du DevOps et du cloud moderne.', topic: 'Architecture' },
    { id: 22, question: 'Qu\'est-ce que l\'AMOA dans un projet SI ?', options: ['Association des Managers d\'Organisations Agiles', 'Assistance à la Maîtrise d\'Ouvrage : consultant qui aide le métier à exprimer ses besoins', 'Architecture des Middlewares des Organisations Agiles', 'Automatisation des Méthodes et Outils d\'Architecture'], correct: 1, explanation: 'L\'AMOA aide le MOA (métier) à définir ses besoins, rédiger les cahiers des charges et piloter le projet côté client. Le cabinet de conseil joue souvent ce rôle. L\'AMOA fait le pont entre le métier et la technique.', topic: 'Governance' },
    { id: 23, question: 'Qu\'est-ce que la Migration Cloud selon le modèle des 6R ?', options: ['6 règles pour choisir un fournisseur cloud', 'Les 6 stratégies de migration : Rehost, Replatform, Refactor, Repurchase, Retire, Retain', '6 régions cloud AWS', '6 niveaux de certification cloud'], correct: 1, explanation: 'Les 6R définissent la stratégie pour chaque application : Rehost (lift & shift), Replatform (légère optimisation), Refactor (réécrire), Repurchase (passer au SaaS), Retire (éliminer), Retain (garder on-premise).', topic: 'Cloud' },
    { id: 24, question: 'Qu\'est-ce qu\'un ESB ?', options: ['Enterprise Service Bus : middleware d\'intégration permettant aux systèmes SI de communiquer', 'Encrypted Security Blockchain', 'External Storage Backup', 'Enterprise Software Bridge'], correct: 1, explanation: 'L\'ESB est le "chef d\'orchestre" des intégrations SI. Il centralise les communications entre systèmes hétérogènes (ERP, CRM, e-commerce), traduit les formats de données et gère la fiabilité des échanges.', topic: 'Architecture' },
    { id: 25, question: 'Qu\'est-ce que la gouvernance des données ?', options: ['La gestion des sauvegardes', 'Ensemble de politiques et processus pour gérer les données comme un actif stratégique', 'La compression des données pour le stockage', 'L\'analyse des données pour le BI'], correct: 1, explanation: 'La gouvernance des données définit qui est responsable des données, comment elles sont qualifiées, sécurisées, accessibles. Elle inclut le Data Catalog, le MDM et les politiques de conformité (RGPD). C\'est un sujet majeur des DSI.', topic: 'Governance' },
    { id: 26, question: 'Quelle est la principale différence entre PRINCE2 et PMBOK/PMI ?', options: ['PRINCE2 est pour les projets IT, PMBOK pour les projets de construction', 'PRINCE2 est une méthode avec des processus définis, PMBOK est un guide de bonnes pratiques adaptable', 'PRINCE2 est gratuit, PMBOK est payant', 'PRINCE2 est américain, PMBOK est européen'], correct: 1, explanation: 'PRINCE2 est une méthode prescriptive avec des processus, rôles et livrables définis. PMBOK est un guide de bonnes pratiques que chaque organisation adapte. PRINCE2 est très utilisé en Europe, PMI/PMP est la certification de référence mondiale.', topic: 'Frameworks' },
    { id: 27, question: 'Qu\'est-ce que le DevOps vise principalement à résoudre ?', options: ['Le manque de développeurs dans les entreprises', 'Le fossé entre les équipes de développement et les opérations, qui ralentit les livraisons et crée des incidents', 'Le coût trop élevé des licences logicielles', 'Les problèmes de sécurité dans le code'], correct: 1, explanation: 'DevOps résout le conflit traditionnel Dev (veut livrer vite) vs Ops (veut la stabilité). En rapprochant les deux cultures et en automatisant (CI/CD, IaC), on livre plus souvent ET plus fiablement.', topic: 'Frameworks' },
    { id: 28, question: 'Qu\'est-ce qu\'une CMDB ?', options: ['Certified Management Database', 'Configuration Management Database : base de données de tous les éléments de configuration du SI et leurs relations', 'Customer Master Data Base', 'Cloud Monitoring Dashboard Builder'], correct: 1, explanation: 'La CMDB est l\'inventaire centralisé du SI : serveurs, applications, réseaux et leurs interdépendances. Outil ITIL essentiel : quand un serveur tombe, la CMDB montre immédiatement quelles applications sont impactées.', topic: 'Governance' },
    { id: 29, question: 'Qu\'est-ce que l\'architecture SOA ?', options: ['Software Oriented Architecture', 'Service-Oriented Architecture : architecture où les fonctionnalités sont exposées comme des services réutilisables', 'Security Operations Architecture', 'Standard Object Architecture'], correct: 1, explanation: 'SOA expose les fonctionnalités métier comme des services réutilisables via des interfaces standardisées. Précurseur des microservices, SOA est encore largement présent dans les grandes entreprises. Favorise la réutilisabilité et l\'interopérabilité.', topic: 'Architecture' },
    { id: 30, question: 'Quel est le rôle principal du DSI dans l\'entreprise ?', options: ['Gérer les équipes de développeurs uniquement', 'Définir et piloter la stratégie SI, alignée sur la stratégie business, en gérant l\'équipe IT et le budget informatique', 'Assurer la maintenance des serveurs', 'Acheter les licences logicielles'], correct: 1, explanation: 'Le DSI est le directeur stratégique du SI. Il aligne la stratégie IT sur le business, gère le budget informatique, dirige les équipes IT, pilote les grands projets de transformation et représente l\'IT au COMEX.', topic: 'Governance' },
  ],

  caseStudies: [
    {
      id: 1,
      title: 'Migration cloud d\'un SI bancaire',
      context: 'La Banque Régionale Atlantique (BRA) est une banque de taille moyenne avec 500 000 clients. Elle fonctionne sur un SI vieillissant : un mainframe IBM datant de 1995 pour le core banking, 15 applications développées en interne, une infrastructure datacenter propriétaire. Les coûts de maintenance explosent (+20% par an), les délais de mise sur marché des nouvelles fonctionnalités sont de 18 mois en moyenne, et les incidents de production se multiplient. Le DSI propose une migration cloud sur 3 ans.',
      problem: 'Le DSI doit convaincre le COMEX et choisir la stratégie de migration cloud. Il doit arbitrer entre plusieurs approches : migration totale vers le cloud public, cloud hybride, ou replatforming progressif. Les contraintes majeures : conformité bancaire (ACPR), protection des données clients, continuité de service (RTO < 4h), budget de 15M€ sur 3 ans.',
      questions: [
        {
          q: 'Quelle stratégie de cloud est la plus adaptée à une banque avec des données clients sensibles ?',
          options: [
            'Cloud public uniquement (AWS ou Azure) pour minimiser les coûts',
            'Cloud hybride : données sensibles en cloud privé/on-premise, applications non critiques en cloud public',
            'Rester en on-premise, trop risqué de migrer',
            'Cloud public avec chiffrement des données'
          ],
          correct: 1,
          explanation: 'Le cloud hybride est la réponse standard pour les banques réglementées. Les données clients et les transactions (soumises à l\'ACPR) restent dans un environnement contrôlé (privé ou on-premise). Les applications moins critiques (CRM, intranet, outils collaboratifs) migrent vers le cloud public pour bénéficier de l\'agilité et des économies.'
        },
        {
          q: 'Pour le mainframe core banking, quelle stratégie de migration des 6R est la plus prudente ?',
          options: [
            'Rehost (lift & shift) : déplacer le mainframe tel quel vers le cloud',
            'Refactor : réécrire complètement le core banking en microservices modernes',
            'Retain : conserver le mainframe en l\'état pour l\'instant, migrer les applications périphériques en premier',
            'Retire : arrêter le mainframe et acheter un ERP bancaire SaaS'
          ],
          correct: 2,
          explanation: 'La stratégie "Retain" est la plus prudente pour un core banking critique. Commencer par migrer les applications périphériques (moins risquées) accumule de l\'expérience cloud et prouve la valeur. Le mainframe core banking sera migré en dernier, une fois la compétence cloud établie et les risques mieux maîtrisés. "Start small, learn fast" est la clé.'
        },
        {
          q: 'Comment gérer la continuité de service pendant la migration (RTO < 4h) ?',
          options: [
            'Faire la migration en une seule fois le week-end',
            'Mettre en place une approche de migration progressive avec double fonctionnement (ancienne + nouvelle architecture) et bascule progressive',
            'Arrêter le service pendant 2 semaines pour migrer',
            'Migrer uniquement la nuit pour éviter les interruptions'
          ],
          correct: 1,
          explanation: 'La migration progressive (strangler pattern) est la clé : les nouveaux clients et fonctionnalités vont dans la nouvelle architecture, les anciens restent sur l\'existante. Les deux architectures coexistent et se synchronisent. La bascule est progressive et réversible. Cette approche respecte le RTO et minimise les risques.'
        }
      ]
    },
    {
      id: 2,
      title: 'Sélection d\'un ERP pour un groupe industriel',
      context: 'Industrie Plus, groupe industriel de 2 000 employés réparti sur 5 sites en France, produit des équipements mécaniques pour l\'automobile. Le SI actuel est éclaté : 8 logiciels différents non intégrés (gestion de production, stocks, RH, finance, CRM...), données dupliquées, rapports consolidés manuellement chaque mois (40 heures de travail). Le DAF ne peut pas avoir de vision financière consolidée en temps réel. Le PDG décide de déployer un ERP unique.',
      problem: 'La DSI doit choisir l\'ERP et piloter le déploiement. Les candidats : SAP S/4HANA (leader, cher, complexe), Microsoft Dynamics 365 (écosystème MS, intermédiaire), Sage X3 (français, PME/ETI, plus simple). Budget : 3M€, durée max : 18 mois, les équipes sont peu à l\'aise avec les changements technologiques.',
      questions: [
        {
          q: 'Quel critère est le plus important pour choisir un ERP ?',
          options: [
            'Choisir le leader du marché (SAP) pour avoir la meilleure solution',
            'Choisir le moins cher pour respecter le budget',
            'Choisir selon l\'adéquation fonctionnelle aux processus métier spécifiques et la capacité de l\'entreprise à absorber le changement',
            'Choisir celui que les concurrents utilisent'
          ],
          correct: 2,
          explanation: 'Le meilleur ERP est celui qui correspond aux processus métier ET à la capacité de changement de l\'entreprise. SAP est puissant mais nécessite des ressources importantes (intégrateurs SAP = chers). Pour une ETI de 2 000 personnes avec des équipes peu habituées aux changements, Sage X3 ou Dynamics peuvent être plus adaptés, même si moins "prestigieux".'
        },
        {
          q: 'Quelle approche de déploiement recommandez-vous pour les 5 sites ?',
          options: [
            'Big Bang : déployer tous les modules sur tous les sites en même temps',
            'Pilote puis déploiement progressif : tester sur 1 site, ajuster, puis déployer les autres',
            'Attendre 2 ans de plus pour que l\'ERP soit plus mature',
            'Déployer seulement la finance d\'abord, reporter le reste indéfiniment'
          ],
          correct: 1,
          explanation: 'L\'approche pilote est la moins risquée. Un site pilote (idéalement le plus représentatif) permet de valider la configuration, d\'identifier les problèmes, de former une équipe experte et de créer un modèle de déploiement réplicable. Le Big Bang sur 5 sites simultanément est très risqué et souvent la cause des échecs d\'ERP.'
        },
        {
          q: 'Quel est le principal facteur d\'échec des projets ERP et comment le prévenir ?',
          options: [
            'Le coût trop élevé des licences : négocier dur avec l\'éditeur',
            'La résistance au changement des utilisateurs : investir massivement dans la conduite du changement, la formation et la communication',
            'La complexité technique : choisir un ERP plus simple',
            'Le manque de fonctionnalités : personnaliser l\'ERP au maximum'
          ],
          correct: 1,
          explanation: '70% des échecs ERP sont dus à l\'humain, pas à la technologie. La conduite du changement (Change Management) est cruciale : communiquer tôt sur le pourquoi, impliquer les utilisateurs dans la conception, former massivement, identifier des "champions" dans chaque service. Ne pas personnaliser l\'ERP : s\'adapter aux processus standard économise temps et argent.'
        }
      ]
    },
    {
      id: 3,
      title: 'Incident de cybersécurité : ransomware',
      context: 'Lundi 8h30, le RSSI de la société de logistique TranspArt (300 M€ de CA, 800 employés) reçoit une alerte du SIEM : des fichiers se chiffrent massivement sur les serveurs. En 15 minutes, c\'est confirmé : ransomware Lockbit 3.0 en cours de propagation. Les hackers demandent 500 000€ de rançon en Bitcoin. 40% des serveurs sont chiffrés, dont le TMS (Transport Management System), l\'ERP et les messageries. Les clients ne peuvent plus être servis. Le plan de continuité d\'activité (PCA) est activé.',
      problem: 'Le COMEX est réuni en cellule de crise. Les décisions à prendre dans les 4 premières heures sont critiques : payer ou ne pas payer la rançon ? Comment contenir la propagation ? Comment communiquer ? Comment reprendre l\'activité minimale ? La pression est énorme car les clients attendent leurs livraisons.',
      questions: [
        {
          q: 'Première action à mener lors d\'un ransomware en cours de propagation ?',
          options: [
            'Appeler immédiatement les hackers pour négocier',
            'Isoler immédiatement les systèmes infectés du réseau pour stopper la propagation',
            'Faire une sauvegarde des fichiers chiffrés',
            'Éteindre tous les ordinateurs de l\'entreprise immédiatement'
          ],
          correct: 1,
          explanation: 'L\'isolation réseau est la PREMIÈRE priorité. Chaque minute compte : couper les connexions réseau des systèmes infectés stoppe la propagation. L\'IT doit segmenter le réseau immédiatement. Mettre hors ligne ne suffit pas si les backups sont sur le même réseau (souvent aussi chiffrés si connectés).'
        },
        {
          q: 'Faut-il payer la rançon ?',
          options: [
            'Oui, c\'est le moyen le plus rapide de récupérer les données',
            'Non, car payer ne garantit pas la récupération des données, finance les criminels, et peut exposer à une seconde attaque',
            'Oui, mais seulement si les sauvegardes ne fonctionnent pas',
            'C\'est au DSI seul de décider'
          ],
          correct: 1,
          explanation: 'Les recommandations officielles (ANSSI, FBI) déconseillent fortement le paiement : seule 65% des entreprises qui paient récupèrent leurs données ; payer finance les attaquants ; cela fait de vous une cible "payante" pour de futures attaques. La priorité : les sauvegardes propres (hors ligne, air-gapped), les experts en réponse à incidents, le dépôt de plainte.'
        },
        {
          q: 'Comment informer les clients de l\'incident ?',
          options: [
            'Ne rien dire pour ne pas inquiéter et attendre que tout soit réglé',
            'Communication transparente et rapide : informer les clients de l\'incident, des impacts, du calendrier de reprise et des mesures prises',
            'Publier le communiqué uniquement si les médias en parlent',
            'Informer uniquement les clients directement touchés par une livraison manquée'
          ],
          correct: 1,
          explanation: 'La communication transparente est obligatoire (RGPD : notification CNIL sous 72h si données personnelles affectées) et stratégique : les clients découvriront l\'incident de toute façon. Une communication proactive montre la maîtrise de la situation et préserve la confiance. Cacher l\'information se retourne toujours contre l\'entreprise.'
        }
      ]
    },
    {
      id: 4,
      title: 'Transformation digitale : lancement d\'une initiative IA',
      context: 'La DSI de Retail+ (chaîne de 200 magasins, 3 Md€ de CA) est sollicitée par la DG pour "faire de l\'IA". Le PDG revient d\'une conférence enthousiasmé par ChatGPT et veut "de l\'IA partout dans les 6 mois". La DSI doit structurer une réponse sérieuse : identifier les cas d\'usage à valeur, construire la capacité IA de l\'entreprise, éviter les projets "gadgets", et gérer les risques (biais, RGPD, coûts).  Le RSSI s\'inquiète de la sécurité des données, la DRH craint la suppression de postes, et la direction financière demande un ROI clair.',
      problem: 'Comment structurer une initiative IA ambitieuse mais réaliste, en 6 mois ? Quels cas d\'usage prioriser ? Comment construire la gouvernance IA ? Comment gérer les craintes des équipes ? Comment mesurer le succès ?',
      questions: [
        {
          q: 'Comment identifier les meilleurs cas d\'usage IA pour commencer ?',
          options: [
            'Implementer ChatGPT pour tous les employés immédiatement car tout le monde en parle',
            'Cartographier les processus, identifier ceux à fort volume/répétitif/données disponibles, calculer le ROI potentiel et choisir 2-3 cas à fort impact',
            'Laisser chaque département choisir ses propres outils IA librement',
            'Copier ce que font les concurrents dans leur communication externe'
          ],
          correct: 1,
          explanation: 'Les meilleurs cas d\'usage IA ont 3 caractéristiques : fort volume (rentabilise l\'investissement), données disponibles et de qualité (le carburant de l\'IA), et ROI mesurable. Exemples retail : prévision des stocks (réduction des ruptures de -15%), personnalisation des promotions (uplift CA +5%), optimisation des plannings (réduction coûts RH). Commencer par 1-2 quick wins à impact visible.'
        },
        {
          q: 'Comment gérer les craintes de la DRH sur la suppression de postes due à l\'IA ?',
          options: [
            'Promettre qu\'aucun poste ne sera supprimé grâce à l\'IA',
            'Ignorer ces craintes : la transformation est inévitable',
            'Communiquer honnêtement sur l\'impact, accompagner la reconversion, positionner l\'IA comme augmentation des capacités humaines, pas remplacement',
            'Retarder les projets IA jusqu\'à ce que la DRH soit d\'accord'
          ],
          correct: 2,
          explanation: 'Les études montrent que l\'IA transforme les métiers plus qu\'elle ne les supprime (dans l\'immédiat). La clé : être honnête sur les impacts, créer un plan de formation et de reconversion, identifier les nouvelles compétences nécessaires (prompt engineering, supervision IA), et montrer des exemples où l\'IA libère les employés des tâches répétitives pour les tâches à valeur ajoutée.'
        },
        {
          q: 'Quelle gouvernance mettre en place pour les projets IA ?',
          options: [
            'Aucune : la gouvernance ralentit l\'innovation IA',
            'Un comité IA regroupant DSI, DPO, Métiers, Juridique pour évaluer chaque projet sur éthique, RGPD, risques et ROI avant lancement',
            'Laisser chaque équipe IT décider seule de ses projets IA',
            'Confier toute la gouvernance IA à un prestataire externe'
          ],
          correct: 1,
          explanation: 'La gouvernance IA est indispensable : chaque projet IA touche à des données (RGPD), à des décisions impactant des personnes (biais, explicabilité) et engage des coûts significatifs. Le comité IA évalue : Quelles données sont utilisées ? Y a-t-il des biais ? Le modèle est-il explicable ? L\'usage est-il conforme au RGPD ? Quel est le ROI attendu ? Sans gouvernance, on crée des risques légaux et éthiques majeurs.'
        }
      ]
    }
  ]
};
