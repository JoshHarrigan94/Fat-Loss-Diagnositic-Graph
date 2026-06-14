export const legacyDiagnosisMechanismWeights = {
  masked_fat_loss: 0.85,
  recovery_water_retention: 0.8,
  dietary_water_retention: 0.75,
  adherence_drift: 0.8,
  reduced_expenditure: 0.7,
  true_plateau: 0.65,
  diet_fatigue: 0.75,
  medical_or_glucose_safety: 0.9,
  lean_mass_protection: 0.8
};

export const legacySignalNodeMap = {
  weight_stable_high_noise: [
    "measurement_noise_interpretation",
    "scale_weight_variability"
  ],

  sleep_poor_stress_high: [
    "sleep_quality",
    "stress_load",
    "water_retention_from_stress",
    "recovery_risk_level"
  ],

  tracking_low: [
    "calorie_tracking_accuracy",
    "energy_intake_estimate"
  ],

  weekend_drift: [
    "weekend_adherence_gap",
    "adherence_consistency"
  ],

  steps_dropped: [
    "step_count_consistency",
    "low_activity_bottleneck"
  ],

  long_diet_high_hunger: [
    "deficit_duration",
    "hunger_pressure",
    "diet_fatigue_risk"
  ],

  glucose_safety: [
    "hypoglycaemia_risk",
    "glucose_safety_risk",
    "medical_review_needed"
  ],

  lean_mass_priority: [
    "priority_lean_mass_retention",
    "resistance_training_quality",
    "protein_adequacy"
  ]
};

export const legacyInterventionLevers = {
  strategy_monitoring_confidence: [
    {
      id: "wait_and_collect_trend",
      label: "Wait and collect more trend data",
      description:
        "Avoid changing calories immediately. Collect more consistent weight, intake, and activity data first.",
      bestFor: [
        "measurement_noise_interpretation",
        "scale_weight_variability",
        "weight_trend_confidence"
      ]
    },
    {
      id: "tighten_tracking_protocol",
      label: "Tighten tracking protocol",
      description:
        "Review missed logs, weekends, liquid calories, oils, sauces, snacks, and restaurant meals.",
      bestFor: [
        "calorie_tracking_accuracy",
        "energy_intake_estimate",
        "weekend_adherence_gap"
      ]
    }
  ],

  strategy_recovery_repair: [
    {
      id: "improve_sleep_consistency",
      label: "Improve sleep consistency",
      description:
        "Prioritise regular sleep timing, adequate sleep duration, and reduced late-day stress load.",
      bestFor: [
        "sleep_quality",
        "recovery_risk_level",
        "stress_load"
      ]
    },
    {
      id: "reduce_training_fatigue",
      label: "Reduce training fatigue",
      description:
        "Temporarily reduce training stress if soreness, fatigue, or performance decline is masking progress.",
      bestFor: [
        "training_recovery_status",
        "training_inflammation_shift",
        "performance_decline_during_deficit"
      ]
    }
  ],

  strategy_diet_break_or_maintenance: [
    {
      id: "move_to_maintenance",
      label: "Move toward maintenance",
      description:
        "Reduce deficit pressure temporarily to restore adherence, hunger, sleep, and training performance.",
      bestFor: [
        "diet_fatigue_risk",
        "performance_decline_during_deficit",
        "fatigue_driven_adherence_decline"
      ]
    }
  ],

  strategy_activity_increase: [
    {
      id: "restore_step_floor",
      label: "Restore step floor",
      description:
        "Rebuild a consistent minimum daily step target before adding more aggressive cardio.",
      bestFor: [
        "step_count_consistency",
        "low_activity_bottleneck",
        "sedentary_time"
      ]
    }
  ],

  strategy_calorie_adjustment: [
    {
      id: "small_calorie_reduction",
      label: "Small calorie reduction",
      description:
        "Apply a modest calorie reduction only when measurement, adherence, and risk confidence are adequate.",
      bestFor: [
        "weekly_energy_deficit",
        "deficit_magnitude",
        "insufficient_weekly_energy_deficit"
      ]
    }
  ],

  strategy_training_adjustment: [
    {
      id: "protect_resistance_training_quality",
      label: "Protect resistance training quality",
      description:
        "Prioritise resistance training quality, protein adequacy, and conservative progression to protect lean mass.",
      bestFor: [
        "priority_lean_mass_retention",
        "sarcopenia_risk",
        "resistance_training_quality",
        "protein_adequacy"
      ]
    }
  ],

  strategy_medical_review: [
    {
      id: "seek_medication_aware_review",
      label: "Seek medication-aware review",
      description:
        "Where glucose safety, hypoglycaemia, or medication risks are present, avoid unsupervised escalation.",
      bestFor: [
        "hypoglycaemia_risk",
        "glucose_safety_risk",
        "diabetes_medication_context",
        "medical_review_needed"
      ]
    }
  ]
};

export function getLegacyMechanismWeight(mechanismId) {
  return legacyDiagnosisMechanismWeights[mechanismId] ?? 0.5;
}

export function getLegacyInterventionLevers(strategyId, activatedNodeIds = []) {
  const levers = legacyInterventionLevers[strategyId] || [];

  return levers.filter(lever =>
    lever.bestFor.some(nodeId => activatedNodeIds.includes(nodeId))
  );
}

export default {
  legacyDiagnosisMechanismWeights,
  legacySignalNodeMap,
  legacyInterventionLevers,
  getLegacyMechanismWeight,
  getLegacyInterventionLevers
};
