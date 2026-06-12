/**
 * featureEngineering.js
 *
 * Converts daily fat-loss tracking rows into model-ready feature rows.
 *
 * Purpose:
 * - Build rolling window features
 * - Create supervised learning targets
 * - Prepare inputs for simple regression / ML prediction
 *
 * Core idea:
 * Use the previous 7 days of behaviour to predict the next 7-day weight change.
 */

export function buildFeatureDataset(rows = [], options = {}) {
  const config = {
    windowSize: options.windowSize || 7,
    predictionHorizon: options.predictionHorizon || 7
  };

  const cleanRows = normaliseRows(rows);

  const featureRows = [];

  for (
    let i = config.windowSize;
    i < cleanRows.length - config.predictionHorizon;
    i++
  ) {
    const historyWindow = cleanRows.slice(
      i - config.windowSize,
      i
    );

    const currentRow = cleanRows[i];

    const futureRow =
      cleanRows[i + config.predictionHorizon];

    const features = buildFeaturesFromWindow(
      historyWindow,
      currentRow
    );

    const target =
      futureRow.bodyweight_kg -
      currentRow.bodyweight_kg;

    featureRows.push({
      date: currentRow.date,
      ...features,
      targetWeightChange7d: target,
      currentWeight: currentRow.bodyweight_kg,
      futureWeight: futureRow.bodyweight_kg
    });
  }

  return featureRows;
}

export function buildLatestFeatureRow(rows = [], options = {}) {
  const config = {
    windowSize: options.windowSize || 7
  };

  const cleanRows = normaliseRows(rows);

  if (cleanRows.length < config.windowSize) {
    return null;
  }

  const historyWindow = cleanRows.slice(
    cleanRows.length - config.windowSize
  );

  const currentRow =
    cleanRows[cleanRows.length - 1];

  return {
    date: currentRow.date,
    ...buildFeaturesFromWindow(
      historyWindow,
      currentRow
    ),
    currentWeight: currentRow.bodyweight_kg
  };
}

export function buildFeaturesFromWindow(
  windowRows = [],
  currentRow
) {
  return {
    avgCalories7:
      averageBy(windowRows, "calories"),

    avgProtein7:
      averageBy(windowRows, "protein_g"),

    avgCarbs7:
      averageBy(windowRows, "carbs_g"),

    avgFat7:
      averageBy(windowRows, "fat_g"),

    avgSteps7:
      averageBy(windowRows, "steps"),

    avgSleepHours7:
      averageBy(windowRows, "sleep_hours"),

    avgSleepQuality7:
      averageBy(windowRows, "sleep_quality"),

    avgTrainingLoad7:
      averageBy(windowRows, "training_load"),

    calorieStd7:
      standardDeviation(
        valuesBy(windowRows, "calories")
      ),

    weightStd7:
      standardDeviation(
        valuesBy(windowRows, "bodyweight_kg")
      ),

    weightTrend7:
      calculateWeightTrend(windowRows),

    weekendCalorieDrift:
      calculateWeekendDrift(windowRows),

    currentWeight:
      currentRow.bodyweight_kg
  };
}

export function getFeatureColumns() {
  return [
    "avgCalories7",
    "avgProtein7",
    "avgCarbs7",
    "avgFat7",
    "avgSteps7",
    "avgSleepHours7",
    "avgSleepQuality7",
    "avgTrainingLoad7",
    "calorieStd7",
    "weightStd7",
    "weightTrend7",
    "weekendCalorieDrift",
    "currentWeight"
  ];
}

function normaliseRows(rows = []) {
  return rows
    .filter((row) => row.date)
    .map((row) => ({
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
    }))
    .filter((row) =>
      Number.isFinite(row.bodyweight_kg)
    )
    .sort((a, b) =>
      new Date(a.date) - new Date(b.date)
    );
}

function calculateWeightTrend(rows = []) {
  if (rows.length < 2) return 0;

  const first =
    rows[0].bodyweight_kg;

  const last =
    rows[rows.length - 1].bodyweight_kg;

  return last - first;
}

function calculateWeekendDrift(rows = []) {
  const weekdayCalories = rows
    .filter((row) => !isWeekend(row.date))
    .map((row) => row.calories)
    .filter(Number.isFinite);

  const weekendCalories = rows
    .filter((row) => isWeekend(row.date))
    .map((row) => row.calories)
    .filter(Number.isFinite);

  return (
    average(weekendCalories) -
    average(weekdayCalories)
  );
}

function valuesBy(rows, key) {
  return rows
    .map((row) => row[key])
    .filter(Number.isFinite);
}

function averageBy(rows, key) {
  return average(valuesBy(rows, key));
}

function average(values = []) {
  const clean = values.filter(Number.isFinite);

  if (!clean.length) return 0;

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

function isWeekend(dateString) {
  const day = new Date(dateString).getDay();

  return day === 0 || day === 6;
}

function toNumber(value) {
  if (
    value === null ||
    value === undefined ||
    value === ""
  ) {
    return NaN;
  }

  const number = Number(value);

  return Number.isFinite(number)
    ? number
    : NaN;
}