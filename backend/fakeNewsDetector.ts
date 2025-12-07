// backend/fakeNewsDetector.ts

export type HeadlineLabel = "fake" | "trustworthy";

export interface DetectionResult {
  label: HeadlineLabel;
  confidence: number; // 0–100
  explanation: string;
}

/**
 * Fully deterministic rule-based backend.
 * 100% consistent: same input always produces the same output.
 *
 * Works by assigning fixed weights to:
 * - impossible claims
 * - clickbait terms
 * - sensational words
 * - punctuation patterns
 * - trustworthy cues (research, universities, official sources)
 *
 * No randomness. No probability noise.
 */
export function detectHeadline(headline: string): DetectionResult {
  const original = headline.trim();
  const lower = original.toLowerCase();

  if (!original) {
    return {
      label: "fake",
      confidence: 0,
      explanation: "No headline text was provided.",
    };
  }

  // -------- RULE SET DEFINITIONS --------

  const impossibleClaims = [
    "immortal",
    "immortality",
    "live forever",
    "cure cancer",
    "cures all diseases",
    "time travel",
    "teleportation",
    "reverse aging",
    "resurrect",
    "brings dead back",
    "weather control",
    "invincible",
  ];

  const strongClickbait = [
    "you won't believe",
    "shocking",
    "explosive",
    "mind-blowing",
    "unbelievable",
    "this will change your life",
    "goes viral",
    "secret method",
    "top secret",
    "hidden truth",
    "what happens next",
  ];

  const sensationalWords = [
    "miracle",
    "outrageous",
    "insane",
    "jaw-dropping",
    "scandal",
    "exposed",
    "insider reveals",
  ];

  const absoluteLanguage = [
    "never",
    "always",
    "everyone",
    "no one",
    "proves once and for all",
  ];

  const trustworthyCues = [
    "study",
    "research",
    "according to",
    "report",
    "analysis",
    "university",
    "scientists at",
    "researchers at",
    "published in",
    "official data",
    "peer-reviewed",
    "in a journal",
  ];

  // -------- SCORING --------

  let fakeScore = 0;
  let trustScore = 0;
  const reasons: string[] = [];

  // Impossible scientific claims (heavy weight)
  if (containsAny(lower, impossibleClaims)) {
    fakeScore += 5;
    reasons.push("Mentions impossible or pseudoscientific claims.");
  }

  // Strong clickbait (high weight)
  if (containsAny(lower, strongClickbait)) {
    fakeScore += 4;
    reasons.push("Uses strong clickbait language associated with fake headlines.");
  }

  // Sensational emotional tone
  if (containsAny(lower, sensationalWords)) {
    fakeScore += 3;
    reasons.push("Contains sensational or emotionally-loaded words.");
  }

  // Absolute language (exaggerated)
  if (containsAny(lower, absoluteLanguage)) {
    fakeScore += 2;
    reasons.push("Uses absolute language often seen in misleading content.");
  }

  // Excessive punctuation
  const exclamations = (original.match(/!/g) || []).length;
  if (exclamations >= 2) {
    fakeScore += 3;
    reasons.push("Contains multiple exclamation marks, indicating exaggeration.");
  } else if (exclamations === 1) {
    fakeScore += 1;
    reasons.push("Contains an exclamation mark, a common indicator of strong sensationalism.");
  }

  // ALL CAPS words
  const words = original.split(/\s+/);
  const allCaps = words.filter((w) => w.length >= 4 && w === w.toUpperCase());
  if (allCaps.length >= 2) {
    fakeScore += 3;
    reasons.push("Contains multiple ALL-CAPS words used to grab attention.");
  }

  // Trust indicators
  if (containsAny(lower, trustworthyCues)) {
    trustScore += 4;
    reasons.push("References research, data, universities, or official sources.");
  }

  // Length analysis
  if (words.length > 14) {
    trustScore += 1;
  }

  if (words.length < 5) {
    fakeScore += 1;
  }

  // -------- FINAL LABEL DECISION --------

  const finalScore = fakeScore - trustScore;

  let label: HeadlineLabel;
  let confidence: number;

  // Strong fake (> 3 points)
  if (finalScore >= 3) {
    label = "fake";
    confidence = 85 + Math.min(fakeScore * 2, 10); // caps at 95
  }
  // Strong trustworthy (< -2)
  else if (finalScore <= -2) {
    label = "trustworthy";
    confidence = 80 + Math.min(trustScore * 2, 15); // caps at 95
  }
  // Borderline (very rare)
  else {
    label = finalScore > 0 ? "fake" : "trustworthy";
    confidence = 70 + Math.abs(finalScore) * 5;
  }

  // Explanation formation
  const explanation =
    reasons.length > 0
      ? reasons.join(" ")
      : "The headline appears neutral and does not match common patterns of misleading or sensational content.";

  return {
    label,
    confidence: Math.min(95, Math.round(confidence)),
    explanation,
  };
}

// Utility function
function containsAny(text: string, arr: string[]): boolean {
  return arr.some((item) => text.includes(item));
}
