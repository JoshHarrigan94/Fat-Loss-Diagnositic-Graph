export const exerciseTrainingEdges = [
  {
    source: "resistance_training_quality",
    target: "lean_mass_retention",
    relationship: "supports",
    strength: "high",
    direction: "positive",
    explanation:
      "Effective resistance training provides the stimulus needed to retain or build muscle during fat loss.",
    diagnosticUse:
      "Low resistance training quality should be addressed before accepting lean mass loss as inevitable."
  },

  {
    source: "resistance_training_quality",
    target: "muscle_gain_potential",
    relationship: "supports",
    strength: "high",
    direction: "positive",
    explanation:
      "Appropriate progressive resistance training increases the chance of muscle gain or recomposition.",
    diagnosticUse:
      "Supports recomposition reasoning in beginners, detrained people, and higher-body-fat individuals."
  },

  {
    source: "cardio_training_dose",
    target: "activity_energy_expenditure",
    relationship: "contributes_to",
    strength: "moderate",
    direction: "positive",
    explanation:
      "Cardio training increases structured activity expenditure, although the realised deficit may be modified by compensation.",
    diagnosticUse:
      "Links exercise prescription to the activity and energy-balance layers."
  },

  {
    source: "cardio_training_dose",
    target: "glucose_insulin_regulation",
    relationship: "supports",
    strength: "high",
    direction: "positive",
    explanation:
      "Cardiovascular exercise can improve insulin sensitivity, glucose disposal, and cardiometabolic health.",
    diagnosticUse:
      "Important for type 2 diabetes and metabolic-health reasoning."
  },

  {
    source: "training_volume_tolerance",
    target: "training_recovery_status",
    relationship: "modifies",
    strength: "high",
    direction: "contextual",
    explanation:
      "Training volume is only productive if it can be recovered from.",
    diagnosticUse:
      "Determines whether the graph should increase, maintain, reduce, or redistribute training volume."
  },

  {
    source: "training_intensity_tolerance",
    target: "exercise_recovery_cost",
    relationship: "modifies",
    strength: "moderate",
    direction: "contextual",
    explanation:
      "Higher intensity can increase recovery cost, especially when sleep, calories, or tissue capacity are limited.",
    diagnosticUse:
      "Prevents aggressive training recommendations during high fatigue or low recovery."
  },

  {
    source: "exercise_recovery_cost",
    target: "recovery_debt",
    relationship: "increases",
    strength: "moderate",
    direction: "positive",
    explanation:
      "Training that exceeds recovery capacity contributes to accumulated recovery debt.",
    diagnosticUse:
      "Explains why added exercise can worsen adherence, steps, sleep, or performance."
  },

  {
    source: "exercise_recovery_cost",
    target: "hunger_pressure",
    relationship: "may_increase",
    strength: "moderate",
    direction: "positive",
    explanation:
      "Exercise can increase hunger in some people, especially when training load is high relative to intake.",
    diagnosticUse:
      "Explains why adding exercise may lead to compensation through increased intake."
  },

  {
    source: "exercise_adherence",
    target: "adherence_consistency",
    relationship: "contributes_to",
    strength: "moderate",
    direction: "positive",
    explanation:
      "Training adherence is one component of broader plan adherence.",
    diagnosticUse:
      "Separates nutrition adherence from training adherence."
  },

  {
    source: "exercise_adherence",
    target: "training_goal_alignment",
    relationship: "improves_confidence_in",
    strength: "moderate",
    direction: "positive",
    explanation:
      "Consistent training completion improves confidence that the training plan matches the person's life and goals.",
    diagnosticUse:
      "Low completion suggests the plan may not fit the person or context."
  },

  {
    source: "injury_risk_from_training",
    target: "risk_adjusted_recommendations",
    relationship: "requires_modification",
    strength: "high",
    direction: "safety",
    explanation:
      "Higher injury risk should make exercise recommendations more conservative, progressive, and individualised.",
    diagnosticUse:
      "Prevents unsafe activity escalation in vulnerable or fatigued populations."
  },

  {
    source: "training_goal_alignment",
    target: "plan_person_fit",
    relationship: "supports",
    strength: "moderate",
    direction: "positive",
    explanation:
      "Training that matches the person's goal, preferences, and capacity improves overall plan-person fit.",
    diagnosticUse:
      "Useful when training feels arbitrary, unenjoyable, or misaligned."
  },

  {
    source: "minimum_effective_training_dose",
    target: "minimum_viable_behaviour",
    relationship: "is_training_expression_of",
    strength: "moderate",
    direction: "hierarchical",
    explanation:
      "Minimum effective training dose is the exercise-specific version of maintaining the smallest useful behaviour.",
    diagnosticUse:
      "Supports continuity during fatigue, travel, illness, stress, or time pressure."
  },

  {
    source: "minimum_effective_training_dose",
    target: "lean_mass_retention",
    relationship: "helps_preserve",
    strength: "moderate",
    direction: "positive",
    explanation:
      "A minimal but sufficient resistance-training dose may help preserve lean mass when full training is not possible.",
    diagnosticUse:
      "Useful during dieting phases with low recovery or high life stress."
  },

  {
    source: "exercise_training",
    target: "risk_adjusted_recommendations",
    relationship: "modifies",
    strength: "high",
    direction: "contextual",
    explanation:
      "Exercise recommendations must be adapted to goal, recovery, injury risk, population, medical context, and adherence capacity.",
    diagnosticUse:
      "Prevents generic exercise advice from being applied blindly."
  }
];
