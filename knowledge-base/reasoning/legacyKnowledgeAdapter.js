/**
 * Legacy Knowledge Adapter
 *
 * Purpose:
 * Bridges old knowledge-pack concepts into the new governed reasoning engine.
 *
 * Important:
 * - knowledge-base/domains remains the source of truth.
 * - legacy knowledge packs should not become a second ontology.
 * - only reusable heuristics should be promoted here.
 */

function signal(nodeId, reason, confidence = "moderate", metadata = {}) {
  return {
    nodeId,
    reason,
    confidence,
    metadata
  };
}

export function extractLegacyKnowledgeSignals(inputs = {}) {
  const signals = [];

  /**
   * Water / scale noise heuristics
   */
  if (
    inputs.scaleSpike === true ||
    inputs.sodiumChange === "high" ||
    inputs.carbohydrateChange === "high" ||
    inputs.trainingSoreness === "high"
  ) {
    signals.push(
      signal(
        "scale_weight_variability",
        "Legacy heuristic: short-term weight change may be influenced by water, sodium, carbohydrate change, or soreness.",
        "moderate"
      ),
      signal(
        "measurement_noise_interpretation",
        "Legacy heuristic: scale change requires noise-aware interpretation.",
        "moderate"
      )
    );
  }

  if (
    (inputs.sleepQuality === "low" || inputs.stressLoad === "high") &&
    (
      inputs.scaleSpike === true ||
      inputs.scaleWeightVariability === "high" ||
      inputs.trainingSoreness === "high"
    )
  ) {
    signals.push(
      signal(
        "water_retention_from_stress",
        "Legacy heuristic: poor sleep or high stress may contribute to temporary water retention.",
        "moderate"
      )
    );
  }

  /**
   * Energy balance heuristics
   */
  if (
    inputs.weightTrend === "stable" &&
    inputs.calorieTrackingAccuracy === "high" &&
    inputs.adherenceConsistency === "high" &&
    inputs.scaleWeightVariability !== "high" &&
    inputs.stepCountConsistency !== "low" &&
    inputs.sedentaryTime !== "high"
  ) {
    signals.push(
      signal(
        "weekly_energy_deficit",
        "Legacy heuristic: stable low-noise weight with good adherence may indicate insufficient weekly deficit.",
        "moderate"
      ),
      signal(
        "strategy_calorie_adjustment",
        "Legacy heuristic: calorie adjustment may be appropriate when confidence is adequate.",
        "moderate"
      )
    );
  }

  /**
   * Adherence heuristics
   */
  if (inputs.weekendAdherenceGap === true) {
    signals.push(
      signal(
        "weekend_adherence_gap",
        "Legacy heuristic: weekend intake may erode the weekly deficit.",
        "high"
      ),
      signal(
        "adherence_consistency",
        "Legacy heuristic: adherence may be inconsistent across the week.",
        "moderate"
      )
    );
  }

  if (inputs.missedLogs === true) {
    signals.push(
      signal(
        "calorie_tracking_accuracy",
        "Legacy heuristic: missed logs reduce intake confidence.",
        "high"
      ),
      signal(
        "energy_intake_estimate",
        "Legacy heuristic: actual intake may differ from reported intake.",
        "high"
      )
    );
  }

  /**
   * Expenditure / activity heuristics
   */
  if (
    inputs.stepCountConsistency === "low" ||
    inputs.sedentaryTime === "high" ||
    inputs.stepsDropped === true
  ) {
    signals.push(
      signal(
        "step_count_consistency",
        "Legacy heuristic: step consistency appears low.",
        "moderate"
      ),
      signal(
        "low_activity_bottleneck",
        "Legacy heuristic: reduced daily movement may limit expenditure.",
        "moderate"
      )
    );
  }

  /**
   * Recovery / stress heuristics
   */
  if (
    inputs.sleepQuality === "low" ||
    inputs.trainingPerformance === "declining" ||
    inputs.fatigue === "high"
  ) {
    signals.push(
      signal(
        "recovery_risk_level",
        "Legacy heuristic: sleep, fatigue, or performance decline may indicate recovery risk.",
        "moderate"
      )
    );
  }

  if (
    inputs.dietDurationWeeks >= 8 &&
    (
      inputs.hungerPressure === "high" ||
      inputs.trainingPerformance === "declining" ||
      inputs.adherenceConsistency === "declining"
    )
  ) {
    signals.push(
      signal(
        "diet_fatigue_risk",
        "Legacy heuristic: prolonged dieting with hunger, performance decline, or adherence decline suggests diet fatigue.",
        "high"
      )
    );
  }

  return signals;
}

export default extractLegacyKnowledgeSignals;
