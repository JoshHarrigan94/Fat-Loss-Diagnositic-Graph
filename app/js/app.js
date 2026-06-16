import { analyseAdherence } from "../../analytics/adherence.js";
import { buildChartData } from "../../analytics/chartData.js";
import { analyseDeficit } from "../../analytics/deficit.js";
import { buildTimeline } from "../../analytics/timeline.js";
import { analyseTrends } from "../../analytics/trends.js";
import { analyseWeightSignal } from "../../analytics/weightSignal.js";
import { createGraph } from "../../graph/graphEngine.js";
import { assembleKnowledgeGraph, diagnoseRows } from "../../knowledge-base/index.js";
import { buildImportSummary, createDemoDataset, importCSV, normaliseImportedRows } from "../../data/importer.js";
import { clearLocalStore, loadRowsFromLocalStore, saveRowsToLocalStore } from "../../data/localStore.js";
import { downloadRowsAsCSV } from "../../data/csvExport.js";
import { reportToMarkdown } from "../../reports/reportGenerator.js";
import { generateTimelineSummary } from "../../reports/timelineReport.js";
import { generateSimulationSummary } from "../../reports/simulationReport.js";
import { runInterventionSimulation } from "../../simulation/interventionSimulator.js";
import { renderDashboard, renderError } from "./ui.js";
import { deleteRowByDate, normaliseEntry, readEntryForm, sortRowsByDate, upsertRowByDate } from "./dataEntry.js";

const DEFAULT_OPTIONS = {
  estimatedMaintenanceCalories: 2900,
  proteinTarget: 180
};

const state = {
  rows: [],
  importSummary: null,
  importWarnings: [],
  entryErrors: [],
  entrySuccess: ""
};

function toRuleStyleDiagnosis(diagnosis) {
  const primaryHypothesis = diagnosis.primaryHypothesis;

  return {
    diagnosisId: primaryHypothesis?.id || diagnosis.primaryStrategy || "knowledge_graph_diagnosis",
    title: primaryHypothesis?.label || formatLabel(diagnosis.primaryStrategy || "knowledge_graph_diagnosis"),
    summary:
      primaryHypothesis?.explanation ||
      diagnosis.recommendationPackage?.primary?.message ||
      "Graph-based diagnostic reasoning produced the current recommendation.",
    confidence: Math.round((diagnosis.confidenceProfile?.overall?.score || 0.5) * 100),
    evidence: [
      ...(primaryHypothesis?.supportingEvidence || []),
      ...diagnosis.likelyIssues.map(formatLabel)
    ],
    recommendation: diagnosis.recommendationPackage?.primary?.message || "No recommendation available."
  };
}

function buildKnowledgeSummary(diagnosis) {
  const topHypotheses = diagnosis.hypotheses.slice(0, 5);
  const strongestDomain = topHypotheses[0];

  return {
    available: true,
    summary:
      diagnosis.recommendationPackage?.primary?.message ||
      "Knowledge-base reasoning generated the current recommendation package.",
    recommendation: diagnosis.recommendationPackage?.modeLabel || diagnosis.recommendationMode,
    strongestDomain: strongestDomain
      ? {
          title: strongestDomain.label,
          score: strongestDomain.score,
          confidence: Math.round(strongestDomain.score * 100),
          description: strongestDomain.explanation,
          supporting: strongestDomain.supportingEvidence,
          weakening: strongestDomain.opposingEvidence,
          avoid: diagnosis.avoidedStrategies.map(item => item.id)
        }
      : null,
    rankedDomains: topHypotheses.map(hypothesis => ({
      title: hypothesis.label,
      score: hypothesis.score,
      confidence: Math.round(hypothesis.score * 100),
      supporting: hypothesis.supportingEvidence,
      weakening: hypothesis.opposingEvidence
    }))
  };
}

