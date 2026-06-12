/**
 * modelEvaluation.js
 *
 * Purpose:
 * - Evaluate model predictions against known outcomes
 * - Produce ML quality metrics for portfolio credibility
 */

export function evaluateRegressionModel(model) {
  if (!model?.featureRows?.length) {
    return {
      available: false,
      reason: "No feature rows available for model evaluation."
    };
  }

  if (!model.trained) {
    return {
      available: false,
      reason: "Model used fallback prediction, so evaluation is limited."
    };
  }

  const predictions = model.featureRows.map((row) => {
    const predicted = predictFeatureRow(model, row);
    const actual = row.targetWeightChange7d;

    return {
      date: row.date,
      predicted,
      actual,
      error: predicted - actual,
      absoluteError: Math.abs(predicted - actual)
    };
  });

  const mae = average(predictions.map((row) => row.absoluteError));
  const bias = average(predictions.map((row) => row.error));
  const accuracyWithin025 = shareWithin(predictions, 0.25);
  const accuracyWithin05 = shareWithin(predictions, 0.5);

  return {
    available: true,
    sampleSize: predictions.length,
    mae,
    bias,
    accuracyWithin025,
    accuracyWithin05,
    predictions,
    interpretation: interpretEvaluation({
      mae,
      bias,
      accuracyWithin05
    })
  };
}

function predictFeatureRow(model, row) {
  const values = model.featureColumns.map((column) => row[column]);

  const normalised = values.map((value, index) => {
    const mean = model.normalisation.means[index];
    const std = model.normalisation.stds[index] || 1;

    return (value - mean) / std;
  });

  let prediction = model.weights[0];

  for (let i = 0; i < normalised.length; i++) {
    prediction += normalised[i] * model.weights[i + 1];
  }

  return prediction;
}

function shareWithin(predictions, threshold) {
  if (!predictions.length) return 0;

  const hits = predictions.filter(
    (row) => row.absoluteError <= threshold
  ).length;

  return hits / predictions.length;
}

function interpretEvaluation({ mae, bias, accuracyWithin05 }) {
  if (mae <= 0.25) {
    return "Model error is low for a short-term bodyweight prediction task.";
  }

  if (mae <= 0.5) {
    return "Model error is moderate and usable for directional prediction.";
  }

  if (accuracyWithin05 >= 0.6) {
    return "Model is often close enough for trend-level interpretation.";
  }

  if (bias > 0.25) {
    return "Model tends to overpredict weight change.";
  }

  if (bias < -0.25) {
    return "Model tends to underpredict weight change.";
  }

  return "Model should be treated as experimental and directional only.";
}

function average(values = []) {
  const clean = values.filter(Number.isFinite);

  if (!clean.length) return NaN;

  return clean.reduce((sum, value) => sum + value, 0) / clean.length;
}