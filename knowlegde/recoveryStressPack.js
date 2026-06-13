/**
 * recoveryStressPack.js
 *
 * Diagnostic knowledge pack:
 * Recovery / Stress Interference
 *
 * Purpose:
 * - Identify when recovery stress is interfering with fat-loss interpretation
 * - Separate recovery stress from pure dietary water retention or adherence drift
 * - Guide users away from aggressive calorie cuts when stress load is already high
 */

export const RECOVERY_STRESS_PACK = {
  domainId: "recovery_stress_interference",

  supports: [
    "sleepPoor",
    "trainingLoadHigh",
    "stressHigh",
    "illnessDetected",
    "weightVolatilityHigh",
    "possibleMasking"
  ],

  weakens: [
    "sleepAdequate",
    "trainingLoadNormal",
    "weightVolatilityLow",
    "weightDropping"
  ],

  missingData: [
    "subjectiveStress",
    "restingHeartRate",
    "hrvTrend",
    "trainingSoreness",
    "illnessFlag",
    "sleepConsistency",
    "moodRating"
  ],

  falsePositives: [
    {
      pattern: "Dietary water retention",
      explanation:
        "Scale volatility may be driven by carbohydrate, sodium, alcohol or gut-content variation rather than recovery stress."
    },
    {
      pattern: "Adherence drift",
      explanation:
        "Poor recovery may coexist with inconsistent intake, making adherence the larger driver."
    },
    {
      pattern: "Normal training fatigue",
      explanation:
        "Some fatigue is expected during a deficit and does not always mean the plan is failing."
    }
  ],

  firstActions: [
    {
      action: "Improve sleep regularity",
      rationale:
        "Sleep is the highest-leverage recovery input and can reduce noise in weight trend interpretation."
    },
    {
      action: "Reduce fatigue cost temporarily",
      rationale:
        "A short deload or reduction in high-damage work can reveal whether fatigue is masking progress."
    },
    {
      action: "Hold calories steady",
      rationale:
        "Cutting calories while recovery is poor may increase stress and reduce training output."
    }
  ],

  avoid: [
    "Adding more cardio when fatigue is already high.",
    "Cutting calories aggressively during poor sleep periods.",
    "Treating stress-driven scale noise as fat gain."
  ],

  interpretation:
    "Recovery stress interference becomes more likely when sleep is poor, training load is high, stress is elevated and scale weight is volatile."
};

export function scoreRecoveryStressPack(signals = {}) {
  return scorePack(RECOVERY_STRESS_PACK, signals);
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