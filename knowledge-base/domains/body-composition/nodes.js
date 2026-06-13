export const bodyCompositionNodes = [
  {
    id: "body_composition_outcome",
    label: "Body Composition Outcome",
    type: "outcome_state",
    domain: "body-composition",
    description:
      "The change in fat mass, lean mass, muscle mass, body water, and visual appearance over time.",
    diagnosticRole: "core",
    appliesTo: ["fat_loss", "body_recomposition", "bodybuilding", "obesity", "performance", "older_adults"],
    observableVia: [
      "body_weight_trend",
      "waist_trend",
      "progress_photos",
      "strength_trend",
      "lean_mass_estimate",
      "fat_mass_estimate"
    ],
    reasoningPurpose:
      "Distinguishes true fat-loss progress from simple weight loss or short-term scale movement.",
    evidenceLevel: "high",
    tags: ["body-composition", "fat-mass", "lean-mass", "recomposition"]
  },

  {
    id: "fat_mass_change",
    label: "Fat Mass Change",
    type: "tissue_change",
    domain: "body-composition",
    description:
      "The estimated change in stored body fat over time.",
    diagnosticRole: "core",
    appliesTo: ["fat_loss", "obesity", "body_recomposition", "bodybuilding", "general_health"],
    observableVia: [
      "weight_trend",
      "waist_trend",
      "skinfolds",
      "dexa_scan",
      "progress_photos",
      "clothing_fit"
    ],
    reasoningPurpose:
      "Identifies whether the intervention is achieving the primary fat-loss goal.",
    evidenceLevel: "high",
    tags: ["fat-loss", "fat-mass", "outcome", "adiposity"]
  },

  {
    id: "lean_mass_retention",
    label: "Lean Mass Retention",
    type: "protective_outcome",
    domain: "body-composition",
    description:
      "The preservation of fat-free mass, including skeletal muscle, organ tissue, bone mass, glycogen, and body water during weight loss.",
    diagnosticRole: "core",
    appliesTo: ["fat_loss", "bodybuilding", "body_recomposition", "older_adults", "performance"],
    observableVia: [
      "strength_trend",
      "training_performance",
      "protein_intake",
      "resistance_training",
      "lean_mass_estimate",
      "rate_of_loss"
    ],
    reasoningPurpose:
      "Determines whether weight loss is occurring in a way that protects function, appearance, metabolism, and long-term health.",
    evidenceLevel: "high",
    tags: ["lean-mass", "muscle", "protein", "resistance-training"]
  },

  {
    id: "muscle_gain_potential",
    label: "Muscle Gain Potential",
    type: "adaptive_potential",
    domain: "body-composition",
    description:
      "The likelihood that a person can gain muscle while losing fat or maintaining weight, based on training status, protein intake, body fat level, age, recovery, and training quality.",
    diagnosticRole: "supporting",
    appliesTo: ["body_recomposition", "bodybuilding", "obesity", "older_adults", "youth", "performance"],
    observableVia: [
      "training_age",
      "body_fat_level",
      "protein_adequacy",
      "resistance_training_quality",
      "sleep_quality",
      "training_progression"
    ],
    reasoningPurpose:
      "Determines whether recomposition is realistic or whether the goal should prioritise fat loss or muscle gain separately.",
    evidenceLevel: "moderate",
    tags: ["muscle-gain", "recomposition", "training", "adaptation"]
  },

  {
    id: "rate_of_weight_loss",
    label: "Rate of Weight Loss",
    type: "outcome_rate",
    domain: "body-composition",
    description:
      "The speed of body-weight reduction over time, usually interpreted relative to body weight, body fat level, goal, and risk profile.",
    diagnosticRole: "core",
    appliesTo: ["fat_loss", "obesity", "bodybuilding", "body_recomposition", "older_adults"],
    observableVia: [
      "weekly_weight_change",
      "percentage_body_weight_loss_per_week",
      "rolling_weight_average",
      "diet_duration"
    ],
    reasoningPurpose:
      "Assesses whether weight loss is too slow, appropriate, or too aggressive for the goal and population.",
    evidenceLevel: "high",
    tags: ["rate-of-loss", "weight-loss", "deficit", "risk"]
  },

  {
    id: "recomposition_likelihood",
    label: "Recomposition Likelihood",
    type: "diagnostic_estimate",
    domain: "body-composition",
    description:
      "The likelihood that fat loss and muscle gain or retention are occurring simultaneously.",
    diagnosticRole: "supporting",
    appliesTo: ["body_recomposition", "bodybuilding", "obesity", "performance"],
    observableVia: [
      "waist_decrease",
      "stable_weight",
      "strength_increase",
      "photo_improvement",
      "training_status",
      "protein_intake"
    ],
    reasoningPurpose:
      "Prevents misclassifying stable scale weight as failure when body composition is improving.",
    evidenceLevel: "moderate",
    tags: ["recomposition", "stable-weight", "muscle", "fat-loss"]
  },

  {
    id: "body_composition_measurement_quality",
    label: "Body Composition Measurement Quality",
    type: "measurement_quality",
    domain: "body-composition",
    description:
      "The reliability of body-composition assessment methods such as DEXA, BIA, skinfolds, circumference, photos, clothing fit, and performance proxies.",
    diagnosticRole: "core",
    appliesTo: ["fat_loss", "body_recomposition", "bodybuilding", "obesity", "older_adults"],
    observableVia: [
      "measurement_method",
      "measurement_frequency",
      "device_consistency",
      "hydration_status",
      "operator_skill",
      "protocol_quality"
    ],
    reasoningPurpose:
      "Determines how much confidence to place in reported fat mass or lean mass changes.",
    evidenceLevel: "high",
    tags: ["measurement", "DEXA", "BIA", "skinfolds", "confidence"]
  },

  {
    id: "body_fat_level_context",
    label: "Body Fat Level Context",
    type: "contextual_modifier",
    domain: "body-composition",
    description:
      "The interpretation of body-composition strategy based on starting body fat, health risk, athletic goals, and leanness.",
    diagnosticRole: "core",
    appliesTo: ["fat_loss", "obesity", "bodybuilding", "performance", "general_health"],
    observableVia: [
      "estimated_body_fat_percentage",
      "waist_to_height_ratio",
      "bmi_context",
      "visual_leanness",
      "health_risk_markers"
    ],
    reasoningPurpose:
      "Determines whether the person has more room for aggressive fat loss or needs more conservative recomposition planning.",
    evidenceLevel: "moderate",
    tags: ["body-fat", "context", "risk", "goal-setting"]
  },

  {
    id: "visual_leanness_signal",
    label: "Visual Leanness Signal",
    type: "secondary_outcome_signal",
    domain: "body-composition",
    description:
      "Changes in visible muscular definition, shape, waistline, vascularity, posture, and apparent body composition.",
    diagnosticRole: "supporting",
    appliesTo: ["fat_loss", "body_recomposition", "bodybuilding", "performance"],
    observableVia: [
      "progress_photos",
      "clothing_fit",
      "mirror_feedback",
      "waistline_appearance",
      "muscle_definition"
    ],
    reasoningPurpose:
      "Provides secondary context when scale weight is noisy or recomposition is likely.",
    evidenceLevel: "low",
    tags: ["visual", "photos", "leanness", "bodybuilding"]
  },

  {
    id: "sarcopenia_risk",
    label: "Sarcopenia Risk",
    type: "population_risk",
    domain: "body-composition",
    description:
      "The risk of low muscle mass, strength, or function, especially in older adults, chronic illness, low protein intake, inactivity, or rapid weight loss.",
    diagnosticRole: "risk_flag",
    appliesTo: ["older_adults", "obesity", "chronic_illness", "general_health"],
    observableVia: [
      "age",
      "low_strength",
      "low_muscle_mass",
      "low_protein_intake",
      "low_activity",
      "rapid_weight_loss",
      "frailty_markers"
    ],
    reasoningPurpose:
      "Ensures fat-loss recommendations protect muscle, function, and independence.",
    evidenceLevel: "high",
    tags: ["sarcopenia", "older-adults", "muscle", "risk"]
  }
];
