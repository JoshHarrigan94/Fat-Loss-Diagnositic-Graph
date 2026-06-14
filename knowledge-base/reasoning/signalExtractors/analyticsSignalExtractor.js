import { analyseTrends } from "../../../analytics/trends.js";
import { analyseAdherence } from "../../../analytics/adherence.js";
import { analyseDeficit } from "../../../analytics/deficit.js";
import { analyseWeightSignal } from "../../../analytics/weightSignal.js";

function signal(nodeId, reason, confidence = "moderate", metadata = {}) {
  return {
    nodeId,
    reason,
    confidence,
    metadata
  };
}

function isFiniteNumber(value) {
  return Number.isFinite(Number(value));
}

function classifyWeightTrend(weightSignal) {
  if (!weightSignal?.momentum) return null;

  if (weightSignal.momentum === "flat") return "stable";
  if (weightSignal.momentum === "dropping") return "losing";
  if (weightSignal.momentum === "dropping_fast") return "losing_fast";
  if (weightSignal.momentum === "gaining") return "gaining";

  return null;
}

function classifyScaleVariability(weightSignal) {
  if (weightSignal?.flags?.weightVolatilityHigh) return "high";
  return "low";
}

function classifyTrackingAccuracy(adherence) {
  if (adherence?.flags?.calorieVariabilityHigh) return "low";
  return "moderate";
}

function classifyStepConsistency(trends) {
  if (trends?.signals?.stepsDropped) return "low";
  return "moderate";
}

function classifySleepQuality(trends) {
  if (trends?.signals?.sleepPoor) return "low";
  return "normal";
}

function buildMappedInputs({
  trends,
  adherence,
  deficit,
  weightSignal
}) {
  return {
    weightTrend: classifyWeightTrend(weightSignal),
    scaleWeightVariability: classifyScaleVariability(weightSignal),

    calorieTrackingAccuracy: classifyTrackingAccuracy(adherence),
    adherenceConsistency:
      adherence?.score >= 75 ? "high" :
      adherence?.score >= 50 ? "moderate" :
      "low",

    stepCountConsistency: classifyStepConsistency(trends),
    sleepQuality: classifySleepQuality(trends),

    weekendAdherenceGap:
      Boolean(adherence?.flags?.weekendDriftHigh),

    liquidCalories: false,

    proteinAdequacy:
      trends?.signals?.proteinLow ? "low" : "adequate",

    dietDurationWeeks:
      Math.ceil((trends?.metrics?.daysImported || 0) / 7),

    estimatedDailyDeficit:
      isFiniteNumber(deficit?.dailyDeficit)
        ? deficit.dailyDeficit
        : null,

    expectedLossPerWeek:
      isFiniteNumber(deficit?.expectedLossPerWeek)
        ? deficit.expectedLossPerWeek
        : null,

    observedLossPerWeek:
      isFiniteNumber(weightSignal?.observedLossPerWeek)
        ? weightSignal.observedLossPerWeek
        : null
  };
}

