export const exerciseTrainingNodes = [
  {
    id: "exercise_training",
    label: "Exercise Training",
    type: "intervention_domain",
    domain: "exercise-training",
    description:
      "Structured physical training used to support fat loss, body composition, health, performance, strength, fitness, glucose control, and long-term function.",
    diagnosticRole: "core",
    appliesTo: ["fat_loss", "body_recomposition", "bodybuilding", "obesity", "performance", "general_health"],
    observableVia: [
      "training_frequency",
      "training_volume",
      "training_intensity",
      "training_type",
      "training_adherence",
      "performance_trend"
    ],
    reasoningPurpose:
      "Determines whether training supports the goal or creates excessive fatigue, compensation, or injury risk.",
    evidenceLevel: "high",
    tags: ["exercise", "training", "fat-loss", "performance"]
  },

  {
    id: "resistance_training_quality",
    label: "Resistance Training Quality",
    type: "training_quality",
    domain: "exercise-training",
    description:
      "The effectiveness of resistance training for preserving or building muscle, including exercise selection, effort, progression, volume, technique, and recovery.",
    diagnosticRole: "core",
    appliesTo: ["fat_loss", "body_recomposition", "bodybuilding", "older_adults", "performance"],
    observableVia: [
      "weekly_hard_sets",
      "progressive_overload",
      "proximity_to_failure",
      "exercise_selection",
      "technique_quality",
      "strength_trend"
    ],
    reasoningPurpose:
      "Determines whether training is sufficient to support lean mass retention and recomposition.",
    evidenceLevel: "high",
    tags: ["resistance-training", "muscle", "lean-mass", "strength"]
  },

  {
    id: "cardio_training_dose",
    label: "Cardio Training Dose",
    type: "training_dose",
    domain: "exercise-training",
    description:
      "The amount, intensity, frequency, and type of cardiovascular training performed.",
    diagnosticRole: "supporting",
    appliesTo: ["fat_loss", "obesity", "type_2_diabetes", "performance", "general_health"],
    observableVia: [
      "cardio_sessions",
      "cardio_minutes",
      "cardio_intensity",
      "heart_rate_zones",
      "running_volume",
      "cycling_volume"
    ],
    reasoningPurpose:
      "Determines whether cardio supports expenditure, fitness, glucose control, or recovery without excessive fatigue.",
    evidenceLevel: "high",
    tags: ["cardio", "fitness", "energy-expenditure", "health"]
  },

  {
    id: "training_volume_tolerance",
    label: "Training Volume Tolerance",
    type: "capacity_modifier",
    domain: "exercise-training",
    description:
      "The amount of training volume a person can recover from while dieting, given sleep, stress, age, training status, injury history, and calorie deficit.",
    diagnosticRole: "core",
    appliesTo: ["fat_loss", "bodybuilding", "body_recomposition", "performance", "older_adults"],
    observableVia: [
      "session_rpe",
      "soreness",
      "performance_trend",
      "sleep_quality",
      "fatigue",
      "injury_pain"
    ],
    reasoningPurpose:
      "Determines whether training should be progressed, maintained, reduced, or redistributed.",
    evidenceLevel: "moderate",
    tags: ["volume", "recovery", "fatigue", "training-tolerance"]
  },

  {
    id: "training_intensity_tolerance",
    label: "Training Intensity Tolerance",
    type: "capacity_modifier",
    domain: "exercise-training",
    description:
      "The ability to tolerate high-effort, high-load, high-speed, or high-heart-rate training while maintaining recovery and adherence.",
    diagnosticRole: "supporting",
    appliesTo: ["fat_loss", "bodybuilding", "performance", "older_adults", "chronic_illness"],
    observableVia: [
      "load_intensity",
      "heart_rate_intensity",
      "session_rpe",
      "joint_pain",
      "nervous_system_fatigue",
      "readiness"
    ],
    reasoningPurpose:
      "Prevents overly intense training prescriptions when recovery capacity is limited.",
    evidenceLevel: "moderate",
    tags: ["intensity", "recovery", "fatigue", "risk"]
  },

  {
    id: "exercise_adherence",
    label: "Exercise Adherence",
    type: "behavioural_execution",
    domain: "exercise-training",
    description:
      "The consistency with which planned training sessions are completed in a realistic and sustainable way.",
    diagnosticRole: "core",
    appliesTo: ["fat_loss", "body_recomposition", "obesity", "performance", "general_health"],
    observableVia: [
      "completed_sessions",
      "missed_sessions",
      "training_consistency",
      "schedule_fit",
      "enjoyment",
      "barriers"
    ],
    reasoningPurpose:
      "Determines whether the training plan is executable in the person's real life.",
    evidenceLevel: "high",
    tags: ["adherence", "training", "consistency", "behaviour"]
  },

  {
    id: "exercise_recovery_cost",
    label: "Exercise Recovery Cost",
    type: "intervention_cost",
    domain: "exercise-training",
    description:
      "The recovery demand created by exercise, including muscle damage, central fatigue, joint stress, appetite increase, soreness, and sleep disruption.",
    diagnosticRole: "core",
    appliesTo: ["fat_loss", "bodybuilding", "performance", "older_adults", "chronic_illness"],
    observableVia: [
      "soreness",
      "joint_pain",
      "fatigue",
      "sleep_disruption",
      "hunger_after_training",
      "performance_decline"
    ],
    reasoningPurpose:
      "Determines whether exercise is producing more strain than benefit within the fat-loss phase.",
    evidenceLevel: "moderate",
    tags: ["recovery-cost", "fatigue", "exercise", "tradeoff"]
  },

  {
    id: "injury_risk_from_training",
    label: "Injury Risk From Training",
    type: "risk_flag",
    domain: "exercise-training",
    description:
      "The likelihood that training load, intensity, technique, fatigue, history, or tissue capacity may contribute to pain or injury.",
    diagnosticRole: "risk_flag",
    appliesTo: ["fat_loss", "performance", "bodybuilding", "older_adults", "obesity", "chronic_illness"],
    observableVia: [
      "pain",
      "injury_history",
      "rapid_volume_increase",
      "poor_technique",
      "fatigue",
      "load_spikes"
    ],
    reasoningPurpose:
      "Ensures training recommendations are safe, progressive, and population-aware.",
    evidenceLevel: "high",
    tags: ["injury-risk", "training-load", "safety", "progression"]
  },

  {
    id: "training_goal_alignment",
    label: "Training Goal Alignment",
    type: "intervention_fit",
    domain: "exercise-training",
    description:
      "The degree to which the training plan aligns with the person's primary goal, such as fat loss, muscle retention, bodybuilding, health, glucose control, or performance.",
    diagnosticRole: "core",
    appliesTo: ["fat_loss", "body_recomposition", "bodybuilding", "performance", "type_2_diabetes", "general_health"],
    observableVia: [
      "primary_goal",
      "training_type",
      "training_priority",
      "performance_targets",
      "body_composition_targets",
      "health_markers"
    ],
    reasoningPurpose:
      "Prevents mismatched training prescriptions, such as excessive cardio for muscle retention goals or excessive lifting for low-readiness beginners.",
    evidenceLevel: "moderate",
    tags: ["goal-alignment", "training-design", "personalisation", "intervention-fit"]
  },

  {
    id: "minimum_effective_training_dose",
    label: "Minimum Effective Training Dose",
    type: "dose_strategy",
    domain: "exercise-training",
    description:
      "The smallest training dose likely to preserve progress, muscle, fitness, or function when recovery, time, motivation, or health constraints are limited.",
    diagnosticRole: "core",
    appliesTo: ["fat_loss", "older_adults", "chronic_illness", "obesity", "body_recomposition", "performance"],
    observableVia: [
      "time_available",
      "recovery_capacity",
      "training_history",
      "goal_priority",
      "fatigue",
      "minimum_viable_behaviour"
    ],
    reasoningPurpose:
      "Protects continuity and reduces dropout when full training is unrealistic.",
    evidenceLevel: "moderate",
    tags: ["minimum-effective-dose", "training", "fallback", "sustainability"]
  }
];
