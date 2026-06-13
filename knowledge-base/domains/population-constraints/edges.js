export const populationConstraintsEdges = [
  {
    source: "population_obesity",
    target: "priority_fat_loss",
    relationship: "increases",
    strength: "high",
    direction: "positive",
    explanation:
      "In obesity contexts, reducing fat mass may carry higher health urgency and metabolic benefit.",
    diagnosticUse:
      "Allows fat loss to be weighted strongly while still checking medical, psychological, and functional risks."
  },

  {
    source: "population_obesity",
    target: "priority_glucose_control",
    relationship: "may_increase",
    strength: "moderate",
    direction: "positive",
    explanation:
      "Obesity can increase the relevance of glucose and cardiometabolic outcomes.",
    diagnosticUse:
      "Raises metabolic-health reasoning where insulin resistance or type 2 diabetes risk is present."
  },

  {
    source: "population_lean",
    target: "priority_lean_mass_retention",
    relationship: "increases",
    strength: "high",
    direction: "positive",
    explanation:
      "Leaner people have less buffer for aggressive weight loss and greater relative risk of lean mass loss.",
    diagnosticUse:
      "Restricts deficit size and prioritises resistance training, protein, and recovery."
  },

  {
    source: "population_lean",
    target: "diet_fatigue_risk",
    relationship: "increases",
    strength: "moderate",
    direction: "positive",
    explanation:
      "Leaner individuals often experience stronger hunger and diet fatigue at a given deficit.",
    diagnosticUse:
      "Supports shorter, more conservative fat-loss phases."
  },

  {
    source: "population_older_adult",
    target: "priority_functional_independence",
    relationship: "increases",
    strength: "high",
    direction: "positive",
    explanation:
      "Older adults require protection of strength, mobility, independence, and fall resilience.",
    diagnosticUse:
      "Prevents scale weight from becoming the only success metric."
  },

  {
    source: "population_older_adult",
    target: "priority_lean_mass_retention",
    relationship: "increases",
    strength: "high",
    direction: "positive",
    explanation:
      "Muscle retention is especially important in older adults due to sarcopenia and functional decline risk.",
    diagnosticUse:
      "Raises priority for protein, resistance training, and conservative weight-loss rates."
  },

  {
    source: "population_youth",
    target: "constraint_growth_requirement",
    relationship: "increases",
    strength: "high",
    direction: "safety",
    explanation:
      "Youth populations have growth and maturation needs that restrict adult-style dieting logic.",
    diagnosticUse:
      "Prevents aggressive deficits and appearance-led tracking systems."
  },

  {
    source: "population_youth",
    target: "priority_psychological_safety",
    relationship: "increases",
    strength: "high",
    direction: "safety",
    explanation:
      "Young people are more vulnerable to body-image harm, shame, and disordered eating patterns.",
    diagnosticUse:
      "Modifies monitoring, language, restriction, and intervention design."
  },

  {
    source: "population_type2_diabetes",
    target: "priority_glucose_control",
    relationship: "increases",
    strength: "high",
    direction: "positive",
    explanation:
      "Type 2 diabetes requires glucose regulation to become a primary outcome priority.",
    diagnosticUse:
      "Weights meal composition, activity timing, medication safety, and weight-loss metabolic benefits."
  },

  {
    source: "population_type2_diabetes",
    target: "constraint_high_medical_risk",
    relationship: "may_increase",
    strength: "high",
    direction: "safety",
    explanation:
      "Medication use, hypoglycaemia risk, complications, or comorbidities may require clinical oversight.",
    diagnosticUse:
      "Routes recommendations through safety and medication review logic."
  },

  {
    source: "population_bodybuilder",
    target: "priority_lean_mass_retention",
    relationship: "increases",
    strength: "high",
    direction: "positive",
    explanation:
      "Bodybuilders prioritise preserving muscle and physique quality during fat loss.",
    diagnosticUse:
      "Biases recommendations toward conservative rates of loss, high protein, resistance training quality, and recovery."
  },

  {
    source: "population_bodybuilder",
    target: "priority_performance",
    relationship: "increases",
    strength: "moderate",
    direction: "positive",
    explanation:
      "Training performance is often a key proxy for muscle retention and contest-prep quality.",
    diagnosticUse:
      "Prevents unnecessary performance collapse during cutting phases."
  },

  {
    source: "population_chronic_illness",
    target: "constraint_low_recovery_capacity",
    relationship: "may_increase",
    strength: "high",
    direction: "contextual",
    explanation:
      "Chronic illness can reduce recovery capacity and tolerance for aggressive diet or exercise interventions.",
    diagnosticUse:
      "Favours staged, lower-friction, medically aware strategies."
  },

  {
    source: "population_chronic_illness",
    target: "constraint_high_medical_risk",
    relationship: "may_increase",
    strength: "high",
    direction: "safety",
    explanation:
      "Chronic illness may require medical supervision or contraindication-aware recommendations.",
    diagnosticUse:
      "Routes through risk-management and medical review nodes."
  },

  {
    source: "population_performance_athlete",
    target: "priority_performance",
    relationship: "increases",
    strength: "high",
    direction: "positive",
    explanation:
      "Athletes often need fat-loss strategies that preserve training output and competition readiness.",
    diagnosticUse:
      "Limits aggressive deficits during high training load or competition phases."
  },

  {
    source: "constraint_low_recovery_capacity",
    target: "deficit_magnitude",
    relationship: "restricts",
    strength: "high",
    direction: "negative",
    explanation:
      "Low recovery capacity reduces tolerance for large deficits.",
    diagnosticUse:
      "Forces more conservative calorie reduction or better recovery sequencing."
  },

  {
    source: "constraint_low_recovery_capacity",
    target: "training_volume_tolerance",
    relationship: "reduces",
    strength: "high",
    direction: "negative",
    explanation:
      "Lower recovery capacity reduces the amount of training that can be productively tolerated.",
    diagnosticUse:
      "Prevents adding exercise when recovery is already constrained."
  },

  {
    source: "constraint_high_medical_risk",
    target: "medication_medical_review",
    relationship: "may_require",
    strength: "high",
    direction: "safety",
    explanation:
      "High medical risk may require clinician involvement before intervention escalation.",
    diagnosticUse:
      "Acts as a gate before diet, fasting, medication-sensitive, or exercise recommendations."
  },

  {
    source: "constraint_growth_requirement",
    target: "risk_adjusted_recommendations",
    relationship: "requires_conservative_modification",
    strength: "high",
    direction: "safety",
    explanation:
      "Growth and development requirements make aggressive restriction inappropriate.",
    diagnosticUse:
      "Prioritises nourishment, habits, family environment, and clinical guidance."
  },

  {
    source: "constraint_high_injury_risk",
    target: "exercise_training",
    relationship: "requires_modification",
    strength: "high",
    direction: "safety",
    explanation:
      "High injury risk requires conservative exercise selection, progression, and monitoring.",
    diagnosticUse:
      "Prevents unsafe activity escalation."
  },

  {
    source: "constraint_low_adherence_capacity",
    target: "intervention_strategy",
    relationship: "requires_simplification",
    strength: "high",
    direction: "decision_modifier",
    explanation:
      "Low adherence capacity means complex tracking, strict rules, or high-friction plans are less likely to work.",
    diagnosticUse:
      "Biases toward defaults, minimum viable behaviours, and environment design."
  },

  {
    source: "priority_lean_mass_retention",
    target: "rate_of_weight_loss",
    relationship: "restricts_target",
    strength: "high",
    direction: "negative",
    explanation:
      "When lean mass retention is a high priority, the target rate of loss should usually be more conservative.",
    diagnosticUse:
      "Protects muscle in lean, older, athletic, or bodybuilding populations."
  },

  {
    source: "priority_glucose_control",
    target: "meal_composition_glucose_effect",
    relationship: "increases_importance_of",
    strength: "high",
    direction: "positive",
    explanation:
      "When glucose control is prioritised, meal composition becomes a more important intervention lever.",
    diagnosticUse:
      "Supports glucose-aware nutrition planning."
  },

  {
    source: "priority_psychological_safety",
    target: "measurement_decision_threshold",
    relationship: "modifies",
    strength: "high",
    direction: "safety",
    explanation:
      "When psychological safety is high priority, frequent weighing, strict calorie tracking, or appearance-led metrics may need modification.",
    diagnosticUse:
      "Prevents monitoring systems from increasing harm."
  }
];
