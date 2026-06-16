/**
 * edgeSchema.js
 *
 * Runtime validation helpers for Fat Loss Knowledge Graph edges.
 *
 * Purpose:
 * - Keep edge objects consistent as the graph scales
 * - Catch missing node references
 * - Keep relationship semantics clean
 */

import {
  isValidEdgeType
} from "./edgeTypes.js";

export const REQUIRED_EDGE_FIELDS = [
  "source",
  "target",
  "relationship",
  "strength",
  "direction",
  "explanation",
  "diagnosticUse"
];

export const OPTIONAL_EDGE_FIELDS = [
  "domain",
  "evidenceLevel",
  "populationApplicability",
  "metadata"
];

export function validateEdge(edge, nodeIds = new Set()) {
  const errors = [];
  const warnings = [];

  REQUIRED_EDGE_FIELDS.forEach((field) => {
    if (
      edge[field] === undefined ||
      edge[field] === null ||
      edge[field] === ""
    ) {
      errors.push(`Missing required field: ${field}`);
    }
  });

  if (
    edge.relationship &&
    !isValidEdgeType(edge.relationship)
  ) {
    warnings.push(
      `Non-canonical edge relationship preserved for compatibility: ${edge.relationship}`
    );
  }

  if (
    edge.source &&
    nodeIds.size &&
    !nodeIds.has(edge.source)
  ) {
    errors.push(
      `Missing source node reference: ${edge.source}`
    );
  }

  if (
    edge.target &&
    nodeIds.size &&
    !nodeIds.has(edge.target)
  ) {
    errors.push(
      `Missing target node reference: ${edge.target}`
    );
  }

  return {
    valid: errors.length === 0,
    errors,
    warnings
  };
}

export function validateEdges(edges = [], nodes = []) {
  const nodeIds = new Set(
    nodes.map((node) => node.id)
  );

  const results = edges.map((edge, index) => {
    const result = validateEdge(edge, nodeIds);

    return {
      index,
      source: edge.source,
      target: edge.target,
      ...result
    };
  });

  return {
    valid: results.every((result) => result.valid),
    results,
    errors: results.flatMap((result) =>
      result.errors.map((error) => ({
        index: result.index,
        source: result.source,
        target: result.target,
        error
      }))
    ),
    warnings: results.flatMap((result) =>
      result.warnings.map((warning) => ({
        index: result.index,
        source: result.source,
        target: result.target,
        warning
      }))
    )
  };
}
