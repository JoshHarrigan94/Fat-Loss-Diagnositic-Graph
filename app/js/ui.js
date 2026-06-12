/**
 * ui.js
 *
 * Presentation helpers for the iPad-first interface.
 *
 * Purpose:
 * - Keep HTML rendering out of app.js
 * - Render diagnosis, metrics, graph pathways, prediction and debug views
 * - Make the UI layer replaceable without touching the engine
 */

export function renderDashboard(result) {
  const root = document.querySelector("#app");

  if (!root) return;

  const { report, analytics, diagnoses, prediction } = result;

  root.innerHTML = `
    <section class="shell">
      ${renderHero(report)}
      ${renderCoreMetrics(report)}
      ${renderPredictionMetrics(prediction)}
      ${renderDiagnosticGrid(report, diagnoses)}
      ${renderRecommendation(report)}
      ${renderSignalAudit(analytics)}
    </section>
  `;
}

export function renderHero(report) {
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

export function renderCoreMetrics(report) {
  return `
    <section class="metrics-grid">
      ${metricCard("Expected loss", `${report.metrics.expectedLossPerWeek} kg/week`)}
      ${metricCard("Observed loss", `${report.metrics.observedLossPerWeek} kg/week`)}
      ${metricCard("Mismatch", `${report.metrics.mismatchKgPerWeek} kg/week`)}
      ${metricCard("Volatility", `${report.metrics.weightVolatility} kg`)}
    </section>
  `;
}

export function renderPredictionMetrics(prediction) {
  return `
    <section class="metrics-grid">
      ${metricCard("Current weight", `${format(prediction.currentWeight)} kg`)}
      ${metricCard("7-day prediction", `${format(prediction.predicted7Day)} kg`)}
      ${metricCard("14-day prediction", `${format(prediction.predicted14Day)} kg`)}
      ${metricCard("Prediction confidence", `${prediction.confidence}%`)}
    </section>
  `;
}

export function renderDiagnosticGrid(report, diagnoses) {
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
          <h2>Knowledge graph pathways</h2>
          <span>Explainability layer</span>
        </div>

        <ul class="path-list">
          ${report.graphPaths.map((path) => `<li>${escapeHtml(path)}</li>`).join("")}
        </ul>
      </article>
    </section>
  `;
}

export function renderRecommendation(report) {
  return `
    <section class="panel recommendation">
      <p class="eyebrow">Recommended action</p>
      <h2>${escapeHtml(report.recommendation)}</h2>
    </section>
  `;
}

export function renderSignalAudit(analytics) {
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

function metricCard(label, value) {
  return `
    <article class="metric-card">
      <p>${escapeHtml(label)}</p>
      <strong>${escapeHtml(value)}</strong>
    </article>
  `;
}

function format(value) {
  if (
    value === null ||
    value === undefined ||
    Number.isNaN(value)
  ) {
    return "N/A";
  }

  return Number(value).toFixed(2);
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}