/**
 * confidence.js
 *
 * Confidence scoring helpers for the Fat Loss Knowledge Graph.
 *
 * Purpose:
 * - Standardise relationship confidence
 * - Convert qualitative evidence into numeric confidence bands
 * - Support graph ranking, filtering and explainability
 */

export const CONFIDENCE_BANDS = {
  very_high: {
    id: "very_high",
    label: "Very High",
    min: 85,
    max: 100,
    description:
      "Strong evidence, broadly applicable and low ambiguity."
  },

  high: {
    id: "high",
    label: "High",
    min: 70,
    max: 84,
    description:
      "Well-supported relationship, but context may still modify interpretation."
  },

  moderate: {
    id: "moderate",
    label: "Moderate",
    min: 50,
    max: 69,
    description:
      "Plausible and useful, but evidence or applicability is mixed."
  },

  low: {
    id: "low",
    label: "Low",
    min: 30,
    max: 49,
    description:
      "Weak, context-dependent or mainly heuristic."
  },

  exploratory: {
    id: "exploratory",
    label: "Exploratory",
    min: 0,
    max: 29,
    description:
      "Hypothesis-level relationship requiring further evidence."
  }
};

export function getConfidenceBand(score) {
  const numeric = Number(score);

  if (!Number.isFinite(numeric)) {
    return CONFIDENCE_BANDS.exploratory;
  }

  return (
    Object.values(CONFIDENCE_BANDS).find(
      (band) =>
        numeric >= band.min &&
        numeric <= band.max
    ) || CONFIDENCE_BANDS.exploratory
  );
}

export function scoreFromEvidenceLevel(evidenceLevel) {
  const scores = {
    clinical_guideline: 90,
    systematic_review: 88,
    controlled_trial: 78,
    mechanistic_evidence: 72,
    observational_evidence: 62,
    coaching_heuristic: 50,
    user_specific_pattern: 55,
    hypothesis: 25
  };

  return scores[evidenceLevel] ?? 25;
}

export function combineConfidenceScores(scores = []) {
  const clean = scores
    .map(Number)
    .filter(Number.isFinite);

  if (!clean.length) return 0;

  return Math.round(
    clean.reduce((sum, value) => sum + value, 0) /
      clean.length
  );
}

export function adjustConfidenceForPopulation({
  baseConfidence,
  populationApplicability = []
}) {
  if (!populationApplicability.length) {
    return Math.max(baseConfidence - 10, 0);
  }

  if (populationApplicability.includes("all")) {
    return baseConfidence;
  }

  return Math.max(baseConfidence - 5, 0);
}