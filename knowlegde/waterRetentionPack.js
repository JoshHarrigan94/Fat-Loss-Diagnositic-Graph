/**
 * waterRetentionPack.js
 *
 * Diagnostic knowledge pack:
 * Water retention / scale masking
 *
 * Purpose:
 * - Determine whether fat loss may be hidden by temporary scale masking
 * - Separate recovery-driven water retention from dietary water retention
 * - Prevent unnecessary calorie cuts when the deficit may already be working
 */

export const WATER_RETENTION_PACK = {
  domainId: "water_retention_masking",

  supports: [
    "weightVolatilityHigh",
    "possibleMasking",
    "deficitDetected",
    "weightTrendFlat"
  ],

  weakens: [
    "weightVolatilityLow",
    "weakDeficit",
    "calorieVariabilityHigh",
    "weekendCaloriesHigher"
  ],

  subtypes: {
    recovery_water_retention: {
      title: "Recovery-driven water retention",
      supports: [
        "sleepPoor",
        "trainingLoadHigh",
        "stressHigh",
        "illnessDetected",
        "weightVolatilityHigh"
      ],
      weakens: [
        "sleepAdequate",
        "trainingLoadNormal"
      ],
      firstActions: [
        {
          action: "Hold calories steady",
          rationale:
            "If recovery masking is likely, cutting calories may increase fatigue and worsen the masking signal."
        },
        {
          action: "Improve sleep consistency",
          rationale:
            "Better sleep may reduce recovery stress and water retention volatility."
        },
        {
          action: "Reduce unnecessary training fatigue",
          rationale:
            "A short reduction in fatigue can reveal whether fat loss is being masked."
        }
      ]
    },

    dietary_water_retention: {
      title: "Dietary water retention",
      supports: [
        "carbsHighOrVariable",
        "sodiumHighOrVariable",
        "alcoholDetected",
        "gutLoadHigh",
        "calorieVariabilityHigh",
        "weightVolatilityHigh"
      ],
      weakens: [
        "consistentCalories",
        "consistentCarbs",
        "consistentSodium"
      ],
      firstActions: [
        {
          action: "Standardise carbohydrate intake",
          rationale:
            "Consistent carbohydrate intake reduces glycogen-driven water swings."
        },
        {
          action: "Standardise sodium intake",
          rationale:
            "Sodium consistency makes weight trends easier to interpret."
        },
        {
          action: "Standardise food volume",
          rationale:
            "Digestive mass can distort scale weight independently of fat change."
        }
      ]
    }
  },

  missingData: [
    "carbohydrateVariability",
    "sodiumConsistency",
    "alcoholFrequency",
    "trainingSoreness",
    "stressRating",
    "illnessFlag",
    "bowelRegularity"
  ],

  falsePositives: [
    {
      pattern: "Actual calorie drift",
      explanation:
        "A flat trend with high volatility may still be adherence drift if intake is inconsistent."
    },
    {
      pattern: "Weak deficit",
      explanation:
        "Water retention may be blamed when the planned deficit is too small to create measurable loss."
    },
    {
      pattern: "Too little time",
      explanation:
        "Short windows can exaggerate volatility and overstate masking."
    }
  ],

  firstActions: [
    {
      action: "Do not cut calories immediately",
      rationale:
        "If masking is likely, the best first move is to improve signal quality and wait."
    },
    {
      action: "Stabilise inputs for 7 days",
      rationale:
        "Keeping calories, carbs, sodium, sleep and training more consistent improves interpretability."
    },
    {
      action: "Compare rolling averages",
      rationale:
        "A 7-day rolling trend is more useful than single-day scale changes."
    }
  ],

  avoid: [
    "Reacting to one or two weigh-ins.",
    "Cutting calories while recovery stress is high.",
    "Assuming scale stagnation means fat loss has stopped."
  ],

  interpretation:
    "Water retention masking becomes more likely when a deficit is present, weight is flat, and scale volatility is elevated."
};

export function scoreWaterRetentionPack(signals = {}) {
  const baseScore = scoreSignalSet({
    supports: WATER_RETENTION_PACK.supports,
    weakens: WATER_RETENTION_PACK.weakens,
    signals
  });

  const subtypeScores = Object.entries(WATER_RETENTION_PACK.subtypes)
    .map(([subtypeId, subtype]) => ({
      subtypeId,
      title: subtype.title,
      ...scoreSignalSet({
        supports: subtype.supports,
        weakens: subtype.weakens,
        signals
      }),
      firstActions: subtype.firstActions
    }))
    .sort((a, b) => b.score - a.score);

  return {
    domainId: WATER_RETENTION_PACK.domainId,
    score: baseScore.score,
    supporting: baseScore.supporting,
    weakening: baseScore.weakening,
    interpretation: WATER_RETENTION_PACK.interpretation,
    firstActions: WATER_RETENTION_PACK.firstActions,
    avoid: WATER_RETENTION_PACK.avoid,
    falsePositives: WATER_RETENTION_PACK.falsePositives,
    subtypes: subtypeScores,
    topSubtype: subtypeScores[0] || null
  };
}

function scoreSignalSet({
  supports = [],
  weakens = [],
  signals = {}
}) {
  const supporting = supports.filter(
    (signal) => signals[signal] === true
  );

  const weakening = weakens.filter(
    (signal) => signals[signal] === true
  );

  const score =
    supporting.length * 2 -
    weakening.length * 2;

  return {
    score,
    supporting,
    weakening
  };
}