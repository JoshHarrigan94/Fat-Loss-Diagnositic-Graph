import {
  extractLegacyKnowledgeSignals
} from "../reasoning/index.js";

const testInput = {
  weightTrend: "stable",
  calorieTrackingAccuracy: "high",
  adherenceConsistency: "high",
  scaleWeightVariability: "low",
  scaleSpike: true,
  sleepQuality: "low",
  stressLoad: "high",
  weekendAdherenceGap: true,
  missedLogs: true,
  stepCountConsistency: "low",
  dietDurationWeeks: 10,
  hungerPressure: "high",
  trainingPerformance: "declining"
};

const signals = extractLegacyKnowledgeSignals(testInput);
const signalIds = signals.map(signal => signal.nodeId);

console.log("\nLegacy Knowledge Adapter Test");
console.log("=============================");
console.log(`Signals generated: ${signals.length}`);
console.log(signalIds);

const expectedSignals = [
  "scale_weight_variability",
  "measurement_noise_interpretation",
  "water_retention_from_stress",
  "weekly_energy_deficit",
  "strategy_calorie_adjustment",
  "weekend_adherence_gap",
  "adherence_consistency",
  "calorie_tracking_accuracy",
  "energy_intake_estimate",
  "step_count_consistency",
  "low_activity_bottleneck",
  "recovery_risk_level",
  "diet_fatigue_risk"
];

const missing = expectedSignals.filter(
  signalId => !signalIds.includes(signalId)
);

if (missing.length) {
  throw new Error(
    `Missing expected legacy signals: ${missing.join(", ")}`
  );
}

console.log("\nLegacy knowledge adapter test passed.");
