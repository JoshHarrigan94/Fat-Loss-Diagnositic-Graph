/**
 * graphEngine.js
 *
 * Lightweight knowledge graph utility layer.
 *
 * Purpose:
 * - Load graph nodes and edges
 * - Find connected nodes
 * - Trace explanation paths
 * - Convert diagnostic results into human-readable graph routes
 *
 * This is intentionally simple for the MVP.
 * The rules engine diagnoses.
 * The graph engine explains.
 */

export function createGraph(nodes = [], edges = []) {
  const nodeMap = new Map(nodes.map((node) => [node.id, node]));

  const outgoing = new Map();
  const incoming = new Map();

  edges.forEach((edge) => {
    if (!outgoing.has(edge.source)) outgoing.set(edge.source, []);
    if (!incoming.has(edge.target)) incoming.set(edge.target, []);

    outgoing.get(edge.source).push(edge);
    incoming.get(edge.target).push(edge);
  });

  return {
    nodes,
    edges,
    nodeMap,
    outgoing,
    incoming
  };
}

export function getNode(graph, nodeId) {
  return graph.nodeMap.get(nodeId) || null;
}

export function getOutgoing(graph, nodeId) {
  return graph.outgoing.get(nodeId) || [];
}

export function getIncoming(graph, nodeId) {
  return graph.incoming.get(nodeId) || [];
}

export function getConnectedNodes(graph, nodeId) {
  const outgoing = getOutgoing(graph, nodeId).map((edge) => edge.target);
  const incoming = getIncoming(graph, nodeId).map((edge) => edge.source);

  return [...new Set([...outgoing, ...incoming])]
    .map((id) => getNode(graph, id))
    .filter(Boolean);
}

/**
 * Breadth-first path finder.
 * Finds the shortest directed path from source to target.
 */
export function findPath(graph, sourceId, targetId) {
  if (sourceId === targetId) {
    return [getNode(graph, sourceId)].filter(Boolean);
  }

  const queue = [[sourceId]];
  const visited = new Set([sourceId]);

  while (queue.length > 0) {
    const path = queue.shift();
    const current = path[path.length - 1];

    const edges = getOutgoing(graph, current);

    for (const edge of edges) {
      if (visited.has(edge.target)) continue;

      const nextPath = [...path, edge.target];

      if (edge.target === targetId) {
        return hydratePath(graph, nextPath);
      }

      visited.add(edge.target);
      queue.push(nextPath);
    }
  }

  return [];
}

export function hydratePath(graph, nodeIds) {
  return nodeIds
    .map((id) => getNode(graph, id))
    .filter(Boolean);
}

/**
 * Returns path with relationship text included.
 */
export function explainPath(graph, sourceId, targetId) {
  const nodePath = findPath(graph, sourceId, targetId);

  if (nodePath.length < 2) return [];

  const explanation = [];

  for (let i = 0; i < nodePath.length - 1; i++) {
    const source = nodePath[i];
    const target = nodePath[i + 1];

    const edge = getOutgoing(graph, source.id).find(
      (candidate) => candidate.target === target.id
    );

    explanation.push({
      source,
      target,
      relationship: edge?.relationship || "connects_to",
      explanation: edge?.explanation || `${source.label} connects to ${target.label}.`
    });
  }

  return explanation;
}

/**
 * Maps diagnosis IDs to preferred graph explanation routes.
 */
export const DIAGNOSIS_PATHWAYS = {
  masked_fat_loss: [
    ["sleep", "masked_fat_loss"],
    ["training_load", "masked_fat_loss"],
    ["carbs", "masked_fat_loss"],
    ["weight_volatility", "masked_fat_loss"]
  ],
  recovery_masking: [
    ["sleep_quality", "recovery_masking"],
    ["training_load", "recovery_masking"],
    ["recovery", "water_retention"]
  ],
  adherence_drift: [
    ["weekend_drift", "adherence_drift"],
    ["logging_accuracy", "adherence_drift"],
    ["calories_in", "adherence"]
  ],
  reduced_expenditure: [
    ["steps", "reduced_expenditure"],
    ["neet", "calories_out"],
    ["calories_out", "energy_balance"]
  ],
  true_plateau: [
    ["mismatch", "true_plateau"],
    ["energy_balance", "expected_weight_loss"]
  ]
};

/**
 * Generates graph explanations for a diagnosis.
 */
export function getDiagnosisGraphExplanation(graph, diagnosisId) {
  const pathways = DIAGNOSIS_PATHWAYS[diagnosisId] || [];

  const resolvedPaths = pathways
    .map(([source, target]) => explainPath(graph, source, target))
    .filter((path) => path.length > 0);

  return {
    diagnosisId,
    diagnosisNode: getNode(graph, diagnosisId),
    paths: resolvedPaths
  };
}

/**
 * Converts graph explanation paths into readable text.
 */
export function graphExplanationToText(graphExplanation) {
  if (!graphExplanation || !graphExplanation.paths.length) {
    return ["No graph explanation available for this diagnosis."];
  }

  return graphExplanation.paths.map((path) => {
    const labels = path.map((step) => step.source.label);
    labels.push(path[path.length - 1].target.label);

    return labels.join(" → ");
  });
}

/**
 * Produces a compact subgraph for UI rendering.
 */
export function createSubgraphForDiagnosis(graph, diagnosisId) {
  const explanation = getDiagnosisGraphExplanation(graph, diagnosisId);

  const nodeIds = new Set();
  const subEdges = [];

  explanation.paths.forEach((path) => {
    path.forEach((step) => {
      nodeIds.add(step.source.id);
      nodeIds.add(step.target.id);

      subEdges.push({
        source: step.source.id,
        target: step.target.id,
        relationship: step.relationship,
        explanation: step.explanation
      });
    });
  });

  const subNodes = [...nodeIds]
    .map((id) => getNode(graph, id))
    .filter(Boolean);

  return {
    diagnosisId,
    nodes: subNodes,
    edges: subEdges
  };
}

/**
 * Debug helper for console inspection.
 */
export function printGraphSummary(graph) {
  return {
    nodeCount: graph.nodes.length,
    edgeCount: graph.edges.length,
    nodeTypes: graph.nodes.reduce((acc, node) => {
      acc[node.type] = (acc[node.type] || 0) + 1;
      return acc;
    }, {})
  };
}