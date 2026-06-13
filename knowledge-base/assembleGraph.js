/**
 * assembleGraph.js
 *
 * Builds a unified graph from all registered knowledge domains.
 */

import {
  KNOWLEDGE_DOMAINS
} from "./domains/index.js";

import {
  sharedDecisionNodes
} from "./ontology/sharedDecisionNodes.js";

export function assembleKnowledgeGraph() {

  const domainNodes =
    KNOWLEDGE_DOMAINS.flatMap(
      domain => domain.nodes || []
    );

  const domainEdges =
    KNOWLEDGE_DOMAINS.flatMap(
      domain => domain.edges || []
    );

  return {
    nodes: [
      ...sharedDecisionNodes,
      ...domainNodes
    ],

    edges: domainEdges,

    metadata: {
      domainCount: KNOWLEDGE_DOMAINS.length,
      nodeCount:
        sharedDecisionNodes.length +
        domainNodes.length,
      edgeCount:
        domainEdges.length
    }
  };
}

function dedupeNodes(nodes = []) {
  const map = new Map();

  nodes.forEach((node) => {
    if (!map.has(node.id)) {
      map.set(node.id, node);
    }
  });

  return Array.from(map.values());
}