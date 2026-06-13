export const recoverySleepNodes = [
  {
    id: "sleep_duration",
    label: "Sleep Duration",
    type: "recovery_input",
    domain: "recovery-sleep",
    description:
      "The average amount of sleep obtained per night across a meaningful observation window.",
    diagnosticRole: "core",
    appliesTo: ["fat_loss", "obesity", "body_recomposition", "performance", "general_health"],
    observableVia: ["sleep_hours", "wearable_sleep_duration", "sleep_diary"],
    reasoningPurpose:
      "Identifies whether insufficient sleep may be impairing appetite regulation, recovery, training output, and adherence.",
    evidenceLevel: "high",
    tags: ["sleep", "recovery", "fatigue", "appetite"]
  },

  {
    id: "sleep_quality",
    label: "Sleep Quality",
    type: "recovery_input",
    domain: "recovery-sleep",
    description:
      "The subjective and objective quality of sleep, including continuity, restfulness, awakenings, and perceived restoration.",
    diagnosticRole: "core",
    appliesTo: ["fat_loss", "obesity", "performance", "general_health", "chronic_illness"],
    observableVia: [
      "sleep_score",
      "night_awakenings",
      "restfulness_rating",
      "sleep_efficiency",
      "morning_fatigue"
    ],
    reasoningPurpose:
      "Explains why adequate sleep duration may still fail to support recovery or appetite control.",
    evidenceLevel: "high",
    tags: ["sleep-quality", "recovery", "fatigue", "stress"]
  },

  {
    id: "recovery_capacity",
    label: "Recovery Capacity",
    type: "system_capacity",
    domain: "recovery-sleep",
    description:
      "The person's ability to tolerate, recover from, and adapt to diet, training, life stress, and activity demands.",
    diagnosticRole: "core",
    appliesTo: ["fat_loss", "bodybuilding", "performance", "older_adults", "chronic_illness"],
    observableVia: [
      "training_performance",
      "soreness",
      "sleep_quality",
      "mood",
      "fatigue",
      "injury_pain",
      "resting_heart_rate",
      "hrv_trend"
    ],
    reasoningPurpose:
      "Determines whether the current intervention dose is recoverable.",
    evidenceLevel: "moderate",
    tags: ["recovery", "capacity", "stress-load", "adaptation"]
  },

  {
    id: "subjective_fatigue",
    label: "Subjective Fatigue",
    type: "symptom_state",
    domain: "recovery-sleep",
    description:
      "The person's perceived tiredness, low drive, heaviness, irritability, reduced motivation, or difficulty initiating movement.",
    diagnosticRole: "core",
    appliesTo: ["fat_loss", "body_recomposition", "performance", "obesity", "chronic_illness"],
    observableVia: ["fatigue_rating", "motivation_rating", "mood", "training_readiness"],
    reasoningPurpose:
      "Detects accumulating strain before objective performance or weight trend changes become clear.",
    evidenceLevel: "moderate",
    tags: ["fatigue", "readiness", "motivation", "diet-fatigue"]
  },

  {
    id: "stress_load",
    label: "Stress Load",
    type: "contextual_load",
    domain: "recovery-sleep",
    description:
      "The cumulative psychological, occupational, relational, financial, environmental, and physiological stress affecting the person.",
    diagnosticRole: "core",
    appliesTo: ["fat_loss", "general_health", "obesity", "chronic_illness", "performance"],
    observableVia: [
      "stress_rating",
      "workload",
      "life_events",
      "relationship_stress",
      "caregiving_load",
      "financial_stress"
    ],
    reasoningPurpose:
      "Explains why the same plan may be sustainable for one person but excessive for another.",
    evidenceLevel: "moderate",
    tags: ["stress", "context", "recovery", "psychology"]
  },

  {
    id: "sleep_related_hunger_pressure",
    label: "Sleep-Related Hunger Pressure",
    type: "appetite_driver",
    domain: "recovery-sleep",
    description:
      "Increased hunger, cravings, reward sensitivity, or lower dietary restraint associated with poor or insufficient sleep.",
    diagnosticRole: "supporting",
    appliesTo: ["fat_loss", "obesity", "body_recomposition", "general_health"],
    observableVia: [
      "hunger_rating",
      "craving_frequency",
      "late_night_snacking",
      "high_palatable_food_intake",
      "poor_sleep_nights"
    ],
    reasoningPurpose:
      "Links sleep disruption to adherence difficulty and intake drift.",
    evidenceLevel: "high",
    tags: ["hunger", "cravings", "sleep", "appetite"]
  },

  {
    id: "water_retention_from_stress",
    label: "Water Retention From Stress",
    type: "scale_noise_driver",
    domain: "recovery-sleep",
    description:
      "Temporary increases in body weight from stress, inflammation, poor sleep, soreness, or hormonal fluid shifts rather than fat gain.",
    diagnosticRole: "supporting",
    appliesTo: ["fat_loss", "bodybuilding", "body_recomposition", "general_health"],
    observableVia: [
      "scale_spike",
      "poor_sleep",
      "high_stress",
      "muscle_soreness",
      "menstrual_phase",
      "high_sodium_intake"
    ],
    reasoningPurpose:
      "Prevents misdiagnosing temporary scale increases as failed fat loss.",
    evidenceLevel: "moderate",
    tags: ["water-retention", "scale-noise", "stress", "sleep"]
  },

  {
    id: "training_recovery_status",
    label: "Training Recovery Status",
    type: "performance_state",
    domain: "recovery-sleep",
    description:
      "The degree to which the person is recovered enough to sustain productive training while dieting.",
    diagnosticRole: "core",
    appliesTo: ["fat_loss", "bodybuilding", "performance", "body_recomposition"],
    observableVia: [
      "performance_trend",
      "session_rpe",
      "soreness",
      "joint_pain",
      "motivation",
      "sleep_quality"
    ],
    reasoningPurpose:
      "Determines whether training should be maintained, reduced, redistributed, or progressed.",
    evidenceLevel: "moderate",
    tags: ["training", "recovery", "performance", "fat-loss"]
  },

  {
    id: "recovery_debt",
    label: "Recovery Debt",
    type: "accumulated_state",
    domain: "recovery-sleep",
    description:
      "An accumulated mismatch between total stress load and recovery resources over time.",
    diagnosticRole: "core",
    appliesTo: ["fat_loss", "performance", "bodybuilding", "chronic_illness", "older_adults"],
    observableVia: [
      "persistent_fatigue",
      "sleep_disruption",
      "performance_decline",
      "mood_decline",
      "increased_hunger",
      "reduced_steps"
    ],
    reasoningPurpose:
      "Explains why continued plan pressure can produce worse adherence, lower movement, and poorer outcomes.",
    evidenceLevel: "moderate",
    tags: ["recovery-debt", "fatigue", "stress", "adaptation"]
  },

  {
    id: "circadian_regularity",
    label: "Circadian Regularity",
    type: "recovery_pattern",
    domain: "recovery-sleep",
    description:
      "The consistency of sleep timing, wake timing, meal timing, light exposure, and daily rhythm.",
    diagnosticRole: "supporting",
    appliesTo: ["fat_loss", "type_2_diabetes", "general_health", "performance"],
    observableVia: [
      "bedtime_variability",
      "wake_time_variability",
      "shift_work",
      "late_meals",
      "morning_light_exposure"
    ],
    reasoningPurpose:
      "Identifies rhythm disruption that may affect appetite, glucose regulation, energy, and adherence.",
    evidenceLevel: "moderate",
    tags: ["circadian", "sleep-timing", "routine", "metabolic-health"]
  },

  {
    id: "sleep_disordered_breathing_risk",
    label: "Sleep Disordered Breathing Risk",
    type: "medical_risk_signal",
    domain: "recovery-sleep",
    description:
      "Risk indicators for obstructive sleep apnoea or related sleep breathing problems that may impair recovery, energy, appetite, and cardiometabolic health.",
    diagnosticRole: "risk_flag",
    appliesTo: ["obesity", "general_health", "type_2_diabetes", "older_adults", "chronic_illness"],
    observableVia: [
      "snoring",
      "witnessed_apnoea",
      "morning_headaches",
      "daytime_sleepiness",
      "high_neck_circumference",
      "high_bmi"
    ],
    reasoningPurpose:
      "Flags when sleep problems may require medical assessment rather than simple habit advice.",
    evidenceLevel: "high",
    tags: ["sleep-apnoea", "medical-risk", "snoring", "recovery"]
  }
];
