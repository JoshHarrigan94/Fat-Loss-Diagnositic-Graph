import { assembleKnowledgeGraph } from "../assembleGraph.js";

const graph = assembleKnowledgeGraph();

console.log("\nGraph Assembly Test");
console.log("===================");
console.log(`Nodes: ${graph.nodes.length}`);
console.log(`Edges: ${graph.edges.length}`);
console.log(`Domains: ${graph.metadata.domainCount}`);

if (!graph.nodes.length) {
  throw new Error("Graph has no nodes.");
}

if (!graph.edges.length) {
  throw new Error("Graph has no edges.");
}

if (!graph.metadata?.domainCount) {
  throw new Error("Graph metadata missing domain count.");
}

console.log("\nGraph assembly passed.");