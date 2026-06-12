/**
 * chartData.js
 *
 * Converts raw rows and timeline summaries into UI-ready chart datasets.
 */

export function buildChartData(rows = [], timeline = []) {
  const sortedRows = [...rows]
    .filter((row) => row.date)
    .sort((a, b) => new Date(a.date) - new Date(b.date));

  return {
    weightTrend: buildWeightTrendData(sortedRows),
    caloriesVsWeight: buildCaloriesVsWeightData(sortedRows),
    stepsTrend: buildStepsTrendData(sortedRows),
    weeklyDiagnosis: buildWeeklyDiagnosisData(timeline)
  };
}

export function buildWeightTrendData(rows = []) {
  return rows.map((row, index) => ({
    index,
    date: row.date,
    weight: toNumber(row.bodyweight_kg),
    rollingWeight: rollingAverage(rows, index, "bodyweight_kg", 7)
  }));
}

export function buildCaloriesVsWeightData(rows = []) {
  return rows.map((row, index) => ({
    index,
    date: row.date,
    calories: toNumber(row.calories),
    weight: toNumber(row.bodyweight_kg),
    rollingWeight: rollingAverage(rows, index, "bodyweight_kg", 7)
  }));
}

export function buildStepsTrendData(rows = []) {
  return rows.map((row, index) => ({
    index,
    date: row.date,
    steps: toNumber(row.steps),
    rollingSteps: rollingAverage(rows, index, "steps", 7)
  }));
}

export function buildWeeklyDiagnosisData(timeline = []) {
  return timeline.map((week) => ({
    week: week.week,
    label: `W${week.week}`,
    diagnosis: week.diagnosisTitle,
    confidence: week.confidence,
    expectedLoss: roundNumber(week.expectedLossPerWeek),
    observedLoss: roundNumber(week.observedLossPerWeek),
    mismatch: roundNumber(week.mismatchKgPerWeek),
    adherenceScore: roundNumber(week.adherenceScore, 0),
    maskingRisk: week.maskingRisk
  }));
}

function rollingAverage(rows, index, key, windowSize = 7) {
  const start = Math.max(0, index - windowSize + 1);
  const window = rows.slice(start, index + 1);

  const values = window
    .map((row) => toNumber(row[key]))
    .filter(Number.isFinite);

  if (!values.length) return null;

  return (
    values.reduce((sum, value) => sum + value, 0) /
    values.length
  );
}

function toNumber(value) {
  const number = Number(value);
  return Number.isFinite(number) ? number : null;
}

function roundNumber(value, decimals = 2) {
  if (!Number.isFinite(Number(value))) return null;
  return Number(Number(value).toFixed(decimals));
}