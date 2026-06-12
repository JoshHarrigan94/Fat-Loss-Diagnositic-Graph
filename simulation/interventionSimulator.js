/**
 * interventionSimulator.js
 *
 * Purpose:
 * - Simulate simple intervention scenarios
 * - Estimate likely impact on deficit, prediction and graph pathway
 * - Help answer: "What should I change first?"
 */

export const DEFAULT_SCENARIOS = [
  {
    id: "reduce_calories_200",
    label: "Calories -200",
    changes: {
      calories: -200
    }
  },
  {
    id: "increase_steps_3000",
    label: "Steps +3000",
    changes: {
      steps: 3000
    }
  },
  {
    id: "sleep_plus_1h",
    label: "Sleep +1h",
    changes: {
      sleep_hours: 1,
      sleep_quality: 0.5
    }
  },
  {
    id: "training_load_minus_2",
    label: "Training load -2",
    changes: {
      training_load: -2
    }
  }
];

export function runInterventionSimulation({
  rows = [],
  baselineAnalytics,
  baselineDiagnosis,
  scenarios = DEFAULT_SCENARIOS,
  options = {}
}) {
  return scenarios.map((scenario) => {
    const adjustedRows = applyScenarioToRecentRows(
      rows,
      scenario,
      options
    );

    const impact = estimateScenarioImpact({
      scenario,
      baselineAnalytics,
      baselineDiagnosis
    });

    return {
      scenarioId: scenario.id,
      label: scenario.label,
      changes: scenario.changes,
      adjustedRows,
      impact
    };
  });
}

export function applyScenarioToRecentRows(
  rows = [],
  scenario,
  options = {}
) {
  const daysToAdjust = options.daysToAdjust || 7;

  const sortedRows = [...rows]
    .filter((row) => row.date)
    .sort((a, b) => new Date(a.date) - new Date(b.date));

  const cutoffIndex = Math.max(
    sortedRows.length - daysToAdjust,
    0
  );

  return sortedRows.map((row, index) => {
    if (index < cutoffIndex) return row;

    return applyChangesToRow(
      row,
      scenario.changes
    );
  });
}

function applyChangesToRow(row, changes = {}) {
  const next = { ...row };

  Object.entries(changes).forEach(([key, change]) => {
    const current = Number(next[key]);

    if (!Number.isFinite(current)) return;

    next[key] = clampByField(
      key,
      current + change
    );
  });

  return next;
}

export function estimateScenarioImpact({
  scenario,
  baselineAnalytics,
  baselineDiagnosis
}) {
  const metrics = baselineAnalytics.metrics || {};
  const signals = baselineAnalytics.signals || {};

  let estimatedWeeklyLossDelta = 0;
  let likelyDiagnosisShift = "No major diagnosis shift expected.";
  let pathwayAffected = "Unknown";
  let risk = "Low";

  if (scenario.changes.calories) {
    estimatedWeeklyLossDelta +=
      ((-scenario.changes.calories) * 7) /
      (baselineAnalytics.config?.kcalPerKg || 7700);

    pathwayAffected = "Energy Balance";

    if (signals.weightVolatilityHigh || signals.possibleMasking) {
      likelyDiagnosisShift =
        "May increase expected loss, but could be the wrong lever if masking is the main issue.";
      risk = "Medium";
    } else {
      likelyDiagnosisShift =
        "Likely increases deficit if adherence is maintained.";
    }
  }

  if (scenario.changes.steps) {
    estimatedWeeklyLossDelta +=
      (scenario.changes.steps / 3000) * 0.15;

    pathwayAffected = "NEAT / Calories Out";
    likelyDiagnosisShift =
      "May improve expenditure without reducing food intake.";
  }

  if (
    scenario.changes.sleep_hours ||
    scenario.changes.sleep_quality
  ) {
    pathwayAffected = "Recovery / Water Retention";

    if (
      baselineDiagnosis?.diagnosisId === "masked_fat_loss" ||
      baselineDiagnosis?.diagnosisId === "recovery_masking"
    ) {
      likelyDiagnosisShift =
        "May reduce water retention and improve confidence in the weight trend.";
    } else {
      likelyDiagnosisShift =
        "May improve recovery but may not directly change deficit size.";
    }

    estimatedWeeklyLossDelta += 0.05;
  }

  if (scenario.changes.training_load) {
    pathwayAffected = "Training Load / Recovery";

    if (scenario.changes.training_load < 0) {
      likelyDiagnosisShift =
        "May reduce fatigue-related water retention if recovery masking is active.";
      estimatedWeeklyLossDelta += 0.05;
    }

    risk = "Low";
  }

  return {
    estimatedWeeklyLossDelta,
    projectedExpectedLoss:
      Number(metrics.expectedLossPerWeek || 0) +
      estimatedWeeklyLossDelta,
    pathwayAffected,
    likelyDiagnosisShift,
    risk
  };
}

function clampByField(key, value) {
  if (key === "calories") return Math.max(value, 800);
  if (key === "steps") return Math.max(value, 0);
  if (key === "sleep_hours") return Math.min(Math.max(value, 0), 12);
  if (key === "sleep_quality") return Math.min(Math.max(value, 1), 5);
  if (key === "training_load") return Math.min(Math.max(value, 1), 10);

  return value;
}