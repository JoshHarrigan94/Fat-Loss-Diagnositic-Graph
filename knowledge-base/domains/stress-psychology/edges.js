export const stressPsychologyEdges = [
  {
    source: "psychological_stress",
    target: "stress_load",
    relationship: "contributes_to",
    strength: "high",
    direction: "positive",
    explanation:
      "Perceived psychological stress is a major component of total stress load.",
    diagnosticUse:
      "Links psychological context to recovery and sleep constraints."
  },

  {
    source: "psychological_stress",
    target: "emotional_eating",
    relationship: "increases",
    strength: "high",
    direction: "positive",
    explanation:
      "Higher stress can increase eating for comfort, distraction, regulation, or reward.",
    diagnosticUse:
      "Explains intake drift that occurs independently of planned hunger."
  },

  {
    source: "emotional_eating",
    target: "reward_driven_eating",
    relationship: "is_subtype_of",
    strength: "high",
    direction: "hierarchical",
    explanation:
      "Emotional eating is a specific form of reward-driven or regulation-driven eating.",
    diagnosticUse:
      "Links psychology to the appetite-satiety domain."
  },

  {
    source: "executive_load",
    target: "calorie_tracking_accuracy",
    relationship: "reduces",
    strength: "moderate",
    direction: "negative",
    explanation:
      "Higher cognitive burden makes logging, weighing food, planning, and correcting errors harder.",
    diagnosticUse:
      "Explains poor tracking in people who understand the plan but cannot maintain the system."
  },

  {
    source: "executive_load",
    target: "perceived_plan_burden",
    relationship: "increases",
    strength: "high",
    direction: "positive",
    explanation:
      "A plan requiring too many decisions or too much organisation feels more burdensome.",
    diagnosticUse:
      "Supports simplifying the plan rather than adding more rules."
  },

  {
    source: "self_efficacy",
    target: "adherence_consistency",
    relationship: "supports",
    strength: "high",
    direction: "positive",
    explanation:
      "People who believe they can execute the plan are more likely to sustain repeated behaviours.",
    diagnosticUse:
      "Low self-efficacy suggests the need for smaller targets and early wins."
  },

  {
    source: "autonomy_support",
    target: "adherence_consistency",
    relationship: "supports",
    strength: "moderate",
    direction: "positive",
    explanation:
      "When people feel choice and ownership, adherence is more likely to persist.",
    diagnosticUse:
      "Useful when the person resents the plan or feels externally pressured."
  },

  {
    source: "shame_guilt_response",
    target: "all_or_nothing_thinking",
    relationship: "amplifies",
    strength: "moderate",
    direction: "positive",
    explanation:
      "Shame after a lapse can turn small deviations into full plan abandonment.",
    diagnosticUse:
      "Explains why negative self-talk worsens adherence after setbacks."
  },

  {
    source: "shame_guilt_response",
    target: "psychological_safety",
    relationship: "reduces",
    strength: "moderate",
    direction: "negative",
    explanation:
      "High shame makes honest reporting and reflective check-ins harder.",
    diagnosticUse:
      "Improves interpretation of missing data and under-reporting."
  },

  {
    source: "lapse_recovery_skill",
    target: "adherence_consistency",
    relationship: "stabilises",
    strength: "high",
    direction: "positive",
    explanation:
      "Fast recovery from lapses protects long-term consistency.",
    diagnosticUse:
      "Distinguishes temporary deviations from true adherence breakdown."
  },

  {
    source: "identity_alignment",
    target: "autonomy_support",
    relationship: "strengthens",
    strength: "moderate",
    direction: "positive",
    explanation:
      "When behaviours align with identity and values, they feel more self-directed.",
    diagnosticUse:
      "Supports values-based intervention design."
  },

  {
    source: "social_support_quality",
    target: "environmental_food_exposure",
    relationship: "modifies",
    strength: "moderate",
    direction: "contextual",
    explanation:
      "Household and social norms can either reduce or increase exposure to tempting foods and eating cues.",
    diagnosticUse:
      "Explains adherence difficulty in unsupportive social environments."
  },

  {
    source: "social_support_quality",
    target: "adherence_consistency",
    relationship: "supports_or_undermines",
    strength: "moderate",
    direction: "bidirectional_contextual",
    explanation:
      "Supportive relationships can improve adherence, while sabotage or pressure can undermine it.",
    diagnosticUse:
      "Flags when social context must be addressed before plan complexity increases."
  },

  {
    source: "psychological_safety",
    target: "calorie_tracking_accuracy",
    relationship: "improves_confidence_in",
    strength: "moderate",
    direction: "positive",
    explanation:
      "When people feel safe reporting honestly, intake and behaviour data become more reliable.",
    diagnosticUse:
      "Important for coaching, clinical, youth, and obesity contexts."
  },

  {
    source: "psychological_stress",
    target: "sleep_quality",
    relationship: "may_reduce",
    strength: "moderate",
    direction: "negative",
    explanation:
      "Stress can disrupt sleep quality and restoration.",
    diagnosticUse:
      "Links psychological state to recovery constraints."
  }
];
