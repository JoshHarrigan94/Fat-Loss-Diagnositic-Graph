/**
 * edges.js
 *
 * Energy Balance domain edges.
 */

export const ENERGY_BALANCE_EDGES = [
  {
    source: "energy_intake",
    target: "energy_balance",
    relationship: "contributes_to",
    domain: "energy_balance",
    description:
      "Energy intake is one side of the energy balance equation.",
    evidenceLevel: "systematic_review",
    confidence: 95,
    populationApplicability: ["all"],
    mechanismStrength: "high"
  },

  {
    source: "energy_expenditure",
    target: "energy_balance",
    relationship: "contributes_to",
    domain: "energy_balance",
    description:
      "Energy expenditure is one side of the energy balance equation.",
    evidenceLevel: "systematic_review",
    confidence: 95,
    populationApplicability: ["all"],
    mechanismStrength: "high"
  },

  {
    source: "calorie_deficit",
    target: "fat_mass",
    relationship: "reduces",
    domain: "energy_balance",
    description:
      "A sustained calorie deficit reduces fat mass over time.",
    evidenceLevel: "systematic_review",
    confidence: 95,
    populationApplicability: ["all"],
    mechanismStrength: "high"
  },

  {
    source: "calorie_surplus",
    target: "fat_mass",
    relationship: "increases",
    domain: "energy_balance",
    description:
      "A sustained calorie surplus can increase stored body tissue, including fat mass.",
    evidenceLevel: "systematic_review",
    confidence: 90,
    populationApplicability: ["all"],
    mechanismStrength: "high"
  },

  {
    source: "maintenance_calories",
    target: "energy_balance",
    relationship: "modifies",
    domain: "energy_balance",
    description:
      "Maintenance calories define the intake level where energy balance is approximately neutral.",
    evidenceLevel: "systematic_review",
    confidence: 90,
    populationApplicability: ["all"],
    mechanismStrength: "high"
  },

  {
    source: "calorie_deficit",
    target: "expected_fat_loss",
    relationship: "causes",
    domain: "energy_balance",
    description:
      "The size and duration of a calorie deficit determine expected fat loss.",
    evidenceLevel: "mechanistic_evidence",
    confidence: 85,
    populationApplicability: ["all"],
    mechanismStrength: "high"
  },

  {
    source: "fat_mass",
    target: "body_weight_trend",
    relationship: "contributes_to",
    domain: "energy_balance",
    description:
      "Fat-mass change contributes to longer-term body-weight trend.",
    evidenceLevel: "mechanistic_evidence",
    confidence: 85,
    populationApplicability: ["all"],
    mechanismStrength: "high"
  },

  {
    source: "body_weight_trend",
    target: "energy_balance_mismatch",
    relationship: "indicates",
    domain: "energy_balance",
    description:
      "A body-weight trend that differs from expected fat loss can indicate an energy-balance mismatch.",
    evidenceLevel: "coaching_heuristic",
    confidence: 78,
    populationApplicability: ["all"],
    mechanismStrength: "moderate"
  },

  {
    source: "expected_fat_loss",
    target: "energy_balance_mismatch",
    relationship: "indicates",
    domain: "energy_balance",
    description:
      "Expected fat loss is compared against observed trend to detect a mismatch.",
    evidenceLevel: "coaching_heuristic",
    confidence: 78,
    populationApplicability: ["all"],
    mechanismStrength: "moderate"
  },

  {
    source: "energy_balance_mismatch",
    target: "masked_fat_loss",
    relationship: "supports",
    domain: "energy_balance",
    description:
      "If a deficit is present but weight trend does not match expected loss, masked fat loss becomes a possible explanation.",
    evidenceLevel: "coaching_heuristic",
    confidence: 72,
    populationApplicability: ["all"],
    mechanismStrength: "moderate"
  },

  {
    source: "water_retention",
    target: "energy_balance_mismatch",
    relationship: "masks",
    domain: "energy_balance",
    description:
      "Water retention can make energy balance appear mismatched by obscuring fat loss on the scale.",
    evidenceLevel: "mechanistic_evidence",
    confidence: 80,
    populationApplicability: ["all"],
    mechanismStrength: "high"
  }
];