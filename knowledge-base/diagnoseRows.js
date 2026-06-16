import { assembleKnowledgeGraph } from "./assembleGraph.js";

import {
  extractAnalyticsSignals,
  mapInputsToSignals,
  activateGraphFromSignals,
  buildReasoningRoutes,
  summariseReasoningRoutes,
  classifyDiagnosisState,
  chooseRecommendationMode,
  selectStrategiesFromDiagnosis,
  buildRecommendationPackage,
  buildConfidenceProfile,
  generateHypotheses
} from "./reasoning/index.js";

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

  const diagnosticState = classifyDiagnosisState({
    activatedNodeIds,
    activations: activationResult.activations
  });

  const {
    likelyIssues,
    confidenceFlags,
    interpretationFlags,
    riskFlags,
    contraindications,
    signalProfile
  } = diagnosticState;

  const preStrategyDiagnosis = {
    activatedNodeIds,
    likelyIssues,
    confidenceFlags,
    interpretationFlags,
    riskFlags,
    contraindications,
    signalProfile
  };

  const hypotheses = generateHypotheses(preStrategyDiagnosis);
  const primaryHypothesis = hypotheses[0] || null;

  const strategySelection = selectStrategiesFromDiagnosis({
    activatedNodeIds,
    likelyIssues,
    confidenceFlags,
    interpretationFlags,
    riskFlags,
    contraindications,
    signalProfile
  });

  const recommendationMode = chooseRecommendationMode({
    riskFlags,
    contraindications,
    signalProfile
  });

  const partialDiagnosis = {
    activatedNodeIds,
    likelyIssues,
    confidenceFlags,
    interpretationFlags,
    riskFlags,
    contraindications,
    primaryStrategy: strategySelection.primaryStrategy,
    recommendationMode,
    signalProfile
  };

  const confidenceProfile = buildConfidenceProfile(partialDiagnosis);

  const recommendationPackage = buildRecommendationPackage({
    recommendationMode,
    activatedNodeIds,
    likelyIssues,
    confidenceFlags,
    interpretationFlags,
    riskFlags,
    contraindications,
    primaryStrategy: strategySelection.primaryStrategy,
    secondaryStrategies: strategySelection.secondaryStrategies,
    delayedStrategies: strategySelection.delayedStrategies,
    blockedStrategies: strategySelection.blockedStrategies,
    avoidedStrategies: strategySelection.avoidedStrategies,
    contraindicatedStrategies: strategySelection.contraindicatedStrategies
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
    interpretationFlags,
    riskFlags,
    contraindications,
    signalProfile,

    strategyCandidates: strategySelection.strategyCandidates,
    primaryStrategy: strategySelection.primaryStrategy,
    secondaryStrategies: strategySelection.secondaryStrategies,
    delayedStrategies: strategySelection.delayedStrategies,
    blockedStrategies: strategySelection.blockedStrategies,
    avoidedStrategies: strategySelection.avoidedStrategies,
    contraindicatedStrategies: strategySelection.contraindicatedStrategies,

    recommendationMode,
    confidenceProfile,
    recommendationPackage
  };
}

export default diagnoseRows;
