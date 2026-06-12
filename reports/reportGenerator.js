/**
 * reportGenerator.js
 *
 * Purpose:
 * Convert analytics, rules and graph outputs
 * into a human-readable diagnostic report.
 */

import {
  getPrimaryDiagnosis,
  buildDiagnosticSummary
} from "../rules/diagnosticEngine.js";

import {
  getDiagnosisGraphExplanation,
  graphExplanationToText
} from "../graph/graphEngine.js";

export function generateDiagnosticReport({
  analytics,
  diagnoses,
  graph
}) {
  const summary = buildDiagnosticSummary(diagnoses);

  const primary = getPrimaryDiagnosis(diagnoses);

  const graphExplanation =
    primary.diagnosisId !== "insufficient_signal"
      ? getDiagnosisGraphExplanation(
          graph,
          primary.diagnosisId
        )
      : null;

  const graphPaths = graphExplanation
    ? graphExplanationToText(graphExplanation)
    : [];

  return {
    generatedAt: new Date().toISOString(),

    diagnosis: {
      id: primary.diagnosisId,
      title: primary.title,
      summary: primary.summary,
      confidence: primary.confidence
    },

    metrics: buildMetricSummary(
      analytics.metrics
    ),

    evidence: primary.evidence || [],

    graphPaths,

    recommendation:
      primary.recommendation,

    secondaryDiagnoses:
      summary.secondary.map((d) => ({
        id: d.diagnosisId,
        title: d.title,
        confidence: d.confidence
      })),

    narrative: buildNarrative(
      analytics,
      primary,
      graphPaths
    )
  };
}

function buildMetricSummary(metrics) {
  return {
    expectedLossPerWeek:
      round(metrics.expectedLossPerWeek),

    observedLossPerWeek:
      round(metrics.observedLossPerWeek),

    mismatchKgPerWeek:
      round(metrics.mismatchKgPerWeek),

    averageCalories:
      round(metrics.avgCalories14),

    averageSteps:
      round(metrics.avgSteps7),

    averageSleepHours:
      round(metrics.avgSleepHours7),

    averageProtein:
      round(metrics.avgProtein7),

    weightVolatility:
      round(metrics.weightVolatility7)
  };
}

function buildNarrative(
  analytics,
  diagnosis,
  graphPaths
) {
  const metrics = analytics.metrics;

  const lines = [];

  lines.push(
    `Expected weight loss is approximately ${round(
      metrics.expectedLossPerWeek
    )} kg per week based on the estimated calorie deficit.`
  );

  lines.push(
    `Observed weight loss is currently ${round(
      metrics.observedLossPerWeek
    )} kg per week.`
  );

  lines.push(
    `The mismatch between expected and observed outcomes is ${round(
      metrics.mismatchKgPerWeek
    )} kg per week.`
  );

  lines.push("");

  lines.push(
    `Primary diagnosis: ${diagnosis.title}.`
  );

  lines.push(
    diagnosis.summary
  );

  if (graphPaths.length) {
    lines.push("");
    lines.push(
      "Knowledge graph pathways:"
    );

    graphPaths.forEach((path) => {
      lines.push(`• ${path}`);
    });
  }

  return lines.join("\n");
}

export function reportToMarkdown(
  report
) {
  return `
# Fat Loss Diagnostic Report

Generated:
${report.generatedAt}

---

## Diagnosis

**${report.diagnosis.title}**

Confidence:
${report.diagnosis.confidence}%

${report.diagnosis.summary}

---

## Metrics

| Metric | Value |
|----------|----------|
| Expected Loss | ${report.metrics.expectedLossPerWeek} kg/week |
| Observed Loss | ${report.metrics.observedLossPerWeek} kg/week |
| Mismatch | ${report.metrics.mismatchKgPerWeek} kg/week |
| Calories | ${report.metrics.averageCalories} |
| Steps | ${report.metrics.averageSteps} |
| Sleep | ${report.metrics.averageSleepHours} hrs |
| Protein | ${report.metrics.averageProtein} g |
| Volatility | ${report.metrics.weightVolatility} kg |

---

## Evidence

${report.evidence
  .map((e) => `- ${e}`)
  .join("\n")}

---

## Graph Pathways

${report.graphPaths
  .map((p) => `- ${p}`)
  .join("\n")}

---

## Recommendation

${report.recommendation}

---

## Narrative

${report.narrative}
`;
}

export function reportToConsole(
  report
) {
  console.group(
    "Fat Loss Diagnostic Report"
  );

  console.log(
    "Diagnosis:",
    report.diagnosis.title
  );

  console.log(
    "Confidence:",
    `${report.diagnosis.confidence}%`
  );

  console.log(
    "Recommendation:",
    report.recommendation
  );

  console.log(
    "Metrics:",
    report.metrics
  );

  console.log(
    "Graph:",
    report.graphPaths
  );

  console.groupEnd();
}

function round(value) {
  if (
    value === null ||
    value === undefined ||
    Number.isNaN(value)
  ) {
    return "N/A";
  }

  return Number(value).toFixed(2);
}