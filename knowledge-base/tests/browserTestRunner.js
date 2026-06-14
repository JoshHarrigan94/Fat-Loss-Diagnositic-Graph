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
      return response.json();
    })
  );
}

function nodeExists(graph, nodeId) {
  return graph.nodes.some(node => node.id === nodeId);
}

function testFixtureRoutes(graph, fixtures) {
  return fixtures.map(fixture => {
    const diagnosis = diagnoseCase(fixture);

    const missingExpectedNodes = fixture.expectedRouteIncludes.filter(
      nodeId => !diagnosis.activatedNodeIds.includes(nodeId)
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

function renderResults({ validation, graph, routeResults }) {
  const root = document.getElementById("test-output");

  const routeHtml = routeResults
  .map(result => {
    const status = result.passed ? "PASS" : "FAIL";

    return `
      <li>
        <strong>${status}</strong> — ${result.label}
        ${
          result.missingExpectedNodes.length
            ? `<br><small>Missing expected route nodes: ${result.missingExpectedNodes.join(", ")}</small>`
            : ""
        }
        ${
          result.missingGraphNodes.length
            ? `<br><small>Activated nodes missing from graph: ${result.missingGraphNodes.join(", ")}</small>`
            : ""
        }
        <br><small>Primary strategy: ${result.diagnosis.primaryStrategy || "none"}</small>
        <br><small>Recommendation mode: ${result.diagnosis.recommendationMode}</small>
      </li>
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

    <h2>Fixture Route Coverage</h2>
    <ul>${routeHtml}</ul>
  `;
}

async function run() {
  const graph = assembleKnowledgeGraph();
  const validation = validateKnowledgeBase();
  const fixtures = await loadFixtures();

  const routeResults = testFixtureRoutes(graph, fixtures);

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