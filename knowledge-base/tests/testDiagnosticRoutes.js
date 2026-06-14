import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { diagnoseCase } from "../diagnoseCase.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const fixturesDir = path.join(__dirname, "fixtures");

const fixtureFiles = [
  "stalled-weight-good-adherence.json",
  "poor-sleep-water-retention.json",
  "low-tracking-confidence.json",
  "type2-diabetes-hypoglycaemia-risk.json",
  "lean-bodybuilder-diet-fatigue.json"
];

function loadFixture(filename) {
  const filePath = path.join(fixturesDir, filename);
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function testFixture(fixture) {
  const diagnosis = diagnoseCase(fixture);

  const missingExpectedNodes = fixture.expectedRouteIncludes.filter(
    nodeId => !diagnosis.activatedNodeIds.includes(nodeId)
  );

  const passed =
    missingExpectedNodes.length === 0 &&
    diagnosis.missingActivatedNodes.length === 0;

  return {
    id: fixture.id,
    label: fixture.label,
    passed,
    missingExpectedNodes,
    missingActivatedGraphNodes: diagnosis.missingActivatedNodes,
    primaryStrategy: diagnosis.primaryStrategy,
    recommendationMode: diagnosis.recommendationMode,
    diagnosis
  };
}

const results = fixtureFiles.map(file => testFixture(loadFixture(file)));

console.log("\nDiagnostic Route Tests");
console.log("======================");

results.forEach(result => {
  console.log(`\n${result.passed ? "PASS" : "FAIL"} — ${result.label}`);
  console.log(`Primary strategy: ${result.primaryStrategy || "none"}`);
  console.log(`Recommendation mode: ${result.recommendationMode}`);

  if (result.missingExpectedNodes.length) {
    console.log(
      `Missing expected route nodes: ${result.missingExpectedNodes.join(", ")}`
    );
  }

  if (result.missingActivatedGraphNodes.length) {
    console.log(
      `Activated nodes missing from graph: ${result.missingActivatedGraphNodes.join(", ")}`
    );
  }
});

const failed = results.filter(result => !result.passed);

if (failed.length) {
  console.error(`\n${failed.length} diagnostic route test(s) failed.`);
  process.exit(1);
}

console.log("\nAll diagnostic route tests passed.");