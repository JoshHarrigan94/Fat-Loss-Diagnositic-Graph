/**
 * nodeTypes.js
 *
 * Fat Loss Knowledge Graph ontology.
 *
 * Purpose:
 * - Define the allowed node types for a scalable fat-loss graph
 * - Keep node meaning consistent as the graph grows to hundreds/thousands of nodes
 */

export const NODE_TYPES = {
  population: {
    id: "population",
    label: "Population",
    description:
      "A group whose physiology, risks, goals or constraints change how fat-loss advice should be interpreted.",
    examples: [
      "general_adult",
      "bodybuilder",
      "older_adult",
      "type_2_diabetes"
    ]
  },

  goal: {
    id: "goal",
    label: "Goal",
    description:
      "The desired outcome or priority that shapes decision-making.",
    examples: [
      "fat_loss",
      "muscle_retention",
      "glucose_control",
      "health_improvement"
    ]
  },

  input: {
    id: "input",
    label: "Input",
    description:
      "A user-entered or observed behaviour, measurement or contextual variable.",
    examples: [
      "calories",
      "steps",
      "sleep_hours",
      "training_load"
    ]
  },

  behaviour: {
    id: "behaviour",
    label: "Behaviour",
    description:
      "A repeated action pattern that affects fat-loss outcomes.",
    examples: [
      "meal_timing",
      "weekend_eating",
      "food_logging",
      "daily_walking"
    ]
  },

  mechanism: {
    id: "mechanism",
    label: "Mechanism",
    description:
      "A causal or physiological process explaining why a result occurs.",
    examples: [
      "energy_balance",
      "water_retention",
      "adaptive_thermogenesis",
      "satiety"
    ]
  },

  biomarker: {
    id: "biomarker",
    label: "Biomarker",
    description:
      "A biological marker that may inform diagnosis, risk or intervention selection.",
    examples: [
      "fasting_glucose",
      "hba1c",
      "resting_heart_rate",
      "hrv"
    ]
  },

  signal: {
    id: "signal",
    label: "Signal",
    description:
      "A calculated or observed indicator used by the diagnostic engine.",
    examples: [
      "weight_volatility_high",
      "sleep_poor",
      "steps_dropped",
      "calorie_variability_high"
    ]
  },

  diagnosis: {
    id: "diagnosis",
    label: "Diagnosis",
    description:
      "A likely explanatory pattern inferred from evidence.",
    examples: [
      "masked_fat_loss",
      "adherence_drift",
      "reduced_expenditure",
      "true_plateau"
    ]
  },

  intervention: {
    id: "intervention",
    label: "Intervention",
    description:
      "An action that can change behaviour, physiology, risk or interpretation quality.",
    examples: [
      "reduce_calories",
      "increase_steps",
      "improve_sleep",
      "standardise_sodium"
    ]
  },

  contraindication: {
    id: "contraindication",
    label: "Contraindication",
    description:
      "A reason an intervention may be inappropriate, unsafe or lower priority.",
    examples: [
      "youth_growth_phase",
      "frailty_risk",
      "eating_disorder_risk",
      "pregnancy"
    ]
  },

  risk: {
    id: "risk",
    label: "Risk",
    description:
      "A negative outcome or harm that must be managed.",
    examples: [
      "muscle_loss",
      "hypoglycaemia",
      "injury_risk",
      "diet_fatigue"
    ]
  },

  constraint: {
    id: "constraint",
    label: "Constraint",
    description:
      "A limitation that changes which interventions are realistic or appropriate.",
    examples: [
      "low_budget",
      "limited_mobility",
      "shift_work",
      "low_time_availability"
    ]
  },

  measurement: {
    id: "measurement",
    label: "Measurement",
    description:
      "A method or metric used to observe body composition, behaviour or health status.",
    examples: [
      "scale_weight",
      "waist_measurement",
      "progress_photo",
      "food_log"
    ]
  },

  context: {
    id: "context",
    label: "Context",
    description:
      "Life, environment or state information that modifies interpretation.",
    examples: [
      "stress_load",
      "illness",
      "travel",
      "menstrual_cycle"
    ]
  },

  outcome: {
    id: "outcome",
    label: "Outcome",
    description:
      "A result that the system predicts, monitors or tries to improve.",
    examples: [
      "fat_mass_reduction",
      "lean_mass_retention",
      "improved_glycaemic_control",
      "weight_stability"
    ]
  },

  evidence: {
    id: "evidence",
    label: "Evidence",
    description:
      "A research, empirical, mechanistic or coaching rationale supporting a relationship.",
    examples: [
      "clinical_guideline",
      "mechanistic_evidence",
      "observational_pattern",
      "coach_heuristic"
    ]
  }
};

export function getNodeType(type) {
  return NODE_TYPES[type] || null;
}

export function listNodeTypes() {
  return Object.values(NODE_TYPES);
}

export function isValidNodeType(type) {
  return Boolean(NODE_TYPES[type]);
}