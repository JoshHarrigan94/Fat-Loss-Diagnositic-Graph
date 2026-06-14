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
      return {
        file,
        ...JSON.parse(fs.readFileSync(filePath, "utf8"))
      };
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

function evaluateScenario(scenario) {
  const diagnosis = diagnoseCase(scenario.case);
  const coverage = getDiagnosisCoverage(diagnosis);
  const expected = scenario.expected;

  const failures = [];

  if (
    expected.primaryIssue &&
    !coverage.includes(expected.primaryIssue)
  ) {
    failures.push(`primaryIssue: ${expected.primaryIssue}`);
  }

  if (
    expected.recommendationMode &&
    diagnosis.recommendationMode !== expected.recommendationMode
  ) {
    failures.push(
      `recommendationMode: expected ${expected.recommendationMode}, got ${diagnosis.recommendationMode}`
    );
  }

  if (
    expected.primaryStrategy &&
    diagnosis.primaryStrategy !== expected.primaryStrategy
  ) {
    failures.push(
      `primaryStrategy: expected ${expected.primaryStrategy}, got ${diagnosis.primaryStrategy}`
    );
  }

  const missingIncludes = (expected.shouldInclude || []).filter(
    item => !coverage.includes(item)
  );

  if (missingIncludes.length) {
    failures.push(`missing includes: ${missingIncludes.join(", ")}`);
  }

  const unexpectedAvoids = (expected.shouldAvoid || []).filter(
    item => coverage.includes(item)
  );

  if (unexpectedAvoids.length) {
    failures.push(`unexpected avoids: ${unexpectedAvoids.join(", ")}`);
  }

  if (diagnosis.missingActivatedNodes.length) {
    failures.push(
      `missing graph nodes: ${diagnosis.missingActivatedNodes.join(", ")}`
    );
  }

  return {
    file: scenario.file,
    id: scenario.id,
    label: scenario.label,
    family: scenario.family,
    difficulty: scenario.difficulty,
    passed: failures.length === 0,
    failures,
    diagnosis
  };
}

const scenarios = loadScenarios();
const results = scenarios.map(evaluateScenario);

const byFamily = new Map();

results.forEach(result => {
  if (!byFamily.has(result.family)) {
    byFamily.set(result.family, []);
  }

  byFamily.get(result.family).push(result);
});

console.log("\nDiagnostic Scenario Report");
console.log("==========================");

console.log(`\nTotal scenarios: ${results.length}`);
console.log(`Passed: ${results.filter(r => r.passed).length}`);
console.log(`Failed: ${results.filter(r => !r.passed).length}`);

console.log("\nFamily Summary");
console.log("--------------");

[...byFamily.entries()].forEach(([family, familyResults]) => {
  const passed = familyResults.filter(r => r.passed).length;
  const total = familyResults.length;

  console.log(`${family}: ${passed}/${total} passed`);
});

console.log("\nFailures");
console.log("--------");

const failed = results.filter(result => !result.passed);

if (!failed.length) {
  console.log("None");
} else {
  failed.forEach(result => {
    console.log(`\n${result.id} — ${result.label}`);
    console.log(`File: ${result.file}`);
    console.log(`Family: ${result.family}`);
    result.failures.forEach(failure => {
      console.log(`- ${failure}`);
    });
  });
}

console.log("\nPrimary Strategy Distribution");
console.log("-----------------------------");

const strategyCounts = new Map();

results.forEach(result => {
  const strategy = result.diagnosis.primaryStrategy || "none";
  strategyCounts.set(strategy, (strategyCounts.get(strategy) || 0) + 1);
});

[...strategyCounts.entries()]
  .sort((a, b) => b[1] - a[1])
  .forEach(([strategy, count]) => {
    console.log(`${strategy}: ${count}`);
  });
  
  console.log("\nConfidence Distribution");
console.log("-----------------------");

const confidenceCounts = new Map();

results.forEach(result => {
  const label = result.diagnosis.confidenceProfile?.overall?.label || "unknown";
  confidenceCounts.set(label, (confidenceCounts.get(label) || 0) + 1);
});

[...confidenceCounts.entries()]
  .sort((a, b) => b[1] - a[1])
  .forEach(([label, count]) => {
    console.log(`${label}: ${count}`);
  });