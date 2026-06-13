/**
 * reasoningPathways.js
 *
 * Defines the major diagnostic pathways used by
 * the Fat Loss Diagnostic Engine.
 *
 * These are NOT graph edges.
 *
 * They are reasoning routes through the graph.
 */

export const REASONING_PATHWAYS = [

  {
    id: "weight_not_moving",

    label: "Weight Not Moving",

    outcome: "weight_trend_flat",

    possibleDiagnoses: [
      "masked_fat_loss",
      "adherence_drift",
      "reduced_expenditure",
      "measurement_noise",
      "true_plateau"
    ]
  },

  {
    id: "weight_increasing",

    label: "Weight Increasing",

    outcome: "weight_trend_up",

    possibleDiagnoses: [
      "water_retention",
      "calorie_surplus",
      "adherence_drift",
      "reduced_activity",
      "measurement_noise"
    ]
  },

  {
    id: "losing_too_fast",

    label: "Losing Too Fast",

    outcome: "rapid_weight_loss",

    possibleDiagnoses: [
      "aggressive_deficit",
      "dehydration",
      "glycogen_depletion",
      "muscle_loss_risk"
    ]
  },

  {
    id: "hungry_all_the_time",

    label: "Persistent Hunger",

    outcome: "hunger_high",

    possibleDiagnoses: [
      "protein_low",
      "fibre_low",
      "sleep_deprivation",
      "diet_fatigue",
      "stress_eating"
    ]
  },

  {
    id: "fatigue_high",

    label: "Fatigue",

    outcome: "fatigue_high",

    possibleDiagnoses: [
      "recovery_impairment",
      "sleep_deprivation",
      "aggressive_deficit",
      "stress_load_high",
      "illness"
    ]
  }
];