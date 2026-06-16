export const ATLAS_VIEWBOX = {
  width: 1440,
  height: 920
};

export const ATLAS_REGIONS = {
  outcomes: {
    key: "outcomes",
    label: "Outcomes",
    color: "#55606b",
    x: 720,
    y: 120
  },
  energy: {
    key: "energy",
    label: "Energy Balance",
    color: "#7d6a4c",
    x: 170,
    y: 390
  },
  appetite: {
    key: "appetite",
    label: "Appetite Regulation",
    color: "#8d5c4d",
    x: 360,
    y: 390
  },
  recovery: {
    key: "recovery",
    label: "Recovery",
    color: "#6d7389",
    x: 550,
    y: 390
  },
  activity: {
    key: "activity",
    label: "Activity",
    color: "#5c7680",
    x: 740,
    y: 390
  },
  hormones: {
    key: "hormones",
    label: "Hormones",
    color: "#7f6c87",
    x: 930,
    y: 390
  },
  behaviour: {
    key: "behaviour",
    label: "Behaviour",
    color: "#7d6459",
    x: 1120,
    y: 390
  },
  water: {
    key: "water",
    label: "Water Balance",
    color: "#5c7b78",
    x: 1270,
    y: 390
  },
  inputs: {
    key: "inputs",
    label: "Inputs",
    color: "#616161",
    x: 720,
    y: 720
  }
};

export const ATLAS_CANONICAL_SLOTS = [
  { slotId: "fat-loss", label: "Fat Loss", region: "outcomes", x: 210, y: 140, candidateIds: ["fat_mass_change", "fat_mass", "expected_fat_loss"] },
  { slotId: "weight-trend", label: "Weight Trend", region: "outcomes", x: 520, y: 140, candidateIds: ["body_weight_trend", "scale_weight", "fat_loss_outcome_confidence"] },
  { slotId: "maintenance", label: "Weight Maintenance", region: "outcomes", x: 830, y: 140, candidateIds: ["maintenance_calories", "body_weight_trend", "intervention_strategy"] },
  { slotId: "energy-levels", label: "Energy Levels", region: "outcomes", x: 1140, y: 140, candidateIds: ["recovery_capacity", "subjective_fatigue", "training_recovery_status"] },

  { slotId: "energy-system", label: "Energy Balance", region: "energy", x: 170, y: 385, candidateIds: ["energy_balance", "weekly_energy_deficit", "energy_intake_estimate"] },
  { slotId: "appetite-system", label: "Appetite Regulation", region: "appetite", x: 360, y: 385, candidateIds: ["appetite_regulation", "hunger_pressure", "satiety_response"] },
  { slotId: "recovery-system", label: "Recovery", region: "recovery", x: 550, y: 385, candidateIds: ["recovery_capacity", "recovery_debt", "training_recovery_status"] },
  { slotId: "activity-system", label: "Activity", region: "activity", x: 740, y: 385, candidateIds: ["activity_energy_expenditure", "neat_adaptation", "step_count_consistency"] },
  { slotId: "hormones-system", label: "Hormones", region: "hormones", x: 930, y: 385, candidateIds: ["hormones_life_stage_context", "hormonal_fluid_shift", "thyroid_risk_signal"] },
  { slotId: "behaviour-system", label: "Behaviour", region: "behaviour", x: 1120, y: 385, candidateIds: ["adherence_consistency", "calorie_tracking_accuracy", "perceived_plan_burden"] },
  { slotId: "water-system", label: "Water Balance", region: "water", x: 1270, y: 385, candidateIds: ["water_retention", "measurement_noise", "glycogen_storage"] },

  { slotId: "calories-input", label: "Calories", region: "inputs", x: 160, y: 728, candidateIds: ["energy_intake", "energy_intake_estimate"] },
  { slotId: "protein-input", label: "Protein", region: "inputs", x: 340, y: 728, candidateIds: ["protein_adequacy"] },
  { slotId: "steps-input", label: "Activity", region: "inputs", x: 520, y: 728, candidateIds: ["step_count_consistency", "activity_tracking_accuracy"] },
  { slotId: "sleep-input", label: "Sleep", region: "inputs", x: 700, y: 728, candidateIds: ["sleep_quality", "sleep_duration"] },
  { slotId: "stress-input", label: "Stress", region: "inputs", x: 880, y: 728, candidateIds: ["stress_load", "psychological_stress"] },
  { slotId: "training-input", label: "Training", region: "inputs", x: 1060, y: 728, candidateIds: ["exercise_training", "training_recovery_status", "training_load_fatigue"] },
  { slotId: "environment-input", label: "Environment", region: "inputs", x: 1240, y: 728, candidateIds: ["environmental_food_exposure", "routine_stability"] }
];

