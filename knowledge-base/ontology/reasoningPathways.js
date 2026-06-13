/**
 * reasoningPathways.js
 *
 * Defines the major diagnostic pathways used by the Fat Loss Knowledge Graph.
 *
 * These are not graph edges.
 * They are reasoning routes through the graph.
 */

export const REASONING_PATHWAYS = [
  {
    id: "weight_not_moving",
    label: "Weight Not Moving",
    userProblem:
      "The user is trying to lose fat but scale weight has stalled or barely changed.",
    entrySignals: [
      "weight_trend_flat",
      "expected_fat_loss"
    ],
    possibleDiagnoses: [
      "masked_fat_loss",
      "adherence_drift",
      "reduced_expenditure",
      "measurement_noise",
      "energy_balance_mismatch",
      "true_plateau"
    ],
    reasoningOrder: [
      "measurement_noise",
      "water_retention",
      "adherence_drift",
      "reduced_expenditure",
      "energy_balance_failure"
    ],
    firstQuestion:
      "Is the scale trend reliable enough to diagnose?"
  },

  {
    id: "weight_increasing",
    label: "Weight Increasing",
    userProblem:
      "The user is trying to lose fat but scale weight is increasing.",
    entrySignals: [
      "weight_trend_up",
      "scale_spike"
    ],
    possibleDiagnoses: [
      "dietary_water_retention",
      "recovery_water_retention",
      "calorie_surplus",
      "adherence_drift",
      "measurement_noise"
    ],
    reasoningOrder: [
      "measurement_noise",
      "water_retention",
      "adherence_drift",
      "energy_balance_failure"
    ],
    firstQuestion:
      "Is the increase acute and volatile, or sustained across multiple weeks?"
  },

  {
    id: "losing_too_fast",
    label: "Losing Too Fast",
    userProblem:
      "The user is losing weight faster than intended.",
    entrySignals: [
      "rapid_weight_loss",
      "aggressive_deficit"
    ],
    possibleDiagnoses: [
      "aggressive_deficit",
      "glycogen_depletion",
      "dehydration",
      "muscle_loss_risk",
      "low_energy_availability"
    ],
    reasoningOrder: [
      "hydration_status",
      "glycogen_shift",
      "deficit_size",
      "muscle_retention_risk",
      "medical_risk"
    ],
    firstQuestion:
      "Is the rapid loss mostly early water/glycogen or a sustained aggressive deficit?"
  },

  {
    id: "persistent_hunger",
    label: "Persistent Hunger",
    userProblem:
      "The user is consistently hungry, craving food or struggling with dietary control.",
    entrySignals: [
      "hunger_high",
      "cravings_high",
      "adherence_pressure_high"
    ],
    possibleDiagnoses: [
      "protein_low",
      "fibre_low",
      "food_volume_low",
      "sleep_deprivation",
      "diet_fatigue",
      "stress_eating",
      "deficit_too_aggressive"
    ],
    reasoningOrder: [
      "deficit_size",
      "protein_fibre_food_volume",
      "sleep_recovery",
      "stress_psychology",
      "diet_duration"
    ],
    firstQuestion:
      "Is hunger coming from diet structure, deficit size, poor sleep or prolonged dieting?"
  },

  {
    id: "fatigue_high",
    label: "Fatigue High",
    userProblem:
      "The user feels unusually tired, flat, under-recovered or unable to train well.",
    entrySignals: [
      "fatigue_high",
      "training_output_down",
      "sleep_poor"
    ],
    possibleDiagnoses: [
      "recovery_impairment",
      "sleep_deprivation",
      "aggressive_deficit",
      "training_load_too_high",
      "stress_load_high",
      "illness_inflammation",
      "low_energy_availability"
    ],
    reasoningOrder: [
      "sleep",
      "training_load",
      "deficit_size",
      "stress_load",
      "illness_medical_context"
    ],
    firstQuestion:
      "Is fatigue mainly recovery-related, deficit-related, illness-related or training-load related?"
  },

  {
    id: "performance_dropping",
    label: "Performance Dropping",
    userProblem:
      "The user is losing strength, endurance, training output or motivation during fat loss.",
    entrySignals: [
      "training_output_down",
      "performance_drop"
    ],
    possibleDiagnoses: [
      "aggressive_deficit",
      "low_carbohydrate_availability",
      "poor_recovery",
      "sleep_poor",
      "training_load_too_high",
      "muscle_loss_risk"
    ],
    reasoningOrder: [
      "deficit_size",
      "carbohydrate_availability",
      "sleep_recovery",
      "training_load",
      "lean_mass_risk"
    ],
    firstQuestion:
      "Is performance dropping because fuel is too low, recovery is poor, or training load is mismatched?"
  },

  {
    id: "health_marker_priority",
    label: "Health Marker Priority",
    userProblem:
      "The user’s main concern is improving health markers rather than only scale weight.",
    entrySignals: [
      "health_marker_elevated",
      "glucose_control_priority",
      "blood_pressure_priority"
    ],
    possibleDiagnoses: [
      "insulin_resistance",
      "cardiometabolic_risk",
      "low_activity",
      "poor_diet_quality",
      "excess_adiposity"
    ],
    reasoningOrder: [
      "medical_context",
      "glucose_insulin",
      "activity_neat",
      "nutrition_quality",
      "fat_loss_rate"
    ],
    firstQuestion:
      "Which health marker is the priority outcome?"
  }
];

export function listReasoningPathways() {
  return REASONING_PATHWAYS;
}

export function getReasoningPathway(pathwayId) {
  return (
    REASONING_PATHWAYS.find((pathway) => pathway.id === pathwayId) ||
    null
  );
}
