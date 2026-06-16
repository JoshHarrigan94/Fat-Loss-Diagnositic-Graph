import { assembleKnowledgeGraph } from "./assembleGraph.js";

import {
  mapInputsToSignals,
  extractLegacyKnowledgeSignals,
  extractLegacyRuleSignals,
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

export function diagnoseCase(userCase) {
  const graph = assembleKnowledgeGraph();

  const inputs = userCase.inputs || userCase;

  // Legacy adapters remain as isolated input hints during migration.
  // The knowledge-base ontology and graph activation output remain the
  // primary diagnostic source of truth used below for classification.
  const signals = [
    ...mapInputsToSignals(userCase),
    ...extractLegacyKnowledgeSignals(inputs),
    ...extractLegacyRuleSignals(inputs)
  ];

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

  const diagnosticState = classifyDiagnosisState({
    activatedNodeIds,
    activations: activationResult.activations
  });

  const {
    likelyIssues: finalLikelyIssues,
    confidenceFlags: finalConfidenceFlags,
    interpretationFlags,
    riskFlags: finalRiskFlags,
    contraindications: finalContraindications,
    signalProfile
  } = diagnosticState;

  const preStrategyDiagnosis = {
    activatedNodeIds,
    likelyIssues: finalLikelyIssues,
    confidenceFlags: finalConfidenceFlags,
    interpretationFlags,
    riskFlags: finalRiskFlags,
    contraindications: finalContraindications,
    signalProfile
  };

  const hypotheses = generateHypotheses(preStrategyDiagnosis);
  const primaryHypothesis = hypotheses[0] || null;

  const strategySelection = selectStrategiesFromDiagnosis({
    activatedNodeIds,
    likelyIssues: finalLikelyIssues,
    confidenceFlags: finalConfidenceFlags,
    interpretationFlags,
    riskFlags: finalRiskFlags,
    contraindications: finalContraindications,
    signalProfile
  });

  const recommendationMode = chooseRecommendationMode({
    riskFlags: finalRiskFlags,
    contraindications: finalContraindications,
    signalProfile
  });

  const partialDiagnosis = {
    activatedNodeIds,
    likelyIssues: finalLikelyIssues,
    confidenceFlags: finalConfidenceFlags,
    interpretationFlags,
    riskFlags: finalRiskFlags,
    contraindications: finalContraindications,
    primaryStrategy: strategySelection.primaryStrategy,
    recommendationMode,
    signalProfile
  };

  const confidenceProfile = buildConfidenceProfile(partialDiagnosis);

  const recommendationPackage = buildRecommendationPackage({
  recommendationMode,
  activatedNodeIds,
    likelyIssues: finalLikelyIssues,
    confidenceFlags: finalConfidenceFlags,
    interpretationFlags,
    riskFlags: finalRiskFlags,
    contraindications: finalContraindications,
    primaryStrategy: strategySelection.primaryStrategy,
    secondaryStrategies: strategySelection.secondaryStrategies,
    delayedStrategies: strategySelection.delayedStrategies,
    blockedStrategies: strategySelection.blockedStrategies,
    avoidedStrategies: strategySelection.avoidedStrategies,
    contraindicatedStrategies: strategySelection.contraindicatedStrategies
  });

  return {
    caseId: userCase.id || null,

    signals,

    activatedNodes,
    activatedNodeIds,
    missingActivatedNodes: activationResult.missingActivatedNodes,

    reasoningRoutes,
    routeSummary,

    hypotheses,
    primaryHypothesis,

    likelyIssues: finalLikelyIssues,
    confidenceFlags: finalConfidenceFlags,
    interpretationFlags,
    riskFlags: finalRiskFlags,
    contraindications: finalContraindications,
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

export default diagnoseCase;
