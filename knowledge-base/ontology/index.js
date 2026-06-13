/**
 * index.js
 *
 * Public entry point for the Fat Loss Knowledge Graph ontology.
 *
 * Purpose:
 * - Expose master ontology map
 * - Expose relationship model
 * - Expose expansion plan
 */

export {
  MASTER_ONTOLOGY_MAP,
  listOntologySections,
  getOntologySection,
  estimateTotalNodeRange
} from "./masterOntologyMap.js";

export {
  RELATIONSHIP_MODEL,
  listRelationshipRules,
  getAllowedRelationships,
  isAllowedRelationship
} from "./relationshipModel.js";

export {
  GRAPH_EXPANSION_PLAN,
  listExpansionPhases,
  getExpansionPhase
} from "./graphExpansionPlan.js";

export {
  REASONING_PATHWAYS,
  listReasoningPathways,
  getReasoningPathway
} from "./reasoningPathways.js";

export {
  DIAGNOSTIC_ENGINE_MAP,
  getDiagnosticMapItem,
  listDiagnosticMapItems
} from "./diagnosticEngineMap.js";

export {
  selectReasoningPathway,
  selectReasoningPathwayByProblem
} from "./pathwaySelector.js";

export {
  buildDiagnosticRoute
} from "./diagnosticRouteBuilder.js";
import { sharedDecisionNodes } from "./sharedDecisionNodes.js";

export const ontology = {
  sharedDecisionNodes
};
