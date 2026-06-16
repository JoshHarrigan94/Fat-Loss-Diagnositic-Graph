import { downloadMarkdownReport } from "../../reports/downloadReport.js";
import { renderInteractiveGraphExplorer } from "../../graph/interactiveGraphRenderer.js";
import { getTodayDateString } from "./dataEntry.js";
import { renderBarChart, renderLineChart } from "./charts.js";

const APP_PAGES = [
  { id: "home", label: "Home" },
  { id: "explain", label: "Explain" },
  { id: "plan", label: "Plan" },
  { id: "history", label: "History" },
  { id: "body-map", label: "Body Map" },
  { id: "graph", label: "Graph" }
];

const uiState = {
  currentPage: "home",
  selectedBodyMapNodeId: null
};

export function renderDashboard(result, actions = {}) {
  const root = document.querySelector("#app");
  if (!root) return;

  const diagnosis = result.diagnosisRaw || {};
  const bodyMap = buildBodyMapModel(result, diagnosis);
  const currentPage = APP_PAGES.some(page => page.id === uiState.currentPage)
    ? uiState.currentPage
    : "home";

  if (!bodyMap.nodes.some(node => node.id === uiState.selectedBodyMapNodeId)) {
    uiState.selectedBodyMapNodeId = bodyMap.nodes[0]?.id || null;
  }

  root.innerHTML = `
    <section class="shell app-shell">
      ${renderAppHeader(result, diagnosis)}
      <main class="page-shell">
        ${renderPage(currentPage, result, diagnosis, bodyMap)}
      </main>
      ${renderBottomNav(currentPage)}
    </section>
  `;

  bindEvents(actions, result, bodyMap);
}

