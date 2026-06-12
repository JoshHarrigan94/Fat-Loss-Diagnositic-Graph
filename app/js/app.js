/**
 * app.js
 *
 * Main orchestration layer.
 */

import { PATHS, USER_CONFIG } from "./config.js";
import { renderDashboard, renderError } from "./ui.js";

import { parseCSV, importCSV } from "../../data/importer.js";
import {
  saveRowsToLocalStore,
  loadRowsFromLocalStore,
  clearLocalStore
} from "../../data/localStore.js";
import { downloadRowsAsCSV } from "../../data/csvExport.js";

import {
  readEntryForm,
  upsertRowByDate,
  deleteRowByDate
} from "./dataEntry.js";

import { analyseTrends } from "../../analytics/trends.js";
import { analyseAdherence } from "../../analytics/adherence.js";
import { analyseDeficit } from "../../analytics/deficit.js";
import { analyseWeightSignal } from "../../analytics/weightSignal.js";
import { buildTimeline } from "../../analytics/timeline.js";
import { buildChartData } from "../../analytics/chartData.js";

import { evaluateRules } from "../../rules/diagnosticEngine.js";

import {
  createGraph,
  printGraphSummary
} from "../../graph/graphEngine.js";

import {
  getActiveGraphNodes,
  buildCompetingExplanations
} from "../../graph/activePathways.js";

import {
  buildInterventionExplanation
} from "../../graph/interventionMap.js";

import {
  scoreGraphPathways,
  getTopPathway
} from "../../graph/graphScoring.js";

import {
  exploreDiagnosisPathways,
  rankPathwaysBySignals
} from "../../graph/pathwayExplorer.js";

import { predictWeightTrend } from "../../ml/prediction.js";

import {
  trainRegressionModel,
  predictWithRegressionModel
} from "../../ml/regressionModel.js";

import {
  generateDiagnosticReport,
  reportToMarkdown,
  reportToConsole
} from "../../reports/reportGenerator.js";

import {
  generateTimelineSummary,
  timelineSummaryToMarkdown
} from "../../reports/timelineReport.js";

import {
  generateGraphReasoningSummary,
  graphReasoningToMarkdown
} from "../../reports/graphReasoningReport.js";

let appResources = null;
let currentRows = [];

document.addEventListener("DOMContentLoaded", async () => {
  try {
    appResources = await loadResources();
    currentRows = await loadInitialRows();
    renderFromRows(currentRows);
  } catch (error) {
    renderError(error);
  }
});

async function loadInitialRows() {
  const savedRows = loadRowsFromLocalStore();

  if (savedRows?.length) {
    return savedRows;
  }

  const csvText = await loadText(PATHS.sampleData);
  return parseCSV(csvText);
}

function renderFromRows(rows, extra = {}) {
  const result = runDiagnosticFromRows(rows, appResources);

  renderDashboard(
    {
      ...result,
      ...extra
    },
    {
      onCsvUpload: handleCsvUpload,
      onSaveEntry: handleSaveEntry,
      onDeleteEntry: handleDeleteEntry,
      onResetData: handleResetData,
      onExportCsv: handleExportCsv
    }
  );

  window.FatLossDiagnosticGraph = result;
}

async function handleCsvUpload(file) {
  try {
    const imported = await importCSV(file);

    if (!imported.validation.valid) {
      throw new Error(
        `CSV validation failed. Missing columns: ${imported.validation.missingColumns.join(", ")}`
      );
    }

    currentRows = imported.rows;
    saveRowsToLocalStore(currentRows);

    renderFromRows(currentRows, {
      importSummary: imported.summary,
      importWarnings: imported.validation.warnings
    });
  } catch (error) {
    renderError(error);
  }
}

function handleSaveEntry() {
  try {
    const entry = readEntryForm();

    const result = upsertRowByDate(currentRows, entry);

    if (!result.validation.valid) {
      renderFromRows(currentRows, {
        entryErrors: result.validation.errors
      });

      return;
    }

    currentRows = result.rows;
    saveRowsToLocalStore(currentRows);

    renderFromRows(currentRows, {
      entrySuccess: `Saved entry for ${entry.date}.`
    });
  } catch (error) {
    renderError(error);
  }
}

function handleDeleteEntry(date) {
  if (!date) return;

  currentRows = deleteRowByDate(currentRows, date);
  saveRowsToLocalStore(currentRows);

  renderFromRows(currentRows, {
    entrySuccess: `Deleted entry for ${date}.`
  });
}

async function handleResetData() {
  clearLocalStore();

  const csvText = await loadText(PATHS.sampleData);
  currentRows = parseCSV(csvText);

  renderFromRows(currentRows, {
    entrySuccess: "Reset to demo dataset."
  });
}

