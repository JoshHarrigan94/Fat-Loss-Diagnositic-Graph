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
  "strategy_monitoring_confidence",
  "strategy_calorie_adjustment",
  "strategy_recovery_repair",
  "strategy_diet_break_or_maintenance",
  "strategy_habit_environment_design",
  "strategy_activity_increase",
  "strategy_nutrition_quality",
  "strategy_appetite_management",
  "strategy_training_adjustment"
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
  interpretationFlags = [],
  riskFlags = [],
  contraindications = [],
  signalProfile = {}
}) {
  const strategies = [];
  const delayedStrategies = [];
  const blockedStrategies = [];
  const avoidedStrategies = [];
  const contraindicatedStrategies = [];

  const addDelayed = (id, reason) => {
    delayedStrategies.push({ id, reason });
  };

  const addBlocked = (id, reason) => {
    blockedStrategies.push({ id, reason });
  };

  const addAvoided = (id, reason) => {
    avoidedStrategies.push({ id, reason });
  };

  const addContraindicated = (id, reason) => {
    contraindicatedStrategies.push({ id, reason });
  };

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
    addContraindicated(
      "fasting_strategy",
      "Unsupervised fasting is contraindicated or requires medical supervision."
    );
  }

  if (contraindications.includes("contraindication_carbohydrate_restriction")) {
    addContraindicated(
      "large_carbohydrate_restriction_strategy",
      "Large carbohydrate restriction is contraindicated or requires modification."
    );
  }

  if (contraindications.includes("contraindication_aggressive_deficit")) {
    addContraindicated(
      "aggressive_deficit_strategy",
      "Aggressive calorie deficit is contraindicated or requires conservative modification."
    );
  }

  if (contraindications.includes("contraindication_strict_tracking")) {
    addContraindicated(
      "strict_tracking_strategy",
      "Strict tracking may be psychologically unsafe in this context."
    );
  }

  /**
   * 3. Data confidence
   */
  if (
    signalProfile.dataQualityLow ||
    signalProfile.scaleNoiseHigh ||
    signalProfile.trendConfidenceLow
  ) {
    addStrategy(
      strategies,
      "strategy_monitoring_confidence",
      "Measurement confidence or data quality is not strong enough for escalation yet.",
      "high"
    );
  }

  /**
   * 4. True plateau / insufficient deficit
   */
  if (
    signalProfile.truePlateauLikely &&
    riskFlags.length === 0 &&
    contraindications.length === 0
  ) {
    addStrategy(
      strategies,
      "strategy_calorie_adjustment",
      "A true plateau is likely with adequate confidence, so calorie adjustment can be considered.",
      "high"
    );
  }

  /**
   * 5. Recovery and sleep
   */
  if (
    signalProfile.recoveryBottleneck ||
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
   * 6. Diet fatigue and maintenance
   */
  if (
    signalProfile.dietFatigueLikely ||
    hasAny(activatedNodeIds, [
      "diet_fatigue_risk",
      "diet_break_readiness",
      "fatigue_driven_adherence_decline",
      "performance_decline_during_deficit"
    ]) ||
    likelyIssues.includes("diet_fatigue_risk")
  ) {
    const dietFatiguePriority =
      hasAny(activatedNodeIds, [
        "deficit_duration",
        "diet_break_readiness",
        "diet_fatigue_risk"
      ])
        ? "critical"
        : "high";

    addStrategy(
      strategies,
      "strategy_diet_break_or_maintenance",
      "Diet fatigue or performance decline suggests reducing deficit pressure may be appropriate.",
      dietFatiguePriority
    );
  }

  /**
   * 7. Adherence friction
   */
  if (
    signalProfile.adherenceFriction ||
    likelyIssues.includes("weekend_deficit_erosion")
  ) {
    addStrategy(
      strategies,
      "strategy_habit_environment_design",
      "Adherence friction or inconsistent execution appears to be the main bottleneck.",
      "moderate"
    );
  }

  /**
   * 8. Activity
   */
  if (
    signalProfile.activityBottleneck ||
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
   * 9. Nutrition quality and appetite
   */
  if (
    signalProfile.nutritionQualityIssue ||
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
    signalProfile.appetiteIssue ||
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
   * 10. Older adult / lean mass / training protection
   */
  if (
    signalProfile.leanMassProtection ||
    likelyIssues.includes("lean_mass_retention_priority") ||
    hasAny(activatedNodeIds, [
      "population_older_adult",
      "sarcopenia_risk",
      "priority_functional_independence",
      "priority_lean_mass_retention",
      "resistance_training_quality",
      "training_goal_alignment",
      "injury_risk_from_training",
      "training_volume_tolerance",
      "priority_performance"
    ])
  ) {
    addStrategy(
      strategies,
      "strategy_training_adjustment",
      "Training should be adjusted to protect muscle, function, performance, recovery, or safety.",
      "high"
    );
  }

  const rankedStrategies = dedupeStrategies(strategies);

  /**
   * Delay escalation when confidence, recovery, or safety issues are present.
   */
  if (
    signalProfile.dataQualityLow ||
    signalProfile.scaleNoiseHigh ||
    signalProfile.trendConfidenceLow
  ) {
    addDelayed(
      "strategy_calorie_adjustment",
      "Calorie adjustment should be delayed until measurement confidence and intake confidence improve."
    );
    addAvoided(
      "strategy_calorie_adjustment",
      "Do not cut calories yet while confidence is low."
    );
  }

  if (
    signalProfile.recoveryBottleneck ||
    hasAny(activatedNodeIds, [
      "recovery_risk_level",
      "constraint_low_recovery_capacity",
      "sleep_quality",
      "diet_fatigue_risk"
    ])
  ) {
    addDelayed(
      "strategy_activity_increase",
      "Activity increases should be delayed until recovery constraints are addressed."
    );
    addAvoided(
      "strategy_activity_increase",
      "Do not add more activity load while recovery is the main bottleneck."
    );
  }

  if (signalProfile.dietFatigueLikely) {
    addDelayed(
      "strategy_calorie_adjustment",
      "Further calorie reduction should wait until diet fatigue improves or a maintenance phase is completed."
    );
    addAvoided(
      "strategy_calorie_adjustment",
      "Do not intensify the deficit while diet fatigue is the dominant problem."
    );
  }

  if (
    riskFlags.length > 0 ||
    contraindications.length > 0
  ) {
    addBlocked(
      "strategy_calorie_adjustment",
      "Calorie adjustment should be blocked until safety risks or contraindications are resolved."
    );
    addBlocked(
      "strategy_activity_increase",
      "Activity increases should be blocked or medically modified until safety risks are resolved."
    );
    addAvoided(
      "strategy_calorie_adjustment",
      "Standard calorie escalation is not appropriate while safety-sensitive risks are active."
    );
    addAvoided(
      "strategy_activity_increase",
      "Standard activity escalation is not appropriate while safety-sensitive risks are active."
    );
  }

  if (signalProfile.leanMassProtection) {
    addAvoided(
      "strategy_calorie_adjustment",
      "Lean-mass protection should be addressed before aggressive deficit changes."
    );
  }

  const delayedIds = new Set(delayedStrategies.map(strategy => strategy.id));
  const blockedIds = new Set(blockedStrategies.map(strategy => strategy.id));
  const contraindicatedIds = new Set(
    contraindicatedStrategies.map(strategy => strategy.id)
  );

  const activeStrategies = rankedStrategies.filter(strategy =>
    !delayedIds.has(strategy.id) &&
    !blockedIds.has(strategy.id) &&
    !contraindicatedIds.has(strategy.id)
  );

  const primaryStrategy = activeStrategies[0]?.id || rankedStrategies[0]?.id || null;

  const secondaryStrategies = activeStrategies
    .slice(primaryStrategy === activeStrategies[0]?.id ? 1 : 0)
    .map(strategy => strategy.id);

  return {
    strategyCandidates: rankedStrategies,
    primaryStrategy,
    secondaryStrategies: unique(secondaryStrategies),
    delayedStrategies: dedupeStrategies(delayedStrategies),
    blockedStrategies: dedupeStrategies(blockedStrategies),
    avoidedStrategies: dedupeStrategies(avoidedStrategies),
    contraindicatedStrategies: dedupeStrategies(contraindicatedStrategies)
  };
}

export default selectStrategiesFromDiagnosis;
