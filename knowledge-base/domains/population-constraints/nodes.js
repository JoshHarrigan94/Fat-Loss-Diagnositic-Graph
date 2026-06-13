export const populationConstraintsNodes = [
  {
    id: "population_obesity",
    label: "Obesity Population",
    type: "population_context",
    domain: "population-constraints",
    description:
      "A population context where higher adiposity, cardiometabolic risk, mobility limitations, stigma, medication use, and health urgency may modify fat-loss reasoning.",
    diagnosticRole: "population_modifier",
    appliesTo: ["obesity", "type_2_diabetes", "general_health"],
    reasoningPurpose:
      "Allows larger fat-loss potential while increasing attention to medical risk, stigma, functional capacity, and sustainable adherence.",
    modifies: [
      "deficit_magnitude",
      "rate_of_weight_loss",
      "glucose_insulin_regulation",
      "injury_risk_from_training",
      "psychological_safety"
    ],
    evidenceLevel: "high",
    tags: ["obesity", "population", "health-risk", "modifier"]
  },

  {
    id: "population_lean",
    label: "Lean Population",
    type: "population_context",
    domain: "population-constraints",
    description:
      "A population context where lower body fat increases the importance of lean mass retention, diet fatigue management, recovery, and conservative rates of loss.",
    diagnosticRole: "population_modifier",
    appliesTo: ["fat_loss", "body_recomposition", "bodybuilding", "performance"],
    reasoningPurpose:
      "Restricts aggressive deficit recommendations and increases weighting for muscle retention and recovery.",
    modifies: [
      "deficit_magnitude",
      "rate_of_weight_loss",
      "lean_mass_retention",
      "diet_fatigue_risk",
      "training_recovery_status"
    ],
    evidenceLevel: "high",
    tags: ["lean", "muscle-retention", "diet-fatigue", "modifier"]
  },

  {
    id: "population_older_adult",
    label: "Older Adult Population",
    type: "population_context",
    domain: "population-constraints",
    description:
      "A population context where muscle retention, function, fall risk, protein adequacy, recovery capacity, medical complexity, and independence become central.",
    diagnosticRole: "population_modifier",
    appliesTo: ["older_adults", "obesity", "chronic_illness", "general_health"],
    reasoningPurpose:
      "Prioritises function, sarcopenia risk management, resistance training, protein adequacy, and conservative intervention progression.",
    modifies: [
      "sarcopenia_risk",
      "lean_mass_retention",
      "protein_adequacy",
      "training_volume_tolerance",
      "risk_adjusted_recommendations"
    ],
    evidenceLevel: "high",
    tags: ["older-adults", "sarcopenia", "function", "modifier"]
  },

  {
    id: "population_youth",
    label: "Youth Population",
    type: "population_context",
    domain: "population-constraints",
    description:
      "A population context where growth, development, parental environment, sport participation, body image, psychological safety, and clinical oversight are central.",
    diagnosticRole: "population_modifier",
    appliesTo: ["youth", "obesity", "general_health", "performance"],
    reasoningPurpose:
      "Prevents adult-style aggressive dieting and increases priority for growth, family context, health behaviours, and psychological safety.",
    modifies: [
      "puberty_growth_context",
      "dietary_restriction_risk",
      "psychological_safety",
      "eating_disorder_risk",
      "risk_adjusted_recommendations"
    ],
    evidenceLevel: "high",
    tags: ["youth", "growth", "psychological-safety", "modifier"]
  },

  {
    id: "population_type2_diabetes",
    label: "Type 2 Diabetes Population",
    type: "population_context",
    domain: "population-constraints",
    description:
      "A population context where glucose control, medication safety, hypoglycaemia risk, weight loss benefit, activity timing, and meal composition require higher priority.",
    diagnosticRole: "population_modifier",
    appliesTo: ["type_2_diabetes", "obesity", "older_adults", "chronic_illness"],
    reasoningPurpose:
      "Increases weighting for glucose outcomes and medication-aware safety logic.",
    modifies: [
      "glucose_insulin_regulation",
      "hypoglycaemia_risk",
      "diabetes_medication_context",
      "meal_composition_glucose_effect",
      "activity_timing_for_glucose"
    ],
    evidenceLevel: "high",
    tags: ["type-2-diabetes", "glucose", "medication", "modifier"]
  },

  {
    id: "population_bodybuilder",
    label: "Bodybuilder Population",
    type: "population_context",
    domain: "population-constraints",
    description:
      "A population context where physique outcome, lean mass retention, training performance, low body-fat risk, diet fatigue, and visual assessment are heavily weighted.",
    diagnosticRole: "population_modifier",
    appliesTo: ["bodybuilding", "body_recomposition", "fat_loss", "performance"],
    reasoningPurpose:
      "Prioritises lean mass retention, training quality, conservative deficit control, and accurate recomposition interpretation.",
    modifies: [
      "lean_mass_retention",
      "training_recovery_status",
      "diet_fatigue_risk",
      "visual_leanness_signal",
      "rate_of_weight_loss"
    ],
    evidenceLevel: "high",
    tags: ["bodybuilding", "lean-mass", "physique", "modifier"]
  },

  {
    id: "population_chronic_illness",
    label: "Chronic Illness Population",
    type: "population_context",
    domain: "population-constraints",
    description:
      "A population context where fatigue, medication, symptoms, flare patterns, medical supervision, functional capacity, and recovery limitations modify intervention safety.",
    diagnosticRole: "population_modifier",
    appliesTo: ["chronic_illness", "obesity", "general_health", "older_adults"],
    reasoningPurpose:
      "Raises safety weighting and favours conservative, medically aware, low-friction interventions.",
    modifies: [
      "medication_medical_context",
      "recovery_capacity",
      "exercise_recovery_cost",
      "minimum_viable_behaviour",
      "risk_adjusted_recommendations"
    ],
    evidenceLevel: "high",
    tags: ["chronic-illness", "medical-risk", "recovery", "modifier"]
  },

  {
    id: "population_performance_athlete",
    label: "Performance Athlete Population",
    type: "population_context",
    domain: "population-constraints",
    description:
      "A population context where performance preservation, training quality, competition timing, recovery, fuelling, and injury risk heavily modify fat-loss strategy.",
    diagnosticRole: "population_modifier",
    appliesTo: ["performance", "fat_loss", "body_recomposition"],
    reasoningPurpose:
      "Protects performance and recovery while allowing body-composition manipulation only when compatible with training demands.",
    modifies: [
      "performance_decline_during_deficit",
      "training_goal_alignment",
      "training_recovery_status",
      "deficit_magnitude",
      "carbohydrate_tolerance_context"
    ],
    evidenceLevel: "high",
    tags: ["athlete", "performance", "training", "modifier"]
  },

  {
    id: "priority_fat_loss",
    label: "Fat Loss Priority",
    type: "priority_node",
    domain: "population-constraints",
    description:
      "The degree to which reducing fat mass is the dominant outcome priority.",
    diagnosticRole: "priority_modifier",
    reasoningPurpose:
      "Weights intervention decisions toward fat mass reduction when appropriate.",
    tags: ["priority", "fat-loss"]
  },

  {
    id: "priority_lean_mass_retention",
    label: "Lean Mass Retention Priority",
    type: "priority_node",
    domain: "population-constraints",
    description:
      "The degree to which preserving muscle and fat-free mass should dominate decision-making.",
    diagnosticRole: "priority_modifier",
    reasoningPurpose:
      "Raises the importance of protein, resistance training, slower loss rates, and recovery protection.",
    tags: ["priority", "lean-mass", "muscle"]
  },

  {
    id: "priority_glucose_control",
    label: "Glucose Control Priority",
    type: "priority_node",
    domain: "population-constraints",
    description:
      "The degree to which improving glucose regulation and reducing glycaemic risk should dominate intervention selection.",
    diagnosticRole: "priority_modifier",
    reasoningPurpose:
      "Weights recommendations toward glucose-aware nutrition, activity timing, and medication safety.",
    tags: ["priority", "glucose", "diabetes"]
  },

  {
    id: "priority_functional_independence",
    label: "Functional Independence Priority",
    type: "priority_node",
    domain: "population-constraints",
    description:
      "The degree to which preserving strength, mobility, balance, independence, and daily function should dominate recommendations.",
    diagnosticRole: "priority_modifier",
    reasoningPurpose:
      "Prevents weight loss from being pursued at the expense of function.",
    tags: ["priority", "function", "older-adults"]
  },

  {
    id: "priority_performance",
    label: "Performance Priority",
    type: "priority_node",
    domain: "population-constraints",
    description:
      "The degree to which sport, training, strength, endurance, or competition performance should be protected.",
    diagnosticRole: "priority_modifier",
    reasoningPurpose:
      "Prevents fat-loss interventions from undermining performance outcomes unnecessarily.",
    tags: ["priority", "performance", "athlete"]
  },

  {
    id: "priority_psychological_safety",
    label: "Psychological Safety Priority",
    type: "priority_node",
    domain: "population-constraints",
    description:
      "The degree to which recommendations should avoid shame, compulsive tracking, body image harm, or disordered eating escalation.",
    diagnosticRole: "priority_modifier",
    reasoningPurpose:
      "Raises caution around weigh-ins, calorie tracking, restriction, and appearance-focused goals.",
    tags: ["priority", "psychological-safety", "risk"]
  },

  {
    id: "constraint_low_recovery_capacity",
    label: "Low Recovery Capacity Constraint",
    type: "constraint_node",
    domain: "population-constraints",
    description:
      "A constraint where sleep, stress, illness, age, deficit size, training load, or symptoms reduce tolerance for intervention stress.",
    diagnosticRole: "constraint_modifier",
    reasoningPurpose:
      "Restricts aggressive training, calorie deficits, and rapid progression.",
    tags: ["constraint", "recovery", "fatigue"]
  },

  {
    id: "constraint_high_medical_risk",
    label: "High Medical Risk Constraint",
    type: "constraint_node",
    domain: "population-constraints",
    description:
      "A constraint where medication, clinical symptoms, diagnosed conditions, pregnancy, diabetes risk, or red flags require conservative or medically supervised recommendations.",
    diagnosticRole: "safety_constraint",
    reasoningPurpose:
      "Gates recommendations through medical safety logic.",
    tags: ["constraint", "medical-risk", "safety"]
  },

  {
    id: "constraint_growth_requirement",
    label: "Growth Requirement Constraint",
    type: "constraint_node",
    domain: "population-constraints",
    description:
      "A constraint where growth, maturation, puberty, or youth development restricts aggressive energy restriction or adult-style dieting logic.",
    diagnosticRole: "safety_constraint",
    reasoningPurpose:
      "Prioritises development, nourishment, family environment, and clinical appropriateness.",
    tags: ["constraint", "growth", "youth"]
  },

  {
    id: "constraint_high_injury_risk",
    label: "High Injury Risk Constraint",
    type: "constraint_node",
    domain: "population-constraints",
    description:
      "A constraint where pain, injury history, obesity, frailty, high fatigue, or rapid training progression increases risk from exercise escalation.",
    diagnosticRole: "safety_constraint",
    reasoningPurpose:
      "Requires conservative activity and training progression.",
    tags: ["constraint", "injury-risk", "training"]
  },

  {
    id: "constraint_low_adherence_capacity",
    label: "Low Adherence Capacity Constraint",
    type: "constraint_node",
    domain: "population-constraints",
    description:
      "A constraint where executive load, stress, low support, low self-efficacy, chaotic routine, or high plan burden limits behavioural complexity.",
    diagnosticRole: "constraint_modifier",
    reasoningPurpose:
      "Favours low-friction, default-based, habit-led interventions over complex tracking or aggressive protocols.",
    tags: ["constraint", "adherence", "behaviour"]
  }
];
