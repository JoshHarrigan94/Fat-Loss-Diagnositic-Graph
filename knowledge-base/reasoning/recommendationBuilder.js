import {
  getLegacyInterventionLevers
} from "./legacyGraphAdapter.js";

function unique(values) {
  return [...new Set(values.filter(Boolean))];
}

function getModeLabel(mode) {
  const labels = {
    recommendation_mode_standard: "Standard",
    recommendation_mode_modified: "Modified",
    recommendation_mode_conservative: "Conservative",
    recommendation_mode_monitor_only: "Monitor Only",
    recommendation_mode_referral_first: "Referral First"
  };

  return labels[mode] || "Unknown";
}

function getStrategyLabel(strategyId) {
  const labels = {
    strategy_medical_review: "Medical Review",
    strategy_monitoring_confidence: "Monitoring & Confidence",
    strategy_recovery_repair: "Recovery Repair",
    strategy_diet_break_or_maintenance: "Diet Break or Maintenance",
    strategy_nutrition_quality: "Nutrition Quality",
    strategy_appetite_management: "Appetite Management",
    strategy_activity_increase: "Activity Increase",
    strategy_training_adjustment: "Training Adjustment",
    strategy_habit_environment_design: "Habit & Environment Design",
    strategy_calorie_adjustment: "Calorie Adjustment"
  };

  return labels[strategyId] || strategyId || "None";
}

function getRecommendationIntensity(recommendationMode) {
  if (recommendationMode === "recommendation_mode_referral_first") {
    return "none_until_review";
  }

  if (recommendationMode === "recommendation_mode_monitor_only") {
    return "monitor_only";
  }

  if (recommendationMode === "recommendation_mode_conservative") {
    return "low";
  }

  if (recommendationMode === "recommendation_mode_modified") {
    return "low_to_moderate";
  }

  return "moderate";
}

function buildPrimaryMessage(primaryStrategy, recommendationMode) {
  if (recommendationMode === "recommendation_mode_referral_first") {
    return "Prioritise safety review before escalating fat-loss interventions.";
  }

  if (primaryStrategy === "strategy_monitoring_confidence") {
    return "Improve confidence in the data before changing calories, activity, or training.";
  }

  if (primaryStrategy === "strategy_recovery_repair") {
    return "Repair recovery and sleep constraints before adding more diet or training pressure.";
  }

  if (primaryStrategy === "strategy_diet_break_or_maintenance") {
    return "Reduce accumulated diet strain by moving toward maintenance or a planned diet break.";
  }

  if (primaryStrategy === "strategy_nutrition_quality") {
    return "Improve food quality, protein, fibre, meal structure, and satiety before further restriction.";
  }

  if (primaryStrategy === "strategy_appetite_management") {
    return "Reduce hunger pressure through meal design, timing, satiety, and food-environment changes.";
  }

  if (primaryStrategy === "strategy_activity_increase") {
    return "Increase low-risk daily movement if recovery and injury risk allow.";
  }

  if (primaryStrategy === "strategy_training_adjustment") {
    return "Adjust training to better support muscle retention, performance, recovery, or safety.";
  }

  if (primaryStrategy === "strategy_habit_environment_design") {
    return "Reduce friction and redesign defaults so the plan is easier to repeat.";
  }

  if (primaryStrategy === "strategy_calorie_adjustment") {
    return "Adjust calorie intake only if confidence, adherence, and risk checks support escalation.";
  }

  return "No primary strategy selected yet. Improve input detail or confidence.";
}

function buildSafetyCaveats({
  recommendationMode,
  riskFlags = [],
  contraindications = [],
  blockedStrategies = []
}) {
  const caveats = [];

  if (recommendationMode === "recommendation_mode_referral_first") {
    caveats.push(
      "A safety-sensitive flag is present. Avoid escalating diet, fasting, carbohydrate restriction, or exercise until appropriate review or safeguards are in place."
    );
  }

  if (riskFlags.includes("hypoglycaemia_risk")) {
    caveats.push(
      "Hypoglycaemia risk means fasting, missed meals, carbohydrate restriction, and exercise changes may need medication-aware clinical guidance."
    );
  }

  if (riskFlags.includes("glucose_safety_risk")) {
    caveats.push(
      "Glucose safety risk should modify nutrition, activity, fasting, and monitoring recommendations."
    );
  }

  if (contraindications.includes("contraindication_unsupervised_fasting")) {
    caveats.push(
      "Unsupervised fasting should be avoided or medically supervised in this context."
    );
  }

  if (contraindications.includes("contraindication_carbohydrate_restriction")) {
    caveats.push(
      "Large carbohydrate restriction should be avoided or modified unless medically appropriate."
    );
  }

  if (contraindications.includes("contraindication_strict_tracking")) {
    caveats.push(
      "Strict tracking, frequent weigh-ins, or body checking may be inappropriate if psychological safety risk is high."
    );
  }

  blockedStrategies.forEach(strategy => {
    caveats.push(strategy.reason);
  });

  return unique(caveats);
}

