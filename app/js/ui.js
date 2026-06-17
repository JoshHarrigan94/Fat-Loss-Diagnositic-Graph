import { buildAtlasViewModel } from "../../graph/atlasAdapter.js";
import { attachNeighborMetadata, renderAtlasScene } from "../../graph/atlasRenderer.js";
import { downloadMarkdownReport } from "../../reports/downloadReport.js";
import { getTodayDateString } from "./dataEntry.js";
import { renderLineChart } from "./charts.js";

const APP_PAGES = [
  { id: "today", label: "Today" },
  { id: "why", label: "Why" },
  { id: "map", label: "Map" },
  { id: "journey", label: "Journey" }
];

const VALID_PAGES = new Set(APP_PAGES.map(page => page.id));

const uiState = {
  currentPage: "today",
  selectedAtlasNodeId: null,
  selectedPathwayIndex: 0,
  routeBound: false,
  lastResult: null,
  lastActions: null
};

export function renderDashboard(result, actions = {}) {
  const root = document.querySelector("#app");
  if (!root) return;

  uiState.lastResult = result;
  uiState.lastActions = actions;
  uiState.currentPage = resolveCurrentPage();

  const diagnosis = result.diagnosisRaw || {};
  const todayAtlas = buildModel(result, diagnosis, "diagnostic");
  const mapView = buildModel(result, diagnosis, "atlas");
  const whyView = buildModel(result, diagnosis, "pathway");

  root.innerHTML = `
    <section class="shell atlas-app-shell">
      ${renderAppFrame(result, diagnosis, uiState.currentPage)}
      <main class="atlas-page-shell atlas-page-shell-${uiState.currentPage}">
        ${renderPage(uiState.currentPage, result, diagnosis, {
          todayAtlas,
          mapView,
          whyView
        })}
      </main>
    </section>
  `;

  bindEvents(actions, result, {
    todayAtlas,
    mapView,
    whyView
  });
}

function resolveCurrentPage() {
  const fromHash = getPageFromHash();
  if (fromHash) {
    uiState.currentPage = fromHash;
    return fromHash;
  }

  if (!VALID_PAGES.has(uiState.currentPage)) {
    uiState.currentPage = "today";
  }

  setHash(uiState.currentPage, true);
  return uiState.currentPage;
}

