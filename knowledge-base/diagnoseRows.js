import { assembleKnowledgeGraph } from "./assembleGraph.js";

import {
  extractAnalyticsSignals,
  mapInputsToSignals,
  activateGraphFromSignals,
  buildReasoningRoutes,
  summariseReasoningRoutes,
  selectStrategiesFromDiagnosis,
  buildRecommendationPackage,
  buildConfidenceProfile,
  generateHypotheses
} from "./reasoning/index.js";

function unique(values) {
  return [...new Set(values.filter(Boolean))];
}

function signalToActivatedNode(item) {
  return {
    id: item.id,
    reason: item.reasons.join(" "),
    confidence: item.confidence,
    activationType: item.activationType,
    activatedBy: item.activatedBy,
    viaEdge: item.viaEdge || null
  };
}

function classifyIssues(activatedNodeIds) {
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
    activatedNodeIds.includes("training_inflammation_shift") ||
    activatedNodeIds.includes("scale_weight_variability")
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

  if (
    activatedNodeIds.includes("population_older_adult") ||
    activatedNodeIds.includes("sarcopenia_risk") ||
    activatedNodeIds.includes("priority_functional_independence")
  ) {
    likelyIssues.push("lean_mass_retention_priority");
  }

  return {
    likelyIssues: unique(likelyIssues),
    confidenceFlags: unique(confidenceFlags),
    riskFlags: unique(riskFlags),
    contraindications: unique(contraindications)
  };
}

function chooseRecommendationMode({
  likelyIssues,
  confidenceFlags,
  riskFlags,
  contraindications
}) {
  if (riskFlags.length || contraindications.length) {
    return "recommendation_mode_referral_first";
  }

  if (
    likelyIssues.includes("insufficient_weekly_energy_deficit") &&
    confidenceFlags.length === 0
  ) {
    return "recommendation_mode_standard";
  }

  if (confidenceFlags.length) {
    return "recommendation_mode_monitor_only";
  }

  if (
    likelyIssues.includes("poor_sleep_recovery_constraint") ||
    likelyIssues.includes("diet_fatigue_risk") ||
    likelyIssues.includes("lean_mass_retention_priority")
  ) {
    return "recommendation_mode_conservative";
  }

  return "recommendation_mode_standard";
}

export function diagnoseRows(rows = [], options = {}) {
  const graph = assembleKnowledgeGraph();

  const analyticsResult = extractAnalyticsSignals(rows, options);

  const manualSignals = mapInputsToSignals({
    inputs: analyticsResult.mappedInputs
  });

  const signals = [
    ...analyticsResult.signals,
    ...manualSignals
  ];

  const activationResult = activateGraphFromSignals(graph, signals, {
    expandOneHop: true,
    includeIncomingContext: false
  });

  const activatedNodes = activationResult.activations.map(signalToActivatedNode);
  const activatedNodeIds = activationResult.activatedNodeIds;

  const reasoningRoutes = buildReasoningRoutes(graph, activationResult, {
    maxDepth: 3,
    stopAtDecisionNodes: true,
    maxRoutesPerStartNode: 8
  });

  const routeSummary = summariseReasoningRoutes(reasoningRoutes);

  const {
    likelyIssues,
    confidenceFlags,
    riskFlags,
    contraindications
  } = classifyIssues(activatedNodeIds);

  const preStrategyDiagnosis = {
    activatedNodeIds,
    likelyIssues,
    confidenceFlags,
    riskFlags,
    contraindications
  };

  const hypotheses = generateHypotheses(preStrategyDiagnosis);
  const primaryHypothesis = hypotheses[0] || null;

  const strategySelection = selectStrategiesFromDiagnosis({
    activatedNodeIds,
    likelyIssues,
    confidenceFlags,
    riskFlags,
    contraindications
  });

  const recommendationMode = chooseRecommendationMode({
    likelyIssues,
    confidenceFlags,
    riskFlags,
    contraindications
  });

  const partialDiagnosis = {
    activatedNodeIds,
    likelyIssues,
    confidenceFlags,
    riskFlags,
    contraindications,
    primaryStrategy: strategySelection.primaryStrategy,
    recommendationMode
  };

  const confidenceProfile = buildConfidenceProfile(partialDiagnosis);

  const recommendationPackage = buildRecommendationPackage({
  recommendationMode,
  activatedNodeIds,
  likelyIssues,
  confidenceFlags,
  riskFlags,
  contraindications,
  primaryStrategy: strategySelection.primaryStrategy,
  secondaryStrategies: strategySelection.secondaryStrategies,
  delayedStrategies: strategySelection.delayedStrategies,
  blockedStrategies: strategySelection.blockedStrategies
});

  return {
    source: "rows",

    rowCount: rows.length,

    mappedInputs: analyticsResult.mappedInputs,
    analytics: analyticsResult.analytics,

    signals,

    activatedNodes,
    activatedNodeIds,
    missingActivatedNodes: activationResult.missingActivatedNodes,

    reasoningRoutes,
    routeSummary,

    hypotheses,
    primaryHypothesis,

    likelyIssues,
    confidenceFlags,
    riskFlags,
    contraindications,

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

export default diagnoseRows;