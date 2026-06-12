/**
 * modelComparison.js
 *
 * Purpose:
 * - Compare simple forecast model vs regression model
 * - Show whether ML adds value over baseline
 */

export function compareModels({
  baselinePrediction,
  regressionPrediction,
  modelEvaluation
}) {
  if (!regressionPrediction?.available || !modelEvaluation?.available) {
    return {
      available: false,
      reason: "Not enough data to compare models."
    };
  }

  const baselineConfidence = baselinePrediction?.confidence || 0;
  const regressionConfidence = regressionPrediction?.confidence || 0;

  const confidenceDelta =
    regressionConfidence - baselineConfidence;

  return {
    available: true,
    baselineModel: baselinePrediction?.model || "trend_forecast_v1",
    regressionModel: regressionPrediction.modelType,
    baselineConfidence,
    regressionConfidence,
    confidenceDelta,
    regressionMae: modelEvaluation.mae,
    regressionBias: modelEvaluation.bias,
    recommendation: buildRecommendation({
      confidenceDelta,
      mae: modelEvaluation.mae
    })
  };
}

function buildRecommendation({ confidenceDelta, mae }) {
  if (mae <= 0.35 && confidenceDelta >= 0) {
    return "Regression model adds useful predictive signal over the baseline forecast.";
  }

  if (mae <= 0.5) {
    return "Regression model is useful directionally, but should be interpreted with caution.";
  }

  return "Baseline trend forecast may be more reliable until more data is collected.";
}