function buildMonitoringGuidance({
  recommendationMode,
  confidenceFlags = [],
  primaryStrategy
}) {
  const guidance = [];

  if (recommendationMode === "recommendation_mode_monitor_only") {
    guidance.push(
      "Collect better trend data before changing the intervention."
    );
  }

  if (confidenceFlags.includes("weight_trend_requires_interpretation")) {
    guidance.push(
      "Use a rolling weight trend rather than reacting to single weigh-ins."
    );
  }

  if (confidenceFlags.includes("calorie_tracking_confidence_low")) {
    guidance.push(
      "Improve intake confidence by checking missed logs, weekends, liquid calories, snacks, oils, sauces, and restaurant meals."
    );
  }

  if (confidenceFlags.includes("scale_noise_possible")) {
    guidance.push(
      "Interpret short-term weight changes alongside sleep, stress, soreness, sodium, digestion, and carbohydrate changes."
    );
  }

  if (primaryStrategy === "strategy_recovery_repair") {
    guidance.push(
      "Monitor sleep quality, fatigue, hunger, training performance, and step count before increasing pressure."
    );
  }

  if (primaryStrategy === "strategy_diet_break_or_maintenance") {
    guidance.push(
      "Review hunger, performance, sleep, adherence, and scale trend after the maintenance period."
    );
  }

  return unique(guidance);
}

function buildNextReviewPoint({
  recommendationMode,
  primaryStrategy
}) {
  if (recommendationMode === "recommendation_mode_referral_first") {
    return "After appropriate medical or specialist review.";
  }

  if (recommendationMode === "recommendation_mode_monitor_only") {
    return "After 7–14 days of improved measurement and behaviour data.";
  }

  if (primaryStrategy === "strategy_diet_break_or_maintenance") {
    return "After 1–2 weeks at maintenance or reduced deficit pressure.";
  }

  if (primaryStrategy === "strategy_recovery_repair") {
    return "After 7–14 days of sleep and recovery-focused changes.";
  }

  return "After 1–2 weeks of consistent execution.";
}

function buildTacticalLevers({
  primaryStrategy,
  secondaryStrategies = [],
  activatedNodeIds = []
}) {
  const strategyIds = unique([
    primaryStrategy,
    ...secondaryStrategies
  ]);

  return strategyIds.flatMap(strategyId =>
    getLegacyInterventionLevers(strategyId, activatedNodeIds).map(lever => ({
      ...lever,
      strategy: strategyId,
      strategyLabel: getStrategyLabel(strategyId)
    }))
  );
}

export function buildRecommendationPackage(diagnosis) {
  const {
    recommendationMode,
    primaryStrategy,
    secondaryStrategies = [],
    delayedStrategies = [],
    blockedStrategies = [],
    likelyIssues = [],
    confidenceFlags = [],
    riskFlags = [],
    contraindications = [],
    activatedNodeIds = []
  } = diagnosis;

  const modeLabel = getModeLabel(recommendationMode);
  const intensity = getRecommendationIntensity(recommendationMode);

  const safetyCaveats = buildSafetyCaveats({
    recommendationMode,
    riskFlags,
    contraindications,
    blockedStrategies
  });

  const monitoringGuidance = buildMonitoringGuidance({
    recommendationMode,
    confidenceFlags,
    primaryStrategy
  });

  const tacticalLevers = buildTacticalLevers({
    primaryStrategy,
    secondaryStrategies,
    activatedNodeIds
  });

  return {
    mode: recommendationMode,
    modeLabel,
    intensity,

    primary: {
      strategy: primaryStrategy,
      label: getStrategyLabel(primaryStrategy),
      message: buildPrimaryMessage(primaryStrategy, recommendationMode)
    },

    secondary: secondaryStrategies.map(strategy => ({
      strategy,
      label: getStrategyLabel(strategy)
    })),

    tacticalLevers,

    delayed: delayedStrategies.map(strategy => ({
      strategy: strategy.id,
      label: getStrategyLabel(strategy.id),
      reason: strategy.reason
    })),

    blocked: blockedStrategies.map(strategy => ({
      strategy: strategy.id,
      label: getStrategyLabel(strategy.id),
      reason: strategy.reason
    })),

    explanation: {
      likelyIssues,
      confidenceFlags,
      riskFlags,
      contraindications
    },

    safetyCaveats,
    monitoringGuidance,

    nextReviewPoint: buildNextReviewPoint({
      recommendationMode,
      primaryStrategy
    })
  };
}

export default buildRecommendationPackage;