function bindEvents(actions, result, bodyMap) {
  const upload = document.querySelector("#csv-upload");
  const download = document.querySelector("#download-report");
  const exportCsv = document.querySelector("#export-csv");
  const resetData = document.querySelector("#reset-data");
  const saveEntry = document.querySelector("#save-entry");

  if (upload && actions.onCsvUpload) {
    upload.addEventListener("change", event => {
      const file = event.target.files?.[0];
      if (file) actions.onCsvUpload(file);
    });
  }

  if (download) {
    download.addEventListener("click", () => {
      downloadMarkdownReport(result.markdown || "");
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

  document.querySelectorAll("[data-delete-date]").forEach(button => {
    button.addEventListener("click", () => {
      const date = button.getAttribute("data-delete-date");
      if (actions.onDeleteEntry) actions.onDeleteEntry(date);
    });
  });

  document.querySelectorAll("[data-edit-row]").forEach(button => {
    button.addEventListener("click", () => {
      const payload = JSON.parse(button.getAttribute("data-edit-row"));
      fillEntryForm(payload);
      uiState.currentPage = "home";
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  });

  document.querySelectorAll("[data-page]").forEach(button => {
    button.addEventListener("click", () => {
      uiState.currentPage = button.getAttribute("data-page");
      renderDashboard(result, actions);
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  });

  document.querySelectorAll("[data-node-id]").forEach(button => {
    button.addEventListener("click", () => {
      uiState.selectedBodyMapNodeId = button.getAttribute("data-node-id");
      if (bodyMap.nodes.some(node => node.id === uiState.selectedBodyMapNodeId)) {
        renderDashboard(result, actions);
      }
    });
  });
}

function renderAppHeader(result, diagnosis) {
  const confidence = diagnosis.confidenceProfile?.overall;
  const mode = diagnosis.recommendationPackage?.modeLabel || formatLabel(diagnosis.recommendationMode);

  return `
    <header class="app-header panel">
      <div>
        <p class="eyebrow">Fat Loss Intelligence</p>
        <h1>Confidence-centred fat-loss decision support</h1>
        <p class="summary">
          The graph stays responsible for the diagnosis. The app keeps the answer simple: what is happening, why, what to do next, and whether the current read is trustworthy.
        </p>
      </div>

      <div class="header-actions">
        <article class="header-status-card">
          <span>${escapeHtml(confidence?.label || `${result.report?.diagnosis?.confidence || "N/A"}%`)}</span>
          <p>Confidence</p>
        </article>
        <article class="header-status-card">
          <span>${escapeHtml(mode || "Monitoring")}</span>
          <p>Recommendation mode</p>
        </article>
        <button id="download-report" class="secondary-button">Download report</button>
      </div>
    </header>
  `;
}

function renderPage(currentPage, result, diagnosis, bodyMap) {
  switch (currentPage) {
    case "explain":
      return renderExplainPage(result, diagnosis);
    case "plan":
      return renderPlanPage(result, diagnosis);
    case "history":
      return renderHistoryPage(result, diagnosis);
    case "body-map":
      return renderBodyMapPage(result, diagnosis, bodyMap);
    case "graph":
      return renderGraphPage(result);
    case "home":
    default:
      return renderHomePage(result, diagnosis);
  }
}

function renderHomePage(result, diagnosis) {
  const { report, chartData, entryErrors, entrySuccess, importSummary, importWarnings, rawRows } = result;
  const latestRow = getLatestRow(rawRows);
  const primary = diagnosis.recommendationPackage?.primary;
  const confidence = diagnosis.confidenceProfile?.overall;
  const story = getPrimaryStory(result, diagnosis);

  return `
    <section class="page-flow">
      <section class="confidence-hero panel">
        <div>
          <p class="eyebrow">What is happening?</p>
          <h2>${escapeHtml(report?.diagnosis?.title || "No diagnosis available yet")}</h2>
          <p class="summary">${escapeHtml(report?.diagnosis?.summary || "Add data to generate a diagnosis.")}</p>
          <div class="hero-tags">
            ${tagChip(`Confidence: ${confidence?.label || `${report?.diagnosis?.confidence || "N/A"}%`}`)}
            ${tagChip(`Mode: ${diagnosis.recommendationPackage?.modeLabel || formatLabel(diagnosis.recommendationMode)}`)}
            ${tagChip(`Rows: ${rawRows?.length || 0}`)}
          </div>
        </div>

        <div class="confidence-meter">
          <strong>${report?.diagnosis?.confidence ?? "N/A"}%</strong>
          <span>Can I trust this?</span>
          <p>${escapeHtml(confidence?.reasons?.[0] || "Confidence will strengthen as trend, adherence, and risk signals line up.")}</p>
        </div>
      </section>

      <section class="page-grid page-grid-home">
        <article class="panel">
          <div class="section-title">
            <div>
              <p class="eyebrow">Current state</p>
              <h2>What the graph thinks is most likely</h2>
            </div>
          </div>
          <p class="summary small">${escapeHtml(report?.diagnosis?.summary || "No current state summary available.")}</p>
          <div class="mini-metrics">
            ${statPill("Trend", formatLabel(result.weightSignal?.momentum || "unknown"))}
            ${statPill("Observed", `${format(result.analytics?.metrics?.observedLossPerWeek)} kg/wk`)}
            ${statPill("Expected", `${format(result.analytics?.metrics?.expectedLossPerWeek)} kg/wk`)}
            ${statPill("Volatility", `${format(result.analytics?.metrics?.weightVolatility)} kg`)}
          </div>
        </article>

        <article class="panel recommendation-card-surface">
          <div class="section-title">
            <div>
              <p class="eyebrow">What should I do next?</p>
              <h2>${escapeHtml(primary?.label || "No active recommendation")}</h2>
            </div>
          </div>
          <p class="summary small">${escapeHtml(primary?.message || report?.recommendation || "No recommendation available.")}</p>
          <div class="cta-row">
            <button class="primary-button" data-page="plan">Open plan</button>
            <button class="secondary-button" data-page="explain">See reasoning</button>
          </div>
        </article>

        <article class="panel">
          <div class="section-title">
            <div>
              <p class="eyebrow">Why is it happening?</p>
              <h2>Body story</h2>
            </div>
          </div>
          <p class="story-line">${escapeHtml(story.title)}</p>
          <p class="summary small">${escapeHtml(story.summary)}</p>
          <ul class="evidence-list compact-list">
            ${story.points.length ? story.points.map(point => `<li>${escapeHtml(point)}</li>`).join("") : "<li>No supporting signals available yet.</li>"}
          </ul>
        </article>
      </section>

      <section class="panel">
        <div class="section-title">
          <div>
            <p class="eyebrow">Scale context</p>
            <h2>Weight trend</h2>
          </div>
          <button class="secondary-button" data-page="history">View history</button>
        </div>
        ${
          chartData?.weightTrend?.length
            ? renderLineChart({
                title: "Weight trend",
                subtitle: "Daily bodyweight with the smoothing layer the engine uses to avoid overreacting.",
                data: chartData.weightTrend,
                yKey: "weight",
                secondaryYKey: "rollingWeight",
                yLabel: "Daily weight",
                secondaryLabel: "7-day average",
                valueSuffix: "kg"
              })
            : `<p class="summary small">Weight trend will appear after data is loaded.</p>`
        }
      </section>

      <section class="panel">
        <div class="section-title">
          <div>
            <p class="eyebrow">Check-in</p>
            <h2>Load, update, or correct the current data</h2>
          </div>
          <span>App flow stays connected to the live dashboard</span>
        </div>
        ${renderCheckInSummary(importSummary, importWarnings, latestRow)}
        ${renderManualEntryPanel(entryErrors, entrySuccess)}
        ${renderRecentEntries(rawRows)}
      </section>
    </section>
  `;
}

function renderExplainPage(result, diagnosis) {
  const confidence = diagnosis.confidenceProfile || {};
  const strongest = result.knowledgeSummary?.strongestDomain;
  const alternatives = (result.competingExplanations || []).slice(1, 4);

  return `
    <section class="page-flow">
      <section class="page-intro">
        <p class="eyebrow">Explain</p>
        <h2>Why the graph reached this conclusion</h2>
        <p class="summary">The engine should stay legible. This page exposes the evidence, pathway, and uncertainty without forcing you through raw ontology internals.</p>
      </section>

      <section class="page-grid">
        <article class="panel">
          <div class="section-title">
            <h2>Diagnostic summary</h2>
            <span>${escapeHtml(result.report?.diagnosis?.title || "No diagnosis")}</span>
          </div>
          <p class="summary small">${escapeHtml(result.report?.diagnosis?.summary || "No summary available.")}</p>
          ${strongest ? `<p class="summary small">Strongest domain: ${escapeHtml(strongest.title)}.</p>` : ""}
        </article>

        <article class="panel">
          <div class="section-title">
            <h2>Evidence strength</h2>
            <span>${escapeHtml(confidence.overall?.label || "Not scored")}</span>
          </div>
          <div class="signal-stack">
            ${confidenceCard("Overall", confidence.overall)}
            ${confidenceCard("Measurement", confidence.measurement)}
            ${confidenceCard("Intake", confidence.intake)}
            ${confidenceCard("Risk", confidence.risk)}
            ${confidenceCard("Strategy", confidence.strategy)}
          </div>
        </article>
      </section>

      <section class="page-grid">
        <article class="panel">
          <div class="section-title">
            <h2>Evidence used</h2>
            <span>${result.report?.evidence?.length || 0} signals</span>
          </div>
          <ul class="evidence-list">
            ${(result.report?.evidence || []).length
              ? result.report.evidence.map(item => `<li>${escapeHtml(formatLabel(item))}</li>`).join("")
              : "<li>No evidence items available.</li>"}
          </ul>
        </article>

        <article class="panel">
          <div class="section-title">
            <h2>Reasoning pathway</h2>
            <span>Top routes</span>
          </div>
          <ul class="path-list">
            ${(result.rankedExplanationChains || []).length
              ? result.rankedExplanationChains
                  .slice(0, 5)
                  .map(chain => `<li>${escapeHtml(chain.chain)}</li>`)
                  .join("")
              : "<li>No ranked explanation chains available.</li>"}
          </ul>
        </article>
      </section>

      <section class="page-grid">
        <article class="panel">
          <div class="section-title">
            <h2>Alternative explanations</h2>
            <span>Competing hypotheses</span>
          </div>
          <div class="explanation-list">
            ${alternatives.length
              ? alternatives
                  .map(
                    item => `
                      <article class="explanation-card compact-explanation-card">
                        <div>
                          <p class="eyebrow">Rank ${item.rank}</p>
                          <h3>${escapeHtml(item.title)}</h3>
                          <p>${escapeHtml(item.explanation)}</p>
                        </div>
                        <div class="score-stack">
                          <span>${item.combinedScore}</span>
                          <small>score</small>
                        </div>
                      </article>
                    `
                  )
                  .join("")
              : "<p class='summary small'>No alternative explanations available.</p>"}
          </div>
        </article>

        <article class="panel">
          <div class="section-title">
            <h2>Confidence notes</h2>
            <span>Trust context</span>
          </div>
          <ul class="evidence-list">
            ${(confidence.overall?.reasons || []).length
              ? confidence.overall.reasons.map(reason => `<li>${escapeHtml(reason)}</li>`).join("")
              : "<li>No confidence notes available.</li>"}
          </ul>
        </article>
      </section>
    </section>
  `;
}

function renderPlanPage(result, diagnosis) {
  const recommendation = diagnosis.recommendationPackage || {};
  const latestRow = getLatestRow(result.rawRows);
  const delayed = recommendation.delayedStrategies || diagnosis.delayedStrategies || [];
  const blocked = recommendation.blockedStrategies || diagnosis.blockedStrategies || [];
  const avoided = recommendation.avoidedStrategies || diagnosis.avoidedStrategies || [];
  const contraindicated = recommendation.contraindicatedStrategies || diagnosis.contraindicatedStrategies || [];

  return `
    <section class="page-flow">
      <section class="page-intro">
        <p class="eyebrow">Plan</p>
        <h2>What to do next and why this comes first</h2>
        <p class="summary">Only active guidance appears as the current plan. Delayed or blocked strategies stay visible as context, not as live instructions.</p>
      </section>

      <section class="page-grid">
        <article class="panel recommendation-card-surface">
          <div class="section-title">
            <h2>Current recommendation</h2>
            <span>${escapeHtml(recommendation.modeLabel || formatLabel(diagnosis.recommendationMode))}</span>
          </div>
          <h3 class="plan-headline">${escapeHtml(recommendation.primary?.label || "No active strategy")}</h3>
          <p class="summary small">${escapeHtml(recommendation.primary?.message || result.report?.recommendation || "No recommendation available.")}</p>
        </article>

        <article class="panel">
          <div class="section-title">
            <h2>Why this recommendation</h2>
            <span>Graph rationale</span>
          </div>
          <p class="summary small">${escapeHtml(result.interventionExplanation?.summary || result.graphReasoningSummary?.narrative || "No recommendation rationale available.")}</p>
          <ul class="evidence-list">
            ${(recommendation.tacticalLevers || []).length
              ? recommendation.tacticalLevers.map(lever => `<li><strong>${escapeHtml(lever.label)}:</strong> ${escapeHtml(lever.description)}</li>`).join("")
              : "<li>No tactical levers specified.</li>"}
          </ul>
        </article>
      </section>

      <section class="page-grid">
        <article class="panel">
          <div class="section-title">
            <h2>Current targets</h2>
            <span>Latest row</span>
          </div>
          <div class="target-grid">
            ${targetCard("Calories", latestRow?.calories, "kcal")}
            ${targetCard("Protein", latestRow?.protein_g, "g")}
            ${targetCard("Steps", latestRow?.steps, "")}
            ${targetCard("Sleep", latestRow?.sleep_hours, "h")}
            ${targetCard("Training load", latestRow?.training_load, "")}
            ${targetCard("Weight", latestRow?.bodyweight_kg, "kg")}
          </div>
        </article>

        <article class="panel">
          <div class="section-title">
            <h2>Review window</h2>
            <span>When to reassess</span>
          </div>
          <p class="summary small">${escapeHtml(recommendation.nextReviewPoint || "Use the next meaningful run of consistent data before changing course.")}</p>
          <div class="mini-metrics">
            ${statPill("Rows loaded", `${result.rawRows?.length || 0}`)}
            ${statPill("Adherence", `${format(result.adherence?.score, 0)}%`)}
            ${statPill("Observed loss", `${format(result.analytics?.metrics?.observedLossPerWeek)} kg/wk`)}
          </div>
        </article>
      </section>

      <section class="page-grid">
        <article class="panel">
          <div class="section-title">
            <h2>Secondary strategies</h2>
            <span>Active support</span>
          </div>
          ${renderStrategyBucket(recommendation.secondaryStrategies || diagnosis.secondaryStrategies, "No active secondary strategies.")}
        </article>

        <article class="panel">
          <div class="section-title">
            <h2>Risk of changing course</h2>
            <span>Do not confuse context with action</span>
          </div>
          ${renderStrategyGroups({
            delayed,
            blocked,
            avoided,
            contraindicated
          })}
        </article>
      </section>
    </section>
  `;
}

function renderHistoryPage(result) {
  return `
    <section class="page-flow">
      <section class="page-intro">
        <p class="eyebrow">History</p>
        <h2>How the diagnosis has moved over time</h2>
        <p class="summary">This timeline keeps previous reads and recommendations legible without pretending to validate outcomes that have not happened yet.</p>
      </section>

      <section class="page-grid">
        <article class="panel">
          <div class="section-title">
            <h2>Decision timeline</h2>
            <span>${result.timelineSummary?.weeksAnalysed || 0} week(s)</span>
          </div>
          ${
            result.timelineSummary?.items?.length
              ? `<div class="timeline-list">${result.timelineSummary.items.map(renderTimelineItem).join("")}</div>`
              : `<p class="summary small">No timeline available yet.</p>`
          }
        </article>

        <article class="panel">
          <div class="section-title">
            <h2>Weekly confidence</h2>
            <span>History view</span>
          </div>
          ${
            result.chartData?.weeklyDiagnosis?.length
              ? renderBarChart({
                  title: "Weekly diagnosis confidence",
                  subtitle: "Confidence by diagnostic window.",
                  data: result.chartData.weeklyDiagnosis,
                  labelKey: "label",
                  valueKey: "confidence",
                  valueSuffix: "%"
                })
              : `<p class="summary small">Weekly confidence history will appear after enough data is available.</p>`
          }
        </article>
      </section>

      <section class="panel">
        <div class="section-title">
          <h2>Recent entries</h2>
          <span>${result.rawRows?.length || 0} rows</span>
        </div>
        ${renderRecentEntries(result.rawRows)}
      </section>
    </section>
  `;
}

function renderBodyMapPage(result, diagnosis, bodyMap) {
  const selectedNode = bodyMap.nodes.find(node => node.id === uiState.selectedBodyMapNodeId) || bodyMap.nodes[0] || null;
  const nodeEdges = bodyMap.edges.filter(
    edge => edge.source === selectedNode?.id || edge.target === selectedNode?.id
  );

  return `
    <section class="page-flow">
      <section class="page-intro">
        <p class="eyebrow">Body Map</p>
        <h2>Curated mechanism map</h2>
        <p class="summary">This is a decision-support view of the physiology, not the raw ontology. It shows which mechanisms, relationships, and outcomes matter for the current diagnosis.</p>
      </section>

      <section class="page-grid body-map-layout">
        <article class="panel">
          <div class="section-title">
            <h2>Current mechanism pathway</h2>
            <span>${bodyMap.edges.length} relationships</span>
          </div>
          <div class="body-map-rail">
            ${bodyMap.edges.length
              ? bodyMap.edges.map(edge => renderBodyMapEdge(edge, bodyMap.nodeIndex)).join("")
              : "<p class='summary small'>No body-map relationships available.</p>"}
          </div>
        </article>

        <article class="panel">
          <div class="section-title">
            <h2>Node explorer</h2>
            <span>${bodyMap.nodes.length} nodes</span>
          </div>
          <div class="node-chip-list">
            ${bodyMap.nodes.length
              ? bodyMap.nodes
                  .map(
                    node => `
                      <button
                        class="node-chip ${node.id === selectedNode?.id ? "active" : ""}"
                        data-node-id="${escapeHtml(node.id)}"
                      >
                        ${escapeHtml(node.label)}
                      </button>
                    `
                  )
                  .join("")
              : "<p class='summary small'>No nodes available.</p>"}
          </div>

          ${selectedNode ? renderNodeInspector(selectedNode, nodeEdges, diagnosis, result) : ""}
        </article>
      </section>
    </section>
  `;
}

function renderGraphPage(result) {
  return `
    <section class="page-flow">
      <section class="page-intro">
        <p class="eyebrow">Knowledge Graph</p>
        <h2>Interactive graph explorer</h2>
        <p class="summary">
          This is the full interactive knowledge graph as a standalone surface. Use it when you want the raw connected map with search, category filtering, and node-level diagnostic context.
        </p>
      </section>

      ${renderInteractiveGraphExplorer(result.graph)}
    </section>
  `;
}

function renderBottomNav(currentPage) {
  return `
    <nav class="bottom-nav">
      ${APP_PAGES.map(
        page => `
          <button class="nav-pill ${page.id === currentPage ? "active" : ""}" data-page="${page.id}">
            ${escapeHtml(page.label)}
          </button>
        `
      ).join("")}
    </nav>
  `;
}

function renderCheckInSummary(importSummary, importWarnings = [], latestRow) {
  return `
    <div class="check-in-summary-grid">
      <article class="check-in-summary-card">
        <p class="eyebrow">Sample or saved data</p>
        <h3>${importSummary?.totalRows || 0} rows loaded</h3>
        <p>${escapeHtml(importSummary ? `From ${importSummary.firstDate} to ${importSummary.lastDate}.` : "Demo or local rows are active.")}</p>
      </article>

      <article class="check-in-summary-card">
        <p class="eyebrow">Latest day</p>
        <h3>${escapeHtml(latestRow?.date || "No entries")}</h3>
        <p>${escapeHtml(latestRow ? `Weight ${format(latestRow.bodyweight_kg)} kg, calories ${format(latestRow.calories, 0)}.` : "Add a row to start diagnosis.")}</p>
      </article>

      <article class="check-in-summary-card">
        <p class="eyebrow">Load CSV</p>
        <label class="upload-button upload-button-inline">
          Choose CSV
          <input id="csv-upload" type="file" accept=".csv,text/csv" />
        </label>
        ${
          importWarnings?.length
            ? `<ul class="warning-list">${importWarnings.map(item => `<li>${escapeHtml(item)}</li>`).join("")}</ul>`
            : `<p>No import warnings.</p>`
        }
      </article>
    </div>
  `;
}

function renderManualEntryPanel(entryErrors = [], entrySuccess = "") {
  const today = getTodayDateString();

  return `
    <section class="data-entry-panel data-entry-panel-inline">
      ${
        entrySuccess
          ? `<p class="success-message">${escapeHtml(entrySuccess)}</p>`
          : ""
      }

      ${
        entryErrors?.length
          ? `<ul class="error-list">${entryErrors.map(item => `<li>${escapeHtml(item)}</li>`).join("")}</ul>`
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
        ${inputField("sleep_quality", "Sleep quality 1-5", "number", "", "0.5")}
        ${inputField("training_load", "Training load 1-10", "number", "", "0.5")}
      </div>

      <div class="entry-actions">
        <button id="save-entry" class="primary-button">Save date</button>
        <button id="export-csv" class="secondary-button">Export CSV</button>
        <button id="reset-data" class="secondary-button danger">Reset demo data</button>
      </div>
    </section>
  `;
}

function renderRecentEntries(rows = []) {
  const recentRows = [...(rows || [])]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 10);

  return `
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
  `;
}

function renderDataRow(row) {
  const safePayload = escapeHtml(JSON.stringify(row));

  return `
    <tr>
      <td>${escapeHtml(row.date)}</td>
      <td>${format(row.bodyweight_kg)} kg</td>
      <td>${format(row.calories, 0)}</td>
      <td>${format(row.protein_g, 0)} g</td>
      <td>${format(row.steps, 0)}</td>
      <td>${format(row.sleep_hours)} h</td>
      <td>${format(row.training_load)}</td>
      <td class="table-actions">
        <button class="tiny-button" data-edit-row="${safePayload}">Edit</button>
        <button class="tiny-button danger" data-delete-date="${escapeHtml(row.date)}">Delete</button>
      </td>
    </tr>
  `;
}

function renderTimelineItem(item) {
  return `
    <article class="timeline-item">
      <div>
        <p class="eyebrow">Week ${escapeHtml(item.week)}</p>
        <h3>${escapeHtml(item.diagnosis || "No diagnosis")}</h3>
        <p>${escapeHtml(item.dateRange || "No date range")}</p>
      </div>

      <div class="timeline-metrics">
        <span>${escapeHtml(item.recommendation || "Recommendation not recorded")}</span>
        <span>${escapeHtml(`${item.confidence ?? "N/A"}% confidence`)}</span>
        <span>${escapeHtml(`${item.observedLoss ?? "N/A"} kg/wk observed`)}</span>
      </div>
    </article>
  `;
}

function renderStrategyGroups(groups) {
  return `
    <div class="strategy-groups">
      ${strategyBucketCard("Delayed", groups.delayed, "Conditionally available later.")}
      ${strategyBucketCard("Blocked", groups.blocked, "Not currently available.")}
      ${strategyBucketCard("Avoided", groups.avoided, "Not recommended in the current state.")}
      ${strategyBucketCard("Contraindicated", groups.contraindicated, "Should not be used with the current risk profile.")}
    </div>
  `;
}

function strategyBucketCard(title, items, emptyMessage) {
  return `
    <article class="strategy-bucket-card">
      <p class="eyebrow">${escapeHtml(title)}</p>
      ${renderStrategyBucket(items, emptyMessage)}
    </article>
  `;
}

function renderStrategyBucket(items = [], emptyMessage = "No items.") {
  if (!items?.length) {
    return `<p class="summary small">${escapeHtml(emptyMessage)}</p>`;
  }

  return `
    <ul class="evidence-list compact-list">
      ${items
        .map(
          item => `
            <li>
              <strong>${escapeHtml(item.label || formatLabel(item.id || item.strategy || "strategy"))}</strong>
              ${item.reason ? `: ${escapeHtml(item.reason)}` : ""}
            </li>
          `
        )
        .join("")}
    </ul>
  `;
}

function buildBodyMapModel(result, diagnosis) {
  const subgraph = result.subgraph || { nodes: [], edges: [] };
  const nodeIndex = new Map((subgraph.nodes || []).map(node => [node.id, node]));
  const topRoute = diagnosis.reasoningRoutes?.find(route => route.containsDecisionNode) || diagnosis.reasoningRoutes?.[0];
  const routeNodeIds = topRoute?.path || [];
  const routeEdges = topRoute?.edges || [];
  const edges = (routeEdges.length ? routeEdges : subgraph.edges || []).slice(0, 10);
  const nodes = routeNodeIds.length
    ? routeNodeIds.map(nodeId => nodeIndex.get(nodeId)).filter(Boolean)
    : (subgraph.nodes || []).slice(0, 12);

  return {
    nodes: nodes.map(node => ({
      id: node.id,
      label: node.label || formatLabel(node.id),
      description: node.description || node.reasoningPurpose || "No node description available.",
      type: node.type || "unknown",
      coaching: node.coachingImplication || node.coaching || ""
    })),
    edges,
    nodeIndex: new Map(
      nodes.map(node => [
        node.id,
        {
          id: node.id,
          label: node.label,
          description: node.description,
          type: node.type,
          coaching: node.coaching
        }
      ])
    )
  };
}

function renderBodyMapEdge(edge, nodeIndex) {
  const source = nodeIndex.get(edge.source);
  const target = nodeIndex.get(edge.target);

  return `
    <article class="body-edge-card">
      <button class="body-edge-node" data-node-id="${escapeHtml(edge.source)}">${escapeHtml(source?.label || formatLabel(edge.source))}</button>
      <div class="body-edge-link">
        <span>${escapeHtml(formatLabel(edge.relationship || "related_to"))}</span>
        <small>${escapeHtml(edge.explanation || "Mechanistic relationship")}</small>
      </div>
      <button class="body-edge-node" data-node-id="${escapeHtml(edge.target)}">${escapeHtml(target?.label || formatLabel(edge.target))}</button>
    </article>
  `;
}

function renderNodeInspector(node, edges, diagnosis, result) {
  return `
    <section class="node-inspector">
      <p class="eyebrow">Selected node</p>
      <h3>${escapeHtml(node.label)}</h3>
      <p class="summary small">${escapeHtml(node.description)}</p>
      <div class="mini-metrics">
        ${statPill("Type", formatLabel(node.type))}
        ${node.coaching ? statPill("Diagnostic relevance", node.coaching) : ""}
        ${diagnosis.activatedNodeIds?.includes(node.id) ? statPill("Active", "Yes") : ""}
      </div>
      <h4>Connected relationships</h4>
      <ul class="path-list compact-list">
        ${edges.length
          ? edges
              .map(
                edge => `
                  <li>
                    ${escapeHtml(formatLabel(edge.source))} ${escapeHtml(formatLabel(edge.relationship || "related_to"))} ${escapeHtml(formatLabel(edge.target))}
                    ${edge.diagnosticUse ? ` - ${escapeHtml(edge.diagnosticUse)}` : ""}
                  </li>
                `
              )
              .join("")
          : "<li>No connected relationships available.</li>"}
      </ul>
      ${
        result.report?.graphPaths?.length
          ? `
            <h4>Associated reasoning routes</h4>
            <ul class="path-list compact-list">
              ${result.report.graphPaths
                .filter(path => path.toLowerCase().includes(node.label.toLowerCase()))
                .slice(0, 3)
                .map(path => `<li>${escapeHtml(path)}</li>`)
                .join("") || "<li>No direct route summaries available.</li>"}
            </ul>
          `
          : ""
      }
    </section>
  `;
}

function getPrimaryStory(result, diagnosis) {
  const strongest = result.knowledgeSummary?.strongestDomain;
  const title = strongest?.title || diagnosis.primaryHypothesis?.label || result.report?.diagnosis?.title || "Current body story";
  const summary =
    strongest?.description ||
    diagnosis.primaryHypothesis?.explanation ||
    result.graphReasoningSummary?.narrative ||
    "The graph has not produced a detailed story yet.";

  const points = [
    ...(strongest?.supporting || []),
    ...((result.report?.evidence || []).slice(0, 3))
  ]
    .filter(Boolean)
    .slice(0, 5)
    .map(item => formatLabel(item));

  return { title, summary, points };
}

function getLatestRow(rows = []) {
  if (!rows?.length) return null;
  return [...rows].sort((a, b) => new Date(b.date) - new Date(a.date))[0];
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

function confidenceCard(label, confidence) {
  if (!confidence) {
    return `
      <article class="confidence-detail-card">
        <p class="eyebrow">${escapeHtml(label)}</p>
        <strong>N/A</strong>
        <p>No confidence score available.</p>
      </article>
    `;
  }

  return `
    <article class="confidence-detail-card">
      <p class="eyebrow">${escapeHtml(label)}</p>
      <strong>${escapeHtml(confidence.label || format(confidence.score * 100, 0))}</strong>
      <p>${escapeHtml(confidence.reasons?.[0] || "Confidence rationale unavailable.")}</p>
    </article>
  `;
}

function targetCard(label, value, suffix) {
  return `
    <article class="target-card">
      <p>${escapeHtml(label)}</p>
      <strong>${escapeHtml(value === undefined || value === null || Number.isNaN(Number(value)) ? "N/A" : `${format(value, suffix === "" ? 0 : 1)}${suffix ? ` ${suffix}` : ""}`)}</strong>
    </article>
  `;
}

function statPill(label, value) {
  return `
    <span class="stat-pill">
      <strong>${escapeHtml(label)}</strong>
      ${escapeHtml(value)}
    </span>
  `;
}

function tagChip(label) {
  return `<span class="tag-chip">${escapeHtml(label)}</span>`;
}

export function renderError(error) {
  console.error(error);

  const root = document.querySelector("#app");
  if (!root) return;

  root.innerHTML = `
    <section class="error">
      <p class="eyebrow">Fat Loss Intelligence</p>
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

function format(value, decimals = 2) {
  if (value === null || value === undefined || Number.isNaN(Number(value))) return "N/A";
  return Number(value).toFixed(decimals);
}

function formatLabel(value) {
  return String(value || "unknown")
    .replaceAll("_", " ")
    .replace(/\b\w/g, char => char.toUpperCase());
}

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}
