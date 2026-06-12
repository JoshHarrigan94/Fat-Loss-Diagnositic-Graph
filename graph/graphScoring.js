/**
 * graphScoring.js
 *
 * Purpose:
 * - Score graph pathways based on triggered signals
 * - Rank competing explanations
 * - Provide explainable diagnosis support
 *
 * Current state:
 * Rules diagnose
 * Graph explains
 *
 * Future state:
 * Rules + Graph score
 * → Diagnosis
 */

export function scoreGraphPathways({
  graph,
  signals = {},
  diagnoses = []
}) {
  const pathways = buildCandidatePathways({
    graph,
    diagnoses
  });

  const scored = pathways.map((pathway) => ({
    ...pathway,
    score: scorePathway(pathway, signals)
  }));

  return scored.sort(
    (a, b) => b.score - a.score
  );
}

export function getTopPathway({
  graph,
  signals,
  diagnoses
}) {
  const pathways = scoreGraphPathways({
    graph,
    signals,
    diagnoses
  });

  return pathways[0] || null;
}

function buildCandidatePathways({
  graph,
  diagnoses
}) {
  if (
    !graph ||
    !diagnoses?.length
  ) {
    return [];
  }

  const diagnosisIds = diagnoses.map(
    (diagnosis) =>
      diagnosis.diagnosisId ||
      diagnosis.id
  );

  const pathways = [];

  for (const diagnosisId of diagnosisIds) {
    const incoming =
      findUpstreamPath(
        graph,
        diagnosisId
      );

    pathways.push({
      diagnosisId,
      nodes: incoming.nodes,
      edges: incoming.edges
    });
  }

  return pathways;
}

function scorePathway(
  pathway,
  signals
) {
  let score = 0;

  const nodeIds =
    pathway.nodes.map(
      (node) =>
        node.id?.toLowerCase() || ""
    );

  const activeSignals =
    Object.entries(signals)
      .filter(
        ([, value]) => value === true
      )
      .map(
        ([key]) =>
          key.toLowerCase()
      );

  for (const signal of activeSignals) {
    const matched =
      nodeIds.some((nodeId) =>
        nodeId.includes(signal)
      );

    if (matched) {
      score += 10;
    }
  }

  score += pathway.nodes.length;
  score += pathway.edges.length * 0.5;

  return Math.round(score);
}

function findUpstreamPath(
  graph,
  diagnosisId
) {
  const nodes =
    graph.nodes || [];

  const edges =
    graph.edges || [];

  const collectedNodes =
    new Map();

  const collectedEdges = [];

  const queue = [diagnosisId];

  while (queue.length) {
    const current =
      queue.shift();

    const currentNode =
      nodes.find(
        (node) =>
          node.id === current
      );

    if (currentNode) {
      collectedNodes.set(
        currentNode.id,
        currentNode
      );
    }

    const incoming =
      edges.filter(
        (edge) =>
          edge.target === current
      );

    for (const edge of incoming) {
      collectedEdges.push(edge);

      queue.push(
        edge.source
      );
    }
  }

  return {
    nodes: Array.from(
      collectedNodes.values()
    ),
    edges: collectedEdges
  };
}

export function explainTopPathway(
  pathway
) {
  if (!pathway) {
    return "No graph pathway available.";
  }

  const labels =
    pathway.nodes
      .map(
        (node) =>
          node.label ||
          node.id
      )
      .reverse();

  return labels.join(
    " → "
  );
}