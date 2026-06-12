/**
 * config.js
 *
 * Central app configuration.
 *
 * Purpose:
 * - Keep file paths in one place
 * - Keep user assumptions in one place
 * - Make the app easier to deploy or refactor later
 */

export const PATHS = {
  sampleData: "../data/sample.csv",
  graphNodes: "../graph/nodes.json",
  graphEdges: "../graph/edges.json",
  rules: "../rules/rules.json"
};

export const USER_CONFIG = {
  estimatedMaintenanceCalories: 3700,
  proteinTarget: 180,
  sleepHourTarget: 7,
  sleepQualityTarget: 3.5,

  minimumStepDropPercent: 15,
  highVolatilityThresholdKg: 0.45,
  calorieVariabilityThreshold: 350,
  flatTrendThresholdKgPerWeek: 0.25,
  kcalPerKg: 7700
};

export const APP_METADATA = {
  name: "Fat Loss Diagnostic Graph",
  version: "0.1.0",
  mode: "portfolio_mvp"
};