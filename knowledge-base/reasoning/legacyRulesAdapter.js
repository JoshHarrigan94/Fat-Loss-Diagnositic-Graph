/**
 * Legacy Rules Adapter
 *
 * Purpose:
 * Captures useful rule-style thresholds from the old rules layer
 * without keeping rules/ as a competing diagnostic engine.
 */

function ruleSignal(nodeId, reason, confidence = "moderate", metadata = {}) {
  return {
    nodeId,
    reason,
    confidence,
    metadata
  };
}

export function extractLegacyRuleSignals(inputs = {}) {
  const signals = [];

  /**
   * Plateau rules
   */
  if (
    inputs.weightTrend === "stable" &&
    inputs.scaleWeightVariability === "low" &&
    inputs.calorieTrackingAccuracy === "high" &&
    inputs.adherenceConsistency === "high" &&
    inputs.stepCountConsistency !== "low" &&
    inputs.sedentaryTime !== "high"
  ) {
    signals.push(
      ruleSignal(
        "weekly_energy_deficit",
        "Rule heuristic: stable low-noise weight with high adherence may indicate insufficient weekly deficit.",
        "moderate"
      ),
      ruleSignal(
        "strategy_calorie_adjustment",
        "Rule heuristic: calorie adjustment may be appropriate if confidence and safety checks are clear.",
        "moderate"
      )
    );
  }

  /**
   * Measurement uncertainty rules
   */
  if (
    inputs.scaleWeightVariability === "high" ||
    inputs.scaleSpike === true
  ) {
    signals.push(
      ruleSignal(
        "measurement_noise_interpretation",
        "Rule heuristic: high scale variability requires noise-aware interpretation.",
        "moderate"
      ),
      ruleSignal(
        "measurement_decision_threshold",
        "Rule heuristic: avoid intervention escalation until trend confidence improves.",
        "moderate"
      )
    );
  }

  /**
   * Intake confidence rules
   */
  if (
    inputs.calorieTrackingAccuracy === "low" ||
    inputs.missedLogs === true
  ) {
    signals.push(
      ruleSignal(
        "calorie_tracking_accuracy",
        "Rule heuristic: intake confidence is reduced by poor tracking or missed logs.",
        "high"
      ),
      ruleSignal(
        "energy_intake_estimate",
        "Rule heuristic: actual energy intake may differ from reported intake.",
        "high"
      )
    );
  }

  if (inputs.weekendAdherenceGap === true) {
    signals.push(
      ruleSignal(
        "weekend_adherence_gap",
        "Rule heuristic: weekend drift is more consistent with an adherence bottleneck than with low data confidence.",
        "high"
      )
    );
  }

  /**
   * Recovery-first rules
   */
  if (
    inputs.sleepQuality === "low" ||
    inputs.stressLoad === "high" ||
    inputs.fatigue === "high"
  ) {
    signals.push(
      ruleSignal(
        "recovery_risk_level",
        "Rule heuristic: poor sleep, high stress, or high fatigue should restrict escalation.",
        "moderate"
      ),
      ruleSignal(
        "strategy_recovery_repair",
        "Rule heuristic: recovery repair may be needed before adding more pressure.",
        "moderate"
      )
    );
  }

  /**
   * Diet fatigue rules
   */
  if (
    inputs.dietDurationWeeks >= 8 &&
    (
      inputs.hungerPressure === "high" ||
      inputs.trainingPerformance === "declining" ||
      inputs.adherenceConsistency === "declining"
    )
  ) {
    signals.push(
      ruleSignal(
        "diet_fatigue_risk",
        "Rule heuristic: prolonged dieting with hunger, performance decline, or adherence decline suggests diet fatigue.",
        "high"
      ),
      ruleSignal(
        "strategy_diet_break_or_maintenance",
        "Rule heuristic: maintenance or diet break may be preferable to escalation.",
        "high"
      )
    );
  }

  /**
   * Medical safety rules
   */
  if (
    inputs.hypoglycaemiaRisk === true ||
    inputs.diabetesMedication === true
  ) {
    signals.push(
      ruleSignal(
        "glucose_safety_risk",
        "Rule heuristic: diabetes medication or hypoglycaemia risk requires glucose safety screening.",
        "high"
      ),
      ruleSignal(
        "strategy_medical_review",
        "Rule heuristic: medical review may be required before escalation.",
        "high"
      )
    );
  }

  if (
    inputs.fastingRequested === true &&
    inputs.hypoglycaemiaRisk === true
  ) {
    signals.push(
      ruleSignal(
        "contraindication_unsupervised_fasting",
        "Rule heuristic: fasting is contraindicated or requires supervision when hypoglycaemia risk is present.",
        "high"
      )
    );
  }

  if (
    inputs.carbohydrateRestrictionRequested === true &&
    inputs.diabetesMedication === true
  ) {
    signals.push(
      ruleSignal(
        "contraindication_carbohydrate_restriction",
        "Rule heuristic: carbohydrate restriction requires medication-aware modification.",
        "high"
      )
    );
  }

  return signals;
}

export default extractLegacyRuleSignals;
