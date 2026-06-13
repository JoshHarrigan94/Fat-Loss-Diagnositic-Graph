export const dietFatigueNodes = [
  {
    id: "diet_fatigue",
    label: "Diet Fatigue",
    type: "accumulated_state",
    domain: "diet-fatigue",
    description:
      "The accumulated physiological, psychological, and behavioural strain caused by sustained energy restriction, high hunger, reduced recovery, and repeated self-control demands.",
    diagnosticRole: "core",
    appliesTo: ["fat_loss", "body_recomposition", "bodybuilding", "obesity", "performance"],
    observableVia: [
      "persistent_hunger",
      "fatigue",
      "irritability",
      "reduced_training_performance",
      "reduced_steps",
      "cravings",
      "poor_sleep",
      "low_motivation"
    ],
    reasoningPurpose:
      "Determines whether poor progress or adherence difficulty is caused by accumulated dieting strain rather than lack of discipline.",
    evidenceLevel: "high",
    tags: ["diet-fatigue", "deficit", "hunger", "recovery"]
  },

  {
    id: "deficit_duration",
    label: "Deficit Duration",
    type: "intervention_exposure",
    domain: "diet-fatigue",
    description:
      "The length of time a person has been in an intentional or unintentional calorie deficit.",
    diagnosticRole: "core",
    appliesTo: ["fat_loss", "body_recomposition", "bodybuilding", "obesity"],
    observableVia: [
      "weeks_in_deficit",
      "diet_phase_length",
      "recent_diet_history",
      "weight_loss_duration"
    ],
    reasoningPurpose:
      "Identifies whether sustained restriction may be increasing fatigue, hunger, and adherence risk.",
    evidenceLevel: "high",
    tags: ["duration", "deficit", "diet-phase", "fatigue"]
  },

  {
    id: "deficit_magnitude",
    label: "Deficit Magnitude",
    type: "intervention_dose",
    domain: "diet-fatigue",
    description:
      "The size of the calorie deficit relative to maintenance intake, body size, activity level, lean mass, recovery capacity, and goal urgency.",
    diagnosticRole: "core",
    appliesTo: ["fat_loss", "bodybuilding", "body_recomposition", "obesity"],
    observableVia: [
      "planned_deficit",
      "estimated_actual_deficit",
      "rate_of_weight_loss",
      "energy_intake_relative_to_tdee",
      "hunger",
      "fatigue"
    ],
    reasoningPurpose:
      "Determines whether the current deficit is likely to be tolerable or excessively aggressive.",
    evidenceLevel: "high",
    tags: ["deficit", "calories", "dose", "diet-fatigue"]
  },

  {
    id: "diet_history_load",
    label: "Diet History Load",
    type: "historical_context",
    domain: "diet-fatigue",
    description:
      "The accumulated history of repeated dieting, weight cycling, aggressive cuts, contest prep, binge-restrict cycles, or prolonged attempts at weight loss.",
    diagnosticRole: "supporting",
    appliesTo: ["fat_loss", "obesity", "bodybuilding", "body_recomposition"],
    observableVia: [
      "previous_diets",
      "weight_cycling",
      "contest_prep_history",
      "binge_restrict_cycles",
      "recent_maintenance_breaks"
    ],
    reasoningPurpose:
      "Explains why a person may have lower tolerance for another deficit despite an apparently sensible plan.",
    evidenceLevel: "moderate",
    tags: ["diet-history", "weight-cycling", "restriction", "sustainability"]
  },

  {
    id: "psychological_diet_strain",
    label: "Psychological Diet Strain",
    type: "psychological_state",
    domain: "diet-fatigue",
    description:
      "Mental and emotional strain from dieting, including preoccupation with food, irritability, reduced flexibility, social withdrawal, guilt, and decision fatigue.",
    diagnosticRole: "core",
    appliesTo: ["fat_loss", "obesity", "bodybuilding", "general_health"],
    observableVia: [
      "food_preoccupation",
      "irritability",
      "social_avoidance",
      "guilt_after_eating",
      "decision_fatigue",
      "diet_resentment"
    ],
    reasoningPurpose:
      "Identifies when the psychological cost of the diet is becoming a limiting factor.",
    evidenceLevel: "moderate",
    tags: ["psychology", "strain", "food-focus", "adherence"]
  },

  {
    id: "diet_break_readiness",
    label: "Diet Break Readiness",
    type: "intervention_signal",
    domain: "diet-fatigue",
    description:
      "The degree to which accumulated fatigue, hunger, performance decline, low adherence, or psychological strain suggests benefit from a planned maintenance period.",
    diagnosticRole: "core",
    appliesTo: ["fat_loss", "bodybuilding", "body_recomposition", "obesity"],
    observableVia: [
      "diet_fatigue",
      "adherence_decline",
      "training_performance_decline",
      "persistent_hunger",
      "sleep_disruption",
      "low_mood",
      "rate_of_loss_slowdown"
    ],
    reasoningPurpose:
      "Determines whether continuing the deficit, reducing deficit size, or moving to maintenance is the better next step.",
    evidenceLevel: "moderate",
    tags: ["diet-break", "maintenance", "sequencing", "fatigue"]
  },

  {
    id: "refeed_appropriateness",
    label: "Refeed Appropriateness",
    type: "intervention_signal",
    domain: "diet-fatigue",
    description:
      "The suitability of a short-term increase in calories, often carbohydrate-focused, to support training, psychological relief, or temporary hunger management.",
    diagnosticRole: "supporting",
    appliesTo: ["fat_loss", "bodybuilding", "performance", "body_recomposition"],
    observableVia: [
      "training_performance",
      "glycogen_depletion",
      "hunger",
      "low_carbohydrate_intake",
      "high_training_volume",
      "adherence_history"
    ],
    reasoningPurpose:
      "Distinguishes when a short refeed may help versus when a longer diet break or plan redesign is needed.",
    evidenceLevel: "low",
    tags: ["refeed", "carbohydrate", "training", "diet-fatigue"]
  },

  {
    id: "fatigue_driven_adherence_decline",
    label: "Fatigue-Driven Adherence Decline",
    type: "diagnostic_pattern",
    domain: "diet-fatigue",
    description:
      "A pattern where adherence worsens because the person is too hungry, tired, stressed, or psychologically depleted to continue executing the plan.",
    diagnosticRole: "core",
    appliesTo: ["fat_loss", "obesity", "bodybuilding", "body_recomposition"],
    observableVia: [
      "missed_logs",
      "unplanned_eating",
      "reduced_meal_prep",
      "lower_steps",
      "missed_training",
      "increased_cravings"
    ],
    reasoningPurpose:
      "Separates poor adherence caused by low commitment from poor adherence caused by excessive accumulated strain.",
    evidenceLevel: "high",
    tags: ["adherence", "fatigue", "dropout-risk", "diet-strain"]
  },

  {
    id: "performance_decline_during_deficit",
    label: "Performance Decline During Deficit",
    type: "performance_signal",
    domain: "diet-fatigue",
    description:
      "A reduction in strength, endurance, training quality, work capacity, or readiness during a fat-loss phase.",
    diagnosticRole: "supporting",
    appliesTo: ["fat_loss", "bodybuilding", "performance", "body_recomposition"],
    observableVia: [
      "strength_decline",
      "reduced_reps",
      "higher_session_rpe",
      "lower_running_pace",
      "reduced_training_motivation",
      "longer_recovery"
    ],
    reasoningPurpose:
      "Indicates whether the deficit is compromising training output or recovery.",
    evidenceLevel: "moderate",
    tags: ["performance", "training", "deficit", "recovery"]
  },

  {
    id: "diet_fatigue_risk",
    label: "Diet Fatigue Risk",
    type: "risk_score",
    domain: "diet-fatigue",
    description:
      "The estimated risk that the current dieting phase will become unsustainable due to accumulated physiological, behavioural, or psychological strain.",
    diagnosticRole: "core",
    appliesTo: ["fat_loss", "obesity", "bodybuilding", "body_recomposition", "chronic_illness"],
    observableVia: [
      "deficit_duration",
      "deficit_magnitude",
      "hunger_pressure",
      "recovery_debt",
      "psychological_diet_strain",
      "adherence_decline",
      "sleep_quality"
    ],
    reasoningPurpose:
      "Provides a decision layer for whether to continue, deload, refeed, diet break, or redesign the plan.",
    evidenceLevel: "moderate",
    tags: ["risk", "diet-fatigue", "decision-support", "sustainability"]
  }
];
