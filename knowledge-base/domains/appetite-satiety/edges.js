export const appetiteSatietyEdges = [
  {
    source: "protein_adequacy",
    target: "satiety_response",
    relationship: "supports",
    strength: "high",
    direction: "positive",
    explanation:
      "Adequate protein generally improves meal satiety and helps reduce hunger during fat loss.",
    diagnosticUse:
      "Low protein should be addressed before assuming the calorie target is unsustainable."
  },

  {
    source: "fibre_adequacy",
    target: "satiety_response",
    relationship: "supports",
    strength: "high",
    direction: "positive",
    explanation:
      "Fibre-rich foods often increase fullness and delay return of hunger.",
    diagnosticUse:
      "Low fibre can explain hunger even when calories are not extremely low."
  },

  {
    source: "food_volume_satiety",
    target: "satiety_response",
    relationship: "supports",
    strength: "high",
    direction: "positive",
    explanation:
      "Higher-volume, lower-energy-density meals improve fullness at a given calorie level.",
    diagnosticUse:
      "Supports changing food choices before reducing calories further."
  },

  {
    source: "sleep_related_hunger_pressure",
    target: "hunger_pressure",
    relationship: "increases",
    strength: "high",
    direction: "positive",
    explanation:
      "Poor or insufficient sleep can increase hunger, cravings, and reward-seeking eating.",
    diagnosticUse:
      "Suggests sleep correction may improve dietary adherence."
  },

  {
    source: "stress_load",
    target: "reward_driven_eating",
    relationship: "increases",
    strength: "moderate",
    direction: "positive",
    explanation:
      "Higher stress can increase eating for comfort, regulation, distraction, or reward.",
    diagnosticUse:
      "Separates emotional or stress-driven eating from simple hunger."
  },

  {
    source: "ultra_processed_food_exposure",
    target: "palatability_exposure",
    relationship: "increases",
    strength: "high",
    direction: "positive",
    explanation:
      "Ultra-processed food exposure often increases access to energy-dense, highly palatable foods.",
    diagnosticUse:
      "Links nutrition quality to appetite dysregulation."
  },

  {
    source: "palatability_exposure",
    target: "reward_driven_eating",
    relationship: "increases",
    strength: "high",
    direction: "positive",
    explanation:
      "High-reward foods increase the likelihood of eating beyond physiological hunger.",
    diagnosticUse:
      "Supports food environment interventions rather than willpower-based advice."
  },

  {
    source: "reward_driven_eating",
    target: "calorie_tracking_accuracy",
    relationship: "reduces",
    strength: "moderate",
    direction: "negative",
    explanation:
      "Reward-driven eating often occurs impulsively or outside planned meals, making it easier to under-track.",
    diagnosticUse:
      "Explains hidden intake when food logs appear clean but outcomes disagree."
  },

  {
    source: "early_day_underfeeding",
    target: "craving_intensity",
    relationship: "increases",
    strength: "moderate",
    direction: "positive",
    explanation:
      "Under-eating earlier in the day can increase late-day cravings and overeating risk.",
    diagnosticUse:
      "Useful when adherence repeatedly collapses in the evening."
  },

  {
    source: "meal_satisfaction",
    target: "adherence_consistency",
    relationship: "supports",
    strength: "moderate",
    direction: "positive",
    explanation:
      "Meals that feel satisfying are easier to repeat consistently.",
    diagnosticUse:
      "Prevents overly clinical meal plans from undermining adherence."
  },

  {
    source: "dietary_restriction_risk",
    target: "craving_intensity",
    relationship: "increases",
    strength: "moderate",
    direction: "positive",
    explanation:
      "Rigid restriction can increase cravings for excluded or forbidden foods.",
    diagnosticUse:
      "Explains rebound eating after strict dieting rules."
  },

  {
    source: "deficit_aggressiveness",
    target: "hunger_pressure",
    relationship: "increases",
    strength: "high",
    direction: "positive",
    explanation:
      "Larger deficits usually increase hunger pressure and reduce tolerance over time.",
    diagnosticUse:
      "Helps decide whether to reduce deficit size or improve satiety architecture."
  },

  {
    source: "hunger_pressure",
    target: "adherence_consistency",
    relationship: "reduces",
    strength: "high",
    direction: "negative",
    explanation:
      "Higher hunger pressure makes consistent execution harder.",
    diagnosticUse:
      "Frames hunger as a system pressure, not a willpower defect."
  },

  {
    source: "appetite_suppression_risk",
    target: "nutrition_quality",
    relationship: "may_reduce",
    strength: "moderate",
    direction: "negative",
    explanation:
      "Suppressed appetite can reduce total food intake and make it harder to meet protein, fibre, and micronutrient needs.",
    diagnosticUse:
      "Important for stimulant medication, illness, high stress, or aggressive dieting."
  },

  {
    source: "appetite_regulation",
    target: "risk_adjusted_recommendations",
    relationship: "modifies",
    strength: "high",
    direction: "contextual",
    explanation:
      "Recommendations should change depending on whether appetite is stable, suppressed, excessive, reward-driven, or stress-driven.",
    diagnosticUse:
      "Supports personalised intervention sequencing."
  }
];