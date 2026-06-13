/**
 * index.js
 *
 * Public entry point for the Fat Loss Knowledge Base.
 *
 * Purpose:
 * - Expose ontology schema
 * - Expose taxonomy
 * - Provide a clean import surface for future app integration
 */

export {
  NODE_TYPES,
  getNodeType,
  listNodeTypes,
  isValidNodeType
} from "./schema/nodeTypes.js";

export {
  EDGE_TYPES,
  getEdgeType,
  listEdgeTypes,
  isValidEdgeType
} from "./schema/edgeTypes.js";

export {
  POPULATIONS,
  getPopulation,
  listPopulations,
  isValidPopulation
} from "./schema/populations.js";

export {
  DOMAIN_TAXONOMY,
  getDomain,
  listDomains,
  isValidDomain
} from "./schema/domainTaxonomy.js";

export {
  validateNode,
  validateNodes
} from "./schema/nodeSchema.js";

export {
  validateEdge,
  validateEdges
} from "./schema/edgeSchema.js";

export {
  EVIDENCE_LEVELS,
  getEvidenceLevel,
  listEvidenceLevels,
  isValidEvidenceLevel
} from "./schema/evidenceLevels.js";

export {
  CONFIDENCE_BANDS,
  getConfidenceBand,
  scoreFromEvidenceLevel,
  combineConfidenceScores,
  adjustConfidenceForPopulation
} from "./schema/confidence.js";