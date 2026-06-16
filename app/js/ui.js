import { buildAtlasViewModel } from "../../graph/atlasAdapter.js";
import { attachNeighborMetadata, renderAtlasScene } from "../../graph/atlasRenderer.js";
import { downloadMarkdownReport } from "../../reports/downloadReport.js";
import { getTodayDateString } from "./dataEntry.js";
import { renderLineChart } from "./charts.js";

const APP_PAGES = [
  { id: "diagnostic", label: "Diagnostic View" },
  { id: "atlas", label: "Atlas Hero View" },
  { id: "pathway", label: "Pathway View" }
];

const uiState = {
  currentPage: "diagnostic",
  selectedAtlasNodeId: null,
  selectedPathwayIndex: 0
};

export function renderDashboard(result, actions = {}) {
  const root = document.querySelector("#app");
  if (!root) return;

  const diagnosis = result.diagnosisRaw || {};
  const diagnosticAtlas = buildModel(result, diagnosis, "diagnostic");
  const atlasView = buildModel(result, diagnosis, "atlas");
  const pathwayView = buildModel(result, diagnosis, "pathway");
  const currentPage = APP_PAGES.some(page => page.id === uiState.currentPage)
    ? uiState.currentPage
    : "diagnostic";

  root.innerHTML = `
    <section class="shell atlas-app-shell">
      ${renderAppHeader(result, diagnosis, currentPage)}
      <main class="atlas-page-shell atlas-page-shell-${currentPage}">
        ${renderPage(currentPage, result, diagnosis, {
          diagnosticAtlas,
          atlasView,
          pathwayView
        })}
      </main>
      ${renderBottomNav(currentPage)}
    </section>
  `;

  bindEvents(actions, result, {
    diagnosticAtlas,
    atlasView,
    pathwayView
  });
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
      uiState.currentPage = "diagnostic";
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

  document.querySelectorAll("[data-pathway-index]").forEach(button => {
    button.addEventListener("click", () => {
      uiState.selectedPathwayIndex = Number(button.getAttribute("data-pathway-index")) || 0;
      const pathwayNode = models.pathwayView.pathways[uiState.selectedPathwayIndex]?.nodeIds?.[0];
      if (pathwayNode) uiState.selectedAtlasNodeId = pathwayNode;
      renderDashboard(result, actions);
    });
  });

  bindAtlasHover();

  document.querySelectorAll("[data-atlas-node]").forEach(node => {
    node.addEventListener("click", () => {
      uiState.selectedAtlasNodeId = node.getAttribute("data-atlas-node");
      renderDashboard(result, actions);
    });
  });
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
    case "atlas":
      return renderAtlasPage(result, diagnosis, models.atlasView);
    case "pathway":
      return renderPathwayPage(result, diagnosis, models.pathwayView);
    case "diagnostic":
    default:
      return renderDiagnosticPage(result, diagnosis, models.diagnosticAtlas);
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
  const isPosterPage = currentPage === "atlas" || currentPage === "pathway";

  if (isPosterPage) {
    const posterLabel = currentPage === "atlas" ? "Atlas Hero View" : "Pathway View";
    const posterSummary = currentPage === "atlas"
      ? "The atlas is the page: a standalone physiological plate built from the diagnostic graph, with outcomes at the crown, system hubs in the field, and foundation inputs feeding the map."
      : "Reasoning becomes visible here. The same atlas plate is used as the stage for diagnostic routes, with focused pathways inked across the systems that matter.";

    return `
      <header class="app-header atlas-header atlas-header-poster">
        <div class="atlas-title-block">
          <p class="eyebrow">${posterLabel}</p>
          <h1>A living map of the human fat-loss system.</h1>
          <p class="summary">${posterSummary}</p>
        </div>

        <div class="atlas-header-ledger">
          <span><strong>${diagnosisTitle}</strong> current diagnostic state</span>
          <span><strong>${confidenceLabel}</strong> confidence</span>
          <span><strong>${dominantPathways}</strong> dominant pathways</span>
          <button id="download-report" class="secondary-button">Download report</button>
        </div>
      </header>
    `;
  }

  return `
    <header class="app-header atlas-header">
      <div class="atlas-title-block">
        <p class="eyebrow">Fat Loss Diagnostic Atlas</p>
        <h1>A living map of the human fat-loss system.</h1>
        <p class="summary">
          The diagnostic engine stays intact underneath. What changes here is the language: outcomes, systems, and inputs arranged like a physiological atlas instead of a graph application.
        </p>
      </div>

      <div class="atlas-header-meta">
        <article class="atlas-meta-card">
          <span>${diagnosisTitle}</span>
          <p>Current diagnostic state</p>
        </article>
        <article class="atlas-meta-card">
          <span>${confidenceLabel}</span>
          <p>Confidence</p>
        </article>
        <article class="atlas-meta-card">
          <span>${dominantPathways}</span>
          <p>Dominant pathways</p>
        </article>
        <button id="download-report" class="secondary-button">Download report</button>
      </div>
    </header>
  `;
}

