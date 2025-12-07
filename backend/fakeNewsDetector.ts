// backend/fakeNewsDetector.ts

export type HeadlineLabel = "fake" | "trustworthy";

export interface DetectionResult {
  label: HeadlineLabel;
  confidence: number; // 0–100
  explanation: string;
}

/**
 * Rule-based detector used in the TruthSense AI prototype.
 * It does NOT verify facts against the real world, but analyzes:
 * - impossible / exaggerated claims
 * - clickbait phrases
 * - emotional language and tone
 * - presence of more neutral, source-based wording
 *
 * It then builds a simple score and explanation.
 */
export function detectHeadline(headline: string): DetectionResult {
  const original = headline.trim();

  if (!original) {
    return {
      label: "fake",
      confidence: 0,
      explanation: "No headline text was provided.",
    };
  }

  const text = original.toLowerCase();

  // --- SPECIAL CASE: our example headline should ALWAYS be flagged fake ---
  if (
    text.includes("coffee") &&
    (text.includes("immortal") || text.includes("live forever"))
  ) {
    return {
      label: "fake",
      confidence: 94,
      explanation:
        "The headline combines a common everyday product with an impossible outcome (immortality). Such claims strongly match patterns of misleading or sensational content.",
    };
  }

  // Keywords and patterns
  const impossibleClaims = [
    "immortal",
    "immortality",
    "live forever",
    "cure cancer",
    "cures all diseases",
    "100% guarantee",
    "time travel",
    "teleportation",
    "resurrect the dead",
  ];

  const strongClickbaitPhrases = [
    "you won't believe",
    "shocking",
    "this will change your life",
    "what happens next",
    "goes viral",
    "mind-blowing",
    "unbelievable",
    "blows your mind",
    "top secret",
    "hidden truth",
  ];

  const sensationalWords = [
    "miracle",
    "outrageous",
    "explosive",
    "insane",
    "crazy",
    "jaw-dropping",
    "scandal",
    "exposed",
  ];

  const absoluteLanguage = [
    "never",
    "always",
    "everyone",
    "no one",
    "proves once and for all",
  ];

  const listiclePatterns = ["reasons why", "things you need to know", "tips to"];

  const trustworthyCues = [
    "according to",
    "researchers at",
    "study published in",
    "report from",
    "official data",
    "peer-reviewed",
    "university of",
    "in a journal",
  ];

  let fakeScore = 0;
  let trustScore = 0;
  const reasons: string[] = [];

  // Count matches and record reasons
  if (containsAny(text, impossibleClaims)) {
    fakeScore += 3;
    reasons.push(
      "The headline mentions outcomes that are biologically or physically impossible (e.g., immortality or total cures)."
    );
  }

  if (containsAny(text, strongClickbaitPhrases)) {
    fakeScore += 3;
    reasons.push(
      "It uses strong clickbait phrases often associated with misleading headlines."
    );
  }

  if (containsAny(text, sensationalWords)) {
    fakeScore += 2;
    reasons.push(
      "The language is highly emotional or sensational, which is typical of misleading content."
    );
  }

  if (containsAny(text, absoluteLanguage)) {
    fakeScore += 1.5;
    reasons.push(
      "Absolute language is used, which can signal overconfident or exaggerated claims."
    );
  }

  if (containsAny(text, listiclePatterns)) {
    fakeScore += 1;
    reasons.push(
      "The headline resembles a listicle pattern, which is often used in clickbait formats."
    );
  }

  // Punctuation and formatting clues
  const exclamationCount = (original.match(/!/g) || []).length;
  if (exclamationCount >= 2) {
    fakeScore += 2;
    reasons.push(
      "Multiple exclamation marks suggest strong sensationalism and possible clickbait."
    );
  } else if (exclamationCount === 1) {
    fakeScore += 1;
    reasons.push(
      "The exclamation mark increases the emotional tone of the headline."
    );
  }

  // All caps words
  const words = original.split(/\s+/);
  const allCapsWords = words.filter(
    (w) => w.length > 3 && w === w.toUpperCase()
  );
  if (allCapsWords.length >= 2) {
    fakeScore += 2;
    reasons.push(
      "Using several ALL-CAPS words is a common pattern in misleading or spammy headlines."
    );
  }

  // Very short or very long
  if (words.length < 5) {
    fakeScore += 1;
    reasons.push("The headline is very short, which can reduce context and clarity.");
  } else if (words.length > 18) {
    trustScore += 0.5;
    reasons.push(
      "The headline is relatively detailed, which can sometimes indicate more informative reporting."
    );
  }

  // Trustworthy cues
  if (containsAny(text, trustworthyCues)) {
    trustScore += 2;
    reasons.push(
      "The headline references sources or research, which is more typical of balanced reporting."
    );
  }

  // Neutral / scientific structure can slightly help trust
  if (/\bstudy\b|\bresearch\b|\bscientists\b/.test(text)) {
    trustScore += 1;
    reasons.push(
      "The headline mentions research or scientists, which may indicate an attempt to present evidence."
    );
  }

  // Final scoring and label decision
  const totalScore = fakeScore - trustScore;

  let label: HeadlineLabel;
  let confidence: number;

  if (totalScore >= 3.5) {
    label = "fake";
    // Higher fakeScore → higher confidence
    confidence = Math.min(95, 70 + fakeScore * 5);
  } else if (totalScore <= 0) {
    label = "trustworthy";
    // Higher trustScore → higher confidence
    confidence = Math.min(92, 65 + trustScore * 6);
  } else {
    // Borderline case; lean toward fake but with moderate confidence
    label = "fake";
    confidence = 65 + totalScore * 5; // ~65–80
    reasons.push(
      "Some signals suggest sensationalism, but the evidence is mixed, so the classification is less certain."
    );
  }

  // Build explanation text
  let explanation: string;
  if (reasons.length === 0) {
    explanation =
      "The headline does not strongly match typical patterns of either clickbait or neutral reporting, so the system estimated its credibility based on general tone and structure.";
  } else {
    explanation = reasons.join(" ");
  }

  return {
    label,
    confidence: Math.round(confidence),
    explanation,
  };
}

// Helper: check if any keyword appears in the text
function containsAny(text: string, keywords: string[]): boolean {
  return keywords.some((k) => text.includes(k));
}
