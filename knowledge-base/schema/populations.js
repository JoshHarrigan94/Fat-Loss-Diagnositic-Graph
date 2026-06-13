/**
 * populations.js
 *
 * Population ontology for the Fat Loss Knowledge Graph.
 *
 * Purpose:
 * - Define major user populations
 * - Describe how each population modifies fat-loss interpretation
 * - Avoid building separate graphs for every user group
 */

export const POPULATIONS = {
  general_adult: {
    id: "general_adult",
    label: "General Adult",
    description:
      "Adults seeking fat loss for health, appearance, energy or general wellbeing.",
    modifies: [
      "energy_balance",
      "adherence",
      "activity",
      "sleep",
      "diet_quality"
    ],
    priorityRisks: [
      "diet_fatigue",
      "muscle_loss",
      "rebound_weight_gain"
    ],
    defaultConstraints: [
      "time_availability",
      "budget",
      "social_eating"
    ]
  },

  bodybuilder: {
    id: "bodybuilder",
    label: "Bodybuilder / Physique Athlete",
    description:
      "Users seeking fat loss while maximising muscle retention, visual condition, training performance and leanness.",
    modifies: [
      "body_composition",
      "water_retention",
      "glycogen",
      "training_performance",
      "muscle_retention"
    ],
    priorityRisks: [
      "muscle_loss",
      "low_energy_availability",
      "training_performance_drop",
      "diet_fatigue"
    ],
    defaultConstraints: [
      "high_protein_requirement",
      "training_volume",
      "scale_noise_from_glycogen",
      "appearance_pressure"
    ]
  },

  obesity: {
    id: "obesity",
    label: "Obesity",
    description:
      "Users with high body fat where fat loss may be pursued for health, mobility, cardiometabolic improvement and quality of life.",
    modifies: [
      "energy_balance",
      "satiety",
      "mobility",
      "cardiometabolic_risk",
      "intervention_safety"
    ],
    priorityRisks: [
      "joint_pain",
      "low_mobility",
      "weight_stigma",
      "rapid_rebound",
      "nutrient_poor_dieting"
    ],
    defaultConstraints: [
      "mobility_limitations",
      "medication_context",
      "hunger_pressure",
      "psychological_burden"
    ]
  },

  type_2_diabetes: {
    id: "type_2_diabetes",
    label: "Type 2 Diabetes / Insulin Resistance",
    description:
      "Users where fat loss intersects with glucose regulation, insulin sensitivity, medication and cardiometabolic risk.",
    modifies: [
      "carbohydrate_strategy",
      "glucose_control",
      "meal_timing",
      "activity_after_meals",
      "medical_risk"
    ],
    priorityRisks: [
      "hypoglycaemia",
      "hyperglycaemia",
      "medication_interaction",
      "cardiometabolic_risk"
    ],
    defaultConstraints: [
      "glucose_monitoring",
      "medication_status",
      "clinical_supervision",
      "carbohydrate_tolerance"
    ]
  },

  chronic_illness: {
    id: "chronic_illness",
    label: "Chronic Illness",
    description:
      "Users whose fatigue, pain, inflammation, medication or disease state changes recovery capacity and intervention tolerance.",
    modifies: [
      "recovery_capacity",
      "fatigue",
      "exercise_tolerance",
      "medical_context",
      "intervention_safety"
    ],
    priorityRisks: [
      "symptom_flare",
      "excess_fatigue",
      "under_recovery",
      "nutritional_insufficiency"
    ],
    defaultConstraints: [
      "variable_capacity",
      "medication_context",
      "clinical_supervision",
      "flare_management"
    ]
  },

  older_adult: {
    id: "older_adult",
    label: "Older Adult",
    description:
      "Older users where fat loss must be balanced against muscle retention, bone health, function, frailty risk and independence.",
    modifies: [
      "protein_requirement",
      "resistance_training_priority",
      "muscle_retention",
      "bone_health",
      "fall_risk"
    ],
    priorityRisks: [
      "sarcopenia",
      "frailty",
      "bone_loss",
      "falls",
      "under_nutrition"
    ],
    defaultConstraints: [
      "mobility",
      "joint_tolerance",
      "medical_context",
      "recovery_capacity"
    ]
  },

  youth: {
    id: "youth",
    label: "Youth / Adolescent",
    description:
      "Young users where fat-loss advice must be handled carefully due to growth, development, safeguarding and eating-disorder risk.",
    modifies: [
      "growth",
      "energy_availability",
      "body_image_risk",
      "safeguarding",
      "intervention_safety"
    ],
    priorityRisks: [
      "growth_impairment",
      "eating_disorder_risk",
      "low_energy_availability",
      "psychological_harm"
    ],
    defaultConstraints: [
      "guardian_involvement",
      "clinical_supervision",
      "growth_phase",
      "safeguarding"
    ]
  },

  athlete: {
    id: "athlete",
    label: "Athlete",
    description:
      "Users balancing fat loss against sport performance, training adaptation, recovery and competition timing.",
    modifies: [
      "performance",
      "training_load",
      "recovery",
      "periodisation",
      "energy_availability"
    ],
    priorityRisks: [
      "performance_drop",
      "injury_risk",
      "under_recovery",
      "low_energy_availability"
    ],
    defaultConstraints: [
      "competition_calendar",
      "training_load",
      "sport_demands",
      "recovery_budget"
    ]
  },

  sedentary_professional: {
    id: "sedentary_professional",
    label: "Sedentary Professional",
    description:
      "Users whose fat-loss barriers often relate to low NEAT, desk work, stress, time scarcity and convenience eating.",
    modifies: [
      "neet",
      "meal_environment",
      "stress_load",
      "time_availability",
      "habit_design"
    ],
    priorityRisks: [
      "low_activity",
      "stress_eating",
      "poor_sleep",
      "adherence_drift"
    ],
    defaultConstraints: [
      "desk_work",
      "commute",
      "work_stress",
      "meal_prep_time"
    ]
  },

  neurodivergent_user: {
    id: "neurodivergent_user",
    label: "Neurodivergent User",
    description:
      "Users whose adherence and intervention design may be affected by executive function, sensory preferences, routine, medication or burnout.",
    modifies: [
      "adherence_design",
      "routine_stability",
      "sensory_food_preferences",
      "executive_function",
      "stress_load"
    ],
    priorityRisks: [
      "overly_complex_plan",
      "burnout",
      "meal_repetition_failure",
      "all_or_nothing_tracking"
    ],
    defaultConstraints: [
      "executive_function",
      "routine_need",
      "sensory_preference",
      "medication_context"
    ]
  },

  menopause_transition: {
    id: "menopause_transition",
    label: "Menopause / Hormonal Transition",
    description:
      "Users whose fat-loss experience may be affected by hormonal changes, sleep disruption, body-composition shifts and symptom burden.",
    modifies: [
      "sleep",
      "water_retention",
      "fat_distribution",
      "training_recovery",
      "appetite"
    ],
    priorityRisks: [
      "muscle_loss",
      "bone_loss",
      "sleep_disruption",
      "central_fat_gain"
    ],
    defaultConstraints: [
      "symptom_variability",
      "sleep_quality",
      "medical_context",
      "training_recovery"
    ]
  }
};

export function getPopulation(populationId) {
  return POPULATIONS[populationId] || null;
}

export function listPopulations() {
  return Object.values(POPULATIONS);
}

export function isValidPopulation(populationId) {
  return Boolean(POPULATIONS[populationId]);
}
