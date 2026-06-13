export const activityNeatNodes = [
  {
    id: "activity_energy_expenditure",
    label: "Activity Energy Expenditure",
    type: "expenditure_component",
    domain: "activity-neat",
    description:
      "Energy expended through structured exercise, occupational movement, walking, chores, fidgeting, posture, and spontaneous daily movement.",
    diagnosticRole: "core",
    appliesTo: ["fat_loss", "body_recomposition", "obesity", "performance", "general_health"],
    observableVia: [
      "step_count",
      "training_sessions",
      "active_minutes",
      "occupation_type",
      "walking_distance",
      "wearable_energy_estimate"
    ],
    reasoningPurpose:
      "Determines whether total expenditure is sufficient to support the intended weekly energy deficit.",
    evidenceLevel: "high",
    tags: ["expenditure", "activity", "movement", "fat-loss"]
  },

  {
    id: "neat_baseline",
    label: "NEAT Baseline",
    type: "expenditure_baseline",
    domain: "activity-neat",
    description:
      "A person's typical non-exercise activity thermogenesis before intentional intervention.",
    diagnosticRole: "core",
    appliesTo: ["fat_loss", "obesity", "body_recomposition", "general_health"],
    observableVia: [
      "baseline_steps",
      "baseline_sedentary_time",
      "baseline_active_minutes",
      "occupation_type",
      "daily_movement_variability"
    ],
    reasoningPurpose:
      "Establishes whether a person begins with high, moderate, or low spontaneous movement.",
    evidenceLevel: "high",
    tags: ["NEAT", "baseline", "steps", "movement"]
  },

  {
    id: "neat_adaptation",
    label: "NEAT Adaptation",
    type: "adaptive_response",
    domain: "activity-neat",
    description:
      "A reduction in spontaneous movement during dieting, fatigue, stress, or increased training load.",
    diagnosticRole: "core",
    appliesTo: ["fat_loss", "obesity", "bodybuilding", "body_recomposition"],
    observableVia: [
      "step_count_decline",
      "reduced_fidgeting",
      "increased_sedentary_time",
      "lower_daily_active_minutes",
      "subjective_fatigue"
    ],
    reasoningPurpose:
      "Explains why expected fat loss may slow even when calorie intake appears unchanged.",
    evidenceLevel: "high",
    tags: ["NEAT", "adaptation", "metabolic-adaptation", "diet-fatigue"]
  },

  {
    id: "step_count_consistency",
    label: "Step Count Consistency",
    type: "behavioural_metric",
    domain: "activity-neat",
    description:
      "The stability and repeatability of daily step count across the week.",
    diagnosticRole: "core",
    appliesTo: ["fat_loss", "obesity", "general_health", "type_2_diabetes"],
    observableVia: [
      "daily_steps",
      "weekly_step_average",
      "step_variability",
      "weekend_steps",
      "low_step_days"
    ],
    reasoningPurpose:
      "Provides a simple proxy for movement consistency and expenditure reliability.",
    evidenceLevel: "high",
    tags: ["steps", "walking", "consistency", "expenditure"]
  },

  {
    id: "sedentary_time",
    label: "Sedentary Time",
    type: "activity_constraint",
    domain: "activity-neat",
    description:
      "Time spent sitting or lying down while awake, excluding intentional rest or sleep.",
    diagnosticRole: "supporting",
    appliesTo: ["fat_loss", "obesity", "type_2_diabetes", "older_adults", "general_health"],
    observableVia: [
      "sitting_hours",
      "screen_time",
      "desk_work_hours",
      "wearable_sedentary_minutes",
      "movement_break_frequency"
    ],
    reasoningPurpose:
      "Identifies low-movement lifestyles where increasing NEAT may be more effective than adding formal exercise alone.",
    evidenceLevel: "high",
    tags: ["sedentary", "desk-work", "movement-breaks", "health"]
  },

  {
    id: "exercise_energy_compensation",
    label: "Exercise Energy Compensation",
    type: "compensatory_response",
    domain: "activity-neat",
    description:
      "The reduction in expected energy deficit after exercise due to increased hunger, reduced spontaneous activity, or overestimated calorie burn.",
    diagnosticRole: "core",
    appliesTo: ["fat_loss", "obesity", "body_recomposition", "performance"],
    observableVia: [
      "post_exercise_hunger",
      "reduced_steps_after_training",
      "reward_eating",
      "wearable_calorie_overestimation",
      "training_day_intake"
    ],
    reasoningPurpose:
      "Explains why exercise can improve health and performance without producing expected fat loss.",
    evidenceLevel: "high",
    tags: ["exercise", "compensation", "hunger", "NEAT"]
  },

  {
    id: "training_load_fatigue",
    label: "Training Load Fatigue",
    type: "fatigue_driver",
    domain: "activity-neat",
    description:
      "Accumulated fatigue from exercise volume, intensity, frequency, or insufficient recovery.",
    diagnosticRole: "supporting",
    appliesTo: ["fat_loss", "bodybuilding", "performance", "body_recomposition"],
    observableVia: [
      "training_volume",
      "training_intensity",
      "session_rpe",
      "performance_decline",
      "muscle_soreness",
      "sleep_disruption"
    ],
    reasoningPurpose:
      "Determines whether exercise is helping expenditure or suppressing NEAT through fatigue.",
    evidenceLevel: "moderate",
    tags: ["training", "fatigue", "recovery", "performance"]
  },

  {
    id: "occupation_activity_level",
    label: "Occupation Activity Level",
    type: "contextual_factor",
    domain: "activity-neat",
    description:
      "The amount of movement required by a person's job, including sedentary, standing, walking, manual, and shift-based roles.",
    diagnosticRole: "supporting",
    appliesTo: ["fat_loss", "obesity", "general_health", "chronic_illness"],
    observableVia: [
      "job_type",
      "standing_time",
      "walking_at_work",
      "manual_labour",
      "commute_pattern",
      "shift_work"
    ],
    reasoningPurpose:
      "Helps individualise activity targets based on real-world daily movement demands.",
    evidenceLevel: "moderate",
    tags: ["occupation", "context", "NEAT", "activity"]
  },

  {
    id: "activity_tracking_accuracy",
    label: "Activity Tracking Accuracy",
    type: "measurement_quality",
    domain: "activity-neat",
    description:
      "The reliability of activity estimates from wearables, phones, self-report, gym machines, or manual logs.",
    diagnosticRole: "core",
    appliesTo: ["fat_loss", "body_recomposition", "obesity", "performance"],
    observableVia: [
      "wearable_type",
      "missing_wear_time",
      "manual_log_accuracy",
      "calorie_burn_estimates",
      "heart_rate_data_quality"
    ],
    reasoningPurpose:
      "Prevents overconfidence in inaccurate expenditure estimates.",
    evidenceLevel: "high",
    tags: ["tracking", "wearables", "measurement-error", "calorie-burn"]
  },

  {
    id: "low_activity_bottleneck",
    label: "Low Activity Bottleneck",
    type: "diagnostic_pattern",
    domain: "activity-neat",
    description:
      "A state where low daily movement meaningfully constrains fat-loss progress, health, glucose control, or appetite regulation.",
    diagnosticRole: "core",
    appliesTo: ["fat_loss", "obesity", "type_2_diabetes", "older_adults", "general_health"],
    observableVia: [
      "low_steps",
      "high_sedentary_time",
      "poor_glucose_control",
      "low_active_minutes",
      "low_cardiorespiratory_fitness"
    ],
    reasoningPurpose:
      "Identifies when increasing daily movement may be a higher-priority intervention than further calorie reduction.",
    evidenceLevel: "high",
    tags: ["bottleneck", "low-activity", "steps", "health"]
  },

  {
    id: "activity_recovery_tradeoff",
    label: "Activity-Recovery Tradeoff",
    type: "constraint_relationship",
    domain: "activity-neat",
    description:
      "The point where adding more activity increases fatigue, hunger, injury risk, or recovery burden more than it improves fat-loss outcomes.",
    diagnosticRole: "core",
    appliesTo: ["fat_loss", "bodybuilding", "performance", "older_adults", "chronic_illness"],
    observableVia: [
      "fatigue",
      "sleep_quality",
      "injury_pain",
      "training_performance",
      "hunger",
      "mood"
    ],
    reasoningPurpose:
      "Prevents the graph from recommending unlimited activity increases when recovery capacity is constrained.",
    evidenceLevel: "moderate",
    tags: ["tradeoff", "recovery", "injury-risk", "fatigue"]
  }
];