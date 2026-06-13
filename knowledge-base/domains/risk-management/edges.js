export const riskManagementEdges = [
  {
    source: "risk_management_process",
    target: "risk_adjusted_recommendations",
    relationship: "gates",
    strength: "high",
    direction: "safety_gate",
    explanation:
      "Risk management must occur before recommendations are finalised.",
    diagnosticUse:
      "Prevents unsafe or overly generic outputs."
  },

  {
    source: "red_flag_symptoms",
    target: "medical_risk_level",
    relationship: "increases",
    strength: "high",
    direction: "safety",
    explanation:
      "Red flag symptoms increase medical risk and may require medical assessment.",
    diagnosticUse:
      "Creates a strong safety override."
  },

  {
    source: "medication_medical_context",
    target: "medical_risk_level",
    relationship: "modifies",
    strength: "high",
    direction: "contextual",
    explanation:
      "Medication and diagnosed conditions can increase or modify medical risk.",
    diagnosticUse:
      "Routes complex cases through conservative recommendations or clinical review."
  },

  {
    source: "hypoglycaemia_risk",
    target: "glucose_safety_risk",
    relationship: "increases",
    strength: "high",
    direction: "safety",
    explanation:
      "Hypoglycaemia risk makes calorie, carbohydrate, fasting, and exercise changes safety-sensitive.",
    diagnosticUse:
      "Prevents unsafe interventions in diabetes medication contexts."
  },

  {
    source: "diabetes_medication_context",
    target: "glucose_safety_risk",
    relationship: "modifies",
    strength: "high",
    direction: "safety",
    explanation:
      "Diabetes medication can alter glucose safety risk, especially with reduced intake or increased activity.",
    diagnosticUse:
      "Requires medication-aware recommendations."
  },

  {
    source: "eating_disorder_risk",
    target: "psychological_risk_level",
    relationship: "increases",
    strength: "high",
    direction: "safety",
    explanation:
      "Eating disorder risk strongly increases psychological safety concerns.",
    diagnosticUse:
      "Restricts calorie tracking, aggressive deficits, and appearance-focused monitoring."
  },

  {
    source: "shame_guilt_response",
    target: "psychological_risk_level",
    relationship: "increases",
    strength: "moderate",
    direction: "positive",
    explanation:
      "High shame or guilt increases the risk that standard monitoring or restriction will worsen avoidance or rebound behaviour.",
    diagnosticUse:
      "Modifies coaching language, monitoring frequency, and intervention design."
  },

  {
    source: "injury_risk_from_training",
    target: "injury_risk_level",
    relationship: "increases",
    strength: "high",
    direction: "safety",
    explanation:
      "Pain, injury history, rapid load increases, or poor technique increase training-related risk.",
    diagnosticUse:
      "Requires conservative exercise selection and progression."
  },

  {
    source: "constraint_high_injury_risk",
    target: "injury_risk_level",
    relationship: "increases",
    strength: "high",
    direction: "safety",
    explanation:
      "A high injury-risk constraint raises the overall injury risk tier.",
    diagnosticUse:
      "Prevents exercise escalation without safeguards."
  },

  {
    source: "constraint_low_recovery_capacity",
    target: "recovery_risk_level",
    relationship: "increases",
    strength: "high",
    direction: "contextual",
    explanation:
      "Low recovery capacity increases the risk that the intervention dose exceeds tolerance.",
    diagnosticUse:
      "Restricts deficit magnitude, training volume, and rapid progression."
  },

  {
    source: "diet_fatigue_risk",
    target: "recovery_risk_level",
    relationship: "increases",
    strength: "moderate",
    direction: "positive",
    explanation:
      "High diet fatigue risk indicates that continuing or escalating the deficit may worsen recovery and adherence.",
    diagnosticUse:
      "Supports maintenance phases, deloads, or reduced deficit strategies."
  },

  {
    source: "monitoring_burden_risk",
    target: "psychological_risk_level",
    relationship: "contributes_to",
    strength: "moderate",
    direction: "positive",
    explanation:
      "High monitoring burden can increase psychological risk, especially with shame or disordered eating risk.",
    diagnosticUse:
      "Changes whether frequent weighing, photos, or calorie tracking are appropriate."
  },

  {
    source: "medical_risk_level",
    target: "recommendation_risk_tier",
    relationship: "informs",
    strength: "high",
    direction: "decision_modifier",
    explanation:
      "Medical risk is a primary input to the final recommendation risk tier.",
    diagnosticUse:
      "Determines whether medical review is needed."
  },

  {
    source: "psychological_risk_level",
    target: "recommendation_risk_tier",
    relationship: "informs",
    strength: "high",
    direction: "decision_modifier",
    explanation:
      "Psychological risk modifies recommendation safety and monitoring intensity.",
    diagnosticUse:
      "Prevents psychologically harmful intervention design."
  },

  {
    source: "injury_risk_level",
    target: "recommendation_risk_tier",
    relationship: "informs",
    strength: "high",
    direction: "decision_modifier",
    explanation:
      "Injury risk modifies exercise recommendations and progression speed.",
    diagnosticUse:
      "Prevents unsafe training escalation."
  },

  {
    source: "recovery_risk_level",
    target: "recommendation_risk_tier",
    relationship: "informs",
    strength: "high",
    direction: "decision_modifier",
    explanation:
      "Recovery risk modifies deficit size, training dose, and intervention sequencing.",
    diagnosticUse:
      "Prevents adding strain when the person needs recovery restoration."
  },

  {
    source: "glucose_safety_risk",
    target: "recommendation_risk_tier",
    relationship: "informs",
    strength: "high",
    direction: "decision_modifier",
    explanation:
      "Glucose safety risk modifies nutrition, fasting, activity, and medication-aware recommendations.",
    diagnosticUse:
      "Prevents unsafe advice for diabetes or hypoglycaemia-prone users."
  },

  {
    source: "recommendation_risk_tier",
    target: "proceed_normally",
    relationship: "may_select",
    strength: "high",
    direction: "decision_output",
    explanation:
      "Low-risk scenarios can proceed with standard intervention selection.",
    diagnosticUse:
      "Allows normal recommendation flow."
  },

  {
    source: "recommendation_risk_tier",
    target: "proceed_with_modification",
    relationship: "may_select",
    strength: "high",
    direction: "decision_output",
    explanation:
      "Moderate or contextual risk should modify recommendations rather than block all action.",
    diagnosticUse:
      "Supports conservative, population-aware intervention design."
  },

  {
    source: "recommendation_risk_tier",
    target: "monitor_before_escalation",
    relationship: "may_select",
    strength: "high",
    direction: "decision_output",
    explanation:
      "Unclear progress or low measurement confidence may require monitoring before intervention escalation.",
    diagnosticUse:
      "Prevents premature calorie cuts or activity increases."
  },

  {
    source: "recommendation_risk_tier",
    target: "refer_or_medical_review",
    relationship: "may_select",
    strength: "high",
    direction: "safety_output",
    explanation:
      "High-risk scenarios may require medical review or specialist support before continuing.",
    diagnosticUse:
      "Creates the strongest safety routing option."
  },

  {
    source: "proceed_with_modification",
    target: "risk_adjusted_recommendations",
    relationship: "modifies",
    strength: "high",
    direction: "decision_output",
    explanation:
      "Modified progression should feed into final recommendations.",
    diagnosticUse:
      "Ensures safety constraints affect actual outputs."
  },

  {
    source: "refer_or_medical_review",
    target: "medical_review_needed",
    relationship: "activates",
    strength: "high",
    direction: "safety_gate",
    explanation:
      "Referral or medical review activates the shared medical-review safety gate.",
    diagnosticUse:
      "Stops unsupported lifestyle-only reasoning where clinical input is needed."
  }
];
