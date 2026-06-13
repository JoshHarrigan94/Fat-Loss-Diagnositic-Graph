import { KNOWLEDGE_DOMAINS } from "./domains/index.js";
import { sharedDecisionNodes } from "./ontology/sharedDecisionNodes.js";

function asArray(value) {
  return Array.isArray(value) ? value : [];
}

function createIssue(level, code, message, context = {}) {
  return { level, code, message, context };
}

export function validateKnowledgeBase() {
  const errors = [];
  const warnings = [];

  const domains = asArray(KNOWLEDGE_DOMAINS);
  const sharedNodes = asArray(sharedDecisionNodes);

  const domainNodes = domains.flatMap(domain =>
    asArray(domain?.nodes).map(node => ({
      ...node,
      __domainId: domain.id || "unknown-domain"
    }))
  );

  const allNodes = [
    ...sharedNodes.map(node => ({
      ...node,
      __domainId: "shared-decision-nodes"
    })),
    ...domainNodes
  ];

  const allEdges = domains.flatMap(domain =>
    asArray(domain?.edges).map(edge => ({
      ...edge,
      __domainId: domain.id || "unknown-domain"
    }))
  );

  const nodeIdMap = new Map();
  const incomingCounts = new Map();
  const outgoingCounts = new Map();

  domains.forEach((domain, index) => {
    if (!domain?.id) {
      errors.push(createIssue("error", "DOMAIN_MISSING_ID", "A domain is missing an id.", { index }));
    }

    if (!domain?.label) {
      warnings.push(createIssue("warning", "DOMAIN_MISSING_LABEL", `Domain ${domain?.id || index} is missing a label.`));
    }

    if (!Array.isArray(domain?.nodes)) {
      errors.push(createIssue("error", "DOMAIN_NODES_NOT_ARRAY", `Domain ${domain?.id || index} nodes must be an array.`));
    }

    if (!Array.isArray(domain?.edges)) {
      errors.push(createIssue("error", "DOMAIN_EDGES_NOT_ARRAY", `Domain ${domain?.id || index} edges must be an array.`));
    }
  });

  allNodes.forEach((node, index) => {
    if (!node?.id) {
      errors.push(createIssue("error", "NODE_MISSING_ID", "A node is missing an id.", { index, node }));
      return;
    }

    if (nodeIdMap.has(node.id)) {
      errors.push(
        createIssue("error", "DUPLICATE_NODE_ID", `Duplicate node id found: ${node.id}`, {
          nodeId: node.id,
          firstDomainId: nodeIdMap.get(node.id).__domainId,
          duplicateDomainId: node.__domainId
        })
      );
    } else {
      nodeIdMap.set(node.id, node);
      incomingCounts.set(node.id, 0);
      outgoingCounts.set(node.id, 0);
    }

    if (!node.label) {
      warnings.push(createIssue("warning", "NODE_MISSING_LABEL", `Node ${node.id} is missing a label.`));
    }
  });

  const edgeIdMap = new Map();

  allEdges.forEach((edge, index) => {
    const context = {
      edgeIndex: index,
      domainId: edge.__domainId,
      source: edge.source,
      target: edge.target,
      relationship: edge.relationship
    };

    if (edge.id) {
      if (edgeIdMap.has(edge.id)) {
        errors.push(createIssue("error", "DUPLICATE_EDGE_ID", `Duplicate edge id found: ${edge.id}`, context));
      } else {
        edgeIdMap.set(edge.id, edge);
      }
    }

    if (!edge.source) {
      errors.push(createIssue("error", "EDGE_MISSING_SOURCE", "An edge is missing a source.", context));
    }

    if (!edge.target) {
      errors.push(createIssue("error", "EDGE_MISSING_TARGET", "An edge is missing a target.", context));
    }

    if (edge.source && !nodeIdMap.has(edge.source)) {
      errors.push(createIssue("error", "BROKEN_EDGE_SOURCE", `Broken edge source: ${edge.source}`, context));
    }

    if (edge.target && !nodeIdMap.has(edge.target)) {
      errors.push(createIssue("error", "BROKEN_EDGE_TARGET", `Broken edge target: ${edge.target}`, context));
    }

    if (edge.source && nodeIdMap.has(edge.source)) {
      outgoingCounts.set(edge.source, (outgoingCounts.get(edge.source) || 0) + 1);
    }

    if (edge.target && nodeIdMap.has(edge.target)) {
      incomingCounts.set(edge.target, (incomingCounts.get(edge.target) || 0) + 1);
    }

    if (!edge.relationship) {
      warnings.push(createIssue("warning", "EDGE_MISSING_RELATIONSHIP", "An edge is missing a relationship.", context));
    }

    if (!edge.explanation) {
      warnings.push(createIssue("warning", "EDGE_MISSING_EXPLANATION", "An edge is missing an explanation.", context));
    }

    if (!edge.diagnosticUse) {
      warnings.push(createIssue("warning", "EDGE_MISSING_DIAGNOSTIC_USE", "An edge is missing diagnosticUse.", context));
    }

    if (!edge.strength) {
      warnings.push(createIssue("warning", "EDGE_MISSING_STRENGTH", "An edge is missing strength.", context));
    }

    if (!edge.direction) {
      warnings.push(createIssue("warning", "EDGE_MISSING_DIRECTION", "An edge is missing direction.", context));
    }
  });

  allNodes.forEach(node => {
    if (!node?.id) return;

    const incoming = incomingCounts.get(node.id) || 0;
    const outgoing = outgoingCounts.get(node.id) || 0;

    if (incoming === 0 && outgoing === 0) {
      warnings.push(
        createIssue("warning", "ORPHAN_NODE", `Node ${node.id} has no incoming or outgoing edges.`, {
          nodeId: node.id,
          domainId: node.__domainId
        })
      );
    }
  });

  return {
    summary: {
      valid: errors.length === 0,
      domainCount: domains.length,
      sharedNodeCount: sharedNodes.length,
      domainNodeCount: domainNodes.length,
      totalNodeCount: allNodes.length,
      edgeCount: allEdges.length,
      errorCount: errors.length,
      warningCount: warnings.length
    },
    errors,
    warnings
  };
}

export function logKnowledgeBaseValidation() {
  const result = validateKnowledgeBase();
  const { summary, errors, warnings } = result;

  console.log("\nFat Loss Knowledge Graph Validation");
  console.log("===================================");
  console.log(`Valid: ${summary.valid ? "YES" : "NO"}`);
  console.log(`Domains: ${summary.domainCount}`);
  console.log(`Shared nodes: ${summary.sharedNodeCount}`);
  console.log(`Domain nodes: ${summary.domainNodeCount}`);
  console.log(`Total nodes: ${summary.totalNodeCount}`);
  console.log(`Edges: ${summary.edgeCount}`);
  console.log(`Errors: ${summary.errorCount}`);
  console.log(`Warnings: ${summary.warningCount}`);

  if (errors.length) {
    console.log("\nErrors");
    errors.forEach((issue, i) => {
      console.log(`${i + 1}. [${issue.code}] ${issue.message}`);
      console.log(issue.context);
    });
  }

  if (warnings.length) {
    console.log("\nWarnings");
    warnings.forEach((issue, i) => {
      console.log(`${i + 1}. [${issue.code}] ${issue.message}`);
      console.log(issue.context);
    });
  }

  return result;
}

export default validateKnowledgeBase;