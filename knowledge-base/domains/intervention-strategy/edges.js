export const interventionStrategyEdges = [
  {
    source: "risk_adjusted_recommendations",
    target: "intervention_strategy_process",
    relationship: "gates",
    strength: "high",
    direction: "decision_gate",
    explanation:
      "Strategy selection should only occur after risk-adjusted reasoning has modified unsafe or inappropriate options.",
    diagnosticUse:
      "Prevents choosing an effective but unsafe strategy."
  },

  {
    source: "contraindication_output_mode",
    target: "intervention_strategy_process",
    relationship: "modifies",
    strength: "high",
    direction: "safety",
    explanation:
      "Contraindications determine which strategies are available, modified, delayed, or referred.",
    diagnosticUse:
      "Filters strategy options before selection."
  },

  {
    source: "weekly_energy_deficit",
    target: "strategy_calorie_adjustment",
    relationship: "informs",
    strength: "high",
    direction: "decision_modifier",
    explanation:
      "If the weekly deficit is insufficient and confidence is high, calorie adjustment may be an appropriate strategy.",
    diagnosticUse:
      "Connects energy-balance diagnosis to intake intervention."
  },

  {
    source: "calorie_tracking_accuracy",
    target: "strategy_monitoring_confidence",
    relationship: "informs",
    strength: "high",
    direction: "decision_modifier",
    explanation:
      "Low calorie tracking accuracy should prioritise better monitoring or simpler intake structure before cutting calories.",
    diagnosticUse:
      "Prevents reducing calories based on unreliable intake data."
  },

  {
    source: "low_activity_bottleneck",
    target: "strategy_activity_increase",
    relationship: "informs",
    strength: "high",
    direction: "decision_modifier",
    explanation:
      "Low activity can make activity increases a high-leverage strategy if recovery and injury risk allow.",
    diagnosticUse:
      "Selects movement before further restriction when appropriate."
  },

  {
    source: "nutrition_quality",
    target: "strategy_nutrition_quality",
    relationship: "informs",
    strength: "high",
    direction: "decision_modifier",
    explanation:
      "Poor nutrition quality supports improving protein, fibre, food structure, and nutrient density before increasing restriction.",
    diagnosticUse:
      "Selects food-quality improvement as a first-line strategy."
  },

  {
    source: "hunger_pressure",
    target: "strategy_appetite_management",
    relationship: "informs",
    strength: "high",
    direction: "decision_modifier",
    explanation:
      "High hunger pressure indicates appetite management may improve adherence.",
    diagnosticUse:
      "Treats hunger as a system issue rather than a discipline issue."
  },

  {
    source: "recovery_risk_level",
    target: "strategy_recovery_repair",
    relationship: "informs",
    strength: "high",
    direction: "decision_modifier",
    explanation:
      "High recovery risk suggests the next strategy should reduce strain rather than escalate the deficit.",
    diagnosticUse:
      "Prevents adding diet or exercise stress when recovery is the bottleneck."
  },

  {
    source: "resistance_training_quality",
    target: "strategy_training_adjustment",
    relationship: "informs",
    strength: "high",
    direction: "decision_modifier",
    explanation:
      "Poor resistance training quality may require training adjustment to protect lean mass.",
    diagnosticUse:
      "Links body-composition priorities to training changes."
  },

  {
    source: "constraint_low_adherence_capacity",
    target: "strategy_habit_environment_design",
    relationship: "informs",
    strength: "high",
    direction: "decision_modifier",
    explanation:
      "Low adherence capacity indicates the intervention should reduce friction and simplify execution.",
    diagnosticUse:
      "Selects habit and environment design over complex protocols."
  },

  {
    source: "weight_trend_confidence",
    target: "strategy_monitoring_confidence",
    relationship: "informs",
    strength: "high",
    direction: "decision_modifier",
    explanation:
      "Low trend confidence means the graph should improve measurement or observe longer before changing the plan.",
    diagnosticUse:
      "Prevents false plateau interventions."
  },

  {
    source: "diet_break_readiness",
    target: "strategy_diet_break_or_maintenance",
    relationship: "informs",
    strength: "high",
    direction: "decision_modifier",
    explanation:
      "High diet break readiness suggests reducing deficit pressure may be more appropriate than further restriction.",
    diagnosticUse:
      "Selects maintenance or diet break when fatigue is the limiting factor."
  },

  {
    source: "medical_review_needed",
    target: "strategy_medical_review",
    relationship: "activates",
    strength: "high",
    direction: "safety",
    explanation:
      "When medical review is needed, clinical review becomes the primary strategy.",
    diagnosticUse:
      "Stops unsupported lifestyle-only escalation."
  },

  {
    source: "priority_glucose_control",
    target: "strategy_nutrition_quality",
    relationship: "increases_priority_of",
    strength: "moderate",
    direction: "priority_modifier",
    explanation:
      "When glucose control is prioritised, meal composition and food quality become higher-leverage strategies.",
    diagnosticUse:
      "Improves selection for type 2 diabetes contexts."
  },

  {
    source: "priority_lean_mass_retention",
    target: "strategy_training_adjustment",
    relationship: "increases_priority_of",
    strength: "high",
    direction: "priority_modifier",
    explanation:
      "When lean mass retention is high priority, training and protein-supporting strategies become more important.",
    diagnosticUse:
      "Biases toward resistance training quality and conservative rate of loss."
  },

  {
    source: "priority_psychological_safety",
    target: "strategy_monitoring_confidence",
    relationship: "modifies",
    strength: "high",
    direction: "safety",
    explanation:
      "Psychological safety modifies how monitoring can be used and may require lower-risk alternatives.",
    diagnosticUse:
      "Prevents strict tracking from becoming the default."
  },

  {
    source: "intervention_strategy_process",
    target: "intervention_strategy_selection",
    relationship: "outputs",
    strength: "high",
    direction: "decision_output",
    explanation:
      "The strategy process produces selected primary and secondary intervention strategies.",
    diagnosticUse:
      "Feeds into intervention sequencing."
  },

  {
    source: "intervention_strategy_selection",
    target: "sequencing",
    relationship: "feeds",
    strength: "high",
    direction: "decision_output",
    explanation:
      "Selected strategies must be ordered by leverage, safety, burden, and readiness.",
    diagnosticUse:
      "Creates the handoff to the sequencing domain."
  }
];
