export const riskManagementNodes = [
  {
    id: "risk_management_process",
    label: "Risk Management Process",
    type: "safety_reasoning_process",
    domain: "risk-management",
    description:
      "The structured process of identifying, weighting, prioritising, and responding to risks before generating fat-loss recommendations.",
    diagnosticRole: "core",
    appliesTo: ["fat_loss", "obesity", "type_2_diabetes", "chronic_illness", "older_adults", "youth"],
    reasoningPurpose:
      "Ensures recommendations are safe, proportionate, population-aware, and clinically appropriate.",
    evidenceLevel: "high",
    tags: ["risk", "safety", "triage", "recommendations"]
  },

  {
    id: "medical_risk_level",
    label: "Medical Risk Level",
    type: "risk_score",
    domain: "risk-management",
    description:
      "The estimated level of medical complexity or safety concern based on symptoms, diagnoses, medication, pregnancy status, diabetes risk, red flags, and clinical supervision needs.",
    diagnosticRole: "core",
    observableVia: [
      "red_flag_symptoms",
      "medication_medical_context",
      "hypoglycaemia_risk",
      "pregnancy_postpartum_context",
      "bariatric_surgery_context",
      "sleep_disordered_breathing_risk"
    ],
    reasoningPurpose:
      "Determines whether recommendations can proceed normally, require modification, or should be routed to medical review.",
    evidenceLevel: "high",
    tags: ["medical-risk", "safety", "clinical-review"]
  },

  {
    id: "psychological_risk_level",
    label: "Psychological Risk Level",
    type: "risk_score",
    domain: "risk-management",
    description:
      "The estimated psychological risk from shame, eating disorder risk, compulsive tracking, body image distress, low psychological safety, or high emotional strain.",
    diagnosticRole: "core",
    observableVia: [
      "eating_disorder_risk",
      "shame_guilt_response",
      "psychological_safety",
      "all_or_nothing_thinking",
      "psychological_diet_strain",
      "body_image_distress"
    ],
    reasoningPurpose:
      "Determines whether standard calorie tracking, weigh-ins, aggressive restriction, or appearance-focused goals are appropriate.",
    evidenceLevel: "high",
    tags: ["psychological-risk", "eating-disorder-risk", "safety"]
  },

  {
    id: "injury_risk_level",
    label: "Injury Risk Level",
    type: "risk_score",
    domain: "risk-management",
    description:
      "The estimated risk that activity or training interventions may worsen pain, injury, tissue overload, fall risk, or functional limitation.",
    diagnosticRole: "core",
    observableVia: [
      "injury_risk_from_training",
      "pain",
      "injury_history",
      "constraint_high_injury_risk",
      "sarcopenia_risk",
      "mobility_status",
      "fatigue"
    ],
    reasoningPurpose:
      "Determines whether exercise recommendations should be modified, progressed slowly, or referred for specialist input.",
    evidenceLevel: "high",
    tags: ["injury-risk", "training", "safety"]
  },

  {
    id: "recovery_risk_level",
    label: "Recovery Risk Level",
    type: "risk_score",
    domain: "risk-management",
    description:
      "The estimated risk that the current intervention exceeds the person's recovery capacity due to poor sleep, high stress, illness, diet fatigue, or excessive training load.",
    diagnosticRole: "core",
    observableVia: [
      "recovery_capacity",
      "recovery_debt",
      "diet_fatigue_risk",
      "sleep_quality",
      "training_recovery_status",
      "constraint_low_recovery_capacity"
    ],
    reasoningPurpose:
      "Determines whether the plan should reduce strain before increasing deficit, activity, or training.",
    evidenceLevel: "moderate",
    tags: ["recovery", "fatigue", "risk", "strain"]
  },

  {
    id: "glucose_safety_risk",
    label: "Glucose Safety Risk",
    type: "risk_score",
    domain: "risk-management",
    description:
      "The estimated risk from hypoglycaemia, diabetes medication, unstable glucose patterns, fasting, carbohydrate restriction, alcohol, or exercise timing.",
    diagnosticRole: "core",
    observableVia: [
      "hypoglycaemia_risk",
      "diabetes_medication_context",
      "glycaemic_variability",
      "carbohydrate_tolerance_context",
      "missed_meals",
      "exercise_timing"
    ],
    reasoningPurpose:
      "Prevents unsafe calorie, carbohydrate, fasting, or exercise recommendations in glucose-sensitive contexts.",
    evidenceLevel: "high",
    tags: ["glucose", "diabetes", "hypoglycaemia", "safety"]
  },

  {
    id: "monitoring_burden_risk",
    label: "Monitoring Burden Risk",
    type: "risk_score",
    domain: "risk-management",
    description:
      "The risk that tracking, weighing, measuring, photographing, or reviewing data creates stress, shame, obsession, avoidance, or dropout.",
    diagnosticRole: "supporting",
    observableVia: [
      "self_monitoring_frequency",
      "psychological_safety",
      "shame_guilt_response",
      "eating_disorder_risk",
      "perceived_plan_burden",
      "scale_avoidance"
    ],
    reasoningPurpose:
      "Determines whether monitoring intensity should be reduced or replaced with lower-risk metrics.",
    evidenceLevel: "moderate",
    tags: ["monitoring", "tracking", "psychological-safety", "burden"]
  },

  {
    id: "recommendation_risk_tier",
    label: "Recommendation Risk Tier",
    type: "decision_gate",
    domain: "risk-management",
    description:
      "The final risk category used to decide whether recommendations can proceed normally, proceed with modifications, require monitoring, or require medical referral.",
    diagnosticRole: "core",
    observableVia: [
      "medical_risk_level",
      "psychological_risk_level",
      "injury_risk_level",
      "recovery_risk_level",
      "glucose_safety_risk"
    ],
    reasoningPurpose:
      "Acts as the main safety gate before intervention strategy is selected.",
    evidenceLevel: "high",
    tags: ["risk-tier", "decision-gate", "safety"]
  },

  {
    id: "proceed_normally",
    label: "Proceed Normally",
    type: "risk_response",
    domain: "risk-management",
    description:
      "A risk response where no major safety constraints are detected and standard evidence-based fat-loss recommendations can proceed.",
    diagnosticRole: "decision_output",
    reasoningPurpose:
      "Allows normal intervention selection when risk is low and confidence is adequate.",
    tags: ["risk-response", "proceed"]
  },

  {
    id: "proceed_with_modification",
    label: "Proceed With Modification",
    type: "risk_response",
    domain: "risk-management",
    description:
      "A risk response where recommendations can proceed but must be modified for medical, psychological, recovery, injury, glucose, or population constraints.",
    diagnosticRole: "decision_output",
    reasoningPurpose:
      "Allows progress while respecting risk constraints.",
    tags: ["risk-response", "modify"]
  },

  {
    id: "monitor_before_escalation",
    label: "Monitor Before Escalation",
    type: "risk_response",
    domain: "risk-management",
    description:
      "A risk response where the graph should gather more data, improve measurement confidence, or observe trends before increasing intervention intensity.",
    diagnosticRole: "decision_output",
    reasoningPurpose:
      "Prevents unnecessary escalation when data confidence is low or risk is uncertain.",
    tags: ["risk-response", "monitor", "confidence"]
  },

  {
    id: "refer_or_medical_review",
    label: "Refer or Medical Review",
    type: "risk_response",
    domain: "risk-management",
    description:
      "A risk response where clinical review, specialist input, or urgent assessment may be needed before lifestyle-only recommendations continue.",
    diagnosticRole: "safety_output",
    reasoningPurpose:
      "Routes high-risk scenarios away from unsupported recommendations.",
    tags: ["risk-response", "medical-review", "referral"]
  }
];
