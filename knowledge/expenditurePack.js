/**
 * expenditurePack.js
 *
 * Diagnostic knowledge pack:
 * Reduced expenditure / NEAT compensation
 *
 * Purpose:
 * - Detect whether the planned deficit is being reduced by lower movement
 * - Separate reduced expenditure from adherence failure or scale masking
 */

export const EXPENDITURE_PACK = {
  domainId: "reduced_expenditure",

  supports: [
    "stepsDropped",
    "reducedActivity",
    "weightTrendFlat",
    "deficitDetected",
    "trainingOutputDown"
  ],

  weakens: [
    "stepsStable",
    "stepsIncreasing",
    "weightVolatilityHigh",
    "possibleMasking",
    "calorieVariabilityHigh",
    "weekendCaloriesHigher"
  ],

  missingData: [
    "stepTrend",
    "trainingOutputTrend",
    "restingEnergyEstimate",
    "activeEnergyEstimate",
    "occupationActivityChange"
  ],

  falsePositives: [
    {
      pattern: "Masked loss",
      explanation:
        "Reduced expenditure may be blamed when water retention is actually hiding fat loss."
    },
    {
      pattern: "Logging drift",
      explanation:
        "A flat trend may come from intake inconsistency rather than lower expenditure."
    },
    {
      pattern: "Temporary low activity",
      explanation:
        "One or two low-step days may not meaningfully alter the weekly deficit."
    }
  ],

  firstActions: [
    {
      action: "Restore step floor",
      rationale:
        "A consistent step floor improves expenditure without reducing food intake."
    },
    {
      action: "Compare current steps to baseline",
      rationale:
        "Reduced expenditure is only meaningful relative to the user’s normal activity level."
    },
    {
      action: "Increase low-intensity movement",
      rationale:
        "Low-intensity activity is recoverable and less likely to increase training fatigue."
    }
  ],

  avoid: [
    "Adding intense cardio when recovery masking is already likely.",
    "Cutting calories before checking step compensation.",
    "Assuming gym training offsets a large drop in daily movement."
  ],

  interpretation:
    "Reduced expenditure becomes more likely when steps or spontaneous activity fall while calorie intake appears stable and weight loss slows."
};

export function scoreExpenditurePack(signals = {}) {
  return scorePack(EXPENDITURE_PACK, signals);
}

function scorePack(pack, signals) {
  const supporting = pack.supports.filter(
    (signal) => signals[signal] === true
  );

  const weakening = pack.weakens.filter(
    (signal) => signals[signal] === true
  );

  const score =
    supporting.length * 2 -
    weakening.length * 2;

  return {
    domainId: pack.domainId,
    score,
    supporting,
    weakening,
    interpretation: pack.interpretation,
    firstActions: pack.firstActions,
    avoid: pack.avoid,
    falsePositives: pack.falsePositives
  };
}
