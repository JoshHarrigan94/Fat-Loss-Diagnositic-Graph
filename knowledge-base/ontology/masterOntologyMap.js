/**
 * masterOntologyMap.js
 *
 * Master ontology map for the Fat Loss Knowledge Graph.
 *
 * Purpose:
 * - Define the full graph hierarchy
 * - Guide expansion from MVP graph to 300–1000+ nodes
 * - Keep future domains coherent and non-overlapping
 */

export const MASTER_ONTOLOGY_MAP = {
  outcomes: {
    id: "outcomes",
    label: "Outcomes",
    purpose:
      "The end results the system is trying to predict, explain, protect or improve.",
    targetNodeCount: "60-100",
    examples: [
      "fat_mass_reduction",
      "lean_mass_retention",
      "waist_reduction",
      "improved_glucose_control",
      "improved_blood_pressure",
      "improved_mobility",
      "improved_body_confidence",
      "weight_maintenance"
    ]
  },

  populations: {
    id: "populations",
    label: "Populations",
    purpose:
      "User groups whose physiology, risks or constraints modify fat-loss interpretation.",
    targetNodeCount: "40-80",
    examples: [
      "general_adult",
      "bodybuilder",
      "obesity",
      "type_2_diabetes",
      "older_adult",
      "youth",
      "athlete",
      "chronic_illness",
      "menopause_transition",
      "neurodivergent_user"
    ]
  },

  measurements: {
    id: "measurements",
    label: "Measurements",
    purpose:
      "Methods and metrics used to observe body composition, behaviour, health and risk.",
    targetNodeCount: "80-140",
    examples: [
      "scale_weight",
      "waist_measurement",
      "progress_photo",
      "body_fat_estimate",
      "food_log",
      "step_count",
      "sleep_hours",
      "hba1c",
      "fasting_glucose",
      "resting_heart_rate"
    ]
  },

  inputs: {
    id: "inputs",
    label: "Inputs",
    purpose:
      "Raw behaviours, exposures and context variables that influence mechanisms.",
    targetNodeCount: "100-180",
    examples: [
      "calories",
      "protein_intake",
      "carbohydrate_intake",
      "fat_intake",
      "fibre_intake",
      "sodium_intake",
      "alcohol_intake",
      "steps",
      "training_load",
      "sleep_duration",
      "stress_load"
    ]
  },

  behaviours: {
    id: "behaviours",
    label: "Behaviours",
    purpose:
      "Repeated patterns that determine whether interventions succeed in real life.",
    targetNodeCount: "80-140",
    examples: [
      "weekend_eating",
      "meal_prep",
      "food_logging",
      "snacking",
      "restaurant_eating",
      "emotional_eating",
      "walking_habit",
      "sleep_routine",
      "weigh_in_routine"
    ]
  },

  mechanisms: {
    id: "mechanisms",
    label: "Mechanisms",
    purpose:
      "Physiological, behavioural and environmental processes that explain outcomes.",
    targetNodeCount: "150-250",
    examples: [
      "energy_balance",
      "satiety",
      "hunger_pressure",
      "water_retention",
      "glycogen_storage",
      "adaptive_thermogenesis",
      "neet_compensation",
      "insulin_sensitivity",
      "muscle_protein_synthesis",
      "training_inflammation"
    ]
  },

  signals: {
    id: "signals",
    label: "Signals",
    purpose:
      "Calculated or observed indicators used by the diagnostic engine.",
    targetNodeCount: "120-200",
    examples: [
      "weight_volatility_high",
      "weight_trend_flat",
      "deficit_detected",
      "sleep_poor",
      "steps_dropped",
      "calorie_variability_high",
      "protein_low",
      "training_load_high",
      "adherence_drift_signal"
    ]
  },

  diagnoses: {
    id: "diagnoses",
    label: "Diagnoses",
    purpose:
      "Likely explanations inferred from signals, mechanisms and context.",
    targetNodeCount: "80-150",
    examples: [
      "masked_fat_loss",
      "adherence_drift",
      "reduced_expenditure",
      "true_plateau",
      "recovery_water_retention",
      "dietary_water_retention",
      "diet_fatigue",
      "measurement_noise",
      "adaptive_expenditure"
    ]
  },

  interventions: {
    id: "interventions",
    label: "Interventions",
    purpose:
      "Actions that change inputs, behaviours, mechanisms, risks or interpretation quality.",
    targetNodeCount: "150-250",
    examples: [
      "reduce_calories",
      "increase_steps",
      "increase_protein",
      "increase_fibre",
      "standardise_sodium",
      "standardise_carbohydrate",
      "improve_sleep_consistency",
      "deload_training",
      "diet_break",
      "meal_prep"
    ]
  },

  risks: {
    id: "risks",
    label: "Risks",
    purpose:
      "Potential harms or negative outcomes that shape safe recommendations.",
    targetNodeCount: "80-140",
    examples: [
      "muscle_loss",
      "hypoglycaemia",
      "diet_fatigue",
      "injury_risk",
      "binge_risk",
      "under_nutrition",
      "growth_impairment",
      "frailty",
      "low_energy_availability"
    ]
  },

  constraints: {
    id: "constraints",
    label: "Constraints",
    purpose:
      "Practical, medical, psychological or environmental limits that affect intervention choice.",
    targetNodeCount: "80-140",
    examples: [
      "low_budget",
      "limited_time",
      "shift_work",
      "limited_mobility",
      "food_preference",
      "executive_function",
      "medication_context",
      "clinical_supervision_required"
    ]
  },

  evidence: {
    id: "evidence",
    label: "Evidence",
    purpose:
      "Research, guidelines, mechanistic explanations and coaching heuristics supporting graph relationships.",
    targetNodeCount: "100-200",
    examples: [
      "clinical_guideline",
      "systematic_review",
      "controlled_trial",
      "mechanistic_evidence",
      "observational_evidence",
      "coaching_heuristic",
      "user_specific_pattern"
    ]
  }
};

export function listOntologySections() {
  return Object.values(MASTER_ONTOLOGY_MAP);
}

export function getOntologySection(sectionId) {
  return MASTER_ONTOLOGY_MAP[sectionId] || null;
}

export function estimateTotalNodeRange() {
  return {
    conservative: 1020,
    expanded: 1970,
    note:
      "This is an estimated mature graph range if every ontology section is developed."
  };
}