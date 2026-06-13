export const measurementNoiseEdges = [
  {
    source: "weigh_in_protocol_quality",
    target: "weight_trend_confidence",
    relationship: "improves",
    strength: "high",
    direction: "positive",
    explanation:
      "Consistent weigh-in conditions reduce measurement error and make weight trends easier to interpret.",
    diagnosticUse:
      "Low protocol quality should reduce confidence in weight-based decisions."
  },

  {
    source: "scale_weight_variability",
    target: "weight_trend_confidence",
    relationship: "reduces",
    strength: "high",
    direction: "negative",
    explanation:
      "Greater short-term variability makes it harder to know whether true tissue change is occurring.",
    diagnosticUse:
      "Encourages longer observation windows before adjusting the plan."
  },

  {
    source: "glycogen_water_shift",
    target: "scale_weight_variability",
    relationship: "increases",
    strength: "high",
    direction: "positive",
    explanation:
      "Changes in carbohydrate intake alter glycogen and water storage, creating rapid weight changes.",
    diagnosticUse:
      "Useful after refeeds, carb reductions, diet breaks, or training-volume changes."
  },

  {
    source: "sodium_water_shift",
    target: "scale_weight_variability",
    relationship: "increases",
    strength: "moderate",
    direction: "positive",
    explanation:
      "Higher or inconsistent sodium intake can temporarily increase water retention.",
    diagnosticUse:
      "Explains short-term scale spikes after restaurant meals or processed foods."
  },

  {
    source: "digestive_content_shift",
    target: "scale_weight_variability",
    relationship: "increases",
    strength: "moderate",
    direction: "positive",
    explanation:
      "Food volume, fibre, bowel contents, and gut transit changes can alter scale weight independent of fat mass.",
    diagnosticUse:
      "Useful when gut symptoms or meal timing explain unusual scale readings."
  },

  {
    source: "training_inflammation_shift",
    target: "scale_weight_variability",
    relationship: "increases",
    strength: "moderate",
    direction: "positive",
    explanation:
      "Hard or novel training can increase water retention through muscle damage and inflammation.",
    diagnosticUse:
      "Prevents misclassifying post-training weight increases as fat gain."
  },

  {
    source: "menstrual_cycle_fluid_shift",
    target: "scale_weight_variability",
    relationship: "increases",
    strength: "moderate",
    direction: "positive",
    explanation:
      "Menstrual-cycle phase can meaningfully affect water retention, bloating, appetite, and scale weight.",
    diagnosticUse:
      "Allows cycle-aware trend comparison and prevents inappropriate calorie reductions."
  },

  {
    source: "water_retention_from_stress",
    target: "scale_weight_variability",
    relationship: "increases",
    strength: "moderate",
    direction: "positive",
    explanation:
      "Stress, poor sleep, and soreness can produce temporary water retention.",
    diagnosticUse:
      "Links recovery-sleep signals to scale interpretation."
  },

  {
    source: "waist_measurement_quality",
    target: "measurement_noise_interpretation",
    relationship: "improves",
    strength: "moderate",
    direction: "positive",
    explanation:
      "Reliable waist measurements provide additional context when body weight is noisy.",
    diagnosticUse:
      "Useful when scale weight stalls but waist measurements continue to improve."
  },

  {
    source: "photo_comparison_quality",
    target: "measurement_noise_interpretation",
    relationship: "improves",
    strength: "low",
    direction: "positive",
    explanation:
      "Consistent photo conditions can support visual progress assessment, though photos remain less objective than weight or waist trends.",
    diagnosticUse:
      "Helpful as secondary evidence in recomposition or bodybuilding contexts."
  },

  {
    source: "weight_trend_confidence",
    target: "measurement_decision_threshold",
    relationship: "informs",
    strength: "high",
    direction: "positive",
    explanation:
      "Higher confidence in the weight trend allows faster and more reliable plan adjustments.",
    diagnosticUse:
      "Determines whether to change calories, activity, or continue monitoring."
  },

  {
    source: "measurement_decision_threshold",
    target: "risk_adjusted_recommendations",
    relationship: "gates",
    strength: "high",
    direction: "decision_gate",
    explanation:
      "Plan changes should only occur when measurement confidence and adherence confidence are sufficient.",
    diagnosticUse:
      "Prevents unnecessary intervention escalation."
  },

  {
    source: "measurement_noise_interpretation",
    target: "fat_loss_outcome_confidence",
    relationship: "increases",
    strength: "high",
    direction: "positive",
    explanation:
      "Better noise interpretation improves confidence that observed outcomes reflect real fat-loss progress.",
    diagnosticUse:
      "Separates true plateaus from temporary noise."
  },

  {
    source: "calorie_tracking_accuracy",
    target: "measurement_decision_threshold",
    relationship: "modifies",
    strength: "high",
    direction: "contextual",
    explanation:
      "Low intake-tracking confidence should raise the threshold for changing calories or diagnosing metabolic adaptation.",
    diagnosticUse:
      "Requires behavioural evidence before physiological assumptions."
  },

  {
    source: "step_count_consistency",
    target: "measurement_decision_threshold",
    relationship: "modifies",
    strength: "moderate",
    direction: "contextual",
    explanation:
      "Inconsistent activity reduces confidence that weight changes reflect only intake or physiology.",
    diagnosticUse:
      "Prevents calorie changes when activity drift may explain the outcome."
  }
];