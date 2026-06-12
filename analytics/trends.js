/**
 * trends.js
 *
 * Statistical trend analysis layer.
 *
 * Purpose:
 * - Convert raw daily data into useful fat-loss signals
 * - Calculate rolling averages, volatility, expected loss and observed loss
 * - Produce boolean signals for the rules engine
 */

export function analyseTrends(rows = [], options = {}) {
  const config = {
    estimatedMaintenanceCalories: options.estimatedMaintenanceCalories || 3700,
    proteinTarget: options.proteinTarget || 180,
    sleepHourTarget: options.sleepHourTarget || 7,
    sleepQualityTarget: options.sleepQualityTarget || 3.5,
    minimumStepDropPercent: options.minimumStepDropPercent || 15,
    highVolatilityThresholdKg: options.highVolatilityThresholdKg || 0.45,
    calorieVariabilityThreshold: options.calorieVariabilityThreshold || 350,
    flatTrendThresholdKgPerWeek: options.flatTrendThresholdKgPerWeek || 0.25,
    kcalPerKg: options.kcalPerKg || 7700
  };

  const cleanRows = rows
    .map(normaliseRow)
    .filter((row) => row.date && Number.isFinite(row.bodyweight_kg))
    .sort((a, b) => new Date(a.date) - new Date(b.date));

  if (cleanRows.length < 7) {
    return {
      ready: false,
      reason: "At least 7 days of weight data are required.",
      rows: cleanRows,
      metrics: {},
      signals: {}
    };
  }

  const recent7 = lastN(cleanRows, 7);
  const recent14 = lastN(cleanRows, 14);
  const previous7 = previousN(cleanRows, 7, 7);

  const avgCalories7 = averageBy(recent7, "calories");
  const avgCalories14 = averageBy(recent14, "calories");
  const avgProtein7 = averageBy(recent7, "protein_g");
  const avgSteps7 = averageBy(recent7, "steps");
  const avgStepsPrevious7 = averageBy(previous7, "steps");
  const avgSleepHours7 = averageBy(recent7, "sleep_hours");
  const avgSleepQuality7 = averageBy(recent7, "sleep_quality");
  const avgTrainingLoad7 = averageBy(recent7, "training_load");

  const weightStart14 = rollingAverage(firstN(recent14, 3), "bodyweight_kg");
  const weightEnd14 = rollingAverage(lastN(recent14, 3), "bodyweight_kg");

  const observedLoss14 = weightStart14 - weightEnd14;
  const observedLossPerWeek = observedLoss14 / Math.max(recent14.length / 7, 1);

  const dailyDeficit = config.estimatedMaintenanceCalories - avgCalories14;
  const expectedLossPerWeek = (dailyDeficit * 7) / config.kcalPerKg;

  const mismatchKgPerWeek = expectedLossPerWeek - observedLossPerWeek;

  const weightVolatility7 = standardDeviation(
    recent7.map((row) => row.bodyweight_kg)
  );

  const calorieStd7 = standardDeviation(
    recent7.map((row) => row.calories).filter(Number.isFinite)
  );

  const weekdayCalories = average(
    cleanRows
      .filter((row) => !isWeekend(row.date))
      .map((row) => row.calories)
      .filter(Number.isFinite)
  );

  const weekendCalories = average(
    cleanRows
      .filter((row) => isWeekend(row.date))
      .map((row) => row.calories)
      .filter(Number.isFinite)
  );

  const stepDropPercent =
    Number.isFinite(avgStepsPrevious7) && avgStepsPrevious7 > 0
      ? ((avgStepsPrevious7 - avgSteps7) / avgStepsPrevious7) * 100
      : 0;

  const metrics = {
    daysImported: cleanRows.length,
    avgCalories7,
    avgCalories14,
    avgProtein7,
    avgSteps7,
    avgStepsPrevious7,
    avgSleepHours7,
    avgSleepQuality7,
    avgTrainingLoad7,
    weightStart14,
    weightEnd14,
    observedLoss14,
    observedLossPerWeek,
    dailyDeficit,
    expectedLossPerWeek,
    mismatchKgPerWeek,
    weightVolatility7,
    calorieStd7,
    weekdayCalories,
    weekendCalories,
    stepDropPercent
  };

  const signals = {
    deficitDetected: dailyDeficit > 250,
    weightTrendFlat: observedLossPerWeek < config.flatTrendThresholdKgPerWeek,
    weightVolatilityHigh: weightVolatility7 > config.highVolatilityThresholdKg,
    sleepPoor:
      avgSleepHours7 < config.sleepHourTarget ||
      avgSleepQuality7 < config.sleepQualityTarget,
    trainingLoadHigh: avgTrainingLoad7 >= 7,
    calorieVariabilityHigh:
      calorieStd7 > config.calorieVariabilityThreshold,
    weekendCaloriesHigher:
      Number.isFinite(weekendCalories) &&
      Number.isFinite(weekdayCalories) &&
      weekendCalories - weekdayCalories > 300,
    stepsDropped: stepDropPercent > config.minimumStepDropPercent,
    proteinLow: avgProtein7 < config.proteinTarget
  };

  return {
    ready: true,
    rows: cleanRows,
    config,
    metrics,
    signals
  };
}

export function normaliseRow(row) {
  return {
    date: row.date,
    bodyweight_kg: toNumber(row.bodyweight_kg),
    calories: toNumber(row.calories),
    protein_g: toNumber(row.protein_g),
    carbs_g: toNumber(row.carbs_g),
    fat_g: toNumber(row.fat_g),
    steps: toNumber(row.steps),
    sleep_hours: toNumber(row.sleep_hours),
    sleep_quality: toNumber(row.sleep_quality),
    training_load: toNumber(row.training_load)
  };
}

export function averageBy(rows, key) {
  return average(rows.map((row) => row[key]).filter(Number.isFinite));
}

export function rollingAverage(rows, key) {
  return averageBy(rows, key);
}

export function average(values = []) {
  const clean = values.filter(Number.isFinite);
  if (!clean.length) return NaN;

  return clean.reduce((sum, value) => sum + value, 0) / clean.length;
}

export function standardDeviation(values = []) {
  const clean = values.filter(Number.isFinite);
  if (clean.length < 2) return 0;

  const mean = average(clean);
  const variance =
    clean.reduce((sum, value) => sum + Math.pow(value - mean, 2), 0) /
    clean.length;

  return Math.sqrt(variance);
}

export function firstN(rows = [], n = 7) {
  return rows.slice(0, n);
}

export function lastN(rows = [], n = 7) {
  return rows.slice(Math.max(rows.length - n, 0));
}

export function previousN(rows = [], n = 7, offset = 7) {
  const end = Math.max(rows.length - offset, 0);
  const start = Math.max(end - n, 0);

  return rows.slice(start, end);
}

export function isWeekend(dateString) {
  const day = new Date(dateString).getDay();
  return day === 0 || day === 6;
}

export function toNumber(value) {
  if (value === null || value === undefined || value === "") return NaN;

  const number = Number(value);
  return Number.isFinite(number) ? number : NaN;
}

export function formatMetric(value, decimals = 1) {
  if (!Number.isFinite(value)) return "N/A";
  return Number(value).toFixed(decimals);
}