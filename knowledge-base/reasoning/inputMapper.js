function hasValue(value) {
  return value !== undefined && value !== null && value !== false;
}

function signal(nodeId, reason, confidence = "moderate", metadata = {}) {
  return {
    nodeId,
    reason,
    confidence,
    metadata
  };
}

export function mapInputsToSignals(userCase) {
  const inputs = userCase.inputs || userCase;
  const signals = [];

  /**
   * Population context
   */
  if (inputs.population === "type_2_diabetes") {
    signals.push(
      signal(
        "population_type2_diabetes",
        "User is in a type 2 diabetes context.",
        "high"
      ),
      signal(
        "priority_glucose_control",
        "Glucose control should be prioritised.",
        "high"
      )
    );
  }

  if (inputs.population === "bodybuilder") {
    signals.push(
      signal(
        "population_bodybuilder",
        "User is in a bodybuilding context.",
        "high"
      ),
      signal(
        "priority_lean_mass_retention",
        "Lean mass retention should be prioritised.",
        "high"
      )
    );
  }

  if (inputs.bodyFatContext === "lean") {
    signals.push(
      signal(
        "population_lean",
        "User appears to be in a leaner fat-loss context.",
        "moderate"
      )
    );
  }

  /**
   * Measurement and confidence
   */
  if (inputs.weightTrend === "stable") {
    signals.push(
      signal(
        "weight_trend_confidence",
        "Stable weight trend requires confidence assessment.",
        "moderate"
      )
    );
  }

  if (inputs.scaleWeightVariability === "high") {
    signals.push(
      signal(
        "scale_weight_variability",
        "High scale variability may reduce confidence in short-term trend interpretation.",
        "moderate"
      ),
      signal(
        "measurement_noise_interpretation",
        "Scale data may require measurement-noise interpretation.",
        "moderate"
      )
    );
  }

  if (inputs.scaleSpike) {
    signals.push(
      signal(
        "scale_weight_variability",
        "A scale spike may reflect temporary weight variability rather than fat gain.",
        "moderate"
      )
    );
  }

  if (inputs.calorieTrackingAccuracy === "low" || inputs.missedLogs) {
    signals.push(
      signal(
        "calorie_tracking_accuracy",
        "Reported intake may not accurately reflect actual intake.",
        "high"
      ),
      signal(
        "energy_intake_estimate",
        "Energy intake estimate requires improved confidence.",
        "high"
      )
    );
  }

  if (inputs.weekendAdherenceGap) {
    signals.push(
      signal(
        "weekend_adherence_gap",
        "Weekend intake or behaviour may reduce the weekly deficit.",
        "high"
      )
    );
  }

  if (inputs.liquidCalories) {
    signals.push(
      signal(
        "liquid_calorie_exposure",
        "Liquid calories may reduce satiety and erode the weekly deficit.",
        "moderate"
      )
    );
  }

  /**
   * Sleep, stress, and recovery
   */
  if (inputs.sleepQuality === "low") {
    signals.push(
      signal(
        "sleep_quality",
        "Poor sleep may reduce recovery and increase appetite pressure.",
        "high"
      )
    );
  }

  if (inputs.stressLoad === "high") {
    signals.push(
      signal(
        "stress_load",
        "High stress may impair recovery, appetite regulation, and adherence.",
        "moderate"
      )
    );
  }

  if (
    inputs.scaleSpike &&
    (inputs.sleepQuality === "low" || inputs.stressLoad === "high")
  ) {
    signals.push(
      signal(
        "water_retention_from_stress",
        "Scale spike may reflect stress or sleep-related water retention.",
        "moderate"
      )
    );
  }

  if (inputs.trainingSoreness === "high") {
    signals.push(
      signal(
        "training_inflammation_shift",
        "Training soreness may temporarily increase water retention.",
        "moderate"
      )
    );
  }

  /**
   * Glucose and medical safety
   */
  if (inputs.diabetesMedication) {
    signals.push(
      signal(
        "diabetes_medication_context",
        "Diabetes medication may modify glucose safety.",
        "high"
      )
    );
  }

  if (inputs.hypoglycaemiaRisk) {
    signals.push(
      signal(
        "hypoglycaemia_risk",
        "Hypoglycaemia risk makes fasting, carbohydrate restriction, and exercise changes safety-sensitive.",
        "high"
      ),
      signal(
        "glucose_safety_risk",
        "Glucose safety risk is elevated.",
        "high"
      )
    );
  }

  if (inputs.fastingRequested) {
    signals.push(
      signal(
        "contraindication_unsupervised_fasting",
        "Fasting request should be screened for contraindications.",
        inputs.hypoglycaemiaRisk ? "high" : "moderate"
      )
    );
  }

  if (inputs.carbohydrateRestrictionRequested) {
    signals.push(
      signal(
        "contraindication_carbohydrate_restriction",
        "Carbohydrate restriction request should be checked against glucose, medication, and performance context.",
        inputs.diabetesMedication ? "high" : "moderate"
      )
    );
  }

  /**
   * Diet fatigue and performance
   */
  if (inputs.dietDurationWeeks >= 8) {
    signals.push(
      signal(
        "deficit_duration",
        "Diet duration is long enough to consider accumulating diet fatigue.",
        "moderate",
        { weeks: inputs.dietDurationWeeks }
      )
    );
  }

  if (inputs.hungerPressure === "high") {
    signals.push(
      signal(
        "hunger_pressure",
        "High hunger pressure may reduce adherence and increase diet fatigue risk.",
        "high"
      )
    );
  }

  if (inputs.dietDurationWeeks >= 8 && inputs.hungerPressure === "high") {
    signals.push(
      signal(
        "diet_fatigue_risk",
        "Longer deficit duration with high hunger suggests elevated diet fatigue risk.",
        "high"
      )
    );
  }

  if (inputs.trainingPerformance === "declining") {
    signals.push(
      signal(
        "performance_decline_during_deficit",
        "Training performance decline may indicate deficit or recovery strain.",
        "moderate"
      )
    );
  }

  /**
   * Activity
   */
  if (inputs.stepCountConsistency === "low") {
    signals.push(
      signal(
        "step_count_consistency",
        "Low step consistency may reduce expenditure reliability.",
        "moderate"
      )
    );
  }

  if (inputs.sedentaryTime === "high") {
    signals.push(
      signal(
        "sedentary_time",
        "High sedentary time may create a low-activity bottleneck.",
        "moderate"
      ),
      signal(
        "low_activity_bottleneck",
        "Low daily activity may be limiting expenditure and health outcomes.",
        "moderate"
      )
    );
  }

  /**
   * Deduplicate by nodeId while preserving strongest confidence.
   */
  const confidenceRank = {
    low: 1,
    moderate: 2,
    high: 3
  };

  const byNode = new Map();

  signals.forEach(item => {
    const existing = byNode.get(item.nodeId);

    if (!existing) {
      byNode.set(item.nodeId, item);
      return;
    }

    const existingRank = confidenceRank[existing.confidence] || 0;
    const nextRank = confidenceRank[item.confidence] || 0;

    if (nextRank > existingRank) {
      byNode.set(item.nodeId, {
        ...item,
        reason: `${existing.reason} ${item.reason}`.trim()
      });
    } else {
      byNode.set(item.nodeId, {
        ...existing,
        reason: `${existing.reason} ${item.reason}`.trim()
      });
    }
  });

  return [...byNode.values()];
}

export default mapInputsToSignals;