function renderDiagnosticPage(result, diagnosis, model) {
  const primary = diagnosis.recommendationPackage?.primary;
  const dominantSystems = getDominantSystems(model);
  const latestRow = getLatestRow(result.rawRows);

  return `
    <section class="page-flow">
      <section class="atlas-hero-grid">
        <article class="atlas-narrative-panel">
          <p class="eyebrow">Diagnostic View</p>
          <h2>${escapeHtml(result.report?.diagnosis?.title || "No diagnosis available yet")}</h2>
          <p class="summary">${escapeHtml(result.report?.diagnosis?.summary || "Add data to generate a physiological read.")}</p>

          <div class="atlas-chip-row">
            ${dominantSystems.map(system => atlasChip(system)).join("")}
          </div>

          <div class="atlas-reading-panel">
            <p class="eyebrow">What the map is saying</p>
            <p>${escapeHtml(model.caption)}</p>
          </div>

          <div class="atlas-recommendation-band">
            <div>
              <p class="eyebrow">Current recommendation</p>
              <h3>${escapeHtml(primary?.label || "No active recommendation")}</h3>
              <p>${escapeHtml(primary?.message || result.report?.recommendation || "No recommendation available.")}</p>
            </div>
            <button class="primary-button" data-page="pathway">Open pathway view</button>
          </div>
        </article>

        <article class="atlas-mini-panel">
          <div class="section-title">
            <h2>Diagnostic atlas overlay</h2>
            <span>Why the weight trend looks this way</span>
          </div>
          ${renderAtlasScene(model, { interactive: false, compact: true })}
        </article>
      </section>

      <section class="atlas-info-grid">
        <article class="panel atlas-text-panel">
          <div class="section-title">
            <h2>Observed state</h2>
            <span>Current metrics</span>
          </div>
          <div class="atlas-stat-grid">
            ${atlasStat("Observed loss", `${format(result.analytics?.metrics?.observedLossPerWeek)} kg/wk`)}
            ${atlasStat("Expected loss", `${format(result.analytics?.metrics?.expectedLossPerWeek)} kg/wk`)}
            ${atlasStat("Weight volatility", `${format(result.analytics?.metrics?.weightVolatility)} kg`)}
            ${atlasStat("Latest weight", latestRow ? `${format(latestRow.bodyweight_kg)} kg` : "N/A")}
          </div>
        </article>

        <article class="panel atlas-text-panel">
          <div class="section-title">
            <h2>Evidence in play</h2>
            <span>Signals behind the read</span>
          </div>
          <ul class="evidence-list">
            ${(result.report?.evidence || []).length
              ? result.report.evidence.map(item => `<li>${escapeHtml(formatLabel(item))}</li>`).join("")
              : "<li>No evidence items available.</li>"}
          </ul>
        </article>
      </section>

      <section class="panel atlas-trend-panel">
        <div class="section-title">
          <div>
            <p class="eyebrow">Trend context</p>
            <h2>Scale behaviour over time</h2>
          </div>
          <button class="secondary-button" data-page="atlas">Open atlas</button>
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
      </section>

      <section class="panel atlas-checkin-panel">
        <div class="section-title">
          <div>
            <p class="eyebrow">Check-in</p>
            <h2>Update the live physiological map</h2>
          </div>
          <span>Static app, live diagnosis flow</span>
        </div>
        ${renderCheckInSummary(result.importSummary, result.importWarnings, latestRow)}
        ${renderManualEntryPanel(result.entryErrors, result.entrySuccess)}
        ${renderRecentEntries(result.rawRows)}
      </section>
    </section>
  `;
}