const DOMAIN_REGION_MAP = [
  { match: ["energy_balance", "glucose-insulin"], region: "energy" },
  { match: ["appetite-satiety"], region: "appetite" },
  { match: ["recovery-sleep"], region: "recovery" },
  { match: ["activity-neat", "exercise-training"], region: "activity" },
  { match: ["hormones-life-stage"], region: "hormones" },
  { match: ["adherence-behaviour", "stress-psychology"], region: "behaviour" },
  { match: ["water_scale_noise", "measurement-noise"], region: "water" },
  { match: ["nutrition-quality"], region: "energy" }
];

const OUTCOME_TYPES = new Set([
  "outcome",
  "tissue_change",
  "signal",
  "measurement",
  "diagnosis",
  "decision_output",
  "decision_confidence"
]);

const INPUT_TYPES = new Set([
  "input",
  "recovery_input",
  "measurement_behaviour",
  "behavioural_metric",
  "contextual_load",
  "intervention_domain"
]);

const REGION_OFFSETS = {
  energy: [[-90, -95], [85, -85], [-100, 88], [100, 74], [0, -152], [0, 146]],
  appetite: [[-86, -92], [90, -86], [-104, 82], [96, 80], [0, -150], [0, 142]],
  recovery: [[-88, -94], [84, -82], [-108, 84], [96, 76], [0, -150], [0, 144]],
  activity: [[-88, -90], [88, -84], [-104, 82], [96, 78], [0, -152], [0, 144]],
  hormones: [[-84, -92], [92, -84], [-104, 84], [94, 80], [0, -150], [0, 144]],
  behaviour: [[-90, -92], [90, -84], [-104, 82], [96, 80], [0, -148], [0, 144]],
  water: [[-86, -92], [90, -86], [-104, 82], [96, 78], [0, -150], [0, 146]],
  outcomes: [[-120, 50], [0, 60], [120, 50]],
  inputs: [[-110, -52], [0, -62], [110, -52]]
};

export function inferAtlasRegion(node = {}) {
  const type = String(node.type || "").toLowerCase();
  const id = String(node.id || "").toLowerCase();
  const domain = String(node.domain || "").toLowerCase();

  if (OUTCOME_TYPES.has(type) && (id.includes("weight") || id.includes("fat") || id.includes("energy") || type === "outcome")) {
    return "outcomes";
  }

  if (INPUT_TYPES.has(type) || id.includes("sleep") || id.includes("stress") || id.includes("protein") || id.includes("intake")) {
    return "inputs";
  }

  for (const matcher of DOMAIN_REGION_MAP) {
    if (matcher.match.some(term => domain.includes(term))) {
      return matcher.region;
    }
  }

  if (id.includes("water") || id.includes("glycogen") || id.includes("scale")) return "water";
  if (id.includes("sleep") || id.includes("recovery")) return "recovery";
  if (id.includes("activity") || id.includes("step") || id.includes("training")) return "activity";
  if (id.includes("horm")) return "hormones";
  if (id.includes("behav") || id.includes("adherence") || id.includes("tracking")) return "behaviour";
  if (id.includes("appetite") || id.includes("hunger") || id.includes("satiety")) return "appetite";
  if (id.includes("energy") || id.includes("calorie")) return "energy";

  return "behaviour";
}

export function getRegionAnchor(regionKey) {
  return ATLAS_REGIONS[regionKey] || ATLAS_REGIONS.behaviour;
}

export function getOffsetsForRegion(regionKey) {
  return REGION_OFFSETS[regionKey] || REGION_OFFSETS.behaviour;
}