function buildSubgraph(graph, diagnosis) {
  const routeIds = new Set();
  const edges = [];

  diagnosis.reasoningRoutes
    .filter(route => route.containsDecisionNode)
    .slice(0, 8)
    .forEach(route => {
      route.path.forEach(nodeId => routeIds.add(nodeId));
      route.edges.forEach(edge => edges.push(edge));
    });

  if (!routeIds.size) {
    diagnosis.activatedNodeIds.slice(0, 12).forEach(nodeId => routeIds.add(nodeId));
  }

  return {
    diagnosisId: diagnosis.primaryHypothesis?.id || diagnosis.primaryStrategy || "knowledge_graph_diagnosis",
    nodes: graph.nodes.filter(node => routeIds.has(node.id)),
    edges
  };
}

function buildMarkdownReport(result) {
  return reportToMarkdown(result.report);
}

function buildDashboardResult(rows) {
  const sortedRows = sortRowsByDate(rows);
  const analytics = analyseTrends(sortedRows, DEFAULT_OPTIONS);
  const adherence = analyseAdherence(sortedRows, DEFAULT_OPTIONS);
  const deficit = analyseDeficit(sortedRows, DEFAULT_OPTIONS);
  const weightSignal = analyseWeightSignal(sortedRows, DEFAULT_OPTIONS);
  const diagnoses = [];
  const timeline = buildTimeline(sortedRows, [], DEFAULT_OPTIONS);
  const timelineSummary = generateTimelineSummary(timeline);
  const chartData = buildChartData(sortedRows, timeline);
  const kbGraph = assembleKnowledgeGraph();
  const graph = createGraph(kbGraph.nodes, kbGraph.edges);
  const diagnosis = diagnoseRows(sortedRows, DEFAULT_OPTIONS);
  const reportDiagnosis = toRuleStyleDiagnosis(diagnosis);
  diagnoses.push(reportDiagnosis);

  const report = {
    generatedAt: new Date().toISOString(),
    diagnosis: {
      id: reportDiagnosis.diagnosisId,
      title: reportDiagnosis.title,
      summary: reportDiagnosis.summary,
      confidence: reportDiagnosis.confidence
    },
    metrics: {
      expectedLossPerWeek: roundMetric(analytics.metrics.expectedLossPerWeek),
      observedLossPerWeek: roundMetric(analytics.metrics.observedLossPerWeek),
      mismatchKgPerWeek: roundMetric(analytics.metrics.mismatchKgPerWeek),
      averageCalories: roundMetric(analytics.metrics.avgCalories14),
      averageSteps: roundMetric(analytics.metrics.avgSteps7),
      averageSleepHours: roundMetric(analytics.metrics.avgSleepHours7),
      averageProtein: roundMetric(analytics.metrics.avgProtein7),
      weightVolatility: roundMetric(analytics.metrics.weightVolatility7)
    },
    evidence: reportDiagnosis.evidence,
    graphPaths: diagnosis.reasoningRoutes
      .filter(route => route.containsDecisionNode)
      .slice(0, 5)
      .map(route => route.path.map(formatLabel).join(" -> ")),
    recommendation: diagnosis.recommendationPackage.primary.message
  };

  const simulations = runInterventionSimulation({
    rows: sortedRows,
    baselineAnalytics: analytics,
    baselineDiagnosis: reportDiagnosis
  });

  const subgraph = buildSubgraph(kbGraph, diagnosis);
  const knowledgeSummary = buildKnowledgeSummary(diagnosis);

  const result = {
    report,
    analytics,
    adherence,
    deficit,
    weightSignal,
    diagnoses,
    prediction: null,
    regressionPrediction: null,
    regressionModel: null,
    modelEvaluation: null,
    modelComparison: null,
    mlSummary: null,
    graph,
    markdown: "",
    timelineSummary,
    rankedExplanationChains: diagnosis.reasoningRoutes
      .filter(route => route.containsDecisionNode)
      .slice(0, 5)
      .map(route => ({
        chain: route.path.map(formatLabel).join(" -> "),
        score: route.path.length
      })),
    activeGraphNodes: diagnosis.activatedNodeIds,
    competingExplanations: diagnosis.hypotheses.map((hypothesis, index) => ({
      rank: index + 1,
      title: hypothesis.label,
      explanation: hypothesis.explanation,
      combinedScore: Math.round(hypothesis.score * 100)
    })),
    interventionExplanation: {
      summary: diagnosis.recommendationPackage.primary.message,
      interventions: diagnosis.recommendationPackage.tacticalLevers.map(lever => ({
        lever: lever.label,
        rationale: lever.description,
        risk: lever.strategyLabel
      }))
    },
    graphReasoningSummary: {
      narrative: diagnosis.reasoningRoutes.length
        ? `The graph selected ${formatLabel(diagnosis.primaryStrategy)} in ${formatLabel(diagnosis.recommendationMode)} mode.`
        : "No graph reasoning routes were available."
    },
    simulationSummary: generateSimulationSummary(simulations),
    rawRows: sortedRows,
    chartData,
    importSummary: state.importSummary || buildImportSummary(sortedRows),
    importWarnings: state.importWarnings,
    entryErrors: state.entryErrors,
    entrySuccess: state.entrySuccess,
    knowledgeSummary,
    subgraph
  };

  result.markdown = buildMarkdownReport(result);
  return result;
}

