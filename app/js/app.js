/**
 * app.js
 *
 * Main orchestration layer.
 */

import { PATHS, USER_CONFIG } from "./config.js";

import { parseCSV } from "../../data/importer.js";
import { analyseTrends } from "../../analytics/trends.js";
import { evaluateRules } from "../../rules/diagnosticEngine.js";
import { createGraph, printGraphSummary } from "../../graph/graphEngine.js";
import { predictWeightTrend } from "../../ml/prediction.js";

import {
  generateDiagnosticReport,
  reportToMarkdown,
  reportToConsole
} from "../../reports/reportGenerator.js";

document.addEventListener("DOMContentLoaded", async () => {
  try {
    const result = await runDiagnosticEngine();

    renderBasicReport(result);

    window.FatLossDiagnosticGraph = result;
  } catch (error) {
    renderError(error);
  }
});

export async function runDiagnosticEngine() {
  const [csvText, nodes, edges, rules] = await Promise.all([
    loadText(PATHS.sampleData),
    loadJson(PATHS.graphNodes),
    loadJson(PATHS.graphEdges),
    loadJson(PATHS.rules)
  ]);

  const rawRows = parseCSV(csvText);

  const analytics = analyseTrends(rawRows, USER_CONFIG);

  const diagnoses = evaluateRules(
    rules,
    analytics.signals
  );

  const graph = createGraph(nodes, edges);

  const prediction = predictWeightTrend(analytics);

  const report = generateDiagnosticReport({
    analytics,
    diagnoses,
    graph
  });

  const markdown = reportToMarkdown(report);

  console.log("Graph summary:", printGraphSummary(graph));
  console.log("Analytics:", analytics);
  console.log("Diagnoses:", diagnoses);
  console.log("Prediction:", prediction);

  reportToConsole(report);
  console.log(markdown);

  return {
    rawRows,
    analytics,
    diagnoses,
    graph,
    prediction,
    report,
    markdown
  };
}

async function loadJson(path) {
  const response = await fetch(path);

  if (!response.ok) {
    throw new Error(`Failed to load JSON: ${path}`);
  }

  return response.json();
}

async function loadText(path) {
  const response = await fetch(path);

  if (!response.ok) {
    throw new Error(`Failed to load text file: ${path}`);
  }

  return response.text();
}

function renderBasicReport(result) {
  const root = document.querySelector("#app");

  if (!root) return;

  const { report, analytics, diagnoses, prediction } = result;

  root.innerHTML = `
    <section class="shell">
      <header class="hero">
        <div>
          <p class="eyebrow">Fat Loss Diagnostic Graph</p>
          <h1>${report.diagnosis.title}</h1>
          <p class="summary">${report.diagnosis.summary}</p>
        </div>

        <div class="confidence-card">
          <span>${report.diagnosis.confidence}%</span>
          <p>Diagnostic confidence</p>
        </div>
      </header>

      <section class="metrics-grid">
        ${metricCard("Expected loss", `${report.metrics.expectedLossPerWeek} kg/week`)}
        ${metricCard("Observed loss", `${report.metrics.observedLossPerWeek} kg/week`)}
        ${metricCard("Mismatch", `${report.metrics.mismatchKgPerWeek} kg/week`)}
        ${metricCard("Volatility", `${report.metrics.weightVolatility} kg`)}
      </section>

      <section class="metrics-grid">
        ${metricCard("Current weight", `${format(prediction.currentWeight)} kg`)}
        ${metricCard("7-day prediction", `${format(prediction.predicted7Day)} kg`)}
        ${metricCard("14-day prediction", `${format(prediction.predicted14Day)} kg`)}
        ${metricCard("Prediction confidence", `${prediction.confidence}%`)}
      </section>

      <section class="content-grid">
        <article class="panel">
          <div class="section-title">
            <h2>Evidence</h2>
            <span>${diagnoses.length} rule(s) triggered</span>
          </div>

          <ul class="evidence-list">
            ${report.evidence.map((item) => `<li>${item}</li>`).join("")}
          </ul>
        </article>

        <article class="panel">
          <div class="section-title">
            <h2>Knowledge graph pathways</h2>
            <span>Explainability layer</span>
          </div>

          <ul class="path-list">
            ${report.graphPaths.map((path) => `<li>${path}</li>`).join("")}
          </ul>
        </article>
      </section>

      <section class="panel recommendation">
        <p class="eyebrow">Recommended action</p>
        <h2>${report.recommendation}</h2>
      </section>

      <section class="panel debug">
        <div class="section-title">
          <h2>Signal audit</h2>
          <span>Rules input</span>
        </div>

        <pre>${JSON.stringify(analytics.signals, null, 2)}</pre>
      </section>
    </section>
  `;
}

function metricCard(label, value) {
  return `
    <article class="metric-card">
      <p>${label}</p>
      <strong>${value}</strong>
    </article>
  `;
}

function renderError(error) {
  console.error(error);

  const root = document.querySelector("#app");

  if (!root) return;

  root.innerHTML = `
    <section class="error">
      <p class="eyebrow">Fat Loss Diagnostic Graph</p>
      <h1>Diagnostic engine failed to run</h1>
      <p>${error.message}</p>
    </section>
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