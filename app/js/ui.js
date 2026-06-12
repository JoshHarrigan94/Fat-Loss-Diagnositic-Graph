import { createSubgraphForDiagnosis } from "../../graph/graphEngine.js";
import { renderGraphSvg } from "../../graph/graphRenderer.js";
import { downloadMarkdownReport } from "../../reports/downloadReport.js";

export function renderDashboard(result, actions = {}) {
  const root = document.querySelector("#app");
  if (!root) return;

  const {
    report,
    analytics,
    adherence,
    deficit,
    weightSignal,
    diagnoses,
    prediction,
    graph,
    markdown,
    importSummary,
    importWarnings
  } = result;

  const subgraph = createSubgraphForDiagnosis(graph, report.diagnosis.id);

  root.innerHTML = `
    <section class="shell">
      ${renderHero(report)}
      ${renderUploadPanel(importSummary, importWarnings)}
      ${renderCoreMetrics(report)}
      ${renderWeightSignalMetrics(weightSignal)}
      ${renderDeficitMetrics(deficit)}
      ${renderAdherenceMetrics(adherence)}
      ${renderPredictionMetrics(prediction)}
      ${renderDiagnosticGrid(report, diagnoses)}
      ${renderGraphPanel(subgraph)}
      ${renderRecommendation(report)}
      ${renderActions()}
      ${renderSignalAudit(analytics)}
    </section>
  `;

  bindEvents(actions, markdown);
}

function bindEvents(actions, markdown) {
  const upload = document.querySelector("#csv-upload");
  const download = document.querySelector("#download-report");

  if (upload && actions.onCsvUpload) {
    upload.addEventListener("change", (event) => {
      const file = event.target.files?.[0];
      if (file) actions.onCsvUpload(file);
    });
  }

  if (download) {
    download.addEventListener("click", () => {
      downloadMarkdownReport(markdown);
    });
  }
}

function renderActions() {
  return `
    <section class="action-row">
      <button id="download-report" class="primary-button">
        Download Markdown Report
      </button>
    </section>
  `;
}