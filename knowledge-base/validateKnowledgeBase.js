/**
 * validateKnowledgeBase.js
 *
 * Validation runner for the standalone Fat Loss Knowledge Base.
 */

import {
  validateNodes,
  validateEdges
} from "./schema/index.js";

import {
  listKnowledgeDomains,
  getAllKnowledgeNodes,
  getAllKnowledgeEdges
} from "./domains/index.js";

export function validateKnowledgeBase() {
  const domains = listKnowledgeDomains();
  const nodes = getAllKnowledgeNodes();
  const edges = getAllKnowledgeEdges();

  const nodeValidation = validateNodes(nodes);
  const edgeValidation = validateEdges(edges, nodes);

  return {
    valid: nodeValidation.valid && edgeValidation.valid,
    domainCount: domains.length,
    nodeCount: nodes.length,
    edgeCount: edges.length,
    nodeValidation,
    edgeValidation,
    summary: {
      domains: domains.length,
      nodes: nodes.length,
      edges: edges.length,
      nodeErrors: nodeValidation.errors.length,
      nodeWarnings: nodeValidation.warnings.length,
      edgeErrors: edgeValidation.errors.length,
      edgeWarnings: edgeValidation.warnings.length
    }
  };
}

export function logKnowledgeBaseValidation() {
  const result = validateKnowledgeBase();

  console.log("Knowledge Base Validation:", result.summary);

  if (!result.valid) {
    console.warn("Knowledge base validation failed.", result);
  }

  return result;
}