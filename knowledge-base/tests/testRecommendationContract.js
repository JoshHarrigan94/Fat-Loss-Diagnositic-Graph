import { diagnoseCase } from "../diagnoseCase.js";

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

const plateauDiagnosis = diagnoseCase({
  inputs: {
    weightTrend: "stable",
    scaleWeightVariability: "low",
    adherenceConsistency: "high",
    calorieTrackingAccuracy: "high",
    stepCountConsistency: "high",
    sleepQuality: "normal",
    stressLoad: "normal"
  }
});

assert(
  plateauDiagnosis.primaryStrategy === "strategy_calorie_adjustment",
  "Stable low-noise plateau with good data should allow calorie adjustment."
);

assert(
  plateauDiagnosis.recommendationMode === "recommendation_mode_standard",
  "Stable low-noise plateau with good data should remain in standard mode."
);

const noiseDiagnosis = diagnoseCase({
  inputs: {
    weightTrend: "stable",
    scaleWeightVariability: "high",
    calorieTrackingAccuracy: "high",
    adherenceConsistency: "high",
    stepCountConsistency: "high",
    sleepQuality: "low",
    stressLoad: "high",
    trainingSoreness: "high",
    scaleSpike: true
  }
});

assert(
  noiseDiagnosis.primaryStrategy === "strategy_monitoring_confidence",
  "High scale noise should prioritise monitoring confidence."
);

assert(
  noiseDiagnosis.delayedStrategies.some(
    strategy => strategy.id === "strategy_calorie_adjustment"
  ),
  "High scale noise may delay calorie adjustment."
);

assert(
  !noiseDiagnosis.secondaryStrategies.includes("strategy_calorie_adjustment"),
  "Delayed calorie adjustment must not count as an active secondary strategy."
);

assert(
  noiseDiagnosis.primaryStrategy !== "strategy_calorie_adjustment",
  "Delayed calorie adjustment must not become the active strategy."
);

console.log("\nRecommendation Contract Test");
console.log("============================");
console.log("Recommendation contract checks passed.");
