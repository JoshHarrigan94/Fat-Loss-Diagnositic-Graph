export const sharedDecisionNodes = [
  {
    id: "energy_intake_estimate",
    label: "Energy Intake Estimate",
    type: "decision_infrastructure",
    description:
      "The graph's confidence-weighted estimate of actual energy intake based on reported intake, tracking accuracy, meal structure, and hidden intake risk.",
    reasoningPurpose:
      "Prevents decisions being made from reported intake alone."
  },

  {
    id: "weekly_energy_deficit",
    label: "Weekly Energy Deficit",
    type: "decision_infrastructure",
    description:
      "The estimated weekly gap between energy intake and energy expenditure after accounting for adherence, activity, compensation, and measurement confidence.",
    reasoningPurpose:
      "Core causal bridge between behaviour, physiology, and fat-loss outcomes."
  },

  {
    id: "fat_loss_outcome_confidence",
    label: "Fat-Loss Outcome Confidence",
    type: "decision_confidence",
    description:
      "The graph's confidence that observed progress reflects true fat-mass change rather than noise, water, adherence error, or measurement artefact.",
    reasoningPurpose:
      "Determines whether the graph should recommend change, continue observation, or collect better data."
  },

  {
    id: "risk_adjusted_recommendations",
    label: "Risk-Adjusted Recommendations",
    type: "decision_output",
    description:
      "Recommendations modified by medical risk, population context, recovery capacity, psychological safety, injury risk, and contraindications.",
    reasoningPurpose:
      "Ensures outputs are not merely effective in theory but appropriate for the person."
  },

  {
    id: "intervention_strategy",
    label: "Intervention Strategy",
    type: "decision_output",
    description:
      "The selected broad approach for changing outcomes, such as calorie adjustment, activity increase, food-quality improvement, recovery repair, habit redesign, or medical referral.",
    reasoningPurpose:
      "Turns diagnostic findings into a coherent action pathway."
  },

  {
    id: "risk_management",
    label: "Risk Management",
    type: "safety_reasoning_layer",
    description:
      "The process of identifying, weighting, and responding to medical, psychological, injury, recovery, and population-specific risks.",
    reasoningPurpose:
      "Acts as a safety layer before recommendations are finalised."
  },

  {
    id: "contraindications",
    label: "Contraindications",
    type: "safety_reasoning_layer",
    description:
      "Conditions or contexts where a normally valid intervention should be avoided, modified, or referred for clinical oversight.",
    reasoningPurpose:
      "Prevents unsafe intervention selection."
  },

  {
    id: "sequencing",
    label: "Intervention Sequencing",
    type: "decision_process",
    description:
      "The ordering of interventions based on safety, leverage, readiness, burden, confidence, and expected impact.",
    reasoningPurpose:
      "Determines what should happen first, later, or not yet."
  },

  {
    id: "passive_overconsumption_risk",
    label: "Passive Overconsumption Risk",
    type: "behavioural_risk",
    description:
      "The risk that food environment, palatability, liquid calories, low satiety, or poor structure causes calorie intake to rise without conscious intention.",
    reasoningPurpose:
      "Explains intake drift without framing it as deliberate non-compliance."
  },

  {
    id: "medical_review_needed",
    label: "Medical Review Needed",
    type: "safety_gate",
    description:
      "A graph-level flag that clinical review may be required before lifestyle-only recommendations continue.",
    reasoningPurpose:
      "Routes high-risk cases away from unsupported lifestyle advice."
  }
];
