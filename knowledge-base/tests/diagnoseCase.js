import { assembleKnowledgeGraph } from "./assembleGraph.js";

function hasValue(value) {
  return value !== undefined && value !== null && value !== false;
}

function unique(values) {
  return [...new Set(values.filter(Boolean))];
}

function createActivatedNode(id, reason, confidence = "moderate") {
  return {
    id,
    reason,
    confidence
  };
}

export function diagnoseCase(userCase) {
  const graph = assembleKnowledgeGraph();

  const inputs = userCase.inputs || userCase;

  const activatedNodes = [];
  const likelyIssues = [];
  const confidenceFlags = [];
  const riskFlags = [];
  const contraindications = [];
  const strategies = [];

  /**
   * 1. Population context
   */
  if (inputs.population === "type_2_diabetes") {
    activatedNodes.push(
      createActivatedNode(
        "population_type2_diabetes",
        "User is in a type 2 diabetes context.",
        "high"
      )
    );

    activatedNodes.push(
      createActivatedNode(
        "priority_glucose_control",
        "Glucose control should be prioritised.",
        "high"
      )
    );
  }

  if (inputs.population === "bodybuilder") {
    activatedNodes.push(
      createActivatedNode(
        "population_bodybuilder",
        "User is in a bodybuilding context.",
        "high"
      )
    );

    activatedNodes.push(
      createActivatedNode(
        "priority_lean_mass_retention",
        "Lean mass retention should be prioritised.",
        "high"
      )
    );
  }

  if (inputs.bodyFatContext === "lean") {
    activatedNodes.push(
      createActivatedNode(
        "population_lean",
        "User appears to be in a leaner fat-loss context.",
        "moderate"
      )
    );

    likelyIssues.push("higher_diet_fatigue_and_lean_mass_loss_risk");
  }

  /**
   * 2. Measurement and confidence
   */
  if (inputs.weightTrend === "stable" && inputs.scaleWeightVariability === "high") {
    activatedNodes.push(
      createActivatedNode(
        "measurement_noise_interpretation",
        "Stable weight with high variability may reflect noisy scale data.",
        "moderate"
      ),
      createActivatedNode(
        "weight_trend_confidence",
        "Weight trend confidence may be reduced.",
        "moderate"
      ),
      createActivatedNode(
        "measurement_decision_threshold",
        "More reliable data may be needed before changing the plan.",
        "moderate"
      )
    );

    confidenceFlags.push("weight_trend_confidence_low");
    strategies.push("strategy_monitoring_confidence");
  }

  if (inputs.calorieTrackingAccuracy === "low" || inputs.missedLogs) {
    activatedNodes.push(
      createActivatedNode(
        "calorie_tracking_accuracy",
        "Reported intake may not accurately reflect actual intake.",
        "high"
      ),
      createActivatedNode(
        "energy_intake_estimate",
        "Energy intake estimate requires improved confidence.",
        "high"
      )
    );

    likelyIssues.push("low_intake_confidence");
    confidenceFlags.push("calorie_tracking_confidence_low");
    strategies.push("strategy_monitoring_confidence");
  }

  if (inputs.weekendAdherenceGap) {
    activatedNodes.push(
      createActivatedNode(
        "weekend_adherence_gap",
        "Weekend intake or behaviour may reduce the weekly deficit.",
        "high"
      )
    );

    likelyIssues.push("weekend_deficit_erosion");
  }

  if (inputs.liquidCalories) {
    activatedNodes.push(
      createActivatedNode(
        "liquid_calorie_exposure",
        "Liquid calories may reduce satiety and erode the weekly deficit.",
        "moderate"
      )
    );

    likelyIssues.push("hidden_liquid_calorie_intake");
  }

  /**
   * 3. Sleep, stress, water retention
   */
  if (inputs.sleepQuality === "low") {
    activatedNodes.push(
      createActivatedNode(
        "sleep_quality",
        "Poor sleep may reduce recovery and increase appetite pressure.",
        "high"
      )
    );

    likelyIssues.push("poor_sleep_recovery_constraint");
    strategies.push("strategy_recovery_repair");
  }

  if (inputs.stressLoad === "high") {
    activatedNodes.push(
      createActivatedNode(
        "stress_load",
        "High stress may impair recovery, appetite regulation, and adherence.",
        "moderate"
      )
    );

    likelyIssues.push("high_stress_load");
  }

  if (inputs.scaleSpike && (inputs.sleepQuality === "low" || inputs.stressLoad === "high")) {
    activatedNodes.push(
      createActivatedNode(
        "water_retention_from_stress",
        "Scale spike may reflect stress or sleep-related water retention.",
        "moderate"
      ),
      createActivatedNode(
        "scale_weight_variability",
        "Scale weight may be temporarily elevated by fluid shifts.",
        "moderate"
      )
    );

    confidenceFlags.push("scale_noise_possible");
    strategies.push("strategy_monitoring_confidence");
  }

  if (inputs.trainingSoreness === "high") {
    activatedNodes.push(
      createActivatedNode(
        "training_inflammation_shift",
        "Training soreness may temporarily increase water retention.",
        "moderate"
      )
    );

    confidenceFlags.push("training_inflammation_scale_noise_possible");
  }

  /**
   * 4. Glucose and medical safety
   */
  if (inputs.diabetesMedication) {
    activatedNodes.push(
      createActivatedNode(
        "diabetes_medication_context",
        "Diabetes medication may modify glucose safety.",
        "high"
      )
    );
  }

  if (inputs.hypoglycaemiaRisk) {
    activatedNodes.push(
      createActivatedNode(
        "hypoglycaemia_risk",
        "Hypoglycaemia risk makes fasting, carbohydrate restriction, and exercise changes safety-sensitive.",
        "high"
      ),
      createActivatedNode(
        "glucose_safety_risk",
        "Glucose safety risk is elevated.",
        "high"
      )
    );

    riskFlags.push("hypoglycaemia_risk");
    strategies.push("strategy_medical_review");
  }

  if (inputs.fastingRequested && inputs.hypoglycaemiaRisk) {
    activatedNodes.push(
      createActivatedNode(
        "contraindication_unsupervised_fasting",
        "Unsupervised fasting may be inappropriate with hypoglycaemia risk.",
        "high"
      )
    );

    contraindications.push("contraindication_unsupervised_fasting");
  }

  if (inputs.carbohydrateRestrictionRequested && inputs.diabetesMedication) {
    activatedNodes.push(
      createActivatedNode(
        "contraindication_carbohydrate_restriction",
        "Carbohydrate restriction may need medical or medication-aware modification.",
        "high"
      )
    );

    contraindications.push("contraindication_carbohydrate_restriction");
  }

  /**
   * 5. Diet fatigue and performance
   */
  if (inputs.dietDurationWeeks >= 8 && inputs.hungerPressure === "high") {
    activatedNodes.push(
      createActivatedNode(
        "diet_fatigue_risk",
        "Longer deficit duration with high hunger suggests elevated diet fatigue risk.",
        "high"
      )
    );

    likelyIssues.push("diet_fatigue_risk");
    strategies.push("strategy_diet_break_or_maintenance");
  }

  if (inputs.trainingPerformance === "declining") {
    activatedNodes.push(
      createActivatedNode(
        "performance_decline_during_deficit",
        "Training performance decline may indicate deficit or recovery strain.",
        "moderate"
      )
    );

    likelyIssues.push("performance_decline_during_deficit");
  }

  /**
   * 6. Recommendation mode
   */
  let recommendationMode = "recommendation_mode_standard";

  if (riskFlags.length || contraindications.length) {
    recommendationMode = "recommendation_mode_referral_first";
  } else if (confidenceFlags.length) {
    recommendationMode = "recommendation_mode_monitor_only";
  } else if (
    likelyIssues.includes("poor_sleep_recovery_constraint") ||
    likelyIssues.includes("diet_fatigue_risk")
  ) {
    recommendationMode = "recommendation_mode_conservative";
  }

  const primaryStrategy =
    strategies.includes("strategy_medical_review")
      ? "strategy_medical_review"
      : strategies.includes("strategy_diet_break_or_maintenance")
        ? "strategy_diet_break_or_maintenance"
        : strategies.includes("strategy_recovery_repair")
          ? "strategy_recovery_repair"
          : strategies.includes("strategy_monitoring_confidence")
            ? "strategy_monitoring_confidence"
            : null;

  const secondaryStrategies = unique(strategies).filter(
    strategy => strategy !== primaryStrategy
  );

  const activatedNodeIds = unique(activatedNodes.map(node => node.id));

  const missingActivatedNodes = activatedNodeIds.filter(
    nodeId => !graph.nodes.some(node => node.id === nodeId)
  );

  return {
    caseId: userCase.id || null,
    activatedNodes,
    activatedNodeIds,
    missingActivatedNodes,
    likelyIssues: unique(likelyIssues),
    confidenceFlags: unique(confidenceFlags),
    riskFlags: unique(riskFlags),
    contraindications: unique(contraindications),
    primaryStrategy,
    secondaryStrategies,
    delayedStrategies: [],
    recommendationMode
  };
}

export default diagnoseCase;