export const hormonesLifeStageEdges = [
  {
    source: "hormones_life_stage_context",
    target: "risk_adjusted_recommendations",
    relationship: "modifies",
    strength: "high",
    direction: "contextual",
    explanation:
      "Age, sex, reproductive status, and hormonal context can change which fat-loss recommendations are appropriate or safe.",
    diagnosticUse:
      "Ensures the graph does not use a single adult default for all populations."
  },

  {
    source: "menstrual_cycle_context",
    target: "menstrual_cycle_fluid_shift",
    relationship: "explains",
    strength: "high",
    direction: "positive",
    explanation:
      "Menstrual-cycle phase can explain predictable changes in fluid retention, bloating, cravings, and scale weight.",
    diagnosticUse:
      "Prevents unnecessary calorie reductions based on cycle-related scale changes."
  },

  {
    source: "menstrual_cycle_context",
    target: "hunger_pressure",
    relationship: "may_increase",
    strength: "moderate",
    direction: "positive",
    explanation:
      "Some people experience higher hunger or cravings during specific cycle phases.",
    diagnosticUse:
      "Supports phase-aware appetite and adherence interpretation."
  },

  {
    source: "menopause_context",
    target: "sleep_quality",
    relationship: "may_reduce",
    strength: "moderate",
    direction: "negative",
    explanation:
      "Menopause-related symptoms may disrupt sleep quality and recovery.",
    diagnosticUse:
      "Links life-stage context to recovery and appetite pressure."
  },

  {
    source: "menopause_context",
    target: "body_fat_level_context",
    relationship: "modifies",
    strength: "moderate",
    direction: "contextual",
    explanation:
      "Menopause may change fat distribution, health-risk context, and interpretation of waist changes.",
    diagnosticUse:
      "Supports more precise health and body-composition reasoning."
  },

  {
    source: "puberty_growth_context",
    target: "risk_adjusted_recommendations",
    relationship: "requires_conservative_modification",
    strength: "high",
    direction: "safety",
    explanation:
      "Young people require growth-aware, clinically cautious recommendations rather than adult-style aggressive dieting.",
    diagnosticUse:
      "Prevents unsafe restriction, excessive tracking, or body-image harm."
  },

  {
    source: "age_related_body_composition_shift",
    target: "sarcopenia_risk",
    relationship: "increases_relevance_of",
    strength: "high",
    direction: "contextual",
    explanation:
      "Ageing increases the importance of preserving muscle, strength, and function during fat loss.",
    diagnosticUse:
      "Supports higher priority for protein, resistance training, and slower rates of loss."
  },

  {
    source: "age_related_body_composition_shift",
    target: "rate_of_weight_loss",
    relationship: "modifies_target_for",
    strength: "moderate",
    direction: "contextual",
    explanation:
      "Older adults may need more conservative rates of loss to protect lean mass, function, and recovery.",
    diagnosticUse:
      "Personalises rate-of-loss targets."
  },

  {
    source: "thyroid_risk_signal",
    target: "medication_medical_review",
    relationship: "may_require",
    strength: "high",
    direction: "safety",
    explanation:
      "Potential thyroid-related symptoms or lab concerns should be interpreted clinically rather than handled by lifestyle logic alone.",
    diagnosticUse:
      "Prevents over-diagnosis while flagging appropriate medical review."
  },

  {
    source: "sex_specific_fat_distribution",
    target: "waist_measurement_quality",
    relationship: "modifies_interpretation_of",
    strength: "moderate",
    direction: "contextual",
    explanation:
      "Fat distribution patterns affect how waist and visual changes should be interpreted.",
    diagnosticUse:
      "Improves body-composition and health-risk interpretation."
  },

  {
    source: "reproductive_health_context",
    target: "glucose_insulin_regulation",
    relationship: "may_modify",
    strength: "moderate",
    direction: "contextual",
    explanation:
      "Some reproductive-health contexts, such as PCOS, may influence insulin resistance and glucose regulation.",
    diagnosticUse:
      "Creates a bridge between reproductive context and metabolic-health reasoning."
  },

  {
    source: "reproductive_health_context",
    target: "medication_medical_review",
    relationship: "may_require",
    strength: "moderate",
    direction: "safety",
    explanation:
      "Reproductive-health concerns may require clinical review, especially with irregular cycles, fertility treatment, pregnancy, or postpartum status.",
    diagnosticUse:
      "Keeps recommendations referral-aware."
  },

  {
    source: "hormonal_fluid_shift",
    target: "scale_weight_variability",
    relationship: "increases",
    strength: "moderate",
    direction: "positive",
    explanation:
      "Hormonal fluid shifts can temporarily increase scale-weight variability without reflecting fat gain.",
    diagnosticUse:
      "Adds hormonal context to measurement-noise interpretation."
  },

  {
    source: "life_stage_recovery_capacity",
    target: "training_volume_tolerance",
    relationship: "modifies",
    strength: "high",
    direction: "contextual",
    explanation:
      "Life stage can influence how much training volume can be tolerated and recovered from.",
    diagnosticUse:
      "Adapts exercise recommendations for youth, older adults, menopause, chronic illness, and high-stress contexts."
  },

  {
    source: "life_stage_recovery_capacity",
    target: "deficit_magnitude",
    relationship: "modifies_safe_range_for",
    strength: "high",
    direction: "safety",
    explanation:
      "Life-stage recovery context should modify how aggressive a calorie deficit can safely be.",
    diagnosticUse:
      "Prevents excessive restriction in vulnerable populations."
  }
];
