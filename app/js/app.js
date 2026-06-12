/**
 * app.js
 *
 * Main orchestration layer.
 */

import { PATHS, USER_CONFIG } from "./config.js";
import { renderDashboard, renderError } from "./ui.js";

import { parseCSV, importCSV } from "../../data/importer.js";

import { analyseTrends } from "../../analytics/trends.js";
import { analyseAdherence } from "../../analytics/adherence.js";
import { analyseDeficit } from "../../analytics/deficit.js";
import { analyseWeightSignal } from "../../analytics/weightSignal.js";

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

let appResources = null;

document.addEventListener("DOMContentLoaded", async () => {
  try {
    appResources = await loadResources();

    const csvText = await loadText(PATHS.sampleData);
    const rawRows = parseCSV(csvText);

    const result = runDiagnosticFromRows(rawRows, appResources);

    renderDashboard(result, {
      onCsvUpload: handleCsvUpload
    });

    window.FatLossDiagnosticGraph = result;
  } catch (error) {
    renderError(error);
  }
});

async function handleCsvUpload(file) {
  try {
    const imported = await importCSV(file);

    if (!imported.validation.valid) {
      throw new Error(
        `CSV validation failed. Missing columns: ${imported.validation.missingColumns.join(", ")}`
      );
    }

    const result = runDiagnosticFromRows(imported.rows, appResources);

    result.importSummary = imported.summary;
    result.importWarnings = imported.validation.warnings;

    renderDashboard(result, {
      onCsvUpload: handleCsvUpload
    });

    window.FatLossDiagnosticGraph = result;
  } catch (error) {
    renderError(error);
  }
}

async function loadResources() {
  const [nodes, edges, rules] = await Promise.all([
    loadJson(PATHS.graphNodes),
    loadJson(PATHS.graphEdges),
    loadJson(PATHS.rules)
  ]);

  return { nodes, edges, rules };
}

export function runDiagnosticFromRows(rawRows, resources) {
  const trends = analyseTrends(rawRows, USER_CONFIG);
  const adherence = analyseAdherence(rawRows, USER_CONFIG);
  const deficit = analyseDeficit(rawRows, USER_CONFIG);
  const weightSignal = analyseWeightSignal(rawRows, USER_CONFIG);

  const enrichedSignals = {
    ...trends.signals,
    ...deficit.flags,
    ...weightSignal.flags,

    calorieVariabilityHigh:
      trends.signals.calorieVariabilityHigh ||
      adherence.flags.calorieVariabilityHigh,

    weekendCaloriesHigher:
      trends.signals.weekendCaloriesHigher ||
      adherence.flags.weekendDriftHigh,

    proteinLow:
      trends.signals.proteinLow ||
      adherence.flags.proteinInconsistent
  };

  const analytics = {
    ...trends,
    adherence,
    deficit,
    weightSignal,
    signals: enrichedSignals
  };

  const diagnoses = evaluateRules(resources.rules, analytics.signals);
  const graph = createGraph(resources.nodes, resources.edges);
  const prediction = predictWeightTrend(analytics);

  const report = generateDiagnosticReport({
    analytics,
    diagnoses,
    graph
  });

  const markdown = reportToMarkdown(report);

  logDiagnostics({
    analytics,
    adherence,
    deficit,
    weightSignal,
    diagnoses,
    graph,
    prediction,
    report,
    markdown
  });

  return {
    rawRows,
    analytics,
    adherence,
    deficit,
    weightSignal,
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
  weightSignal,
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
  console.log("Weight signal:", weightSignal);
  console.log("Diagnoses:", diagnoses);
  console.log("Prediction:", prediction);

  reportToConsole(report);

  console.log("Markdown report:");
  console.log(markdown);
}