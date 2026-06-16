import { logKnowledgeBaseValidation } from "../validateKnowledgeBase.js";
import { assembleKnowledgeGraph } from "../assembleGraph.js";
import { validateEdges } from "../schema/edgeSchema.js";

const result = logKnowledgeBaseValidation();
const graph = assembleKnowledgeGraph();
const edgeValidation = validateEdges(graph.edges, graph.nodes);

if (!result.summary.valid) {
  console.error("\nKnowledge base validation failed.");
  process.exit(1);
}

if (!edgeValidation.valid) {
  console.error("\nGoverned edge schema validation failed.");
  process.exit(1);
}

console.log("\nKnowledge base validation passed.");
