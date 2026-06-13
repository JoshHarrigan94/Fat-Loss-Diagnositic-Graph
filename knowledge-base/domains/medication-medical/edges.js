export const medicationMedicalEdges = [
  {
    source: "medication_medical_context",
    target: "risk_adjusted_recommendations",
    relationship: "modifies",
    strength: "high",
    direction: "safety",
    explanation:
      "Medical conditions and medications can change which fat-loss strategies are safe, appropriate, or require clinical oversight.",
    diagnosticUse:
      "Ensures the graph does not apply generic recommendations to clinically complex users."
  },

  {
    source: "medication_medical_review",
    target: "risk_adjusted_recommendations",
    relationship: "gates",
    strength: "high",
    direction: "safety_gate",
    explanation:
      "When clinical review is indicated, recommendations should become conservative and referral-aware.",
    diagnosticUse:
      "Prevents unsafe escalation of calorie restriction, fasting, exercise, or supplement advice."
  },

  {
    source: "weight_affecting_medication",
    target: "fat_loss_outcome_confidence",
    relationship: "modifies_interpretation_of",
    strength: "moderate",
    direction: "contextual",
    explanation:
      "Weight-affecting medications can influence appetite, fluid, glucose, fatigue, or body weight, reducing confidence in simple cause-effect interpretations.",
    diagnosticUse:
      "Avoids assuming poor progress is purely behavioural or caloric."
  },

  {
    source: "appetite_affecting_medication",
    target: "appetite_regulation",
    relationship: "modifies",
    strength: "high",
    direction: "contextual",
    explanation:
      "Medication can increase, suppress, or destabilise appetite and meal patterns.",
    diagnosticUse:
      "Important when hunger is unusually high, low, or inconsistent."
  },

  {
    source: "appetite_affecting_medication",
    target: "appetite_suppression_risk",
    relationship: "may_increase",
    strength: "moderate",
    direction: "positive",
    explanation:
      "Some medications suppress appetite, which may increase under-fuelling, missed meals, rebound hunger, or nutrient gaps.",
    diagnosticUse:
      "Prevents interpreting medication-suppressed hunger as automatically beneficial."
  },

  {
    source: "diabetes_medication_context",
    target: "hypoglycaemia_risk",
    relationship: "may_increase",
    strength: "high",
    direction: "positive",
    explanation:
      "Insulin and some glucose-lowering medications can increase hypoglycaemia risk, especially with reduced intake, exercise, alcohol, or missed meals.",
    diagnosticUse:
      "Requires safety-aware handling of calorie, carbohydrate, fasting, and activity changes."
  },

  {
    source: "diabetes_medication_context",
    target: "carbohydrate_tolerance_context",
    relationship: "modifies",
    strength: "high",
    direction: "contextual",
    explanation:
      "Diabetes medication can alter how carbohydrate intake and activity affect glucose control and safety.",
    diagnosticUse:
      "Prevents generic carbohydrate recommendations."
  },

  {
    source: "corticosteroid_exposure",
    target: "water_retention_from_stress",
    relationship: "may_increase",
    strength: "moderate",
    direction: "positive",
    explanation:
      "Corticosteroid exposure may contribute to fluid shifts and scale-weight changes in some contexts.",
    diagnosticUse:
      "Adds medical context to scale-noise interpretation."
  },

  {
    source: "corticosteroid_exposure",
    target: "glucose_insulin_regulation",
    relationship: "may_worsen",
    strength: "moderate",
    direction: "negative",
    explanation:
      "Corticosteroids can affect glucose regulation in some people, especially with systemic exposure.",
    diagnosticUse:
      "Flags the need to interpret glucose and appetite changes in medication context."
  },

  {
    source: "bariatric_surgery_context",
    target: "nutrition_quality",
    relationship: "requires_specialised_modification",
    strength: "high",
    direction: "safety",
    explanation:
      "Post-bariatric nutrition requires specialised attention to protein, micronutrients, meal size, tolerance, and clinical follow-up.",
    diagnosticUse:
      "Prevents standard calorie or macro advice from being applied without safeguards."
  },

  {
    source: "eating_disorder_risk",
    target: "risk_adjusted_recommendations",
    relationship: "requires_specialised_modification",
    strength: "high",
    direction: "safety",
    explanation:
      "Eating disorder risk requires non-triggering, clinically appropriate, and often referral-aware recommendations.",
    diagnosticUse:
      "Prevents intensifying restriction, weigh-in frequency, shame, or compulsive tracking."
  },

  {
    source: "eating_disorder_risk",
    target: "measurement_decision_threshold",
    relationship: "modifies",
    strength: "high",
    direction: "safety",
    explanation:
      "Frequent weighing, calorie tracking, or body checking may be inappropriate where eating disorder risk is high.",
    diagnosticUse:
      "Changes how progress should be monitored."
  },

  {
    source: "pregnancy_postpartum_context",
    target: "risk_adjusted_recommendations",
    relationship: "requires_medical_modification",
    strength: "high",
    direction: "safety",
    explanation:
      "Pregnancy, breastfeeding, and postpartum recovery change energy needs, exercise tolerance, and safety thresholds.",
    diagnosticUse:
      "Prevents inappropriate aggressive fat-loss recommendations."
  },

  {
    source: "red_flag_symptoms",
    target: "medication_medical_review",
    relationship: "requires",
    strength: "high",
    direction: "safety",
    explanation:
      "Red flag symptoms require medical assessment before lifestyle-only reasoning continues.",
    diagnosticUse:
      "Acts as a safety override in the diagnostic engine."
  },

  {
    source: "sleep_disordered_breathing_risk",
    target: "medication_medical_review",
    relationship: "may_require",
    strength: "high",
    direction: "safety",
    explanation:
      "High risk of sleep-disordered breathing may require clinical assessment and treatment.",
    diagnosticUse:
      "Connects sleep-risk flags to medical triage."
  }
];
