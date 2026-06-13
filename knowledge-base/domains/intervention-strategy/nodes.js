export const interventionStrategyNodes = [
  {
    id: "intervention_strategy_process",
    label: "Intervention Strategy Process",
    type: "decision_process",
    domain: "intervention-strategy",
    description:
      "The process of selecting the most appropriate intervention pathway based on diagnosis, confidence, risk, contraindications, population context, adherence capacity, and expected leverage.",
    diagnosticRole: "core",
    reasoningPurpose:
      "Turns graph diagnosis into a coherent intervention direction rather than isolated advice.",
    evidenceLevel: "high",
    tags: ["intervention", "strategy", "decision-process", "recommendations"]
  },

  {
    id: "strategy_calorie_adjustment",
    label: "Calorie Adjustment Strategy",
    type: "intervention_strategy",
    domain: "intervention-strategy",
    description:
      "A strategy that modifies energy intake through calorie targets, portion control, meal structure, food swaps, or intake awareness.",
    diagnosticRole: "strategy_option",
    bestUsedWhen: [
      "weekly_energy_deficit_insufficient",
      "calorie_tracking_accuracy_high",
      "measurement_confidence_high",
      "risk_tier_allows_restriction"
    ],
    avoidOrModifyWhen: [
      "contraindication_aggressive_deficit",
      "eating_disorder_risk",
      "low_recovery_capacity",
      "pregnancy_postpartum_context",
      "population_youth"
    ],
    reasoningPurpose:
      "Creates or restores an energy deficit when intake is the highest-leverage modifiable factor.",
    evidenceLevel: "high",
    tags: ["calories", "intake", "energy-deficit", "strategy"]
  },

  {
    id: "strategy_activity_increase",
    label: "Activity Increase Strategy",
    type: "intervention_strategy",
    domain: "intervention-strategy",
    description:
      "A strategy that increases daily movement, steps, walking, NEAT, or low-intensity activity to improve expenditure and health.",
    diagnosticRole: "strategy_option",
    bestUsedWhen: [
      "low_activity_bottleneck",
      "sedentary_time_high",
      "step_count_consistency_low",
      "recovery_capacity_adequate"
    ],
    avoidOrModifyWhen: [
      "contraindication_large_activity_increase",
      "injury_risk_level_high",
      "recovery_risk_level_high",
      "constraint_low_adherence_capacity"
    ],
    reasoningPurpose:
      "Improves expenditure and metabolic health without necessarily increasing dietary restriction.",
    evidenceLevel: "high",
    tags: ["activity", "NEAT", "steps", "strategy"]
  },

  {
    id: "strategy_nutrition_quality",
    label: "Nutrition Quality Strategy",
    type: "intervention_strategy",
    domain: "intervention-strategy",
    description:
      "A strategy that improves protein, fibre, micronutrient density, meal structure, food volume, and lower-risk food defaults before further restriction.",
    diagnosticRole: "strategy_option",
    bestUsedWhen: [
      "nutrition_quality_low",
      "protein_adequacy_low",
      "fibre_adequacy_low",
      "hunger_pressure_high",
      "passive_overconsumption_risk_high"
    ],
    avoidOrModifyWhen: [
      "bariatric_surgery_context",
      "appetite_suppression_risk",
      "medical_nutrition_constraints"
    ],
    reasoningPurpose:
      "Improves satiety, health, adherence, and body-composition support without relying only on calorie cuts.",
    evidenceLevel: "high",
    tags: ["nutrition-quality", "protein", "fibre", "satiety", "strategy"]
  },

  {
    id: "strategy_appetite_management",
    label: "Appetite Management Strategy",
    type: "intervention_strategy",
    domain: "intervention-strategy",
    description:
      "A strategy that reduces hunger pressure through meal composition, food volume, protein, fibre, sleep, stress reduction, meal timing, and palatability/environment management.",
    diagnosticRole: "strategy_option",
    bestUsedWhen: [
      "hunger_pressure_high",
      "satiety_response_low",
      "craving_intensity_high",
      "reward_driven_eating_present",
      "early_day_underfeeding_present"
    ],
    avoidOrModifyWhen: [
      "contraindication_appetite_suppression_strategy",
      "appetite_suppression_risk",
      "eating_disorder_risk"
    ],
    reasoningPurpose:
      "Improves adherence by reducing appetite pressure rather than blaming motivation.",
    evidenceLevel: "high",
    tags: ["appetite", "hunger", "satiety", "strategy"]
  },

  {
    id: "strategy_recovery_repair",
    label: "Recovery Repair Strategy",
    type: "intervention_strategy",
    domain: "intervention-strategy",
    description:
      "A strategy that improves sleep, reduces accumulated fatigue, lowers stress load, adjusts training, or temporarily reduces deficit pressure.",
    diagnosticRole: "strategy_option",
    bestUsedWhen: [
      "recovery_risk_level_high",
      "recovery_debt_high",
      "sleep_quality_low",
      "diet_fatigue_risk_high",
      "training_recovery_status_poor"
    ],
    avoidOrModifyWhen: [
      "medical_review_needed",
      "red_flag_symptoms"
    ],
    reasoningPurpose:
      "Restores the capacity to adhere, train, move, and interpret progress before further escalation.",
    evidenceLevel: "moderate",
    tags: ["recovery", "sleep", "fatigue", "strategy"]
  },

  {
    id: "strategy_training_adjustment",
    label: "Training Adjustment Strategy",
    type: "intervention_strategy",
    domain: "intervention-strategy",
    description:
      "A strategy that modifies resistance training, cardio, volume, intensity, frequency, exercise selection, or progression.",
    diagnosticRole: "strategy_option",
    bestUsedWhen: [
      "resistance_training_quality_low",
      "lean_mass_retention_priority_high",
      "training_volume_tolerance_mismatch",
      "injury_risk_level_moderate",
      "performance_priority_high"
    ],
    avoidOrModifyWhen: [
      "contraindication_high_intensity_exercise",
      "contraindication_large_activity_increase",
      "medical_risk_level_high"
    ],
    reasoningPurpose:
      "Aligns training with fat loss, muscle retention, recovery, performance, and injury risk.",
    evidenceLevel: "high",
    tags: ["training", "exercise", "muscle", "strategy"]
  },

  {
    id: "strategy_habit_environment_design",
    label: "Habit & Environment Strategy",
    type: "intervention_strategy",
    domain: "intervention-strategy",
    description:
      "A strategy that reduces friction, creates defaults, improves cues, simplifies decisions, redesigns the food environment, and builds relapse-prevention systems.",
    diagnosticRole: "strategy_option",
    bestUsedWhen: [
      "constraint_low_adherence_capacity",
      "perceived_plan_burden_high",
      "executive_load_high",
      "environmental_food_exposure_high",
      "lapse_recovery_skill_low"
    ],
    avoidOrModifyWhen: [],
    reasoningPurpose:
      "Makes execution easier when knowledge is not the limiting factor.",
    evidenceLevel: "high",
    tags: ["habit", "environment", "adherence", "strategy"]
  },

  {
    id: "strategy_monitoring_confidence",
    label: "Monitoring & Confidence Strategy",
    type: "intervention_strategy",
    domain: "intervention-strategy",
    description:
      "A strategy that improves data quality, measurement protocols, trend interpretation, food/activity logging, or observation duration before changing the plan.",
    diagnosticRole: "strategy_option",
    bestUsedWhen: [
      "weight_trend_confidence_low",
      "measurement_noise_high",
      "calorie_tracking_accuracy_low",
      "activity_tracking_accuracy_low",
      "outcome_confidence_low"
    ],
    avoidOrModifyWhen: [
      "contraindication_strict_tracking",
      "monitoring_burden_risk_high",
      "eating_disorder_risk"
    ],
    reasoningPurpose:
      "Prevents intervention changes when the graph cannot yet trust the data.",
    evidenceLevel: "high",
    tags: ["monitoring", "measurement", "confidence", "strategy"]
  },

  {
    id: "strategy_diet_break_or_maintenance",
    label: "Diet Break or Maintenance Strategy",
    type: "intervention_strategy",
    domain: "intervention-strategy",
    description:
      "A strategy that temporarily returns intake toward maintenance or reduces deficit pressure to restore adherence, recovery, training, and psychological tolerance.",
    diagnosticRole: "strategy_option",
    bestUsedWhen: [
      "diet_break_readiness_high",
      "diet_fatigue_risk_high",
      "fatigue_driven_adherence_decline",
      "performance_decline_during_deficit",
      "psychological_diet_strain_high"
    ],
    avoidOrModifyWhen: [
      "medical_review_needed"
    ],
    reasoningPurpose:
      "Prevents repeated escalation when the correct next step is reducing accumulated strain.",
    evidenceLevel: "moderate",
    tags: ["diet-break", "maintenance", "fatigue", "strategy"]
  },

  {
    id: "strategy_medical_review",
    label: "Medical Review Strategy",
    type: "intervention_strategy",
    domain: "intervention-strategy",
    description:
      "A strategy that routes the person toward appropriate clinical review, specialist input, or medically supervised intervention before lifestyle-only advice continues.",
    diagnosticRole: "safety_strategy",
    bestUsedWhen: [
      "medical_review_needed",
      "refer_or_medical_review",
      "red_flag_symptoms",
      "hypoglycaemia_risk_high",
      "pregnancy_postpartum_context",
      "eating_disorder_risk_high"
    ],
    avoidOrModifyWhen: [],
    reasoningPurpose:
      "Ensures the graph respects safety boundaries and does not overreach.",
    evidenceLevel: "high",
    tags: ["medical-review", "safety", "referral", "strategy"]
  },

  {
    id: "intervention_strategy_selection",
    label: "Intervention Strategy Selection",
    type: "decision_output",
    domain: "intervention-strategy",
    description:
      "The selected primary and secondary intervention strategies after diagnosis, risk management, contraindication screening, and population modifiers.",
    diagnosticRole: "core",
    reasoningPurpose:
      "Produces an ordered shortlist of suitable strategies for sequencing.",
    evidenceLevel: "high",
    tags: ["strategy-selection", "decision-output", "sequencing"]
  }
];
