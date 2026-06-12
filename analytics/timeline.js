/**
 * timeline.js
 *
 * Builds week-by-week diagnostic windows from daily data.
 */

import { analyseTrends } from "./trends.js";
import { analyseAdherence } from "./adherence.js";
import { analyseDeficit } from "./deficit.js";
import { analyseWeightSignal } from "./weightSignal.js";
import { evaluateRules } from "../rules/diagnosticEngine.js";

export function buildTimeline(rows = [], rules = [], options = {}) {
  const sortedRows = [...rows]
    .filter((row) => row.date)
    .sort((a, b) => new Date(a.date) - new Date(b.date));

  const windows = createWeeklyWindows(sortedRows);

  return windows
    .filter((window) => window.rows.length >= 7)
    .map((window, index) => {
      const trends = analyseTrends(window.rows, options);
      const adherence = analyseAdherence(window.rows, options);
      const deficit = analyseDeficit(window.rows, options);
      const weightSignal = analyseWeightSignal(window.rows, options);

      const signals = {
        ...trends.signals,
        ...deficit.flags,
        ...weightSignal.flags,

        calorieVariabilityHigh:
          trends.signals.calorieVariabilityHigh ||
          adherence.flags.calorieVariabilityHigh,

        weekendCaloriesHigher:
          trends.signals.weekendCaloriesHigher ||
          adherence.flags.weekendDriftHigh,

        proteinLow:
          trends.signals.proteinLow ||
          adherence.flags.proteinInconsistent
      };

      const diagnoses = evaluateRules(rules, signals);
      const primary = diagnoses[0];

      return {
        week: index + 1,
        startDate: window.startDate,
        endDate: window.endDate,
        rowCount: window.rows.length,
        diagnosisId: primary?.diagnosisId || "insufficient_signal",
        diagnosisTitle: primary?.title || "No strong diagnosis",
        confidence: primary?.confidence || 40,
        expectedLossPerWeek: trends.metrics.expectedLossPerWeek,
        observedLossPerWeek: trends.metrics.observedLossPerWeek,
        mismatchKgPerWeek: trends.metrics.mismatchKgPerWeek,
        adherenceScore: adherence.score,
        deficitType: deficit.classification,
        weightMomentum: weightSignal.momentum,
        maskingRisk: weightSignal.flags.possibleMasking
      };
    });
}

function createWeeklyWindows(rows = []) {
  const windows = [];

  for (let i = 0; i < rows.length; i += 7) {
    const chunk = rows.slice(i, i + 7);

    if (!chunk.length) continue;

    windows.push({
      startDate: chunk[0].date,
      endDate: chunk[chunk.length - 1].date,
      rows: chunk
    });
  }

  return windows;
}
