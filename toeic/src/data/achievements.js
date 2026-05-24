export const ACHIEVEMENTS = [
  // TOEIC
  { id: 'premier-pas', title: 'Premier pas', description: 'Compléter ton premier exercice sur la plateforme', icon: '👟', category: 'toeic', condition: { type: 'any_exercise', count: 1 }, xpReward: 50 },
  { id: 'vocabulaire-10', title: 'Apprenti linguiste', description: 'Apprendre 10 mots de vocabulaire', icon: '📖', category: 'toeic', condition: { type: 'vocab_known', count: 10 }, xpReward: 75 },
  { id: 'vocabulaire-50', title: 'Vocabulaire ×50', description: 'Apprendre 50 mots de vocabulaire', icon: '📚', category: 'toeic', condition: { type: 'vocab_known', count: 50 }, xpReward: 200 },
  { id: 'grammaire-expert', title: 'Grammaire Expert', description: 'Obtenir 100% dans un quiz de grammaire', icon: '✏️', category: 'toeic', condition: { type: 'grammar_perfect', count: 1 }, xpReward: 150 },
  { id: 'toeic-400', title: 'TOEIC 400', description: 'Atteindre un score estimé de 400 points', icon: '🎯', category: 'toeic', condition: { type: 'toeic_score', count: 400 }, xpReward: 150 },
  { id: 'toeic-500', title: 'TOEIC 500', description: 'Atteindre un score estimé de 500 points', icon: '⭐', category: 'toeic', condition: { type: 'toeic_score', count: 500 }, xpReward: 250 },
  { id: 'toeic-800', title: 'TOEIC 800', description: 'Atteindre l\'objectif : 800 points TOEIC !', icon: '🏆', category: 'toeic', condition: { type: 'toeic_score', count: 800 }, xpReward: 1000 },
  { id: 'lecture-complete', title: 'Lecteur assidu', description: 'Compléter tous les passages de lecture', icon: '📖', category: 'toeic', condition: { type: 'reading_complete', count: 8 }, xpReward: 200 },

  // JIRA
  { id: 'jira-padawan', title: 'Jira Padawan', description: 'Apprendre 15 termes du glossaire Jira/Agile', icon: '🟦', category: 'jira', condition: { type: 'jira_glossary', count: 15 }, xpReward: 100 },
  { id: 'jira-master', title: 'Jira Master', description: 'Maîtriser tout le glossaire Jira/Agile (40+ termes)', icon: '🎯', category: 'jira', condition: { type: 'jira_glossary', count: 40 }, xpReward: 300 },
  { id: 'scrum-master-badge', title: 'Scrum Champion', description: 'Obtenir 90% ou plus au quiz Scrum', icon: '🏅', category: 'jira', condition: { type: 'jira_quiz_score', threshold: 0.9 }, xpReward: 200 },
  { id: 'story-pro', title: 'Story Pro', description: 'Compléter tous les exercices de User Stories', icon: '📝', category: 'jira', condition: { type: 'jira_stories', count: 8 }, xpReward: 150 },

  // DATA & AI
  { id: 'data-rookie', title: 'Data Rookie', description: 'Apprendre 10 concepts Data & BI', icon: '📊', category: 'data-ai', condition: { type: 'data_concepts', count: 10 }, xpReward: 100 },
  { id: 'data-analyst', title: 'Data Analyst', description: 'Maîtriser 30 concepts Data & BI', icon: '📈', category: 'data-ai', condition: { type: 'data_concepts', count: 30 }, xpReward: 250 },
  { id: 'prompt-pro', title: 'Prompt Pro', description: 'Compléter tous les exercices de Prompt Engineering', icon: '🤖', category: 'data-ai', condition: { type: 'prompt_exercises', count: 8 }, xpReward: 200 },
  { id: 'ai-ready', title: 'AI Ready', description: 'Maîtriser 10 concepts IA & GenAI', icon: '🧠', category: 'data-ai', condition: { type: 'data_concepts_genai', count: 10 }, xpReward: 200 },
  { id: 'bi-expert', title: 'BI Expert', description: 'Obtenir 80% ou plus au quiz Data & BI', icon: '💡', category: 'data-ai', condition: { type: 'data_quiz_score', threshold: 0.8 }, xpReward: 150 },

  // SI MANAGEMENT
  { id: 'dsi-herbe', title: 'DSI en herbe', description: 'Compléter le module SI Management (frameworks + 20 concepts)', icon: '🖥️', category: 'si', condition: { type: 'si_concepts', count: 20 }, xpReward: 200 },
  { id: 'architecte-si', title: 'Architecte SI', description: 'Maîtriser tous les frameworks (ITIL, COBIT, TOGAF, etc.)', icon: '🏗️', category: 'si', condition: { type: 'si_frameworks', count: 8 }, xpReward: 300 },
  { id: 'securite-pro', title: 'Expert Sécurité', description: 'Maîtriser 10 concepts de cybersécurité', icon: '🔒', category: 'si', condition: { type: 'si_security', count: 10 }, xpReward: 150 },

  // STREAKS
  { id: 'streakstart', title: 'Lancé !', description: 'Étudier 3 jours de suite', icon: '🔥', category: 'streak', condition: { type: 'streak', count: 3 }, xpReward: 75 },
  { id: 'semaine-parfaite', title: 'Semaine parfaite', description: 'Étudier 7 jours de suite', icon: '⚡', category: 'streak', condition: { type: 'streak', count: 7 }, xpReward: 200 },
  { id: 'marathon', title: 'Marathon', description: 'Étudier 30 jours de suite', icon: '🏃', category: 'streak', condition: { type: 'streak', count: 30 }, xpReward: 1000 },

  // SPECIAL
  { id: 'polyvalent', title: 'Polyvalent', description: 'Étudier 3 modules différents dans la même journée', icon: '🎪', category: 'special', condition: { type: 'daily_modules', count: 3 }, xpReward: 150 },
  { id: 'top-gun', title: 'Top Gun MCSI', description: 'Compléter TOUS les modules de la plateforme', icon: '🚀', category: 'special', condition: { type: 'all_modules' }, xpReward: 2000 },
];

