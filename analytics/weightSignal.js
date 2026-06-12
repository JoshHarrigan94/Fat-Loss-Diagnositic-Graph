/**
 * weightSignal.js
 *
 * Weight signal analysis layer.
 *
 * Purpose:
 * - Separate signal from noise in scale weight
 * - Detect flat trends, volatility, masking risk and momentum
 * - Provide clearer diagnostic context for the rules engine
 */

export function analyseWeightSignal(rows = [], options = {}) {
  const config = {
    flatTrendThresholdKgPerWeek: options.flatTrendThresholdKgPerWeek || 0.25,
    highVolatilityThresholdKg: options.highVolatilityThresholdKg || 0.45
  };

  const cleanRows = rows
    .filter((row) => row.date && Number.isFinite(Number(row.bodyweight_kg)))
    .map((row) => ({
      date: row.date,
      bodyweight_kg: Number(row.bodyweight_kg)
    }))
    .sort((a, b) => new Date(a.date) - new Date(b.date));

  const recent7 = lastN(cleanRows, 7);
  const recent14 = lastN(cleanRows, 14);

  const startWeight = average(firstN(recent14, 3).map((row) => row.bodyweight_kg));
  const endWeight = average(lastN(recent14, 3).map((row) => row.bodyweight_kg));

  const observedLoss14 = startWeight - endWeight;
  const observedLossPerWeek = observedLoss14 / Math.max(recent14.length / 7, 1);

  const volatility7 = standardDeviation(
    recent7.map((row) => row.bodyweight_kg)
  );

  const momentum = classifyMomentum(observedLossPerWeek, config);

  return {
    startWeight,
    endWeight,
    observedLoss14,
    observedLossPerWeek,
    volatility7,
    momentum,
    flags: {
      weightTrendFlat:
        observedLossPerWeek < config.flatTrendThresholdKgPerWeek,
      weightVolatilityHigh:
        volatility7 > config.highVolatilityThresholdKg,
      weightDropping:
        observedLossPerWeek >= config.flatTrendThresholdKgPerWeek,
      possibleMasking:
        observedLossPerWeek < config.flatTrendThresholdKgPerWeek &&
        volatility7 > config.highVolatilityThresholdKg
    }
  };
}

function classifyMomentum(observedLossPerWeek, config) {
  if (!Number.isFinite(observedLossPerWeek)) return "unknown";

  if (observedLossPerWeek < 0) return "gaining";
  if (observedLossPerWeek < config.flatTrendThresholdKgPerWeek) return "flat";
  if (observedLossPerWeek < 0.8) return "dropping";
  return "dropping_fast";
}

function firstN(rows = [], n = 7) {
  return rows.slice(0, n);
}

function lastN(rows = [], n = 7) {
  return rows.slice(Math.max(rows.length - n, 0));
}

function average(values = []) {
  const clean = values.filter(Number.isFinite);
  if (!clean.length) return NaN;

  return clean.reduce((sum, value) => sum + value, 0) / clean.length;
}

function standardDeviation(values = []) {
  const clean = values.filter(Number.isFinite);
  if (clean.length < 2) return 0;

  const mean = average(clean);
  const variance =
    clean.reduce((sum, value) => sum + Math.pow(value - mean, 2), 0) /
    clean.length;

  return Math.sqrt(variance);
}