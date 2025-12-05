// backend/fakeNewsDetector.ts

export type HeadlineLabel = "fake" | "trustworthy";

export interface DetectionResult {
  label: HeadlineLabel;
  confidence: number;   // 0–100
  explanation: string;
}

/**
 * Baseline detector used in the TruthSense AI prototype.
 * Currently returns a random label + explanation.
 * TODO: Replace with a real ML model or rule-based engine.
 */
export function detectHeadline(headline: string): DetectionResult {
  const text = headline.trim();

  if (!text) {
    return {
      label: "fake",
      confidence: 0,
      explanation: "No headline text was provided.",
    };
  }

  const isFake = Math.random() > 0.5;

  return {
    label: isFake ? "fake" : "trustworthy",
    confidence: Math.floor(Math.random() * 20) + 75, // 75–94%
    explanation: isFake
      ? "This headline uses exaggerated or unlikely claims, matching patterns seen in misleading content."
      : "This headline uses neutral language and resembles credible reporting patterns.",
  };
}
