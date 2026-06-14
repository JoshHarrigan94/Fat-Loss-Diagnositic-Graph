function unique(values) {
  return [...new Set(values.filter(Boolean))];
}

function hasAny(nodeIds, candidates) {
  return candidates.some(candidate => nodeIds.includes(candidate));
}

function addStrategy(strategies, id, reason, priority = "moderate") {
  strategies.push({
    id,
    reason,
    priority
  });
}

function priorityRank(priority) {
  const ranks = {
    low: 1,
    moderate: 2,
    high: 3,
    critical: 4
  };

  return ranks[priority] || 0;
}

const strategyOrder = [
  "strategy_medical_review",
  "strategy_diet_break_or_maintenance",
  "strategy_recovery_repair",
  "strategy_monitoring_confidence",
  "strategy_nutrition_quality",
  "strategy_appetite_management",
  "strategy_activity_increase",
  "strategy_training_adjustment",
  "strategy_habit_environment_design",
  "strategy_calorie_adjustment"
];

function strategyOrderRank(strategyId) {
  const index = strategyOrder.indexOf(strategyId);
  return index === -1 ? 999 : index;
}

function dedupeStrategies(strategies) {
  const byId = new Map();

  strategies.forEach(strategy => {
    const existing = byId.get(strategy.id);

    if (!existing) {
      byId.set(strategy.id, strategy);
      return;
    }

    if (priorityRank(strategy.priority) > priorityRank(existing.priority)) {
      byId.set(strategy.id, {
        ...strategy,
        reason: `${existing.reason} ${strategy.reason}`.trim()
      });
    } else {
      byId.set(strategy.id, {
        ...existing,
        reason: `${existing.reason} ${strategy.reason}`.trim()
      });
    }
  });

  return [...byId.values()].sort((a, b) => {
    const priorityDifference =
      priorityRank(b.priority) - priorityRank(a.priority);

    if (priorityDifference !== 0) {
      return priorityDifference;
    }

    return strategyOrderRank(a.id) - strategyOrderRank(b.id);
  });
}

