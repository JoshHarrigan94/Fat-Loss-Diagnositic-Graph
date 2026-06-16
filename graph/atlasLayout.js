export const ATLAS_VIEWBOX = {
  width: 1800,
  height: 1180
};

export const atlasPosterManifest = {
  title: "FAT LOSS\nDIAGNOSTIC ATLAS",
  subtitle: "A systems model of human fat-loss physiology",
  leftRail: {
    legend: [
      "Primary system",
      "Secondary system",
      "Mechanism",
      "Outcome",
      "Input / behaviour",
      "Strong influence",
      "Moderate influence",
      "Weak influence"
    ],
    principles: [
      "Everything interacts.",
      "Inputs feed systems.",
      "Systems shape the scale.",
      "The scale is not the whole story.",
      "Pathways matter more than single metrics."
    ],
    levels: [
      "01 Outcomes",
      "02 Systems",
      "03 Mechanisms",
      "04 Inputs"
    ],
    quote:
      "The map is not there to simplify physiology. It is there to make complexity readable."
  },
  rightRail: {
    howToRead: [
      "Outcomes sit at the top.",
      "Domains are the major systems.",
      "Mechanisms live inside the clusters.",
      "Inputs feed the systems below.",
      "Everything influences everything."
    ],
    influenceScale: [
      "Stronger influence",
      "Moderate influence",
      "Weaker influence"
    ],
    timeHorizon: [
      "Immediate (now)",
      "Short term (days / weeks)",
      "Medium term (months)",
      "Long term (years)"
    ],
    notes: [
      "The map is not linear.",
      "Feedback loops exist across systems.",
      "Scale weight is only one visible surface."
    ]
  }
};

export const atlasOutcomeManifest = [
  {
    slotId: "fat-loss-outcome",
    label: "Fat Loss",
    caption: "Stored tissue change over time",
    candidateIds: ["fat_mass_change", "fat_mass", "expected_fat_loss"],
    x: 420,
    y: 122
  },
  {
    slotId: "scale-outcome",
    label: "Scale Trend",
    caption: "Visible body-mass movement",
    candidateIds: ["body_weight_trend", "scale_weight", "fat_loss_outcome_confidence"],
    x: 670,
    y: 122
  },
  {
    slotId: "maintenance-outcome",
    label: "Weight Maintenance",
    caption: "Sustainable equilibrium",
    candidateIds: ["maintenance_calories", "body_weight_trend"],
    x: 920,
    y: 122
  },
  {
    slotId: "body-comp-outcome",
    label: "Muscle Retention",
    caption: "Protect lean tissue",
    candidateIds: ["muscle_gain_potential", "fat_mass_change"],
    x: 1170,
    y: 122
  },
  {
    slotId: "energy-outcome",
    label: "Energy Levels",
    caption: "Recovery and subjective capacity",
    candidateIds: ["recovery_capacity", "subjective_fatigue", "training_recovery_status"],
    x: 1420,
    y: 122
  }
];

export const atlasHubManifest = [
  {
    id: "activity",
    label: "ACTIVITY\nSYSTEM",
    caption: "Movement, expenditure, NEAT",
    color: "#5d6f8a",
    x: 590,
    y: 340,
    candidateIds: ["activity_energy_expenditure", "neat_adaptation", "step_count_consistency"],
    annotation: ["Step consistency", "NEAT drift", "Energy expenditure"],
    icon: "◌"
  },
  {
    id: "energy",
    label: "ENERGY\nSYSTEM",
    caption: "Intake, deficit, partitioning",
    color: "#83674f",
    x: 1210,
    y: 340,
    candidateIds: ["energy_balance", "weekly_energy_deficit", "energy_intake_estimate"],
    annotation: ["Calorie balance", "Deficit size", "Energy partitioning"],
    icon: "⚡"
  },
  {
    id: "recovery",
    label: "RECOVERY\nSYSTEM",
    caption: "Sleep, stress, recovery debt",
    color: "#7b776e",
    x: 485,
    y: 615,
    candidateIds: ["recovery_capacity", "recovery_debt", "sleep_quality"],
    annotation: ["Sleep quality", "Stress load", "Recovery debt"],
    icon: "↺"
  },
  {
    id: "water",
    label: "WATER\nSYSTEM",
    caption: "Masking, retention, volatility",
    color: "#6d837c",
    x: 1315,
    y: 615,
    candidateIds: ["water_retention", "measurement_noise", "glycogen_storage"],
    annotation: ["Water retention", "Glycogen shifts", "Scale noise"],
    icon: "◍"
  },
  {
    id: "nutrition",
    label: "NUTRITION\nSYSTEM",
    caption: "Protein, food quality, satiety",
    color: "#7b8a77",
    x: 615,
    y: 885,
    candidateIds: ["protein_adequacy", "appetite_regulation", "hunger_pressure"],
    annotation: ["Protein adequacy", "Appetite regulation", "Food structure"],
    icon: "◒"
  },
  {
    id: "behaviour",
    label: "BEHAVIOUR\nSYSTEM",
    caption: "Adherence, environment, burden",
    color: "#876c66",
    x: 1185,
    y: 885,
    candidateIds: ["adherence_consistency", "calorie_tracking_accuracy", "perceived_plan_burden"],
    annotation: ["Adherence", "Tracking accuracy", "Plan burden"],
    icon: "◈"
  },
  {
    id: "hormonal",
    label: "HORMONAL\nCONTEXT",
    caption: "Life stage, fluid shifts, context",
    color: "#80718a",
    x: 900,
    y: 730,
    candidateIds: ["hormones_life_stage_context", "hormonal_fluid_shift", "thyroid_risk_signal"],
    annotation: ["Life stage", "Fluid shifts", "Medical context"],
    icon: "◠"
  }
];

