/**
 * adherencePack.js
 *
 * Diagnostic knowledge pack:
 * Adherence / Logging Drift
 *
 * Purpose:
 * - Determine whether behaviour is reducing the effective deficit
 * - Separate true non-adherence from recovery masking or energy balance failure
 */

export const ADHERENCE_PACK = {
  domainId: "adherence_drift",

  supports: [
    "calorieVariabilityHigh",
    "weekendCaloriesHigher",
    "proteinLow",
    "loggingConfidenceLow",
    "weightTrendFlat"
  ],

  weakens: [
    "weightVolatilityHigh",
    "possibleMasking",
    "sleepPoor",
    "trainingLoadHigh",
    "consistentCalories",
    "consistentSteps"
  ],

  missingData: [
    "weekendVsWeekdayCalories",
    "loggingCoverage",
    "mealConsistency",
    "restaurantFrequency"
  ],

  falsePositives: [
    {
      pattern: "Recovery masking",
      explanation:
        "Scale stagnation may be caused by water retention rather than adherence failure."
    },
    {
      pattern: "Incorrect maintenance estimate",
      explanation:
        "The user may be fully adherent but maintenance calories are estimated incorrectly."
    },
    {
      pattern: "Short observation period",
      explanation:
        "Normal scale noise may be interpreted as behavioural failure."
    }
  ],

  firstActions: [
    {
      action: "Audit weekends",
      rationale:
        "Most adherence drift occurs during weekends, social events and unstructured eating."
    },
    {
      action: "Increase calorie logging confidence",
      rationale:
        "Improved measurement reduces uncertainty and improves diagnosis quality."
    },
    {
      action: "Standardise high-risk meals",
      rationale:
        "Reducing variability makes calorie intake easier to interpret."
    }
  ],

  avoid: [
    "Assuming dishonesty.",
    "Reducing calories before understanding adherence.",
    "Using scale weight alone as proof of non-compliance."
  ],

  interpretation:
    "Adherence drift becomes more likely when calorie variability rises, weekends differ significantly from weekdays and the scale trend does not match the planned deficit."
};

export function scoreAdherencePack(signals = {}) {
  return scorePack(ADHERENCE_PACK, signals);
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
