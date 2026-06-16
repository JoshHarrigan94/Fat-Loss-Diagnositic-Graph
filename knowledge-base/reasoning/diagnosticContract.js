function unique(values) {
  return [...new Set(values.filter(Boolean))];
}

function hasAny(values = [], candidates = []) {
  return candidates.some(candidate => values.includes(candidate));
}

export function classifyDiagnosisState({
  activatedNodeIds = [],
  activations = []
} = {}) {
  const likelyIssues = [];
  const confidenceFlags = [];
  const interpretationFlags = [];
  const riskFlags = [];
  const contraindications = [];

  const directNodeIds = activations
    .filter(item => item.activationType === "direct")
    .map(item => item.id);

  const trendRequiresInterpretation =
    activatedNodeIds.includes("weight_trend_confidence");

  const scaleNoiseHigh = hasAny(directNodeIds, [
    "measurement_noise_interpretation",
    "scale_weight_variability",
    "water_retention_from_stress",
    "training_inflammation_shift"
  ]);

  const dataQualityLow = hasAny(directNodeIds, [
    "calorie_tracking_accuracy",
    "energy_intake_estimate",
    "activity_tracking_accuracy"
  ]);

  const trendConfidenceLow = scaleNoiseHigh || dataQualityLow;

  const recoveryBottleneck = hasAny(activatedNodeIds, [
    "sleep_quality",
    "stress_load",
    "recovery_debt",
    "recovery_risk_level",
    "constraint_low_recovery_capacity",
    "training_recovery_status"
  ]);

  const dietFatigueLikely = hasAny(activatedNodeIds, [
    "diet_fatigue_risk",
    "diet_break_readiness",
    "fatigue_driven_adherence_decline"
  ]);

  const adherenceFriction = hasAny(activatedNodeIds, [
    "weekend_adherence_gap",
    "constraint_low_adherence_capacity",
    "perceived_plan_burden",
    "behavioural_friction",
    "executive_load",
    "environmental_food_exposure",
    "lapse_recovery_skill"
  ]);

  const activityBottleneck = hasAny(activatedNodeIds, [
    "low_activity_bottleneck",
    "sedentary_time",
    "step_count_consistency",
    "neat_adaptation"
  ]);

  const nutritionQualityIssue = hasAny(activatedNodeIds, [
    "nutrition_quality",
    "protein_adequacy",
    "fibre_adequacy",
    "food_volume_satiety",
    "ultra_processed_food_exposure",
    "liquid_calorie_exposure"
  ]);

  const appetiteIssue = hasAny(activatedNodeIds, [
    "hunger_pressure",
    "satiety_response",
    "craving_intensity",
    "reward_driven_eating",
    "early_day_underfeeding"
  ]);

  const leanMassProtection = hasAny(activatedNodeIds, [
    "population_older_adult",
    "population_bodybuilder",
    "population_lean",
    "sarcopenia_risk",
    "priority_functional_independence",
    "priority_lean_mass_retention",
    "priority_performance",
    "resistance_training_quality",
    "training_goal_alignment",
    "injury_risk_from_training",
    "training_volume_tolerance"
  ]);

  const truePlateauLikely =
    directNodeIds.includes("weekly_energy_deficit") &&
    !trendConfidenceLow &&
    !recoveryBottleneck &&
    !dietFatigueLikely &&
    !adherenceFriction &&
    !activityBottleneck &&
    !nutritionQualityIssue &&
    !appetiteIssue &&
    !hasAny(activatedNodeIds, [
      "hypoglycaemia_risk",
      "glucose_safety_risk",
      "medical_risk_level"
    ]);

  if (trendRequiresInterpretation) {
    interpretationFlags.push("trend_requires_interpretation");
  }

  if (trendConfidenceLow) {
    confidenceFlags.push("trend_confidence_low");
  }

  if (scaleNoiseHigh) {
    confidenceFlags.push("scale_noise_high");
    likelyIssues.push("scale_noise_possible");
  }

  if (dataQualityLow) {
    confidenceFlags.push("data_quality_low");
    likelyIssues.push("low_intake_confidence");
  }

  if (truePlateauLikely) {
    likelyIssues.push("insufficient_weekly_energy_deficit");
    likelyIssues.push("true_plateau_likely");
  }

  if (activatedNodeIds.includes("weekend_adherence_gap")) {
    likelyIssues.push("weekend_deficit_erosion");
  }

  if (activatedNodeIds.includes("liquid_calorie_exposure")) {
    likelyIssues.push("hidden_liquid_calorie_intake");
  }

  if (activatedNodeIds.includes("sleep_quality")) {
    likelyIssues.push("poor_sleep_recovery_constraint");
  }

  if (activatedNodeIds.includes("stress_load")) {
    likelyIssues.push("high_stress_load");
  }

  if (activatedNodeIds.includes("diet_fatigue_risk")) {
    likelyIssues.push("diet_fatigue_risk");
  }

  if (activatedNodeIds.includes("performance_decline_during_deficit")) {
    likelyIssues.push("performance_decline_during_deficit");
  }

  if (activityBottleneck) {
    likelyIssues.push("low_activity_bottleneck");
  }

  if (
    hasAny(activatedNodeIds, [
      "population_older_adult",
      "sarcopenia_risk",
      "priority_functional_independence"
    ])
  ) {
    likelyIssues.push("lean_mass_retention_priority");
  }

  if (activatedNodeIds.includes("population_lean")) {
    likelyIssues.push("higher_diet_fatigue_and_lean_mass_loss_risk");
  }

  if (activatedNodeIds.includes("hypoglycaemia_risk")) {
    likelyIssues.push("hypoglycaemia_risk");
    riskFlags.push("hypoglycaemia_risk");
  }

  if (activatedNodeIds.includes("glucose_safety_risk")) {
    riskFlags.push("glucose_safety_risk");
  }

  if (activatedNodeIds.includes("medical_risk_level")) {
    riskFlags.push("medical_risk_level");
  }

  if (activatedNodeIds.includes("contraindication_unsupervised_fasting")) {
    contraindications.push("contraindication_unsupervised_fasting");
  }

  if (activatedNodeIds.includes("contraindication_carbohydrate_restriction")) {
    contraindications.push("contraindication_carbohydrate_restriction");
  }

  if (activatedNodeIds.includes("contraindication_aggressive_deficit")) {
    contraindications.push("contraindication_aggressive_deficit");
  }

  if (activatedNodeIds.includes("contraindication_strict_tracking")) {
    contraindications.push("contraindication_strict_tracking");
  }

  return {
    likelyIssues: unique(likelyIssues),
    confidenceFlags: unique(confidenceFlags),
    interpretationFlags: unique(interpretationFlags),
    riskFlags: unique(riskFlags),
    contraindications: unique(contraindications),
    signalProfile: {
      trendRequiresInterpretation,
      trendConfidenceLow,
      scaleNoiseHigh,
      dataQualityLow,
      truePlateauLikely,
      recoveryBottleneck,
      dietFatigueLikely,
      adherenceFriction,
      activityBottleneck,
      nutritionQualityIssue,
      appetiteIssue,
      leanMassProtection
    },
    directNodeIds
  };
}

export function chooseRecommendationMode({
  riskFlags = [],
  contraindications = [],
  signalProfile = {}
} = {}) {
  if (riskFlags.length || contraindications.length) {
    return "recommendation_mode_referral_first";
  }

  if (
    signalProfile.dataQualityLow ||
    signalProfile.scaleNoiseHigh ||
    signalProfile.trendConfidenceLow
  ) {
    return "recommendation_mode_monitor_only";
  }

  if (
    signalProfile.recoveryBottleneck ||
    signalProfile.dietFatigueLikely ||
    signalProfile.leanMassProtection
  ) {
    return "recommendation_mode_conservative";
  }

  return "recommendation_mode_standard";
}
