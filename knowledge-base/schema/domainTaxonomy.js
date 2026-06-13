/**
 * domainTaxonomy.js
 *
 * Domain taxonomy for the Fat Loss Knowledge Graph.
 *
 * Purpose:
 * - Define the major knowledge domains
 * - Keep the graph organised as it scales to hundreds/thousands of nodes
 * - Support filtering, graph navigation and population overlays
 */

export const DOMAIN_TAXONOMY = {
  energy_balance: {
    id: "energy_balance",
    label: "Energy Balance",
    description:
      "The relationship between energy intake, energy expenditure and body tissue change.",
    coreQuestions: [
      "Is there a real calorie deficit?",
      "Is the deficit large enough to detect?",
      "Is the maintenance estimate wrong?",
      "Is the expected loss different from observed loss?"
    ],
    keyNodeTypes: [
      "input",
      "mechanism",
      "signal",
      "diagnosis",
      "intervention"
    ]
  },

  appetite_satiety: {
    id: "appetite_satiety",
    label: "Appetite & Satiety",
    description:
      "Hunger, fullness, cravings, food reward and the ability to sustain the diet.",
    coreQuestions: [
      "Is hunger driving adherence drift?",
      "Is food quality supporting satiety?",
      "Is the deficit too aggressive for the user?",
      "Are cravings or food reward undermining consistency?"
    ],
    keyNodeTypes: [
      "behaviour",
      "mechanism",
      "signal",
      "risk",
      "intervention"
    ]
  },

  nutrition_quality: {
    id: "nutrition_quality",
    label: "Nutrition Quality",
    description:
      "Protein, fibre, micronutrients, food volume, meal structure and diet composition.",
    coreQuestions: [
      "Is protein sufficient?",
      "Is fibre supporting satiety and digestion?",
      "Is food quality supporting health during the deficit?",
      "Is diet composition causing scale noise?"
    ],
    keyNodeTypes: [
      "input",
      "behaviour",
      "mechanism",
      "risk",
      "intervention"
    ]
  },

  adherence_behaviour: {
    id: "adherence_behaviour",
    label: "Adherence & Behaviour",
    description:
      "The behavioural patterns that determine whether the plan is actually being followed.",
    coreQuestions: [
      "Is intake consistent?",
      "Are weekends undermining the deficit?",
      "Is logging accurate enough?",
      "Is the plan too complex or restrictive?"
    ],
    keyNodeTypes: [
      "behaviour",
      "signal",
      "diagnosis",
      "constraint",
      "intervention"
    ]
  },

  activity_neat: {
    id: "activity_neat",
    label: "Activity & NEAT",
    description:
      "Steps, spontaneous movement, occupational activity and non-exercise energy expenditure.",
    coreQuestions: [
      "Have steps dropped?",
      "Has NEAT compensated downward?",
      "Can activity increase deficit without more hunger?",
      "Is low movement a major limiting factor?"
    ],
    keyNodeTypes: [
      "input",
      "behaviour",
      "mechanism",
      "signal",
      "intervention"
    ]
  },

  exercise_training: {
    id: "exercise_training",
    label: "Exercise & Training",
    description:
      "Resistance training, cardio, performance, training load and muscle-retention strategy.",
    coreQuestions: [
      "Is training supporting muscle retention?",
      "Is training load creating fatigue or water retention?",
      "Is cardio helping or interfering?",
      "Is performance declining during the deficit?"
    ],
    keyNodeTypes: [
      "input",
      "behaviour",
      "mechanism",
      "risk",
      "intervention"
    ]
  },

  recovery_sleep: {
    id: "recovery_sleep",
    label: "Recovery & Sleep",
    description:
      "Sleep duration, sleep quality, recovery capacity, HRV and readiness.",
    coreQuestions: [
      "Is poor sleep impairing recovery?",
      "Is recovery stress distorting scale weight?",
      "Is fatigue reducing adherence or activity?",
      "Should the next intervention be recovery-focused?"
    ],
    keyNodeTypes: [
      "input",
      "biomarker",
      "mechanism",
      "signal",
      "intervention"
    ]
  },

  stress_psychology: {
    id: "stress_psychology",
    label: "Stress & Psychology",
    description:
      "Psychological stress, emotional eating, motivation, body image and cognitive load.",
    coreQuestions: [
      "Is stress increasing hunger or drift?",
      "Is the plan psychologically sustainable?",
      "Is body image pressure creating risk?",
      "Is executive function limiting adherence?"
    ],
    keyNodeTypes: [
      "context",
      "behaviour",
      "mechanism",
      "risk",
      "constraint"
    ]
  },

  metabolism_adaptation: {
    id: "metabolism_adaptation",
    label: "Metabolism & Adaptation",
    description:
      "Adaptive thermogenesis, metabolic rate, diet duration and compensation mechanisms.",
    coreQuestions: [
      "Has expenditure adapted downward?",
      "Is the deficit prolonged enough for adaptation?",
      "Is the user experiencing diet fatigue?",
      "Is a diet break or maintenance phase appropriate?"
    ],
    keyNodeTypes: [
      "mechanism",
      "signal",
      "diagnosis",
      "risk",
      "intervention"
    ]
  },

  hormones_life_stage: {
    id: "hormones_life_stage",
    label: "Hormones & Life Stage",
    description:
      "Sex hormones, menstrual cycle, menopause, puberty, thyroid context and life-stage constraints.",
    coreQuestions: [
      "Is life stage modifying interpretation?",
      "Is water retention hormonally influenced?",
      "Is aggressive dieting inappropriate?",
      "Is medical referral needed?"
    ],
    keyNodeTypes: [
      "context",
      "biomarker",
      "mechanism",
      "contraindication",
      "risk"
    ]
  },

  glucose_insulin: {
    id: "glucose_insulin",
    label: "Glucose & Insulin",
    description:
      "Glucose regulation, insulin sensitivity, diabetes context, carbohydrate tolerance and medication risk.",
    coreQuestions: [
      "Is glucose control a primary outcome?",
      "Does medication alter safety?",
      "Should carbohydrate strategy be modified?",
      "Is post-meal activity useful?"
    ],
    keyNodeTypes: [
      "biomarker",
      "input",
      "mechanism",
      "risk",
      "intervention"
    ]
  },

  gut_digestion: {
    id: "gut_digestion",
    label: "Gut & Digestion",
    description:
      "Gut content, bowel regularity, fibre tolerance, bloating and digestion-related scale noise.",
    coreQuestions: [
      "Is gut content masking scale weight?",
      "Is fibre helping or worsening symptoms?",
      "Are bowel changes affecting interpretation?",
      "Is food volume too variable?"
    ],
    keyNodeTypes: [
      "input",
      "mechanism",
      "signal",
      "measurement",
      "intervention"
    ]
  },

  water_scale_noise: {
    id: "water_scale_noise",
    label: "Water Retention & Scale Noise",
    description:
      "Water retention, glycogen, sodium, inflammation, gut content and measurement noise.",
    coreQuestions: [
      "Is fat loss being masked?",
      "Is volatility recovery-driven or diet-driven?",
      "Should calories be held steady?",
      "How should scale weight be interpreted?"
    ],
    keyNodeTypes: [
      "mechanism",
      "signal",
      "diagnosis",
      "measurement",
      "intervention"
    ]
  },

  body_composition: {
    id: "body_composition",
    label: "Body Composition",
    description:
      "Fat mass, lean mass, muscle retention, visual condition and anthropometric change.",
    coreQuestions: [
      "Is weight loss mostly fat?",
      "Is lean mass being protected?",
      "Are measurements confirming scale change?",
      "Is the goal appearance, health or performance?"
    ],
    keyNodeTypes: [
      "measurement",
      "outcome",
      "risk",
      "mechanism",
      "intervention"
    ]
  },

  medication_medical: {
    id: "medication_medical",
    label: "Medication & Medical Context",
    description:
      "Medication effects, medical conditions, clinical red flags and referral constraints.",
    coreQuestions: [
      "Could medication affect weight, appetite or glucose?",
      "Is medical supervision needed?",
      "Are there safety constraints?",
      "Is the graph allowed to recommend this intervention?"
    ],
    keyNodeTypes: [
      "context",
      "biomarker",
      "contraindication",
      "risk",
      "intervention"
    ]
  },

  population_constraints: {
    id: "population_constraints",
    label: "Population Constraints",
    description:
      "Population-specific modifiers for youth, older adults, athletes, diabetics, obesity and chronic illness.",
    coreQuestions: [
      "Who is this person?",
      "What advice should be modified?",
      "What risks matter most?",
      "Which interventions are inappropriate?"
    ],
    keyNodeTypes: [
      "population",
      "constraint",
      "risk",
      "contraindication",
      "intervention"
    ]
  },

  risk_management: {
    id: "risk_management",
    label: "Risk Management",
    description:
      "The safety layer that prevents inappropriate, excessive or harmful recommendations.",
    coreQuestions: [
      "What could go wrong?",
      "What should not be recommended?",
      "What requires clinical supervision?",
      "What should trigger caution?"
    ],
    keyNodeTypes: [
      "risk",
      "contraindication",
      "population",
      "context",
      "intervention"
    ]
  },

  intervention_strategy: {
    id: "intervention_strategy",
    label: "Intervention Strategy",
    description:
      "Choosing, ranking and sequencing fat-loss interventions based on impact, risk, confidence and user context.",
    coreQuestions: [
      "What should change first?",
      "What is the lowest-risk lever?",
      "What intervention targets the strongest mechanism?",
      "How should interventions be sequenced?"
    ],
    keyNodeTypes: [
      "intervention",
      "diagnosis",
      "constraint",
      "risk",
      "outcome"
    ]
  }
};

export function getDomain(domainId) {
  return DOMAIN_TAXONOMY[domainId] || null;
}

export function listDomains() {
  return Object.values(DOMAIN_TAXONOMY);
}

export function isValidDomain(domainId) {
  return Boolean(DOMAIN_TAXONOMY[domainId]);
}