function handleExportCsv() {
  downloadRowsAsCSV(currentRows);
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

  const signals = buildSignals({
    trends,
    adherence,
    deficit,
    weightSignal
  });

  const analytics = {
    ...trends,
    adherence,
    deficit,
    weightSignal,
    signals
  };

  const diagnoses = evaluateRules(resources.rules, analytics.signals);
  const graph = createGraph(resources.nodes, resources.edges);

  const prediction = predictWeightTrend(analytics);

  const regressionModel = trainRegressionModel(rawRows, USER_CONFIG);
  const regressionPrediction = predictWithRegressionModel(
    regressionModel,
    rawRows,
    USER_CONFIG
  );

  const graphScores = scoreGraphPathways({
    graph,
    signals: analytics.signals,
    diagnoses
  });

  const topGraphPathway = getTopPathway({
    graph,
    signals: analytics.signals,
    diagnoses
  });

  const activeGraphNodes = getActiveGraphNodes(analytics.signals);

  const competingExplanations = buildCompetingExplanations({
    diagnoses,
    signals: analytics.signals
  });

  const primaryDiagnosisId =
    diagnoses[0]?.diagnosisId || "insufficient_signal";

  const interventionExplanation = buildInterventionExplanation({
    diagnosisId: competingExplanations[0]?.diagnosisId || primaryDiagnosisId,
    competingExplanations
  });

  const graphReasoningSummary = generateGraphReasoningSummary({
    activeNodes: activeGraphNodes,
    competingExplanations,
    interventionExplanation
  });

  const pathwayExploration = exploreDiagnosisPathways(
    graph,
    primaryDiagnosisId,
    { maxDepth: 4 }
  );

  const rankedExplanationChains = rankPathwaysBySignals(
    pathwayExploration.explanationChains,
    analytics.signals
  );

  const timeline = buildTimeline(
    rawRows,
    resources.rules,
    USER_CONFIG
  );

  const timelineSummary = generateTimelineSummary(timeline);
  const chartData = buildChartData(rawRows, timeline);

  const report = generateDiagnosticReport({
    analytics,
    diagnoses,
    graph
  });

  const markdown = [
    reportToMarkdown(report),
    timelineSummaryToMarkdown(timelineSummary),
    graphReasoningToMarkdown(graphReasoningSummary)
  ].join("\n\n---\n\n");

  logDiagnostics({
    analytics,
    adherence,
    deficit,
    weightSignal,
    diagnoses,
    graph,
    prediction,
    regressionModel,
    regressionPrediction,
    graphScores,
    topGraphPathway,
    activeGraphNodes,
    competingExplanations,
    interventionExplanation,
    graphReasoningSummary,
    pathwayExploration,
    rankedExplanationChains,
    timeline,
    timelineSummary,
    chartData,
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
    regressionModel,
    regressionPrediction,
    graphScores,
    topGraphPathway,
    activeGraphNodes,
    competingExplanations,
    interventionExplanation,
    graphReasoningSummary,
    pathwayExploration,
    rankedExplanationChains,
    timeline,
    timelineSummary,
    chartData,
    report,
    markdown
  };
}

function buildSignals({
  trends,
  adherence,
  deficit,
  weightSignal
}) {
  return {
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

function logDiagnostics(payload) {
  console.log("Graph summary:", printGraphSummary(payload.graph));
  console.log("Analytics:", payload.analytics);
  console.log("Adherence:", payload.adherence);
  console.log("Deficit:", payload.deficit);
  console.log("Weight signal:", payload.weightSignal);
  console.log("Diagnoses:", payload.diagnoses);
  console.log("Prediction:", payload.prediction);
  console.log("Regression model:", payload.regressionModel);
  console.log("Regression prediction:", payload.regressionPrediction);
  console.log("Graph scores:", payload.graphScores);
  console.log("Top graph pathway:", payload.topGraphPathway);
  console.log("Active graph nodes:", payload.activeGraphNodes);
  console.log("Competing explanations:", payload.competingExplanations);
  console.log("Intervention explanation:", payload.interventionExplanation);
  console.log("Graph reasoning summary:", payload.graphReasoningSummary);
  console.log("Pathway exploration:", payload.pathwayExploration);
  console.log("Ranked chains:", payload.rankedExplanationChains);
  console.log("Timeline:", payload.timeline);
  console.log("Timeline summary:", payload.timelineSummary);
  console.log("Chart data:", payload.chartData);

  reportToConsole(payload.report);

  console.log("Markdown report:");
  console.log(payload.markdown);
}