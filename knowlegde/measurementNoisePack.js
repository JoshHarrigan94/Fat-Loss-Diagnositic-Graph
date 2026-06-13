/**
 * measurementNoisePack.js
 *
 * Diagnostic knowledge pack:
 * Measurement noise / insufficient signal
 *
 * Purpose:
 * - Detect when the system should avoid over-diagnosing
 * - Identify when more data is needed before recommending a change
 * - Protect the user from reacting to normal daily weight variation
 */

export const MEASUREMENT_NOISE_PACK = {
  domainId: "measurement_noise",

  supports: [
    "insufficientData",
    "shortTimeWindow",
    "weightVolatilityHigh",
    "missingWeighIns",
    "inconsistentWeighInTiming"
  ],

  weakens: [
    "sufficientData",
    "consistentWeighIns",
    "clearWeightTrend",
    "weightVolatilityLow"
  ],

  missingData: [
    "weighInCount",
    "weighInTiming",
    "scaleConsistency",
    "rollingAverageTrend",
    "minimumObservationWindow"
  ],

  falsePositives: [
    {
      pattern: "Real plateau",
      explanation:
        "A genuine plateau can be missed if the system dismisses too much as noise."
    },
    {
      pattern: "Adherence drift",
      explanation:
        "Inconsistent data and inconsistent behaviour often appear together."
    },
    {
      pattern: "Water retention",
      explanation:
        "High volatility may reflect real masking rather than poor measurement quality."
    }
  ],

  firstActions: [
    {
      action: "Collect 7 more days of consistent data",
      rationale:
        "A longer measurement window improves confidence in the trend."
    },
    {
      action: "Use a 7-day rolling average",
      rationale:
        "Rolling averages reduce the influence of single-day scale noise."
    },
    {
      action: "Standardise weigh-in conditions",
      rationale:
        "Weighing at the same time and under the same conditions improves diagnostic quality."
    }
  ],

  avoid: [
    "Changing calories based on one or two weigh-ins.",
    "Treating daily scale movement as fat change.",
    "Over-interpreting a short or incomplete dataset."
  ],

  interpretation:
    "Measurement noise becomes more likely when the data window is short, weigh-ins are inconsistent, or volatility is high without enough supporting context."
};

export function scoreMeasurementNoisePack(signals = {}) {
  return scorePack(MEASUREMENT_NOISE_PACK, signals);
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