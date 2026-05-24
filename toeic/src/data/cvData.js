export const BASE_CV = {
  personal: {
    firstName: 'Orone',
    lastName: 'BAR OR',
    title: 'Alternant PMO',
    email: 'oronebaror1@gmail.com',
    phone: '06 98 34 09 57',
    location: 'Deuil la Barre, Île-de-France',
    linkedin: 'www.linkedin.com/in/orone-bar-or',
    summary: "Actuellement en Bachelor Management et Conseil des Systèmes d'Information à l'ESGI, je recherche une alternance pour mon mastère 2026-2027, idéalement en tant que Data Analyst, Business Analyst ou Chef de projet IA/Data. Curieux, motivé et adaptable, je suis disponible dès septembre pour rejoindre une équipe et développer mes compétences.",
  },

  experiences: [
    {
      id: 'coloplast-analyst',
      company: 'Laboratoire COLOPLAST',
      role: 'Stage Data Analyst',
      sector: 'Distribution de dispositifs médicaux',
      startDate: '09/02/2026',
      endDate: '28/08/2026',
      duration: '6 mois',
      bullets: [
        'Pilotage Power BI : Maintenance évolutive, conception et déploiement de rapports sur Power BI Service',
        'Analyse & Optimisation DAX : Optimisation et création de mesures complexes et analyse de KPIs orientés développement commercial',
        'Data Management : Extraction et structuration de flux de données via SQL Server et Power Query',
        'Support Métier : Présentation de dashboards et rédaction de documentations techniques',
        'Excel : Analyse exploratoire et structuration de données via Tableaux Croisés Dynamiques avancés',
      ],
    },
    {
      id: 'cacib',
      company: 'Crédit Agricole CIB',
      role: 'Stage Web Designer',
      sector: "Banque d'investissement",
      startDate: '04/06/2025',
      endDate: '31/07/2025',
      duration: '2 mois',
      bullets: [
        'Création de maquettes via Figma pour un site de documentation destiné aux collaborateurs, investisseurs et clients',
        "Tests et analyse du site web de documentation pour détecter les erreurs et proposer des améliorations afin d'optimiser l'expérience utilisateur",
      ],
    },
    {
      id: 'coloplast-quality',
      company: 'Laboratoire COLOPLAST',
      role: 'Stage Analyste qualité de données',
      sector: 'Distribution de dispositifs médicaux',
      startDate: '24/05/2024',
      endDate: '31/07/2024',
      duration: '2 mois',
      bullets: [
        'Dédoublonnage de la base clients Salesforce : analyse, filtrage et suppression des doublons pour améliorer la qualité des données',
        "Création d'une procédure et d'un dashboard Power BI de suivi pour une meilleure fiabilité des campagnes commerciales",
      ],
    },
  ],

  education: [
    {
      id: 'esgi',
      institution: 'ESGI — École Supérieure de Génie Informatique',
      degree: 'Bachelor Management et Conseil des Systèmes d\'Information (en cours)',
      location: 'Paris 12',
      startYear: '2023',
      endYear: '2026',
      projects: [
        {
          title: 'Projets Data & Analyse',
          bullets: [
            "Réalisation d'un projet complet d'analyse de données à partir d'un dataset du secteur de l'assurance",
            "Nettoyage, traitement et visualisation des données à l'aide de Python (pandas, matplotlib, seaborn)",
            "Analyse approfondie : corrélations, influence de l'âge, du tabagisme sur les coûts d'assurance",
            "Création de visualisations pertinentes pour dégager les tendances et comportements des assurés",
          ],
        },
        {
          title: 'Projet annuel (2024–2025)',
          bullets: [
            "Participation à la refonte complète du SI d'une entreprise multisite",
            'Pilotage du projet (Trello, Gantt), chiffrage budgétaire et livrables techniques (Plage IP, DAT, RACI…)',
            "Déploiement d'infrastructure réseau sécurisée avec VPN IPsec over GRE via firewalls pfsense, ActiveDirectory, DNS",
            "Virtualisation & Dockerisation de l'environnement (Proxmox)",
          ],
        },
      ],
    },
    {
      id: 'bac',
      institution: 'Lycée R.E.V.E, Montmagny',
      degree: 'Baccalauréat général — spécialités Mathématiques et Physique-Chimie',
      startYear: '2020',
      endYear: '2023',
    },
  ],

  skills: {
    'Data & Business Intelligence': [
      'Power BI (rapports dynamiques, analyse visuelle)',
      'DAX (mesures & optimisation)',
      'SQL (MCD/MLD)',
      'Power Query',
      'Data Preparation (nettoyage, imputation, dummification)',
      'Ingénierie des besoins',
    ],
    'Organisation & Gestion de projet': [
      'Pilotage de projet (RACI, Trello, Gantt)',
      'Rédaction de livrables (DAT, Chart graphics…)',
      'Analyse de processus IT',
      'Rédaction de SFD & User Stories',
      'Méthodologies Agile (Scrum, Kanban), Cycle en V',
      'Gestion des risques',
      'Pack Office',
      'Jira',
    ],
    'Infrastructure & Déploiement': [
      'Administration Windows Server (Active Directory, DNS, GPO)',
      'Virtualisation (VMware Workstation, Proxmox)',
      'Cloud (Microsoft Azure, Render)',
      'Git / GitHub',
    ],
    'Intelligence Artificielle': [
      'Fondamentaux IA (réseaux de neurones, cycle de vie projet IA)',
      'Analyse de données (datasets, corrélations, tendances)',
      'Python (Pandas, Matplotlib, Seaborn)',
    ],
    'Culture technique': [
      'Programmation (Java, JavaScript, PHP/HTML, C)',
      'Figma (maquettes UX)',
      'Salesforce (CRM)',
    ],
  },

  certifications: [
    { name: 'Introduction to Cybersecurity', issuer: 'Cisco Networking Academy', year: '2024' },
    { name: 'Introduction to Data Science', issuer: 'Cisco Networking Academy', year: '2024' },
  ],

  languages: [
    { language: 'Français', level: 'Langue maternelle' },
    { language: 'Anglais', level: 'Niveau A2 (objectif 700 TOEIC fin 2026)' },
  ],

  softSkills: [
    'Travail en équipe',
    'Gestion d\'équipe',
    'Esprit d\'analyse',
    'Priorisation des tâches',
    'Rigueur',
    'Communication et vulgarisation des concepts techniques',
  ],

  interests: ['Veille / IA', 'Jeux de stratégie ou d\'aventure'],
};

