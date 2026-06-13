/**
 * validateKnowledgeBase.js
 *
 * Validation runner for the standalone Fat Loss Knowledge Base.
 *
 * Purpose:
 * - Validate domain nodes
 * - Validate domain edges
 * - Catch missing fields, broken references and weak metadata
 */

import {
  validateNodes,
  validateEdges
} from "./schema/index.js";

import {
  WATER_SCALE_NOISE_DOMAIN
} from "./domains/water-scale-noise/index.js";

export function validateKnowledgeBase() {
  const domains = [
    WATER_SCALE_NOISE_DOMAIN
  ];

  const nodes = domains.flatMap((domain) => domain.nodes);
  const edges = domains.flatMap((domain) => domain.edges);

  const nodeValidation = validateNodes(nodes);
  const edgeValidation = validateEdges(edges, nodes);

  return {
    valid:
      nodeValidation.valid &&
      edgeValidation.valid,
    nodeCount: nodes.length,
    edgeCount: edges.length,
    nodeValidation,
    edgeValidation,
    summary: buildValidationSummary({
      nodeValidation,
      edgeValidation,
      nodes,
      edges
    })
  };
}

function buildValidationSummary({
  nodeValidation,
  edgeValidation,
  nodes,
  edges
}) {
  return {
    nodes: nodes.length,
    edges: edges.length,
    nodeErrors: nodeValidation.errors.length,
    nodeWarnings: nodeValidation.warnings.length,
    edgeErrors: edgeValidation.errors.length,
    edgeWarnings: edgeValidation.warnings.length
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