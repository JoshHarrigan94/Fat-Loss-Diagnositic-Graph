/**
 * regressionModel.js
 *
 * Lightweight regression model for short-term weight prediction.
 *
 * Purpose:
 * - Train a simple linear model from engineered features
 * - Predict next 7-day weight change
 * - Provide feature contribution explanations
 *
 * This is intentionally lightweight and dependency-free.
 * It is portfolio-grade ML, not production-grade modelling.
 */

import {
  buildFeatureDataset,
  buildLatestFeatureRow,
  getFeatureColumns
} from "./featureEngineering.js";

export function trainRegressionModel(rows = [], options = {}) {
  const featureRows = buildFeatureDataset(rows, options);
  const featureColumns = getFeatureColumns();

  if (featureRows.length < 5) {
    return createFallbackModel(featureRows);
  }

  const trainingRows = featureRows.map((row) => ({
    x: featureColumns.map((column) => row[column]),
    y: row.targetWeightChange7d
  }));

  const normalisation = buildNormalisation(trainingRows);
  const normalisedRows = normaliseTrainingRows(trainingRows, normalisation);

  const weights = fitLinearRegression(normalisedRows, {
    learningRate: options.learningRate || 0.03,
    iterations: options.iterations || 1200,
    l2: options.l2 || 0.001
  });

  const predictions = normalisedRows.map((row) =>
    predictFromWeights(row.x, weights)
  );

  const error = meanAbsoluteError(
    predictions,
    normalisedRows.map((row) => row.y)
  );

  return {
    type: "linear_regression_v1",
    trained: true,
    featureColumns,
    featureRows,
    weights,
    normalisation,
    trainingRows: featureRows.length,
    trainingError: error
  };
}

export function predictWithRegressionModel(model, rows = [], options = {}) {
  const latest = buildLatestFeatureRow(rows, options);

  if (!latest) {
    return {
      available: false,
      reason: "Not enough data to build latest feature row."
    };
  }

  if (!model?.trained) {
    return predictWithFallback(model, latest);
  }

  const featureValues = model.featureColumns.map((column) => latest[column]);
  const normalisedFeatures = normaliseFeatureValues(
    featureValues,
    model.normalisation
  );

  const predictedChange7d = predictFromWeights(
    normalisedFeatures,
    model.weights
  );

  const predictedWeight7d =
    latest.currentWeight + predictedChange7d;

  const contributions = calculateFeatureContributions({
    model,
    latest,
    normalisedFeatures
  });

  return {
    available: true,
    modelType: model.type,
    currentWeight: latest.currentWeight,
    predictedChange7d,
    predictedWeight7d,
    trainingRows: model.trainingRows,
    trainingError: model.trainingError,
    confidence: calculateModelConfidence(model),
    contributions
  };
}

function fitLinearRegression(rows, options) {
  const featureCount = rows[0].x.length;

  let weights = new Array(featureCount + 1).fill(0);

  for (let iteration = 0; iteration < options.iterations; iteration++) {
    const gradients = new Array(featureCount + 1).fill(0);

    for (const row of rows) {
      const prediction = predictFromWeights(row.x, weights);
      const error = prediction - row.y;

      gradients[0] += error;

      for (let i = 0; i < featureCount; i++) {
        gradients[i + 1] += error * row.x[i];
      }
    }

    for (let i = 0; i < weights.length; i++) {
      const l2Penalty = i === 0 ? 0 : options.l2 * weights[i];

      weights[i] -=
        options.learningRate *
        ((gradients[i] / rows.length) + l2Penalty);
    }
  }

  return weights;
}

function predictFromWeights(features, weights) {
  let prediction = weights[0];

  for (let i = 0; i < features.length; i++) {
    prediction += features[i] * weights[i + 1];
  }

  return prediction;
}

function buildNormalisation(trainingRows) {
  const featureCount = trainingRows[0].x.length;

  const means = [];
  const stds = [];

  for (let i = 0; i < featureCount; i++) {
    const values = trainingRows.map((row) => row.x[i]);

    const mean = average(values);
    const std = standardDeviation(values) || 1;

    means.push(mean);
    stds.push(std);
  }

  return { means, stds };
}

function normaliseTrainingRows(trainingRows, normalisation) {
  return trainingRows.map((row) => ({
    x: normaliseFeatureValues(row.x, normalisation),
    y: row.y
  }));
}

function normaliseFeatureValues(values, normalisation) {
  return values.map((value, index) => {
    const mean = normalisation.means[index];
    const std = normalisation.stds[index] || 1;

    return (value - mean) / std;
  });
}

function calculateFeatureContributions({
  model,
  latest,
  normalisedFeatures
}) {
  return model.featureColumns
    .map((feature, index) => ({
      feature,
      rawValue: latest[feature],
      contribution:
        normalisedFeatures[index] *
        model.weights[index + 1]
    }))
    .sort(
      (a, b) =>
        Math.abs(b.contribution) -
        Math.abs(a.contribution)
    )
    .slice(0, 5);
}

function calculateModelConfidence(model) {
  if (!model?.trained) return 35;

  let confidence = 70;

  if (model.trainingRows >= 30) confidence += 10;
  if (model.trainingRows >= 60) confidence += 10;

  if (model.trainingError > 0.5) confidence -= 10;
  if (model.trainingError > 0.8) confidence -= 15;

  return clamp(Math.round(confidence), 35, 90);
}

function meanAbsoluteError(predictions, actuals) {
  if (!predictions.length) return NaN;

  const totalError = predictions.reduce(
    (sum, prediction, index) =>
      sum + Math.abs(prediction - actuals[index]),
    0
  );

  return totalError / predictions.length;
}

function createFallbackModel(featureRows = []) {
  const avgTarget = average(
    featureRows.map((row) => row.targetWeightChange7d)
  );

  return {
    type: "fallback_average_change_v1",
    trained: false,
    featureColumns: getFeatureColumns(),
    featureRows,
    averageTargetChange:
      Number.isFinite(avgTarget) ? avgTarget : 0,
    trainingRows: featureRows.length,
    trainingError: null
  };
}

function predictWithFallback(model, latest) {
  const predictedChange7d =
    model?.averageTargetChange || 0;

  return {
    available: true,
    modelType: model?.type || "fallback_average_change_v1",
    currentWeight: latest.currentWeight,
    predictedChange7d,
    predictedWeight7d:
      latest.currentWeight + predictedChange7d,
    trainingRows: model?.trainingRows || 0,
    trainingError: null,
    confidence: 35,
    contributions: []
  };
}

function average(values = []) {
  const clean = values.filter(Number.isFinite);

  if (!clean.length) return NaN;

  return (
    clean.reduce((sum, value) => sum + value, 0) /
    clean.length
  );
}

function standardDeviation(values = []) {
  const clean = values.filter(Number.isFinite);

  if (clean.length < 2) return 0;

  const mean = average(clean);

  const variance =
    clean.reduce(
      (sum, value) =>
        sum + Math.pow(value - mean, 2),
      0
    ) / clean.length;

  return Math.sqrt(variance);
}

function clamp(value, min, max) {
  return Math.min(
    Math.max(value, min),
    max
  );
}