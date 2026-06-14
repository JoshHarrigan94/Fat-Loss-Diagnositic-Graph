import {
  getLegacyMechanismWeight,
  getLegacyInterventionLevers,
  legacyDiagnosisMechanismWeights,
  legacySignalNodeMap,
  legacyInterventionLevers
} from "../reasoning/index.js";

console.log("\nLegacy Graph Adapter Test");
console.log("=========================");

const requiredMechanisms = [
  "masked_fat_loss",
  "recovery_water_retention",
  "adherence_drift",
  "reduced_expenditure",
  "true_plateau",
  "diet_fatigue",
  "medical_or_glucose_safety",
  "lean_mass_protection"
];

const missingMechanisms = requiredMechanisms.filter(
  mechanism => !(mechanism in legacyDiagnosisMechanismWeights)
);

if (missingMechanisms.length) {
  throw new Error(
    `Missing mechanism weights: ${missingMechanisms.join(", ")}`
  );
}

const truePlateauWeight = getLegacyMechanismWeight("true_plateau");

if (typeof truePlateauWeight !== "number") {
  throw new Error("Expected true_plateau mechanism weight to be numeric.");
}

const requiredSignalGroups = [
  "weight_stable_high_noise",
  "sleep_poor_stress_high",
  "tracking_low",
  "weekend_drift",
  "steps_dropped",
  "long_diet_high_hunger",
  "glucose_safety",
  "lean_mass_priority"
];

const missingSignalGroups = requiredSignalGroups.filter(
  group => !(group in legacySignalNodeMap)
);

if (missingSignalGroups.length) {
  throw new Error(
    `Missing signal groups: ${missingSignalGroups.join(", ")}`
  );
}

const requiredStrategies = [
  "strategy_monitoring_confidence",
  "strategy_recovery_repair",
  "strategy_diet_break_or_maintenance",
  "strategy_activity_increase",
  "strategy_calorie_adjustment",
  "strategy_training_adjustment",
  "strategy_medical_review"
];

const missingStrategies = requiredStrategies.filter(
  strategy => !(strategy in legacyInterventionLevers)
);

if (missingStrategies.length) {
  throw new Error(
    `Missing intervention lever groups: ${missingStrategies.join(", ")}`
  );
}

const monitoringLevers = getLegacyInterventionLevers(
  "strategy_monitoring_confidence",
  [
    "measurement_noise_interpretation",
    "scale_weight_variability",
    "weight_trend_confidence"
  ]
);

if (!monitoringLevers.length) {
  throw new Error(
    "Expected monitoring confidence strategy to return tactical levers."
  );
}

const medicalLevers = getLegacyInterventionLevers(
  "strategy_medical_review",
  [
    "hypoglycaemia_risk",
    "glucose_safety_risk",
    "diabetes_medication_context"
  ]
);

if (!medicalLevers.length) {
  throw new Error(
    "Expected medical review strategy to return tactical levers."
  );
}

console.log(`Mechanisms: ${Object.keys(legacyDiagnosisMechanismWeights).length}`);
console.log(`Signal groups: ${Object.keys(legacySignalNodeMap).length}`);
console.log(`Intervention groups: ${Object.keys(legacyInterventionLevers).length}`);
console.log(`Monitoring levers found: ${monitoringLevers.length}`);
console.log(`Medical levers found: ${medicalLevers.length}`);

console.log("\nLegacy graph adapter test passed.");