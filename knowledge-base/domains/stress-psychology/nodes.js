export const stressPsychologyNodes = [
  {
    id: "psychological_stress",
    label: "Psychological Stress",
    type: "psychological_state",
    domain: "stress-psychology",
    description:
      "The perceived emotional and cognitive load from life demands, uncertainty, conflict, work, caregiving, finances, identity pressure, or dieting itself.",
    diagnosticRole: "core",
    appliesTo: ["fat_loss", "obesity", "general_health", "chronic_illness", "performance"],
    observableVia: [
      "stress_rating",
      "mood_rating",
      "workload",
      "relationship_stress",
      "life_events",
      "rumination",
      "emotional_overload"
    ],
    reasoningPurpose:
      "Determines whether stress is disrupting sleep, appetite, adherence, activity, or decision-making.",
    evidenceLevel: "high",
    tags: ["stress", "psychology", "adherence", "recovery"]
  },

  {
    id: "emotional_eating",
    label: "Emotional Eating",
    type: "eating_pattern",
    domain: "stress-psychology",
    description:
      "Eating in response to emotions such as stress, sadness, boredom, anger, loneliness, anxiety, or overwhelm rather than physical hunger.",
    diagnosticRole: "core",
    appliesTo: ["fat_loss", "obesity", "general_health", "chronic_illness"],
    observableVia: [
      "stress_eating",
      "boredom_eating",
      "eating_without_hunger",
      "mood_before_eating",
      "loss_of_control_eating"
    ],
    reasoningPurpose:
      "Explains intake drift when food is being used for emotional regulation.",
    evidenceLevel: "high",
    tags: ["emotional-eating", "stress", "reward", "intake"]
  },

  {
    id: "self_efficacy",
    label: "Self-Efficacy",
    type: "psychological_capacity",
    domain: "stress-psychology",
    description:
      "The person's belief that they can successfully execute the required behaviours and recover from lapses.",
    diagnosticRole: "core",
    appliesTo: ["fat_loss", "obesity", "body_recomposition", "general_health", "youth", "older_adults"],
    observableVia: [
      "confidence_rating",
      "lapse_recovery_speed",
      "history_of_success",
      "language_patterns",
      "plan_confidence"
    ],
    reasoningPurpose:
      "Determines whether the plan should prioritise mastery, simplicity, and early wins.",
    evidenceLevel: "high",
    tags: ["confidence", "self-efficacy", "behaviour-change", "adherence"]
  },

  {
    id: "autonomy_support",
    label: "Autonomy Support",
    type: "motivation_context",
    domain: "stress-psychology",
    description:
      "The degree to which the person feels ownership, choice, and personal meaning in the fat-loss process.",
    diagnosticRole: "supporting",
    appliesTo: ["fat_loss", "obesity", "general_health", "youth", "chronic_illness"],
    observableVia: [
      "goal_ownership",
      "choice_in_plan",
      "internal_motivation",
      "values_alignment",
      "resistance_to_plan"
    ],
    reasoningPurpose:
      "Explains whether adherence is supported by internal motivation or undermined by pressure and resentment.",
    evidenceLevel: "moderate",
    tags: ["autonomy", "motivation", "values", "sustainability"]
  },

  {
    id: "shame_guilt_response",
    label: "Shame/Guilt Response",
    type: "cognitive_emotional_pattern",
    domain: "stress-psychology",
    description:
      "A negative emotional response to lapses, weight changes, body image, or perceived failure that may trigger avoidance or overeating.",
    diagnosticRole: "core",
    appliesTo: ["fat_loss", "obesity", "body_recomposition", "youth", "general_health"],
    observableVia: [
      "guilt_after_eating",
      "scale_avoidance",
      "negative_self_talk",
      "body_shame",
      "avoidance_after_lapse"
    ],
    reasoningPurpose:
      "Explains why setbacks may lead to avoidance rather than corrective action.",
    evidenceLevel: "moderate",
    tags: ["shame", "guilt", "avoidance", "lapse-recovery"]
  },

  {
    id: "executive_load",
    label: "Executive Load",
    type: "cognitive_constraint",
    domain: "stress-psychology",
    description:
      "The cognitive burden required to plan meals, track food, make decisions, manage time, resist impulses, and organise routines.",
    diagnosticRole: "core",
    appliesTo: ["fat_loss", "obesity", "general_health", "chronic_illness", "youth"],
    observableVia: [
      "decision_fatigue",
      "meal_planning_difficulty",
      "forgetfulness",
      "missed_logs",
      "chaotic_schedule",
      "overwhelm"
    ],
    reasoningPurpose:
      "Determines whether the intervention needs fewer choices, stronger defaults, or lower-friction systems.",
    evidenceLevel: "moderate",
    tags: ["executive-function", "decision-fatigue", "planning", "adherence"]
  },

  {
    id: "lapse_recovery_skill",
    label: "Lapse Recovery Skill",
    type: "behavioural_skill",
    domain: "stress-psychology",
    description:
      "The ability to resume the plan quickly after missed logs, overeating, skipped training, social eating, illness, or travel.",
    diagnosticRole: "core",
    appliesTo: ["fat_loss", "obesity", "body_recomposition", "general_health"],
    observableVia: [
      "restart_delay",
      "next_meal_recovery",
      "missed_day_recovery",
      "self_correction_speed",
      "lapse_reflection"
    ],
    reasoningPurpose:
      "Determines whether setbacks become minor deviations or prolonged regressions.",
    evidenceLevel: "high",
    tags: ["lapse", "recovery", "resilience", "adherence"]
  },

  {
    id: "identity_alignment",
    label: "Identity Alignment",
    type: "motivation_factor",
    domain: "stress-psychology",
    description:
      "The degree to which fat-loss behaviours fit the person's self-image, values, social identity, and desired future identity.",
    diagnosticRole: "supporting",
    appliesTo: ["fat_loss", "body_recomposition", "general_health", "performance"],
    observableVia: [
      "values_alignment",
      "identity_language",
      "goal_meaning",
      "social_identity",
      "future_self_clarity"
    ],
    reasoningPurpose:
      "Explains whether behaviours feel like self-expression or external punishment.",
    evidenceLevel: "moderate",
    tags: ["identity", "motivation", "values", "behaviour-change"]
  },

  {
    id: "social_support_quality",
    label: "Social Support Quality",
    type: "social_context",
    domain: "stress-psychology",
    description:
      "The degree to which family, friends, partners, peers, coaches, or healthcare professionals support rather than undermine the person's goals.",
    diagnosticRole: "supporting",
    appliesTo: ["fat_loss", "obesity", "youth", "older_adults", "chronic_illness", "general_health"],
    observableVia: [
      "household_support",
      "partner_support",
      "peer_pressure",
      "coach_relationship",
      "food_norms",
      "social_sabotage"
    ],
    reasoningPurpose:
      "Explains whether the person's environment supports adherence or increases friction.",
    evidenceLevel: "moderate",
    tags: ["social-support", "environment", "relationships", "adherence"]
  },

  {
    id: "psychological_safety",
    label: "Psychological Safety",
    type: "support_context",
    domain: "stress-psychology",
    description:
      "The extent to which the person can report difficulties, lapses, fears, weight changes, or emotional struggles without feeling judged or punished.",
    diagnosticRole: "core",
    appliesTo: ["fat_loss", "obesity", "chronic_illness", "youth", "general_health"],
    observableVia: [
      "honest_reporting",
      "coach_trust",
      "fear_of_judgement",
      "avoidance",
      "check_in_openness"
    ],
    reasoningPurpose:
      "Improves diagnostic accuracy by increasing truthful reporting and reducing shame-driven avoidance.",
    evidenceLevel: "moderate",
    tags: ["psychological-safety", "trust", "reporting", "coaching"]
  }
];
