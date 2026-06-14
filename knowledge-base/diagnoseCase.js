import { assembleKnowledgeGraph } from "./assembleGraph.js";

import {
  mapInputsToSignals,
  activateGraphFromSignals,
  buildReasoningRoutes,
  summariseReasoningRoutes,
  selectStrategiesFromDiagnosis,
  buildRecommendationPackage
} from "./reasoning/index.js"; 

function unique(values) {
  return [...new Set(values.filter(Boolean))];
}

export function diagnoseCase(userCase) {
  const graph = assembleKnowledgeGraph();

  const signals = mapInputsToSignals(userCase);

  const activationResult = activateGraphFromSignals(
    graph,
    signals,
    {
      expandOneHop: true,
      includeIncomingContext: false
    }
  );

  const activatedNodes = activationResult.activations.map(item => ({
    id: item.id,
    reason: item.reasons.join(" "),
    confidence: item.confidence,
    activationType: item.activationType,
    activatedBy: item.activatedBy,
    viaEdge: item.viaEdge || null
  }));

  const activatedNodeIds = activationResult.activatedNodeIds;

  const reasoningRoutes = buildReasoningRoutes(
    graph,
    activationResult,
    {
      maxDepth: 3,
      stopAtDecisionNodes: true,
      maxRoutesPerStartNode: 8
    }
  );

  const routeSummary = summariseReasoningRoutes(reasoningRoutes);

  const likelyIssues = [];
  const confidenceFlags = [];
  const riskFlags = [];
  const contraindications = [];

  /**
   * Issue classification
   */
  if (activatedNodeIds.includes("population_lean")) {
    likelyIssues.push("higher_diet_fatigue_and_lean_mass_loss_risk");
  }

  if (
    activatedNodeIds.includes("weight_trend_confidence") ||
    activatedNodeIds.includes("measurement_noise_interpretation")
  ) {
    confidenceFlags.push("weight_trend_requires_interpretation");
  }

  if (activatedNodeIds.includes("calorie_tracking_accuracy")) {
    likelyIssues.push("low_intake_confidence");
    confidenceFlags.push("calorie_tracking_confidence_low");
  }

  if (activatedNodeIds.includes("weekend_adherence_gap")) {
    likelyIssues.push("weekend_deficit_erosion");
  }

  if (activatedNodeIds.includes("liquid_calorie_exposure")) {
    likelyIssues.push("hidden_liquid_calorie_intake");
  }

  if (activatedNodeIds.includes("sleep_quality")) {
    likelyIssues.push("poor_sleep_recovery_constraint");
  }

  if (activatedNodeIds.includes("stress_load")) {
    likelyIssues.push("high_stress_load");
  }

  if (
    activatedNodeIds.includes("water_retention_from_stress") ||
    activatedNodeIds.includes("training_inflammation_shift")
  ) {
    confidenceFlags.push("scale_noise_possible");
  }

  if (activatedNodeIds.includes("hypoglycaemia_risk")) {
    riskFlags.push("hypoglycaemia_risk");
  }

  if (activatedNodeIds.includes("glucose_safety_risk")) {
    riskFlags.push("glucose_safety_risk");
  }

  if (activatedNodeIds.includes("medical_risk_level")) {
    riskFlags.push("medical_risk_level");
  }

  if (activatedNodeIds.includes("contraindication_unsupervised_fasting")) {
    contraindications.push("contraindication_unsupervised_fasting");
  }

  if (activatedNodeIds.includes("contraindication_carbohydrate_restriction")) {
    contraindications.push("contraindication_carbohydrate_restriction");
  }

  if (activatedNodeIds.includes("contraindication_aggressive_deficit")) {
    contraindications.push("contraindication_aggressive_deficit");
  }

  if (activatedNodeIds.includes("contraindication_strict_tracking")) {
    contraindications.push("contraindication_strict_tracking");
  }

  if (activatedNodeIds.includes("diet_fatigue_risk")) {
    likelyIssues.push("diet_fatigue_risk");
  }

  if (activatedNodeIds.includes("performance_decline_during_deficit")) {
    likelyIssues.push("performance_decline_during_deficit");
  }

  /**
   * Strategy selection
   */
  const strategySelection = selectStrategiesFromDiagnosis({
    activatedNodeIds,
    likelyIssues,
    confidenceFlags,
    riskFlags,
    contraindications
  });

  /**
   * Recommendation mode
   */
  let recommendationMode = "recommendation_mode_standard";

  if (riskFlags.length || contraindications.length) {
    recommendationMode = "recommendation_mode_referral_first";
  } else if (confidenceFlags.length) {
    recommendationMode = "recommendation_mode_monitor_only";
  } else if (
    likelyIssues.includes("poor_sleep_recovery_constraint") ||
    likelyIssues.includes("diet_fatigue_risk")
  ) {
    recommendationMode = "recommendation_mode_conservative";
  }

const recommendationPackage = buildRecommendationPackage({
  recommendationMode,
  likelyIssues: unique(likelyIssues),
  confidenceFlags: unique(confidenceFlags),
  riskFlags: unique(riskFlags),
  contraindications: unique(contraindications),
  primaryStrategy: strategySelection.primaryStrategy,
  secondaryStrategies: strategySelection.secondaryStrategies,
  delayedStrategies: strategySelection.delayedStrategies,
  blockedStrategies: strategySelection.blockedStrategies
});

  return {
    caseId: userCase.id || null,

    signals,

    activatedNodes,
    activatedNodeIds,
    missingActivatedNodes: activationResult.missingActivatedNodes,

    reasoningRoutes,
    routeSummary,

    likelyIssues: unique(likelyIssues),
    confidenceFlags: unique(confidenceFlags),
    riskFlags: unique(riskFlags),
    contraindications: unique(contraindications),

    strategyCandidates: strategySelection.strategyCandidates,
    primaryStrategy: strategySelection.primaryStrategy,
    secondaryStrategies: strategySelection.secondaryStrategies,
    delayedStrategies: strategySelection.delayedStrategies,
    blockedStrategies: strategySelection.blockedStrategies,
    recommendationPackage
    recommendationMode
  };
}

export default diagnoseCase;