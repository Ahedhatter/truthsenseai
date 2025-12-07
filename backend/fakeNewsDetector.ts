// backend/fakeNewsDetector.ts

export type HeadlineLabel = "fake" | "trustworthy";

export interface DetectionResult {
  label: HeadlineLabel;
  confidence: number;
  explanation: string;
}

/**
 * Fully deterministic rule-based backend.
 * Zero randomness.
 * Fixed confidence values for perfect consistency.
 */
export function detectHeadline(headline: string): DetectionResult {
  const original = headline.trim();
  const lower = original.toLowerCase();

  if (!original) {
    return {
      label: "fake",
      confidence: 92,
      explanation: "No headline text was provided.",
    };
  }

  // ---- RULE DEFINITIONS ----

  const impossibleClaims = [
    "immortal",
    "immortality",
    "live forever",
    "time travel",
    "teleportation",
    "reverse aging",
    "invincible",
    "cure cancer",
    "cures all diseases",
    "brings dead back",
  ];

  const strongClickbait = [
    "you won't believe",
    "this will change your life",
    "shocking",
    "explosive",
    "mind-blowing",
    "unbelievable",
    "goes viral",
    "hidden truth",
    "top secret",
  ];

  const sensationalWords = [
    "miracle",
    "outrageous",
    "insane",
    "jaw-dropping",
    "scandal",
    "exposed",
  ];

  const absoluteLanguage = [
    "always",
    "never",
    "everyone",
    "no one",
    "proves once and for all",
  ];

  const trustworthyCues = [
    "study",
    "research",
    "published in",
    "university",
    "according to",
    "scientists at",
    "researchers at",
    "official data",
    "peer-reviewed",
    "in a journal",
  ];

  // ---- SCORING ----

  let fakeScore = 0;
  let trustScore = 0;
  const reasons: string[] = [];

  if (containsAny(lower, impossibleClaims)) {
    fakeScore += 5;
    reasons.push("The headline includes impossible or pseudoscientific claims.");
  }

  if (containsAny(lower, strongClickbait)) {
    fakeScore += 4;
    reasons.push("The headline uses strong clickbait expressions.");
  }

  if (containsAny(lower, sensationalWords)) {
    fakeScore += 3;
    reasons.push("The wording is sensational or emotionally exaggerated.");
  }

  if (containsAny(lower, absoluteLanguage)) {
    fakeScore += 2;
    reasons.push("Contains absolute language often found in misleading content.");
  }

  const exclamations = (original.match(/!/g) || []).length;
  if (exclamations >= 2) {
    fakeScore += 3;
    reasons.push("Multiple exclamation marks indicate exaggeration.");
  } else if (exclamations === 1) {
    fakeScore += 1;
    reasons.push("Exclamation mark suggests emotional emphasis.");
  }

  const words = original.split(/\s+/);
  const allCaps = words.filter((w) => w.length >= 4 && w === w.toUpperCase());
  if (allCaps.length >= 2) {
    fakeScore += 3;
    reasons.push("Contains ALL-CAPS words often used in fake headlines.");
  }

  if (containsAny(lower, trustworthyCues)) {
    trustScore += 4;
    reasons.push("References research, studies, or official sources.");
  }

  // ---- FINAL DECISION ----
  const score = fakeScore - trustScore;

  let label: HeadlineLabel;
  let confidence: number;

  if (score >= 3) {
    label = "fake";
    confidence = 92; // fixed
  } else if (score <= -2) {
    label = "trustworthy";
    confidence = 88; // fixed
  } else if (score > 0) {
    label = "fake";
    confidence = 85; // fixed
  } else {
    label = "trustworthy";
    confidence = 83; // fixed
  }

  const explanation =
    reasons.length > 0
      ? reasons.join(" ")
      : "The headline appears neutral and does not match patterns of misleading or sensational content.";

  return { label, confidence, explanation };
}

// helper
function containsAny(text: string, arr: string[]): boolean {
  return arr.some((item) => text.includes(item));
}
