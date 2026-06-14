function uniqueById(items) {
  const map = new Map();

  items.forEach(item => {
    if (!item?.id) return;

    if (!map.has(item.id)) {
      map.set(item.id, item);
      return;
    }

    const existing = map.get(item.id);

    map.set(item.id, {
      ...existing,
      reasons: [
        ...(existing.reasons || []),
        ...(item.reasons || [])
      ],
      activatedBy: [
        ...(existing.activatedBy || []),
        ...(item.activatedBy || [])
      ]
    });
  });

  return [...map.values()];
}

function confidenceRank(confidence) {
  const ranks = {
    low: 1,
    moderate: 2,
    high: 3
  };

  return ranks[confidence] || 0;
}

function mergeConfidence(a, b) {
  return confidenceRank(b) > confidenceRank(a) ? b : a;
}

function createGraphIndex(graph) {
  const nodesById = new Map();
  const outgoingEdgesBySource = new Map();
  const incomingEdgesByTarget = new Map();

  graph.nodes.forEach(node => {
    nodesById.set(node.id, node);
  });

  graph.edges.forEach(edge => {
    if (!outgoingEdgesBySource.has(edge.source)) {
      outgoingEdgesBySource.set(edge.source, []);
    }

    if (!incomingEdgesByTarget.has(edge.target)) {
      incomingEdgesByTarget.set(edge.target, []);
    }

    outgoingEdgesBySource.get(edge.source).push(edge);
    incomingEdgesByTarget.get(edge.target).push(edge);
  });

  return {
    nodesById,
    outgoingEdgesBySource,
    incomingEdgesByTarget
  };
}

function shouldExpandEdge(edge) {
  const blockedRelationships = new Set([
    "is_subtype_of",
    "maps_to"
  ]);

  return !blockedRelationships.has(edge.relationship);
}

function inferActivationConfidence(sourceConfidence, edgeStrength) {
  if (sourceConfidence === "high" && edgeStrength === "high") {
    return "high";
  }

  if (sourceConfidence === "low") {
    return "low";
  }

  return "moderate";
}

function activateDirectSignal(signal, nodesById) {
  const node = nodesById.get(signal.nodeId);

  return {
    id: signal.nodeId,
    node,
    existsInGraph: Boolean(node),
    activationType: "direct",
    confidence: signal.confidence || "moderate",
    reasons: [signal.reason || "Direct input signal activated this node."],
    activatedBy: ["input"],
    metadata: signal.metadata || {}
  };
}

function activateFromEdge(sourceActivation, edge, nodesById) {
  const targetNode = nodesById.get(edge.target);

  return {
    id: edge.target,
    node: targetNode,
    existsInGraph: Boolean(targetNode),
    activationType: "inferred",
    confidence: inferActivationConfidence(
      sourceActivation.confidence,
      edge.strength
    ),
    reasons: [
      edge.explanation ||
        `${sourceActivation.id} ${edge.relationship} ${edge.target}`
    ],
    activatedBy: [sourceActivation.id],
    viaEdge: {
      source: edge.source,
      target: edge.target,
      relationship: edge.relationship,
      strength: edge.strength,
      direction: edge.direction
    }
  };
}

export function activateGraphFromSignals(graph, signals, options = {}) {
  const {
    expandOneHop = true,
    includeIncomingContext = false
  } = options;

  const {
    nodesById,
    outgoingEdgesBySource,
    incomingEdgesByTarget
  } = createGraphIndex(graph);

  const directActivations = signals.map(signal =>
    activateDirectSignal(signal, nodesById)
  );

  const inferredActivations = [];

  if (expandOneHop) {
    directActivations.forEach(activation => {
      const outgoingEdges =
        outgoingEdgesBySource.get(activation.id) || [];

      outgoingEdges
        .filter(shouldExpandEdge)
        .forEach(edge => {
          inferredActivations.push(
            activateFromEdge(activation, edge, nodesById)
          );
        });
    });
  }

  if (includeIncomingContext) {
    directActivations.forEach(activation => {
      const incomingEdges =
        incomingEdgesByTarget.get(activation.id) || [];

      incomingEdges
        .filter(shouldExpandEdge)
        .forEach(edge => {
          const sourceNode = nodesById.get(edge.source);

          inferredActivations.push({
            id: edge.source,
            node: sourceNode,
            existsInGraph: Boolean(sourceNode),
            activationType: "context",
            confidence: "low",
            reasons: [
              `Context node linked to ${activation.id}: ${
                edge.explanation || edge.relationship
              }`
            ],
            activatedBy: [activation.id],
            viaEdge: {
              source: edge.source,
              target: edge.target,
              relationship: edge.relationship,
              strength: edge.strength,
              direction: edge.direction
            }
          });
        });
    });
  }

  const merged = uniqueById([
    ...directActivations,
    ...inferredActivations
  ]);

  const activatedNodeIds = merged.map(item => item.id);

  const missingActivatedNodes = merged
    .filter(item => !item.existsInGraph)
    .map(item => item.id);

  return {
    activations: merged.map(item => ({
      ...item,
      confidence: item.confidence || "moderate"
    })),
    directActivations,
    inferredActivations,
    activatedNodeIds,
    missingActivatedNodes
  };
}

export default activateGraphFromSignals;