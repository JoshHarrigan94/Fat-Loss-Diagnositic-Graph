/**
 * app.js
 *
 * Application orchestration layer.
 *
 * Purpose:
 * - Load demo data
 * - Load graph and rules
 * - Run analytics
 * - Run diagnostic rules
 * - Generate report
 * - Expose the result for UI rendering
 */

import { parseCSV } from "../../data/importer.js";
import { analyseTrends } from "../../analytics/trends.js";
import { evaluateRules } from "../../rules/diagnosticEngine.js";
import { createGraph, printGraphSummary } from "../../graph/graphEngine.js";
import {
  generateDiagnosticReport,
  reportToMarkdown,
  reportToConsole
} from "../../reports/reportGenerator.js";

const APP_CONFIG = {
  estimatedMaintenanceCalories: 3700,
  proteinTarget: 180,
  sleepHourTarget: 7,
  sleepQualityTarget: 3.5
};

export async function runDiagnosticEngine() {
  const [csvText, nodes, edges, rules] = await Promise.all([
    fetch("../data/sample.csv").then((res) => res.text()),
    fetch("../graph/nodes.json").then((res) => res.json()),
    fetch("../graph/edges.json").then((res) => res.json()),
    fetch("../rules/rules.json").then((res) => res.json())
  ]);

  const rawRows = parseCSV(csvText);
  const analytics = analyseTrends(rawRows, APP_CONFIG);
  const diagnoses = evaluateRules(rules, analytics.signals);
  const graph = createGraph(nodes, edges);

  const report = generateDiagnosticReport({
    analytics,
    diagnoses,
    graph
  });

  const markdown = reportToMarkdown(report);

  console.log("Graph summary:", printGraphSummary(graph));
  console.log("Analytics:", analytics);
  console.log("Diagnoses:", diagnoses);
  reportToConsole(report);
  console.log(markdown);

  return {
    rawRows,
    analytics,
    diagnoses,
    graph,
    report,
    markdown
  };
}

export function renderBasicReport(result) {
  const root = document.querySelector("#app");

  if (!root) {
    console.warn("No #app element found.");
    return;
  }

  const { report, analytics, diagnoses } = result;

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
          <p>Confidence</p>
        </div>
      </header>

      <section class="metrics-grid">
        ${metricCard(
          "Expected loss",
          `${report.metrics.expectedLossPerWeek} kg/week`
        )}
        ${metricCard(
          "Observed loss",
          `${report.metrics.observedLossPerWeek} kg/week`
        )}
        ${metricCard(
          "Mismatch",
          `${report.metrics.mismatchKgPerWeek} kg/week`
        )}
        ${metricCard(
          "Weight volatility",
          `${report.metrics.weightVolatility} kg`
        )}
      </section>

      <section class="content-grid">
        <article class="panel">
          <div class="section-title">
            <h2>Evidence</h2>
            <span>${diagnoses.length} rule(s) triggered</span>
          </div>

          <ul class="evidence-list">
            ${report.evidence
              .map((item) => `<li>${item}</li>`)
              .join("")}
          </ul>
        </article>

        <article class="panel">
          <div class="section-title">
            <h2>Knowledge graph pathways</h2>
            <span>Explainability layer</span>
          </div>

          <ul class="path-list">
            ${report.graphPaths
              .map((path) => `<li>${path}</li>`)
              .join("")}
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

document.addEventListener("DOMContentLoaded", async () => {
  try {
    const result = await runDiagnosticEngine();
    renderBasicReport(result);

    window.FatLossDiagnosticGraph = result;
  } catch (error) {
    console.error(error);

    const root = document.querySelector("#app");

    if (root) {
      root.innerHTML = `
        <section class="error">
          <h1>Diagnostic engine failed to run</h1>
          <p>${error.message}</p>
        </section>
      `;
    }
  }
});