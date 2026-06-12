/**
 * mlReport.js
 *
 * Purpose:
 * - Produce readable ML report summary
 * - Add ML evaluation to Markdown export
 */

export function generateMLSummary({
  regressionPrediction,
  modelEvaluation,
  modelComparison
}) {
  return {
    available:
      regressionPrediction?.available &&
      modelEvaluation?.available,

    prediction: regressionPrediction,
    evaluation: modelEvaluation,
    comparison: modelComparison,

    narrative: buildNarrative({
      regressionPrediction,
      modelEvaluation,
      modelComparison
    })
  };
}

export function mlSummaryToMarkdown(summary) {
  if (!summary?.available) {
    return "## ML Evaluation\n\nNot enough data to evaluate the ML model.";
  }

  return `
## ML Evaluation

${summary.narrative}

| Metric | Value |
|---|---:|
| Predicted 7-day change | ${round(summary.prediction.predictedChange7d)} kg |
| Predicted 7-day weight | ${round(summary.prediction.predictedWeight7d)} kg |
| Training rows | ${summary.prediction.trainingRows} |
| Mean absolute error | ${round(summary.evaluation.mae)} kg |
| Bias | ${round(summary.evaluation.bias)} kg |
| Accuracy within 0.25kg | ${round(summary.evaluation.accuracyWithin025 * 100, 0)}% |
| Accuracy within 0.5kg | ${round(summary.evaluation.accuracyWithin05 * 100, 0)}% |

Model comparison:

${summary.comparison?.recommendation || "No comparison available."}
`.trim();
}

function buildNarrative({
  regressionPrediction,
  modelEvaluation,
  modelComparison
}) {
  if (!regressionPrediction?.available) {
    return "Regression prediction is not available.";
  }

  if (!modelEvaluation?.available) {
    return "Regression prediction is available, but evaluation requires more historical data.";
  }

  return `The regression model predicts a 7-day weight change of ${round(
    regressionPrediction.predictedChange7d
  )} kg. The model's historical mean absolute error is ${round(
    modelEvaluation.mae
  )} kg. ${modelComparison?.recommendation || ""}`;
}

function round(value, decimals = 2) {
  if (!Number.isFinite(Number(value))) return "N/A";
  return Number(value).toFixed(decimals);
}