export function checkAchievements(allProgress) {
  const unlocked = allProgress.achievements || [];
  const newlyUnlocked = [];

  const streak = allProgress.streak || { current: 0 };
  const vocab = allProgress.vocabulary || { knownCards: [] };
  const grammar = allProgress.grammar || { exercisesCompleted: [] };
  const reading = allProgress.reading || { passagesCompleted: [] };
  const jira = allProgress.jira || { knownTerms: [], quizScores: [], storiesCompleted: [] };
  const dataAi = allProgress.dataAi || { knownConcepts: [], quizScores: [], promptsCompleted: [] };
  const si = allProgress.siManagement || { knownConcepts: [], frameworksViewed: [] };
  const tests = allProgress.practiceTests || { testsCompleted: [] };
  const toeicScore = allProgress.toeicEstimate || 200;

  function isUnlocked(id) {
    return unlocked.includes(id);
  }

  function tryUnlock(id) {
    if (!isUnlocked(id)) {
      newlyUnlocked.push(id);
    }
  }

  // Check each achievement
  const vocabCount = vocab.knownCards.length;
  if (vocabCount >= 1 || grammar.exercisesCompleted.length >= 1 || reading.passagesCompleted.length >= 1) tryUnlock('premier-pas');
  if (vocabCount >= 10) tryUnlock('vocabulaire-10');
  if (vocabCount >= 50) tryUnlock('vocabulaire-50');

  const grammarBest = grammar.bestScore || 0;
  if (grammarBest >= 100) tryUnlock('grammaire-expert');

  if (toeicScore >= 400) tryUnlock('toeic-400');
  if (toeicScore >= 500) tryUnlock('toeic-500');
  if (toeicScore >= 800) tryUnlock('toeic-800');
  if (reading.passagesCompleted.length >= 8) tryUnlock('lecture-complete');

  const jiraKnown = (jira.knownTerms || []).length;
  if (jiraKnown >= 15) tryUnlock('jira-padawan');
  if (jiraKnown >= 40) tryUnlock('jira-master');

  const jiraBestScore = jira.bestQuizScore || 0;
  if (jiraBestScore >= 0.9) tryUnlock('scrum-master-badge');

  const jiraStories = (jira.storiesCompleted || []).length;
  if (jiraStories >= 8) tryUnlock('story-pro');

  const dataKnown = (dataAi.knownConcepts || []).length;
  if (dataKnown >= 10) tryUnlock('data-rookie');
  if (dataKnown >= 30) tryUnlock('data-analyst');

  const promptsDone = (dataAi.promptsCompleted || []).length;
  if (promptsDone >= 8) tryUnlock('prompt-pro');

  const genAiKnown = (dataAi.knownConcepts || []).filter(id => {
    const genAiIds = [22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 46, 47, 48];
    return genAiIds.includes(id);
  }).length;
  if (genAiKnown >= 10) tryUnlock('ai-ready');

  const dataBestScore = dataAi.bestQuizScore || 0;
  if (dataBestScore >= 0.8) tryUnlock('bi-expert');

  const siKnown = (si.knownConcepts || []).length;
  if (siKnown >= 20) tryUnlock('dsi-herbe');

  const siFrameworks = (si.frameworksViewed || []).length;
  if (siFrameworks >= 8) tryUnlock('architecte-si');

  const siSecurityIds = [18, 19, 20, 21, 22, 28, 29, 30];
  const securityKnown = (si.knownConcepts || []).filter(id => siSecurityIds.includes(id)).length;
  if (securityKnown >= 8) tryUnlock('securite-pro');

  const streakCurrent = streak.current || 0;
  if (streakCurrent >= 3) tryUnlock('streakstart');
  if (streakCurrent >= 7) tryUnlock('semaine-parfaite');
  if (streakCurrent >= 30) tryUnlock('marathon');

  const todayModules = allProgress.todayModules || [];
  if (todayModules.length >= 3) tryUnlock('polyvalent');

  const hasVocab = vocabCount >= 10;
  const hasGrammar = grammar.exercisesCompleted.length >= 5;
  const hasReading = reading.passagesCompleted.length >= 2;
  const hasJira = jiraKnown >= 30;
  const hasData = dataKnown >= 25;
  const hasSI = siKnown >= 30;
  if (hasVocab && hasGrammar && hasReading && hasJira && hasData && hasSI) tryUnlock('top-gun');

  return newlyUnlocked;
}
