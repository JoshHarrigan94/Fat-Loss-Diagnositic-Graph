import {
  extractLegacyRuleSignals
} from "../reasoning/index.js";

const testInput = {
  weightTrend: "stable",
  scaleWeightVariability: "low",
  calorieTrackingAccuracy: "high",
  adherenceConsistency: "high",

  scaleSpike: true,
  missedLogs: true,
  weekendAdherenceGap: true,

  sleepQuality: "low",
  stressLoad: "high",
  fatigue: "high",

  dietDurationWeeks: 10,
  hungerPressure: "high",
  trainingPerformance: "declining",

  diabetesMedication: true,
  hypoglycaemiaRisk: true,
  fastingRequested: true,
  carbohydrateRestrictionRequested: true
};

const signals = extractLegacyRuleSignals(testInput);
const signalIds = signals.map(signal => signal.nodeId);

console.log("\nLegacy Rules Adapter Test");
console.log("=========================");
console.log(`Signals generated: ${signals.length}`);
console.log(signalIds);

const expectedSignals = [
  "weekly_energy_deficit",
  "strategy_calorie_adjustment",
  "measurement_noise_interpretation",
  "measurement_decision_threshold",
  "calorie_tracking_accuracy",
  "energy_intake_estimate",
  "recovery_risk_level",
  "strategy_recovery_repair",
  "diet_fatigue_risk",
  "strategy_diet_break_or_maintenance",
  "glucose_safety_risk",
  "strategy_medical_review",
  "contraindication_unsupervised_fasting",
  "contraindication_carbohydrate_restriction"
];

const missing = expectedSignals.filter(
  signalId => !signalIds.includes(signalId)
);

if (missing.length) {
  throw new Error(
    `Missing expected rule signals: ${missing.join(", ")}`
  );
}

console.log("\nLegacy rules adapter test passed.");