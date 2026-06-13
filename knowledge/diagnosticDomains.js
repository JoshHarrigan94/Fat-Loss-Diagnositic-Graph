/**
 * diagnosticDomains.js
 *
 * Master diagnostic domain map.
 *
 * Purpose:
 * - Define the major competing explanations for stalled fat loss
 * - Keep domain knowledge separate from rules, graph rendering and UI
 * - Support richer reasoning than simple rule triggers
 */

export const DIAGNOSTIC_DOMAINS = {
  energy_balance_failure: {
    id: "energy_balance_failure",
    title: "Energy balance failure",
    description:
      "The expected deficit may not be large enough, or intake/expenditure assumptions may be wrong.",
    graphNodes: [
      "energy_balance",
      "calories_in",
      "calories_out",
      "expected_weight_loss",
      "true_plateau"
    ],
    relatedDiagnoses: [
      "true_plateau"
    ]
  },

  adherence_drift: {
    id: "adherence_drift",
    title: "Adherence / logging drift",
    description:
      "The planned deficit may be reduced by inconsistent intake, weekend drift, tracking gaps or logging inaccuracy.",
    graphNodes: [
      "adherence",
      "logging_accuracy",
      "weekend_drift",
      "calorie_variability",
      "mismatch"
    ],
    relatedDiagnoses: [
      "adherence_drift"
    ]
  },

  reduced_expenditure: {
    id: "reduced_expenditure",
    title: "Reduced expenditure / NEAT compensation",
    description:
      "The deficit may be reduced because activity, steps or spontaneous movement has dropped.",
    graphNodes: [
      "steps",
      "neet",
      "calories_out",
      "reduced_expenditure"
    ],
    relatedDiagnoses: [
      "reduced_expenditure"
    ]
  },

  water_retention_masking: {
    id: "water_retention_masking",
    title: "Water retention / scale masking",
    description:
      "Fat loss may be occurring but hidden by water retention, glycogen, sodium, gut content or inflammation.",
    graphNodes: [
      "water_retention",
      "weight_volatility",
      "masked_fat_loss",
      "recovery_water_retention",
      "dietary_water_retention"
    ],
    relatedDiagnoses: [
      "masked_fat_loss",
      "recovery_water_retention",
      "dietary_water_retention"
    ]
  },

  recovery_stress_interference: {
    id: "recovery_stress_interference",
    title: "Recovery / stress interference",
    description:
      "Poor sleep, high training load, stress or illness may distort scale weight and reduce adaptive capacity.",
    graphNodes: [
      "recovery",
      "poor_sleep_recovery",
      "training_inflammation",
      "stress_load",
      "illness_inflammation"
    ],
    relatedDiagnoses: [
      "recovery_masking",
      "recovery_water_retention"
    ]
  },

  measurement_noise: {
    id: "measurement_noise",
    title: "Measurement noise / insufficient signal",
    description:
      "There may not be enough reliable data to distinguish a true plateau from normal short-term variation.",
    graphNodes: [
      "scale_weight",
      "weight_trend",
      "weight_volatility",
      "data_quality",
      "insufficient_signal"
    ],
    relatedDiagnoses: [
      "insufficient_signal"
    ]
  },

  diet_fatigue_hunger_pressure: {
    id: "diet_fatigue_hunger_pressure",
    title: "Diet fatigue / hunger pressure",
    description:
      "Hunger, low flexibility, low food satisfaction or long dieting duration may increase drift risk.",
    graphNodes: [
      "hunger",
      "diet_fatigue",
      "satiety",
      "food_flexibility",
      "adherence"
    ],
    relatedDiagnoses: []
  },

  adaptive_expenditure: {
    id: "adaptive_expenditure",
    title: "Adaptive expenditure",
    description:
      "Prolonged dieting may reduce expenditure through lower NEAT, lower training output or metabolic adaptation.",
    graphNodes: [
      "adaptive_thermogenesis",
      "neet",
      "training_output",
      "calories_out"
    ],
    relatedDiagnoses: []
  }
};

export function getDiagnosticDomain(domainId) {
  return DIAGNOSTIC_DOMAINS[domainId] || null;
}

export function listDiagnosticDomains() {
  return Object.values(DIAGNOSTIC_DOMAINS);
}