function getPageFromHash() {
  const value = window.location.hash.replace(/^#/, "").trim().toLowerCase();
  return VALID_PAGES.has(value) ? value : null;
}

function setHash(page, replace = false) {
  if (!VALID_PAGES.has(page)) return;
  const url = `${window.location.pathname}${window.location.search}#${page}`;
  if (replace) {
    window.history.replaceState(null, "", url);
  } else {
    window.history.pushState(null, "", url);
  }
}

function buildModel(result, diagnosis, mode) {
  const model = buildAtlasViewModel({
    graph: result.graph,
    diagnosis,
    mode,
    selectedNodeId: uiState.selectedAtlasNodeId,
    selectedPathwayIndex: uiState.selectedPathwayIndex
  });

  if (!uiState.selectedAtlasNodeId && model.selectedNode) {
    uiState.selectedAtlasNodeId = model.selectedNode.id;
  }

  if (uiState.selectedAtlasNodeId && !model.nodes.some(node => node.id === uiState.selectedAtlasNodeId)) {
    uiState.selectedAtlasNodeId = model.selectedNode?.id || null;
  }

  return attachNeighborMetadata(model);
}

function bindEvents(actions, result, models) {
  bindRouteListener();

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
      navigateTo("journey");
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  });

  document.querySelectorAll("[data-page]").forEach(button => {
    button.addEventListener("click", () => {
      const page = button.getAttribute("data-page");
      navigateTo(page);
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  });

  document.querySelectorAll("[data-pathway-index]").forEach(button => {
    button.addEventListener("click", () => {
      uiState.selectedPathwayIndex = Number(button.getAttribute("data-pathway-index")) || 0;
      const pathwayNode = models.whyView.pathways[uiState.selectedPathwayIndex]?.nodeIds?.[0];
      if (pathwayNode) uiState.selectedAtlasNodeId = pathwayNode;
      rerender();
    });
  });

  bindAtlasHover();

  document.querySelectorAll("[data-atlas-node]").forEach(node => {
    node.addEventListener("click", () => {
      uiState.selectedAtlasNodeId = node.getAttribute("data-atlas-node");
      rerender();
    });
  });
}

function bindRouteListener() {
  if (uiState.routeBound) return;
  uiState.routeBound = true;

  window.addEventListener("hashchange", () => {
    const page = getPageFromHash();
    if (!page || page === uiState.currentPage) return;
    uiState.currentPage = page;
    rerender();
  });
}

function navigateTo(page) {
  if (!VALID_PAGES.has(page)) return;
  uiState.currentPage = page;
  setHash(page);
  rerender();
}

function rerender() {
  if (uiState.lastResult) {
    renderDashboard(uiState.lastResult, uiState.lastActions || {});
  }
}

function bindAtlasHover() {
  document.querySelectorAll("[data-atlas-root]").forEach(root => {
    const note = root.parentElement?.querySelector("[data-atlas-hover-note]");

    root.querySelectorAll("[data-atlas-node]").forEach(node => {
      node.addEventListener("mouseenter", () => {
        const nodeId = node.getAttribute("data-atlas-node");
        applyAtlasHover(root, nodeId);
        if (note) note.textContent = node.getAttribute("data-atlas-summary") || "";
      });

      node.addEventListener("mouseleave", () => {
        clearAtlasHover(root);
        if (note) note.textContent = note.getAttribute("data-default-note") || note.textContent;
      });
    });
  });
}

function applyAtlasHover(root, nodeId) {
  const directNodes = new Set([nodeId]);

  root.querySelectorAll("[data-edge-source]").forEach(edge => {
    const source = edge.getAttribute("data-edge-source");
    const target = edge.getAttribute("data-edge-target");
    const isDirect = source === nodeId || target === nodeId;
    edge.classList.toggle("is-hover-direct", isDirect);
    edge.classList.toggle("is-faded", !isDirect);

    if (isDirect) {
      directNodes.add(source);
      directNodes.add(target);
    }
  });

  root.querySelectorAll("[data-atlas-node]").forEach(node => {
    const currentId = node.getAttribute("data-atlas-node");
    node.classList.toggle("is-hover-direct", directNodes.has(currentId));
    node.classList.toggle("is-faded", !directNodes.has(currentId));
  });
}

function clearAtlasHover(root) {
  root.querySelectorAll(".is-hover-direct, .is-faded").forEach(node => {
    node.classList.remove("is-hover-direct", "is-faded");
  });
}

function renderPage(currentPage, result, diagnosis, models) {
  switch (currentPage) {
    case "why":
      return renderWhyPage(result, diagnosis, models.whyView);
    case "map":
      return renderMapPage(result, diagnosis, models.mapView);
    case "journey":
      return renderJourneyPage(result, diagnosis);
    case "today":
    default:
      return renderTodayPage(result, diagnosis, models.todayAtlas);
  }
}

function renderAppFrame(result, diagnosis, currentPage) {
  return `
    <header class="app-frame">
      <div class="app-frame-bar">
        <a class="app-frame-brand" href="../index.html">
          <span class="app-frame-mark">FL</span>
          <span>
            <strong>Fat Loss Diagnostic Guide</strong>
            <small>Physiological reasoning for fat loss</small>
          </span>
        </a>
        <div class="app-frame-actions">
          <a class="shell-link" href="../index.html">Website</a>
          <button id="download-report" class="secondary-button shell-utility-button">Download report</button>
        </div>
      </div>
      <div class="app-frame-context">
        ${renderAppHeader(result, diagnosis, currentPage)}
        ${renderLensSwitcher(currentPage)}
      </div>
    </header>
  `;
}

function renderLensSwitcher(currentPage) {
  return `
    <nav class="lens-switcher" aria-label="Guide lenses">
      ${APP_PAGES.map(page => `
        <button class="lens-pill ${page.id === currentPage ? "active" : ""}" data-page="${page.id}">
          <span class="lens-name">${escapeHtml(page.label)}</span>
          <span class="lens-hint">${escapeHtml(getLensHint(page.id))}</span>
        </button>
      `).join("")}
    </nav>
  `;
}

function getLensHint(pageId) {
  switch (pageId) {
    case "today": return "What is happening";
    case "why": return "Show me why";
    case "map": return "Explore the system";
    case "journey": return "See the story";
    default: return "";
  }
}

function renderAppHeader(result, diagnosis, currentPage) {
  const confidence = diagnosis.confidenceProfile?.overall;
  const dominantSystems = getDominantSystems(buildAtlasViewModel({
    graph: result.graph,
    diagnosis,
    mode: "diagnostic",
    selectedNodeId: uiState.selectedAtlasNodeId,
    selectedPathwayIndex: uiState.selectedPathwayIndex
  }));
  const diagnosisTitle = escapeHtml(result.report?.diagnosis?.title || "Diagnostic read");
  const confidenceLabel = escapeHtml(confidence?.label || `${result.report?.diagnosis?.confidence || "N/A"}%`);
  const dominantPathways = escapeHtml(dominantSystems.join(" · ") || "Systems");
  const pageLabel = currentPage === "map" || currentPage === "why"
    ? "Evidence Layer"
    : currentPage === "journey"
      ? "Progress Story"
      : "Today";

  return `
    <section class="app-context">
      <div class="atlas-title-block">
        <p class="eyebrow">${pageLabel}</p>
        <h1>${escapeHtml(getPageHeadline(currentPage))}</h1>
        <p class="summary">${escapeHtml(getPageSummary(currentPage))}</p>
      </div>
      <div class="app-context-meta">
        <article class="atlas-meta-card">
          <span>${diagnosisTitle}</span>
          <p>Current read</p>
        </article>
        <article class="atlas-meta-card">
          <span>${confidenceLabel}</span>
          <p>Confidence</p>
        </article>
        <article class="atlas-meta-card">
          <span>${dominantPathways}</span>
          <p>What matters most</p>
        </article>
      </div>
    </section>
  `;
}

function getPageHeadline(currentPage) {
  switch (currentPage) {
    case "why": return "Trace the cause-and-effect logic behind today’s answer.";
    case "map": return "Explore the physiological system as supporting evidence.";
    case "journey": return "Turn weight data into a readable fat-loss story.";
    case "today":
    default: return "Clear guidance for what is happening right now.";
  }
}

function getPageSummary(currentPage) {
  switch (currentPage) {
    case "why":
      return "Observation, evidence, mechanism, conclusion. This is the reasoning layer behind the guide’s recommendation.";
    case "map":
      return "Explore relationships, drivers, consequences, and related pathways without losing the atlas feel.";
    case "journey":
      return "Review how progress evolved week by week, while keeping raw records and check-ins in a supporting role.";
    case "today":
    default:
      return "Start with interpretation, not metrics. The guide answers what is happening, whether to worry, and what to do next.";
  }
}

function renderTodayPage(result, diagnosis, model) {
  const primary = diagnosis.recommendationPackage?.primary;
  const latestRow = getLatestRow(result.rawRows);
  const confidence = diagnosis.confidenceProfile?.overall;
  const supportingContext = buildTodayContext(result, diagnosis, latestRow);
  const supportingEvidence = diagnosis.primaryHypothesis?.supportingEvidence?.slice(0, 3) || [];

  return `
    <section class="page-flow today-page">
      <section class="today-hero">
        <article class="today-answer-sheet">
          <p class="eyebrow">Today</p>
          <h2>${escapeHtml(result.report?.diagnosis?.title || "No diagnosis available yet")}</h2>
          <p class="summary">${escapeHtml(result.report?.diagnosis?.summary || "Add data to generate an interpretation.")}</p>

          <dl class="today-answer-grid">
            <div class="today-answer-row">
              <dt>Status</dt>
              <dd>${escapeHtml(describeStatus(diagnosis, result))}</dd>
            </div>
            <div class="today-answer-row">
              <dt>Confidence</dt>
              <dd>${escapeHtml(confidence?.label || `${result.report?.diagnosis?.confidence || "N/A"}%`)}</dd>
            </div>
            <div class="today-answer-row">
              <dt>Most likely explanation</dt>
              <dd>${escapeHtml(diagnosis.primaryHypothesis?.label || result.report?.diagnosis?.title || "No strong explanation yet")}</dd>
            </div>
            <div class="today-answer-row">
              <dt>Recommendation</dt>
              <dd>${escapeHtml(primary?.message || result.report?.recommendation || "No recommendation available.")}</dd>
            </div>
          </dl>

          <div class="today-support-copy">
            <p class="eyebrow">Supporting context</p>
            <p>${escapeHtml(model.caption)}</p>
          </div>

          <div class="today-cta-row">
            <button class="primary-button" data-page="why">Show me why</button>
            <button class="secondary-button" data-page="map">Open the map</button>
            <button class="secondary-button" data-page="journey">See the journey</button>
          </div>
        </article>

        <aside class="today-support-rail">
          <article class="atlas-field-note">
            <div class="section-title atlas-section-title">
              <h2>What supports this read</h2>
              <span>At a glance</span>
            </div>
            <div class="today-context-list">
              ${supportingContext.map(item => `
                <div class="today-context-row">
                  <span>${escapeHtml(item.label)}</span>
                  <strong>${escapeHtml(item.value)}</strong>
                  <p>${escapeHtml(item.note)}</p>
                </div>
              `).join("")}
            </div>
          </article>

          <article class="atlas-field-note">
            <div class="section-title atlas-section-title">
              <h2>Why this is believable</h2>
              <span>Key evidence</span>
            </div>
            <ul class="evidence-list atlas-evidence-list">
              ${supportingEvidence.length
                ? supportingEvidence.map(item => `<li>${escapeHtml(formatLabel(item))}</li>`).join("")
                : "<li>No clear supporting evidence yet.</li>"}
            </ul>
          </article>

          <article class="atlas-field-note">
            <div class="section-title atlas-section-title">
              <h2>Latest check-in</h2>
              <span>Most recent entry</span>
            </div>
            <p class="today-latest-entry">
              ${escapeHtml(latestRow
                ? `${latestRow.date} · ${format(latestRow.bodyweight_kg)} kg · ${format(latestRow.calories, 0)} calories`
                : "No entries yet. Add a row or load a CSV to start the guide.")}
            </p>
          </article>
        </aside>
      </section>
    </section>
  `;
}

function renderWhyPage(result, diagnosis, model) {
  const explanationChain = buildWhyChain(model);
  const pathwayEvidence = diagnosis.primaryHypothesis?.supportingEvidence?.slice(0, 5) || [];

  return `
    <section class="page-flow why-page">
      <section class="why-explanation-grid">
        <article class="atlas-field-note why-trace-sheet">
          <p class="eyebrow">Observation to conclusion</p>
          <h3>${escapeHtml(model.activePathway?.label || "No pathway selected")}</h3>
          <p>${escapeHtml(model.activePathway?.narrative || model.caption)}</p>

          <div class="why-trace-list">
            ${explanationChain.map((step, index) => `
              <div class="why-trace-step">
                <span class="why-step-index">${index + 1}</span>
                <div>
                  <strong>${escapeHtml(step.title)}</strong>
                  <p>${escapeHtml(step.caption)}</p>
                </div>
              </div>
            `).join("")}
          </div>
        </article>

        <article class="atlas-field-note why-evidence-sheet">
          <div class="section-title atlas-section-title">
            <h2>Evidence behind this call</h2>
            <span>Confidence support</span>
          </div>
          <ul class="evidence-list atlas-evidence-list">
            ${pathwayEvidence.length
              ? pathwayEvidence.map(item => `<li>${escapeHtml(formatLabel(item))}</li>`).join("")
              : "<li>No direct evidence items available.</li>"}
          </ul>
          <div class="today-support-copy">
            <p class="eyebrow">Conclusion</p>
            <p>${escapeHtml(diagnosis.recommendationPackage?.primary?.message || result.report?.recommendation || "No recommendation available.")}</p>
          </div>
        </article>
      </section>

      ${renderAtlasScene(model, { interactive: true, pathwayMode: true })}
    </section>
  `;
}

function renderMapPage(result, diagnosis, model) {
  const details = model.nodeDetails || {};

  return `
    <section class="page-flow map-page">
      <section class="map-explorer-layout">
        <div class="map-explorer-canvas">
          ${renderAtlasScene(model, { interactive: true })}
        </div>
        <aside class="map-explorer-rail">
          <article class="atlas-field-note">
            <div class="section-title atlas-section-title">
              <h2>${escapeHtml(details.label || "Current focus")}</h2>
              <span>Selected mechanism</span>
            </div>
            <p class="summary small">${escapeHtml(details.description || "Select a part of the map to inspect what it means.")}</p>
          </article>

          <article class="atlas-field-note">
            <div class="section-title atlas-section-title">
              <h2>Causes</h2>
              <span>What may drive it</span>
            </div>
            <ul class="evidence-list atlas-evidence-list">
              ${renderListOrFallback((details.relationships || []).slice(0, 3).map(item => item.label), "No clear upstream relationships yet.")}
            </ul>
          </article>

          <article class="atlas-field-note">
            <div class="section-title atlas-section-title">
              <h2>Consequences</h2>
              <span>What it may influence</span>
            </div>
            <p class="summary small">${escapeHtml(details.coaching || "Use the connected pathways to understand downstream effects.")}</p>
          </article>

          <article class="atlas-field-note">
            <div class="section-title atlas-section-title">
              <h2>Related pathways</h2>
              <span>Evidence traces</span>
            </div>
            <ul class="evidence-list atlas-evidence-list">
              ${renderListOrFallback((details.evidence || []).slice(0, 4).map(formatLabel), "No related pathway evidence attached.")}
            </ul>
          </article>
        </aside>
      </section>
    </section>
  `;
}

function renderJourneyPage(result, diagnosis) {
  const timeline = result.timelineSummary;
  const latestRow = getLatestRow(result.rawRows);

  return `
    <section class="page-flow journey-page">
      <section class="journey-hero">
        <article class="today-answer-sheet journey-summary-sheet">
          <p class="eyebrow">Journey</p>
          <h2>${escapeHtml(timeline?.available ? "Your progress in phases" : "Your story will appear as data accumulates")}</h2>
          <p class="summary">${escapeHtml(timeline?.summary || "Load data or add daily entries to build a week-by-week story.")}</p>
          <div class="today-cta-row">
            <button class="secondary-button" data-page="today">Back to today</button>
            <button class="secondary-button" data-page="why">Open reasoning</button>
          </div>
        </article>

        <article class="atlas-field-note journey-context-sheet">
          <div class="section-title atlas-section-title">
            <h2>What has been happening</h2>
            <span>Recurring pattern</span>
          </div>
          <div class="today-context-list">
            <div class="today-context-row">
              <span>Weeks analysed</span>
              <strong>${escapeHtml(String(timeline?.weeksAnalysed || 0))}</strong>
              <p>${escapeHtml(timeline?.available ? "Built from weekly diagnostic windows." : "A story appears after enough check-ins are available.")}</p>
            </div>
            <div class="today-context-row">
              <span>Most common pattern</span>
              <strong>${escapeHtml(timeline?.dominantDiagnosis || result.report?.diagnosis?.title || "No dominant pattern yet")}</strong>
              <p>${escapeHtml(diagnosis.recommendationPackage?.modeLabel || formatLabel(diagnosis.recommendationMode || "no mode yet"))}</p>
            </div>
          </div>
        </article>
      </section>

      <section class="journey-layout">
        <article class="atlas-field-note journey-timeline-sheet">
          <div class="section-title atlas-section-title">
            <h2>Timeline</h2>
            <span>Week by week</span>
          </div>
          ${renderJourneyTimeline(timeline)}
        </article>

        <article class="atlas-field-note atlas-trend-panel">
          <div class="section-title atlas-section-title">
            <div>
              <p class="eyebrow">Trend context</p>
              <h2>Scale behaviour over time</h2>
            </div>
            <span>History</span>
          </div>
          ${
            result.chartData?.weightTrend?.length
              ? renderLineChart({
                  title: "Weight trend",
                  subtitle: "Daily bodyweight with the smoothing layer used by the diagnostic engine.",
                  data: result.chartData.weightTrend,
                  yKey: "weight",
                  secondaryYKey: "rollingWeight",
                  yLabel: "Daily weight",
                  secondaryLabel: "7-day average",
                  valueSuffix: "kg"
                })
              : `<p class="summary small">Weight trend will appear after data is loaded.</p>`
          }
        </article>
      </section>

      <section class="journey-records atlas-field-note atlas-checkin-panel">
        <div class="section-title atlas-section-title">
          <div>
            <p class="eyebrow">Records</p>
            <h2>Keep the story up to date</h2>
          </div>
          <span>Import, edit, export</span>
        </div>
        ${renderCheckInSummary(result.importSummary, result.importWarnings, latestRow)}
        ${renderManualEntryPanel(result.entryErrors, result.entrySuccess)}
        ${renderRecentEntries(result.rawRows)}
      </section>
    </section>
  `;
}

function renderBottomNav() {
  return "";
}

function renderCheckInSummary(importSummary, importWarnings = [], latestRow) {
  return `
    <div class="check-in-summary-grid">
      <article class="check-in-summary-card">
        <p class="eyebrow">Rows loaded</p>
        <h3>${importSummary?.totalRows || 0}</h3>
        <p>${escapeHtml(importSummary ? `From ${importSummary.firstDate} to ${importSummary.lastDate}.` : "Demo or local rows are active.")}</p>
      </article>

      <article class="check-in-summary-card">
        <p class="eyebrow">Latest check-in</p>
        <h3>${escapeHtml(latestRow?.date || "No entries")}</h3>
        <p>${escapeHtml(latestRow ? `Weight ${format(latestRow.bodyweight_kg)} kg · Calories ${format(latestRow.calories, 0)}.` : "Add a row to start the guide.")}</p>
      </article>

      <article class="check-in-summary-card">
        <p class="eyebrow">CSV import</p>
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
        ${inputField("bodyweight_kg", "Body Weight", "number", "", "0.1")}
        ${inputField("calories", "Calories", "number")}
        ${inputField("protein_g", "Protein", "number")}
        ${inputField("steps", "Activity / Steps", "number")}
        ${inputField("sleep_hours", "Sleep Hours", "number", "", "0.1")}
        ${inputField("sleep_quality", "Sleep Quality 1-5", "number", "", "0.5")}
        ${inputField("training_load", "Training Load 1-10", "number", "", "0.5")}
      </div>

      <div class="entry-actions">
        <button id="save-entry" class="primary-button">Save check-in</button>
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

function renderJourneyTimeline(summary) {
  if (!summary?.available || !summary.items?.length) {
    return `<p class="summary">No journey narrative is available yet. Add more check-ins to build weekly phases.</p>`;
  }

  return `
    <div class="journey-timeline-list">
      ${summary.items.map(item => `
        <article class="journey-timeline-item">
          <div class="journey-week-marker">Week ${escapeHtml(String(item.week))}</div>
          <div class="journey-week-body">
            <h3>${escapeHtml(item.diagnosis)}</h3>
            <p>${escapeHtml(buildJourneySentence(item))}</p>
            <div class="journey-week-meta">
              <span>${escapeHtml(item.dateRange)}</span>
              <span>${escapeHtml(`${item.confidence}% confidence`)}</span>
              <span>${escapeHtml(`Masking risk: ${item.maskingRisk}`)}</span>
            </div>
          </div>
        </article>
      `).join("")}
    </div>
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

function renderListOrFallback(items, fallback) {
  return items.length
    ? items.map(item => `<li>${escapeHtml(item)}</li>`).join("")
    : `<li>${escapeHtml(fallback)}</li>`;
}

function buildJourneySentence(item) {
  return `Expected fat change was ${item.expectedLoss} kg/wk, observed scale change was ${item.observedLoss} kg/wk, adherence was ${item.adherenceScore}%, and the guide read momentum as ${String(item.weightMomentum).toLowerCase()}.`;
}

function buildTodayContext(result, diagnosis, latestRow) {
  return [
    {
      label: "Expected fat change",
      value: `${format(result.analytics?.metrics?.expectedLossPerWeek)} kg/wk`,
      note: "Estimated from intake, expenditure, and recent trend."
    },
    {
      label: "Estimated water effect",
      value: describeWaterContext(diagnosis),
      note: "A plain-language read on whether scale movement may be masked."
    },
    {
      label: "Weight trend direction",
      value: describeTrendDirection(result.analytics?.metrics?.observedLossPerWeek),
      note: latestRow ? `Most recent check-in: ${latestRow.date}.` : "Add a recent check-in to sharpen the read."
    }
  ];
}

function buildWhyChain(model) {
  const nodeIndex = new Map(model.nodes.map(node => [node.id, node]));
  const chain = model.activePathway?.nodeIds?.length
    ? model.activePathway.nodeIds
    : [model.selectedNode?.id].filter(Boolean);

  return chain.map((nodeId, index) => {
    const node = nodeIndex.get(nodeId);
    return {
      title: node?.label || formatLabel(nodeId),
      caption: index === chain.length - 1
        ? "This is where the explanation lands."
        : "This contributes to the next step in the reasoning."
    };
  });
}

function describeStatus(diagnosis, result) {
  if (diagnosis.recommendationMode === "recommendation_mode_monitor_only") {
    return "Hold steady while the picture becomes clearer.";
  }

  if (diagnosis.recommendationMode === "recommendation_mode_referral_first") {
    return "Use a safety-first response before making aggressive changes.";
  }

  if (diagnosis.recommendationMode === "recommendation_mode_conservative") {
    return "A real constraint is shaping progress and should be handled first.";
  }

  return result.report?.diagnosis?.title || "Progress can be interpreted with confidence.";
}

function describeWaterContext(diagnosis) {
  const activated = diagnosis.activatedNodeIds || [];

  if (activated.some(id => id.includes("water_retention") || id.includes("glycogen") || id.includes("inflammation"))) {
    return "Higher";
  }

  if (activated.some(id => id.includes("scale_noise") || id.includes("trend_confidence"))) {
    return "Unclear";
  }

  return "Lower";
}

function describeTrendDirection(observedLossPerWeek) {
  const value = Number(observedLossPerWeek);
  if (!Number.isFinite(value)) return "Unclear";
  if (value > 0.15) return "Moving down";
  if (value < -0.15) return "Moving up";
  return "Mostly stable";
}

function getDominantSystems(model) {
  const labels = model.nodes
    .filter(node => model.activePathway?.nodeIds?.includes(node.id))
    .map(node => node.region)
    .filter(region => region && region !== "inputs" && region !== "outcomes");

  return Array.from(new Set(labels)).slice(0, 4).map(region => formatLabel(region));
}

function getLatestRow(rows = []) {
  if (!rows.length) return null;
  return [...rows].sort((a, b) => new Date(b.date) - new Date(a.date))[0];
}

export function renderError(error) {
  console.error(error);

  const root = document.querySelector("#app");
  if (!root) return;

  root.innerHTML = `
    <section class="error">
      <p class="eyebrow">Fat Loss Diagnostic Guide</p>
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
