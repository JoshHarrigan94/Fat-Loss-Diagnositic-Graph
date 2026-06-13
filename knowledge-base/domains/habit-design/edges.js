export const habitDesignEdges = [
  {
    source: "habit_design",
    target: "adherence_consistency",
    relationship: "supports",
    strength: "high",
    direction: "positive",
    explanation:
      "Well-designed habits make repeated execution easier and reduce reliance on motivation.",
    diagnosticUse:
      "Low adherence should trigger evaluation of habit systems before blaming effort."
  },

  {
    source: "implementation_intentions",
    target: "lapse_recovery_skill",
    relationship: "supports",
    strength: "high",
    direction: "positive",
    explanation:
      "If-then plans improve recovery from predictable lapses by pre-deciding the next action.",
    diagnosticUse:
      "Useful when predictable barriers repeatedly derail progress."
  },

  {
    source: "environment_design",
    target: "environmental_food_exposure",
    relationship: "reduces_or_modifies",
    strength: "high",
    direction: "contextual",
    explanation:
      "Changing the environment can reduce exposure to high-risk foods or make healthier defaults easier.",
    diagnosticUse:
      "Prioritises environment changes when willpower-dependent strategies keep failing."
  },

  {
    source: "behavioural_friction",
    target: "perceived_plan_burden",
    relationship: "increases",
    strength: "high",
    direction: "positive",
    explanation:
      "Higher practical friction makes the plan feel harder to follow.",
    diagnosticUse:
      "Signals that the plan should be simplified or made more accessible."
  },

  {
    source: "default_behaviours",
    target: "executive_load",
    relationship: "reduces",
    strength: "high",
    direction: "negative",
    explanation:
      "Defaults reduce the number of decisions required each day.",
    diagnosticUse:
      "Important when planning, tracking, or meal choice creates overwhelm."
  },

  {
    source: "default_behaviours",
    target: "adherence_consistency",
    relationship: "stabilises",
    strength: "high",
    direction: "positive",
    explanation:
      "Repeatable defaults make behaviour more predictable across days and weeks.",
    diagnosticUse:
      "Useful when chaotic routines produce inconsistent execution."
  },

  {
    source: "cue_reliability",
    target: "habit_design",
    relationship: "supports",
    strength: "moderate",
    direction: "positive",
    explanation:
      "Reliable cues help trigger behaviours automatically.",
    diagnosticUse:
      "If target behaviours are forgotten, cue reliability should be improved."
  },

  {
    source: "habit_stacking",
    target: "cue_reliability",
    relationship: "improves",
    strength: "moderate",
    direction: "positive",
    explanation:
      "Stacking new behaviours onto existing routines creates more reliable triggers.",
    diagnosticUse:
      "Useful when the person already has stable daily anchors."
  },

  {
    source: "feedback_loop_quality",
    target: "self_monitoring_frequency",
    relationship: "improves_quality_of",
    strength: "high",
    direction: "positive",
    explanation:
      "Good feedback loops turn monitoring data into useful decisions rather than passive tracking.",
    diagnosticUse:
      "Prevents logging without learning."
  },

  {
    source: "feedback_loop_quality",
    target: "measurement_noise_interpretation",
    relationship: "supports",
    strength: "high",
    direction: "positive",
    explanation:
      "Regular reviews help separate true trends from noisy short-term data.",
    diagnosticUse:
      "Supports better plan-adjustment decisions."
  },

  {
    source: "relapse_prevention_plan",
    target: "lapse_recovery_skill",
    relationship: "supports",
    strength: "high",
    direction: "positive",
    explanation:
      "Relapse prevention plans make recovery after disruption faster and less emotionally loaded.",
    diagnosticUse:
      "Useful for travel, holidays, illness, injury, stress, and social eating."
  },

  {
    source: "minimum_viable_behaviour",
    target: "adherence_consistency",
    relationship: "preserves",
    strength: "moderate",
    direction: "positive",
    explanation:
      "Minimum viable behaviours preserve continuity when full execution is unrealistic.",
    diagnosticUse:
      "Prevents all-or-nothing collapse during high-stress or low-recovery periods."
  },

  {
    source: "minimum_viable_behaviour",
    target: "all_or_nothing_thinking",
    relationship: "reduces_impact_of",
    strength: "moderate",
    direction: "negative",
    explanation:
      "Fallback behaviours make partial success explicit, reducing the perceived failure of imperfect days.",
    diagnosticUse:
      "Supports flexible adherence and reduces abandonment after deviations."
  },

  {
    source: "identity_alignment",
    target: "habit_design",
    relationship: "strengthens",
    strength: "moderate",
    direction: "positive",
    explanation:
      "Habits are easier to maintain when they feel aligned with the person's desired identity.",
    diagnosticUse:
      "Supports values-based habit selection."
  },

  {
    source: "routine_stability",
    target: "cue_reliability",
    relationship: "supports",
    strength: "moderate",
    direction: "positive",
    explanation:
      "Stable routines make cues more predictable and habits easier to anchor.",
    diagnosticUse:
      "When routines are unstable, the graph should favour flexible fallback strategies."
  }
];
