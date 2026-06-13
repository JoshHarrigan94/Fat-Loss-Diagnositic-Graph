export const glucoseInsulinNodes = [
  {
    id: "glucose_insulin_regulation",
    label: "Glucose & Insulin Regulation",
    type: "metabolic_system",
    domain: "glucose-insulin",
    description:
      "The regulation of blood glucose, insulin secretion, insulin sensitivity, glucose disposal, and post-meal glucose responses.",
    diagnosticRole: "core",
    appliesTo: ["fat_loss", "obesity", "type_2_diabetes", "general_health", "performance", "older_adults"],
    observableVia: [
      "fasting_glucose",
      "hba1c",
      "postprandial_glucose",
      "continuous_glucose_monitoring",
      "insulin_resistance_markers",
      "waist_circumference"
    ],
    reasoningPurpose:
      "Determines whether metabolic health, glucose control, or insulin resistance should modify fat-loss recommendations.",
    evidenceLevel: "high",
    tags: ["glucose", "insulin", "metabolic-health", "type-2-diabetes"]
  },

  {
    id: "insulin_sensitivity",
    label: "Insulin Sensitivity",
    type: "metabolic_capacity",
    domain: "glucose-insulin",
    description:
      "The body's ability to respond effectively to insulin and move glucose into tissues such as skeletal muscle.",
    diagnosticRole: "core",
    appliesTo: ["fat_loss", "obesity", "type_2_diabetes", "performance", "general_health"],
    observableVia: [
      "fasting_glucose",
      "hba1c",
      "fasting_insulin",
      "waist_circumference",
      "activity_level",
      "post_meal_glucose_response"
    ],
    reasoningPurpose:
      "Explains why body fat, activity, muscle mass, sleep, and diet quality influence glucose control.",
    evidenceLevel: "high",
    tags: ["insulin-sensitivity", "glucose-disposal", "metabolic-health"]
  },

  {
    id: "postprandial_glucose_response",
    label: "Postprandial Glucose Response",
    type: "meal_response",
    domain: "glucose-insulin",
    description:
      "The rise, peak, duration, and return-to-baseline pattern of blood glucose after eating.",
    diagnosticRole: "core",
    appliesTo: ["type_2_diabetes", "obesity", "general_health", "performance"],
    observableVia: [
      "cgm_trace",
      "finger_prick_glucose",
      "meal_carbohydrate_amount",
      "meal_composition",
      "activity_after_meal",
      "glucose_peak"
    ],
    reasoningPurpose:
      "Identifies meals, timings, or behaviours that create problematic glucose excursions.",
    evidenceLevel: "high",
    tags: ["postprandial", "glucose", "CGM", "meal-response"]
  },

  {
    id: "carbohydrate_tolerance_context",
    label: "Carbohydrate Tolerance Context",
    type: "contextual_modifier",
    domain: "glucose-insulin",
    description:
      "The person's current ability to tolerate carbohydrate intake based on insulin sensitivity, activity, muscle mass, medication, meal composition, and timing.",
    diagnosticRole: "supporting",
    appliesTo: ["type_2_diabetes", "fat_loss", "obesity", "performance", "bodybuilding"],
    observableVia: [
      "postprandial_glucose_response",
      "activity_level",
      "muscle_mass",
      "carbohydrate_intake",
      "fibre_intake",
      "medication_use"
    ],
    reasoningPurpose:
      "Prevents simplistic high-carb or low-carb recommendations by interpreting carbohydrate response in context.",
    evidenceLevel: "moderate",
    tags: ["carbohydrates", "tolerance", "glucose", "context"]
  },

  {
    id: "muscle_glucose_sink",
    label: "Muscle Glucose Sink",
    type: "physiological_capacity",
    domain: "glucose-insulin",
    description:
      "The role of skeletal muscle mass and activity in storing glycogen and disposing of glucose.",
    diagnosticRole: "supporting",
    appliesTo: ["fat_loss", "type_2_diabetes", "performance", "body_recomposition", "older_adults"],
    observableVia: [
      "lean_mass_estimate",
      "resistance_training_quality",
      "step_count",
      "cardio_training_dose",
      "training_frequency"
    ],
    reasoningPurpose:
      "Explains why preserving or building muscle can improve metabolic flexibility and glucose regulation.",
    evidenceLevel: "high",
    tags: ["muscle", "glucose-disposal", "glycogen", "insulin-sensitivity"]
  },

  {
    id: "meal_composition_glucose_effect",
    label: "Meal Composition Glucose Effect",
    type: "meal_response_modifier",
    domain: "glucose-insulin",
    description:
      "The effect of protein, fibre, fat, carbohydrate amount, food processing, and meal order on glucose response.",
    diagnosticRole: "core",
    appliesTo: ["type_2_diabetes", "obesity", "fat_loss", "general_health"],
    observableVia: [
      "meal_macros",
      "fibre_grams",
      "protein_grams",
      "carbohydrate_grams",
      "food_processing_level",
      "post_meal_glucose"
    ],
    reasoningPurpose:
      "Supports meal design recommendations that improve glucose control without relying only on calorie reduction.",
    evidenceLevel: "high",
    tags: ["meal-composition", "glucose", "fibre", "protein"]
  },

  {
    id: "activity_timing_for_glucose",
    label: "Activity Timing for Glucose",
    type: "intervention_timing",
    domain: "glucose-insulin",
    description:
      "The use of walking, light movement, resistance training, or cardio around meals to improve glucose disposal.",
    diagnosticRole: "supporting",
    appliesTo: ["type_2_diabetes", "obesity", "general_health", "older_adults"],
    observableVia: [
      "post_meal_walks",
      "activity_after_meals",
      "step_timing",
      "cgm_response",
      "meal_timing"
    ],
    reasoningPurpose:
      "Identifies low-risk movement strategies for improving post-meal glucose handling.",
    evidenceLevel: "high",
    tags: ["post-meal-walk", "activity-timing", "glucose", "type-2-diabetes"]
  },

  {
    id: "hypoglycaemia_risk",
    label: "Hypoglycaemia Risk",
    type: "medical_risk_signal",
    domain: "glucose-insulin",
    description:
      "The risk of blood glucose dropping too low, especially with glucose-lowering medication, insulin, missed meals, exercise, alcohol, or aggressive calorie restriction.",
    diagnosticRole: "risk_flag",
    appliesTo: ["type_2_diabetes", "chronic_illness", "older_adults", "fat_loss"],
    observableVia: [
      "diabetes_medication",
      "insulin_use",
      "sulfonylurea_use",
      "missed_meals",
      "dizziness",
      "sweating",
      "shaking",
      "low_glucose_reading"
    ],
    reasoningPurpose:
      "Prevents unsafe dietary or activity recommendations in people at risk of low blood glucose.",
    evidenceLevel: "high",
    tags: ["hypoglycaemia", "medical-risk", "diabetes", "safety"]
  },

  {
    id: "glycaemic_variability",
    label: "Glycaemic Variability",
    type: "metabolic_signal",
    domain: "glucose-insulin",
    description:
      "The degree of fluctuation in blood glucose across the day, including peaks, dips, and time spent outside target range.",
    diagnosticRole: "supporting",
    appliesTo: ["type_2_diabetes", "obesity", "general_health", "performance"],
    observableVia: [
      "cgm_variability",
      "time_in_range",
      "glucose_peaks",
      "glucose_dips",
      "meal_response_variability"
    ],
    reasoningPurpose:
      "Identifies unstable glucose patterns that may affect hunger, energy, mood, and health risk.",
    evidenceLevel: "moderate",
    tags: ["glycaemic-variability", "CGM", "glucose", "metabolic-health"]
  },

  {
    id: "weight_loss_glucose_benefit",
    label: "Weight Loss Glucose Benefit",
    type: "health_outcome_link",
    domain: "glucose-insulin",
    description:
      "The improvement in glucose regulation that may occur with reductions in fat mass, especially visceral or ectopic fat.",
    diagnosticRole: "core",
    appliesTo: ["type_2_diabetes", "obesity", "fat_loss", "general_health"],
    observableVia: [
      "fat_mass_change",
      "waist_trend",
      "hba1c_change",
      "fasting_glucose_change",
      "medication_reduction",
      "visceral_fat_estimate"
    ],
    reasoningPurpose:
      "Links fat loss to cardiometabolic improvement rather than treating weight loss as purely aesthetic.",
    evidenceLevel: "high",
    tags: ["weight-loss", "glucose", "diabetes", "metabolic-health"]
  }
];
