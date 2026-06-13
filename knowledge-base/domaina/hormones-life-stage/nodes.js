export const hormonesLifeStageNodes = [
  {
    id: "hormones_life_stage_context",
    label: "Hormones & Life Stage Context",
    type: "contextual_modifier",
    domain: "hormones-life-stage",
    description:
      "The person's relevant hormonal, reproductive, age-related, and life-stage context that may modify fat-loss expectations, safety, measurement interpretation, appetite, recovery, and intervention design.",
    diagnosticRole: "core",
    appliesTo: ["fat_loss", "obesity", "body_recomposition", "general_health", "youth", "older_adults"],
    observableVia: [
      "age",
      "sex",
      "puberty_status",
      "menstrual_cycle_status",
      "menopause_status",
      "pregnancy_postpartum_context",
      "known_endocrine_conditions"
    ],
    reasoningPurpose:
      "Ensures fat-loss recommendations are population-aware and life-stage appropriate.",
    evidenceLevel: "high",
    tags: ["hormones", "life-stage", "age", "sex", "population-aware"]
  },

  {
    id: "menstrual_cycle_context",
    label: "Menstrual Cycle Context",
    type: "life_stage_modifier",
    domain: "hormones-life-stage",
    description:
      "The influence of menstrual-cycle phase, cycle regularity, symptoms, cravings, bloating, performance changes, and fluid shifts on fat-loss interpretation.",
    diagnosticRole: "supporting",
    appliesTo: ["fat_loss", "body_recomposition", "bodybuilding", "general_health"],
    observableVia: [
      "cycle_phase",
      "cycle_regularitу",
      "premenstrual_symptoms",
      "bloating",
      "cravings",
      "cycle_related_weight_change"
    ],
    reasoningPurpose:
      "Prevents cycle-related water, hunger, and performance changes from being misread as fat-loss failure.",
    evidenceLevel: "moderate",
    tags: ["menstrual-cycle", "fluid-shift", "cravings", "measurement-noise"]
  },

  {
    id: "menopause_context",
    label: "Menopause Context",
    type: "life_stage_modifier",
    domain: "hormones-life-stage",
    description:
      "The influence of perimenopause, menopause, and postmenopause on body composition, sleep, appetite, fat distribution, training tolerance, and cardiometabolic risk.",
    diagnosticRole: "core",
    appliesTo: ["fat_loss", "obesity", "general_health", "older_adults"],
    observableVia: [
      "menopause_status",
      "hot_flushes",
      "sleep_disruption",
      "waist_change",
      "cycle_changes",
      "mood_changes"
    ],
    reasoningPurpose:
      "Adapts recommendations where sleep, recovery, body-composition risk, and health priorities change around menopause.",
    evidenceLevel: "moderate",
    tags: ["menopause", "perimenopause", "sleep", "body-composition"]
  },

  {
    id: "puberty_growth_context",
    label: "Puberty & Growth Context",
    type: "life_stage_modifier",
    domain: "hormones-life-stage",
    description:
      "The developmental context of children and adolescents where growth, maturation, energy needs, body image, parental environment, and clinical oversight are central.",
    diagnosticRole: "risk_flag",
    appliesTo: ["youth", "obesity", "general_health", "performance"],
    observableVia: [
      "age",
      "growth_status",
      "puberty_stage",
      "parental_involvement",
      "sport_training_load",
      "body_image_concerns"
    ],
    reasoningPurpose:
      "Prevents adult-style aggressive fat-loss logic from being applied to young people.",
    evidenceLevel: "high",
    tags: ["youth", "puberty", "growth", "safety"]
  },

  {
    id: "age_related_body_composition_shift",
    label: "Age-Related Body Composition Shift",
    type: "life_stage_modifier",
    domain: "hormones-life-stage",
    description:
      "Changes in muscle mass, fat distribution, bone health, recovery, activity, and energy expenditure associated with ageing.",
    diagnosticRole: "core",
    appliesTo: ["older_adults", "fat_loss", "obesity", "general_health", "chronic_illness"],
    observableVia: [
      "age",
      "strength_level",
      "lean_mass_estimate",
      "waist_circumference",
      "activity_level",
      "mobility_status"
    ],
    reasoningPurpose:
      "Prioritises muscle, function, protein, resistance training, and conservative rate of loss in older adults.",
    evidenceLevel: "high",
    tags: ["ageing", "muscle", "sarcopenia", "older-adults"]
  },

  {
    id: "thyroid_risk_signal",
    label: "Thyroid Risk Signal",
    type: "medical_risk_signal",
    domain: "hormones-life-stage",
    description:
      "Symptoms, history, or lab context suggesting thyroid status may need clinical interpretation when weight, fatigue, temperature tolerance, or energy changes are unusual.",
    diagnosticRole: "risk_flag",
    appliesTo: ["fat_loss", "obesity", "general_health", "chronic_illness"],
    observableVia: [
      "diagnosed_thyroid_condition",
      "thyroid_medication",
      "unexplained_fatigue",
      "cold_intolerance",
      "heat_intolerance",
      "unexpected_weight_change",
      "clinical_labs"
    ],
    reasoningPurpose:
      "Flags possible endocrine context without diagnosing or replacing medical review.",
    evidenceLevel: "moderate",
    tags: ["thyroid", "endocrine", "medical-review", "fatigue"]
  },

  {
    id: "sex_specific_fat_distribution",
    label: "Sex-Specific Fat Distribution",
    type: "contextual_modifier",
    domain: "hormones-life-stage",
    description:
      "Differences in typical fat distribution patterns, including abdominal, hip, thigh, visceral, and subcutaneous fat storage tendencies.",
    diagnosticRole: "supporting",
    appliesTo: ["fat_loss", "obesity", "body_recomposition", "general_health"],
    observableVia: [
      "sex",
      "waist_circumference",
      "hip_circumference",
      "waist_to_height_ratio",
      "visual_fat_distribution",
      "health_risk_markers"
    ],
    reasoningPurpose:
      "Improves interpretation of waist, health risk, visual change, and fat-loss expectations.",
    evidenceLevel: "moderate",
    tags: ["sex-differences", "fat-distribution", "waist", "health-risk"]
  },

  {
    id: "reproductive_health_context",
    label: "Reproductive Health Context",
    type: "clinical_context",
    domain: "hormones-life-stage",
    description:
      "Relevant reproductive health context such as PCOS, fertility treatment, menstrual irregularity, hormonal contraception, pregnancy, postpartum, or breastfeeding.",
    diagnosticRole: "risk_flag",
    appliesTo: ["fat_loss", "obesity", "general_health", "chronic_illness"],
    observableVia: [
      "pcos_diagnosis",
      "cycle_irregularity",
      "hormonal_contraception",
      "fertility_treatment",
      "pregnancy_postpartum_context",
      "breastfeeding_status"
    ],
    reasoningPurpose:
      "Ensures reproductive-health factors modify safety, glucose, appetite, and medical review pathways.",
    evidenceLevel: "moderate",
    tags: ["reproductive-health", "PCOS", "contraception", "clinical-context"]
  },

  {
    id: "hormonal_fluid_shift",
    label: "Hormonal Fluid Shift",
    type: "scale_noise_driver",
    domain: "hormones-life-stage",
    description:
      "Temporary body-water shifts influenced by menstrual cycle, menopause-related changes, stress hormones, medication, or endocrine context.",
    diagnosticRole: "supporting",
    appliesTo: ["fat_loss", "body_recomposition", "bodybuilding", "general_health"],
    observableVia: [
      "cycle_phase",
      "premenstrual_bloating",
      "scale_spike",
      "sleep_disruption",
      "stress_load",
      "medication_context"
    ],
    reasoningPurpose:
      "Adds hormonal context to scale-weight interpretation.",
    evidenceLevel: "moderate",
    tags: ["fluid-shift", "hormones", "scale-noise", "water-retention"]
  },

  {
    id: "life_stage_recovery_capacity",
    label: "Life-Stage Recovery Capacity",
    type: "capacity_modifier",
    domain: "hormones-life-stage",
    description:
      "The way age, growth, menopause, reproductive status, chronic illness, or hormonal context modifies recovery from dieting, exercise, sleep disruption, and stress.",
    diagnosticRole: "core",
    appliesTo: ["fat_loss", "older_adults", "youth", "chronic_illness", "performance"],
    observableVia: [
      "age",
      "sleep_quality",
      "training_recovery_status",
      "menopause_status",
      "growth_status",
      "clinical_context",
      "fatigue"
    ],
    reasoningPurpose:
      "Adapts diet and training intensity to the person's current recovery context.",
    evidenceLevel: "moderate",
    tags: ["recovery", "life-stage", "training-tolerance", "safety"]
  }
];
