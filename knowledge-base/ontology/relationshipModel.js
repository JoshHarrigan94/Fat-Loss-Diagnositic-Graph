/**
 * relationshipModel.js
 *
 * Relationship model for the Fat Loss Knowledge Graph.
 *
 * Purpose:
 * - Define how ontology layers are allowed to connect
 * - Keep future graph growth structured
 * - Prevent random edges that make the graph messy
 */

export const RELATIONSHIP_MODEL = [
  {
    fromLayer: "population",
    toLayer: "goal",
    allowedRelationships: [
      "modifies",
      "prioritises",
      "constrains"
    ],
    example:
      "older_adult modifies muscle_retention_goal"
  },

  {
    fromLayer: "population",
    toLayer: "intervention",
    allowedRelationships: [
      "modifies",
      "contraindicates",
      "is_constrained_by"
    ],
    example:
      "youth contraindicates aggressive_calorie_deficit"
  },

  {
    fromLayer: "population",
    toLayer: "risk",
    allowedRelationships: [
      "is_risk_for",
      "modifies"
    ],
    example:
      "older_adult is_risk_for sarcopenia"
  },

  {
    fromLayer: "goal",
    toLayer: "intervention",
    allowedRelationships: [
      "prioritises",
      "requires",
      "modifies"
    ],
    example:
      "muscle_retention_goal prioritises resistance_training"
  },

  {
    fromLayer: "input",
    toLayer: "mechanism",
    allowedRelationships: [
      "increases",
      "reduces",
      "contributes_to",
      "causes"
    ],
    example:
      "sodium_intake contributes_to water_retention"
  },

  {
    fromLayer: "behaviour",
    toLayer: "input",
    allowedRelationships: [
      "increases",
      "reduces",
      "modifies",
      "contributes_to"
    ],
    example:
      "weekend_eating increases calorie_variability"
  },

  {
    fromLayer: "behaviour",
    toLayer: "mechanism",
    allowedRelationships: [
      "contributes_to",
      "reduces",
      "increases",
      "worsens",
      "improves"
    ],
    example:
      "consistent_meal_prep improves adherence"
  },

  {
    fromLayer: "mechanism",
    toLayer: "signal",
    allowedRelationships: [
      "indicates",
      "causes",
      "contributes_to"
    ],
    example:
      "water_retention contributes_to weight_volatility_high"
  },

  {
    fromLayer: "measurement",
    toLayer: "signal",
    allowedRelationships: [
      "measures",
      "indicates"
    ],
    example:
      "scale_weight measures weight_trend"
  },

  {
    fromLayer: "signal",
    toLayer: "diagnosis",
    allowedRelationships: [
      "supports",
      "weakens",
      "indicates"
    ],
    example:
      "weight_volatility_high supports masked_fat_loss"
  },

  {
    fromLayer: "mechanism",
    toLayer: "diagnosis",
    allowedRelationships: [
      "supports",
      "contributes_to",
      "causes",
      "weakens"
    ],
    example:
      "water_retention supports masked_fat_loss"
  },

  {
    fromLayer: "diagnosis",
    toLayer: "intervention",
    allowedRelationships: [
      "prioritises",
      "contraindicates",
      "requires"
    ],
    example:
      "recovery_water_retention prioritises improve_sleep_consistency"
  },

  {
    fromLayer: "intervention",
    toLayer: "mechanism",
    allowedRelationships: [
      "increases",
      "reduces",
      "improves",
      "worsens"
    ],
    example:
      "increase_steps increases energy_expenditure"
  },

  {
    fromLayer: "intervention",
    toLayer: "outcome",
    allowedRelationships: [
      "improves",
      "reduces",
      "increases",
      "contributes_to"
    ],
    example:
      "resistance_training improves lean_mass_retention"
  },

  {
    fromLayer: "intervention",
    toLayer: "risk",
    allowedRelationships: [
      "is_risk_for",
      "reduces",
      "increases"
    ],
    example:
      "aggressive_deficit is_risk_for muscle_loss"
  },

  {
    fromLayer: "constraint",
    toLayer: "intervention",
    allowedRelationships: [
      "is_constrained_by",
      "contraindicates",
      "modifies"
    ],
    example:
      "limited_mobility modifies walking_plan"
  },

  {
    fromLayer: "context",
    toLayer: "mechanism",
    allowedRelationships: [
      "modifies",
      "contributes_to",
      "worsens",
      "improves"
    ],
    example:
      "stress_load worsens recovery"
  },

  {
    fromLayer: "evidence",
    toLayer: "edge",
    allowedRelationships: [
      "supports",
      "weakens"
    ],
    example:
      "systematic_review supports protein_intake improves lean_mass_retention"
  }
];

export function listRelationshipRules() {
  return RELATIONSHIP_MODEL;
}

export function getAllowedRelationships({
  fromLayer,
  toLayer
}) {
  const rule = RELATIONSHIP_MODEL.find(
    (item) =>
      item.fromLayer === fromLayer &&
      item.toLayer === toLayer
  );

  return rule?.allowedRelationships || [];
}

export function isAllowedRelationship({
  fromLayer,
  toLayer,
  relationship
}) {
  const allowed = getAllowedRelationships({
    fromLayer,
    toLayer
  });

  return allowed.includes(relationship);
}