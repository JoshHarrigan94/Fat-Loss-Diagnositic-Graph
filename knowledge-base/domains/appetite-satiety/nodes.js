export const appetiteSatietyNodes = [
  {
    id: "appetite_regulation",
    label: "Appetite Regulation",
    type: "physiological_behavioural_system",
    domain: "appetite-satiety",
    description:
      "The integrated regulation of hunger, fullness, cravings, reward drive, meal satisfaction, and eating impulses.",
    diagnosticRole: "core",
    appliesTo: ["fat_loss", "obesity", "body_recomposition", "type_2_diabetes", "general_health"],
    observableVia: [
      "hunger_rating",
      "fullness_rating",
      "craving_frequency",
      "meal_satisfaction",
      "snacking_frequency",
      "loss_of_control_eating"
    ],
    reasoningPurpose:
      "Explains whether adherence difficulty is driven by appetite pressure rather than motivation failure.",
    evidenceLevel: "high",
    tags: ["appetite", "satiety", "hunger", "cravings"]
  },

  {
    id: "hunger_pressure",
    label: "Hunger Pressure",
    type: "appetite_state",
    domain: "appetite-satiety",
    description:
      "The subjective drive to eat caused by energy deficit, low food volume, poor sleep, stress, low protein, low fibre, high palatability exposure, or aggressive restriction.",
    diagnosticRole: "core",
    appliesTo: ["fat_loss", "obesity", "body_recomposition", "bodybuilding"],
    observableVia: [
      "hunger_rating",
      "preoccupation_with_food",
      "night_hunger",
      "early_day_hunger",
      "difficulty_stopping_meals"
    ],
    reasoningPurpose:
      "Determines whether the current deficit is physiologically or behaviourally too aggressive.",
    evidenceLevel: "high",
    tags: ["hunger", "deficit", "diet-fatigue", "adherence"]
  },

  {
    id: "satiety_response",
    label: "Satiety Response",
    type: "meal_response",
    domain: "appetite-satiety",
    description:
      "The degree of fullness, satisfaction, and reduced desire to eat after meals.",
    diagnosticRole: "core",
    appliesTo: ["fat_loss", "obesity", "type_2_diabetes", "general_health"],
    observableVia: [
      "post_meal_fullness",
      "meal_satisfaction",
      "time_to_next_hunger",
      "snacking_after_meals",
      "meal_composition"
    ],
    reasoningPurpose:
      "Explains why calorie-matched meals can produce different adherence outcomes.",
    evidenceLevel: "high",
    tags: ["satiety", "meal-composition", "fullness", "snacking"]
  },

  {
    id: "craving_intensity",
    label: "Craving Intensity",
    type: "appetite_state",
    domain: "appetite-satiety",
    description:
      "The intensity and frequency of specific food urges, especially for energy-dense, sweet, salty, fatty, or highly palatable foods.",
    diagnosticRole: "core",
    appliesTo: ["fat_loss", "obesity", "general_health", "body_recomposition"],
    observableVia: [
      "craving_rating",
      "craving_frequency",
      "trigger_foods",
      "evening_cravings",
      "stress_eating"
    ],
    reasoningPurpose:
      "Identifies reward-driven eating pressure that may not be solved by simple calorie targets.",
    evidenceLevel: "moderate",
    tags: ["cravings", "reward", "palatability", "stress-eating"]
  },

  {
    id: "meal_satisfaction",
    label: "Meal Satisfaction",
    type: "subjective_meal_quality",
    domain: "appetite-satiety",
    description:
      "The psychological and sensory satisfaction produced by meals, including taste, texture, warmth, portion size, familiarity, and perceived normality.",
    diagnosticRole: "supporting",
    appliesTo: ["fat_loss", "obesity", "general_health", "youth", "older_adults"],
    observableVia: [
      "meal_enjoyment",
      "food_preference_match",
      "diet_monotony",
      "portion_satisfaction",
      "post_meal_cravings"
    ],
    reasoningPurpose:
      "Explains why technically nutritious diets may fail when meals feel joyless or incomplete.",
    evidenceLevel: "moderate",
    tags: ["satisfaction", "preferences", "meal-design", "adherence"]
  },

  {
    id: "reward_driven_eating",
    label: "Reward-Driven Eating",
    type: "eating_driver",
    domain: "appetite-satiety",
    description:
      "Eating driven by pleasure, stress relief, habit, sensory reward, availability, or emotional state rather than energy need.",
    diagnosticRole: "core",
    appliesTo: ["fat_loss", "obesity", "general_health", "chronic_illness"],
    observableVia: [
      "eating_without_hunger",
      "stress_eating",
      "boredom_eating",
      "trigger_food_exposure",
      "loss_of_control_eating"
    ],
    reasoningPurpose:
      "Separates physiological hunger from hedonic or context-driven eating.",
    evidenceLevel: "high",
    tags: ["reward", "hedonic-eating", "stress", "environment"]
  },

  {
    id: "early_day_underfeeding",
    label: "Early-Day Underfeeding",
    type: "meal_timing_pattern",
    domain: "appetite-satiety",
    description:
      "A pattern where low intake earlier in the day increases hunger, cravings, overeating, or loss of control later.",
    diagnosticRole: "supporting",
    appliesTo: ["fat_loss", "obesity", "body_recomposition", "general_health"],
    observableVia: [
      "breakfast_skipping",
      "low_lunch_calories",
      "evening_hunger",
      "night_snacking",
      "late_day_calorie_skew"
    ],
    reasoningPurpose:
      "Explains late-day adherence breakdown despite good morning discipline.",
    evidenceLevel: "moderate",
    tags: ["meal-timing", "evening-hunger", "snacking", "adherence"]
  },

  {
    id: "palatability_exposure",
    label: "Palatability Exposure",
    type: "food_environment_factor",
    domain: "appetite-satiety",
    description:
      "Exposure to foods engineered or perceived as highly tasty, convenient, energy-dense, and easy to overconsume.",
    diagnosticRole: "core",
    appliesTo: ["fat_loss", "obesity", "youth", "general_health"],
    observableVia: [
      "snack_visibility",
      "takeaway_frequency",
      "trigger_food_availability",
      "ultra_processed_food_intake",
      "eating_out_frequency"
    ],
    reasoningPurpose:
      "Explains why appetite regulation is harder in high-cue, high-reward food environments.",
    evidenceLevel: "high",
    tags: ["palatability", "food-environment", "UPF", "overconsumption"]
  },

  {
    id: "appetite_suppression_risk",
    label: "Appetite Suppression Risk",
    type: "medical_behavioural_modifier",
    domain: "appetite-satiety",
    description:
      "A state where medication, stimulants, stress, illness, or deliberate restriction suppresses hunger in ways that may later cause under-fuelling, rebound hunger, poor recovery, or nutrient gaps.",
    diagnosticRole: "risk_flag",
    appliesTo: ["fat_loss", "body_recomposition", "performance", "youth", "chronic_illness"],
    observableVia: [
      "very_low_daytime_hunger",
      "stimulant_medication",
      "missed_meals",
      "low_energy_intake",
      "evening_rebound_hunger",
      "poor_recovery"
    ],
    reasoningPurpose:
      "Prevents the graph from treating low hunger as automatically positive.",
    evidenceLevel: "moderate",
    tags: ["appetite-suppression", "medication", "under-fuelling", "risk"]
  },

  {
    id: "deficit_aggressiveness",
    label: "Deficit Aggressiveness",
    type: "intervention_dose",
    domain: "appetite-satiety",
    description:
      "The size and perceived severity of the calorie deficit relative to body size, activity, recovery capacity, diet history, and goal urgency.",
    diagnosticRole: "core",
    appliesTo: ["fat_loss", "bodybuilding", "obesity", "body_recomposition"],
    observableVia: [
      "planned_calorie_deficit",
      "rate_of_loss",
      "hunger_rating",
      "fatigue",
      "training_performance",
      "diet_history"
    ],
    reasoningPurpose:
      "Determines whether hunger and adherence problems are caused by an overly aggressive deficit.",
    evidenceLevel: "high",
    tags: ["deficit", "hunger", "diet-fatigue", "intervention-dose"]
  }
];