import { renderInteractiveGraphExplorer } from "../../graph/interactiveGraphRenderer.js";
import { createSubgraphForDiagnosis } from "../../graph/graphEngine.js";
import { renderGraphSvg } from "../../graph/graphRenderer.js";
import { downloadMarkdownReport } from "../../reports/downloadReport.js";
import { getTodayDateString } from "./dataEntry.js";

import {
  renderLineChart,
  renderBarChart
} from "./charts.js";

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
    regressionPrediction,
    regressionModel,
    modelEvaluation,
    modelComparison,
    mlSummary,
    graph,
    markdown,
    timelineSummary,
    rankedExplanationChains,
    activeGraphNodes,
    competingExplanations,
    interventionExplanation,
    graphReasoningSummary,
    simulationSummary,
    rawRows,
    chartData,
    importSummary,
    importWarnings,
    entryErrors,
    entrySuccess
  } = result;

  const subgraph = createSubgraphForDiagnosis(graph, report.diagnosis.id);

  root.innerHTML = `
    <section class="shell">
      ${renderHero(report)}
      ${renderUploadPanel(importSummary, importWarnings)}
      ${renderManualEntryPanel(entryErrors, entrySuccess)}
      ${renderDataTable(rawRows)}
      ${renderCoreMetrics(report)}
      ${renderWeightSignalMetrics(weightSignal)}
      ${renderChartPanels(chartData)}
      ${renderDeficitMetrics(deficit)}
      ${renderAdherenceMetrics(adherence)}
      ${renderPredictionMetrics(prediction)}
      ${renderRegressionPanel(regressionPrediction, regressionModel)}
      ${renderMLEvaluationPanel(modelEvaluation, modelComparison, mlSummary)}
      ${renderSimulationPanel(simulationSummary)}
      ${renderTimelinePanel(timelineSummary)}
      ${renderDiagnosticGrid(report, diagnoses)}
      ${renderGraphReasoningSummary(graphReasoningSummary)}
      ${renderCompetingExplanations(competingExplanations)}
      ${renderActiveMechanisms(activeGraphNodes)}
      ${renderInterventions(interventionExplanation)}
      ${renderGraphReasoningPanel(rankedExplanationChains)}
      ${renderGraphPanel(subgraph)}
      ${renderInteractiveGraphExplorer(graph)}
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
  const exportCsv = document.querySelector("#export-csv");
  const resetData = document.querySelector("#reset-data");
  const saveEntry = document.querySelector("#save-entry");

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

  if (exportCsv && actions.onExportCsv) {
    exportCsv.addEventListener("click", actions.onExportCsv);
  }

  if (resetData && actions.onResetData) {
    resetData.addEventListener("click", actions.onResetData);
  }

  if (saveEntry && actions.onSaveEntry) {
    saveEntry.addEventListener("click", actions.onSaveEntry);
  }

  document.querySelectorAll("[data-delete-date]").forEach((button) => {
    button.addEventListener("click", () => {
      const date = button.getAttribute("data-delete-date");
      if (actions.onDeleteEntry) actions.onDeleteEntry(date);
    });
  });

  document.querySelectorAll("[data-edit-row]").forEach((button) => {
    button.addEventListener("click", () => {
      const payload = JSON.parse(button.getAttribute("data-edit-row"));
      fillEntryForm(payload);
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  });
}

function renderHero(report) {
  return `
    <header class="hero">
      <div>
        <p class="eyebrow">Fat Loss Diagnostic Graph</p>
        <h1>${escapeHtml(report.diagnosis.title)}</h1>
        <p class="summary">${escapeHtml(report.diagnosis.summary)}</p>
      </div>

      <div class="confidence-card">
        <span>${report.diagnosis.confidence}%</span>
        <p>Diagnostic confidence</p>
      </div>
    </header>
  `;
}

function renderUploadPanel(importSummary, importWarnings = []) {
  return `
    <section class="panel upload-panel">
      <div>
        <p class="eyebrow">Input data</p>
        <h2>Upload your fat-loss CSV</h2>
        <p class="summary small">
          Required columns: date, bodyweight_kg, calories, protein_g, carbs_g, fat_g, steps, sleep_hours, sleep_quality, training_load.
        </p>

        ${
          importSummary
            ? `<p class="upload-summary">Imported ${importSummary.totalRows} rows from ${escapeHtml(importSummary.firstDate)} to ${escapeHtml(importSummary.lastDate)}.</p>`
            : `<p class="upload-summary">Currently using saved or demo data.</p>`
        }

        ${
          importWarnings?.length
            ? `<ul class="warning-list">${importWarnings.map((w) => `<li>${escapeHtml(w)}</li>`).join("")}</ul>`
            : ""
        }
      </div>

      <label class="upload-button">
        Choose CSV
        <input id="csv-upload" type="file" accept=".csv,text/csv" />
      </label>
    </section>
  `;
}

function renderManualEntryPanel(entryErrors = [], entrySuccess = "") {
  const today = getTodayDateString();

  return `
    <section class="panel data-entry-panel">
      <div class="section-title">
        <div>
          <p class="eyebrow">Manual entry</p>
          <h2>Add or edit daily data</h2>
        </div>
        <span>Saved locally in browser</span>
      </div>

      ${
        entrySuccess
          ? `<p class="success-message">${escapeHtml(entrySuccess)}</p>`
          : ""
      }

      ${
        entryErrors?.length
          ? `<ul class="error-list">${entryErrors.map((e) => `<li>${escapeHtml(e)}</li>`).join("")}</ul>`
          : ""
      }

      <div class="entry-grid">
        ${inputField("date", "Date", "date", today)}
        ${inputField("bodyweight_kg", "Bodyweight kg", "number", "", "0.1")}
        ${inputField("calories", "Calories", "number")}
        ${inputField("protein_g", "Protein g", "number")}
        ${inputField("carbs_g", "Carbs g", "number")}
        ${inputField("fat_g", "Fat g", "number")}
        ${inputField("steps", "Steps", "number")}
        ${inputField("sleep_hours", "Sleep hours", "number", "", "0.1")}
        ${inputField("sleep_quality", "Sleep quality 1–5", "number", "", "0.5")}
        ${inputField("training_load", "Training load 1–10", "number", "", "0.5")}
      </div>

      <div class="entry-actions">
        <button id="save-entry" class="primary-button">Save date</button>
        <button id="export-csv" class="secondary-button">Export CSV</button>
        <button id="reset-data" class="secondary-button danger">Reset demo data</button>
      </div>
    </section>
  `;
}

function inputField(name, label, type = "text", value = "", step = "1") {
  return `
    <label class="entry-field">
      <span>${escapeHtml(label)}</span>
      <input
        name="${escapeHtml(name)}"
        type="${escapeHtml(type)}"
        value="${escapeHtml(value)}"
        ${type === "number" ? `step="${escapeHtml(step)}"` : ""}
      />
    </label>
  `;
}

function renderDataTable(rows = []) {
  const recentRows = [...rows]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 14);

  return `
    <section class="panel data-table-panel">
      <div class="section-title">
        <h2>Recent entries</h2>
        <span>${rows.length} total rows</span>
      </div>

      <div class="data-table-wrap">
        <table class="data-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Weight</th>
              <th>Calories</th>
              <th>Protein</th>
              <th>Steps</th>
              <th>Sleep</th>
              <th>Load</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            ${
              recentRows.length
                ? recentRows.map(renderDataRow).join("")
                : `<tr><td colspan="8">No rows yet.</td></tr>`
            }
          </tbody>
        </table>
      </div>
    </section>
  `;
}

function renderDataRow(row) {
  const safePayload = escapeHtml(JSON.stringify(row));

  return `
    <tr>
      <td>${escapeHtml(row.date)}</td>
      <td>${format(row.bodyweight_kg)} kg</td>
      <td>${format(row.calories, 0)}</td>
      <td>${format(row.protein_g, 0)}g</td>
      <td>${format(row.steps, 0)}</td>
      <td>${format(row.sleep_hours)}h</td>
      <td>${format(row.training_load)}</td>
      <td class="table-actions">
        <button class="tiny-button" data-edit-row="${safePayload}">Edit</button>
        <button class="tiny-button danger" data-delete-date="${escapeHtml(row.date)}">Delete</button>
      </td>
    </tr>
  `;
}

function renderCoreMetrics(report) {
  return `
    <section class="metrics-grid">
      ${metricCard("Expected loss", `${report.metrics.expectedLossPerWeek} kg/week`)}
      ${metricCard("Observed loss", `${report.metrics.observedLossPerWeek} kg/week`)}
      ${metricCard("Mismatch", `${report.metrics.mismatchKgPerWeek} kg/week`)}
      ${metricCard("Volatility", `${report.metrics.weightVolatility} kg`)}
    </section>
  `;
}

function renderWeightSignalMetrics(weightSignal) {
  return `
    <section class="metrics-grid">
      ${metricCard("Weight momentum", formatLabel(weightSignal.momentum))}
      ${metricCard("Start weight", `${format(weightSignal.startWeight)} kg`)}
      ${metricCard("End weight", `${format(weightSignal.endWeight)} kg`)}
      ${metricCard("Masking risk", weightSignal.flags.possibleMasking ? "Likely" : "Lower")}
    </section>
  `;
}

function renderChartPanels(chartData) {
  if (!chartData) return "";

  return `
    <section class="chart-grid">
      ${renderLineChart({
        title: "Weight trend",
        subtitle: "Daily weight with 7-day rolling average.",
        data: chartData.weightTrend,
        yKey: "weight",
        secondaryYKey: "rollingWeight",
        yLabel: "Daily weight",
        secondaryLabel: "7-day average",
        valueSuffix: "kg"
      })}

      ${renderLineChart({
        title: "Calories vs weight",
        subtitle: "Calories alongside rolling bodyweight.",
        data: chartData.caloriesVsWeight,
        yKey: "calories",
        secondaryYKey: "rollingWeight",
        yLabel: "Calories",
        secondaryLabel: "Weight trend"
      })}

      ${renderLineChart({
        title: "Steps trend",
        subtitle: "Daily steps with 7-day rolling step average.",
        data: chartData.stepsTrend,
        yKey: "steps",
        secondaryYKey: "rollingSteps",
        yLabel: "Steps",
        secondaryLabel: "7-day average"
      })}

      ${renderBarChart({
        title: "Weekly diagnosis confidence",
        subtitle: "Confidence score for each weekly diagnostic window.",
        data: chartData.weeklyDiagnosis,
        labelKey: "label",
        valueKey: "confidence",
        valueSuffix: "%"
      })}
    </section>
  `;
}

function renderDeficitMetrics(deficit) {
  return `
    <section class="metrics-grid">
      ${metricCard("Deficit type", formatLabel(deficit.classification))}
      ${metricCard("Daily deficit", `${format(deficit.dailyDeficit, 0)} kcal`)}
      ${metricCard("Weekly deficit", `${format(deficit.weeklyDeficit, 0)} kcal`)}
      ${metricCard("Average calories", `${format(deficit.averageCalories, 0)} kcal`)}
    </section>
  `;
}

function renderAdherenceMetrics(adherence) {
  return `
    <section class="metrics-grid">
      ${metricCard("Adherence score", `${format(adherence.score, 0)}%`)}
      ${metricCard("Calorie deviation", `${format(adherence.calorieDeviation, 0)} kcal`)}
      ${metricCard("Weekend drift", `${format(adherence.weekendDrift, 0)} kcal`)}
      ${metricCard("Protein hit rate", `${format(adherence.proteinAdherenceRate * 100, 0)}%`)}
    </section>
  `;
}

function renderPredictionMetrics(prediction) {
  return `
    <section class="metrics-grid">
      ${metricCard("Current weight", `${format(prediction.currentWeight)} kg`)}
      ${metricCard("7-day prediction", `${format(prediction.predicted7Day)} kg`)}
      ${metricCard("14-day prediction", `${format(prediction.predicted14Day)} kg`)}
      ${metricCard("Prediction confidence", `${prediction.confidence}%`)}
    </section>
  `;
}

function renderRegressionPanel(regressionPrediction, regressionModel) {
  if (!regressionPrediction?.available) {
    return `
      <section class="panel">
        <div class="section-title">
          <h2>ML prediction</h2>
          <span>Regression model</span>
        </div>
        <p class="summary small">${escapeHtml(regressionPrediction?.reason || "Regression prediction unavailable.")}</p>
      </section>
    `;
  }

  return `
    <section class="panel">
      <div class="section-title">
        <h2>ML prediction</h2>
        <span>${escapeHtml(regressionPrediction.modelType)}</span>
      </div>

      <section class="metrics-grid compact">
        ${metricCard("Predicted 7d change", `${format(regressionPrediction.predictedChange7d)} kg`)}
        ${metricCard("Predicted 7d weight", `${format(regressionPrediction.predictedWeight7d)} kg`)}
        ${metricCard("ML confidence", `${regressionPrediction.confidence}%`)}
        ${metricCard("Training rows", `${regressionModel.trainingRows}`)}
      </section>

      <div class="section-title nested">
        <h2>Top model drivers</h2>
        <span>Feature contributions</span>
      </div>

      <ul class="path-list">
        ${
          regressionPrediction.contributions?.length
            ? regressionPrediction.contributions
                .map((item) => `<li>${escapeHtml(formatLabel(item.feature))}: ${format(item.contribution, 3)}</li>`)
                .join("")
            : "<li>Not enough data for contribution analysis.</li>"
        }
      </ul>
    </section>
  `;
}

function renderMLEvaluationPanel(modelEvaluation, modelComparison, mlSummary) {
  if (!modelEvaluation?.available) {
    return `
      <section class="panel ml-eval-panel">
        <div class="section-title">
          <h2>ML evaluation</h2>
          <span>Model quality</span>
        </div>
        <p class="summary small">${escapeHtml(modelEvaluation?.reason || "Not enough data to evaluate the model.")}</p>
      </section>
    `;
  }

  return `
    <section class="panel ml-eval-panel">
      <div class="section-title">
        <h2>ML evaluation</h2>
        <span>Model quality</span>
      </div>

      <p class="summary small">${escapeHtml(mlSummary?.narrative || modelEvaluation.interpretation)}</p>

      <section class="metrics-grid compact">
        ${metricCard("MAE", `${format(modelEvaluation.mae)} kg`)}
        ${metricCard("Bias", `${format(modelEvaluation.bias)} kg`)}
        ${metricCard("≤0.25kg accuracy", `${format(modelEvaluation.accuracyWithin025 * 100, 0)}%`)}
        ${metricCard("≤0.5kg accuracy", `${format(modelEvaluation.accuracyWithin05 * 100, 0)}%`)}
      </section>

      ${
        modelComparison?.available
          ? `<div class="model-comparison-box">
              <h3>Model comparison</h3>
              <p>${escapeHtml(modelComparison.recommendation)}</p>
              <span>Regression confidence delta: ${format(modelComparison.confidenceDelta, 0)}%</span>
            </div>`
          : ""
      }
    </section>
  `;
}

function renderSimulationPanel(simulationSummary) {
  if (!simulationSummary?.available) {
    return `
      <section class="panel simulation-panel">
        <div class="section-title">
          <h2>Intervention simulator</h2>
          <span>Scenario layer</span>
        </div>
        <p class="summary small">No intervention simulations available.</p>
      </section>
    `;
  }

  return `
    <section class="panel simulation-panel">
      <div class="section-title">
        <h2>Intervention simulator</h2>
        <span>What should change first?</span>
      </div>

      <p class="summary small">${escapeHtml(simulationSummary.summary)}</p>

      <div class="simulation-grid">
        ${simulationSummary.items
          .map(
            (item) => `
              <article class="simulation-card">
                <div>
                  <p class="eyebrow">${escapeHtml(item.impact.pathwayAffected)}</p>
                  <h3>${escapeHtml(item.label)}</h3>
                  <p>${escapeHtml(item.impact.likelyDiagnosisShift)}</p>
                </div>

                <div class="simulation-impact">
                  <span>${format(item.impact.estimatedWeeklyLossDelta)} kg/wk</span>
                  <small>estimated delta</small>
                </div>

                <footer>
                  <span>Projected loss: ${format(item.impact.projectedExpectedLoss)} kg/wk</span>
                  <span>Risk: ${escapeHtml(item.impact.risk)}</span>
                </footer>
              </article>
            `
          )
          .join("")}
      </div>
    </section>
  `;
}

function renderTimelinePanel(timelineSummary) {
  if (!timelineSummary?.available) return "";

  return `
    <section class="panel">
      <div class="section-title">
        <h2>Diagnostic timeline</h2>
        <span>${timelineSummary.weeksAnalysed} week(s)</span>
      </div>

      <p class="summary small">${escapeHtml(timelineSummary.summary)}</p>

      <div class="timeline-list">
        ${timelineSummary.items
          .map(
            (item) => `
              <article class="timeline-item">
                <div>
                  <p class="eyebrow">Week ${item.week}</p>
                  <h3>${escapeHtml(item.diagnosis)}</h3>
                  <p>${escapeHtml(item.dateRange)}</p>
                </div>

                <div class="timeline-metrics">
                  <span>${item.confidence}% confidence</span>
                  <span>${item.observedLoss} kg/wk observed</span>
                  <span>${item.maskingRisk} masking</span>
                </div>
              </article>
            `
          )
          .join("")}
      </div>
    </section>
  `;
}

function renderDiagnosticGrid(report, diagnoses) {
  return `
    <section class="content-grid">
      <article class="panel">
        <div class="section-title">
          <h2>Evidence</h2>
          <span>${diagnoses.length} rule(s) triggered</span>
        </div>

        <ul class="evidence-list">
          ${report.evidence.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}
        </ul>
      </article>

      <article class="panel">
        <div class="section-title">
          <h2>Graph pathways</h2>
          <span>Reasoning route</span>
        </div>

        <ul class="path-list">
          ${report.graphPaths.map((path) => `<li>${escapeHtml(path)}</li>`).join("")}
        </ul>
      </article>
    </section>
  `;
}

function renderGraphReasoningSummary(graphReasoningSummary) {
  if (!graphReasoningSummary) return "";

  return `
    <section class="panel graph-utility-panel">
      <div class="section-title">
        <h2>Graph reasoning summary</h2>
        <span>Active causal interpretation</span>
      </div>

      <p class="summary small">${escapeHtml(graphReasoningSummary.narrative)}</p>
    </section>
  `;
}

function renderCompetingExplanations(competingExplanations = []) {
  return `
    <section class="panel graph-utility-panel">
      <div class="section-title">
        <h2>Competing explanations</h2>
        <span>Rule + graph ranking</span>
      </div>

      <div class="explanation-list">
        ${
          competingExplanations.length
            ? competingExplanations
                .map(
                  (item) => `
                    <article class="explanation-card">
                      <div>
                        <p class="eyebrow">Rank ${item.rank}</p>
                        <h3>${escapeHtml(item.title)}</h3>
                        <p>${escapeHtml(item.explanation)}</p>
                      </div>

                      <div class="score-stack">
                        <span>${item.combinedScore}</span>
                        <small>combined</small>
                      </div>
                    </article>
                  `
                )
                .join("")
            : "<p class='summary small'>No competing explanations available.</p>"
        }
      </div>
    </section>
  `;
}

function renderActiveMechanisms(activeGraphNodes = []) {
  return `
    <section class="panel graph-utility-panel">
      <div class="section-title">
        <h2>Active graph mechanisms</h2>
        <span>${activeGraphNodes.length} active</span>
      </div>

      <div class="mechanism-tags">
        ${
          activeGraphNodes.length
            ? activeGraphNodes
                .map((node) => `<span>${escapeHtml(formatLabel(node))}</span>`)
                .join("")
            : "<span>No active mechanisms</span>"
        }
      </div>
    </section>
  `;
}

function renderInterventions(interventionExplanation) {
  const interventions = interventionExplanation?.interventions || [];

  return `
    <section class="panel graph-utility-panel">
      <div class="section-title">
        <h2>Intervention levers</h2>
        <span>What would change the diagnosis?</span>
      </div>

      <p class="summary small">${escapeHtml(interventionExplanation?.summary || "")}</p>

      <div class="intervention-grid">
        ${
          interventions.length
            ? interventions
                .map(
                  (item) => `
                    <article class="intervention-card">
                      <h3>${escapeHtml(item.lever)}</h3>
                      <p>${escapeHtml(item.rationale)}</p>
                      <span>Risk: ${escapeHtml(item.risk)}</span>
                    </article>
                  `
                )
                .join("")
            : "<p class='summary small'>No interventions mapped.</p>"
        }
      </div>
    </section>
  `;
}

function renderGraphReasoningPanel(rankedExplanationChains = []) {
  return `
    <section class="panel">
      <div class="section-title">
        <h2>Graph pathway explorer</h2>
        <span>Ranked explanation chains</span>
      </div>

      <ul class="path-list">
        ${
          rankedExplanationChains.length
            ? rankedExplanationChains
                .slice(0, 5)
                .map((chain) => `<li>${escapeHtml(chain.chain)} <strong>(${chain.score})</strong></li>`)
                .join("")
            : "<li>No ranked graph reasoning available.</li>"
        }
      </ul>
    </section>
  `;
}

function renderGraphPanel(subgraph) {
  return `
    <section class="panel graph-panel">
      <div class="section-title">
        <h2>Knowledge graph</h2>
        <span>Diagnosis subgraph</span>
      </div>

      ${renderGraphSvg(subgraph)}
    </section>
  `;
}

function renderRecommendation(report) {
  return `
    <section class="panel recommendation">
      <p class="eyebrow">Recommended action</p>
      <h2>${escapeHtml(report.recommendation)}</h2>
    </section>
  `;
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

function renderSignalAudit(analytics) {
  return `
    <section class="panel debug">
      <div class="section-title">
        <h2>Signal audit</h2>
        <span>Rules input</span>
      </div>

      <pre>${escapeHtml(JSON.stringify(analytics.signals, null, 2))}</pre>
    </section>
  `;
}

export function renderError(error) {
  console.error(error);

  const root = document.querySelector("#app");
  if (!root) return;

  root.innerHTML = `
    <section class="error">
      <p class="eyebrow">Fat Loss Diagnostic Graph</p>
      <h1>Diagnostic engine failed to run</h1>
      <p>${escapeHtml(error.message)}</p>
    </section>
  `;
}

function fillEntryForm(row) {
  Object.entries(row).forEach(([key, value]) => {
    const input = document.querySelector(`[name="${key}"]`);
    if (input) input.value = value;
  });
}

function metricCard(label, value) {
  return `
    <article class="metric-card">
      <p>${escapeHtml(label)}</p>
      <strong>${escapeHtml(value)}</strong>
    </article>
  `;
}

function format(value, decimals = 2) {
  if (value === null || value === undefined || Number.isNaN(Number(value))) return "N/A";
  return Number(value).toFixed(decimals);
}

function formatLabel(value) {
  return String(value || "unknown")
    .replaceAll("_", " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}