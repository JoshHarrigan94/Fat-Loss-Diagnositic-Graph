/**
 * assembleGraph.js
 *
 * Builds a unified graph from all registered knowledge domains.
 */

import {
  getAllKnowledgeNodes,
  getAllKnowledgeEdges
} from "./domains/index.js";

export function assembleKnowledgeGraph() {
  const nodes = dedupeNodes(getAllKnowledgeNodes());
  const edges = getAllKnowledgeEdges();

  return {
    id: "fat_loss_knowledge_graph",
    label: "Fat Loss Knowledge Graph",
    version: "1.0.0",
    nodeCount: nodes.length,
    edgeCount: edges.length,
    nodes,
    edges
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