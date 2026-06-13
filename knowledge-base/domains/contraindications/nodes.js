export const contraindicationsNodes = [
  {
    id: "contraindication_screening",
    label: "Contraindication Screening",
    type: "safety_reasoning_process",
    domain: "contraindications",
    description:
      "The process of checking whether a normally valid fat-loss intervention should be avoided, modified, delayed, or referred because of medical, psychological, developmental, recovery, glucose, or injury risk.",
    diagnosticRole: "core",
    reasoningPurpose:
      "Prevents the graph from recommending interventions that are theoretically effective but unsafe or inappropriate for the person.",
    evidenceLevel: "high",
    tags: ["contraindications", "safety", "screening", "intervention-gate"]
  },

  {
    id: "contraindication_aggressive_deficit",
    label: "Aggressive Deficit Contraindication",
    type: "intervention_contraindication",
    domain: "contraindications",
    description:
      "A context where large calorie deficits should be avoided or heavily modified due to medical risk, low recovery capacity, youth growth needs, pregnancy/postpartum status, eating disorder risk, lean status, or high performance demands.",
    diagnosticRole: "safety_gate",
    contraindicates: ["large_calorie_deficit", "rapid_weight_loss_target", "very_low_calorie_diet"],
    observableVia: [
      "constraint_low_recovery_capacity",
      "constraint_growth_requirement",
      "eating_disorder_risk",
      "pregnancy_postpartum_context",
      "population_lean",
      "medical_risk_level"
    ],
    reasoningPurpose:
      "Restricts aggressive calorie reduction when risk exceeds expected benefit.",
    evidenceLevel: "high",
    tags: ["calorie-deficit", "restriction", "safety", "rapid-weight-loss"]
  },

  {
    id: "contraindication_unsupervised_fasting",
    label: "Unsupervised Fasting Contraindication",
    type: "intervention_contraindication",
    domain: "contraindications",
    description:
      "A context where fasting or prolonged meal skipping should be avoided or clinically supervised due to diabetes medication, hypoglycaemia risk, pregnancy, youth, eating disorder risk, frailty, or medical complexity.",
    diagnosticRole: "safety_gate",
    contraindicates: ["prolonged_fasting", "meal_skipping_strategy", "time_restricted_eating"],
    observableVia: [
      "hypoglycaemia_risk",
      "diabetes_medication_context",
      "pregnancy_postpartum_context",
      "population_youth",
      "eating_disorder_risk",
      "sarcopenia_risk"
    ],
    reasoningPurpose:
      "Prevents fasting-based recommendations where missed meals could increase clinical, psychological, or under-fuelling risk.",
    evidenceLevel: "high",
    tags: ["fasting", "meal-skipping", "hypoglycaemia", "safety"]
  },

  {
    id: "contraindication_strict_tracking",
    label: "Strict Tracking Contraindication",
    type: "intervention_contraindication",
    domain: "contraindications",
    description:
      "A context where strict calorie tracking, macro tracking, frequent weigh-ins, or body checking may worsen shame, anxiety, compulsive behaviour, or disordered eating risk.",
    diagnosticRole: "safety_gate",
    contraindicates: ["strict_calorie_tracking", "macro_tracking", "frequent_weigh_ins", "progress_photo_protocol"],
    observableVia: [
      "eating_disorder_risk",
      "psychological_risk_level",
      "monitoring_burden_risk",
      "shame_guilt_response",
      "priority_psychological_safety"
    ],
    reasoningPurpose:
      "Protects psychological safety by modifying or replacing high-monitoring strategies.",
    evidenceLevel: "high",
    tags: ["tracking", "psychological-safety", "eating-disorder-risk", "monitoring"]
  },

  {
    id: "contraindication_high_intensity_exercise",
    label: "High-Intensity Exercise Contraindication",
    type: "intervention_contraindication",
    domain: "contraindications",
    description:
      "A context where high-intensity training should be avoided, delayed, or modified due to injury risk, low recovery capacity, medical risk, poor sleep, severe obesity, frailty, pain, or low training background.",
    diagnosticRole: "safety_gate",
    contraindicates: ["hiit", "max_effort_training", "high_impact_running", "rapid_training_progression"],
    observableVia: [
      "injury_risk_level",
      "constraint_high_injury_risk",
      "constraint_low_recovery_capacity",
      "medical_risk_level",
      "sarcopenia_risk",
      "training_intensity_tolerance"
    ],
    reasoningPurpose:
      "Prevents exercise escalation that could worsen injury, fatigue, or clinical risk.",
    evidenceLevel: "high",
    tags: ["exercise", "HIIT", "injury-risk", "safety"]
  },

  {
    id: "contraindication_carbohydrate_restriction",
    label: "Carbohydrate Restriction Contraindication",
    type: "intervention_contraindication",
    domain: "contraindications",
    description:
      "A context where significant carbohydrate restriction should be avoided or modified due to diabetes medication, hypoglycaemia risk, high training demands, youth growth needs, pregnancy/postpartum status, or eating disorder risk.",
    diagnosticRole: "safety_gate",
    contraindicates: ["low_carbohydrate_diet", "ketogenic_diet", "large_carbohydrate_reduction"],
    observableVia: [
      "hypoglycaemia_risk",
      "diabetes_medication_context",
      "priority_performance",
      "population_youth",
      "pregnancy_postpartum_context",
      "eating_disorder_risk"
    ],
    reasoningPurpose:
      "Prevents unsafe or performance-damaging carbohydrate restriction in sensitive contexts.",
    evidenceLevel: "moderate",
    tags: ["carbohydrates", "glucose", "performance", "safety"]
  },

  {
    id: "contraindication_large_activity_increase",
    label: "Large Activity Increase Contraindication",
    type: "intervention_contraindication",
    domain: "contraindications",
    description:
      "A context where rapidly increasing steps, cardio, or training volume should be avoided due to injury risk, low recovery capacity, fatigue, frailty, pain, chronic illness, or adherence burden.",
    diagnosticRole: "safety_gate",
    contraindicates: ["large_step_increase", "rapid_cardio_volume_increase", "rapid_training_volume_increase"],
    observableVia: [
      "injury_risk_level",
      "constraint_high_injury_risk",
      "recovery_risk_level",
      "population_chronic_illness",
      "population_older_adult",
      "constraint_low_adherence_capacity"
    ],
    reasoningPurpose:
      "Forces graded progression rather than abrupt activity escalation.",
    evidenceLevel: "high",
    tags: ["activity", "progression", "injury-risk", "recovery"]
  },

  {
    id: "contraindication_appetite_suppression_strategy",
    label: "Appetite Suppression Strategy Contraindication",
    type: "intervention_contraindication",
    domain: "contraindications",
    description:
      "A context where deliberately suppressing appetite may worsen under-fuelling, missed meals, medication effects, nutrient gaps, rebound hunger, or disordered eating risk.",
    diagnosticRole: "safety_gate",
    contraindicates: ["appetite_suppression_focus", "meal_skipping_for_hunger_control", "very_low_food_volume_day"],
    observableVia: [
      "appetite_suppression_risk",
      "appetite_affecting_medication",
      "eating_disorder_risk",
      "low_energy_availability",
      "performance_priority",
      "nutrition_quality"
    ],
    reasoningPurpose:
      "Prevents treating low hunger as automatically beneficial when fuelling adequacy is at risk.",
    evidenceLevel: "moderate",
    tags: ["appetite", "under-fuelling", "medication", "safety"]
  },

  {
    id: "contraindication_output_mode",
    label: "Contraindication Output Mode",
    type: "decision_output",
    domain: "contraindications",
    description:
      "The selected response when a contraindication is detected: avoid, modify, delay, monitor, or refer.",
    diagnosticRole: "core",
    reasoningPurpose:
      "Turns contraindication detection into concrete decision behaviour.",
    evidenceLevel: "high",
    tags: ["decision-output", "avoid", "modify", "refer"]
  }
];
