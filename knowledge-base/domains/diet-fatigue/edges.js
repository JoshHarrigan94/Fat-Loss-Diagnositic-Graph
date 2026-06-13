export const dietFatigueEdges = [
  {
    source: "deficit_duration",
    target: "diet_fatigue",
    relationship: "increases",
    strength: "high",
    direction: "positive",
    explanation:
      "Longer time spent in a deficit generally increases accumulated diet strain.",
    diagnosticUse:
      "Long dieting phases should raise suspicion that fatigue is influencing adherence, movement, and hunger."
  },

  {
    source: "deficit_magnitude",
    target: "diet_fatigue",
    relationship: "increases",
    strength: "high",
    direction: "positive",
    explanation:
      "Larger deficits usually create stronger hunger, fatigue, and recovery pressure.",
    diagnosticUse:
      "Aggressive deficits should be evaluated for sustainability before further calorie reductions."
  },

  {
    source: "deficit_aggressiveness",
    target: "deficit_magnitude",
    relationship: "maps_to",
    strength: "high",
    direction: "hierarchical",
    explanation:
      "Deficit aggressiveness is expressed through the size of the deficit relative to the person's tolerance and context.",
    diagnosticUse:
      "Links appetite-satiety intervention dose to diet-fatigue accumulation."
  },

  {
    source: "hunger_pressure",
    target: "diet_fatigue",
    relationship: "increases",
    strength: "high",
    direction: "positive",
    explanation:
      "Persistent hunger increases psychological and behavioural strain during dieting.",
    diagnosticUse:
      "High hunger should be treated as a fatigue driver, not just an appetite symptom."
  },

  {
    source: "recovery_debt",
    target: "diet_fatigue",
    relationship: "increases",
    strength: "moderate",
    direction: "positive",
    explanation:
      "Poor recovery increases the total strain of maintaining a deficit.",
    diagnosticUse:
      "Explains why sleep or stress problems make dieting feel disproportionately difficult."
  },

  {
    source: "diet_history_load",
    target: "diet_fatigue_risk",
    relationship: "increases",
    strength: "moderate",
    direction: "positive",
    explanation:
      "Repeated dieting or weight cycling may lower tolerance for additional aggressive restriction.",
    diagnosticUse:
      "Supports more conservative sequencing for people with a heavy diet history."
  },

  {
    source: "psychological_diet_strain",
    target: "fatigue_driven_adherence_decline",
    relationship: "increases",
    strength: "high",
    direction: "positive",
    explanation:
      "Mental strain from dieting can reduce the ability to keep logging, planning, training, and making flexible decisions.",
    diagnosticUse:
      "Useful when the person understands the plan but cannot keep executing it."
  },

  {
    source: "diet_fatigue",
    target: "fatigue_driven_adherence_decline",
    relationship: "increases",
    strength: "high",
    direction: "positive",
    explanation:
      "Accumulated diet fatigue makes lapses, missed behaviours, and dropout more likely.",
    diagnosticUse:
      "Explains adherence collapse after several weeks of apparently good execution."
  },

  {
    source: "fatigue_driven_adherence_decline",
    target: "adherence_consistency",
    relationship: "reduces",
    strength: "high",
    direction: "negative",
    explanation:
      "When fatigue drives behaviour, consistency becomes harder to maintain.",
    diagnosticUse:
      "Prevents interpreting adherence decline as purely motivational."
  },

  {
    source: "diet_fatigue",
    target: "neat_adaptation",
    relationship: "increases",
    strength: "moderate",
    direction: "positive",
    explanation:
      "Diet fatigue can reduce spontaneous movement and daily activity.",
    diagnosticUse:
      "Explains declining step counts during longer or more aggressive deficits."
  },

  {
    source: "diet_fatigue",
    target: "sleep_quality",
    relationship: "may_reduce",
    strength: "moderate",
    direction: "negative",
    explanation:
      "Sustained restriction, hunger, and stress can disrupt sleep quality.",
    diagnosticUse:
      "Identifies feedback loops between dieting strain and recovery."
  },

  {
    source: "performance_decline_during_deficit",
    target: "training_recovery_status",
    relationship: "reduces_confidence_in",
    strength: "moderate",
    direction: "negative",
    explanation:
      "Performance decline may indicate that training recovery is being compromised by the deficit.",
    diagnosticUse:
      "Supports reducing training volume, reducing deficit size, or improving recovery."
  },

  {
    source: "diet_fatigue_risk",
    target: "diet_break_readiness",
    relationship: "informs",
    strength: "high",
    direction: "positive",
    explanation:
      "Higher diet fatigue risk increases the likelihood that a planned maintenance phase may be useful.",
    diagnosticUse:
      "Supports intervention sequencing decisions."
  },

  {
    source: "refeed_appropriateness",
    target: "glycogen_water_shift",
    relationship: "may_trigger",
    strength: "moderate",
    direction: "positive",
    explanation:
      "Short-term carbohydrate increases can increase glycogen and water, temporarily raising scale weight.",
    diagnosticUse:
      "Prevents misinterpreting post-refeed weight gain as fat gain."
  },

  {
    source: "diet_break_readiness",
    target: "risk_adjusted_recommendations",
    relationship: "modifies",
    strength: "high",
    direction: "decision_gate",
    explanation:
      "When diet break readiness is high, recommendations should shift away from further restriction and toward recovery or maintenance.",
    diagnosticUse:
      "Prevents unsafe or unsustainable escalation."
  }
];
