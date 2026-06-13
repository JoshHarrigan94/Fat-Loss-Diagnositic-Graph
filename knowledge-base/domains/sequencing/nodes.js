export const sequencingNodes = [
  {
    id: "sequencing_process",
    label: "Sequencing Process",
    type: "decision_process",
    domain: "sequencing",
    description:
      "The process of ordering interventions based on safety, leverage, confidence, burden, readiness, risk, and dependency between strategies.",
    diagnosticRole: "core",
    reasoningPurpose:
      "Turns selected strategies into an ordered action pathway.",
    evidenceLevel: "high",
    tags: ["sequencing", "decision-process", "intervention-order"]
  },

  {
    id: "sequence_medical_safety_first",
    label: "Medical Safety First",
    type: "sequencing_rule",
    domain: "sequencing",
    description:
      "A rule that medical review, red flags, hypoglycaemia risk, pregnancy/postpartum concerns, eating disorder risk, or high-risk medication contexts must be resolved before lifestyle escalation.",
    diagnosticRole: "safety_rule",
    reasoningPurpose:
      "Prevents unsafe progression before clinical risk is addressed.",
    evidenceLevel: "high",
    tags: ["medical-safety", "sequencing", "safety-gate"]
  },

  {
    id: "sequence_confidence_before_escalation",
    label: "Confidence Before Escalation",
    type: "sequencing_rule",
    domain: "sequencing",
    description:
      "A rule that measurement, intake, adherence, and activity confidence should be sufficient before calories, training, or activity are intensified.",
    diagnosticRole: "decision_rule",
    reasoningPurpose:
      "Prevents unnecessary escalation based on unreliable data.",
    evidenceLevel: "high",
    tags: ["confidence", "monitoring", "escalation"]
  },

  {
    id: "sequence_low_burden_first",
    label: "Low Burden First",
    type: "sequencing_rule",
    domain: "sequencing",
    description:
      "A rule that lower-friction, easier-to-repeat interventions should usually precede complex or high-burden interventions when adherence capacity is limited.",
    diagnosticRole: "decision_rule",
    reasoningPurpose:
      "Improves execution by matching intervention complexity to adherence capacity.",
    evidenceLevel: "moderate",
    tags: ["low-burden", "adherence", "habit-design"]
  },

  {
    id: "sequence_recovery_before_progression",
    label: "Recovery Before Progression",
    type: "sequencing_rule",
    domain: "sequencing",
    description:
      "A rule that sleep, fatigue, diet fatigue, or training recovery bottlenecks should be addressed before increasing deficit size, cardio, or training volume.",
    diagnosticRole: "decision_rule",
    reasoningPurpose:
      "Prevents adding stress to an already under-recovered system.",
    evidenceLevel: "moderate",
    tags: ["recovery", "fatigue", "progression"]
  },

  {
    id: "sequence_foundation_before_precision",
    label: "Foundation Before Precision",
    type: "sequencing_rule",
    domain: "sequencing",
    description:
      "A rule that basic repeatable behaviours, meal structure, protein, fibre, steps, sleep, and logging quality should be established before advanced optimisation.",
    diagnosticRole: "decision_rule",
    reasoningPurpose:
      "Avoids premature complexity when foundational behaviours are missing.",
    evidenceLevel: "high",
    tags: ["foundation", "basics", "precision"]
  },

  {
    id: "sequence_single_lever_change",
    label: "Single Lever Change",
    type: "sequencing_rule",
    domain: "sequencing",
    description:
      "A rule that major intervention changes should usually be introduced one at a time so outcomes can be interpreted.",
    diagnosticRole: "decision_rule",
    reasoningPurpose:
      "Maintains diagnostic clarity and reduces overload.",
    evidenceLevel: "moderate",
    tags: ["single-lever", "diagnostic-clarity", "change-management"]
  },

  {
    id: "sequence_monitoring_window",
    label: "Monitoring Window",
    type: "sequencing_component",
    domain: "sequencing",
    description:
      "The observation period after an intervention change before deciding whether to continue, adjust, escalate, or reverse.",
    diagnosticRole: "core",
    reasoningPurpose:
      "Prevents rapid plan changes before enough data accumulates.",
    evidenceLevel: "high",
    tags: ["monitoring", "window", "trend"]
  },

  {
    id: "sequence_escalation_criteria",
    label: "Escalation Criteria",
    type: "sequencing_component",
    domain: "sequencing",
    description:
      "The conditions required before increasing intervention intensity, such as sufficient adherence, high measurement confidence, stable recovery, and low risk.",
    diagnosticRole: "core",
    reasoningPurpose:
      "Defines when the graph is allowed to intensify calories, activity, training, or monitoring.",
    evidenceLevel: "high",
    tags: ["escalation", "criteria", "decision-threshold"]
  },

  {
    id: "sequence_deescalation_criteria",
    label: "De-Escalation Criteria",
    type: "sequencing_component",
    domain: "sequencing",
    description:
      "The conditions that require reducing intensity, such as high fatigue, poor sleep, worsening adherence, psychological risk, injury risk, or medical safety concerns.",
    diagnosticRole: "core",
    reasoningPurpose:
      "Defines when the graph should reduce strain rather than increase pressure.",
    evidenceLevel: "high",
    tags: ["de-escalation", "safety", "fatigue"]
  },

  {
    id: "sequence_primary_strategy",
    label: "Primary Strategy",
    type: "sequencing_output",
    domain: "sequencing",
    description:
      "The highest-priority strategy selected for immediate action.",
    diagnosticRole: "decision_output",
    reasoningPurpose:
      "Creates focus and prevents overwhelming the user with too many changes.",
    tags: ["primary-strategy", "decision-output"]
  },

  {
    id: "sequence_secondary_strategy",
    label: "Secondary Strategy",
    type: "sequencing_output",
    domain: "sequencing",
    description:
      "A supporting strategy that may run alongside the primary strategy if burden and risk are acceptable.",
    diagnosticRole: "decision_output",
    reasoningPurpose:
      "Allows complementary action without overloading the plan.",
    tags: ["secondary-strategy", "decision-output"]
  },

  {
    id: "sequence_delayed_strategy",
    label: "Delayed Strategy",
    type: "sequencing_output",
    domain: "sequencing",
    description:
      "A strategy intentionally delayed until prerequisites, safety conditions, or confidence thresholds are met.",
    diagnosticRole: "decision_output",
    reasoningPurpose:
      "Prevents premature or unsafe intervention use.",
    tags: ["delayed-strategy", "prerequisite", "sequencing"]
  },

  {
    id: "sequence_do_not_use_strategy",
    label: "Do Not Use Strategy",
    type: "sequencing_output",
    domain: "sequencing",
    description:
      "A strategy removed from consideration due to contraindication, unacceptable risk, poor fit, or low expected value.",
    diagnosticRole: "safety_output",
    reasoningPurpose:
      "Makes the graph explicitly block inappropriate interventions.",
    tags: ["blocked-strategy", "safety", "contraindication"]
  }
];