export const atlasInputManifest = [
  {
    slotId: "calories-input",
    label: "Calories",
    caption: "Total intake",
    candidateIds: ["energy_intake", "energy_intake_estimate"],
    x: 360,
    y: 1088
  },
  {
    slotId: "protein-input",
    label: "Protein",
    caption: "Adequacy and retention",
    candidateIds: ["protein_adequacy"],
    x: 560,
    y: 1088
  },
  {
    slotId: "activity-input",
    label: "Activity",
    caption: "Steps and movement",
    candidateIds: ["step_count_consistency", "activity_tracking_accuracy"],
    x: 760,
    y: 1088
  },
  {
    slotId: "sleep-input",
    label: "Sleep",
    caption: "Duration and quality",
    candidateIds: ["sleep_duration", "sleep_quality"],
    x: 960,
    y: 1088
  },
  {
    slotId: "stress-input",
    label: "Stress",
    caption: "External and internal load",
    candidateIds: ["stress_load", "psychological_stress"],
    x: 1160,
    y: 1088
  },
  {
    slotId: "training-input",
    label: "Training",
    caption: "Load and recovery cost",
    candidateIds: ["exercise_training", "training_recovery_status", "training_load_fatigue"],
    x: 1360,
    y: 1088
  }
];

export const atlasPathwayManifest = {
  trackColor: "#243346",
  pathwayHighlightColor: "#162638",
  strokeColor: "#b7ab99"
};

const REGION_TO_HUB = {
  energy: "energy",
  appetite: "nutrition",
  recovery: "recovery",
  activity: "activity",
  hormones: "hormonal",
  behaviour: "behaviour",
  water: "water",
  outcomes: "energy",
  inputs: "behaviour"
};

const DOMAIN_REGION_MAP = [
  { match: ["energy_balance", "glucose-insulin"], region: "energy" },
  { match: ["appetite-satiety", "nutrition-quality"], region: "appetite" },
  { match: ["recovery-sleep"], region: "recovery" },
  { match: ["activity-neat", "exercise-training"], region: "activity" },
  { match: ["hormones-life-stage"], region: "hormones" },
  { match: ["adherence-behaviour", "stress-psychology"], region: "behaviour" },
  { match: ["water_scale_noise", "measurement-noise"], region: "water" }
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

const HUB_CLUSTER_OFFSETS = {
  activity: [[-110, -80], [112, -74], [-124, 8], [124, 14], [-88, 94], [92, 102], [0, -138]],
  energy: [[-116, -84], [114, -72], [-126, 10], [126, 16], [-86, 102], [94, 108], [0, -138]],
  recovery: [[-112, -82], [108, -70], [-128, 10], [124, 14], [-86, 104], [92, 108], [0, -138]],
  water: [[-112, -82], [110, -68], [-128, 14], [126, 18], [-86, 104], [92, 108], [0, -138]],
  nutrition: [[-110, -76], [112, -70], [-126, 12], [124, 18], [-88, 100], [92, 102], [0, -132]],
  behaviour: [[-110, -80], [114, -74], [-126, 10], [124, 16], [-86, 102], [92, 108], [0, -136]],
  hormonal: [[-96, -88], [98, -88], [-112, 12], [112, 16], [-70, 96], [72, 102]]
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
  if (id.includes("appetite") || id.includes("hunger") || id.includes("satiety") || id.includes("protein")) return "appetite";
  if (id.includes("energy") || id.includes("calorie")) return "energy";

  return "behaviour";
}

export function inferAtlasHubId(node = {}) {
  const region = inferAtlasRegion(node);
  return REGION_TO_HUB[region] || "behaviour";
}

export function getHubManifest(hubId) {
  return atlasHubManifest.find(hub => hub.id === hubId) || atlasHubManifest[0];
}

export function getHubOffsets(hubId) {
  return HUB_CLUSTER_OFFSETS[hubId] || HUB_CLUSTER_OFFSETS.behaviour;
}
