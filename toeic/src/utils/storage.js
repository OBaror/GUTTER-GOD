const STORAGE_KEYS = {
  PROGRESS: 'toeic_progress',
  STREAK: 'toeic_streak',
  SETTINGS: 'toeic_settings',
  LAST_VISIT: 'toeic_last_visit'
};

const defaultProgress = {
  vocabulary: {
    totalCards: 0,
    knownCards: [],
    reviewCards: [],
    sessionsCompleted: 0,
    lastSession: null
  },
  grammar: {
    totalExercises: 0,
    correctAnswers: 0,
    incorrectAnswers: 0,
    topicScores: {},
    exercisesCompleted: [],
    lastSession: null
  },
  reading: {
    totalPassages: 0,
    passagesCompleted: [],
    totalQuestions: 0,
    correctAnswers: 0,
    lastSession: null
  },
  listening: {
    totalExercises: 0,
    exercisesCompleted: [],
    totalQuestions: 0,
    correctAnswers: 0,
    lastSession: null
  },
  practiceTests: {
    testsCompleted: [],
    bestScore: 0,
    lastTest: null
  }
};

const defaultSettings = {
  dyslexiaMode: false,
  fontSize: 'medium',
  highContrast: false,
  showTranslations: true,
  preferredCategories: ['IT', 'Management'],
  dailyGoal: 20,
  interfaceLanguage: 'fr',
  speechRate: 0.85,
  showTimer: false
};

export function getProgress() {
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.PROGRESS);
    if (!stored) return { ...defaultProgress };
    const parsed = JSON.parse(stored);
    return {
      ...defaultProgress,
      ...parsed,
      vocabulary: { ...defaultProgress.vocabulary, ...parsed.vocabulary },
      grammar: { ...defaultProgress.grammar, ...parsed.grammar },
      reading: { ...defaultProgress.reading, ...parsed.reading },
      listening: { ...defaultProgress.listening, ...parsed.listening },
      practiceTests: { ...defaultProgress.practiceTests, ...parsed.practiceTests }
    };
  } catch {
    return { ...defaultProgress };
  }
}

export function saveProgress(section, data) {
  try {
    const current = getProgress();
    current[section] = { ...current[section], ...data, lastSession: new Date().toISOString() };
    localStorage.setItem(STORAGE_KEYS.PROGRESS, JSON.stringify(current));
    updateStreak();
  } catch (e) {
    console.error('Failed to save progress:', e);
  }
}

export function getStreak() {
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.STREAK);
    if (!stored) return { current: 0, best: 0, lastDay: null };
    return JSON.parse(stored);
  } catch {
    return { current: 0, best: 0, lastDay: null };
  }
}

export function updateStreak() {
  try {
    const today = new Date().toDateString();
    const streak = getStreak();

    if (streak.lastDay === today) return streak;

    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = yesterday.toDateString();

    let newCurrent;
    if (streak.lastDay === yesterdayStr) {
      newCurrent = streak.current + 1;
    } else if (!streak.lastDay) {
      newCurrent = 1;
    } else {
      newCurrent = 1;
    }

    const newStreak = {
      current: newCurrent,
      best: Math.max(streak.best, newCurrent),
      lastDay: today
    };

    localStorage.setItem(STORAGE_KEYS.STREAK, JSON.stringify(newStreak));
    return newStreak;
  } catch (e) {
    console.error('Failed to update streak:', e);
    return getStreak();
  }
}

export function getSettings() {
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.SETTINGS);
    if (!stored) return { ...defaultSettings };
    return { ...defaultSettings, ...JSON.parse(stored) };
  } catch {
    return { ...defaultSettings };
  }
}

export function saveSettings(settings) {
  try {
    localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
  } catch (e) {
    console.error('Failed to save settings:', e);
  }
}

export function resetProgress() {
  try {
    localStorage.removeItem(STORAGE_KEYS.PROGRESS);
    localStorage.removeItem(STORAGE_KEYS.STREAK);
  } catch (e) {
    console.error('Failed to reset progress:', e);
  }
}

export function calculateToeicEstimate(progress) {
  const baseScore = 200;
  let bonus = 0;

  const vocabKnown = progress.vocabulary.knownCards.length;
  bonus += Math.min(vocabKnown * 2, 100);

  const grammarTotal = progress.grammar.totalExercises || 1;
  const grammarCorrect = progress.grammar.correctAnswers || 0;
  const grammarRate = grammarCorrect / grammarTotal;
  bonus += Math.min(grammarRate * 150, 150);

  const readingTotal = progress.reading.totalQuestions || 1;
  const readingCorrect = progress.reading.correctAnswers || 0;
  const readingRate = readingCorrect / readingTotal;
  bonus += Math.min(readingRate * 150, 150);

  const listeningTotal = progress.listening.totalQuestions || 1;
  const listeningCorrect = progress.listening.correctAnswers || 0;
  const listeningRate = listeningCorrect / listeningTotal;
  bonus += Math.min(listeningRate * 150, 150);

  const practiceBonus = progress.practiceTests.testsCompleted.length * 10;
  bonus += Math.min(practiceBonus, 50);

  return Math.min(Math.round(baseScore + bonus), 990);
}

export function getSectionProgress(progress) {
  return {
    vocabulary: {
      label: 'Vocabulaire',
      done: progress.vocabulary.knownCards.length,
      total: 65,
      percent: Math.min(Math.round((progress.vocabulary.knownCards.length / 65) * 100), 100)
    },
    grammar: {
      label: 'Grammaire',
      done: progress.grammar.exercisesCompleted.length,
      total: 42,
      percent: Math.min(Math.round((progress.grammar.exercisesCompleted.length / 42) * 100), 100)
    },
    reading: {
      label: 'Lecture',
      done: progress.reading.passagesCompleted.length,
      total: 8,
      percent: Math.min(Math.round((progress.reading.passagesCompleted.length / 8) * 100), 100)
    },
    listening: {
      label: 'Écoute',
      done: progress.listening.exercisesCompleted.length,
      total: 10,
      percent: Math.min(Math.round((progress.listening.exercisesCompleted.length / 10) * 100), 100)
    }
  };
}
