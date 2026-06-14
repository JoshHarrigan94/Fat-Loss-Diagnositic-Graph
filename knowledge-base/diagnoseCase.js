import { assembleKnowledgeGraph } from "./assembleGraph.js";
import { mapInputsToSignals } from "./reasoning/index.js";

function unique(values) {
  return [...new Set(values.filter(Boolean))];
}

function signalToActivatedNode(signal) {
  return {
    id: signal.nodeId,
    reason: signal.reason,
    confidence: signal.confidence,
    metadata: signal.metadata || {}
  };
}

export function diagnoseCase(userCase) {
  const graph = assembleKnowledgeGraph();

  const signals = mapInputsToSignals(userCase);
  const activatedNodes = signals.map(signalToActivatedNode);
  const activatedNodeIds = unique(activatedNodes.map(node => node.id));

  const likelyIssues = [];
  const confidenceFlags = [];
  const riskFlags = [];
  const contraindications = [];
  const strategies = [];

  if (activatedNodeIds.includes("population_lean")) {
    likelyIssues.push("higher_diet_fatigue_and_lean_mass_loss_risk");
  }

  if (
    activatedNodeIds.includes("weight_trend_confidence") ||
    activatedNodeIds.includes("measurement_noise_interpretation")
  ) {
    confidenceFlags.push("weight_trend_requires_interpretation");
    strategies.push("strategy_monitoring_confidence");
  }

  if (activatedNodeIds.includes("calorie_tracking_accuracy")) {
    likelyIssues.push("low_intake_confidence");
    confidenceFlags.push("calorie_tracking_confidence_low");
    strategies.push("strategy_monitoring_confidence");
  }

  if (activatedNodeIds.includes("weekend_adherence_gap")) {
    likelyIssues.push("weekend_deficit_erosion");
  }

  if (activatedNodeIds.includes("liquid_calorie_exposure")) {
    likelyIssues.push("hidden_liquid_calorie_intake");
  }

  if (activatedNodeIds.includes("sleep_quality")) {
    likelyIssues.push("poor_sleep_recovery_constraint");
    strategies.push("strategy_recovery_repair");
  }

  if (activatedNodeIds.includes("stress_load")) {
    likelyIssues.push("high_stress_load");
  }

  if (
    activatedNodeIds.includes("water_retention_from_stress") ||
    activatedNodeIds.includes("training_inflammation_shift")
  ) {
    confidenceFlags.push("scale_noise_possible");
    strategies.push("strategy_monitoring_confidence");
  }

  if (activatedNodeIds.includes("hypoglycaemia_risk")) {
    riskFlags.push("hypoglycaemia_risk");
    strategies.push("strategy_medical_review");
  }

  if (activatedNodeIds.includes("contraindication_unsupervised_fasting")) {
    contraindications.push("contraindication_unsupervised_fasting");
  }

  if (activatedNodeIds.includes("contraindication_carbohydrate_restriction")) {
    contraindications.push("contraindication_carbohydrate_restriction");
  }

  if (activatedNodeIds.includes("diet_fatigue_risk")) {
    likelyIssues.push("diet_fatigue_risk");
    strategies.push("strategy_diet_break_or_maintenance");
  }

  if (activatedNodeIds.includes("performance_decline_during_deficit")) {
    likelyIssues.push("performance_decline_during_deficit");
  }

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

  const uniqueStrategies = unique(strategies);

  const primaryStrategy =
    uniqueStrategies.includes("strategy_medical_review")
      ? "strategy_medical_review"
      : uniqueStrategies.includes("strategy_diet_break_or_maintenance")
        ? "strategy_diet_break_or_maintenance"
        : uniqueStrategies.includes("strategy_recovery_repair")
          ? "strategy_recovery_repair"
          : uniqueStrategies.includes("strategy_monitoring_confidence")
            ? "strategy_monitoring_confidence"
            : null;

  const secondaryStrategies = uniqueStrategies.filter(
    strategy => strategy !== primaryStrategy
  );

  const missingActivatedNodes = activatedNodeIds.filter(
    nodeId => !graph.nodes.some(node => node.id === nodeId)
  );

  return {
    caseId: userCase.id || null,
    activatedNodes,
    activatedNodeIds,
    missingActivatedNodes,
    likelyIssues: unique(likelyIssues),
    confidenceFlags: unique(confidenceFlags),
    riskFlags: unique(riskFlags),
    contraindications: unique(contraindications),
    primaryStrategy,
    secondaryStrategies,
    delayedStrategies: [],
    recommendationMode
  };
}

export default diagnoseCase;