export const activityNeatEdges = [
  {
    source: "neat_baseline",
    target: "activity_energy_expenditure",
    relationship: "contributes_to",
    strength: "high",
    direction: "positive",
    explanation:
      "A higher baseline level of spontaneous daily movement increases total activity-related energy expenditure.",
    diagnosticUse:
      "Establishes whether low expenditure is partly explained by naturally low daily movement."
  },

  {
    source: "neat_adaptation",
    target: "activity_energy_expenditure",
    relationship: "reduces",
    strength: "high",
    direction: "negative",
    explanation:
      "During dieting or fatigue, people may unconsciously move less, reducing total daily energy expenditure.",
    diagnosticUse:
      "Explains slower fat loss despite apparently unchanged food intake."
  },

  {
    source: "step_count_consistency",
    target: "activity_energy_expenditure",
    relationship: "stabilises",
    strength: "high",
    direction: "positive",
    explanation:
      "Consistent step counts make daily activity expenditure more predictable.",
    diagnosticUse:
      "Useful when weight loss fluctuates due to inconsistent daily movement."
  },

  {
    source: "sedentary_time",
    target: "activity_energy_expenditure",
    relationship: "reduces",
    strength: "high",
    direction: "negative",
    explanation:
      "Higher sedentary time generally lowers non-exercise movement and total activity expenditure.",
    diagnosticUse:
      "Flags people who may benefit from movement breaks, walking, or step targets."
  },

  {
    source: "exercise_energy_compensation",
    target: "weekly_energy_deficit",
    relationship: "reduces",
    strength: "high",
    direction: "negative",
    explanation:
      "Exercise may fail to create the expected deficit if it increases intake or reduces spontaneous activity.",
    diagnosticUse:
      "Prevents assuming exercise calories automatically translate into fat loss."
  },

  {
    source: "training_load_fatigue",
    target: "neat_adaptation",
    relationship: "increases",
    strength: "moderate",
    direction: "positive",
    explanation:
      "High training fatigue can reduce spontaneous movement outside the gym.",
    diagnosticUse:
      "Useful when adding exercise appears to reduce total daily movement."
  },

  {
    source: "occupation_activity_level",
    target: "neat_baseline",
    relationship: "shapes",
    strength: "moderate",
    direction: "contextual",
    explanation:
      "Occupation strongly affects a person's baseline daily movement and sedentary exposure.",
    diagnosticUse:
      "Helps individualise step and movement targets."
  },

  {
    source: "activity_tracking_accuracy",
    target: "activity_energy_expenditure",
    relationship: "improves_confidence_in",
    strength: "high",
    direction: "positive",
    explanation:
      "Reliable tracking improves confidence that observed activity data reflects real activity behaviour.",
    diagnosticUse:
      "Avoids over-interpreting inaccurate wearable calorie estimates."
  },

  {
    source: "low_activity_bottleneck",
    target: "weekly_energy_deficit",
    relationship: "constrains",
    strength: "high",
    direction: "negative",
    explanation:
      "Very low daily activity can make fat loss harder by lowering expenditure and narrowing the available calorie budget.",
    diagnosticUse:
      "Supports recommending movement increases before further food restriction."
  },

  {
    source: "activity_recovery_tradeoff",
    target: "risk_adjusted_recommendations",
    relationship: "modifies",
    strength: "high",
    direction: "contextual",
    explanation:
      "Activity recommendations should be adjusted when recovery, injury risk, illness, or fatigue limits tolerance.",
    diagnosticUse:
      "Prevents unsafe or unrealistic increases in activity."
  },

  {
    source: "activity_recovery_tradeoff",
    target: "training_load_fatigue",
    relationship: "flags_threshold_for",
    strength: "moderate",
    direction: "contextual",
    explanation:
      "When added activity creates excessive fatigue, the plan may need redistribution rather than escalation.",
    diagnosticUse:
      "Supports intervention sequencing and recovery-aware planning."
  },

  {
    source: "exercise_energy_compensation",
    target: "behavioural_compensation",
    relationship: "is_subtype_of",
    strength: "high",
    direction: "hierarchical",
    explanation:
      "Exercise energy compensation is a specific form of broader behavioural compensation.",
    diagnosticUse:
      "Links activity-neat reasoning back to adherence-behaviour."
  },

  {
    source: "step_count_consistency",
    target: "adherence_consistency",
    relationship: "indicates",
    strength: "moderate",
    direction: "positive",
    explanation:
      "Consistent step behaviour may indicate broader consistency with the plan.",
    diagnosticUse:
      "Allows the diagnostic engine to infer execution quality from simple activity patterns."
  },

  {
    source: "neat_adaptation",
    target: "diet_fatigue",
    relationship: "may_indicate",
    strength: "moderate",
    direction: "positive",
    explanation:
      "A sustained fall in spontaneous movement may indicate accumulating diet fatigue or low energy availability.",
    diagnosticUse:
      "Creates a bridge into the future diet-fatigue domain."
  }
];