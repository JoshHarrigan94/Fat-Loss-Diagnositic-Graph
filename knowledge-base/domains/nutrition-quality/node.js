export const nutritionQualityNodes = [
  {
    id: "nutrition_quality",
    label: "Nutrition Quality",
    type: "diet_quality_state",
    domain: "nutrition-quality",
    description:
      "The overall quality of the diet beyond calories, including protein, fibre, micronutrients, food processing level, meal structure, variety, and health-supportive food choices.",
    diagnosticRole: "core",
    appliesTo: ["fat_loss", "body_recomposition", "obesity", "type_2_diabetes", "general_health", "performance"],
    observableVia: [
      "protein_intake",
      "fibre_intake",
      "fruit_vegetable_intake",
      "whole_food_ratio",
      "ultra_processed_food_intake",
      "micronutrient_density",
      "meal_structure"
    ],
    reasoningPurpose:
      "Determines whether the diet supports satiety, health, adherence, training, and long-term sustainability.",
    evidenceLevel: "high",
    tags: ["nutrition", "diet-quality", "satiety", "health"]
  },

  {
    id: "protein_adequacy",
    label: "Protein Adequacy",
    type: "nutrient_adequacy",
    domain: "nutrition-quality",
    description:
      "The degree to which protein intake supports satiety, lean-mass retention, recovery, and body composition goals.",
    diagnosticRole: "core",
    appliesTo: ["fat_loss", "body_recomposition", "bodybuilding", "older_adults", "performance"],
    observableVia: [
      "daily_protein_grams",
      "protein_per_kg_bodyweight",
      "protein_distribution",
      "meal_protein_dose",
      "lean_mass_goal"
    ],
    reasoningPurpose:
      "Determines whether inadequate protein may be compromising satiety, muscle retention, or recovery during fat loss.",
    evidenceLevel: "high",
    tags: ["protein", "lean-mass", "satiety", "recovery"]
  },

  {
    id: "fibre_adequacy",
    label: "Fibre Adequacy",
    type: "nutrient_adequacy",
    domain: "nutrition-quality",
    description:
      "The degree to which fibre intake supports satiety, gut health, stool regularity, glucose regulation, and cardiometabolic health.",
    diagnosticRole: "core",
    appliesTo: ["fat_loss", "obesity", "type_2_diabetes", "general_health", "chronic_illness"],
    observableVia: [
      "daily_fibre_grams",
      "fruit_intake",
      "vegetable_intake",
      "legume_intake",
      "wholegrain_intake",
      "stool_regularitу"
    ],
    reasoningPurpose:
      "Identifies whether low fibre is increasing hunger, reducing diet quality, or worsening metabolic health.",
    evidenceLevel: "high",
    tags: ["fibre", "satiety", "gut-health", "glucose"]
  },

  {
    id: "micronutrient_density",
    label: "Micronutrient Density",
    type: "nutrient_quality",
    domain: "nutrition-quality",
    description:
      "The concentration of vitamins, minerals, essential fatty acids, and beneficial phytonutrients relative to total calorie intake.",
    diagnosticRole: "supporting",
    appliesTo: ["fat_loss", "general_health", "older_adults", "youth", "chronic_illness", "performance"],
    observableVia: [
      "fruit_vegetable_intake",
      "whole_food_ratio",
      "diet_variety",
      "red_meat_intake",
      "fish_intake",
      "fortified_foods",
      "known_deficiencies"
    ],
    reasoningPurpose:
      "Assesses whether a calorie deficit is nutritionally robust enough to support health, energy, and adherence.",
    evidenceLevel: "moderate",
    tags: ["micronutrients", "diet-quality", "health", "deficiency-risk"]
  },

  {
    id: "ultra_processed_food_exposure",
    label: "Ultra-Processed Food Exposure",
    type: "food_environment_factor",
    domain: "nutrition-quality",
    description:
      "The proportion and frequency of highly processed, energy-dense, hyper-palatable foods in the diet.",
    diagnosticRole: "core",
    appliesTo: ["fat_loss", "obesity", "type_2_diabetes", "general_health", "youth"],
    observableVia: [
      "snack_food_frequency",
      "takeaway_frequency",
      "processed_meal_frequency",
      "high_palatable_food_intake",
      "low_satiety_foods"
    ],
    reasoningPurpose:
      "Explains increased passive overconsumption, reduced satiety, and difficulty maintaining a deficit.",
    evidenceLevel: "high",
    tags: ["ultra-processed-food", "satiety", "overconsumption", "obesity"]
  },

  {
    id: "meal_structure_quality",
    label: "Meal Structure Quality",
    type: "diet_structure",
    domain: "nutrition-quality",
    description:
      "The consistency and usefulness of meal timing, meal composition, protein distribution, and planned eating occasions.",
    diagnosticRole: "supporting",
    appliesTo: ["fat_loss", "body_recomposition", "type_2_diabetes", "general_health", "performance"],
    observableVia: [
      "meal_frequency",
      "breakfast_pattern",
      "protein_distribution",
      "planned_meals",
      "late_night_eating",
      "meal_skipping"
    ],
    reasoningPurpose:
      "Determines whether poor structure is increasing hunger, decision fatigue, or intake variability.",
    evidenceLevel: "moderate",
    tags: ["meal-structure", "timing", "planning", "adherence"]
  },

  {
    id: "diet_variety",
    label: "Diet Variety",
    type: "diet_quality_feature",
    domain: "nutrition-quality",
    description:
      "The range of foods consumed across protein sources, carbohydrates, fats, fruit, vegetables, legumes, grains, and culturally preferred foods.",
    diagnosticRole: "supporting",
    appliesTo: ["fat_loss", "general_health", "older_adults", "youth", "chronic_illness"],
    observableVia: [
      "unique_food_count",
      "fruit_variety",
      "vegetable_variety",
      "protein_source_variety",
      "restricted_food_groups"
    ],
    reasoningPurpose:
      "Identifies whether narrow diets increase deficiency risk, boredom, or dropout risk.",
    evidenceLevel: "moderate",
    tags: ["variety", "micronutrients", "sustainability", "diet-quality"]
  },

  {
    id: "food_volume_satiety",
    label: "Food Volume Satiety",
    type: "satiety_driver",
    domain: "nutrition-quality",
    description:
      "The degree to which food choices provide physical fullness through volume, water content, fibre, and low energy density.",
    diagnosticRole: "core",
    appliesTo: ["fat_loss", "obesity", "general_health", "body_recomposition"],
    observableVia: [
      "vegetable_intake",
      "fruit_intake",
      "soup_intake",
      "low_energy_density_foods",
      "meal_volume",
      "hunger_rating"
    ],
    reasoningPurpose:
      "Explains why calorie-matched diets can differ strongly in hunger and adherence.",
    evidenceLevel: "high",
    tags: ["satiety", "food-volume", "energy-density", "hunger"]
  },

  {
    id: "liquid_calorie_exposure",
    label: "Liquid Calorie Exposure",
    type: "intake_risk_factor",
    domain: "nutrition-quality",
    description:
      "Calories consumed through drinks such as sugary beverages, alcohol, smoothies, coffees, juices, and meal replacement liquids.",
    diagnosticRole: "supporting",
    appliesTo: ["fat_loss", "obesity", "type_2_diabetes", "general_health"],
    observableVia: [
      "sugary_drinks",
      "alcohol_units",
      "calorie_coffees",
      "juice_intake",
      "smoothies",
      "liquid_meal_frequency"
    ],
    reasoningPurpose:
      "Identifies hidden calorie sources that may provide weak satiety and reduce deficit reliability.",
    evidenceLevel: "high",
    tags: ["liquid-calories", "hidden-intake", "satiety", "alcohol"]
  },

  {
    id: "dietary_restriction_risk",
    label: "Dietary Restriction Risk",
    type: "sustainability_risk",
    domain: "nutrition-quality",
    description:
      "The risk that food rules, exclusions, low variety, or aggressive restriction create cravings, nutrient gaps, social friction, or rebound eating.",
    diagnosticRole: "core",
    appliesTo: ["fat_loss", "body_recomposition", "obesity", "youth", "general_health"],
    observableVia: [
      "food_rule_count",
      "excluded_food_groups",
      "craving_frequency",
      "social_avoidance",
      "binge_rebound_frequency",
      "diet_history"
    ],
    reasoningPurpose:
      "Prevents high-control nutrition strategies from being mistaken for sustainable adherence.",
    evidenceLevel: "moderate",
    tags: ["restriction", "sustainability", "rebound-risk", "diet-history"]
  }
];