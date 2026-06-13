export const glucoseInsulinEdges = [
  {
    source: "fat_mass_change",
    target: "weight_loss_glucose_benefit",
    relationship: "drives",
    strength: "high",
    direction: "positive",
    explanation:
      "Reducing fat mass, especially around the waist and organs, can improve glucose regulation and insulin sensitivity.",
    diagnosticUse:
      "Connects fat-loss outcomes to type 2 diabetes and metabolic-health benefits."
  },

  {
    source: "weight_loss_glucose_benefit",
    target: "glucose_insulin_regulation",
    relationship: "supports",
    strength: "high",
    direction: "positive",
    explanation:
      "Successful fat loss can improve glucose and insulin regulation in many people with obesity or insulin resistance.",
    diagnosticUse:
      "Helps the graph prioritise fat loss as a metabolic-health intervention where appropriate."
  },

  {
    source: "insulin_sensitivity",
    target: "glucose_insulin_regulation",
    relationship: "supports",
    strength: "high",
    direction: "positive",
    explanation:
      "Higher insulin sensitivity improves glucose uptake and blood glucose control.",
    diagnosticUse:
      "Central node for interpreting metabolic-health status."
  },

  {
    source: "muscle_glucose_sink",
    target: "insulin_sensitivity",
    relationship: "supports",
    strength: "high",
    direction: "positive",
    explanation:
      "More active and better-trained skeletal muscle improves glucose disposal and insulin sensitivity.",
    diagnosticUse:
      "Links resistance training, cardio, and lean mass retention to glucose control."
  },

  {
    source: "resistance_training_quality",
    target: "muscle_glucose_sink",
    relationship: "supports",
    strength: "high",
    direction: "positive",
    explanation:
      "Resistance training helps preserve or increase muscle, improving the body's capacity to store and use glucose.",
    diagnosticUse:
      "Supports resistance training as a metabolic-health intervention."
  },

  {
    source: "cardio_training_dose",
    target: "insulin_sensitivity",
    relationship: "supports",
    strength: "high",
    direction: "positive",
    explanation:
      "Cardiovascular training can improve insulin sensitivity and glucose handling.",
    diagnosticUse:
      "Useful for type 2 diabetes and metabolic-health recommendations."
  },

  {
    source: "meal_composition_glucose_effect",
    target: "postprandial_glucose_response",
    relationship: "modifies",
    strength: "high",
    direction: "contextual",
    explanation:
      "Protein, fibre, fat, carbohydrate amount, and food processing can alter the size and duration of post-meal glucose rises.",
    diagnosticUse:
      "Supports meal-level glucose intervention logic."
  },

  {
    source: "fibre_adequacy",
    target: "meal_composition_glucose_effect",
    relationship: "supports",
    strength: "high",
    direction: "positive",
    explanation:
      "Adequate fibre can improve meal quality and moderate post-meal glucose response.",
    diagnosticUse:
      "Links nutrition quality to glucose regulation."
  },

  {
    source: "ultra_processed_food_exposure",
    target: "postprandial_glucose_response",
    relationship: "may_worsen",
    strength: "moderate",
    direction: "negative",
    explanation:
      "Highly processed, low-fibre, energy-dense foods may create larger or less stable post-meal glucose responses.",
    diagnosticUse:
      "Supports improving food quality before relying only on medication or restriction."
  },

  {
    source: "activity_timing_for_glucose",
    target: "postprandial_glucose_response",
    relationship: "improves",
    strength: "high",
    direction: "positive",
    explanation:
      "Light movement after meals can improve glucose disposal and reduce post-meal glucose excursions.",
    diagnosticUse:
      "Provides a low-friction intervention for glucose control."
  },

  {
    source: "step_count_consistency",
    target: "activity_timing_for_glucose",
    relationship: "supports",
    strength: "moderate",
    direction: "positive",
    explanation:
      "Consistent walking behaviour makes meal-timed activity easier to implement.",
    diagnosticUse:
      "Links NEAT behaviours to glucose management."
  },

  {
    source: "carbohydrate_tolerance_context",
    target: "risk_adjusted_recommendations",
    relationship: "modifies",
    strength: "moderate",
    direction: "contextual",
    explanation:
      "Carbohydrate recommendations should be adapted to glucose response, activity, medication, preferences, and health status.",
    diagnosticUse:
      "Prevents generic carbohydrate rules."
  },

  {
    source: "hypoglycaemia_risk",
    target: "risk_adjusted_recommendations",
    relationship: "requires_medical_modification",
    strength: "high",
    direction: "safety",
    explanation:
      "People at risk of hypoglycaemia need conservative, medically aware adjustments to diet and exercise.",
    diagnosticUse:
      "Prevents unsafe calorie, carbohydrate, fasting, or exercise recommendations."
  },

  {
    source: "hypoglycaemia_risk",
    target: "medication_medical_review",
    relationship: "requires",
    strength: "high",
    direction: "safety",
    explanation:
      "Hypoglycaemia risk may require review by a qualified healthcare professional, especially when medication or insulin is involved.",
    diagnosticUse:
      "Creates a bridge to the medication-medical domain."
  },

  {
    source: "glycaemic_variability",
    target: "hunger_pressure",
    relationship: "may_increase",
    strength: "moderate",
    direction: "positive",
    explanation:
      "Large glucose swings may be associated with changes in hunger, energy, cravings, or perceived instability.",
    diagnosticUse:
      "Connects glucose patterns to appetite and adherence reasoning."
  }
];
