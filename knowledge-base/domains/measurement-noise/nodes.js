export const measurementNoiseNodes = [
  {
    id: "measurement_noise_interpretation",
    label: "Measurement Noise Interpretation",
    type: "diagnostic_process",
    domain: "measurement-noise",
    description:
      "The ability to distinguish real tissue change from short-term fluctuations in body weight, waist, photos, digestion, hydration, glycogen, sodium, inflammation, and measurement error.",
    diagnosticRole: "core",
    appliesTo: ["fat_loss", "body_recomposition", "bodybuilding", "obesity", "general_health"],
    observableVia: [
      "scale_trend",
      "daily_weight_variability",
      "waist_measurements",
      "progress_photos",
      "hydration_status",
      "sodium_intake",
      "cycle_phase",
      "training_soreness"
    ],
    reasoningPurpose:
      "Prevents overreacting to noisy short-term data and improves confidence in true progress assessment.",
    evidenceLevel: "high",
    tags: ["measurement", "noise", "scale-weight", "trend"]
  },

  {
    id: "scale_weight_variability",
    label: "Scale Weight Variability",
    type: "measurement_signal",
    domain: "measurement-noise",
    description:
      "Short-term body-weight changes caused by fluid, glycogen, food mass, bowel contents, sodium, stress, training inflammation, and measurement conditions.",
    diagnosticRole: "core",
    appliesTo: ["fat_loss", "body_recomposition", "bodybuilding", "obesity"],
    observableVia: [
      "daily_weight_range",
      "weekly_weight_range",
      "morning_weight",
      "weigh_in_conditions",
      "recent_meal_size",
      "bowel_movements"
    ],
    reasoningPurpose:
      "Explains why scale weight may move independently of fat mass over short periods.",
    evidenceLevel: "high",
    tags: ["scale", "weight", "fluid", "trend"]
  },

  {
    id: "weigh_in_protocol_quality",
    label: "Weigh-In Protocol Quality",
    type: "measurement_quality",
    domain: "measurement-noise",
    description:
      "The consistency of weigh-in timing, scale placement, clothing, hydration state, food status, and recording frequency.",
    diagnosticRole: "core",
    appliesTo: ["fat_loss", "body_recomposition", "obesity", "bodybuilding"],
    observableVia: [
      "weigh_in_time",
      "scale_surface",
      "clothing_consistency",
      "morning_weigh_in",
      "weigh_in_frequency",
      "missing_weights"
    ],
    reasoningPurpose:
      "Determines whether scale data is reliable enough to interpret.",
    evidenceLevel: "high",
    tags: ["weigh-in", "protocol", "data-quality", "scale"]
  },

  {
    id: "weight_trend_confidence",
    label: "Weight Trend Confidence",
    type: "confidence_metric",
    domain: "measurement-noise",
    description:
      "The confidence that observed body-weight change reflects a real trend rather than temporary noise.",
    diagnosticRole: "core",
    appliesTo: ["fat_loss", "body_recomposition", "obesity", "bodybuilding"],
    observableVia: [
      "rolling_average_weight",
      "number_of_weigh_ins",
      "trend_duration",
      "weight_variability",
      "protocol_quality"
    ],
    reasoningPurpose:
      "Determines whether the graph should recommend plan changes or continue observation.",
    evidenceLevel: "high",
    tags: ["trend", "confidence", "decision-threshold", "weight"]
  },

  {
    id: "waist_measurement_quality",
    label: "Waist Measurement Quality",
    type: "measurement_quality",
    domain: "measurement-noise",
    description:
      "The consistency and reliability of waist measurements, including anatomical site, tape tension, posture, breathing, and timing.",
    diagnosticRole: "supporting",
    appliesTo: ["fat_loss", "body_recomposition", "obesity", "general_health"],
    observableVia: [
      "waist_site_consistency",
      "tape_tension",
      "breathing_state",
      "measurement_frequency",
      "measurement_repeatability"
    ],
    reasoningPurpose:
      "Improves confidence in body composition change when scale weight is noisy.",
    evidenceLevel: "moderate",
    tags: ["waist", "measurement", "body-composition", "health"]
  },

  {
    id: "photo_comparison_quality",
    label: "Photo Comparison Quality",
    type: "measurement_quality",
    domain: "measurement-noise",
    description:
      "The consistency of progress photos, including lighting, distance, pose, camera angle, pump, time of day, and clothing.",
    diagnosticRole: "supporting",
    appliesTo: ["fat_loss", "body_recomposition", "bodybuilding"],
    observableVia: [
      "photo_lighting",
      "camera_angle",
      "pose_consistency",
      "photo_frequency",
      "time_of_day",
      "training_pump"
    ],
    reasoningPurpose:
      "Prevents visual misinterpretation caused by inconsistent photo conditions.",
    evidenceLevel: "low",
    tags: ["photos", "visual-progress", "body-composition", "measurement"]
  },

  {
    id: "glycogen_water_shift",
    label: "Glycogen-Water Shift",
    type: "scale_noise_driver",
    domain: "measurement-noise",
    description:
      "Body-weight fluctuation caused by changes in carbohydrate intake, glycogen storage, and associated water retention.",
    diagnosticRole: "core",
    appliesTo: ["fat_loss", "bodybuilding", "body_recomposition", "performance"],
    observableVia: [
      "carbohydrate_intake_change",
      "refeed_day",
      "low_carb_phase",
      "training_volume_change",
      "scale_spike_or_drop"
    ],
    reasoningPurpose:
      "Explains rapid weight changes after carb changes without assuming fat gain or fat loss.",
    evidenceLevel: "high",
    tags: ["glycogen", "water", "carbs", "scale-noise"]
  },

  {
    id: "sodium_water_shift",
    label: "Sodium-Water Shift",
    type: "scale_noise_driver",
    domain: "measurement-noise",
    description:
      "Temporary body-weight fluctuation caused by changes in sodium intake, eating out, processed foods, hydration, and fluid balance.",
    diagnosticRole: "supporting",
    appliesTo: ["fat_loss", "body_recomposition", "bodybuilding", "general_health"],
    observableVia: [
      "high_sodium_meal",
      "restaurant_food",
      "processed_food_intake",
      "hydration_change",
      "scale_spike"
    ],
    reasoningPurpose:
      "Prevents temporary sodium-related fluid retention from being interpreted as fat gain.",
    evidenceLevel: "moderate",
    tags: ["sodium", "water", "scale-noise", "hydration"]
  },

  {
    id: "digestive_content_shift",
    label: "Digestive Content Shift",
    type: "scale_noise_driver",
    domain: "measurement-noise",
    description:
      "Body-weight fluctuation caused by food volume, fibre intake, bowel regularity, constipation, gut transit time, and meal timing.",
    diagnosticRole: "supporting",
    appliesTo: ["fat_loss", "obesity", "general_health", "chronic_illness"],
    observableVia: [
      "meal_volume",
      "fibre_intake",
      "bowel_movement_frequency",
      "constipation",
      "late_meal",
      "gut_symptoms"
    ],
    reasoningPurpose:
      "Explains scale increases caused by gut contents rather than tissue gain.",
    evidenceLevel: "moderate",
    tags: ["digestion", "gut", "scale-noise", "food-volume"]
  },

  {
    id: "training_inflammation_shift",
    label: "Training Inflammation Shift",
    type: "scale_noise_driver",
    domain: "measurement-noise",
    description:
      "Temporary water retention from muscle damage, soreness, new training stimulus, high volume, or inflammation.",
    diagnosticRole: "supporting",
    appliesTo: ["fat_loss", "body_recomposition", "bodybuilding", "performance"],
    observableVia: [
      "muscle_soreness",
      "new_exercise",
      "training_volume_increase",
      "eccentric_loading",
      "scale_spike"
    ],
    reasoningPurpose:
      "Explains why weight may increase after hard training despite fat loss continuing.",
    evidenceLevel: "moderate",
    tags: ["training", "inflammation", "water-retention", "scale-noise"]
  },

  {
    id: "menstrual_cycle_fluid_shift",
    label: "Menstrual Cycle Fluid Shift",
    type: "scale_noise_driver",
    domain: "measurement-noise",
    description:
      "Predictable or semi-predictable body-weight and water-retention changes associated with menstrual-cycle phase.",
    diagnosticRole: "population_modifier",
    appliesTo: ["fat_loss", "body_recomposition", "obesity", "general_health"],
    observableVia: [
      "cycle_phase",
      "premenstrual_weight_change",
      "bloating",
      "cycle_tracking",
      "cravings"
    ],
    reasoningPurpose:
      "Improves trend interpretation for menstruating individuals by comparing like-with-like cycle phases.",
    evidenceLevel: "moderate",
    tags: ["menstrual-cycle", "water-retention", "population-aware", "scale-noise"]
  },

  {
    id: "measurement_decision_threshold",
    label: "Measurement Decision Threshold",
    type: "decision_rule",
    domain: "measurement-noise",
    description:
      "The minimum quality, duration, and consistency of measurement data required before changing the fat-loss plan.",
    diagnosticRole: "core",
    appliesTo: ["fat_loss", "body_recomposition", "obesity", "bodybuilding", "general_health"],
    observableVia: [
      "trend_duration",
      "weigh_in_count",
      "waist_trend",
      "adherence_confidence",
      "activity_confidence",
      "noise_flags"
    ],
    reasoningPurpose:
      "Prevents premature intervention changes based on unreliable or noisy data.",
    evidenceLevel: "high",
    tags: ["decision-rule", "threshold", "diagnostics", "trend"]
  }
];
