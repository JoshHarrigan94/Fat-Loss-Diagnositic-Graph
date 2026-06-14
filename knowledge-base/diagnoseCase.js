import { assembleKnowledgeGraph } from "./assembleGraph.js";

import {
  mapInputsToSignals,
  activateGraphFromSignals,
  buildReasoningRoutes,
  summariseReasoningRoutes,
  selectStrategiesFromDiagnosis,
  buildRecommendationPackage,
  buildConfidenceProfile
} from "./reasoning/index.js";

function unique(values) {
  return [...new Set(values.filter(Boolean))];
}

export function diagnoseCase(userCase) {
  const graph = assembleKnowledgeGraph();

  const signals = mapInputsToSignals(userCase);

  const activationResult = activateGraphFromSignals(graph, signals, {
    expandOneHop: true,
    includeIncomingContext: false
  });

  const activatedNodes = activationResult.activations.map(item => ({
    id: item.id,
    reason: item.reasons.join(" "),
    confidence: item.confidence,
    activationType: item.activationType,
    activatedBy: item.activatedBy,
    viaEdge: item.viaEdge || null
  }));

  const activatedNodeIds = activationResult.activatedNodeIds;

  const reasoningRoutes = buildReasoningRoutes(graph, activationResult, {
    maxDepth: 3,
    stopAtDecisionNodes: true,
    maxRoutesPerStartNode: 8
  });

  const routeSummary = summariseReasoningRoutes(reasoningRoutes);

  const likelyIssues = [];
  const confidenceFlags = [];
  const riskFlags = [];
  const contraindications = [];

  if (
    activatedNodeIds.includes("weekly_energy_deficit") &&
    activatedNodeIds.includes("strategy_calorie_adjustment")
  ) {
    likelyIssues.push("insufficient_weekly_energy_deficit");
  }

  if (activatedNodeIds.includes("population_lean")) {
    likelyIssues.push("higher_diet_fatigue_and_lean_mass_loss_risk");
  }

  if (
    activatedNodeIds.includes("population_older_adult") ||
    activatedNodeIds.includes("sarcopenia_risk") ||
    activatedNodeIds.includes("priority_functional_independence")
  ) {
    likelyIssues.push("lean_mass_retention_priority");
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
    likelyIssues.push("scale_noise_possible");
    confidenceFlags.push("scale_noise_possible");
  }

  if (activatedNodeIds.includes("hypoglycaemia_risk")) {
    likelyIssues.push("hypoglycaemia_risk");
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

  if (
    activatedNodeIds.includes("low_activity_bottleneck") ||
    activatedNodeIds.includes("sedentary_time") ||
    activatedNodeIds.includes("step_count_consistency")
  ) {
    likelyIssues.push("low_activity_bottleneck");
  }

  const finalLikelyIssues = unique(likelyIssues);
  const finalConfidenceFlags = unique(confidenceFlags);
  const finalRiskFlags = unique(riskFlags);
  const finalContraindications = unique(contraindications);

  const strategySelection = selectStrategiesFromDiagnosis({
    activatedNodeIds,
    likelyIssues: finalLikelyIssues,
    confidenceFlags: finalConfidenceFlags,
    riskFlags: finalRiskFlags,
    contraindications: finalContraindications
  });

  let recommendationMode = "recommendation_mode_standard";

  if (finalRiskFlags.length || finalContraindications.length) {
    recommendationMode = "recommendation_mode_referral_first";
  } else if (
    finalLikelyIssues.includes("insufficient_weekly_energy_deficit") &&
    finalConfidenceFlags.length === 0
  ) {
    recommendationMode = "recommendation_mode_standard";
  } else if (finalConfidenceFlags.length) {
    recommendationMode = "recommendation_mode_monitor_only";
  } else if (
    finalLikelyIssues.includes("poor_sleep_recovery_constraint") ||
    finalLikelyIssues.includes("diet_fatigue_risk") ||
    finalLikelyIssues.includes("lean_mass_retention_priority")
  ) {
    recommendationMode = "recommendation_mode_conservative";
  }

  const partialDiagnosis = {
    activatedNodeIds,
    likelyIssues: finalLikelyIssues,
    confidenceFlags: finalConfidenceFlags,
    riskFlags: finalRiskFlags,
    contraindications: finalContraindications,
    primaryStrategy: strategySelection.primaryStrategy,
    recommendationMode
  };

  const confidenceProfile = buildConfidenceProfile(partialDiagnosis);

  const recommendationPackage = buildRecommendationPackage({
    recommendationMode,
    likelyIssues: finalLikelyIssues,
    confidenceFlags: finalConfidenceFlags,
    riskFlags: finalRiskFlags,
    contraindications: finalContraindications,
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

    likelyIssues: finalLikelyIssues,
    confidenceFlags: finalConfidenceFlags,
    riskFlags: finalRiskFlags,
    contraindications: finalContraindications,

    strategyCandidates: strategySelection.strategyCandidates,
    primaryStrategy: strategySelection.primaryStrategy,
    secondaryStrategies: strategySelection.secondaryStrategies,
    delayedStrategies: strategySelection.delayedStrategies,
    blockedStrategies: strategySelection.blockedStrategies,

    recommendationMode,
    confidenceProfile,
    recommendationPackage
  };
}

export default diagnoseCase;