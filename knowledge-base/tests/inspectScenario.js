import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { diagnoseCase } from "../diagnoseCase.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const scenariosDir = path.join(__dirname, "scenarios");

const scenarioFile = process.argv[2];

if (!scenarioFile) {
  console.error(
    "\nUsage: node knowledge-base/tests/inspectScenario.js <scenario-file.json>"
  );
  process.exit(1);
}

const scenarioPath = path.join(scenariosDir, scenarioFile);

if (!fs.existsSync(scenarioPath)) {
  console.error(`\nScenario not found: ${scenarioPath}`);
  process.exit(1);
}

const scenario = JSON.parse(fs.readFileSync(scenarioPath, "utf8"));
const diagnosis = diagnoseCase(scenario.case);

console.log("\nScenario Inspection");
console.log("===================");
console.log(`ID: ${scenario.id}`);
console.log(`Label: ${scenario.label}`);
console.log(`Family: ${scenario.family}`);
console.log(`Difficulty: ${scenario.difficulty}`);

console.log("\nExpected");
console.log("--------");
console.log(JSON.stringify(scenario.expected, null, 2));

console.log("\nDiagnosis Summary");
console.log("-----------------");
console.log(`Recommendation mode: ${diagnosis.recommendationMode}`);
console.log(`Primary strategy: ${diagnosis.primaryStrategy || "none"}`);
console.log(
  `Secondary strategies: ${
    diagnosis.secondaryStrategies.length
      ? diagnosis.secondaryStrategies.join(", ")
      : "none"
  }`
);

console.log("\nLikely Issues");
console.log("-------------");
console.log(diagnosis.likelyIssues);

console.log("\nConfidence Flags");
console.log("----------------");
console.log(diagnosis.confidenceFlags);

console.log("\nRisk Flags");
console.log("----------");
console.log(diagnosis.riskFlags);

console.log("\nContraindications");
console.log("-----------------");
console.log(diagnosis.contraindications);

console.log("\nStrategy Candidates");
console.log("-------------------");
console.log(JSON.stringify(diagnosis.strategyCandidates, null, 2));

console.log("\nDelayed Strategies");
console.log("------------------");
console.log(JSON.stringify(diagnosis.delayedStrategies, null, 2));

console.log("\nBlocked Strategies");
console.log("------------------");
console.log(JSON.stringify(diagnosis.blockedStrategies, null, 2));

console.log("\nActivated Node IDs");
console.log("------------------");
console.log(diagnosis.activatedNodeIds);

console.log("\nRecommendation Package");
console.log("----------------------");
console.log(JSON.stringify(diagnosis.recommendationPackage, null, 2));

console.log("\nConfidence Profile");
console.log("------------------");
console.log(JSON.stringify(diagnosis.confidenceProfile, null, 2));