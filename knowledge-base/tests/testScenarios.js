import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { diagnoseCase } from "../diagnoseCase.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const scenariosDir = path.join(__dirname, "scenarios");

function loadScenarios() {
  return fs
    .readdirSync(scenariosDir)
    .filter(file => file.endsWith(".json"))
    .sort()
    .map(file => {
      const filePath = path.join(scenariosDir, file);
      return JSON.parse(fs.readFileSync(filePath, "utf8"));
    });
}

function getDiagnosisCoverage(diagnosis) {
  return [
    ...diagnosis.activatedNodeIds,
    ...diagnosis.likelyIssues,
    ...diagnosis.confidenceFlags,
    ...diagnosis.riskFlags,
    ...diagnosis.contraindications,
    diagnosis.primaryStrategy,
    ...diagnosis.secondaryStrategies,
    ...diagnosis.delayedStrategies.map(item => item.id),
    ...diagnosis.blockedStrategies.map(item => item.id),
    diagnosis.recommendationMode
  ].filter(Boolean);
}

function testScenario(scenario) {
  const diagnosis = diagnoseCase(scenario.case);
  const coverage = getDiagnosisCoverage(diagnosis);

  const expected = scenario.expected;

  const checks = {
    primaryIssue:
      !expected.primaryIssue ||
      coverage.includes(expected.primaryIssue),

    recommendationMode:
      !expected.recommendationMode ||
      diagnosis.recommendationMode === expected.recommendationMode,

    primaryStrategy:
      !expected.primaryStrategy ||
      diagnosis.primaryStrategy === expected.primaryStrategy,

    shouldInclude:
      (expected.shouldInclude || []).filter(item => !coverage.includes(item)),

    shouldAvoid:
      (expected.shouldAvoid || []).filter(item => coverage.includes(item))
  };

  const passed =
    checks.primaryIssue &&
    checks.recommendationMode &&
    checks.primaryStrategy &&
    checks.shouldInclude.length === 0 &&
    checks.shouldAvoid.length === 0 &&
    diagnosis.missingActivatedNodes.length === 0;

  return {
    id: scenario.id,
    label: scenario.label,
    family: scenario.family,
    difficulty: scenario.difficulty,
    passed,
    diagnosis,
    checks
  };
}

const scenarios = loadScenarios();
const results = scenarios.map(testScenario);

console.log("\nDiagnostic Scenario Tests");
console.log("=========================");

results.forEach(result => {
  console.log(`\n${result.passed ? "PASS" : "FAIL"} — ${result.id}`);
  console.log(result.label);
  console.log(`Family: ${result.family}`);
  console.log(`Difficulty: ${result.difficulty}`);
  console.log(`Primary strategy: ${result.diagnosis.primaryStrategy || "none"}`);
  console.log(`Recommendation mode: ${result.diagnosis.recommendationMode}`);

  if (!result.checks.primaryIssue) {
    console.log("Primary issue mismatch.");
  }

  if (!result.checks.recommendationMode) {
    console.log(
      `Recommendation mode mismatch. Expected scenario mode not matched.`
    );
  }

  if (!result.checks.primaryStrategy) {
    console.log("Primary strategy mismatch.");
  }

  if (result.checks.shouldInclude.length) {
    console.log(
      `Missing expected outputs: ${result.checks.shouldInclude.join(", ")}`
    );
  }

  if (result.checks.shouldAvoid.length) {
    console.log(
      `Unexpected avoided outputs present: ${result.checks.shouldAvoid.join(", ")}`
    );
  }

  if (result.diagnosis.missingActivatedNodes.length) {
    console.log(
      `Activated nodes missing from graph: ${result.diagnosis.missingActivatedNodes.join(", ")}`
    );
  }
});

const passedCount = results.filter(result => result.passed).length;
const failed = results.filter(result => !result.passed);

console.log("\nSummary");
console.log("-------");
console.log(`Scenarios: ${results.length}`);
console.log(`Passed: ${passedCount}`);
console.log(`Failed: ${failed.length}`);

if (failed.length) {
  console.error("\nSome scenario tests failed.");
  process.exit(1);
}

console.log("\nAll diagnostic scenario tests passed.");