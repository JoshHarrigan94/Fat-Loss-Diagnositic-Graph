export const nutritionQualityEdges = [
  {
    source: "protein_adequacy",
    target: "nutrition_quality",
    relationship: "supports",
    strength: "high",
    direction: "positive",
    explanation:
      "Adequate protein improves overall diet quality in fat-loss contexts by supporting satiety, recovery, and lean-mass retention.",
    diagnosticUse:
      "Low protein should be corrected before making the deficit more aggressive."
  },

  {
    source: "protein_adequacy",
    target: "body_composition_outcome",
    relationship: "supports",
    strength: "high",
    direction: "positive",
    explanation:
      "Adequate protein helps preserve or build lean mass during fat loss, especially alongside resistance training.",
    diagnosticUse:
      "Links nutrition quality to future body-composition reasoning."
  },

  {
    source: "fibre_adequacy",
    target: "food_volume_satiety",
    relationship: "supports",
    strength: "high",
    direction: "positive",
    explanation:
      "Higher fibre intake often improves fullness through food volume, slower digestion, and better meal satisfaction.",
    diagnosticUse:
      "Low fibre may explain hunger despite calories being technically adequate."
  },

  {
    source: "micronutrient_density",
    target: "nutrition_quality",
    relationship: "supports",
    strength: "moderate",
    direction: "positive",
    explanation:
      "Micronutrient-dense diets better support health, energy, and long-term deficit sustainability.",
    diagnosticUse:
      "Useful when low-calorie diets are overly narrow or nutritionally poor."
  },

  {
    source: "ultra_processed_food_exposure",
    target: "passive_overconsumption_risk",
    relationship: "increases",
    strength: "high",
    direction: "positive",
    explanation:
      "Energy-dense, hyper-palatable foods can increase passive calorie intake without proportional satiety.",
    diagnosticUse:
      "Explains why reported adherence may fail in high-snack or takeaway environments."
  },

  {
    source: "ultra_processed_food_exposure",
    target: "adherence_consistency",
    relationship: "reduces",
    strength: "moderate",
    direction: "negative",
    explanation:
      "Frequent exposure to highly palatable foods can make consistent deficit adherence harder.",
    diagnosticUse:
      "Suggests improving food environment or meal defaults before lowering calories."
  },

  {
    source: "meal_structure_quality",
    target: "calorie_tracking_accuracy",
    relationship: "supports",
    strength: "moderate",
    direction: "positive",
    explanation:
      "Structured meals are usually easier to track and repeat than frequent unplanned grazing.",
    diagnosticUse:
      "Improves intake confidence where tracking gaps are caused by chaotic eating patterns."
  },

  {
    source: "meal_structure_quality",
    target: "perceived_plan_burden",
    relationship: "reduces",
    strength: "moderate",
    direction: "negative",
    explanation:
      "Clear meal structure can reduce decision fatigue and make adherence feel easier.",
    diagnosticUse:
      "Supports simple defaults for people overwhelmed by detailed tracking."
  },

  {
    source: "diet_variety",
    target: "dietary_flexibility",
    relationship: "supports",
    strength: "moderate",
    direction: "positive",
    explanation:
      "Greater food variety gives more options for maintaining the plan across different contexts.",
    diagnosticUse:
      "Useful when boredom or social constraints undermine adherence."
  },

  {
    source: "food_volume_satiety",
    target: "sleep_related_hunger_pressure",
    relationship: "buffers",
    strength: "moderate",
    direction: "negative",
    explanation:
      "High-volume, high-satiety meals can partially buffer hunger pressure from poor sleep or dieting.",
    diagnosticUse:
      "Helps prioritise meal composition before increasing dietary restriction."
  },

  {
    source: "liquid_calorie_exposure",
    target: "calorie_tracking_accuracy",
    relationship: "reduces",
    strength: "moderate",
    direction: "negative",
    explanation:
      "Liquid calories are often forgotten, underestimated, or poorly compensated for by reduced food intake.",
    diagnosticUse:
      "Useful when intake appears low but drinks, alcohol, or coffees are not consistently logged."
  },

  {
    source: "liquid_calorie_exposure",
    target: "weekly_energy_deficit",
    relationship: "reduces",
    strength: "high",
    direction: "negative",
    explanation:
      "Caloric drinks can meaningfully reduce or erase the weekly deficit.",
    diagnosticUse:
      "Especially important for alcohol, sugary drinks, and high-calorie coffees."
  },

  {
    source: "dietary_restriction_risk",
    target: "all_or_nothing_thinking",
    relationship: "increases",
    strength: "moderate",
    direction: "positive",
    explanation:
      "Highly restrictive food rules can amplify failure feelings after minor deviations.",
    diagnosticUse:
      "Explains cycles of rigid dieting followed by overeating."
  },

  {
    source: "dietary_restriction_risk",
    target: "adherence_consistency",
    relationship: "destabilises",
    strength: "moderate",
    direction: "negative",
    explanation:
      "Over-restriction can increase cravings, social friction, and rebound risk, reducing long-term adherence.",
    diagnosticUse:
      "Supports flexible, sustainable diet design."
  },

  {
    source: "nutrition_quality",
    target: "risk_adjusted_recommendations",
    relationship: "modifies",
    strength: "high",
    direction: "contextual",
    explanation:
      "Poor nutrition quality should shift recommendations toward improving food structure and nutrient adequacy before further restriction.",
    diagnosticUse:
      "Prevents the graph from treating calorie reduction as the only intervention lever."
  }
];