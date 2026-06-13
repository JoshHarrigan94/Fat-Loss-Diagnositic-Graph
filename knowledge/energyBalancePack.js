/**
 * energyBalancePack.js
 *
 * Diagnostic knowledge pack:
 * Energy balance failure
 *
 * Purpose:
 * - Explain when the deficit itself is probably the issue
 * - Separate true energy balance failure from masking, noise or adherence drift
 */

export const ENERGY_BALANCE_PACK = {
  domainId: "energy_balance_failure",

  supports: [
    "weakDeficit",
    "weightTrendFlat",
    "weightVolatilityLow",
    "stepsStable",
    "sleepAdequate",
    "trainingLoadNormal"
  ],

  weakens: [
    "weightVolatilityHigh",
    "possibleMasking",
    "sleepPoor",
    "trainingLoadHigh",
    "calorieVariabilityHigh",
    "weekendCaloriesHigher"
  ],

  missingData: [
    "maintenanceEstimateConfidence",
    "weeklyAverageCalories",
    "weeklyAverageSteps",
    "bodyweightTrendLength"
  ],

  falsePositives: [
    {
      pattern: "Short time window",
      explanation:
        "A true plateau can be overcalled if there are fewer than 14 days of reliable weigh-ins."
    },
    {
      pattern: "High weight volatility",
      explanation:
        "Water retention can make a valid calorie deficit appear ineffective."
    },
    {
      pattern: "Poor logging accuracy",
      explanation:
        "The issue may be adherence or tracking confidence rather than the actual energy balance model."
    }
  ],

  firstActions: [
    {
      action: "Do not immediately crash calories",
      rationale:
        "First confirm the plateau is real, not a masked trend or noisy measurement period."
    },
    {
      action: "Recalculate maintenance",
      rationale:
        "If expected and observed loss diverge repeatedly, the maintenance estimate may be too high."
    },
    {
      action: "Adjust one lever only",
      rationale:
        "Use either a small calorie reduction or a step increase, not both at once, so the response is interpretable."
    }
  ],

  avoid: [
    "Large calorie cuts before ruling out water retention.",
    "Changing calories and activity simultaneously.",
    "Judging the deficit from fewer than 7–14 days of data."
  ],

  interpretation:
    "Energy balance failure becomes more likely when weight is flat, volatility is low, adherence is stable, sleep/recovery is adequate and activity has not dropped."
};

export function scoreEnergyBalancePack(signals = {}) {
  return scorePack(ENERGY_BALANCE_PACK, signals);
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
