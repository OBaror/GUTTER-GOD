export const grammarExercises = [
  // Present Perfect vs Simple Past
  {
    id: 1,
    type: "multiple-choice",
    question: "The IT team ___ the server issue yesterday.",
    options: ["has fixed", "fixed", "fix", "had fix"],
    correct: 1,
    explanation: "On utilise le 'simple past' avec un marqueur de temps précis dans le passé ('yesterday'). Le 'present perfect' s'utilise sans marqueur de temps précis.",
    topic: "verb-tense",
    level: "A2"
  },
  {
    id: 2,
    type: "multiple-choice",
    question: "She ___ already reviewed the quarterly report.",
    options: ["has", "had", "is", "was"],
    correct: 0,
    explanation: "On utilise 'has' + participe passé pour le present perfect. 'Already' indique que l'action est terminée.",
    topic: "verb-tense",
    level: "A2"
  },
  {
    id: 3,
    type: "fill-blank",
    question: "We ___ (not finish) the project yet. We need two more days.",
    options: [],
    correct: "haven't finished",
    explanation: "'Yet' avec une négation indique le present perfect. La forme est: have/has + not + participe passé.",
    topic: "verb-tense",
    level: "B1"
  },
  {
    id: 4,
    type: "multiple-choice",
    question: "The company ___ a new office in Lyon in 2022.",
    options: ["opens", "has opened", "opened", "open"],
    correct: 2,
    explanation: "'In 2022' est un marqueur de temps précis dans le passé → on utilise le simple past.",
    topic: "verb-tense",
    level: "A2"
  },
  {
    id: 5,
    type: "multiple-choice",
    question: "How long ___ you ___ with this company?",
    options: ["did / work", "have / worked", "do / work", "are / working"],
    correct: 1,
    explanation: "'How long' avec une situation qui continue jusqu'au présent → present perfect: 'How long have you worked'.",
    topic: "verb-tense",
    level: "B1"
  },

  // Articles
  {
    id: 6,
    type: "multiple-choice",
    question: "She is ___ project manager at our company.",
    options: ["a", "an", "the", "—"],
    correct: 0,
    explanation: "'Project' commence par une consonne → on utilise 'a'. 'A' s'utilise pour présenter quelqu'un pour la première fois.",
    topic: "articles",
    level: "A2"
  },
  {
    id: 7,
    type: "multiple-choice",
    question: "Please send ___ report to all team members.",
    options: ["a", "an", "the", "—"],
    correct: 2,
    explanation: "'The' s'utilise quand le rapport est spécifique et connu des deux interlocuteurs.",
    topic: "articles",
    level: "A2"
  },
  {
    id: 8,
    type: "multiple-choice",
    question: "We need ___ experienced engineer for this project.",
    options: ["a", "an", "the", "—"],
    correct: 1,
    explanation: "'Experienced' commence par le son voyelle /ɪ/ → on utilise 'an'.",
    topic: "articles",
    level: "A2"
  },
  {
    id: 9,
    type: "fill-blank",
    question: "___ IT department is responsible for all technical issues.",
    options: [],
    correct: "The",
    explanation: "On utilise 'The' quand il n'y a qu'un seul département IT dans l'entreprise - c'est unique et connu.",
    topic: "articles",
    level: "A2"
  },
  {
    id: 10,
    type: "multiple-choice",
    question: "___ information in this document is confidential.",
    options: ["A", "An", "The", "—"],
    correct: 2,
    explanation: "'Information' est indénombrable. On utilise 'the' car on parle d'une information spécifique (dans ce document).",
    topic: "articles",
    level: "B1"
  },

  // Prepositions
  {
    id: 11,
    type: "multiple-choice",
    question: "The meeting is ___ Monday ___ 9 AM.",
    options: ["on / at", "in / on", "at / in", "on / in"],
    correct: 0,
    explanation: "On dit 'on Monday' (jour de la semaine) et 'at 9 AM' (heure précise).",
    topic: "prepositions",
    level: "A2"
  },
  {
    id: 12,
    type: "multiple-choice",
    question: "The deadline is ___ the end of the month.",
    options: ["at", "in", "by", "on"],
    correct: 2,
    explanation: "'By' signifie 'avant' une limite de temps. 'By the end of the month' = avant la fin du mois.",
    topic: "prepositions",
    level: "B1"
  },
  {
    id: 13,
    type: "multiple-choice",
    question: "I am responsible ___ managing the IT infrastructure.",
    options: ["of", "for", "with", "about"],
    correct: 1,
    explanation: "'Responsible for' est l'expression correcte. On est toujours 'responsible for something'.",
    topic: "prepositions",
    level: "B1"
  },
  {
    id: 14,
    type: "fill-blank",
    question: "The project will be completed ___ six months.",
    options: [],
    correct: "in",
    explanation: "'In six months' signifie dans six mois (durée dans le futur). On utilise 'in' pour des périodes de temps futures.",
    topic: "prepositions",
    level: "A2"
  },
  {
    id: 15,
    type: "multiple-choice",
    question: "Please send the document ___ email.",
    options: ["with", "by", "on", "through"],
    correct: 1,
    explanation: "'By email' est l'expression standard pour envoyer quelque chose par email.",
    topic: "prepositions",
    level: "A2"
  },
  {
    id: 16,
    type: "multiple-choice",
    question: "He is interested ___ learning new programming languages.",
    options: ["about", "for", "in", "with"],
    correct: 2,
    explanation: "'Interested in' est l'expression correcte. On est toujours 'interested in something'.",
    topic: "prepositions",
    level: "B1"
  },

  // Passive Voice
  {
    id: 17,
    type: "multiple-choice",
    question: "The new software ___ by the IT team last week.",
    options: ["installed", "was installed", "is installed", "has installed"],
    correct: 1,
    explanation: "Passif au passé: 'was/were + participe passé'. Le sujet subit l'action.",
    topic: "passive-voice",
    level: "B1"
  },
  {
    id: 18,
    type: "multiple-choice",
    question: "All employees ___ to complete safety training this year.",
    options: ["require", "are required", "required", "have require"],
    correct: 1,
    explanation: "Passif au présent: 'am/is/are + participe passé'. Tous les employés sont obligés (par l'entreprise).",
    topic: "passive-voice",
    level: "B1"
  },
  {
    id: 19,
    type: "fill-blank",
    question: "The report will ___ (send) to clients by Friday.",
    options: [],
    correct: "be sent",
    explanation: "Passif au futur: 'will be + participe passé'. Will be sent = sera envoyé.",
    topic: "passive-voice",
    level: "B1"
  },
  {
    id: 20,
    type: "multiple-choice",
    question: "A decision ___ at the next board meeting.",
    options: ["will make", "will be making", "will be made", "is making"],
    correct: 2,
    explanation: "Passif au futur: 'will be + participe passé'. Une décision sera prise.",
    topic: "passive-voice",
    level: "B1"
  },
  {
    id: 21,
    type: "multiple-choice",
    question: "The servers ___ maintained every Sunday night.",
    options: ["maintain", "are maintained", "is maintained", "maintaining"],
    correct: 1,
    explanation: "Passif au présent (habitude): 'are + participe passé'. Les serveurs (pluriel) → 'are maintained'.",
    topic: "passive-voice",
    level: "B1"
  },

  // Conditionals
  {
    id: 22,
    type: "multiple-choice",
    question: "If you ___ the backup, you ___ lose your data.",
    options: ["make / don't", "will make / won't", "make / won't", "making / not"],
    correct: 2,
    explanation: "Conditionnel 1 (réel): If + présent simple → will. 'If you make' (présent) → 'you won't lose' (futur).",
    topic: "conditionals",
    level: "B1"
  },
  {
    id: 23,
    type: "multiple-choice",
    question: "If I ___ the CEO, I ___ invest more in cybersecurity.",
    options: ["am / will", "was / would", "were / would", "be / would"],
    correct: 2,
    explanation: "Conditionnel 2 (hypothétique): If + were → would. 'Were' s'utilise pour toutes les personnes dans ce cas.",
    topic: "conditionals",
    level: "B2"
  },
  {
    id: 24,
    type: "fill-blank",
    question: "If the network ___ (go) down, call IT support immediately.",
    options: [],
    correct: "goes",
    explanation: "Conditionnel 0 (instructions/règles): If + présent → présent/impératif. C'est toujours vrai.",
    topic: "conditionals",
    level: "A2"
  },
  {
    id: 25,
    type: "multiple-choice",
    question: "Unless you ___ the form, we cannot process your request.",
    options: ["complete", "don't complete", "completed", "will complete"],
    correct: 0,
    explanation: "'Unless' = 'if not'. Unless you complete = if you don't complete. On n'utilise pas 'don't' avec 'unless'.",
    topic: "conditionals",
    level: "B2"
  },

  // Relative Pronouns
  {
    id: 26,
    type: "multiple-choice",
    question: "The engineer ___ fixed the server is very experienced.",
    options: ["which", "whose", "who", "whom"],
    correct: 2,
    explanation: "'Who' s'utilise pour les personnes. 'Which' pour les choses. 'Whose' pour la possession.",
    topic: "verb-tense",
    level: "B1"
  },
  {
    id: 27,
    type: "multiple-choice",
    question: "This is the software ___ we use for project management.",
    options: ["who", "whose", "whom", "that"],
    correct: 3,
    explanation: "'That' ou 'which' s'utilisent pour les choses. 'Who' pour les personnes.",
    topic: "verb-tense",
    level: "B1"
  },
  {
    id: 28,
    type: "multiple-choice",
    question: "The company ___ headquarters are in Tokyo is expanding.",
    options: ["who", "which", "whose", "that"],
    correct: 2,
    explanation: "'Whose' indique la possession. The company whose headquarters = dont le siège social.",
    topic: "verb-tense",
    level: "B2"
  },

  // Comparatives / Superlatives
  {
    id: 29,
    type: "multiple-choice",
    question: "This year's revenue is ___ than last year's.",
    options: ["more high", "highest", "higher", "highly"],
    correct: 2,
    explanation: "Comparatif d'un adjectif court (high → higher). Pour comparer deux choses → comparatif + 'than'.",
    topic: "verb-tense",
    level: "A2"
  },
  {
    id: 30,
    type: "multiple-choice",
    question: "She is ___ project manager in the department.",
    options: ["the most efficient", "more efficient", "most efficient", "the efficientest"],
    correct: 0,
    explanation: "Superlatif: 'the most + adjectif long'. Pour un adjectif long comme 'efficient' → 'the most efficient'.",
    topic: "verb-tense",
    level: "B1"
  },
  {
    id: 31,
    type: "fill-blank",
    question: "Cloud storage is ___ (cheap) than buying physical servers.",
    options: [],
    correct: "cheaper",
    explanation: "Comparatif d'un adjectif court (cheap → cheaper). On ajoute '-er' aux adjectifs courts.",
    topic: "verb-tense",
    level: "A2"
  },

  // Mixed TOEIC Part 5 style
  {
    id: 32,
    type: "multiple-choice",
    question: "The conference room ___ for the annual shareholders meeting.",
    options: ["reserves", "is being reserved", "reserved", "will reserve"],
    correct: 1,
    explanation: "Passif progressif: 'is being + participe passé'. La salle est en cours de réservation maintenant.",
    topic: "passive-voice",
    level: "B2"
  },
  {
    id: 33,
    type: "multiple-choice",
    question: "All staff members are requested to ___ the training session.",
    options: ["attending", "attend", "attended", "attendance"],
    correct: 1,
    explanation: "Après 'to' (infinitif), on utilise la base verbale (infinitif sans 'to'). 'Requested to attend'.",
    topic: "verb-tense",
    level: "B1"
  },
  {
    id: 34,
    type: "multiple-choice",
    question: "Neither the manager nor the employees ___ the new policy.",
    options: ["approves", "approve", "has approved", "approved"],
    correct: 1,
    explanation: "Avec 'neither...nor', le verbe s'accorde avec le sujet le plus proche. 'employees' est pluriel → 'approve'.",
    topic: "verb-tense",
    level: "B2"
  },
  {
    id: 35,
    type: "multiple-choice",
    question: "The IT department ___ currently working on the system upgrade.",
    options: ["is", "are", "be", "has"],
    correct: 0,
    explanation: "'The IT department' est un groupe singulier → 'is'. En anglais américain (TOEIC), les groupes sont singuliers.",
    topic: "verb-tense",
    level: "B1"
  },
  {
    id: 36,
    type: "fill-blank",
    question: "The project ___ (delay) due to budget issues.",
    options: [],
    correct: "has been delayed",
    explanation: "Present perfect passif: 'has/have been + participe passé'. Le projet a été retardé (résultat actuel).",
    topic: "passive-voice",
    level: "B2"
  },
  {
    id: 37,
    type: "multiple-choice",
    question: "You should ___ a backup before updating the system.",
    options: ["making", "made", "make", "makes"],
    correct: 2,
    explanation: "Après un modal (should, must, can, etc.), on utilise la base verbale (infinitif sans 'to').",
    topic: "verb-tense",
    level: "A2"
  },
  {
    id: 38,
    type: "multiple-choice",
    question: "Despite ___ hard, the team did not meet the deadline.",
    options: ["working", "work", "worked", "to work"],
    correct: 0,
    explanation: "Après 'despite' et 'in spite of', on utilise le gérondif (-ing). 'Despite working hard'.",
    topic: "verb-tense",
    level: "B2"
  },
  {
    id: 39,
    type: "multiple-choice",
    question: "The manager suggested ___ a new software system.",
    options: ["implement", "to implement", "implementing", "implementation"],
    correct: 2,
    explanation: "Après 'suggest', 'recommend', 'avoid', 'finish', on utilise le gérondif (-ing).",
    topic: "verb-tense",
    level: "B1"
  },
  {
    id: 40,
    type: "multiple-choice",
    question: "Our company ___ in the technology sector for over 20 years.",
    options: ["operates", "operated", "has operated", "is operating"],
    correct: 2,
    explanation: "'For over 20 years' avec une situation qui continue → present perfect. 'Has operated for 20 years'.",
    topic: "verb-tense",
    level: "B1"
  },
  {
    id: 41,
    type: "multiple-choice",
    question: "Please let me know ___ you need any assistance.",
    options: ["whether", "weather", "if", "both A and C"],
    correct: 3,
    explanation: "'Whether' et 'if' peuvent tous deux introduire une question indirecte. Les deux sont corrects ici.",
    topic: "verb-tense",
    level: "B1"
  },
  {
    id: 42,
    type: "fill-blank",
    question: "The new policy applies to ___ (all) employees, regardless of position.",
    options: [],
    correct: "all",
    explanation: "'All employees' = tous les employés. 'All' s'utilise sans article devant un nom pluriel.",
    topic: "articles",
    level: "A2"
  }
];

export const grammarTopics = ["verb-tense", "articles", "prepositions", "passive-voice", "conditionals"];
