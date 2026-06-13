export const riskAdjustedRecommendationsEdges = [
  {
    source: "sequence_primary_strategy",
    target: "risk_adjusted_recommendation_process",
    relationship: "feeds",
    strength: "high",
    direction: "decision_input",
    explanation:
      "The primary sequenced strategy is the main input into recommendation generation.",
    diagnosticUse:
      "Ensures the final recommendation reflects the selected order of action."
  },

  {
    source: "sequence_secondary_strategy",
    target: "risk_adjusted_recommendation_process",
    relationship: "feeds",
    strength: "moderate",
    direction: "decision_input",
    explanation:
      "Secondary strategies may be included if burden and risk are acceptable.",
    diagnosticUse:
      "Allows support actions without overwhelming the plan."
  },

  {
    source: "sequence_do_not_use_strategy",
    target: "risk_adjusted_recommendation_process",
    relationship: "restricts",
    strength: "high",
    direction: "safety",
    explanation:
      "Blocked strategies must not appear as active recommendations.",
    diagnosticUse:
      "Prevents contraindicated advice from leaking into outputs."
  },

  {
    source: "proceed_normally",
    target: "recommendation_mode_standard",
    relationship: "selects",
    strength: "high",
    direction: "decision_output",
    explanation:
      "Low-risk contexts can use standard recommendation mode.",
    diagnosticUse:
      "Allows normal intervention guidance when appropriate."
  },

  {
    source: "proceed_with_modification",
    target: "recommendation_mode_modified",
    relationship: "selects",
    strength: "high",
    direction: "decision_output",
    explanation:
      "Contextual risk or constraints select modified recommendation mode.",
    diagnosticUse:
      "Adapts recommendations without blocking useful action."
  },

  {
    source: "constraint_low_recovery_capacity",
    target: "recommendation_mode_conservative",
    relationship: "may_select",
    strength: "high",
    direction: "decision_modifier",
    explanation:
      "Low recovery capacity should bias recommendations toward conservative intensity.",
    diagnosticUse:
      "Reduces risk of fatigue, adherence collapse, or overtraining."
  },

  {
    source: "monitor_before_escalation",
    target: "recommendation_mode_monitor_only",
    relationship: "selects",
    strength: "high",
    direction: "decision_output",
    explanation:
      "When escalation is not justified, monitoring becomes the recommendation mode.",
    diagnosticUse:
      "Prevents premature calorie or activity changes."
  },

  {
    source: "refer_or_medical_review",
    target: "recommendation_mode_referral_first",
    relationship: "selects",
    strength: "high",
    direction: "safety_output",
    explanation:
      "High-risk contexts select referral-first mode.",
    diagnosticUse:
      "Stops unsupported lifestyle-only recommendations."
  },

  {
    source: "recommendation_risk_tier",
    target: "recommendation_intensity",
    relationship: "modifies",
    strength: "high",
    direction: "decision_modifier",
    explanation:
      "Higher risk should reduce recommendation intensity or require referral.",
    diagnosticUse:
      "Matches intervention dose to risk."
  },

  {
    source: "sequence_escalation_criteria",
    target: "recommendation_intensity",
    relationship: "informs",
    strength: "high",
    direction: "decision_modifier",
    explanation:
      "Escalation criteria determine whether intensity can increase.",
    diagnosticUse:
      "Prevents escalation when prerequisites are unmet."
  },

  {
    source: "sequence_deescalation_criteria",
    target: "recommendation_intensity",
    relationship: "reduces",
    strength: "high",
    direction: "negative",
    explanation:
      "De-escalation criteria reduce recommended intensity.",
    diagnosticUse:
      "Protects against excess strain."
  },

  {
    source: "monitoring_burden_risk",
    target: "recommendation_monitoring_level",
    relationship: "modifies",
    strength: "high",
    direction: "safety",
    explanation:
      "High monitoring burden should reduce or reshape tracking recommendations.",
    diagnosticUse:
      "Protects psychological safety."
  },

  {
    source: "weight_trend_confidence",
    target: "recommendation_monitoring_level",
    relationship: "informs",
    strength: "moderate",
    direction: "decision_modifier",
    explanation:
      "Low trend confidence may require improved measurement, provided monitoring burden is acceptable.",
    diagnosticUse:
      "Balances data quality with psychological cost."
  },

  {
    source: "priority_psychological_safety",
    target: "recommendation_language_style",
    relationship: "modifies",
    strength: "high",
    direction: "safety",
    explanation:
      "When psychological safety is prioritised, language should be non-shaming, flexible, and supportive.",
    diagnosticUse:
      "Prevents harmful framing."
  },

  {
    source: "population_youth",
    target: "recommendation_language_style",
    relationship: "modifies",
    strength: "high",
    direction: "safety",
    explanation:
      "Youth recommendations should be family-aware, growth-aware, and avoid appearance-focused framing.",
    diagnosticUse:
      "Supports safer communication for young people."
  },

  {
    source: "medical_review_needed",
    target: "recommendation_safety_caveat",
    relationship: "activates",
    strength: "high",
    direction: "safety",
    explanation:
      "Medical review flags require explicit safety caveats.",
    diagnosticUse:
      "Clarifies recommendation boundaries."
  },

  {
    source: "sequence_monitoring_window",
    target: "recommendation_next_review_point",
    relationship: "informs",
    strength: "high",
    direction: "decision_modifier",
    explanation:
      "The monitoring window defines when the plan should next be reviewed.",
    diagnosticUse:
      "Creates feedback loops."
  },

  {
    source: "risk_adjusted_recommendation_process",
    target: "final_recommendation_package",
    relationship: "outputs",
    strength: "high",
    direction: "final_output",
    explanation:
      "The recommendation process produces the final package.",
    diagnosticUse:
      "Provides the output consumed by the app or other interface."
  },

  {
    source: "recommendation_mode_standard",
    target: "final_recommendation_package",
    relationship: "contributes_to",
    strength: "moderate",
    direction: "output_component",
    explanation:
      "Recommendation mode shapes the final package.",
    diagnosticUse:
      "Controls output format and intensity."
  },

  {
    source: "recommendation_mode_modified",
    target: "final_recommendation_package",
    relationship: "contributes_to",
    strength: "moderate",
    direction: "output_component",
    explanation:
      "Modified mode adds constraints and adaptations to the final output.",
    diagnosticUse:
      "Ensures context-specific changes are visible."
  },

  {
    source: "recommendation_safety_caveat",
    target: "final_recommendation_package",
    relationship: "contributes_to",
    strength: "high",
    direction: "safety_output",
    explanation:
      "Safety caveats must be included when risk flags are active.",
    diagnosticUse:
      "Makes safety boundaries explicit."
  }
];
