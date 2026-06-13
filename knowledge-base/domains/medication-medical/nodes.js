export const medicationMedicalNodes = [
  {
    id: "medication_medical_context",
    label: "Medication & Medical Context",
    type: "clinical_context",
    domain: "medication-medical",
    description:
      "The person's relevant medical conditions, medications, clinical risks, contraindications, surgery history, symptoms, and healthcare supervision needs.",
    diagnosticRole: "core",
    appliesTo: ["fat_loss", "obesity", "type_2_diabetes", "chronic_illness", "older_adults", "youth"],
    observableVia: [
      "medication_list",
      "diagnosed_conditions",
      "clinical_history",
      "symptom_flags",
      "surgery_history",
      "healthcare_supervision"
    ],
    reasoningPurpose:
      "Ensures fat-loss recommendations are medically safe, appropriately conservative, and referred for clinical review when needed.",
    evidenceLevel: "high",
    tags: ["medical", "medication", "safety", "clinical-context"]
  },

  {
    id: "medication_medical_review",
    label: "Medication/Medical Review",
    type: "clinical_action_flag",
    domain: "medication-medical",
    description:
      "A signal that the person may need review by a qualified healthcare professional before or during fat-loss intervention.",
    diagnosticRole: "risk_flag",
    appliesTo: ["type_2_diabetes", "chronic_illness", "older_adults", "youth", "obesity"],
    observableVia: [
      "hypoglycaemia_risk",
      "complex_medication_use",
      "red_flag_symptoms",
      "pregnancy_status",
      "rapid_unexplained_weight_change",
      "active_eating_disorder_risk"
    ],
    reasoningPurpose:
      "Prevents the graph from giving lifestyle-only recommendations where clinical oversight is required.",
    evidenceLevel: "high",
    tags: ["clinical-review", "safety", "triage", "contraindication"]
  },

  {
    id: "weight_affecting_medication",
    label: "Weight-Affecting Medication",
    type: "medication_modifier",
    domain: "medication-medical",
    description:
      "Medication that may influence appetite, body weight, fluid balance, energy expenditure, glucose regulation, fatigue, or training tolerance.",
    diagnosticRole: "core",
    appliesTo: ["fat_loss", "obesity", "type_2_diabetes", "chronic_illness", "general_health"],
    observableVia: [
      "antidepressants",
      "antipsychotics",
      "corticosteroids",
      "insulin",
      "sulfonylureas",
      "glp1_receptor_agonists",
      "stimulants",
      "beta_blockers"
    ],
    reasoningPurpose:
      "Explains why appetite, weight change, energy, or glucose risk may not behave as expected.",
    evidenceLevel: "high",
    tags: ["medication", "weight-change", "appetite", "metabolism"]
  },

  {
    id: "appetite_affecting_medication",
    label: "Appetite-Affecting Medication",
    type: "medication_modifier",
    domain: "medication-medical",
    description:
      "Medication that may increase, reduce, or destabilise appetite, cravings, nausea, meal timing, or total intake.",
    diagnosticRole: "supporting",
    appliesTo: ["fat_loss", "obesity", "type_2_diabetes", "chronic_illness", "performance"],
    observableVia: [
      "stimulant_medication",
      "glp1_receptor_agonists",
      "antidepressants",
      "antipsychotics",
      "corticosteroids",
      "nausea",
      "missed_meals"
    ],
    reasoningPurpose:
      "Modifies appetite and nutrition recommendations where hunger signals are medication-influenced.",
    evidenceLevel: "high",
    tags: ["appetite", "medication", "hunger", "intake"]
  },

  {
    id: "diabetes_medication_context",
    label: "Diabetes Medication Context",
    type: "medication_context",
    domain: "medication-medical",
    description:
      "The use of glucose-lowering medications that may affect appetite, weight, hypoglycaemia risk, carbohydrate tolerance, and exercise safety.",
    diagnosticRole: "risk_flag",
    appliesTo: ["type_2_diabetes", "obesity", "older_adults", "chronic_illness"],
    observableVia: [
      "insulin_use",
      "sulfonylurea_use",
      "metformin_use",
      "glp1_receptor_agonist_use",
      "sglt2_inhibitor_use",
      "hypoglycaemia_history"
    ],
    reasoningPurpose:
      "Ensures calorie, carbohydrate, fasting, and exercise recommendations account for medication-related safety risks.",
    evidenceLevel: "high",
    tags: ["diabetes", "medication", "hypoglycaemia", "safety"]
  },

  {
    id: "corticosteroid_exposure",
    label: "Corticosteroid Exposure",
    type: "medication_history",
    domain: "medication-medical",
    description:
      "Current or previous corticosteroid exposure that may affect appetite, water retention, glucose regulation, body composition, skin, mood, or adrenal-axis considerations.",
    diagnosticRole: "supporting",
    appliesTo: ["fat_loss", "chronic_illness", "general_health", "obesity"],
    observableVia: [
      "oral_steroid_use",
      "topical_steroid_history",
      "inhaled_steroid_use",
      "recent_taper",
      "fluid_retention",
      "glucose_changes"
    ],
    reasoningPurpose:
      "Adds context when water retention, appetite, glucose, mood, or body-composition changes may be medication-influenced.",
    evidenceLevel: "moderate",
    tags: ["corticosteroids", "water-retention", "glucose", "medical-history"]
  },

  {
    id: "bariatric_surgery_context",
    label: "Bariatric Surgery Context",
    type: "surgical_context",
    domain: "medication-medical",
    description:
      "History of bariatric surgery or planned bariatric treatment that changes nutrition, supplementation, eating tolerance, dumping risk, and clinical monitoring needs.",
    diagnosticRole: "risk_flag",
    appliesTo: ["obesity", "type_2_diabetes", "chronic_illness", "general_health"],
    observableVia: [
      "gastric_bypass_history",
      "sleeve_gastrectomy_history",
      "gastric_band_history",
      "dumping_symptoms",
      "supplementation_requirements",
      "clinical_follow_up"
    ],
    reasoningPurpose:
      "Prevents generic calorie or macro recommendations where post-surgical nutrition rules apply.",
    evidenceLevel: "high",
    tags: ["bariatric-surgery", "obesity", "nutrition-risk", "clinical-monitoring"]
  },

  {
    id: "eating_disorder_risk",
    label: "Eating Disorder Risk",
    type: "psychological_medical_risk",
    domain: "medication-medical",
    description:
      "Risk indicators for disordered eating or eating disorders, including restriction, bingeing, purging, compulsive exercise, severe body image distress, or unsafe weight-control behaviours.",
    diagnosticRole: "risk_flag",
    appliesTo: ["fat_loss", "obesity", "bodybuilding", "youth", "general_health", "performance"],
    observableVia: [
      "binge_purge_behaviour",
      "compulsive_exercise",
      "severe_restriction",
      "fear_of_weight_gain",
      "body_image_distress",
      "loss_of_control_eating"
    ],
    reasoningPurpose:
      "Ensures fat-loss guidance does not intensify unsafe restriction, shame, or compulsive behaviours.",
    evidenceLevel: "high",
    tags: ["eating-disorder", "risk", "safety", "psychology"]
  },

  {
    id: "pregnancy_postpartum_context",
    label: "Pregnancy/Postpartum Context",
    type: "clinical_population_context",
    domain: "medication-medical",
    description:
      "Pregnancy, breastfeeding, postpartum recovery, fertility treatment, or related clinical status that changes energy needs, safety thresholds, and intervention appropriateness.",
    diagnosticRole: "risk_flag",
    appliesTo: ["general_health", "obesity", "chronic_illness"],
    observableVia: [
      "pregnancy_status",
      "breastfeeding_status",
      "postpartum_stage",
      "fertility_treatment",
      "medical_clearance"
    ],
    reasoningPurpose:
      "Prevents inappropriate calorie restriction or exercise progression during periods requiring clinical consideration.",
    evidenceLevel: "high",
    tags: ["pregnancy", "postpartum", "breastfeeding", "clinical-safety"]
  },

  {
    id: "red_flag_symptoms",
    label: "Red Flag Symptoms",
    type: "medical_risk_signal",
    domain: "medication-medical",
    description:
      "Symptoms or clinical signs that may indicate the need for urgent or non-routine medical assessment rather than lifestyle-only guidance.",
    diagnosticRole: "risk_flag",
    appliesTo: ["fat_loss", "general_health", "obesity", "chronic_illness", "older_adults", "youth"],
    observableVia: [
      "unexplained_weight_loss",
      "chest_pain",
      "fainting",
      "severe_breathlessness",
      "blood_in_stool",
      "persistent_vomiting",
      "severe_fatigue",
      "neurological_symptoms"
    ],
    reasoningPurpose:
      "Creates a safety override when symptoms suggest possible medical pathology.",
    evidenceLevel: "high",
    tags: ["red-flags", "medical-risk", "triage", "safety"]
  }
];
