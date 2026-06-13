/**
 * nodes.js
 *
 * Water Retention & Scale Noise domain nodes.
 */

export const WATER_SCALE_NOISE_NODES = [
  {
    id: "water_retention",
    label: "Water Retention",
    type: "mechanism",
    domain: "water_scale_noise",
    description:
      "Temporary fluid retention that can increase scale weight independently of fat mass.",
    aliases: ["fluid retention", "water weight"],
    populationApplicability: ["all"],
    evidenceLevel: "mechanistic_evidence",
    confidence: 80,
    coachingImplication:
      "Do not assume fat loss has stopped when weight is volatile and water-retention drivers are present.",
    observedBy: [
      "weight_volatility_high",
      "scale_spike"
    ],
    influencedBy: [
      "training_inflammation",
      "glycogen_storage",
      "sodium_variability",
      "poor_sleep_recovery",
      "stress_load",
      "illness_inflammation"
    ],
    interventions: [
      "hold_calories_steady",
      "standardise_sodium",
      "standardise_carbohydrate",
      "improve_sleep_consistency"
    ]
  },

  {
    id: "scale_weight",
    label: "Scale Weight",
    type: "measurement",
    domain: "water_scale_noise",
    description:
      "The total body mass displayed by a scale, including fat mass, lean mass, water, glycogen, gut content and measurement noise.",
    aliases: ["bodyweight", "body weight"],
    populationApplicability: ["all"],
    evidenceLevel: "mechanistic_evidence",
    confidence: 90,
    coachingImplication:
      "Scale weight is useful, but single-day values should not be interpreted as direct fat change.",
    observedBy: [
      "daily_weigh_in"
    ],
    influencedBy: [
      "fat_mass",
      "lean_mass",
      "water_retention",
      "glycogen_storage",
      "gut_content_load"
    ],
    interventions: [
      "use_rolling_average",
      "standardise_weigh_in_conditions"
    ]
  },

  {
    id: "weight_volatility_high",
    label: "High Weight Volatility",
    type: "signal",
    domain: "water_scale_noise",
    description:
      "A calculated signal where day-to-day scale weight changes are large enough to reduce confidence in the short-term trend.",
    populationApplicability: ["all"],
    evidenceLevel: "coaching_heuristic",
    confidence: 70,
    coachingImplication:
      "High volatility should shift the system away from immediate calorie cuts and toward signal clarification.",
    observedBy: [
      "scale_weight"
    ],
    influencedBy: [
      "water_retention",
      "gut_content_load",
      "measurement_noise"
    ],
    interventions: [
      "use_rolling_average",
      "hold_calories_steady"
    ]
  },

  {
    id: "masked_fat_loss",
    label: "Masked Fat Loss",
    type: "diagnosis",
    domain: "water_scale_noise",
    description:
      "A diagnostic interpretation where fat loss may be occurring but hidden by water retention, glycogen, gut content or measurement noise.",
    populationApplicability: ["all"],
    evidenceLevel: "mechanistic_evidence",
    confidence: 75,
    coachingImplication:
      "If masking is likely, the correct move is often to hold the plan steady and improve data quality.",
    observedBy: [
      "deficit_detected",
      "weight_trend_flat",
      "weight_volatility_high"
    ],
    influencedBy: [
      "water_retention",
      "glycogen_storage",
      "gut_content_load",
      "training_inflammation"
    ],
    interventions: [
      "hold_calories_steady",
      "wait_seven_days",
      "use_rolling_average"
    ]
  },

  {
    id: "recovery_water_retention",
    label: "Recovery-Driven Water Retention",
    type: "diagnosis",
    domain: "water_scale_noise",
    description:
      "Water retention pattern primarily driven by poor sleep, high training load, stress, soreness or illness.",
    populationApplicability: [
      "all",
      "bodybuilder",
      "athlete",
      "chronic_illness"
    ],
    evidenceLevel: "mechanistic_evidence",
    confidence: 75,
    coachingImplication:
      "Prioritise recovery before reducing calories when recovery-driven masking is the strongest explanation.",
    observedBy: [
      "sleep_poor",
      "training_load_high",
      "stress_high",
      "weight_volatility_high"
    ],
    influencedBy: [
      "poor_sleep_recovery",
      "training_inflammation",
      "stress_load",
      "illness_inflammation"
    ],
    interventions: [
      "improve_sleep_consistency",
      "reduce_training_fatigue",
      "hold_calories_steady"
    ]
  },

  {
    id: "dietary_water_retention",
    label: "Dietary Water Retention",
    type: "diagnosis",
    domain: "water_scale_noise",
    description:
      "Water retention pattern primarily driven by carbohydrate, sodium, alcohol, food volume or digestive-content variation.",
    populationApplicability: ["all", "bodybuilder", "general_adult"],
    evidenceLevel: "mechanistic_evidence",
    confidence: 75,
    coachingImplication:
      "Standardise dietary inputs before assuming the calorie deficit has failed.",
    observedBy: [
      "carbohydrate_variability_high",
      "sodium_variability_high",
      "alcohol_detected",
      "gut_load_high",
      "weight_volatility_high"
    ],
    influencedBy: [
      "glycogen_storage",
      "sodium_variability",
      "alcohol_intake",
      "gut_content_load"
    ],
    interventions: [
      "standardise_carbohydrate",
      "standardise_sodium",
      "standardise_food_volume"
    ]
  },

  {
    id: "glycogen_storage",
    label: "Glycogen Storage",
    type: "mechanism",
    domain: "water_scale_noise",
    description:
      "Stored carbohydrate in muscle and liver that is associated with additional body water and can influence scale weight.",
    populationApplicability: ["all", "bodybuilder", "athlete"],
    evidenceLevel: "mechanistic_evidence",
    confidence: 80,
    coachingImplication:
      "Carbohydrate changes can move scale weight quickly without representing fat gain or loss.",
    observedBy: [
      "carbohydrate_variability_high"
    ],
    influencedBy: [
      "carbohydrate_intake",
      "training_volume"
    ],
    interventions: [
      "standardise_carbohydrate"
    ]
  },

  {
    id: "sodium_variability",
    label: "Sodium Variability",
    type: "mechanism",
    domain: "water_scale_noise",
    description:
      "Variation in sodium intake that can influence fluid balance and short-term scale changes.",
    populationApplicability: ["all"],
    evidenceLevel: "mechanistic_evidence",
    confidence: 70,
    coachingImplication:
      "A consistent sodium pattern improves the interpretability of scale trends.",
    observedBy: [
      "sodium_variability_high"
    ],
    influencedBy: [
      "processed_food_intake",
      "restaurant_meals"
    ],
    interventions: [
      "standardise_sodium"
    ]
  },

  {
    id: "gut_content_load",
    label: "Gut Content Load",
    type: "mechanism",
    domain: "water_scale_noise",
    description:
      "The mass of food, fibre, fluid and stool within the digestive tract that can affect scale weight independently of fat mass.",
    populationApplicability: ["all"],
    evidenceLevel: "mechanistic_evidence",
    confidence: 70,
    coachingImplication:
      "Food volume and bowel regularity can explain short-term scale changes without fat gain.",
    observedBy: [
      "gut_load_high",
      "bowel_irregularity"
    ],
    influencedBy: [
      "food_volume",
      "fibre_intake",
      "meal_timing"
    ],
    interventions: [
      "standardise_food_volume",
      "standardise_fibre"
    ]
  },

  {
    id: "measurement_noise",
    label: "Measurement Noise",
    type: "mechanism",
    domain: "water_scale_noise",
    description:
      "Error or variation introduced by inconsistent weigh-in timing, scale differences, hydration status or short data windows.",
    populationApplicability: ["all"],
    evidenceLevel: "coaching_heuristic",
    confidence: 65,
    coachingImplication:
      "Improve measurement conditions before making plan changes from noisy data.",
    observedBy: [
      "inconsistent_weigh_in_timing",
      "missing_weigh_ins",
      "short_time_window"
    ],
    influencedBy: [
      "weigh_in_timing",
      "scale_consistency",
      "hydration_status"
    ],
    interventions: [
      "standardise_weigh_in_conditions",
      "collect_more_data",
      "use_rolling_average"
    ]
  }
];