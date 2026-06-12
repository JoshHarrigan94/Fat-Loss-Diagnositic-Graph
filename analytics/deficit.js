/**
 * deficit.js
 *
 * Energy deficit analysis layer.
 *
 * Purpose:
 * - Estimate calorie deficit
 * - Estimate expected fat-loss rate
 * - Classify deficit size
 * - Identify whether the deficit is aggressive, moderate or weak
 */

export function analyseDeficit(rows = [], options = {}) {
  const config = {
    estimatedMaintenanceCalories: options.estimatedMaintenanceCalories || 3700,
    kcalPerKg: options.kcalPerKg || 7700
  };

  const calories = rows
    .map((row) => Number(row.calories))
    .filter(Number.isFinite);

  const averageCalories = average(calories);

  const dailyDeficit =
    config.estimatedMaintenanceCalories - averageCalories;

  const weeklyDeficit =
    dailyDeficit * 7;

  const expectedLossPerWeek =
    weeklyDeficit / config.kcalPerKg;

  return {
    estimatedMaintenanceCalories: config.estimatedMaintenanceCalories,
    averageCalories,
    dailyDeficit,
    weeklyDeficit,
    expectedLossPerWeek,
    classification: classifyDeficit(dailyDeficit),
    flags: {
      deficitDetected: dailyDeficit > 250,
      aggressiveDeficit: dailyDeficit > 900,
      weakDeficit: dailyDeficit < 250
    }
  };
}

function classifyDeficit(dailyDeficit) {
  if (!Number.isFinite(dailyDeficit)) {
    return "unknown";
  }

  if (dailyDeficit > 900) {
    return "aggressive_deficit";
  }

  if (dailyDeficit > 500) {
    return "moderate_deficit";
  }

  if (dailyDeficit > 250) {
    return "mild_deficit";
  }

  if (dailyDeficit > -150) {
    return "maintenance_range";
  }

  return "surplus";
}

function average(values = []) {
  const clean = values.filter(Number.isFinite);

  if (!clean.length) return NaN;

  return clean.reduce((sum, value) => sum + value, 0) / clean.length;
}