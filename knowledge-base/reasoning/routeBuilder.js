function createGraphIndex(graph) {
  const nodesById = new Map();
  const outgoingEdgesBySource = new Map();

  graph.nodes.forEach(node => {
    nodesById.set(node.id, node);
  });

  graph.edges.forEach(edge => {
    if (!outgoingEdgesBySource.has(edge.source)) {
      outgoingEdgesBySource.set(edge.source, []);
    }

    outgoingEdgesBySource.get(edge.source).push(edge);
  });

  return {
    nodesById,
    outgoingEdgesBySource
  };
}

function shouldTraverseEdge(edge) {
  const blockedRelationships = new Set([
    "is_subtype_of",
    "maps_to"
  ]);

  return !blockedRelationships.has(edge.relationship);
}

function isDecisionNode(nodeId) {
  return (
    nodeId.startsWith("strategy_") ||
    nodeId.startsWith("contraindication_") ||
    nodeId.startsWith("recommendation_mode_") ||
    nodeId.startsWith("sequence_") ||
    nodeId.includes("risk") ||
    nodeId === "medical_review_needed" ||
    nodeId === "risk_adjusted_recommendations" ||
    nodeId === "intervention_strategy" ||
    nodeId === "final_recommendation_package"
  );
}

function cloneRoute(route) {
  return {
    startNodeId: route.startNodeId,
    currentNodeId: route.currentNodeId,
    path: [...route.path],
    edges: [...route.edges],
    depth: route.depth
  };
}

export function buildReasoningRoutes(graph, activationResult, options = {}) {
  const {
    maxDepth = 3,
    stopAtDecisionNodes = true,
    maxRoutesPerStartNode = 8
  } = options;

  const {
    nodesById,
    outgoingEdgesBySource
  } = createGraphIndex(graph);

  const routes = [];

  const startNodeIds = activationResult.activatedNodeIds || [];

  startNodeIds.forEach(startNodeId => {
    const queue = [
      {
        startNodeId,
        currentNodeId: startNodeId,
        path: [startNodeId],
        edges: [],
        depth: 0
      }
    ];

    const completedForStart = [];

    while (queue.length > 0 && completedForStart.length < maxRoutesPerStartNode) {
      const route = queue.shift();

      const currentNode = nodesById.get(route.currentNodeId);
      const outgoingEdges = outgoingEdgesBySource.get(route.currentNodeId) || [];

      const shouldStop =
        route.depth >= maxDepth ||
        (
          stopAtDecisionNodes &&
          route.depth > 0 &&
          isDecisionNode(route.currentNodeId)
        ) ||
        outgoingEdges.length === 0;

      if (shouldStop) {
        completedForStart.push(route);
        continue;
      }

      outgoingEdges
        .filter(shouldTraverseEdge)
        .forEach(edge => {
          if (route.path.includes(edge.target)) {
            return;
          }

          const nextRoute = cloneRoute(route);

          nextRoute.currentNodeId = edge.target;
          nextRoute.path.push(edge.target);
          nextRoute.edges.push({
            source: edge.source,
            target: edge.target,
            relationship: edge.relationship,
            strength: edge.strength,
            direction: edge.direction,
            explanation: edge.explanation,
            diagnosticUse: edge.diagnosticUse
          });
          nextRoute.depth += 1;

          queue.push(nextRoute);
        });

      if (outgoingEdges.length === 0 && currentNode) {
        completedForStart.push(route);
      }
    }

    routes.push(...completedForStart);
  });

  return routes.map(route => ({
    ...route,
    terminalNodeId: route.currentNodeId,
    terminalNodeType: nodesById.get(route.currentNodeId)?.type || null,
    terminalNodeLabel: nodesById.get(route.currentNodeId)?.label || route.currentNodeId,
    containsDecisionNode: route.path.some(isDecisionNode)
  }));
}

export function summariseReasoningRoutes(routes) {
  const terminalCounts = new Map();
  const decisionRoutes = [];

  routes.forEach(route => {
    terminalCounts.set(
      route.terminalNodeId,
      (terminalCounts.get(route.terminalNodeId) || 0) + 1
    );

    if (route.containsDecisionNode) {
      decisionRoutes.push(route);
    }
  });

  return {
    routeCount: routes.length,
    decisionRouteCount: decisionRoutes.length,
    terminalNodeCounts: [...terminalCounts.entries()]
      .map(([nodeId, count]) => ({ nodeId, count }))
      .sort((a, b) => b.count - a.count),
    decisionRoutes
  };
}

export default buildReasoningRoutes;