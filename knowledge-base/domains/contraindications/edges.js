export const contraindicationsEdges = [
  {
    source: "contraindication_screening",
    target: "risk_adjusted_recommendations",
    relationship: "gates",
    strength: "high",
    direction: "safety_gate",
    explanation:
      "Contraindication screening must occur before recommendations are finalised.",
    diagnosticUse:
      "Ensures unsafe intervention options are removed, delayed, or modified."
  },

  {
    source: "medical_risk_level",
    target: "contraindication_screening",
    relationship: "informs",
    strength: "high",
    direction: "safety",
    explanation:
      "Medical risk determines whether standard interventions require modification or review.",
    diagnosticUse:
      "Routes medical complexity into contraindication logic."
  },

  {
    source: "psychological_risk_level",
    target: "contraindication_strict_tracking",
    relationship: "increases",
    strength: "high",
    direction: "safety",
    explanation:
      "High psychological risk makes strict tracking or frequent monitoring more likely to be harmful.",
    diagnosticUse:
      "Supports lower-risk monitoring alternatives."
  },

  {
    source: "eating_disorder_risk",
    target: "contraindication_aggressive_deficit",
    relationship: "increases",
    strength: "high",
    direction: "safety",
    explanation:
      "Eating disorder risk makes aggressive restriction unsafe or inappropriate without specialist support.",
    diagnosticUse:
      "Prevents intensifying restrictive behaviours."
  },

  {
    source: "eating_disorder_risk",
    target: "contraindication_strict_tracking",
    relationship: "increases",
    strength: "high",
    direction: "safety",
    explanation:
      "Disordered eating risk can make calorie tracking, weighing, and body checking harmful.",
    diagnosticUse:
      "Changes monitoring and feedback strategy."
  },

  {
    source: "hypoglycaemia_risk",
    target: "contraindication_unsupervised_fasting",
    relationship: "increases",
    strength: "high",
    direction: "safety",
    explanation:
      "People at risk of hypoglycaemia may be unsafe with fasting or meal skipping without clinical guidance.",
    diagnosticUse:
      "Prevents unsafe fasting recommendations."
  },

  {
    source: "diabetes_medication_context",
    target: "contraindication_carbohydrate_restriction",
    relationship: "may_increase",
    strength: "high",
    direction: "safety",
    explanation:
      "Some diabetes medications make large carbohydrate reductions safety-sensitive.",
    diagnosticUse:
      "Requires medication-aware carbohydrate recommendations."
  },

  {
    source: "constraint_growth_requirement",
    target: "contraindication_aggressive_deficit",
    relationship: "increases",
    strength: "high",
    direction: "safety",
    explanation:
      "Growth and maturation needs restrict aggressive calorie deficits.",
    diagnosticUse:
      "Prevents adult-style dieting logic in youth populations."
  },

  {
    source: "pregnancy_postpartum_context",
    target: "contraindication_aggressive_deficit",
    relationship: "increases",
    strength: "high",
    direction: "safety",
    explanation:
      "Pregnancy, breastfeeding, and postpartum recovery alter energy needs and safety thresholds.",
    diagnosticUse:
      "Requires conservative and clinically appropriate guidance."
  },

  {
    source: "constraint_low_recovery_capacity",
    target: "contraindication_aggressive_deficit",
    relationship: "increases",
    strength: "high",
    direction: "safety",
    explanation:
      "Low recovery capacity lowers tolerance for large calorie deficits.",
    diagnosticUse:
      "Supports smaller deficits, maintenance phases, or recovery-first sequencing."
  },

  {
    source: "injury_risk_level",
    target: "contraindication_high_intensity_exercise",
    relationship: "increases",
    strength: "high",
    direction: "safety",
    explanation:
      "High injury risk makes high-intensity or high-impact exercise inappropriate without modification.",
    diagnosticUse:
      "Forces conservative progression."
  },

  {
    source: "recovery_risk_level",
    target: "contraindication_large_activity_increase",
    relationship: "increases",
    strength: "high",
    direction: "safety",
    explanation:
      "High recovery risk means large activity increases may worsen fatigue and adherence.",
    diagnosticUse:
      "Promotes gradual activity progression."
  },

  {
    source: "priority_performance",
    target: "contraindication_carbohydrate_restriction",
    relationship: "may_increase",
    strength: "moderate",
    direction: "contextual",
    explanation:
      "Performance-focused populations may require carbohydrate availability to support training quality.",
    diagnosticUse:
      "Prevents unnecessary performance loss."
  },

  {
    source: "appetite_suppression_risk",
    target: "contraindication_appetite_suppression_strategy",
    relationship: "increases",
    strength: "moderate",
    direction: "safety",
    explanation:
      "When appetite is already suppressed, further appetite-suppression strategies may worsen under-fuelling.",
    diagnosticUse:
      "Redirects toward nutrition adequacy and meal structure."
  },

  {
    source: "contraindication_aggressive_deficit",
    target: "contraindication_output_mode",
    relationship: "informs",
    strength: "high",
    direction: "decision_modifier",
    explanation:
      "Aggressive deficit contraindications determine whether restriction should be avoided, reduced, delayed, or referred.",
    diagnosticUse:
      "Feeds specific safety constraint into final output mode."
  },

  {
    source: "contraindication_unsupervised_fasting",
    target: "contraindication_output_mode",
    relationship: "informs",
    strength: "high",
    direction: "decision_modifier",
    explanation:
      "Fasting contraindications determine whether fasting should be avoided or clinically supervised.",
    diagnosticUse:
      "Prevents unsupported fasting recommendations."
  },

  {
    source: "contraindication_strict_tracking",
    target: "contraindication_output_mode",
    relationship: "informs",
    strength: "high",
    direction: "decision_modifier",
    explanation:
      "Strict tracking contraindications determine whether lower-risk monitoring should be selected.",
    diagnosticUse:
      "Protects psychological safety."
  },

  {
    source: "contraindication_output_mode",
    target: "intervention_strategy",
    relationship: "modifies",
    strength: "high",
    direction: "decision_output",
    explanation:
      "Detected contraindications change which intervention strategies are allowed.",
    diagnosticUse:
      "Ensures unsafe options are filtered before sequencing."
  },

  {
    source: "contraindication_output_mode",
    target: "risk_adjusted_recommendations",
    relationship: "modifies",
    strength: "high",
    direction: "decision_output",
    explanation:
      "Contraindication outputs modify final recommendations by avoiding, modifying, delaying, monitoring, or referring.",
    diagnosticUse:
      "Connects safety screening to user-facing recommendations."
  }
];
