/**
 * edgeTypes.js
 *
 * Fat Loss Knowledge Graph ontology.
 *
 * Purpose:
 * - Define allowed relationship types
 * - Keep edge semantics consistent across the graph
 * - Support reasoning, filtering, validation and visualisation
 */

export const EDGE_TYPES = {
  causes: {
    id: "causes",
    label: "Causes",
    description:
      "A strong causal relationship where the source can directly produce the target.",
    direction: "source_to_target",
    examples: [
      "calorie_deficit causes fat_mass_reduction",
      "sleep_deprivation causes recovery_impairment"
    ]
  },

  contributes_to: {
    id: "contributes_to",
    label: "Contributes to",
    description:
      "The source increases the likelihood, magnitude or relevance of the target but is not sufficient alone.",
    direction: "source_to_target",
    examples: [
      "stress_load contributes_to appetite_dysregulation",
      "training_inflammation contributes_to water_retention"
    ]
  },

  increases: {
    id: "increases",
    label: "Increases",
    description:
      "The source raises the level, probability or expression of the target.",
    direction: "source_to_target",
    examples: [
      "sodium_intake increases water_retention",
      "steps increases energy_expenditure"
    ]
  },

  reduces: {
    id: "reduces",
    label: "Reduces",
    description:
      "The source lowers the level, probability or expression of the target.",
    direction: "source_to_target",
    examples: [
      "calorie_deficit reduces fat_mass",
      "sleep_restriction reduces recovery_capacity"
    ]
  },

  masks: {
    id: "masks",
    label: "Masks",
    description:
      "The source can hide or distort the apparent expression of the target.",
    direction: "source_to_target",
    examples: [
      "water_retention masks fat_loss",
      "gut_content masks scale_weight_trend"
    ]
  },

  measures: {
    id: "measures",
    label: "Measures",
    description:
      "The source is a measurement method or proxy for the target.",
    direction: "source_to_target",
    examples: [
      "scale_weight measures body_mass",
      "waist_measurement measures central_adiposity"
    ]
  },

  indicates: {
    id: "indicates",
    label: "Indicates",
    description:
      "The source is evidence suggesting the target may be present.",
    direction: "source_to_target",
    examples: [
      "weight_volatility_high indicates water_retention",
      "weekend_calories_higher indicates adherence_drift"
    ]
  },

  supports: {
    id: "supports",
    label: "Supports",
    description:
      "The source supports an interpretation, diagnosis or decision.",
    direction: "source_to_target",
    examples: [
      "sleep_poor supports recovery_masking",
      "steps_dropped supports reduced_expenditure"
    ]
  },

  weakens: {
    id: "weakens",
    label: "Weakens",
    description:
      "The source weakens an interpretation, diagnosis or decision.",
    direction: "source_to_target",
    examples: [
      "weight_volatility_low weakens masked_fat_loss",
      "calorie_consistency weakens adherence_drift"
    ]
  },

  contraindicates: {
    id: "contraindicates",
    label: "Contraindicates",
    description:
      "The source makes an intervention inappropriate, unsafe or lower priority.",
    direction: "source_to_target",
    examples: [
      "hypoglycaemia_risk contraindicates aggressive_calorie_reduction",
      "youth_growth_phase contraindicates aggressive_deficit"
    ]
  },

  modifies: {
    id: "modifies",
    label: "Modifies",
    description:
      "The source changes how the target should be interpreted or applied.",
    direction: "source_to_target",
    examples: [
      "older_adult modifies protein_requirement",
      "type_2_diabetes modifies carbohydrate_strategy"
    ]
  },

  requires: {
    id: "requires",
    label: "Requires",
    description:
      "The source depends on the target being present or measured.",
    direction: "source_to_target",
    examples: [
      "adaptive_thermogenesis_diagnosis requires prolonged_deficit",
      "true_plateau_diagnosis requires sufficient_time_window"
    ]
  },

  improves: {
    id: "improves",
    label: "Improves",
    description:
      "The source improves the target outcome, signal or mechanism.",
    direction: "source_to_target",
    examples: [
      "increased_steps improves energy_expenditure",
      "sleep_consistency improves recovery"
    ]
  },

  worsens: {
    id: "worsens",
    label: "Worsens",
    description:
      "The source worsens the target outcome, signal or mechanism.",
    direction: "source_to_target",
    examples: [
      "poor_sleep worsens hunger_control",
      "high_stress worsens adherence"
    ]
  },

  competes_with: {
    id: "competes_with",
    label: "Competes with",
    description:
      "The source competes with another interpretation, intervention or mechanism.",
    direction: "bidirectional",
    examples: [
      "adherence_drift competes_with masked_fat_loss",
      "calorie_reduction competes_with recovery_priority"
    ]
  },

  is_risk_for: {
    id: "is_risk_for",
    label: "Is risk for",
    description:
      "The source increases the risk of the target harm.",
    direction: "source_to_target",
    examples: [
      "aggressive_deficit is_risk_for muscle_loss",
      "low_energy_availability is_risk_for hormonal_disruption"
    ]
  },

  is_constrained_by: {
    id: "is_constrained_by",
    label: "Is constrained by",
    description:
      "The source is limited or shaped by the target constraint.",
    direction: "source_to_target",
    examples: [
      "meal_prep_strategy is_constrained_by low_budget",
      "walking_plan is_constrained_by limited_mobility"
    ]
  },

  part_of: {
    id: "part_of",
    label: "Part of",
    description:
      "The source is a component of the target.",
    direction: "source_to_target",
    examples: [
      "protein_intake part_of nutrition_quality",
      "steps part_of daily_activity"
    ]
  },

  subtype_of: {
    id: "subtype_of",
    label: "Subtype of",
    description:
      "The source is a specific form of the target.",
    direction: "source_to_target",
    examples: [
      "recovery_water_retention subtype_of water_retention",
      "dietary_water_retention subtype_of water_retention"
    ]
  }
};

export function getEdgeType(type) {
  return EDGE_TYPES[type] || null;
}

export function listEdgeTypes() {
  return Object.values(EDGE_TYPES);
}

export function isValidEdgeType(type) {
  return Boolean(EDGE_TYPES[type]);
}