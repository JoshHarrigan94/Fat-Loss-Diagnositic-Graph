/**
 * app.js
 *
 * Main orchestration layer.
 */

import { PATHS, USER_CONFIG } from "./config.js";
import { renderDashboard, renderError } from "./ui.js";

import { parseCSV } from "../../data/importer.js";

import { analyseTrends } from "../../analytics/trends.js";
import { analyseAdherence } from "../../analytics/adherence.js";
import { analyseDeficit } from "../../analytics/deficit.js";

import { evaluateRules } from "../../rules/diagnosticEngine.js";

import {
  createGraph,
  printGraphSummary
} from "../../graph/graphEngine.js";

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
  const adherence = analyseAdherence(rawRows, USER_CONFIG);
  const deficit = analyseDeficit(rawRows, USER_CONFIG);

  const enrichedSignals = {
    ...analytics.signals,
    ...deficit.flags,

    calorieVariabilityHigh:
      analytics.signals.calorieVariabilityHigh ||
      adherence.flags.calorieVariabilityHigh,

    weekendCaloriesHigher:
      analytics.signals.weekendCaloriesHigher ||
      adherence.flags.weekendDriftHigh,

    proteinLow:
      analytics.signals.proteinLow ||
      adherence.flags.proteinInconsistent
  };

  const enrichedAnalytics = {
    ...analytics,
    adherence,
    deficit,
    signals: enrichedSignals
  };

  const diagnoses = evaluateRules(
    rules,
    enrichedAnalytics.signals
  );

  const graph = createGraph(nodes, edges);

  const prediction = predictWeightTrend(enrichedAnalytics);

  const report = generateDiagnosticReport({
    analytics: enrichedAnalytics,
    diagnoses,
    graph
  });

  const markdown = reportToMarkdown(report);

  logDiagnostics({
    analytics: enrichedAnalytics,
    adherence,
    deficit,
    diagnoses,
    graph,
    prediction,
    report,
    markdown
  });

  return {
    rawRows,
    analytics: enrichedAnalytics,
    adherence,
    deficit,
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
  adherence,
  deficit,
  diagnoses,
  graph,
  prediction,
  report,
  markdown
}) {
  console.log("Graph summary:", printGraphSummary(graph));
  console.log("Analytics:", analytics);
  console.log("Adherence:", adherence);
  console.log("Deficit:", deficit);
  console.log("Diagnoses:", diagnoses);
  console.log("Prediction:", prediction);

  reportToConsole(report);

  console.log("Markdown report:");
  console.log(markdown);
}