/**
 * activePathways.js
 *
 * Purpose:
 * - Convert triggered signals into active graph mechanisms
 * - Rank competing explanations
 * - Help the app explain why one diagnosis is more plausible than another
 */

export const SIGNAL_TO_GRAPH_NODES = {
  deficitDetected: ["energy_balance", "expected_weight_loss"],
  aggressiveDeficit: ["energy_balance", "recovery"],
  weakDeficit: ["energy_balance"],

  weightTrendFlat: ["weight_trend", "plateau", "mismatch"],
  weightVolatilityHigh: ["weight_volatility", "water_retention", "masked_fat_loss"],
  possibleMasking: ["water_retention", "masked_fat_loss"],

  sleepPoor: ["sleep", "sleep_quality", "recovery", "recovery_masking"],
  trainingLoadHigh: ["training_load", "recovery", "water_retention"],

  calorieVariabilityHigh: ["adherence", "logging_accuracy", "adherence_drift"],
  weekendCaloriesHigher: ["weekend_drift", "adherence_drift"],
  proteinLow: ["protein", "adherence"],

  stepsDropped: ["steps", "neet", "reduced_expenditure"],
  weightDropping: ["weight_trend", "fat_loss"]
};

export const DIAGNOSIS_MECHANISM_WEIGHTS = {
  masked_fat_loss: {
    water_retention: 4,
    weight_volatility: 4,
    recovery: 3,
    glycogen: 2,
    gut_content: 2,
    mismatch: 3,
    weight_trend: 2
  },

  recovery_masking: {
    recovery: 4,
    sleep: 3,
    sleep_quality: 3,
    training_load: 3,
    water_retention: 3,
    weight_volatility: 2
  },

  adherence_drift: {
    adherence: 4,
    logging_accuracy: 3,
    weekend_drift: 4,
    calories_in: 3,
    protein: 1,
    mismatch: 2
  },

  reduced_expenditure: {
    steps: 4,
    neet: 4,
    calories_out: 3,
    energy_balance: 2,
    mismatch: 2
  },

  true_plateau: {
    plateau: 4,
    mismatch: 4,
    energy_balance: 3,
    expected_weight_loss: 2,
    observed_weight_loss: 2
  }
};

export function getActiveGraphNodes(signals = {}) {
  const activeNodes = new Set();

  Object.entries(signals).forEach(([signal, isActive]) => {
    if (!isActive) return;

    const mappedNodes = SIGNAL_TO_GRAPH_NODES[signal] || [];

    mappedNodes.forEach((nodeId) => activeNodes.add(nodeId));
  });

  return Array.from(activeNodes);
}

export function rankDiagnosisPathways({
  diagnoses = [],
  signals = {}
}) {
  const activeNodes = getActiveGraphNodes(signals);

  return diagnoses
    .map((diagnosis) => {
      const diagnosisId = diagnosis.diagnosisId || diagnosis.id;
      const weights = DIAGNOSIS_MECHANISM_WEIGHTS[diagnosisId] || {};

      const matchedNodes = activeNodes.filter((nodeId) =>
        Object.prototype.hasOwnProperty.call(weights, nodeId)
      );

      const graphScore = matchedNodes.reduce(
        (sum, nodeId) => sum + weights[nodeId],
        0
      );

      const ruleConfidence = diagnosis.confidence || 0;

      const combinedScore =
        Math.round((ruleConfidence * 0.7) + (graphScore * 5));

      return {
        diagnosisId,
        title: diagnosis.title,
        ruleConfidence,
        graphScore,
        combinedScore,
        matchedNodes,
        evidence: diagnosis.evidence || [],
        recommendation: diagnosis.recommendation
      };
    })
    .sort((a, b) => b.combinedScore - a.combinedScore);
}

export function buildCompetingExplanations({
  diagnoses = [],
  signals = {}
}) {
  const ranked = rankDiagnosisPathways({
    diagnoses,
    signals
  });

  return ranked.map((item, index) => ({
    rank: index + 1,
    ...item,
    explanation: buildExplanationText(item)
  }));
}

function buildExplanationText(item) {
  if (!item.matchedNodes.length) {
    return `${item.title} was triggered by rules, but the current graph has limited active pathway support.`;
  }

  const mechanisms = item.matchedNodes
    .map(formatLabel)
    .join(", ");

  return `${item.title} is supported by active graph mechanisms: ${mechanisms}.`;
}

function formatLabel(value) {
  return String(value || "")
    .replaceAll("_", " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}