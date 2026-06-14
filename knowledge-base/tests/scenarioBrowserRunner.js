import { diagnoseCase } from "../diagnoseCase.js";

const scenarioPaths = [
  "./scenarios/001_true_plateau_insufficient_deficit.json",
  "./scenarios/002_false_plateau_water_retention.json",
  "./scenarios/003_low_tracking_confidence.json",
  "./scenarios/004_weekend_adherence_gap.json",
  "./scenarios/005_poor_sleep_recovery_constraint.json",
  "./scenarios/006_diet_fatigue_cut_too_long.json",
  "./scenarios/007_neat_adaptation.json",
  "./scenarios/008_lean_bodybuilder_diet_fatigue.json",
  "./scenarios/009_type2_diabetes_hypoglycaemia_risk.json",
  "./scenarios/010_older_adult_sarcopenia_risk.json"
];

async function loadScenarios() {
  return Promise.all(
    scenarioPaths.map(async path => {
      const response = await fetch(path);

      if (!response.ok) {
        throw new Error(`Failed to load scenario: ${path}`);
      }

      return response.json();
    })
  );
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

  const missingIncludes = (expected.shouldInclude || []).filter(
    item => !coverage.includes(item)
  );

  const unexpectedAvoids = (expected.shouldAvoid || []).filter(
    item => coverage.includes(item)
  );

  const failures = [];

  if (expected.primaryIssue && !coverage.includes(expected.primaryIssue)) {
    failures.push(`Missing primary issue: ${expected.primaryIssue}`);
  }

  if (
    expected.recommendationMode &&
    diagnosis.recommendationMode !== expected.recommendationMode
  ) {
    failures.push(
      `Expected mode ${expected.recommendationMode}, got ${diagnosis.recommendationMode}`
    );
  }

  if (
    expected.primaryStrategy &&
    diagnosis.primaryStrategy !== expected.primaryStrategy
  ) {
    failures.push(
      `Expected strategy ${expected.primaryStrategy}, got ${diagnosis.primaryStrategy}`
    );
  }

  if (missingIncludes.length) {
    failures.push(`Missing includes: ${missingIncludes.join(", ")}`);
  }

  if (unexpectedAvoids.length) {
    failures.push(`Unexpected avoids: ${unexpectedAvoids.join(", ")}`);
  }

  return {
    scenario,
    diagnosis,
    passed: failures.length === 0,
    failures
  };
}

function renderScenario(result) {
  const { scenario, diagnosis, passed, failures } = result;
  const recommendation = diagnosis.recommendationPackage;
  const confidence = diagnosis.confidenceProfile;
  return `
    <section class="card ${passed ? "pass" : "fail"}">
      <h3>${passed ? "PASS" : "FAIL"} — ${scenario.id}</h3>
      <p><strong>${scenario.label}</strong></p>
      <p><strong>Family:</strong> ${scenario.family}</p>
      <p><strong>Difficulty:</strong> ${scenario.difficulty}</p>

      ${
        failures.length
          ? `<div class="failures">
              <strong>Failures</strong>
              <ul>${failures.map(failure => `<li>${failure}</li>`).join("")}</ul>
            </div>`
          : ""
      }

      <h4>Diagnosis</h4>
      <p><strong>Primary strategy:</strong> ${diagnosis.primaryStrategy || "none"}</p>
      <p><strong>Recommendation mode:</strong> ${diagnosis.recommendationMode}</p>
      <p><strong>Likely issues:</strong> ${diagnosis.likelyIssues.join(", ") || "None"}</p>
      <p><strong>Risk flags:</strong> ${diagnosis.riskFlags.join(", ") || "None"}</p>

            <h4>Confidence</h4>
      <p><strong>Overall:</strong> ${confidence.overall.label} (${confidence.overall.score})</p>
      <p><strong>Measurement:</strong> ${confidence.measurement.label} (${confidence.measurement.score})</p>
      <p><strong>Intake:</strong> ${confidence.intake.label} (${confidence.intake.score})</p>
      <p><strong>Risk:</strong> ${confidence.risk.label} (${confidence.risk.score})</p>
      <p><strong>Strategy:</strong> ${confidence.strategy.label} (${confidence.strategy.score})</p>

      <h4>Recommendation</h4>
      <p><strong>${recommendation.primary.label}</strong></p>
      <p>${recommendation.primary.message}</p>
      <p><strong>Intensity:</strong> ${recommendation.intensity}</p>
      <p><strong>Next review:</strong> ${recommendation.nextReviewPoint}</p>
    </section>
  `;
}

function render(results) {
  const root = document.getElementById("scenario-output");

  const passed = results.filter(result => result.passed).length;
  const failed = results.length - passed;

  root.innerHTML = `
    <h1>Diagnostic Scenario Library</h1>
    <p class="lede">
      These scenarios are reasoning benchmarks for the Fat Loss Knowledge Graph.
    </p>

    <section class="summary">
      <p><strong>Total:</strong> ${results.length}</p>
      <p><strong>Passed:</strong> ${passed}</p>
      <p><strong>Failed:</strong> ${failed}</p>
    </section>

    ${results.map(renderScenario).join("")}
  `;
}

async function run() {
  const scenarios = await loadScenarios();
  const results = scenarios.map(evaluateScenario);
  render(results);
}

run().catch(error => {
  document.getElementById("scenario-output").innerHTML = `
    <h1>Scenario runner failed</h1>
    <pre>${error.stack || error.message}</pre>
  `;
});