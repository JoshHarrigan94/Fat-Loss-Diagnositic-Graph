export const sequencingEdges = [
  {
    source: "intervention_strategy_selection",
    target: "sequencing_process",
    relationship: "feeds",
    strength: "high",
    direction: "decision_input",
    explanation:
      "Selected intervention strategies must be ordered before becoming recommendations.",
    diagnosticUse:
      "Prevents unordered advice lists."
  },

  {
    source: "medical_review_needed",
    target: "sequence_medical_safety_first",
    relationship: "activates",
    strength: "high",
    direction: "safety",
    explanation:
      "When medical review is needed, medical safety becomes the first sequencing priority.",
    diagnosticUse:
      "Blocks lifestyle escalation until safety is addressed."
  },

  {
    source: "refer_or_medical_review",
    target: "sequence_medical_safety_first",
    relationship: "activates",
    strength: "high",
    direction: "safety",
    explanation:
      "Referral or review outcomes must override normal sequencing.",
    diagnosticUse:
      "Ensures high-risk cases are not handled as standard plans."
  },

  {
    source: "weight_trend_confidence",
    target: "sequence_confidence_before_escalation",
    relationship: "informs",
    strength: "high",
    direction: "decision_modifier",
    explanation:
      "Low weight-trend confidence should delay escalation until better data is available.",
    diagnosticUse:
      "Prevents false plateau responses."
  },

  {
    source: "calorie_tracking_accuracy",
    target: "sequence_confidence_before_escalation",
    relationship: "informs",
    strength: "high",
    direction: "decision_modifier",
    explanation:
      "Low intake-confidence should delay calorie cuts until intake estimation improves.",
    diagnosticUse:
      "Prevents reducing calories based on unreliable logs."
  },

  {
    source: "constraint_low_adherence_capacity",
    target: "sequence_low_burden_first",
    relationship: "activates",
    strength: "high",
    direction: "decision_modifier",
    explanation:
      "Low adherence capacity means low-burden interventions should come first.",
    diagnosticUse:
      "Prioritises defaults, environment design, and minimum viable behaviours."
  },

  {
    source: "recovery_risk_level",
    target: "sequence_recovery_before_progression",
    relationship: "activates",
    strength: "high",
    direction: "decision_modifier",
    explanation:
      "High recovery risk means recovery repair should occur before adding more diet or exercise strain.",
    diagnosticUse:
      "Prevents worsening fatigue or adherence."
  },

  {
    source: "diet_fatigue_risk",
    target: "sequence_recovery_before_progression",
    relationship: "activates",
    strength: "moderate",
    direction: "decision_modifier",
    explanation:
      "High diet fatigue risk suggests reducing strain before escalating intervention intensity.",
    diagnosticUse:
      "Supports diet breaks, maintenance, or reduced deficit sequencing."
  },

  {
    source: "adherence_consistency",
    target: "sequence_foundation_before_precision",
    relationship: "informs",
    strength: "high",
    direction: "decision_modifier",
    explanation:
      "Low adherence consistency suggests foundational behaviours should be improved before advanced optimisation.",
    diagnosticUse:
      "Prevents complex interventions when basics are not stable."
  },

  {
    source: "nutrition_quality",
    target: "sequence_foundation_before_precision",
    relationship: "informs",
    strength: "moderate",
    direction: "decision_modifier",
    explanation:
      "Poor nutrition quality indicates foundational diet quality may need to precede precise calorie manipulation.",
    diagnosticUse:
      "Supports protein, fibre, and meal structure before fine-tuning."
  },

  {
    source: "measurement_decision_threshold",
    target: "sequence_monitoring_window",
    relationship: "informs",
    strength: "high",
    direction: "decision_modifier",
    explanation:
      "Measurement decision thresholds define how long to observe before changing course.",
    diagnosticUse:
      "Prevents over-adjusting to short-term noise."
  },

  {
    source: "sequence_confidence_before_escalation",
    target: "sequence_escalation_criteria",
    relationship: "contributes_to",
    strength: "high",
    direction: "decision_rule",
    explanation:
      "Escalation requires sufficient confidence in outcome, intake, adherence, and activity data.",
    diagnosticUse:
      "Defines when calorie or activity changes are justified."
  },

  {
    source: "sequence_recovery_before_progression",
    target: "sequence_escalation_criteria",
    relationship: "restricts",
    strength: "high",
    direction: "negative",
    explanation:
      "Escalation should be restricted when recovery risk is unresolved.",
    diagnosticUse:
      "Prevents increasing strain too early."
  },

  {
    source: "contraindication_output_mode",
    target: "sequence_do_not_use_strategy",
    relationship: "may_activate",
    strength: "high",
    direction: "safety",
    explanation:
      "Contraindicated strategies may be removed from the sequence entirely.",
    diagnosticUse:
      "Blocks unsafe options."
  },

  {
    source: "contraindication_output_mode",
    target: "sequence_delayed_strategy",
    relationship: "may_activate",
    strength: "high",
    direction: "safety",
    explanation:
      "Some strategies may be delayed until risk, readiness, or clinical review conditions improve.",
    diagnosticUse:
      "Avoids permanent blocking when later use may become appropriate."
  },

  {
    source: "strategy_medical_review",
    target: "sequence_primary_strategy",
    relationship: "may_become",
    strength: "high",
    direction: "safety_output",
    explanation:
      "When medical risk is high, medical review becomes the primary strategy.",
    diagnosticUse:
      "Overrides lifestyle-first sequencing."
  },

  {
    source: "strategy_habit_environment_design",
    target: "sequence_primary_strategy",
    relationship: "may_become",
    strength: "moderate",
    direction: "decision_output",
    explanation:
      "When adherence capacity is low, habit and environment design may become the first intervention.",
    diagnosticUse:
      "Prevents over-prescribing complex plans."
  },

  {
    source: "strategy_monitoring_confidence",
    target: "sequence_primary_strategy",
    relationship: "may_become",
    strength: "moderate",
    direction: "decision_output",
    explanation:
      "When data confidence is low, monitoring improvement may become the primary strategy.",
    diagnosticUse:
      "Improves diagnosis before intervention escalation."
  },

  {
    source: "strategy_recovery_repair",
    target: "sequence_primary_strategy",
    relationship: "may_become",
    strength: "moderate",
    direction: "decision_output",
    explanation:
      "When recovery risk is high, recovery repair may become the first strategy.",
    diagnosticUse:
      "Restores tolerance before adding stress."
  },

  {
    source: "sequence_single_lever_change",
    target: "sequence_primary_strategy",
    relationship: "supports",
    strength: "moderate",
    direction: "decision_rule",
    explanation:
      "Single-lever sequencing helps keep the plan interpretable and manageable.",
    diagnosticUse:
      "Reduces confusion from changing too much at once."
  },

  {
    source: "sequencing_process",
    target: "sequence_primary_strategy",
    relationship: "outputs",
    strength: "high",
    direction: "decision_output",
    explanation:
      "Sequencing produces the primary immediate strategy.",
    diagnosticUse:
      "Creates the first action step."
  },

  {
    source: "sequencing_process",
    target: "sequence_secondary_strategy",
    relationship: "outputs",
    strength: "moderate",
    direction: "decision_output",
    explanation:
      "Sequencing may produce a secondary supporting strategy when burden is acceptable.",
    diagnosticUse:
      "Allows paired interventions without overload."
  },

  {
    source: "sequencing_process",
    target: "sequence_delayed_strategy",
    relationship: "outputs",
    strength: "moderate",
    direction: "decision_output",
    explanation:
      "Sequencing identifies strategies that are valid but not yet appropriate.",
    diagnosticUse:
      "Clarifies what not to do yet."
  }
];
