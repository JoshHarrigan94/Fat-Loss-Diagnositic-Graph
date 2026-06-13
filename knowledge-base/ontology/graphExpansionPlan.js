/**
 * graphExpansionPlan.js
 *
 * Expansion plan for scaling the Fat Loss Knowledge Graph.
 *
 * Purpose:
 * - Translate the ontology into practical build phases
 * - Keep growth deliberate rather than random
 * - Support a few hundred to 1000+ nodes over time
 */

export const GRAPH_EXPANSION_PLAN = {
  phase_1_foundation: {
    id: "phase_1_foundation",
    label: "Foundation ontology",
    targetNodeCount: 50,
    status: "in_progress",
    includes: [
      "node_types",
      "edge_types",
      "populations",
      "domain_taxonomy",
      "evidence_levels",
      "confidence_model",
      "relationship_model"
    ],
    purpose:
      "Define the rules of the graph before scaling content."
  },

  phase_2_core_fat_loss_domains: {
    id: "phase_2_core_fat_loss_domains",
    label: "Core fat-loss domains",
    targetNodeCount: 250,
    status: "planned",
    domains: [
      "energy_balance",
      "adherence_behaviour",
      "activity_neat",
      "water_scale_noise",
      "recovery_sleep",
      "measurement_noise"
    ],
    purpose:
      "Build the universal fat-loss reasoning core that applies to most users."
  },

  phase_3_nutrition_and_appetite: {
    id: "phase_3_nutrition_and_appetite",
    label: "Nutrition, appetite and diet quality",
    targetNodeCount: 400,
    status: "planned",
    domains: [
      "appetite_satiety",
      "nutrition_quality",
      "gut_digestion",
      "diet_fatigue"
    ],
    purpose:
      "Explain why diets are or are not sustainable in real life."
  },

  phase_4_training_and_body_composition: {
    id: "phase_4_training_and_body_composition",
    label: "Training and body composition",
    targetNodeCount: 550,
    status: "planned",
    domains: [
      "exercise_training",
      "body_composition",
      "muscle_retention",
      "performance_tradeoffs"
    ],
    purpose:
      "Serve bodybuilders, athletes and users prioritising lean-mass retention."
  },

  phase_5_clinical_and_population_overlays: {
    id: "phase_5_clinical_and_population_overlays",
    label: "Clinical and population overlays",
    targetNodeCount: 750,
    status: "planned",
    domains: [
      "glucose_insulin",
      "medication_medical",
      "hormones_life_stage",
      "population_constraints",
      "risk_management"
    ],
    purpose:
      "Modify advice for diabetes, obesity, youth, older adults, chronic illness and medical context."
  },

  phase_6_intervention_intelligence: {
    id: "phase_6_intervention_intelligence",
    label: "Intervention intelligence",
    targetNodeCount: 900,
    status: "planned",
    domains: [
      "intervention_strategy",
      "contraindications",
      "sequencing",
      "risk_adjusted_recommendations"
    ],
    purpose:
      "Turn diagnosis into ranked, safe, personalised next actions."
  },

  phase_7_personalisation_and_learning: {
    id: "phase_7_personalisation_and_learning",
    label: "Personalisation and adaptive graph learning",
    targetNodeCount: "1000+",
    status: "future",
    domains: [
      "user_specific_patterns",
      "intervention_response_memory",
      "adaptive_edge_weights",
      "personal_physiology_graph"
    ],
    purpose:
      "Allow the graph to learn which mechanisms and interventions matter most for the individual."
  }
};

export function listExpansionPhases() {
  return Object.values(GRAPH_EXPANSION_PLAN);
}

export function getExpansionPhase(phaseId) {
  return GRAPH_EXPANSION_PLAN[phaseId] || null;
}