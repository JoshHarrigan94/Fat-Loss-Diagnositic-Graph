export const adherenceBehaviourNodes = [
  {
    id: "adherence_consistency",
    label: "Adherence Consistency",
    type: "behavioural_state",
    domain: "adherence-behaviour",
    description:
      "The degree to which a person repeatedly follows the intended nutrition, activity, recovery, and measurement behaviours over time.",
    diagnosticRole: "core",
    appliesTo: ["fat_loss", "body_recomposition", "obesity", "bodybuilding", "general_health"],
    observableVia: [
      "food_logging_frequency",
      "calorie_target_hit_rate",
      "planned_meal_completion",
      "step_target_completion",
      "training_session_completion",
      "weekly_check_in_completion"
    ],
    reasoningPurpose:
      "Determines whether lack of progress is more likely due to poor execution rather than flawed physiology or plan design.",
    evidenceLevel: "high",
    tags: ["adherence", "consistency", "execution", "behaviour"]
  },

  {
    id: "calorie_tracking_accuracy",
    label: "Calorie Tracking Accuracy",
    type: "measurement_behaviour",
    domain: "adherence-behaviour",
    description:
      "The accuracy with which food intake is recorded, including portion sizes, cooking oils, snacks, drinks, sauces, and weekend intake.",
    diagnosticRole: "core",
    appliesTo: ["fat_loss", "body_recomposition", "obesity", "bodybuilding", "type_2_diabetes"],
    observableVia: [
      "food_log_completeness",
      "untracked_items",
      "weighed_food_frequency",
      "restaurant_meals",
      "weekend_tracking_gap",
      "energy_intake_variance"
    ],
    reasoningPurpose:
      "Helps distinguish genuine metabolic adaptation or low expenditure from hidden intake error.",
    evidenceLevel: "high",
    tags: ["tracking", "calories", "intake", "measurement-error"]
  },

  {
    id: "weekend_adherence_gap",
    label: "Weekend Adherence Gap",
    type: "behaviour_pattern",
    domain: "adherence-behaviour",
    description:
      "A recurring pattern where weekday behaviour aligns with the plan but weekend intake, alcohol, snacking, sleep, or activity reduces the weekly deficit.",
    diagnosticRole: "core",
    appliesTo: ["fat_loss", "obesity", "general_health", "body_recomposition"],
    observableVia: [
      "weekday_vs_weekend_calorie_difference",
      "alcohol_intake",
      "restaurant_meals",
      "missed_logs",
      "late_sleep",
      "reduced_steps"
    ],
    reasoningPurpose:
      "Explains why a person may feel adherent during the week while failing to create a meaningful weekly energy deficit.",
    evidenceLevel: "high",
    tags: ["weekend", "hidden-intake", "weekly-deficit", "behaviour-pattern"]
  },

  {
    id: "dietary_flexibility",
    label: "Dietary Flexibility",
    type: "behavioural_capacity",
    domain: "adherence-behaviour",
    description:
      "The ability to maintain progress while adapting food choices around social events, hunger, preferences, budget, culture, and routine disruption.",
    diagnosticRole: "supporting",
    appliesTo: ["fat_loss", "body_recomposition", "general_health", "obesity", "youth", "older_adults"],
    observableVia: [
      "food_variety",
      "social_event_handling",
      "meal_substitution_success",
      "rigidity_score",
      "binge_rebound_frequency"
    ],
    reasoningPurpose:
      "Identifies whether the plan is too rigid to survive real-world conditions.",
    evidenceLevel: "moderate",
    tags: ["flexibility", "sustainability", "diet-quality", "social-context"]
  },

  {
    id: "perceived_plan_burden",
    label: "Perceived Plan Burden",
    type: "psychological_constraint",
    domain: "adherence-behaviour",
    description:
      "The subjective effort, stress, complexity, or emotional cost associated with following the current plan.",
    diagnosticRole: "core",
    appliesTo: ["fat_loss", "obesity", "chronic_illness", "older_adults", "youth", "general_health"],
    observableVia: [
      "reported_stress",
      "decision_fatigue",
      "meal_prep_burden",
      "tracking_fatigue",
      "dropout_risk",
      "plan_resentment"
    ],
    reasoningPurpose:
      "Flags when a theoretically effective plan may fail because it is too costly to maintain.",
    evidenceLevel: "high",
    tags: ["burden", "stress", "sustainability", "dropout-risk"]
  },

  {
    id: "self_monitoring_frequency",
    label: "Self-Monitoring Frequency",
    type: "behavioural_process",
    domain: "adherence-behaviour",
    description:
      "How frequently a person checks relevant behaviours and outcomes, including body weight, food intake, steps, training, sleep, and subjective state.",
    diagnosticRole: "supporting",
    appliesTo: ["fat_loss", "body_recomposition", "obesity", "type_2_diabetes", "general_health"],
    observableVia: [
      "weigh_in_frequency",
      "food_log_frequency",
      "step_tracking_frequency",
      "weekly_review_completion",
      "blood_glucose_logging"
    ],
    reasoningPurpose:
      "Improves feedback quality and allows earlier detection of drift, but can become counterproductive if anxiety-provoking.",
    evidenceLevel: "high",
    tags: ["monitoring", "feedback", "tracking", "self-regulation"]
  },

  {
    id: "all_or_nothing_thinking",
    label: "All-or-Nothing Thinking",
    type: "cognitive_pattern",
    domain: "adherence-behaviour",
    description:
      "A rigid cognitive pattern where small deviations from the plan lead to perceived failure, overeating, abandonment, or delayed restart.",
    diagnosticRole: "core",
    appliesTo: ["fat_loss", "obesity", "general_health", "body_recomposition"],
    observableVia: [
      "binge_after_deviation",
      "missed_day_abandonment",
      "restart_delay",
      "language_patterns",
      "guilt_response"
    ],
    reasoningPurpose:
      "Explains adherence collapse after minor deviations and supports flexible recovery strategies.",
    evidenceLevel: "moderate",
    tags: ["cognition", "rigidity", "binge-risk", "behaviour-recovery"]
  },

  {
    id: "environmental_food_exposure",
    label: "Environmental Food Exposure",
    type: "environmental_constraint",
    domain: "adherence-behaviour",
    description:
      "The degree to which a person's environment increases exposure to high-calorie foods, snacks, alcohol, takeaways, or social eating cues.",
    diagnosticRole: "supporting",
    appliesTo: ["fat_loss", "obesity", "youth", "general_health", "chronic_illness"],
    observableVia: [
      "home_food_environment",
      "workplace_food_exposure",
      "takeaway_frequency",
      "family_food_norms",
      "snack_visibility",
      "alcohol_availability"
    ],
    reasoningPurpose:
      "Explains why willpower-based plans may fail when environmental friction is high.",
    evidenceLevel: "high",
    tags: ["environment", "food-cues", "snacking", "obesity"]
  },

  {
    id: "routine_stability",
    label: "Routine Stability",
    type: "contextual_factor",
    domain: "adherence-behaviour",
    description:
      "The consistency of daily and weekly structure, including work schedule, sleep timing, meals, commute, childcare, training windows, and social obligations.",
    diagnosticRole: "supporting",
    appliesTo: ["fat_loss", "general_health", "obesity", "older_adults", "youth", "chronic_illness"],
    observableVia: [
      "work_schedule_variability",
      "meal_timing_variability",
      "sleep_timing_variability",
      "travel_frequency",
      "caregiving_demands",
      "shift_work"
    ],
    reasoningPurpose:
      "Determines whether the intervention should prioritise structure, defaults, and lower-complexity rules.",
    evidenceLevel: "moderate",
    tags: ["routine", "context", "structure", "habit"]
  },

  {
    id: "behavioural_compensation",
    label: "Behavioural Compensation",
    type: "behaviour_pattern",
    domain: "adherence-behaviour",
    description:
      "A compensatory behavioural response where one positive action leads to offsetting behaviours, such as eating more after exercise or moving less after training.",
    diagnosticRole: "core",
    appliesTo: ["fat_loss", "obesity", "body_recomposition", "performance"],
    observableVia: [
      "post_exercise_calorie_increase",
      "step_count_reduction_after_training",
      "reward_eating",
      "hunger_after_activity",
      "rest_day_overeating"
    ],
    reasoningPurpose:
      "Explains why added exercise or activity may not translate into expected fat loss.",
    evidenceLevel: "high",
    tags: ["compensation", "exercise", "NEAT", "reward-eating"]
  },

  {
    id: "plan_person_fit",
    label: "Plan-Person Fit",
    type: "intervention_fit",
    domain: "adherence-behaviour",
    description:
      "The alignment between the plan and the person's preferences, lifestyle, skills, budget, physiology, culture, constraints, and goals.",
    diagnosticRole: "core",
    appliesTo: ["fat_loss", "body_recomposition", "obesity", "type_2_diabetes", "chronic_illness", "older_adults", "youth"],
    observableVia: [
      "reported_enjoyment",
      "meal_preference_match",
      "schedule_fit",
      "budget_fit",
      "training_preference_match",
      "long_term_confidence"
    ],
    reasoningPurpose:
      "Determines whether poor adherence is a user failure or a design failure.",
    evidenceLevel: "high",
    tags: ["personalisation", "fit", "sustainability", "intervention-design"]
  }
];