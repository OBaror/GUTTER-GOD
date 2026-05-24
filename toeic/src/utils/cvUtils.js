import { JOB_KEYWORDS } from '../data/cvData';
import { getProgress } from './storage';

// Extract keywords from a job description text
export function extractKeywords(text) {
  const lower = text.toLowerCase();
  const found = new Set();
  Object.values(JOB_KEYWORDS).flat().forEach(kw => {
    if (lower.includes(kw.toLowerCase())) found.add(kw);
  });
  return [...found];
}

// Detect job type from description
export function detectJobType(text) {
  const lower = text.toLowerCase();
  let best = null;
  let bestScore = 0;
  for (const [type, keywords] of Object.entries(JOB_KEYWORDS)) {
    const score = keywords.filter(k => lower.includes(k)).length;
    if (score > bestScore) { bestScore = score; best = type; }
  }
  return best;
}

// Compute match between CV skills (flat list) and job description
export function computeMatch(cv, jobText) {
  const lower = jobText.toLowerCase();
  const allCvSkills = Object.values(cv.skills).flat();
  const matched = [];
  const missing = [];

  const jobKeywords = extractKeywords(jobText);
  const PLATFORM_SKILLS = getPlatformSkills();

  // Match CV skills against job text
  allCvSkills.forEach(skill => {
    const skillWords = skill.toLowerCase().split(/[\s,()\/]+/);
    const hit = skillWords.some(w => w.length > 3 && lower.includes(w));
    if (hit) matched.push(skill);
  });

  // Detect required skills not in CV
  const missingKeywords = jobKeywords.filter(kw => {
    const inCv = allCvSkills.some(s => s.toLowerCase().includes(kw.toLowerCase()));
    return !inCv;
  });

  // Add platform-learned skills
  const platformMatched = PLATFORM_SKILLS.filter(s =>
    lower.includes(s.keyword.toLowerCase())
  );

  const uniqueMatched = [...new Set(matched)];
  const score = Math.min(
    100,
    Math.round((uniqueMatched.length / Math.max(jobKeywords.length, 5)) * 100)
  );

  return {
    score,
    matched: uniqueMatched,
    missingKeywords: missingKeywords.filter(k => !matched.some(m => m.toLowerCase().includes(k))),
    platformMatched,
    jobType: detectJobType(jobText),
  };
}

// Skills learned on the platform (checked via localStorage progress)
export function getPlatformSkills() {
  const progress = getProgress();
  const learned = [];

  if (progress.jira?.quizScore > 70) {
    learned.push({ label: 'Jira (certifié plateforme)', keyword: 'jira' });
    learned.push({ label: 'Méthodologies Agile avancées (Scrum, Kanban)', keyword: 'agile' });
  }
  if (progress.dataAi?.conceptsKnown > 20) {
    learned.push({ label: 'Concepts IA & Machine Learning', keyword: 'intelligence artificielle' });
    learned.push({ label: 'Prompt Engineering', keyword: 'prompt' });
  }
  if (progress.siManagement?.conceptsKnown > 15) {
    learned.push({ label: 'Frameworks SI (ITIL, COBIT, TOGAF)', keyword: 'itil' });
    learned.push({ label: 'Gouvernance IT', keyword: 'gouvernance' });
  }
  if (progress.vocabulary?.known > 30) {
    learned.push({ label: 'Anglais professionnel (TOEIC en cours)', keyword: 'anglais' });
  }

  return learned;
}

// Build highlighted skills to include in cover letter
export function buildHighlightedSkills(cv, jobText) {
  const { matched, platformMatched } = computeMatch(cv, jobText);
  return [
    ...matched.slice(0, 5),
    ...platformMatched.map(s => s.label).slice(0, 2),
  ];
}

// Get/save CVs from localStorage
export function getSavedCVs() {
  try {
    return JSON.parse(localStorage.getItem('mcsi_cv_list') || '[]');
  } catch { return []; }
}

export function saveCVAdaptation(adaptation) {
  const list = getSavedCVs();
  const existing = list.findIndex(c => c.id === adaptation.id);
  if (existing >= 0) list[existing] = adaptation;
  else list.unshift(adaptation);
  localStorage.setItem('mcsi_cv_list', JSON.stringify(list.slice(0, 10)));
}

export function deleteSavedCV(id) {
  const list = getSavedCVs().filter(c => c.id !== id);
  localStorage.setItem('mcsi_cv_list', JSON.stringify(list));
}

export function getBaseCV() {
  try {
    const saved = localStorage.getItem('mcsi_base_cv');
    return saved ? JSON.parse(saved) : null;
  } catch { return null; }
}

export function saveBaseCV(cv) {
  localStorage.setItem('mcsi_base_cv', JSON.stringify(cv));
}
