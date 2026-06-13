/**
 * Energy Balance Domain
 *
 * Core physics layer of fat loss.
 */

export const ENERGY_BALANCE_NODES = [

  {
    id: "energy_balance",
    label: "Energy Balance",
    type: "mechanism",
    domain: "energy_balance",
    description:
      "The relationship between energy intake and energy expenditure over time.",
    populationApplicability: ["all"],
    evidenceLevel: "systematic_review",
    confidence: 95,
    coachingImplication:
      "Long-term body mass change is governed by energy balance.",
    observedBy: [
      "body_weight_trend",
      "body_composition_change"
    ]
  },

  {
    id: "energy_intake",
    label: "Energy Intake",
    type: "input",
    domain: "energy_balance",
    description:
      "Calories consumed through food and drink.",
    populationApplicability: ["all"],
    evidenceLevel: "systematic_review",
    confidence: 95,
    coachingImplication:
      "Energy intake is the largest controllable variable in most fat-loss plans."
  },

  {
    id: "energy_expenditure",
    label: "Energy Expenditure",
    type: "mechanism",
    domain: "energy_balance",
    description:
      "Total calories expended through metabolism, movement, digestion and exercise.",
    populationApplicability: ["all"],
    evidenceLevel: "systematic_review",
    confidence: 95,
    coachingImplication:
      "Most users overestimate expenditure and underestimate intake."
  },

  {
    id: "calorie_deficit",
    label: "Calorie Deficit",
    type: "mechanism",
    domain: "energy_balance",
    description:
      "A state where energy expenditure exceeds energy intake.",
    populationApplicability: ["all"],
    evidenceLevel: "systematic_review",
    confidence: 95,
    coachingImplication:
      "Sustained fat loss requires a sustained deficit."
  },

  {
    id: "calorie_surplus",
    label: "Calorie Surplus",
    type: "mechanism",
    domain: "energy_balance",
    description:
      "A state where energy intake exceeds expenditure.",
    populationApplicability: ["all"],
    evidenceLevel: "systematic_review",
    confidence: 95,
    coachingImplication:
      "Sustained surplus drives tissue gain."
  },

  {
    id: "maintenance_calories",
    label: "Maintenance Calories",
    type: "mechanism",
    domain: "energy_balance",
    description:
      "The intake level where body mass is maintained over time.",
    populationApplicability: ["all"],
    evidenceLevel: "systematic_review",
    confidence: 90,
    coachingImplication:
      "Maintenance is dynamic and changes with weight, activity and adaptation."
  },

  {
    id: "fat_mass",
    label: "Fat Mass",
    type: "outcome",
    domain: "energy_balance",
    description:
      "Stored body fat tissue.",
    populationApplicability: ["all"],
    evidenceLevel: "systematic_review",
    confidence: 95,
    coachingImplication:
      "The primary target outcome for most fat-loss users."
  },

  {
    id: "body_weight_trend",
    label: "Body Weight Trend",
    type: "signal",
    domain: "energy_balance",
    description:
      "The smoothed direction of body weight over time.",
    populationApplicability: ["all"],
    evidenceLevel: "mechanistic_evidence",
    confidence: 90,
    coachingImplication:
      "Trend beats individual weigh-ins."
  },

  {
    id: "expected_fat_loss",
    label: "Expected Fat Loss",
    type: "signal",
    domain: "energy_balance",
    description:
      "Predicted fat loss from observed deficit size.",
    populationApplicability: ["all"],
    evidenceLevel: "mechanistic_evidence",
    confidence: 85,
    coachingImplication:
      "Expected and actual outcomes should be compared continuously."
  },

  {
    id: "energy_balance_mismatch",
    label: "Energy Balance Mismatch",
    type: "diagnosis",
    domain: "energy_balance",
    description:
      "Observed weight change differs significantly from expected weight change.",
    populationApplicability: ["all"],
    evidenceLevel: "coaching_heuristic",
    confidence: 80,
    coachingImplication:
      "Mismatch triggers investigation of adherence, water retention, expenditure or measurement quality."
  }
];