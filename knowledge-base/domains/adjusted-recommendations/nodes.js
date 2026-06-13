export const riskAdjustedRecommendationsNodes = [
  {
    id: "risk_adjusted_recommendation_process",
    label: "Risk-Adjusted Recommendation Process",
    type: "recommendation_process",
    domain: "risk-adjusted-recommendations",
    description:
      "The process of converting selected and sequenced strategies into safe, proportionate, population-aware recommendations.",
    diagnosticRole: "core",
    reasoningPurpose:
      "Ensures recommendations reflect diagnosis, risk tier, contraindications, sequencing, confidence, burden, and population modifiers.",
    evidenceLevel: "high",
    tags: ["recommendations", "risk-adjusted", "output-control"]
  },

  {
    id: "recommendation_mode_standard",
    label: "Standard Recommendation Mode",
    type: "recommendation_mode",
    domain: "risk-adjusted-recommendations",
    description:
      "A normal recommendation mode used when risk is low, confidence is adequate, and no major contraindications are present.",
    diagnosticRole: "output_mode",
    reasoningPurpose:
      "Allows standard fat-loss strategy recommendations when safety and data confidence are acceptable.",
    tags: ["standard", "recommendation-mode"]
  },

  {
    id: "recommendation_mode_modified",
    label: "Modified Recommendation Mode",
    type: "recommendation_mode",
    domain: "risk-adjusted-recommendations",
    description:
      "A recommendation mode where the intervention can proceed but must be adapted for risk, population, recovery, injury, glucose, psychological safety, or adherence capacity.",
    diagnosticRole: "output_mode",
    reasoningPurpose:
      "Allows useful action while respecting individual constraints.",
    tags: ["modified", "recommendation-mode"]
  },

  {
    id: "recommendation_mode_conservative",
    label: "Conservative Recommendation Mode",
    type: "recommendation_mode",
    domain: "risk-adjusted-recommendations",
    description:
      "A recommendation mode that favours smaller changes, slower progression, lower burden, lower risk, and closer monitoring.",
    diagnosticRole: "output_mode",
    reasoningPurpose:
      "Protects people with higher risk, lower recovery capacity, medical complexity, or vulnerable population contexts.",
    tags: ["conservative", "low-risk", "recommendation-mode"]
  },

  {
    id: "recommendation_mode_monitor_only",
    label: "Monitor-Only Recommendation Mode",
    type: "recommendation_mode",
    domain: "risk-adjusted-recommendations",
    description:
      "A recommendation mode where the graph should improve data quality or observe trends before changing calories, activity, or training.",
    diagnosticRole: "output_mode",
    reasoningPurpose:
      "Prevents premature plan changes when confidence is too low.",
    tags: ["monitoring", "confidence", "recommendation-mode"]
  },

  {
    id: "recommendation_mode_referral_first",
    label: "Referral-First Recommendation Mode",
    type: "recommendation_mode",
    domain: "risk-adjusted-recommendations",
    description:
      "A recommendation mode where medical, psychological, or specialist review should occur before lifestyle-only recommendations proceed.",
    diagnosticRole: "safety_output",
    reasoningPurpose:
      "Stops the graph from overreaching when risk requires qualified support.",
    tags: ["referral", "medical-review", "safety"]
  },

  {
    id: "recommendation_intensity",
    label: "Recommendation Intensity",
    type: "output_modifier",
    domain: "risk-adjusted-recommendations",
    description:
      "The degree of change recommended, ranging from minimal, low, moderate, high, or not appropriate.",
    diagnosticRole: "output_modifier",
    reasoningPurpose:
      "Controls how strongly the selected intervention should be applied.",
    tags: ["intensity", "dose", "output-modifier"]
  },

  {
    id: "recommendation_monitoring_level",
    label: "Recommendation Monitoring Level",
    type: "output_modifier",
    domain: "risk-adjusted-recommendations",
    description:
      "The level of follow-up, data collection, trend review, or symptom monitoring recommended after an intervention.",
    diagnosticRole: "output_modifier",
    reasoningPurpose:
      "Matches monitoring burden to risk, confidence, and psychological safety.",
    tags: ["monitoring", "follow-up", "output-modifier"]
  },

  {
    id: "recommendation_language_style",
    label: "Recommendation Language Style",
    type: "output_modifier",
    domain: "risk-adjusted-recommendations",
    description:
      "The tone and framing of recommendations, including neutral, supportive, non-shaming, clinical, performance-focused, or family-centred language.",
    diagnosticRole: "output_modifier",
    reasoningPurpose:
      "Ensures recommendation communication fits psychological safety, population, and context.",
    tags: ["language", "tone", "psychological-safety"]
  },

  {
    id: "recommendation_safety_caveat",
    label: "Recommendation Safety Caveat",
    type: "output_component",
    domain: "risk-adjusted-recommendations",
    description:
      "A safety statement or boundary included when recommendations may require medical review, symptom monitoring, or conservative application.",
    diagnosticRole: "safety_output",
    reasoningPurpose:
      "Makes safety limitations explicit without turning all recommendations into generic disclaimers.",
    tags: ["safety", "caveat", "boundary"]
  },

  {
    id: "recommendation_next_review_point",
    label: "Recommendation Next Review Point",
    type: "output_component",
    domain: "risk-adjusted-recommendations",
    description:
      "The next point at which the plan should be reviewed based on data sufficiency, monitoring window, safety, or response.",
    diagnosticRole: "output_component",
    reasoningPurpose:
      "Turns recommendations into feedback loops rather than static advice.",
    tags: ["review", "feedback-loop", "monitoring"]
  },

  {
    id: "final_recommendation_package",
    label: "Final Recommendation Package",
    type: "recommendation_output",
    domain: "risk-adjusted-recommendations",
    description:
      "The final graph output containing primary recommendation, secondary support, blocked or delayed strategies, monitoring instructions, safety caveats, and review point.",
    diagnosticRole: "final_output",
    reasoningPurpose:
      "Produces the explainable recommendation bundle consumed by the app or any other interface.",
    tags: ["final-output", "recommendation-package"]
  }
];