export const JOB_KEYWORDS = {
  'Data Analyst': ['power bi', 'sql', 'dax', 'analyse', 'données', 'kpi', 'dashboard', 'tableau', 'python', 'bi', 'reporting', 'excel', 'data', 'visualisation', 'etl', 'base de données'],
  'Business Analyst': ['user stories', 'sfd', 'moa', 'recueil besoins', 'processus', 'analyse', 'agile', 'scrum', 'jira', 'fonctionnel', 'métier', 'spécifications'],
  'Chef de Projet': ['pilotage', 'raci', 'gantt', 'planning', 'budget', 'livrables', 'risques', 'équipe', 'coordination', 'gestion de projet', 'pmo', 'prince2', 'pmbok'],
  'Product Owner': ['user stories', 'backlog', 'sprint', 'scrum', 'agile', 'kanban', 'roadmap', 'priorisation', 'valeur métier', 'stakeholders'],
  'Consultant SI': ['systèmes d\'information', 'si', 'conseil', 'transformation', 'erp', 'itil', 'gouvernance', 'schéma directeur', 'amoa'],
  'Data Engineer': ['sql', 'etl', 'pipeline', 'python', 'spark', 'azure', 'cloud', 'données', 'base de données', 'infrastructure data'],
  'Chef de Projet IA': ['ia', 'intelligence artificielle', 'machine learning', 'llm', 'données', 'python', 'projet', 'gestion', 'agile'],
};

