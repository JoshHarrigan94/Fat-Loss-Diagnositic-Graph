import { assembleKnowledgeGraph } from "../assembleGraph.js";
import { validateKnowledgeBase } from "../validateKnowledgeBase.js";
import { diagnoseCase } from "../diagnoseCase.js";

const fixturePaths = [
  "./fixtures/stalled-weight-good-adherence.json",
  "./fixtures/poor-sleep-water-retention.json",
  "./fixtures/low-tracking-confidence.json",
  "./fixtures/type2-diabetes-hypoglycaemia-risk.json",
  "./fixtures/lean-bodybuilder-diet-fatigue.json"
];

async function loadFixtures() {
  return Promise.all(
    fixturePaths.map(async path => {
      const response = await fetch(path);

      if (!response.ok) {
        throw new Error(`Failed to load fixture: ${path}`);
      }

      return response.json();
    })
  );
}

function getDiagnosisCoverage(diagnosis) {
  return [
    ...diagnosis.activatedNodeIds,
    diagnosis.primaryStrategy,
    ...diagnosis.secondaryStrategies,
    ...diagnosis.delayedStrategies.map(item => item.id),
    ...diagnosis.blockedStrategies.map(item => item.id),
    diagnosis.recommendationMode
  ].filter(Boolean);
}

function testFixtureRoutes(fixtures) {
  return fixtures.map(fixture => {
    const diagnosis = diagnoseCase(fixture);
    const coverage = getDiagnosisCoverage(diagnosis);

    const missingExpectedNodes = fixture.expectedRouteIncludes.filter(
      nodeId => !coverage.includes(nodeId)
    );

    const missingGraphNodes = diagnosis.missingActivatedNodes;

    return {
      id: fixture.id,
      label: fixture.label,
      passed:
        missingExpectedNodes.length === 0 &&
        missingGraphNodes.length === 0,
      missingExpectedNodes,
      missingGraphNodes,
      diagnosis
    };
  });
}

function renderList(items, fallback = "None") {
  if (!items || items.length === 0) {
    return fallback;
  }

  return items.join(", ");
}

function renderRecommendationSection(recommendation) {
  return `
    <div style="margin-top:0.75rem; padding:0.75rem; background:#f8f8f8;">
      <p><strong>Primary strategy:</strong> ${recommendation.primary.label}</p>
      <p><strong>Mode:</strong> ${recommendation.modeLabel}</p>
      <p><strong>Intensity:</strong> ${recommendation.intensity}</p>
      <p><strong>Message:</strong> ${recommendation.primary.message}</p>
      <p><strong>Next review:</strong> ${recommendation.nextReviewPoint}</p>

      ${
        recommendation.secondary.length
          ? `<p><strong>Secondary:</strong> ${recommendation.secondary
              .map(item => item.label)
              .join(", ")}</p>`
          : ""
      }

      ${
        recommendation.delayed.length
          ? `<p><strong>Delayed:</strong><br>${recommendation.delayed
              .map(item => `${item.label} — ${item.reason}`)
              .join("<br>")}</p>`
          : ""
      }

      ${
        recommendation.blocked.length
          ? `<p><strong>Blocked:</strong><br>${recommendation.blocked
              .map(item => `${item.label} — ${item.reason}`)
              .join("<br>")}</p>`
          : ""
      }

      ${
        recommendation.safetyCaveats.length
          ? `<p><strong>Safety caveats:</strong><br>${recommendation.safetyCaveats.join(
              "<br>"
            )}</p>`
          : ""
      }

      ${
        recommendation.monitoringGuidance.length
          ? `<p><strong>Monitoring guidance:</strong><br>${recommendation.monitoringGuidance.join(
              "<br>"
            )}</p>`
          : ""
      }
    </div>
  `;
}

function renderResults({ validation, graph, routeResults }) {
  const root = document.getElementById("test-output");

  const routeHtml = routeResults
    .map(result => {
      const status = result.passed ? "PASS" : "FAIL";
      const diagnosis = result.diagnosis;
      const recommendation = diagnosis.recommendationPackage;

      return `
        <section style="border:1px solid #ddd; padding:1rem; margin-bottom:1rem;">
          <h3>${status} — ${result.label}</h3>

          ${
            result.missingExpectedNodes.length
              ? `<p><strong>Missing expected outputs:</strong> ${result.missingExpectedNodes.join(
                  ", "
                )}</p>`
              : ""
          }

          ${
            result.missingGraphNodes.length
              ? `<p><strong>Activated nodes missing from graph:</strong> ${result.missingGraphNodes.join(
                  ", "
                )}</p>`
              : ""
          }

          <p><strong>Likely issues:</strong> ${renderList(diagnosis.likelyIssues)}</p>
          <p><strong>Confidence flags:</strong> ${renderList(diagnosis.confidenceFlags)}</p>
          <p><strong>Risk flags:</strong> ${renderList(diagnosis.riskFlags)}</p>
          <p><strong>Contraindications:</strong> ${renderList(diagnosis.contraindications)}</p>

          ${renderRecommendationSection(recommendation)}
        </section>
      `;
    })
    .join("");

  root.innerHTML = `
    <h1>Fat Loss Knowledge Graph Tests</h1>

    <h2>Validation</h2>
    <p><strong>Valid:</strong> ${validation.summary.valid ? "YES" : "NO"}</p>
    <p><strong>Errors:</strong> ${validation.summary.errorCount}</p>
    <p><strong>Warnings:</strong> ${validation.summary.warningCount}</p>

    <h2>Graph</h2>
    <p><strong>Nodes:</strong> ${graph.nodes.length}</p>
    <p><strong>Edges:</strong> ${graph.edges.length}</p>
    <p><strong>Domains:</strong> ${graph.metadata.domainCount}</p>

    <h2>Fixture Diagnosis Results</h2>
    ${routeHtml}
  `;
}

async function run() {
  const graph = assembleKnowledgeGraph();
  const validation = validateKnowledgeBase();
  const fixtures = await loadFixtures();

  const routeResults = testFixtureRoutes(fixtures);

  renderResults({
    validation,
    graph,
    routeResults
  });
}

run().catch(error => {
  document.getElementById("test-output").innerHTML = `
    <h1>Test runner failed</h1>
    <pre>${error.stack || error.message}</pre>
  `;
});