/**
 * edges.js
 *
 * Water Retention & Scale Noise domain edges.
 */

export const WATER_SCALE_NOISE_EDGES = [
  {
    source: "water_retention",
    target: "scale_weight",
    relationship: "increases",
    domain: "water_scale_noise",
    description:
      "Water retention can increase scale weight independently of fat mass.",
    evidenceLevel: "mechanistic_evidence",
    confidence: 85,
    populationApplicability: ["all"],
    mechanismStrength: "high"
  },

  {
    source: "water_retention",
    target: "masked_fat_loss",
    relationship: "contributes_to",
    domain: "water_scale_noise",
    description:
      "Water retention can contribute to masked fat loss by hiding real fat loss on the scale.",
    evidenceLevel: "mechanistic_evidence",
    confidence: 80,
    populationApplicability: ["all"],
    mechanismStrength: "high"
  },

  {
    source: "weight_volatility_high",
    target: "water_retention",
    relationship: "indicates",
    domain: "water_scale_noise",
    description:
      "High short-term weight volatility can indicate water retention or other non-fat scale noise.",
    evidenceLevel: "coaching_heuristic",
    confidence: 70,
    populationApplicability: ["all"],
    mechanismStrength: "moderate"
  },

  {
    source: "weight_volatility_high",
    target: "masked_fat_loss",
    relationship: "supports",
    domain: "water_scale_noise",
    description:
      "High weight volatility supports masked fat loss when a calorie deficit is otherwise present.",
    evidenceLevel: "coaching_heuristic",
    confidence: 72,
    populationApplicability: ["all"],
    mechanismStrength: "moderate"
  },

  {
    source: "glycogen_storage",
    target: "water_retention",
    relationship: "contributes_to",
    domain: "water_scale_noise",
    description:
      "Higher glycogen storage is associated with additional body water and can increase scale weight.",
    evidenceLevel: "mechanistic_evidence",
    confidence: 78,
    populationApplicability: ["all", "bodybuilder", "athlete"],
    mechanismStrength: "high"
  },

  {
    source: "glycogen_storage",
    target: "dietary_water_retention",
    relationship: "supports",
    domain: "water_scale_noise",
    description:
      "Glycogen-related water change supports a dietary water-retention interpretation.",
    evidenceLevel: "mechanistic_evidence",
    confidence: 75,
    populationApplicability: ["all", "bodybuilder", "athlete"],
    mechanismStrength: "high"
  },

  {
    source: "sodium_variability",
    target: "water_retention",
    relationship: "contributes_to",
    domain: "water_scale_noise",
    description:
      "Variable sodium intake can contribute to fluid-balance changes and short-term weight movement.",
    evidenceLevel: "mechanistic_evidence",
    confidence: 70,
    populationApplicability: ["all"],
    mechanismStrength: "moderate"
  },

  {
    source: "sodium_variability",
    target: "dietary_water_retention",
    relationship: "supports",
    domain: "water_scale_noise",
    description:
      "Sodium variability supports dietary water retention as a likely subtype.",
    evidenceLevel: "mechanistic_evidence",
    confidence: 72,
    populationApplicability: ["all"],
    mechanismStrength: "moderate"
  },

  {
    source: "gut_content_load",
    target: "scale_weight",
    relationship: "increases",
    domain: "water_scale_noise",
    description:
      "Higher digestive mass can increase scale weight without representing fat gain.",
    evidenceLevel: "mechanistic_evidence",
    confidence: 75,
    populationApplicability: ["all"],
    mechanismStrength: "moderate"
  },

  {
    source: "gut_content_load",
    target: "masked_fat_loss",
    relationship: "contributes_to",
    domain: "water_scale_noise",
    description:
      "Digestive-content load can contribute to apparent scale masking.",
    evidenceLevel: "mechanistic_evidence",
    confidence: 68,
    populationApplicability: ["all"],
    mechanismStrength: "moderate"
  },

  {
    source: "measurement_noise",
    target: "scale_weight",
    relationship: "masks",
    domain: "water_scale_noise",
    description:
      "Measurement noise can distort the apparent scale-weight trend.",
    evidenceLevel: "coaching_heuristic",
    confidence: 70,
    populationApplicability: ["all"],
    mechanismStrength: "moderate"
  },

  {
    source: "measurement_noise",
    target: "masked_fat_loss",
    relationship: "contributes_to",
    domain: "water_scale_noise",
    description:
      "Measurement noise can make fat-loss progress harder to detect.",
    evidenceLevel: "coaching_heuristic",
    confidence: 65,
    populationApplicability: ["all"],
    mechanismStrength: "moderate"
  },

  {
    source: "recovery_water_retention",
    target: "masked_fat_loss",
    relationship: "contributes_to",
    domain: "water_scale_noise",
    description:
      "Recovery-driven water retention can hide fat loss on the scale.",
    evidenceLevel: "mechanistic_evidence",
    confidence: 76,
    populationApplicability: ["all", "bodybuilder", "athlete", "chronic_illness"],
    mechanismStrength: "high"
  },

  {
    source: "dietary_water_retention",
    target: "masked_fat_loss",
    relationship: "contributes_to",
    domain: "water_scale_noise",
    description:
      "Dietary water retention can hide fat loss on the scale during short time windows.",
    evidenceLevel: "mechanistic_evidence",
    confidence: 76,
    populationApplicability: ["all"],
    mechanismStrength: "high"
  },

  {
  "source": "recovery_water_retention",
  "target": "water_retention",
  "relationship": "subtype_of",
  "domain": "water_scale_noise",
  "description": "Recovery-driven water retention is a subtype of water retention.",
  "evidenceLevel": "mechanistic_evidence",
  "confidence": 80,
  "populationApplicability": ["all"],
  "mechanismStrength": "high"
},
{
  "source": "dietary_water_retention",
  "target": "water_retention",
  "relationship": "subtype_of",
  "domain": "water_scale_noise",
  "description": "Dietary water retention is a subtype of water retention.",
  "evidenceLevel": "mechanistic_evidence",
  "confidence": 80,
  "populationApplicability": ["all"],
  "mechanismStrength": "high"
}
];