function render() {
  try {
    const result = buildDashboardResult(state.rows);

    renderDashboard(result, {
      onCsvUpload: handleCsvUpload,
      onExportCsv: () => downloadRowsAsCSV(state.rows),
      onResetData: handleResetData,
      onSaveEntry: handleSaveEntry,
      onDeleteEntry: handleDeleteEntry
    });
  } catch (error) {
    renderError(error);
  }
}

async function handleCsvUpload(file) {
  try {
    const imported = await importCSV(file);
    const normalisedRows = sortRowsByDate(normaliseImportedRows(imported.rows));

    state.rows = normalisedRows;
    state.importSummary = imported.summary;
    state.importWarnings = imported.validation.warnings || [];
    state.entryErrors = imported.validation.valid
      ? []
      : [`Missing required columns: ${imported.validation.missingColumns.join(", ")}`];
    state.entrySuccess = imported.validation.valid
      ? `Loaded ${normalisedRows.length} rows from CSV.`
      : "";

    saveRowsToLocalStore(state.rows);
    render();
  } catch (error) {
    state.entryErrors = [error.message || "Failed to import CSV."];
    state.entrySuccess = "";
    render();
  }
}

function handleSaveEntry() {
  const entry = normaliseEntry(readEntryForm());
  const result = upsertRowByDate(state.rows, entry);

  if (!result.validation.valid) {
    state.entryErrors = result.validation.errors;
    state.entrySuccess = "";
    render();
    return;
  }

  state.rows = result.rows;
  state.entryErrors = [];
  state.entrySuccess = `Saved entry for ${entry.date}.`;
  state.importSummary = buildImportSummary(state.rows);
  saveRowsToLocalStore(state.rows);
  render();
}

function handleDeleteEntry(date) {
  state.rows = deleteRowByDate(state.rows, date);
  state.entryErrors = [];
  state.entrySuccess = `Deleted entry for ${date}.`;
  state.importSummary = buildImportSummary(state.rows);
  saveRowsToLocalStore(state.rows);
  render();
}

function handleResetData() {
  clearLocalStore();
  state.rows = sortRowsByDate(createDemoDataset());
  state.importSummary = buildImportSummary(state.rows);
  state.importWarnings = [];
  state.entryErrors = [];
  state.entrySuccess = "Reset to demo rows.";
  saveRowsToLocalStore(state.rows);
  render();
}

function initialise() {
  const localRows = loadRowsFromLocalStore();
  state.rows = sortRowsByDate(localRows?.length ? localRows : createDemoDataset());
  state.importSummary = buildImportSummary(state.rows);
  render();
}

function roundMetric(value) {
  if (!Number.isFinite(Number(value))) {
    return "N/A";
  }

  return Number(Number(value).toFixed(2));
}

function formatLabel(value) {
  return String(value || "")
    .replaceAll("_", " ")
    .replace(/\b\w/g, char => char.toUpperCase());
}

initialise();
 