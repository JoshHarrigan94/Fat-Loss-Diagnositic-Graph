export const recoverySleepEdges = [
  {
    source: "sleep_duration",
    target: "recovery_capacity",
    relationship: "supports",
    strength: "high",
    direction: "positive",
    explanation:
      "Adequate sleep duration improves the body's ability to recover from diet, training, stress, and daily activity.",
    diagnosticUse:
      "Low sleep duration lowers confidence that the current plan is recoverable."
  },

  {
    source: "sleep_quality",
    target: "recovery_capacity",
    relationship: "supports",
    strength: "high",
    direction: "positive",
    explanation:
      "High-quality sleep improves restoration even when total time in bed is similar.",
    diagnosticUse:
      "Useful when sleep duration appears adequate but fatigue remains high."
  },

  {
    source: "stress_load",
    target: "recovery_capacity",
    relationship: "reduces",
    strength: "moderate",
    direction: "negative",
    explanation:
      "Higher life stress consumes recovery resources and can reduce tolerance for dieting or training.",
    diagnosticUse:
      "Explains why aggressive interventions may fail during high-stress periods."
  },

  {
    source: "subjective_fatigue",
    target: "adherence_consistency",
    relationship: "reduces",
    strength: "moderate",
    direction: "negative",
    explanation:
      "Fatigue makes planning, cooking, training, walking, and resisting cravings harder.",
    diagnosticUse:
      "Connects recovery state to behavioural execution."
  },

  {
    source: "sleep_related_hunger_pressure",
    target: "calorie_tracking_accuracy",
    relationship: "reduces",
    strength: "moderate",
    direction: "negative",
    explanation:
      "Poor sleep may increase snacking, cravings, and impulsive eating, which are commonly under-tracked.",
    diagnosticUse:
      "Explains hidden intake drift after poor sleep."
  },

  {
    source: "sleep_related_hunger_pressure",
    target: "adherence_consistency",
    relationship: "reduces",
    strength: "high",
    direction: "negative",
    explanation:
      "Greater hunger and cravings make consistent adherence harder.",
    diagnosticUse:
      "Supports sleep intervention before further calorie reduction."
  },

  {
    source: "water_retention_from_stress",
    target: "measurement_noise_interpretation",
    relationship: "requires",
    strength: "high",
    direction: "contextual",
    explanation:
      "Stress and poor recovery can create temporary scale increases unrelated to fat gain.",
    diagnosticUse:
      "Prevents overreacting to short-term weight spikes."
  },

  {
    source: "training_recovery_status",
    target: "training_load_fatigue",
    relationship: "modifies",
    strength: "high",
    direction: "contextual",
    explanation:
      "Poor recovery status increases the fatigue cost of a given training load.",
    diagnosticUse:
      "Helps decide whether training volume should be reduced or redistributed."
  },

  {
    source: "recovery_debt",
    target: "neat_adaptation",
    relationship: "increases",
    strength: "moderate",
    direction: "positive",
    explanation:
      "Accumulated fatigue can reduce spontaneous movement and daily activity.",
    diagnosticUse:
      "Explains falling steps or sedentary drift during a diet."
  },

  {
    source: "recovery_debt",
    target: "perceived_plan_burden",
    relationship: "increases",
    strength: "moderate",
    direction: "positive",
    explanation:
      "When recovery debt accumulates, the same plan feels harder to execute.",
    diagnosticUse:
      "Explains why a previously manageable diet may suddenly feel unsustainable."
  },

  {
    source: "circadian_regularity",
    target: "sleep_quality",
    relationship: "supports",
    strength: "moderate",
    direction: "positive",
    explanation:
      "Stable daily rhythms often improve sleep quality and energy regulation.",
    diagnosticUse:
      "Useful where inconsistent sleep timing or shift work disrupts recovery."
  },

  {
    source: "circadian_regularity",
    target: "glucose_insulin_regulation",
    relationship: "supports",
    strength: "moderate",
    direction: "positive",
    explanation:
      "More regular sleep and meal timing can support better glucose regulation.",
    diagnosticUse:
      "Creates a bridge to the future glucose-insulin domain."
  },

  {
    source: "sleep_disordered_breathing_risk",
    target: "sleep_quality",
    relationship: "reduces",
    strength: "high",
    direction: "negative",
    explanation:
      "Sleep-disordered breathing can fragment sleep and impair perceived restoration.",
    diagnosticUse:
      "Flags possible medical causes of poor recovery."
  },

  {
    source: "sleep_disordered_breathing_risk",
    target: "risk_management",
    relationship: "requires_medical_triage",
    strength: "high",
    direction: "safety",
    explanation:
      "Symptoms such as loud snoring, witnessed apnoea, morning headaches, or severe daytime sleepiness may require clinical assessment.",
    diagnosticUse:
      "Prevents the graph from treating potentially medical sleep issues as simple lifestyle problems."
  },

  {
    source: "recovery_capacity",
    target: "risk_adjusted_recommendations",
    relationship: "modifies",
    strength: "high",
    direction: "contextual",
    explanation:
      "Lower recovery capacity should make recommendations more conservative, staged, and easier to adhere to.",
    diagnosticUse:
      "Supports intervention intelligence and safe sequencing."
  }
];