export function extractAnalyticsSignals(rows = [], options = {}) {
  const trends = analyseTrends(rows, options);
  const adherence = analyseAdherence(rows, options);
  const deficit = analyseDeficit(rows, options);
  const weightSignal = analyseWeightSignal(rows, options);

  const mappedInputs = buildMappedInputs({
    trends,
    adherence,
    deficit,
    weightSignal
  });

  const signals = [];

  /**
   * Weight and measurement signals
   */
  if (weightSignal?.flags?.weightTrendFlat) {
    signals.push(
      signal(
        "weight_trend_confidence",
        "Weight trend appears flat and requires interpretation.",
        "moderate",
        {
          observedLossPerWeek: weightSignal.observedLossPerWeek
        }
      )
    );
  }

  if (weightSignal?.flags?.weightVolatilityHigh) {
    signals.push(
      signal(
        "scale_weight_variability",
        "Recent body weight is volatile.",
        "moderate",
        {
          volatility7: weightSignal.volatility7
        }
      ),
      signal(
        "measurement_noise_interpretation",
        "Scale trend may require noise-aware interpretation.",
        "moderate"
      )
    );
  }

  if (weightSignal?.flags?.possibleMasking) {
    signals.push(
      signal(
        "measurement_decision_threshold",
        "Observed plateau may be masked by scale volatility.",
        "moderate"
      )
    );
  }

  /**
   * Energy balance signals
   */
  if (deficit?.flags?.weakDeficit) {
    signals.push(
      signal(
        "weekly_energy_deficit",
        "Estimated deficit appears weak or close to maintenance.",
        "moderate",
        {
          dailyDeficit: deficit.dailyDeficit,
          weeklyDeficit: deficit.weeklyDeficit,
          expectedLossPerWeek: deficit.expectedLossPerWeek
        }
      ),
      signal(
        "strategy_calorie_adjustment",
        "Calorie adjustment may be appropriate if confidence and risk checks are clear.",
        "moderate"
      )
    );
  }

  if (deficit?.flags?.aggressiveDeficit) {
    signals.push(
      signal(
        "deficit_magnitude",
        "Estimated deficit appears aggressive.",
        "moderate",
        {
          dailyDeficit: deficit.dailyDeficit,
          weeklyDeficit: deficit.weeklyDeficit
        }
      )
    );
  }

  /**
   * Adherence signals
   */
  if (adherence?.flags?.calorieVariabilityHigh) {
    signals.push(
      signal(
        "calorie_tracking_accuracy",
        "High calorie variability may reduce intake confidence.",
        "moderate",
        {
          calorieDeviation: adherence.calorieDeviation
        }
      ),
      signal(
        "energy_intake_estimate",
        "Energy intake estimate may need improved confidence.",
        "moderate"
      )
    );
  }

  if (adherence?.flags?.weekendDriftHigh) {
    signals.push(
      signal(
        "weekend_adherence_gap",
        "Weekend calories appear meaningfully higher than weekday calories.",
        "high",
        {
          weekendDrift: adherence.weekendDrift,
          weekdayAverage: adherence.weekdayAverage,
          weekendAverage: adherence.weekendAverage
        }
      )
    );
  }

  if (adherence?.flags?.proteinInconsistent) {
    signals.push(
      signal(
        "protein_adequacy",
        "Protein consistency appears low against target.",
        "moderate",
        {
          proteinAverage: adherence.proteinAverage,
          proteinAdherenceRate: adherence.proteinAdherenceRate
        }
      ),
      signal(
        "nutrition_quality",
        "Nutrition quality may need improvement due to inconsistent protein.",
        "moderate"
      )
    );
  }

  /**
   * Activity / NEAT signals
   */
  if (trends?.signals?.stepsDropped) {
    signals.push(
      signal(
        "step_count_consistency",
        "Steps have dropped compared with the previous period.",
        "moderate",
        {
          stepDropPercent: trends.metrics.stepDropPercent,
          avgSteps7: trends.metrics.avgSteps7,
          avgStepsPrevious7: trends.metrics.avgStepsPrevious7
        }
      ),
      signal(
        "low_activity_bottleneck",
        "Reduced steps may be limiting expenditure.",
        "moderate"
      )
    );
  }

  /**
   * Sleep / recovery signals
   */
  if (trends?.signals?.sleepPoor) {
    signals.push(
      signal(
        "sleep_quality",
        "Sleep appears poor based on recent sleep duration or quality.",
        "high",
        {
          avgSleepHours7: trends.metrics.avgSleepHours7,
          avgSleepQuality7: trends.metrics.avgSleepQuality7
        }
      )
    );
  }

  if (trends?.signals?.trainingLoadHigh) {
    signals.push(
      signal(
        "training_recovery_status",
        "Training load appears high and may affect recovery.",
        "moderate",
        {
          avgTrainingLoad7: trends.metrics.avgTrainingLoad7
        }
      )
    );
  }

  return {
    mappedInputs,
    signals,
    analytics: {
      trends,
      adherence,
      deficit,
      weightSignal
    }
  };
}

export default extractAnalyticsSignals;