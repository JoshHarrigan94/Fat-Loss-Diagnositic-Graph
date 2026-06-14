import { logKnowledgeBaseValidation } from "../validateKnowledgeBase.js";

const result = logKnowledgeBaseValidation();

if (!result.summary.valid) {
  console.error("\nKnowledge base validation failed.");
  process.exit(1);
}

console.log("\nKnowledge base validation passed.");