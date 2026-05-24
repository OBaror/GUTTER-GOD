export const jiraContent = {
  glossary: [
    { id: 1, term: 'Epic', definition: 'Un grand corps de travail qui peut être divisé en plusieurs stories. Une Epic représente un objectif business majeur.', example: 'Epic: "Refonte du module de paiement"', category: 'Agile' },
    { id: 2, term: 'User Story', definition: 'Description d\'une fonctionnalité du point de vue de l\'utilisateur, suivant le format : "En tant que [rôle], je veux [action] afin de [bénéfice]".', example: 'En tant qu\'acheteur, je veux payer en un clic afin de gagner du temps.', category: 'Agile' },
    { id: 3, term: 'Task', definition: 'Une unité de travail concrète et technique, souvent une sous-division d\'une story. Réalisable par un développeur en quelques heures.', example: 'Task: "Créer l\'API endpoint POST /payments"', category: 'Agile' },
    { id: 4, term: 'Bug', definition: 'Un défaut ou comportement inattendu dans le logiciel qui doit être corrigé.', example: 'Bug: "Le bouton de connexion ne fonctionne pas sur iOS"', category: 'Jira' },
    { id: 5, term: 'Sprint', definition: 'Période de temps fixe (généralement 1 à 4 semaines) pendant laquelle l\'équipe s\'engage à livrer un ensemble de fonctionnalités.', example: 'Sprint 12 : du 1er au 14 juin, objectif : livrer le module de recherche.', category: 'Scrum' },
    { id: 6, term: 'Backlog', definition: 'Liste priorisée de toutes les fonctionnalités, corrections et améliorations à réaliser pour un produit.', example: 'Le Product Backlog contient 120 stories classées par valeur business.', category: 'Scrum' },
    { id: 7, term: 'Velocity', definition: 'Nombre moyen de story points accomplis par l\'équipe lors d\'un sprint. Indicateur de capacité de l\'équipe.', example: 'L\'équipe a une vélocité de 40 story points par sprint.', category: 'Scrum' },
    { id: 8, term: 'Burndown Chart', definition: 'Graphique montrant la quantité de travail restant dans un sprint ou un projet par rapport au temps.', example: 'Le burndown chart montre qu\'il reste 20 points à réaliser à J-3 du sprint.', category: 'Scrum' },
    { id: 9, term: 'Definition of Done (DoD)', definition: 'Critères communs que chaque incrément doit respecter pour être considéré comme terminé (tests passés, code reviewé, déployé, etc.).', example: 'DoD : code reviewé, tests unitaires à 80%, déployé en staging, documentation mise à jour.', category: 'Scrum' },
    { id: 10, term: 'Product Owner (PO)', definition: 'Responsable de maximiser la valeur du produit. Priorise le backlog, représente les besoins du business et des utilisateurs.', example: 'La PO a décidé de prioriser le paiement mobile avant la recherche avancée.', category: 'Scrum' },
    { id: 11, term: 'Scrum Master', definition: 'Facilitateur de l\'équipe Scrum. Il protège l\'équipe des perturbations, lève les obstacles et s\'assure que le processus Scrum est bien appliqué.', example: 'Le Scrum Master organise les cérémonies et résout le problème d\'accès à la base de données.', category: 'Scrum' },
    { id: 12, term: 'Dev Team', definition: 'Équipe auto-organisée et pluridisciplinaire chargée de livrer l\'incrément de produit à chaque sprint (développeurs, testeurs, designers…).', example: 'La Dev Team est composée de 5 développeurs, 1 designer et 1 testeur.', category: 'Scrum' },
    { id: 13, term: 'Daily Standup', definition: 'Réunion quotidienne de 15 minutes maximum où chaque membre répond : Qu\'ai-je fait hier ? Que vais-je faire aujourd\'hui ? Y a-t-il des obstacles ?', example: 'Daily à 9h30 : chaque membre parle 2 minutes maximum.', category: 'Ceremonies' },
    { id: 14, term: 'Sprint Planning', definition: 'Cérémonie au début du sprint où l\'équipe sélectionne les stories du backlog et planifie comment les réaliser.', example: 'Sprint Planning : 4h pour un sprint de 2 semaines, l\'équipe sélectionne 40 points.', category: 'Ceremonies' },
    { id: 15, term: 'Sprint Review', definition: 'Cérémonie de fin de sprint où l\'équipe démontre ce qui a été accompli aux parties prenantes et recueille leurs retours.', example: 'Sprint Review : démonstration du module de paiement aux clients et direction.', category: 'Ceremonies' },
    { id: 16, term: 'Sprint Retrospective', definition: 'Cérémonie de fin de sprint où l\'équipe analyse son fonctionnement et identifie des améliorations pour le prochain sprint.', example: 'Rétro : "Ce qui a bien marché / Ce qui peut être amélioré / Actions à mettre en place"', category: 'Ceremonies' },
    { id: 17, term: 'Kanban Board', definition: 'Tableau visuel qui représente le flux de travail avec des colonnes (To Do, In Progress, Done). Permet de visualiser et limiter le travail en cours.', example: 'Le Kanban board a 5 colonnes : Backlog → To Do → In Progress → Review → Done.', category: 'Kanban' },
    { id: 18, term: 'WIP Limit', definition: 'Work In Progress Limit. Nombre maximum de tâches autorisées simultanément dans une colonne du Kanban pour éviter le multitâche excessif.', example: 'WIP Limit de 3 sur la colonne "In Progress" : pas plus de 3 tâches en parallèle.', category: 'Kanban' },
    { id: 19, term: 'Workflow', definition: 'Suite d\'étapes par lesquelles passe un ticket de sa création à sa clôture.', example: 'Workflow : Open → In Progress → Code Review → Testing → Done', category: 'Jira' },
    { id: 20, term: 'Transition', definition: 'Action qui fait passer un ticket d\'un statut à un autre dans le workflow.', example: 'Cliquer sur "Start Progress" est une transition du statut Open vers In Progress.', category: 'Jira' },
    { id: 21, term: 'JQL (Jira Query Language)', definition: 'Langage de requête spécifique à Jira pour filtrer et rechercher des tickets avec précision.', example: 'project = SHOP AND assignee = currentUser() AND status != Done ORDER BY priority DESC', category: 'Jira' },
    { id: 22, term: 'Dashboard Jira', definition: 'Page personnalisable dans Jira affichant des gadgets avec des statistiques, graphiques et filtres sur les projets.', example: 'Dashboard "Sprint en cours" avec : burndown, bugs critiques, tickets assignés.', category: 'Jira' },
    { id: 23, term: 'Filter', definition: 'Requête JQL sauvegardée qui peut être partagée et réutilisée pour afficher des listes de tickets.', example: 'Filtre "Mes bugs critiques" : assignee = me AND type = Bug AND priority = Critical', category: 'Jira' },
    { id: 24, term: 'Component', definition: 'Subdivision d\'un projet Jira permettant de catégoriser les tickets par module fonctionnel ou technique.', example: 'Components : Frontend, Backend, Base de données, API, Mobile', category: 'Jira' },
    { id: 25, term: 'Label', definition: 'Étiquette libre pouvant être ajoutée à un ticket pour le catégoriser de façon flexible et non hiérarchique.', example: 'Labels : "performance", "sécurité", "accessibilité", "urgent"', category: 'Jira' },
    { id: 26, term: 'Priority', definition: 'Niveau d\'importance d\'un ticket. Généralement : Blocker, Critical, Major, Minor, Trivial.', example: 'Bug "Impossible de se connecter" = priorité Blocker (bloque tous les utilisateurs).', category: 'Jira' },
    { id: 27, term: 'Story Points', definition: 'Unité de mesure relative utilisée pour estimer l\'effort nécessaire pour réaliser une story. Ne représente pas des heures.', example: 'Une story simple = 1-2 points. Une story complexe = 8-13 points.', category: 'Scrum' },
    { id: 28, term: 'Fibonacci Sequence', definition: 'Suite numérique (1, 2, 3, 5, 8, 13, 21…) utilisée pour les estimations en Agile, car elle reflète l\'incertitude croissante pour les grandes tâches.', example: 'On utilise 1, 2, 3, 5, 8, 13 pour l\'estimation : pas 10 ou 12 (trop de précision illusoire).', category: 'Scrum' },
    { id: 29, term: 'Planning Poker', definition: 'Technique d\'estimation collaborative : chaque membre révèle simultanément sa carte (story points) pour éviter l\'influence mutuelle.', example: 'Planning Poker : le PO lit la story, l\'équipe vote simultanément. Si désaccord, on discute.', category: 'Ceremonies' },
    { id: 30, term: 'Release', definition: 'Version d\'un logiciel livrée aux utilisateurs finaux. Regroupe plusieurs sprints ou fonctionnalités.', example: 'Release 2.0 : livraison de 3 mois de développement avec 15 nouvelles fonctionnalités.', category: 'Agile' },
    { id: 31, term: 'Roadmap', definition: 'Plan visuel de haut niveau montrant les grandes étapes et objectifs d\'un produit dans le temps.', example: 'Roadmap Q1 : lancement paiement mobile. Q2 : internationalisation. Q3 : app mobile.', category: 'Agile' },
    { id: 32, term: 'Swimlane', definition: 'Ligne horizontale sur un board Jira/Kanban permettant de grouper les tickets (par Epic, équipe, priorité…).', example: 'Swimlanes par Epic : "Paiement" / "Recherche" / "Compte utilisateur"', category: 'Kanban' },
    { id: 33, term: 'Board', definition: 'Vue visuelle dans Jira affichant les tickets selon leur statut. Peut être de type Scrum (avec sprints) ou Kanban (flux continu).', example: 'Le board Scrum montre les tickets du sprint en cours dans des colonnes par statut.', category: 'Jira' },
    { id: 34, term: 'Assignee', definition: 'Membre de l\'équipe responsable de la réalisation d\'un ticket.', example: 'L\'assignee du bug est Sophie, développeuse backend.', category: 'Jira' },
    { id: 35, term: 'Reporter', definition: 'Personne qui a créé ou signalé un ticket dans Jira.', example: 'Le reporter du bug est Marc, qui l\'a découvert lors des tests.', category: 'Jira' },
    { id: 36, term: 'Watcher', definition: 'Personne qui suit un ticket pour être notifiée des changements sans en être responsable.', example: 'Le PO est watcher sur tous les bugs critiques pour être informé en temps réel.', category: 'Jira' },
    { id: 37, term: 'Comment', definition: 'Note textuelle ajoutée à un ticket pour communiquer des informations, poser des questions ou documenter des décisions.', example: 'Comment : "Bug reproduit sur Chrome 120 mais pas sur Firefox. Vérification en cours."', category: 'Jira' },
    { id: 38, term: 'Attachment', definition: 'Fichier joint à un ticket (screenshot, log, fichier de conception, etc.).', example: 'Attachment : screenshot du bug + fichier de logs système joint au ticket.', category: 'Jira' },
    { id: 39, term: 'Subtask', definition: 'Sous-tâche liée à une story ou tâche parente. Permet de décomposer le travail en unités plus petites.', example: 'Story "Connexion Google" → Subtasks : "OAuth config", "UI bouton", "Tests", "Documentation"', category: 'Jira' },
    { id: 40, term: 'Link', definition: 'Relation entre deux tickets Jira (bloque, est bloqué par, est lié à, duplique, etc.).', example: 'Le bug #456 "bloque" la story #123 qui ne peut pas être livrée avant sa correction.', category: 'Jira' },
    { id: 41, term: 'Increment', definition: 'Résultat cumulatif et utilisable livré à la fin de chaque sprint. Doit être potentiellement livrable.', example: 'L\'incrément du Sprint 5 : fonctionnalité de recherche + corrections de 3 bugs.', category: 'Scrum' },
    { id: 42, term: 'Sprint Goal', definition: 'Objectif clair et mesurable que l\'équipe s\'engage à atteindre pendant le sprint.', example: 'Sprint Goal : "L\'utilisateur peut créer un compte et se connecter de façon sécurisée"', category: 'Scrum' },
    { id: 43, term: 'Cumulative Flow Diagram', definition: 'Graphique Kanban montrant le volume de travail dans chaque statut au fil du temps. Révèle les goulots d\'étranglement.', example: 'Le CFD montre un goulot en "Code Review" : trop de tickets bloqués à cet étape.', category: 'Kanban' },
    { id: 44, term: 'Lead Time', definition: 'Temps total entre la création d\'un ticket et sa livraison finale. Indicateur de performance Kanban.', example: 'Lead time moyen de l\'équipe : 8 jours de la demande à la livraison en production.', category: 'Kanban' },
    { id: 45, term: 'Cycle Time', definition: 'Temps entre le début du travail actif sur un ticket et sa livraison. Plus court que le lead time.', example: 'Cycle time : 3 jours entre "In Progress" et "Done".', category: 'Kanban' },
  ],

  quizzes: [
    { id: 1, question: 'Quel est le rôle principal du Product Owner ?', options: ['Coder les fonctionnalités', 'Prioriser le backlog et maximiser la valeur du produit', 'Animer les cérémonies Scrum', 'Gérer les serveurs de production'], correct: 1, explanation: 'Le Product Owner priorise le Product Backlog selon la valeur business et représente les besoins des utilisateurs. Il décide QUOI faire, mais pas COMMENT le faire.', topic: 'scrum-roles' },
    { id: 2, question: 'Quelle est la durée maximale recommandée d\'un Daily Standup ?', options: ['30 minutes', '1 heure', '15 minutes', '5 minutes'], correct: 2, explanation: 'Le Daily Standup dure maximum 15 minutes. C\'est une réunion de synchronisation rapide, pas une réunion de résolution de problèmes. Les discussions approfondies se font après.', topic: 'ceremonies' },
    { id: 3, question: 'Qu\'est-ce qu\'un Sprint Backlog ?', options: ['Liste de tous les bugs du projet', 'Liste des stories sélectionnées pour le sprint en cours', 'Liste de toutes les fonctionnalités du produit', 'Liste des utilisateurs du système'], correct: 1, explanation: 'Le Sprint Backlog contient les stories sélectionnées lors du Sprint Planning pour être réalisées pendant le sprint en cours. C\'est différent du Product Backlog qui liste tout le travail à faire.', topic: 'artifacts' },
    { id: 4, question: 'Comment écrire une User Story correctement ?', options: ['Comme une spécification technique détaillée', '"En tant que [rôle], je veux [action] afin de [bénéfice]"', 'Avec des diagrammes UML', 'En listant les tâches techniques nécessaires'], correct: 1, explanation: 'Le format standard est "En tant que [rôle], je veux [action] afin de [bénéfice]". Ce format place l\'utilisateur au centre et explique le POURQUOI, pas seulement le QUOI.', topic: 'artifacts' },
    { id: 5, question: 'Quelle cérémonie Scrum a lieu à la FIN d\'un sprint et sert à améliorer le processus ?', options: ['Sprint Planning', 'Daily Standup', 'Sprint Review', 'Sprint Retrospective'], correct: 3, explanation: 'La Rétrospective permet à l\'équipe de réfléchir à son fonctionnement et de définir des actions d\'amélioration. La Review concerne le PRODUIT, la Rétrospective concerne le PROCESSUS.', topic: 'ceremonies' },
    { id: 6, question: 'Que signifie "WIP Limit" dans Kanban ?', options: ['Work In Progress Limit : limite le nombre de tâches simultanées', 'Work Is Pending : tâches en attente', 'Web Integration Protocol : protocole technique', 'Weekly Iteration Plan : plan hebdomadaire'], correct: 0, explanation: 'WIP Limit (Work In Progress Limit) est une règle Kanban qui limite le nombre de tâches dans une colonne. Cela force à finir avant de commencer et révèle les goulots d\'étranglement.', topic: 'kanban' },
    { id: 7, question: 'Pourquoi utilise-t-on la suite de Fibonacci pour les estimations en Agile ?', options: ['Car c\'est un standard ISO obligatoire', 'Car les écarts reflètent l\'incertitude croissante des grandes tâches', 'Car les développeurs l\'ont toujours utilisée', 'Pour calculer les salaires de l\'équipe'], correct: 1, explanation: 'La suite de Fibonacci (1,2,3,5,8,13,21...) reflète la réalité : plus une tâche est grande, moins on peut l\'estimer précisément. L\'écart entre 13 et 21 reconnaît cette incertitude.', topic: 'estimation' },
    { id: 8, question: 'Qu\'est-ce que la "Definition of Done" ?', options: ['La date de fin du projet', 'Liste de critères communs pour qu\'un ticket soit considéré terminé', 'Le budget maximum d\'une story', 'Le nombre maximum de bugs autorisés'], correct: 1, explanation: 'La DoD est un accord d\'équipe sur les critères qu\'un ticket doit remplir pour être "Done" : tests passés, code reviewé, documenté, déployé en staging, etc.', topic: 'artifacts' },
    { id: 9, question: 'Quel est le rôle du Scrum Master ?', options: ['Chef de projet qui assigne les tâches', 'Manager hiérarchique de l\'équipe', 'Facilitateur qui lève les obstacles et protège l\'équipe', 'Développeur principal du projet'], correct: 2, explanation: 'Le Scrum Master est un servant-leader : il facilite les cérémonies, lève les obstacles (impediments), coache l\'équipe sur Scrum et la protège des perturbations externes. Il ne commande pas.', topic: 'scrum-roles' },
    { id: 10, question: 'Qu\'est-ce que la vélocité d\'une équipe Scrum ?', options: ['La vitesse de déploiement en production', 'Le nombre moyen de story points complétés par sprint', 'Le nombre de développeurs dans l\'équipe', 'Le temps passé en réunion par sprint'], correct: 1, explanation: 'La vélocité est la moyenne de story points accomplis par sprint. Elle sert à prévoir combien de travail l\'équipe peut prendre dans le prochain sprint. Elle s\'observe, on ne la fixe pas.', topic: 'estimation' },
    { id: 11, question: 'Dans Jira, que permet le JQL ?', options: ['Créer des workflows', 'Coder des fonctionnalités directement dans Jira', 'Filtrer et rechercher des tickets avec précision', 'Gérer les droits d\'accès des utilisateurs'], correct: 2, explanation: 'Le JQL (Jira Query Language) est le langage de requête de Jira. Il permet de créer des recherches très précises : par projet, statut, assignee, date, type de ticket, etc.', topic: 'jira-ui' },
    { id: 12, question: 'Quelle est la différence entre un board Scrum et un board Kanban dans Jira ?', options: ['Il n\'y a aucune différence', 'Scrum a des sprints fixes, Kanban a un flux continu sans sprint', 'Kanban est pour les grands projets, Scrum pour les petits', 'Scrum est gratuit, Kanban est payant'], correct: 1, explanation: 'Le board Scrum organise le travail en sprints de durée fixe. Le board Kanban fonctionne en flux continu avec des WIP limits. Le choix dépend de la nature du travail et de l\'équipe.', topic: 'jira-ui' },
    { id: 13, question: 'Qu\'est-ce qu\'une Epic dans Agile ?', options: ['Un bug très grave et urgent', 'Un grand corps de travail divisible en plusieurs stories', 'Le nom d\'un développeur senior', 'Un sprint de 4 semaines'], correct: 1, explanation: 'Une Epic représente un objectif business majeur qui prend plusieurs sprints à réaliser. Elle se décompose en User Stories. Exemple : "Système de paiement" = Epic contenant 15 stories.', topic: 'artifacts' },
    { id: 14, question: 'Lors d\'un Sprint Planning, que fait l\'équipe ?', options: ['Elle corrige les bugs de la semaine', 'Elle sélectionne les stories du backlog et planifie le sprint', 'Elle présente le produit aux clients', 'Elle analyse les problèmes du sprint précédent'], correct: 1, explanation: 'Le Sprint Planning : le PO présente les stories prioritaires, l\'équipe estime et sélectionne ce qu\'elle peut faire, puis planifie comment réaliser les stories (création de tâches).', topic: 'ceremonies' },
    { id: 15, question: 'Qu\'est-ce que le Planning Poker ?', options: ['Un jeu de hasard pour choisir les technologies', 'Technique d\'estimation où les membres votent simultanément', 'Un logiciel de gestion de projet', 'Une réunion pour planifier le budget'], correct: 1, explanation: 'Le Planning Poker est une technique d\'estimation collaborative. Chaque membre montre sa carte simultanément pour éviter l\'influence. En cas de désaccord, les extrêmes s\'expliquent et on re-vote.', topic: 'estimation' },
    { id: 16, question: 'Que montre un Burndown Chart ?', options: ['La satisfaction de l\'équipe', 'Le budget consommé', 'Le travail restant dans le sprint au fil du temps', 'Le nombre de bugs trouvés'], correct: 2, explanation: 'Le Burndown Chart montre l\'évolution du travail restant (story points ou tâches) dans le sprint. La courbe idéale descend régulièrement. Une courbe plate = problème, une chute = bon signe.', topic: 'artifacts' },
    { id: 17, question: 'Qu\'est-ce qu\'un "Component" dans Jira ?', options: ['Un plugin Jira payant', 'Une subdivision du projet pour catégoriser les tickets', 'Un type de rapport statistique', 'Un utilisateur avec des droits spéciaux'], correct: 1, explanation: 'Les Components permettent de grouper les tickets par module : Frontend, Backend, API, Mobile... Chaque component peut avoir un responsable par défaut et facilite le filtrage.', topic: 'jira-ui' },
    { id: 18, question: 'Quelle est la différence entre Reporter et Assignee dans Jira ?', options: ['Ce sont des synonymes', 'Reporter = celui qui a créé le ticket, Assignee = celui qui doit le résoudre', 'Reporter = manager, Assignee = développeur', 'Reporter = client, Assignee = chef de projet'], correct: 1, explanation: 'Le Reporter est la personne qui a créé ou signalé le ticket. L\'Assignee est la personne responsable de sa réalisation. Ce peut être la même personne ou des personnes différentes.', topic: 'jira-ui' },
    { id: 19, question: 'Pourquoi la Sprint Review est-elle importante ?', options: ['Pour punir les membres qui n\'ont pas fini leurs tâches', 'Pour obtenir du feedback des parties prenantes sur le produit livré', 'Pour calculer les bonus de l\'équipe', 'Pour tester les performances du serveur'], correct: 1, explanation: 'La Sprint Review permet de présenter l\'incrément aux parties prenantes (clients, management) et d\'obtenir leur feedback. Ce feedback alimentera le backlog pour les prochains sprints.', topic: 'ceremonies' },
    { id: 20, question: 'Qu\'est-ce que le Lead Time en Kanban ?', options: ['Le temps pour former un nouveau développeur', 'Temps total entre la création d\'une demande et sa livraison', 'La durée d\'un sprint', 'Le délai de réponse du serveur'], correct: 1, explanation: 'Le Lead Time mesure le temps total qu\'une demande prend, de sa création à sa livraison. Il inclut le temps d\'attente. C\'est un indicateur clé de la performance et de la prévisibilité.', topic: 'kanban' },
    { id: 21, question: 'Combien de membres maximum recommande-t-on dans une équipe Scrum ?', options: ['3 membres', '15 membres', '5 à 9 membres', 'Pas de limite'], correct: 2, explanation: 'Le Guide Scrum recommande 5 à 9 membres (hors PO et Scrum Master). En dessous de 5, on manque de compétences. Au-dessus de 9, la coordination devient trop complexe.', topic: 'scrum-roles' },
    { id: 22, question: 'Qu\'est-ce qu\'une Subtask dans Jira ?', options: ['Un ticket moins important', 'Une sous-tâche liée à une story parente', 'Un bug mineur', 'Un ticket en attente de review'], correct: 1, explanation: 'Une Subtask est une tâche enfant d\'une story ou tâche parente. Elle permet de décomposer le travail en unités réalisables et d\'assigner différentes sous-tâches à différents membres.', topic: 'jira-ui' },
    { id: 23, question: 'Quelle est la fréquence recommandée d\'un sprint ?', options: ['1 jour', '1 à 4 semaines', '3 mois', '6 mois'], correct: 1, explanation: 'La durée recommandée d\'un sprint est de 1 à 4 semaines. La plupart des équipes choisissent 2 semaines (équilibre entre flexibilité et charge de cérémonies). Les sprints doivent avoir une durée fixe.', topic: 'scrum-roles' },
    { id: 24, question: 'Qu\'est-ce qu\'une Roadmap produit ?', options: ['La documentation technique du code', 'Plan visuel des grandes étapes et objectifs du produit dans le temps', 'Le schéma de la base de données', 'Le diagramme de déploiement'], correct: 1, explanation: 'La Roadmap est un plan stratégique qui montre la vision et la direction du produit sur le temps (trimestres, semestres). Elle aide à aligner les équipes et communiquer avec les parties prenantes.', topic: 'artifacts' },
    { id: 25, question: 'Dans Kanban, que se passe-t-il si une colonne atteint son WIP Limit ?', options: ['On supprime des tickets pour libérer de la place', 'On ne peut plus ajouter de tickets tant que la limite n\'est pas libérée', 'On augmente automatiquement la limite', 'Le système envoie une alerte au manager'], correct: 1, explanation: 'Quand une colonne atteint sa WIP Limit, on ARRÊTE de commencer de nouvelles tâches et on AIDE à finir celles en cours. C\'est le principe "Stop starting, start finishing".', topic: 'kanban' },
    { id: 26, question: 'Qu\'est-ce qu\'un "Link" entre deux tickets Jira ?', options: ['Un lien hypertexte dans la description', 'Une relation définie entre deux tickets (bloque, est lié à, etc.)', 'Un raccourci clavier dans Jira', 'Une intégration avec un autre outil'], correct: 1, explanation: 'Les Links permettent de définir des relations entre tickets : "bloque", "est bloqué par", "est lié à", "duplique"... Cela aide à comprendre les dépendances et l\'impact des tickets.', topic: 'jira-ui' },
    { id: 27, question: 'Qui peut mettre à jour le Product Backlog ?', options: ['Uniquement le Scrum Master', 'N\'importe qui dans l\'entreprise', 'Le Product Owner, avec l\'aide de l\'équipe', 'Uniquement les développeurs'], correct: 2, explanation: 'Le Product Owner est seul responsable du Product Backlog. Mais il travaille avec l\'équipe pour l\'estimation et la clarification. Les parties prenantes peuvent suggérer des items, mais le PO décide.', topic: 'scrum-roles' },
    { id: 28, question: 'Qu\'est-ce que le "Cycle Time" en Kanban ?', options: ['La durée d\'un sprint', 'Temps entre le début du travail actif et la livraison d\'un ticket', 'Le temps de réunion hebdomadaire', 'La durée du déploiement en production'], correct: 1, explanation: 'Le Cycle Time mesure le temps de travail actif sur un ticket (de "In Progress" à "Done"). Il est différent du Lead Time qui inclut le temps d\'attente avant que le travail commence.', topic: 'kanban' },
    { id: 29, question: 'Dans quel cas utilise-t-on une "Release" dans Jira ?', options: ['Pour supprimer des tickets terminés', 'Pour grouper des tickets à livrer ensemble dans une version', 'Pour réinitialiser les story points', 'Pour archiver les anciens sprints'], correct: 1, explanation: 'Les Releases (ou Versions dans Jira) permettent de grouper les tickets qui seront livrés ensemble. Elles aident à planifier et tracker la progression vers une version du produit.', topic: 'jira-ui' },
    { id: 30, question: 'Qu\'est-ce que le "Backlog Refinement" (ou Backlog Grooming) ?', options: ['Nettoyer les vieux tickets dans Jira', 'Activité régulière de revue et d\'estimation des tickets du backlog', 'Réunion pour supprimer des membres de l\'équipe', 'Mise à jour des outils de développement'], correct: 1, explanation: 'Le Backlog Refinement est une activité continue où le PO et l\'équipe passent en revue les tickets du backlog : clarification, découpage, estimation. Cela prépare les sprints futurs. (~10% du temps de sprint)', topic: 'ceremonies' },
  ],

  userStories: [
    {
      id: 1,
      context: 'Une équipe développe une application e-commerce. Le PO veut ajouter un système d\'avis clients.',
      badExample: 'Faire le système d\'avis.',
      goodExample: 'En tant qu\'acheteur, je veux pouvoir laisser une note et un commentaire sur un produit que j\'ai acheté, afin d\'aider les autres acheteurs à faire leur choix.',
      tips: [
        'La mauvaise story ne précise pas QUI en a besoin (l\'utilisateur)',
        'Elle ne dit pas POURQUOI c\'est utile (la valeur)',
        'Elle n\'est pas testable (comment sait-on quand c\'est "fait" ?)',
        'La bonne story suit le format As a / I want / So that',
        'Les critères d\'acceptation complètent la story : "La note est de 1 à 5 étoiles, le commentaire est limité à 500 caractères, l\'avis est publié seulement si l\'acheteur a bien commandé le produit"',
      ]
    },
    {
      id: 2,
      context: 'Un service RH veut permettre aux employés de poser des congés en ligne.',
      badExample: 'Le système doit gérer les congés des employés avec validation, calcul des soldes, notifications email, integration avec le calendrier, et export Excel.',
      goodExample: 'En tant qu\'employé, je veux soumettre une demande de congé en ligne, afin de ne plus avoir à remplir un formulaire papier.',
      tips: [
        'La mauvaise story mélange plusieurs fonctionnalités distinctes (validation, calcul, notifications, etc.)',
        'Une bonne story respecte le principe INVEST : Indépendante, Négociable, Valeur, Estimable, Small, Testable',
        'Chaque fonctionnalité (validation manager, notification, calcul solde) devrait être une story séparée',
        'Trop grande = Epic, pas une story. Décompose !',
        'La bonne story est focalisée sur UNE seule action utilisateur',
      ]
    },
    {
      id: 3,
      context: 'Une application bancaire veut améliorer la sécurité de connexion.',
      badExample: 'En tant que système, je veux implémenter OAuth2 avec JWT tokens et Redis session store pour la gestion des authentifications.',
      goodExample: 'En tant que client de la banque, je veux pouvoir me connecter avec mon empreinte digitale, afin d\'accéder rapidement à mon compte sans retaper mon mot de passe.',
      tips: [
        'La mauvaise story est écrite du point de vue technique du système, pas de l\'utilisateur',
        'Elle parle de COMMENT implémenter, pas de ce que veut l\'utilisateur',
        'Une story doit apporter de la valeur à un utilisateur réel, pas au système',
        'Les détails techniques (OAuth2, JWT, Redis) vont dans les tâches techniques liées à la story',
        'Le "So that" doit exprimer un bénéfice utilisateur concret',
      ]
    },
    {
      id: 4,
      context: 'Un outil de gestion de projet veut améliorer le reporting pour les managers.',
      badExample: 'En tant que manager, je veux voir toutes les données de mon équipe.',
      goodExample: 'En tant que chef de projet, je veux voir un tableau de bord avec la vélocité de mon équipe sur les 6 derniers sprints, afin de prévoir la capacité pour la planification trimestrielle.',
      tips: [
        'La mauvaise story est trop vague : "toutes les données" ne dit rien de précis',
        'Elle n\'est pas testable : quand est-ce que "voir toutes les données" est terminé ?',
        'La bonne story spécifie exactement ce qui doit être affiché (vélocité, 6 derniers sprints)',
        'Elle explique le bénéfice concret (planification trimestrielle)',
        'Des critères d\'acceptation précis rendent la story testable',
      ]
    },
    {
      id: 5,
      context: 'Application mobile de livraison, le PO veut améliorer l\'expérience de suivi de commande.',
      badExample: 'En tant qu\'utilisateur, je veux suivre ma commande.',
      goodExample: 'En tant qu\'acheteur, je veux recevoir une notification push quand mon colis est pris en charge par le livreur, afin de savoir exactement quand ma commande sera livrée et me préparer à le réceptionner.',
      tips: [
        '"Utilisateur" est trop générique : quel utilisateur spécifiquement ? Acheteur, livreur, admin ?',
        '"Suivre ma commande" peut signifier beaucoup de choses : notification, carte, email, SMS...',
        'La bonne story précise le canal (notification push) et le déclencheur (colis pris en charge)',
        'Le "afin de" explique le vrai besoin : anticipation de la livraison',
        'Cette story peut générer plusieurs autres stories : suivi GPS temps réel, notification "livré", etc.',
      ]
    },
    {
      id: 6,
      context: 'Plateforme de formation en ligne, besoin d\'améliorer l\'engagement des apprenants.',
      badExample: 'Ajouter la gamification à la plateforme de formation.',
      goodExample: 'En tant qu\'apprenant, je veux gagner des badges quand je termine un module de formation, afin de me motiver à compléter tous les modules de mon parcours.',
      tips: [
        '"Ajouter la gamification" est une solution, pas un besoin utilisateur',
        'Partir du besoin (motivation, engagement) plutôt que de la solution technique',
        'La bonne story définit clairement l\'élément de gamification (badges) et le déclencheur (fin de module)',
        'D\'autres stories pourraient couvrir : classements, points XP, streaks, certificats...',
        'Ne pas implémenter toute la gamification en une seule story : décomposer !',
      ]
    },
    {
      id: 7,
      context: 'Système CRM pour une équipe commerciale, amélioration du suivi des prospects.',
      badExample: 'En tant que commercial, je veux un meilleur CRM avec plus de fonctionnalités.',
      goodExample: 'En tant que commercial, je veux être alerté automatiquement quand un prospect n\'a pas été contacté depuis plus de 7 jours, afin de ne jamais perdre une opportunité de vente par oubli.',
      tips: [
        '"Meilleur CRM avec plus de fonctionnalités" n\'est pas une story, c\'est une Epic ou un projet entier',
        'L\'expression du besoin doit venir d\'un problème réel et concret du commercial',
        'La bonne story résout un problème précis : l\'oubli de relance de prospects',
        'Elle est mesurable : 7 jours de délai, alerte automatique',
        'Critères d\'acceptation : l\'alerte apparaît dans le tableau de bord ET est envoyée par email',
      ]
    },
    {
      id: 8,
      context: 'Application de gestion de budget personnel, amélioration de la visualisation des dépenses.',
      badExample: 'Faire des graphiques de dépenses.',
      goodExample: 'En tant qu\'utilisateur, je veux voir la répartition de mes dépenses par catégorie sous forme de graphique circulaire pour le mois en cours, afin de comprendre rapidement où va mon argent et adapter mon budget.',
      tips: [
        '"Faire des graphiques" ne précise pas le type de graphique, la période, ni les données affichées',
        'La bonne story spécifie : type (circulaire), données (dépenses par catégorie), période (mois en cours)',
        'Le "afin de" révèle le vrai besoin : comprendre et adapter son comportement',
        'Cette précision aide l\'équipe à estimer et à savoir exactement quoi développer',
        'Une story bien écrite réduit les allers-retours et les malentendus avec le PO',
      ]
    },
  ],

  scenarios: [
    {
      id: 1,
      title: 'Sprint Planning : Sélection des stories',
      description: 'Tu es Scrum Master d\'une équipe de 6 personnes avec une vélocité de 35 points. Le PO présente 8 stories prioritaires. Certaines sont trop grandes, certaines mal estimées. Comment gérer le Sprint Planning ?',
      steps: [
        {
          step: 1,
          situation: 'Le PO présente une story de 21 points pour le premier sprint. L\'équipe est hésitante.',
          choices: [
            { text: 'Accepter la story de 21 points tel quel', feedback: 'Risqué : une story de 21 points représente plus de 60% de la vélocité. Si elle n\'est pas finie, le sprint échoue. Mieux vaut la découper.', correct: false },
            { text: 'Demander à découper la story en stories plus petites', feedback: 'Excellente décision ! Une story de 21 points est souvent trop grande pour être finie en un sprint. La découper en 2-3 stories de 5-8 points réduit le risque.', correct: true },
            { text: 'Refuser d\'inclure cette story dans le sprint', feedback: 'Trop radical. Avant de refuser, il faut d\'abord essayer de découper. La story peut avoir une valeur importante.', correct: false },
          ]
        },
        {
          step: 2,
          situation: 'L\'équipe a sélectionné 33 points de stories. Le PO demande d\'en ajouter une de 5 points "très urgente".',
          choices: [
            { text: 'Ajouter la story urgente : le client ne peut pas attendre', feedback: 'Attention : dépasser régulièrement la vélocité crée de la dette et démotive l\'équipe. Si c\'est vraiment urgent, il faut supprimer une autre story de valeur équivalente.', correct: false },
            { text: 'Refuser catégoriquement sans discussion', feedback: 'Pas idéal non plus. Un bon Scrum Master facilite la discussion plutôt que de bloquer.', correct: false },
            { text: 'Proposer d\'échanger la story urgente contre une story de valeur équivalente', feedback: 'Parfait ! On respecte la vélocité ET on traite l\'urgence. Le PO choisit quelle story sort du sprint pour faire entrer l\'urgente. C\'est son rôle de prioriser.', correct: true },
          ]
        },
        {
          step: 3,
          situation: 'Un développeur dit qu\'une story est "facile" et propose de l\'estimer à 1 point. Les autres pensent 3 points.',
          choices: [
            { text: 'Prendre la moyenne : 2 points', feedback: 'La moyenne arithmétique n\'est pas la meilleure approche. Il vaut mieux comprendre les désaccords.', correct: false },
            { text: 'Demander à ceux qui estiment 3 points d\'expliquer leur point de vue', feedback: 'Correct ! Le désaccord est précieux. Celui qui estime 3 points a peut-être repéré une complexité cachée (tests, edge cases, intégrations). La discussion produit une meilleure estimation.', correct: true },
            { text: 'Accepter l\'estimation la plus basse pour finir rapidement', feedback: 'Non. Sous-estimer systématiquement conduit à des sprints ratés et à une vélocité fictive.', correct: false },
          ]
        },
      ],
      bestPractices: [
        'Une story de plus de 13 points est souvent trop grande : découper avant de mettre en sprint',
        'Ne pas dépasser la vélocité : mieux vaut terminer que déborder',
        'Le désaccord dans les estimations est une information précieuse, pas un problème',
        'Le Sprint Goal doit guider les choix : quelles stories contribuent le plus au goal ?',
        'Définir les critères d\'acceptation avant d\'estimer pour éviter les malentendus',
      ]
    },
    {
      id: 2,
      title: 'Daily Standup qui dérape',
      description: 'Lors du Daily Standup, les développeurs commencent à résoudre des problèmes techniques complexes en détail. La réunion dure déjà 25 minutes.',
      steps: [
        {
          step: 1,
          situation: 'Un développeur explique un problème technique complexe depuis 10 minutes. Que fais-tu en tant que Scrum Master ?',
          choices: [
            { text: 'Laisser continuer, c\'est important pour l\'équipe', feedback: 'Non. Le Daily doit rester sous 15 minutes. Les discussions techniques approfondies se font après, avec les personnes concernées uniquement.', correct: false },
            { text: 'Interrompre poliment et proposer une réunion séparée pour résoudre le problème', feedback: 'Parfait ! "Super point, je propose qu\'on creuse ça après le standup avec les personnes concernées." Le Daily reprend son rythme, la complexité est traitée séparément.', correct: true },
            { text: 'Envoyer un email à tout le monde pour se taire', feedback: 'Trop agressif. Le Scrum Master facilite avec bienveillance, pas avec autoritarisme.', correct: false },
          ]
        },
        {
          step: 2,
          situation: 'Un membre de l\'équipe fait son rapport directement au manager (qui assiste au Daily) en ignorant l\'équipe.',
          choices: [
            { text: 'Laisser faire, le manager a le droit d\'être informé', feedback: 'Le Daily est une réunion POUR l\'équipe, pas pour le management. Si les membres parlent au manager, le Daily perd sa fonction de synchronisation d\'équipe.', correct: false },
            { text: 'Demander aux membres de parler à l\'équipe et rappeler que le manager est observateur', feedback: 'Correct. Le Scrum Master peut rappeler discrètement que le Daily est la réunion de l\'équipe. Le management est le bienvenu en observateur silencieux, pas comme destinataire du rapport.', correct: true },
            { text: 'Exclure le manager des futurs Daily', feedback: 'Trop radical comme première étape. D\'abord, sensibiliser doucement. L\'exclusion est une mesure de dernier recours.', correct: false },
          ]
        },
      ],
      bestPractices: [
        '15 minutes maximum, sans exception',
        'Trois questions : Hier ? Aujourd\'hui ? Obstacles ?',
        'Discussions techniques : APRÈS le standup, avec les personnes concernées',
        'Debout (si possible) pour maintenir l\'énergie et la brièveté',
        'Le Scrum Master facilite, ne rapporte pas',
        'Commencer à l\'heure, même si tout le monde n\'est pas là',
      ]
    },
    {
      id: 3,
      title: 'Gestion d\'un bug critique en milieu de sprint',
      description: 'À J+5 d\'un sprint de 10 jours, un bug critique est découvert en production. Il affecte 30% des utilisateurs et bloque leurs achats. Que faire ?',
      steps: [
        {
          step: 1,
          situation: 'Le bug vient d\'être signalé. Quelle est la première action ?',
          choices: [
            { text: 'Informer immédiatement le Product Owner et évaluer l\'impact', feedback: 'Correct ! Le PO est responsable de la priorisation. Il doit connaître l\'impact (30% des utilisateurs, achats bloqués) pour décider si c\'est une priorité absolue.', correct: true },
            { text: 'Commencer à corriger le bug sans en parler à personne', feedback: 'Risqué. Sans information du PO, on ne sait pas si ce bug est la priorité absolue ou s\'il y a des alternatives (workaround temporaire, par exemple).', correct: false },
            { text: 'Attendre la fin du sprint pour le corriger', feedback: 'Impossible. Un bug critique qui bloque 30% des utilisateurs doit être traité immédiatement. Ce n\'est pas une situation normale.', correct: false },
          ]
        },
        {
          step: 2,
          situation: 'Le PO confirme que c\'est prioritaire. Comment l\'intégrer au sprint ?',
          choices: [
            { text: 'Ajouter le bug au sprint et supprimer des stories de valeur équivalente', feedback: 'Bonne approche. On protège la vélocité en retirant du travail pour faire place au bug critique. Le PO choisit quelles stories sortent.', correct: true },
            { text: 'Ajouter le bug au sprint sans rien supprimer', feedback: 'Cela crée une surcharge et risque d\'épuiser l\'équipe. Si on ajoute, on doit aussi retirer pour maintenir l\'équilibre.', correct: false },
            { text: 'Traiter le bug en dehors du sprint sans le tracer dans Jira', feedback: 'Toujours tracer le travail dans Jira ! L\'invisibilité nuit à la transparence et fausse les statistiques de vélocité.', correct: false },
          ]
        },
        {
          step: 3,
          situation: 'Le bug est corrigé. Comment s\'assurer que ça ne se reproduit pas ?',
          choices: [
            { text: 'Ajouter ce bug à la liste des problèmes à éviter', feedback: 'Insuffisant. Une liste sans action concrète ne change rien au processus.', correct: false },
            { text: 'En parler à la prochaine Rétrospective et identifier des actions préventives', feedback: 'Excellent ! La Rétrospective est le bon moment pour analyser : Pourquoi le bug est passé en prod ? Quels tests manquaient ? Quel processus améliorer ? Et définir des actions concrètes.', correct: true },
            { text: 'Changer immédiatement tout le processus de développement', feedback: 'Trop réactif. Un changement de processus majeur demande réflexion et consensus. La Rétro est le bon cadre pour ça.', correct: false },
          ]
        },
      ],
      bestPractices: [
        'Toujours tracer les bugs critiques dans Jira, même en urgence',
        'Informer le PO immédiatement pour une prise de décision éclairée',
        'Si on ajoute au sprint, on retire quelque chose d\'équivalent',
        'La Rétrospective est le lieu pour apprendre de l\'incident',
        'Définir des critères clairs pour ce qui constitue un "bug critique"',
      ]
    },
    {
      id: 4,
      title: 'Rétrospective inefficace',
      description: 'La Rétrospective se résume à "tout va bien" depuis 3 sprints. L\'équipe semble peu engagée. Comment relancer une Rétro productive ?',
      steps: [
        {
          step: 1,
          situation: 'Lors de la Rétro, personne ne parle. Le silence est pesant.',
          choices: [
            { text: 'Annuler la Rétro si personne ne parle', feedback: 'Non. La Rétrospective est une cérémonie Scrum essentielle. L\'absence de feedback = problèmes cachés. Il faut changer l\'approche.', correct: false },
            { text: 'Utiliser une technique différente : post-its anonymes ou vote en ligne', feedback: 'Excellente idée ! Les techniques anonymes permettent aux membres plus réservés de s\'exprimer. Post-its, vote Mentimeter, 1-2-4-ALL... Varier les formats brise la routine.', correct: true },
            { text: 'Forcer chaque membre à parler à tour de rôle', feedback: 'Forcer la parole peut créer des tensions. Mieux vaut créer un espace sûr avec des techniques qui facilitent l\'expression.', correct: false },
          ]
        },
        {
          step: 2,
          situation: 'Des problèmes remontent mais les actions définies lors des Rétros précédentes n\'ont jamais été suivies.',
          choices: [
            { text: 'Commencer la Rétro par une revue des actions de la Rétro précédente', feedback: 'Parfait ! Si les actions ne sont pas suivies, c\'est démotivant. Commencer par le suivi montre que la Rétro a un impact réel. C\'est la première chose à faire.', correct: true },
            { text: 'Définir encore plus d\'actions cette fois-ci', feedback: 'Plus d\'actions non suivies = encore plus de frustration. Le problème n\'est pas le nombre d\'actions mais leur mise en oeuvre.', correct: false },
            { text: 'Changer de Scrum Master', feedback: 'Pas nécessairement. Le problème de suivi des actions est souvent un problème d\'équipe et d\'organisation, pas seulement du Scrum Master.', correct: false },
          ]
        },
      ],
      bestPractices: [
        'Varier les techniques : Start/Stop/Continue, Mad/Sad/Glad, 4Ls, Sailboat...',
        'Toujours commencer par le suivi des actions de la Rétro précédente',
        'Limiter à 3-5 actions concrètes, assignées à une personne avec une date',
        'Créer un espace psychologiquement sûr : pas de jugement, anonymat si besoin',
        'La Rétro dure 1h30 pour un sprint de 2 semaines',
        'Les actions doivent être SMART : Spécifiques, Mesurables, Atteignables, Réalistes, Temporelles',
      ]
    },
    {
      id: 5,
      title: 'Migration vers Jira : Configuration d\'un projet',
      description: 'Ton équipe passe de l\'email et d\'Excel à Jira. Tu dois configurer le projet. Par où commencer ?',
      steps: [
        {
          step: 1,
          situation: 'Choix du type de board : Scrum ou Kanban ?',
          choices: [
            { text: 'Toujours choisir Scrum, c\'est la méthode standard', feedback: 'Pas toujours. Scrum convient aux équipes qui livrent par itérations fixes. Kanban convient mieux aux équipes support, maintenance ou avec un flux de demandes imprévisible.', correct: false },
            { text: 'Analyser le type de travail de l\'équipe avant de choisir', feedback: 'Correct ! Si l\'équipe fait du développement produit avec des cycles réguliers → Scrum. Si c\'est du support, de la maintenance, ou des demandes ad hoc → Kanban. Les deux peuvent coexister.', correct: true },
            { text: 'Choisir Kanban car c\'est plus simple', feedback: 'La simplicité perçue ne doit pas être le seul critère. Le bon choix dépend du type de travail, pas de la facilité de configuration.', correct: false },
          ]
        },
        {
          step: 2,
          situation: 'L\'équipe veut créer 20 types de tickets différents (Feature, Bug, Spike, Epic, Story, Task, Improvement, Question...). Bonne idée ?',
          choices: [
            { text: 'Oui, plus de granularité = meilleur suivi', feedback: 'Non. Trop de types de tickets complexifie le workflow, crée de la confusion et rend le reporting difficile. Commencer simple.', correct: false },
            { text: 'Commencer avec 4-5 types (Epic, Story, Task, Bug, Spike) et ajouter selon les besoins', feedback: 'Parfait ! Start simple. Jira peut devenir très complexe rapidement. Commencer avec les types essentiels et ajouter progressivement selon les besoins réels.', correct: true },
            { text: 'N\'utiliser qu\'un seul type de ticket pour tout simplifier', feedback: 'Trop minimaliste. Avoir au moins Bug/Story/Task aide à différencier la nature du travail et à filtrer efficacement.', correct: false },
          ]
        },
        {
          step: 3,
          situation: 'Comment former l\'équipe à Jira ?',
          choices: [
            { text: 'Envoyer un long document PDF avec toutes les fonctionnalités', feedback: 'L\'apprentissage par document est rarement efficace. Jira est un outil pratique qui s\'apprend en faisant.', correct: false },
            { text: 'Organiser une session pratique de 2h avec des exercices concrets sur le vrai projet', feedback: 'Excellent ! Former en pratiquant sur le vrai projet de l\'équipe : créer des tickets, faire des transitions, configurer des filtres... L\'apprentissage concret est bien plus efficace.', correct: true },
            { text: 'Laisser l\'équipe découvrir Jira par elle-même', feedback: 'Sans guidance initiale, les mauvaises pratiques s\'installent (mauvais usage des types, workflows incorrects, etc.) et sont difficiles à corriger ensuite.', correct: false },
          ]
        },
      ],
      bestPractices: [
        'Commencer simple : 4-5 types de tickets, 4-5 statuts dans le workflow',
        'Nommer le projet clairement et choisir une clé courte (SHOP, CRM, HR...)',
        'Définir les conventions de nommage dès le début (titres des tickets, labels...)',
        'Former l\'équipe en pratiquant sur le vrai projet, pas sur des exemples',
        'Désigner un "Jira Champion" qui maîtrise l\'outil et accompagne les autres',
        'Revoir la configuration après 2-3 sprints et ajuster',
      ]
    },
  ]
};
