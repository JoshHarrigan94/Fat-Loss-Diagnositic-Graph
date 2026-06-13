export const bodyCompositionEdges = [
  {
    source: "weekly_energy_deficit",
    target: "fat_mass_change",
    relationship: "drives",
    strength: "high",
    direction: "positive",
    explanation:
      "A sustained weekly energy deficit is the primary driver of fat mass reduction.",
    diagnosticUse:
      "Links energy-balance reasoning to body-composition outcomes."
  },

  {
    source: "fat_mass_change",
    target: "body_composition_outcome",
    relationship: "contributes_to",
    strength: "high",
    direction: "positive",
    explanation:
      "Fat mass change is a major component of overall body-composition change.",
    diagnosticUse:
      "Helps distinguish fat loss from total weight loss."
  },

  {
    source: "lean_mass_retention",
    target: "body_composition_outcome",
    relationship: "improves_quality_of",
    strength: "high",
    direction: "positive",
    explanation:
      "Preserving lean mass improves the quality of weight loss, appearance, performance, and long-term function.",
    diagnosticUse:
      "Prevents over-prioritising scale loss at the expense of muscle retention."
  },

  {
    source: "protein_adequacy",
    target: "lean_mass_retention",
    relationship: "supports",
    strength: "high",
    direction: "positive",
    explanation:
      "Adequate protein supports lean mass retention during energy restriction.",
    diagnosticUse:
      "Protein should be assessed before interpreting weight loss quality."
  },

  {
    source: "training_recovery_status",
    target: "lean_mass_retention",
    relationship: "supports_or_limits",
    strength: "moderate",
    direction: "contextual",
    explanation:
      "Recoverable resistance training supports lean mass retention, while poor recovery can limit training quality.",
    diagnosticUse:
      "Links recovery-sleep and exercise-training logic to muscle retention."
  },

  {
    source: "rate_of_weight_loss",
    target: "lean_mass_retention",
    relationship: "modifies_risk_to",
    strength: "high",
    direction: "contextual",
    explanation:
      "Faster weight loss may increase lean mass loss risk, especially in leaner, older, or under-recovered individuals.",
    diagnosticUse:
      "Guides whether the deficit should be reduced or protein/training increased."
  },

  {
    source: "deficit_magnitude",
    target: "rate_of_weight_loss",
    relationship: "increases",
    strength: "high",
    direction: "positive",
    explanation:
      "Larger sustained deficits generally produce faster weight loss.",
    diagnosticUse:
      "Links diet dose to observed outcome rate."
  },

  {
    source: "body_composition_measurement_quality",
    target: "body_composition_outcome",
    relationship: "improves_confidence_in",
    strength: "high",
    direction: "positive",
    explanation:
      "Better measurement methods and protocols increase confidence in body-composition interpretation.",
    diagnosticUse:
      "Prevents over-interpreting noisy BIA, inconsistent photos, or poorly controlled measurements."
  },

  {
    source: "recomposition_likelihood",
    target: "weight_trend_confidence",
    relationship: "modifies_interpretation_of",
    strength: "moderate",
    direction: "contextual",
    explanation:
      "When recomposition is likely, stable scale weight may still coexist with fat loss and muscle gain.",
    diagnosticUse:
      "Prevents false plateau diagnosis in new lifters, higher-body-fat individuals, or returning trainees."
  },

  {
    source: "muscle_gain_potential",
    target: "recomposition_likelihood",
    relationship: "increases",
    strength: "moderate",
    direction: "positive",
    explanation:
      "Higher muscle gain potential increases the chance of recomposition during a deficit or maintenance phase.",
    diagnosticUse:
      "Supports different interpretation for beginners, detrained people, and higher-body-fat populations."
  },

  {
    source: "body_fat_level_context",
    target: "rate_of_weight_loss",
    relationship: "modifies_target_for",
    strength: "moderate",
    direction: "contextual",
    explanation:
      "Higher body fat may allow a faster safe rate of loss, while leaner individuals often require more conservative rates.",
    diagnosticUse:
      "Personalises rate-of-loss recommendations."
  },

  {
    source: "visual_leanness_signal",
    target: "body_composition_outcome",
    relationship: "supports_interpretation_of",
    strength: "low",
    direction: "positive",
    explanation:
      "Visual changes can support body-composition interpretation but are affected by lighting, posing, pump, posture, and water retention.",
    diagnosticUse:
      "Useful as secondary evidence, not as the sole decision basis."
  },

  {
    source: "sarcopenia_risk",
    target: "risk_adjusted_recommendations",
    relationship: "requires_conservative_modification",
    strength: "high",
    direction: "safety",
    explanation:
      "People at higher sarcopenia risk need recommendations that prioritise protein, resistance training, function, and slower weight loss.",
    diagnosticUse:
      "Prevents aggressive fat-loss recommendations that could impair muscle and function."
  },

  {
    source: "sarcopenia_risk",
    target: "lean_mass_retention",
    relationship: "increases_importance_of",
    strength: "high",
    direction: "contextual",
    explanation:
      "When sarcopenia risk is high, lean mass retention becomes a primary safety and outcome priority.",
    diagnosticUse:
      "Important for older adults, chronic illness, and low-strength populations."
  }
];