export function selectStrategiesFromDiagnosis({
  activatedNodeIds = [],
  likelyIssues = [],
  confidenceFlags = [],
  riskFlags = [],
  contraindications = []
}) {
  const strategies = [];
  const delayedStrategies = [];
  const blockedStrategies = [];

  /**
   * 1. Safety-first strategy selection
   */
  if (
    riskFlags.length > 0 ||
    hasAny(activatedNodeIds, [
      "medical_review_needed",
      "refer_or_medical_review",
      "hypoglycaemia_risk",
      "glucose_safety_risk",
      "medical_risk_level"
    ])
  ) {
    addStrategy(
      strategies,
      "strategy_medical_review",
      "Medical or glucose safety risk is present, so medical review should be prioritised.",
      "critical"
    );
  }

  /**
   * 2. Contraindication-driven blocking
   */
  if (contraindications.includes("contraindication_unsupervised_fasting")) {
    blockedStrategies.push({
      id: "fasting_strategy",
      reason:
        "Unsupervised fasting is contraindicated or requires medical supervision."
    });
  }

  if (contraindications.includes("contraindication_carbohydrate_restriction")) {
    blockedStrategies.push({
      id: "large_carbohydrate_restriction_strategy",
      reason:
        "Large carbohydrate restriction is contraindicated or requires modification."
    });
  }

  if (contraindications.includes("contraindication_aggressive_deficit")) {
    blockedStrategies.push({
      id: "aggressive_deficit_strategy",
      reason:
        "Aggressive calorie deficit is contraindicated or requires conservative modification."
    });
  }

  if (contraindications.includes("contraindication_strict_tracking")) {
    blockedStrategies.push({
      id: "strict_tracking_strategy",
      reason:
        "Strict tracking may be psychologically unsafe in this context."
    });
  }

  /**
   * 3. Confidence and monitoring
   */
  if (
    confidenceFlags.length > 0 ||
    hasAny(activatedNodeIds, [
      "weight_trend_confidence",
      "measurement_noise_interpretation",
      "measurement_decision_threshold",
      "calorie_tracking_accuracy",
      "energy_intake_estimate",
      "activity_tracking_accuracy"
    ])
  ) {
    addStrategy(
      strategies,
      "strategy_monitoring_confidence",
      "Measurement, intake, or activity confidence needs improving before escalation.",
      "high"
    );
  }

  /**
   * 4. Recovery and sleep
   */
  if (
    hasAny(activatedNodeIds, [
      "sleep_quality",
      "recovery_debt",
      "recovery_risk_level",
      "constraint_low_recovery_capacity",
      "training_recovery_status"
    ]) ||
    likelyIssues.includes("poor_sleep_recovery_constraint")
  ) {
    addStrategy(
      strategies,
      "strategy_recovery_repair",
      "Recovery or sleep appears to be a limiting factor.",
      "high"
    );
  }

  /**
   * 5. Diet fatigue and maintenance
   */
  if (
    hasAny(activatedNodeIds, [
      "diet_fatigue_risk",
      "diet_break_readiness",
      "fatigue_driven_adherence_decline",
      "performance_decline_during_deficit"
    ]) ||
    likelyIssues.includes("diet_fatigue_risk")
  ) {
    addStrategy(
      strategies,
      "strategy_diet_break_or_maintenance",
      "Diet fatigue or performance decline suggests reducing deficit pressure may be appropriate.",
      "high"
    );
  }

  /**
   * 6. Nutrition quality and appetite
   */
  if (
    hasAny(activatedNodeIds, [
      "nutrition_quality",
      "protein_adequacy",
      "fibre_adequacy",
      "food_volume_satiety",
      "ultra_processed_food_exposure",
      "liquid_calorie_exposure"
    ]) ||
    likelyIssues.includes("hidden_liquid_calorie_intake")
  ) {
    addStrategy(
      strategies,
      "strategy_nutrition_quality",
      "Nutrition quality or food structure may be a useful intervention lever.",
      "moderate"
    );
  }

  if (
    hasAny(activatedNodeIds, [
      "hunger_pressure",
      "satiety_response",
      "craving_intensity",
      "reward_driven_eating",
      "early_day_underfeeding"
    ])
  ) {
    addStrategy(
      strategies,
      "strategy_appetite_management",
      "Hunger, cravings, or satiety issues may be limiting adherence.",
      "moderate"
    );
  }

  /**
   * 7. Activity
   */
  if (
    hasAny(activatedNodeIds, [
      "low_activity_bottleneck",
      "sedentary_time",
      "step_count_consistency",
      "neat_adaptation"
    ])
  ) {
    addStrategy(
      strategies,
      "strategy_activity_increase",
      "Low or inconsistent activity may be limiting expenditure or metabolic health.",
      "moderate"
    );
  }

  /**
   * 8. Training
   */
  if (
    hasAny(activatedNodeIds, [
      "resistance_training_quality",
      "training_goal_alignment",
      "injury_risk_from_training",
      "training_volume_tolerance",
      "priority_lean_mass_retention",
      "priority_performance"
    ])
  ) {
    addStrategy(
      strategies,
      "strategy_training_adjustment",
      "Training may need adjustment to protect muscle, performance, recovery, or safety.",
      "moderate"
    );
  }

  /**
   * 9. Habit and environment
   */
  if (
    hasAny(activatedNodeIds, [
      "constraint_low_adherence_capacity",
      "perceived_plan_burden",
      "executive_load",
      "environmental_food_exposure",
      "lapse_recovery_skill",
      "behavioural_friction"
    ]) ||
    likelyIssues.includes("weekend_deficit_erosion")
  ) {
    addStrategy(
      strategies,
      "strategy_habit_environment_design",
      "Execution friction, environment, or adherence capacity may be the limiting factor.",
      "moderate"
    );
  }

  const rankedStrategies = dedupeStrategies(strategies);

  const primaryStrategy = rankedStrategies[0]?.id || null;

  const secondaryStrategies = rankedStrategies
    .slice(1)
    .map(strategy => strategy.id);

  /**
   * Delay escalation when confidence or recovery issues are present.
   */
  if (
    confidenceFlags.length > 0 ||
    hasAny(activatedNodeIds, [
      "weight_trend_confidence",
      "measurement_noise_interpretation",
      "calorie_tracking_accuracy"
    ])
  ) {
    delayedStrategies.push({
      id: "strategy_calorie_adjustment",
      reason:
        "Calorie adjustment should be delayed until measurement and intake confidence improve."
    });
  }

  if (
    hasAny(activatedNodeIds, [
      "recovery_risk_level",
      "constraint_low_recovery_capacity",
      "sleep_quality",
      "diet_fatigue_risk"
    ])
  ) {
    delayedStrategies.push({
      id: "strategy_activity_increase",
      reason:
        "Activity increases should be delayed or conservative until recovery constraints are addressed."
    });
  }

  return {
    strategyCandidates: rankedStrategies,
    primaryStrategy,
    secondaryStrategies: unique(secondaryStrategies),
    delayedStrategies,
    blockedStrategies
  };
}

export default selectStrategiesFromDiagnosis;