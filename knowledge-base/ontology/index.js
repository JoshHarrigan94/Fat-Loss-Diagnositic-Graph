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