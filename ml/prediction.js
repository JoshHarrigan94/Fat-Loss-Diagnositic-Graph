/**
 * prediction.js
 *
 * Lightweight prediction layer.
 *
 * Purpose:
 * - Predict short-term weight trend
 * - Compare expected vs observed trajectory
 * - Provide prediction confidence
 *
 * MVP:
 * Uses trend-based forecasting.
 *
 * Future:
 * Replace with trained ML models.
 */

export function predictWeightTrend(analytics) {
  const metrics = analytics.metrics;

  const currentWeight = metrics.weightEnd14;

  const predicted7Day =
    currentWeight - metrics.expectedLossPerWeek;

  const predicted14Day =
    currentWeight - (metrics.expectedLossPerWeek * 2);

  const confidence =
    calculatePredictionConfidence(
      analytics
    );

  return {
    currentWeight,

    predicted7Day,

    predicted14Day,

    confidence,

    model:
      "trend_forecast_v1"
  };
}

export function calculatePredictionConfidence(
  analytics
) {
  const metrics =
    analytics.metrics;

  let confidence = 85;

  if (
    metrics.weightVolatility7 > 0.7
  ) {
    confidence -= 15;
  }

  if (
    metrics.avgSleepHours7 < 6
  ) {
    confidence -= 5;
  }

  if (
    metrics.calorieStd7 > 500
  ) {
    confidence -= 10;
  }

  return clamp(
    Math.round(confidence),
    40,
    95
  );
}

export function comparePredictionToReality({
  prediction,
  actualWeight
}) {
  const error =
    actualWeight -
    prediction.predicted7Day;

  return {
    actualWeight,

    predictedWeight:
      prediction.predicted7Day,

    errorKg: error,

    absoluteErrorKg:
      Math.abs(error)
  };
}

export function buildPredictionNarrative(
  prediction
) {
  return `
Current weight:
${round(prediction.currentWeight)} kg

Predicted 7-day weight:
${round(prediction.predicted7Day)} kg

Predicted 14-day weight:
${round(prediction.predicted14Day)} kg

Prediction confidence:
${prediction.confidence}%
`.trim();
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

function clamp(
  value,
  min,
  max
) {
  return Math.min(
    Math.max(value, min),
    max
  );
}