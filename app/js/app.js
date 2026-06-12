/**
 * app.js
 *
 * Main orchestration layer.
 *
 * Flow:
 * Load data
 * → analyse trends
 * → evaluate rules
 * → create graph
 * → predict trend
 * → generate report
 * → render UI
 */

import { PATHS, USER_CONFIG } from "./config.js";
import { renderDashboard, renderError } from "./ui.js";

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

    renderDashboard(result);

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

  logDiagnostics({
    analytics,
    diagnoses,
    graph,
    prediction,
    report,
    markdown
  });

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

function logDiagnostics({
  analytics,
  diagnoses,
  graph,
  prediction,
  report,
  markdown
}) {
  console.log("Graph summary:", printGraphSummary(graph));
  console.log("Analytics:", analytics);
  console.log("Diagnoses:", diagnoses);
  console.log("Prediction:", prediction);

  reportToConsole(report);

  console.log("Markdown report:");
  console.log(markdown);
}