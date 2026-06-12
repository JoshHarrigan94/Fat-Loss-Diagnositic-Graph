/**
 * pathwayExplorer.js
 *
 * Purpose:
 * - Explore graph routes around diagnoses
 * - Find upstream causes
 * - Find downstream effects
 * - Build readable explanation chains
 *
 * This makes the graph feel more like a reasoning layer
 * instead of only a static visualisation layer.
 */

export function exploreDiagnosisPathways(graph, diagnosisId, options = {}) {
  const config = {
    maxDepth: options.maxDepth || 4
  };

  const upstream = findUpstream(graph, diagnosisId, config.maxDepth);
  const downstream = findDownstream(graph, diagnosisId, config.maxDepth);

  return {
    diagnosisId,
    upstream,
    downstream,
    explanationChains: buildExplanationChains(upstream)
  };
}

export function findUpstream(graph, targetId, maxDepth = 4) {
  const paths = [];

  function walk(currentId, path, depth) {
    if (depth > maxDepth) return;

    const incoming = graph.edges.filter((edge) => edge.target === currentId);

    if (!incoming.length) {
      paths.push(path);
      return;
    }

    for (const edge of incoming) {
      const sourceNode = getNode(graph, edge.source);
      const targetNode = getNode(graph, edge.target);

      if (!sourceNode || !targetNode) continue;

      walk(
        edge.source,
        [
          {
            source: sourceNode,
            target: targetNode,
            relationship: edge.relationship,
            explanation: edge.explanation
          },
          ...path
        ],
        depth + 1
      );
    }
  }

  walk(targetId, [], 0);

  return paths;
}

export function findDownstream(graph, sourceId, maxDepth = 4) {
  const paths = [];

  function walk(currentId, path, depth) {
    if (depth > maxDepth) return;

    const outgoing = graph.edges.filter((edge) => edge.source === currentId);

    if (!outgoing.length) {
      paths.push(path);
      return;
    }

    for (const edge of outgoing) {
      const sourceNode = getNode(graph, edge.source);
      const targetNode = getNode(graph, edge.target);

      if (!sourceNode || !targetNode) continue;

      walk(
        edge.target,
        [
          ...path,
          {
            source: sourceNode,
            target: targetNode,
            relationship: edge.relationship,
            explanation: edge.explanation
          }
        ],
        depth + 1
      );
    }
  }

  walk(sourceId, [], 0);

  return paths;
}

export function buildExplanationChains(paths = []) {
  return paths
    .filter((path) => path.length)
    .map((path) => {
      const labels = path.map((step) => step.source.label);
      labels.push(path[path.length - 1].target.label);

      return {
        chain: labels.join(" → "),
        steps: path.map((step) => ({
          from: step.source.label,
          to: step.target.label,
          relationship: step.relationship,
          explanation: step.explanation
        }))
      };
    });
}

export function rankPathwaysBySignals(pathways = [], signals = {}) {
  return pathways
    .map((pathway) => ({
      ...pathway,
      score: scorePathwayAgainstSignals(pathway, signals)
    }))
    .sort((a, b) => b.score - a.score);
}

function scorePathwayAgainstSignals(pathway, signals) {
  const activeSignals = Object.entries(signals)
    .filter(([, value]) => value === true)
    .map(([key]) => key.toLowerCase());

  const pathwayText = JSON.stringify(pathway).toLowerCase();

  let score = 0;

  activeSignals.forEach((signal) => {
    if (pathwayText.includes(signal)) score += 10;
  });

  score += pathway.steps?.length || 0;

  return score;
}

function getNode(graph, nodeId) {
  return graph.nodes.find((node) => node.id === nodeId);
}