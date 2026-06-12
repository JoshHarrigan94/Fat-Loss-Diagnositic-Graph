/**
 * adherence.js
 *
 * Behaviour and consistency analysis layer.
 *
 * Purpose:
 * - Detect calorie consistency
 * - Detect weekend drift
 * - Detect protein consistency
 * - Produce simple adherence scoring for the dashboard
 */

export function analyseAdherence(rows = [], options = {}) {
  const config = {
    proteinTarget: options.proteinTarget || 180,
    calorieVariabilityTarget: options.calorieVariabilityTarget || 350,
    weekendDriftThreshold: options.weekendDriftThreshold || 300
  };

  const cleanRows = rows.filter((row) => row.date);

  const calories = cleanRows
    .map((row) => Number(row.calories))
    .filter(Number.isFinite);

  const protein = cleanRows
    .map((row) => Number(row.protein_g))
    .filter(Number.isFinite);

  const weekdayCalories = cleanRows
    .filter((row) => !isWeekend(row.date))
    .map((row) => Number(row.calories))
    .filter(Number.isFinite);

  const weekendCalories = cleanRows
    .filter((row) => isWeekend(row.date))
    .map((row) => Number(row.calories))
    .filter(Number.isFinite);

  const calorieAverage = average(calories);
  const calorieDeviation = standardDeviation(calories);

  const weekdayAverage = average(weekdayCalories);
  const weekendAverage = average(weekendCalories);
  const weekendDrift = weekendAverage - weekdayAverage;

  const proteinAverage = average(protein);
  const proteinAdherenceRate =
    protein.length > 0
      ? protein.filter((value) => value >= config.proteinTarget).length / protein.length
      : 0;

  const score = calculateAdherenceScore({
    calorieDeviation,
    weekendDrift,
    proteinAdherenceRate,
    config
  });

  return {
    calorieAverage,
    calorieDeviation,
    weekdayAverage,
    weekendAverage,
    weekendDrift,
    proteinAverage,
    proteinAdherenceRate,
    score,
    flags: {
      calorieVariabilityHigh:
        calorieDeviation > config.calorieVariabilityTarget,
      weekendDriftHigh:
        weekendDrift > config.weekendDriftThreshold,
      proteinInconsistent:
        proteinAdherenceRate < 0.7
    }
  };
}

function calculateAdherenceScore({
  calorieDeviation,
  weekendDrift,
  proteinAdherenceRate,
  config
}) {
  let score = 100;

  if (calorieDeviation > config.calorieVariabilityTarget) {
    score -= 25;
  }

  if (weekendDrift > config.weekendDriftThreshold) {
    score -= 25;
  }

  if (proteinAdherenceRate < 0.7) {
    score -= 20;
  }

  return clamp(score, 0, 100);
}

function isWeekend(dateString) {
  const day = new Date(dateString).getDay();
  return day === 0 || day === 6;
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

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}