export const COVER_LETTER_TEMPLATES = {
  classique: {
    name: 'Classique',
    description: 'Formel, structuré, adapté aux grandes entreprises',
    template: (cv, job) => `${cv.personal.firstName} ${cv.personal.lastName}
${cv.personal.location}
${cv.personal.phone} — ${cv.personal.email}

Madame, Monsieur,

Actuellement en Bachelor Management et Conseil des Systèmes d'Information à l'ESGI, je me permets de vous adresser ma candidature pour le poste de ${job.title}${job.company ? ` au sein de ${job.company}` : ''}.

Mon parcours m'a permis de développer des compétences solides en ${job.highlightedSkills?.slice(0, 3).join(', ') || 'gestion de projet et analyse de données'}, notamment à travers mes expériences chez COLOPLAST où j'ai pu concevoir et déployer des rapports Power BI, optimiser des mesures DAX complexes et structurer des flux de données via SQL Server.

${job.company ? `Votre entreprise m'attire particulièrement pour` : 'Ce poste m\'attire particulièrement pour'} son positionnement dans ${job.sector || 'votre secteur d\'activité'} et les missions qui correspondent pleinement à mes aspirations professionnelles.

Fort de mon expérience en ${job.highlightedSkills?.[0] || 'gestion de données'} et de mes projets académiques à l'ESGI, je suis convaincu de pouvoir apporter une valeur ajoutée significative à votre équipe. Ma rigueur, mon esprit d'analyse et ma capacité à vulgariser les concepts techniques auprès des équipes métier constituent des atouts pour ce poste.

Dans l'attente d'un entretien qui me permettrait de vous exposer ma motivation, je reste à votre disposition pour tout renseignement complémentaire.

Veuillez agréer, Madame, Monsieur, l'expression de mes salutations distinguées.

${cv.personal.firstName} ${cv.personal.lastName}`,
  },

  dynamique: {
    name: 'Dynamique',
    description: 'Percutant, orienté impact, adapté aux startups et scale-ups',
    template: (cv, job) => `${cv.personal.firstName} ${cv.personal.lastName} — Candidature ${job.title || 'Alternance'}
${cv.personal.phone} | ${cv.personal.email} | ${cv.personal.linkedin}

Bonjour,

En une phrase : je suis ${cv.personal.firstName}, étudiant en 3ème année de Bachelor MCSI à l'ESGI, et je cherche une alternance où je peux contribuer concrètement dès le premier jour — pas juste observer.

**Ce que j'ai fait :**
Chez COLOPLAST (6 mois), j'ai pris en charge la refonte de dashboards Power BI critiques, optimisé des mesures DAX complexes et structuré des flux de données SQL utilisés par les équipes commerciales. Résultat : des rapports plus fiables, plus rapides, directement actionnables par le métier.

**Ce qui m'attire ici :**
${job.company ? `Chez ${job.company}, ` : ''}le poste de ${job.title || 'Data Analyst'} correspond exactement à la direction que je veux donner à ma carrière : ${job.sector || 'travailler sur des problématiques data concrètes et à fort impact'}.

**Ce que j'apporte :**
${job.highlightedSkills?.slice(0, 4).map(s => `→ ${s}`).join('\n') || '→ Power BI, DAX, SQL\n→ Gestion de projet Agile\n→ Analyse et visualisation de données\n→ Communication claire avec les équipes métier'}

Disponible dès septembre, je serais ravi d'échanger sur la manière dont je peux contribuer à votre équipe.

${cv.personal.firstName} ${cv.personal.lastName}`,
  },

  impact: {
    name: 'Impact',
    description: 'Basé sur les résultats, chiffres et preuves concrètes',
    template: (cv, job) => `${cv.personal.firstName} ${cv.personal.lastName}
${cv.personal.email} | ${cv.personal.phone} | ${cv.personal.linkedin}

Objet : Candidature — ${job.title || 'Alternance Data / BI'}${job.company ? ` | ${job.company}` : ''}

Madame, Monsieur,

3 stages, 10 mois d'expérience terrain, et une conviction : la donnée bien traitée change les décisions métier.

**Mes preuves concrètes :**

▸ COLOPLAST (6 mois, Data Analyst) — Déployé des rapports Power BI utilisés quotidiennement par les équipes commerciales ; optimisé des mesures DAX réduisant les temps de calcul ; structuré l'extraction de données SQL pour automatiser des reportings manuels.

▸ COLOPLAST (2 mois, Qualité données) — Nettoyé et dédoublonné une base Salesforce de plusieurs milliers d'entrées, améliorant directement la fiabilité des campagnes marketing.

▸ Crédit Agricole CIB (2 mois) — Conçu des maquettes Figma validées par les équipes UX d'une banque d'investissement internationale.

**Pour le poste de ${job.title || 'Data Analyst'} :**
Compétences directement mobilisables : ${job.highlightedSkills?.join(', ') || 'Power BI, SQL, DAX, Python, Agile, gestion de projet'}.

Je suis disponible dès septembre 2026 en alternance (3 semaines entreprise / 1 semaine école).

Dans l'attente de votre retour,
${cv.personal.firstName} ${cv.personal.lastName}`,
  },
};
