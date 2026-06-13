export const adherenceBehaviourEdges = [
  {
    source: "calorie_tracking_accuracy",
    target: "energy_intake_estimate",
    relationship: "improves_confidence_in",
    strength: "high",
    direction: "positive",
    explanation:
      "More accurate tracking improves confidence that reported intake reflects actual intake.",
    diagnosticUse:
      "If fat loss is slower than expected, poor calorie tracking accuracy should be ruled out before assuming metabolic adaptation."
  },

  {
    source: "weekend_adherence_gap",
    target: "weekly_energy_deficit",
    relationship: "reduces",
    strength: "high",
    direction: "negative",
    explanation:
      "Higher weekend intake or reduced weekend activity can erase a weekday calorie deficit.",
    diagnosticUse:
      "Useful when daily weekday compliance appears good but weekly weight trend is flat."
  },

  {
    source: "adherence_consistency",
    target: "weekly_energy_deficit",
    relationship: "stabilises",
    strength: "high",
    direction: "positive",
    explanation:
      "Consistent execution makes the planned deficit more likely to become a real weekly deficit.",
    diagnosticUse:
      "Separates plan effectiveness from inconsistent execution."
  },

  {
    source: "perceived_plan_burden",
    target: "adherence_consistency",
    relationship: "reduces",
    strength: "high",
    direction: "negative",
    explanation:
      "Plans that feel too complex, stressful, restrictive, or socially costly are less likely to be followed consistently.",
    diagnosticUse:
      "Flags when the intervention should be simplified rather than intensified."
  },

  {
    source: "dietary_flexibility",
    target: "adherence_consistency",
    relationship: "supports",
    strength: "moderate",
    direction: "positive",
    explanation:
      "Flexible dieting behaviours help people stay adherent during imperfect real-world conditions.",
    diagnosticUse:
      "Useful when rigid plans repeatedly collapse after social events, cravings, or missed meals."
  },

  {
    source: "all_or_nothing_thinking",
    target: "adherence_consistency",
    relationship: "destabilises",
    strength: "moderate",
    direction: "negative",
    explanation:
      "All-or-nothing thinking makes small deviations more likely to become full adherence breakdowns.",
    diagnosticUse:
      "Explains why a single missed meal, weigh-in, or high-calorie day leads to prolonged plan abandonment."
  },

  {
    source: "environmental_food_exposure",
    target: "calorie_tracking_accuracy",
    relationship: "reduces",
    strength: "moderate",
    direction: "negative",
    explanation:
      "Frequent exposure to snacks, alcohol, takeaways, or shared food increases the chance of untracked intake.",
    diagnosticUse:
      "Useful when reported intake appears too low relative to body-weight outcomes."
  },

  {
    source: "environmental_food_exposure",
    target: "perceived_plan_burden",
    relationship: "increases",
    strength: "moderate",
    direction: "positive",
    explanation:
      "High-cue environments require more effortful restraint, increasing the perceived burden of dieting.",
    diagnosticUse:
      "Suggests environmental design may be preferable to relying on motivation or discipline."
  },

  {
    source: "routine_stability",
    target: "adherence_consistency",
    relationship: "supports",
    strength: "moderate",
    direction: "positive",
    explanation:
      "Stable routines make repeatable behaviours easier to automate.",
    diagnosticUse:
      "Useful for choosing between habit-based interventions and flexible contingency planning."
  },

  {
    source: "self_monitoring_frequency",
    target: "adherence_consistency",
    relationship: "supports",
    strength: "moderate",
    direction: "positive",
    explanation:
      "Regular monitoring improves feedback, awareness, and timely correction of behavioural drift.",
    diagnosticUse:
      "Useful where the person loses awareness of intake, activity, or progress trends."
  },

  {
    source: "self_monitoring_frequency",
    target: "measurement_noise_interpretation",
    relationship: "improves",
    strength: "moderate",
    direction: "positive",
    explanation:
      "More frequent measurement can make noisy scale data easier to interpret as a trend rather than isolated readings.",
    diagnosticUse:
      "Connects adherence behaviour to the water-scale-noise domain."
  },

  {
    source: "behavioural_compensation",
    target: "weekly_energy_deficit",
    relationship: "reduces",
    strength: "high",
    direction: "negative",
    explanation:
      "Eating more after exercise or moving less after training can offset the intended calorie deficit.",
    diagnosticUse:
      "Explains why increasing exercise does not always produce expected fat-loss outcomes."
  },

  {
    source: "behavioural_compensation",
    target: "activity_energy_expenditure",
    relationship: "masks_expected_increase",
    strength: "moderate",
    direction: "negative",
    explanation:
      "A formal increase in exercise may be offset by reduced spontaneous movement or increased sedentary time.",
    diagnosticUse:
      "Prepares the graph for the activity-neat domain."
  },

  {
    source: "plan_person_fit",
    target: "perceived_plan_burden",
    relationship: "reduces",
    strength: "high",
    direction: "negative",
    explanation:
      "Plans that fit the person's lifestyle, preferences, budget, and constraints feel easier to follow.",
    diagnosticUse:
      "Frames adherence failure as a design signal rather than a character flaw."
  },

  {
    source: "plan_person_fit",
    target: "adherence_consistency",
    relationship: "supports",
    strength: "high",
    direction: "positive",
    explanation:
      "Better plan-person fit increases the likelihood that behaviours can be repeated long enough to produce results.",
    diagnosticUse:
      "Important for population-aware recommendations."
  },

  {
    source: "adherence_consistency",
    target: "fat_loss_outcome_confidence",
    relationship: "increases_interpretability_of",
    strength: "high",
    direction: "positive",
    explanation:
      "When adherence is consistent, outcome data becomes easier to interpret because behavioural noise is lower.",
    diagnosticUse:
      "Allows the diagnostic engine to more confidently evaluate whether the plan dose is sufficient."
  }
];