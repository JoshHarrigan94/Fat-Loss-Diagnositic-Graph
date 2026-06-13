/**
 * nodeSchema.js
 *
 * Runtime validation helpers for Fat Loss Knowledge Graph nodes.
 *
 * Purpose:
 * - Keep node objects consistent as the graph scales
 * - Catch missing fields early
 * - Support graph quality checks before app integration
 */

import {
  isValidNodeType
} from "./nodeTypes.js";

export const REQUIRED_NODE_FIELDS = [
  "id",
  "label",
  "type",
  "domain",
  "description"
];

export const OPTIONAL_NODE_FIELDS = [
  "aliases",
  "populationApplicability",
  "evidenceLevel",
  "confidence",
  "coachingImplication",
  "observedBy",
  "influencedBy",
  "interventions",
  "contraindications",
  "risks",
  "metadata"
];

export function validateNode(node) {
  const errors = [];
  const warnings = [];

  REQUIRED_NODE_FIELDS.forEach((field) => {
    if (
      node[field] === undefined ||
      node[field] === null ||
      node[field] === ""
    ) {
      errors.push(`Missing required field: ${field}`);
    }
  });

  if (node.type && !isValidNodeType(node.type)) {
    errors.push(`Invalid node type: ${node.type}`);
  }

  if (node.id && !isValidId(node.id)) {
    errors.push(
      "Node id should use lowercase snake_case."
    );
  }

  if (!node.coachingImplication) {
    warnings.push(
      "Missing coachingImplication."
    );
  }

  if (!node.populationApplicability) {
    warnings.push(
      "Missing populationApplicability."
    );
  }

  if (!node.evidenceLevel) {
    warnings.push(
      "Missing evidenceLevel."
    );
  }

  return {
    valid: errors.length === 0,
    errors,
    warnings
  };
}

export function validateNodes(nodes = []) {
  const seenIds = new Set();

  const results = nodes.map((node) => {
    const result = validateNode(node);

    if (seenIds.has(node.id)) {
      result.errors.push(
        `Duplicate node id: ${node.id}`
      );
      result.valid = false;
    }

    seenIds.add(node.id);

    return {
      id: node.id,
      ...result
    };
  });

  return {
    valid: results.every((result) => result.valid),
    results,
    errors: results.flatMap((result) =>
      result.errors.map((error) => ({
        id: result.id,
        error
      }))
    ),
    warnings: results.flatMap((result) =>
      result.warnings.map((warning) => ({
        id: result.id,
        warning
      }))
    )
  };
}

function isValidId(id) {
  return /^[a-z0-9_]+$/.test(id);
}