function renderAtlasPage(result, diagnosis, model) {
  return `
    <section class="page-flow atlas-hero-page">
      <section class="atlas-hero-intro">
        <div>
          <p class="eyebrow">Atlas Hero View</p>
          <h2>The standalone physiological plate</h2>
        </div>
        <p class="summary">
          This is the screenshot moment: the fat-loss system rendered as a scientific atlas, with outcomes at the top, systems clustered through the middle, and inputs feeding the map from below.
        </p>
      </section>

      ${renderAtlasScene(model, { interactive: true })}
    </section>
  `;
}

function renderPathwayPage(result, diagnosis, model) {
  return `
    <section class="page-flow atlas-hero-page">
      <section class="atlas-hero-intro atlas-hero-intro-pathway">
        <div>
          <p class="eyebrow">Pathway View</p>
          <h2>Reasoning becoming visible</h2>
        </div>
        <p class="summary">
          Each selected explanation traces itself across the same atlas plate, so the logic feels like a pathway through the physiology rather than a list of disconnected reasons.
        </p>
      </section>

      <section class="atlas-pathway-controls">
        ${model.pathways.map((pathway, index) => `
          <button
            class="pathway-pill ${index === uiState.selectedPathwayIndex ? "active" : ""}"
            data-pathway-index="${index}"
          >
            ${escapeHtml(pathway.label)}
          </button>
        `).join("")}
      </section>

      <section class="atlas-pathway-story">
        <p class="eyebrow">Selected pathway</p>
        <h3>${escapeHtml(model.activePathway?.label || "No pathway selected")}</h3>
        <p>${escapeHtml(model.activePathway?.narrative || model.caption)}</p>
      </section>

      ${renderAtlasScene(model, { interactive: true, pathwayMode: true })}
    </section>
  `;
}

function renderBottomNav(currentPage) {
  return `
    <nav class="bottom-nav atlas-bottom-nav">
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
        <p class="eyebrow">Rows loaded</p>
        <h3>${importSummary?.totalRows || 0}</h3>
        <p>${escapeHtml(importSummary ? `From ${importSummary.firstDate} to ${importSummary.lastDate}.` : "Demo or local rows are active.")}</p>
      </article>

      <article class="check-in-summary-card">
        <p class="eyebrow">Latest check-in</p>
        <h3>${escapeHtml(latestRow?.date || "No entries")}</h3>
        <p>${escapeHtml(latestRow ? `Weight ${format(latestRow.bodyweight_kg)} kg · Calories ${format(latestRow.calories, 0)}.` : "Add a row to start the atlas diagnosis.")}</p>
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

function atlasStat(label, value) {
  return `
    <article class="atlas-stat">
      <p>${escapeHtml(label)}</p>
      <strong>${escapeHtml(value)}</strong>
    </article>
  `;
}

function atlasChip(label) {
  return `<span class="atlas-chip">${escapeHtml(label)}</span>`;
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
      <p class="eyebrow">Fat Loss Diagnostic Atlas</p>
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
