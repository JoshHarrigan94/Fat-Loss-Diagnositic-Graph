import {
  ATLAS_CANONICAL_SLOTS,
  ATLAS_REGIONS,
  ATLAS_VIEWBOX,
  getOffsetsForRegion,
  getRegionAnchor,
  inferAtlasRegion
} from "./atlasLayout.js";

const PATHWAY_LIBRARY = [
  {
    id: "pathway_stress_masking",
    match: ["stress", "recovery", "water_retention", "masked_fat_loss"],
    label: "Stress -> Sleep -> Water Retention",
    narrative:
      "Stress and recovery debt can drive fluid retention, making the scale look stalled even when fat loss may still be occurring.",
    nodeIds: [
      "stress_load",
      "sleep_quality",
      "recovery_capacity",
      "water_retention",
      "scale_weight",
      "masked_fat_loss"
    ]
  },
  {
    id: "pathway_energy_plateau",
    match: ["true_plateau", "insufficient_weekly_energy_deficit", "energy_balance"],
    label: "Calories -> Energy Balance -> Fat Loss",
    narrative:
      "When intake and expenditure no longer produce a strong enough weekly deficit, true fat loss slows even if adherence feels consistent.",
    nodeIds: [
      "energy_intake",
      "energy_balance",
      "calorie_deficit",
      "fat_mass",
      "body_weight_trend"
    ]
  },
  {
    id: "pathway_adherence_drift",
    match: ["adherence", "weekend", "tracking"],
    label: "Environment -> Adherence -> Intake",
    narrative:
      "Food environment and tracking drift can quietly erode the weekly deficit before the user experiences it as a clear plan failure.",
    nodeIds: [
      "environmental_food_exposure",
      "adherence_consistency",
      "calorie_tracking_accuracy",
      "energy_intake",
      "energy_balance",
      "fat_mass"
    ]
  },
  {
    id: "pathway_activity_adaptation",
    match: ["activity", "neet", "expenditure"],
    label: "Activity -> Expenditure -> Balance",
    narrative:
      "Lower movement or NEAT adaptation can shrink expenditure enough to flatten progress without any obvious change in food intake.",
    nodeIds: [
      "step_count_consistency",
      "activity_energy_expenditure",
      "neat_adaptation",
      "energy_expenditure",
      "energy_balance",
      "fat_mass"
    ]
  },
  {
    id: "pathway_appetite_fatigue",
    match: ["diet_fatigue", "hunger", "burden"],
    label: "Diet Fatigue -> Appetite -> Adherence",
    narrative:
      "Long or aggressive dieting can increase hunger and plan burden until adherence slips before the scale explains why.",
    nodeIds: [
      "perceived_plan_burden",
      "hunger_pressure",
      "appetite_regulation",
      "adherence_consistency",
      "energy_intake",
      "energy_balance"
    ]
  },
  {
    id: "pathway_hormonal_context",
    match: ["hormonal", "menopause", "thyroid"],
    label: "Hormonal Context -> Fluid Shift -> Scale",
    narrative:
      "Life-stage or hormonal context can change fluid balance and body-composition dynamics, altering how progress appears on the scale.",
    nodeIds: [
      "hormones_life_stage_context",
      "hormonal_fluid_shift",
      "water_retention",
      "scale_weight",
      "body_weight_trend"
    ]
  }
];

export function buildAtlasViewModel({
  graph,
  diagnosis,
  mode = "atlas",
  selectedNodeId = null,
  selectedPathwayIndex = 0
}) {
  const pathways = resolvePathways(graph, diagnosis);
  const activePathway =
    pathways[selectedPathwayIndex] ||
    pathways[0] ||
    createFallbackPathway(graph);

  const canonicalNodes = resolveCanonicalNodes(graph);
  const displayNodeMap = new Map(canonicalNodes.map(node => [node.id, node]));

  const pathwayNodes = activePathway.nodeIds
    .map(nodeId => graph.nodeMap.get(nodeId))
    .filter(Boolean);

  pathwayNodes.forEach(node => {
    if (displayNodeMap.has(node.id)) return;
    displayNodeMap.set(node.id, createSatelliteNode(node, displayNodeMap));
  });

  if (mode === "atlas") {
    const additionalNodes = gatherAtlasNodes(graph, diagnosis, displayNodeMap);
    additionalNodes.forEach(node => {
      if (!displayNodeMap.has(node.id)) {
        displayNodeMap.set(node.id, createSatelliteNode(node, displayNodeMap));
      }
    });
  }

  const nodes = Array.from(displayNodeMap.values());
  const nodeLookup = new Map(nodes.map(node => [node.id, node]));
  const includedNodeIds = new Set(nodes.map(node => node.id));

  const edges = buildVisibleEdges({
    graph,
    includedNodeIds,
    nodeLookup,
    activePathway,
    mode
  });

  const selectedNode =
    nodeLookup.get(selectedNodeId) ||
    nodeLookup.get(activePathway.nodeIds[0]) ||
    nodes.find(node => node.kind === "system") ||
    nodes[0] ||
    null;

  return {
    mode,
    viewBox: ATLAS_VIEWBOX,
    sectionBands: buildSectionBands(),
    nodes,
    edges,
    pathways,
    activePathway,
    selectedNode,
    nodeDetails: buildNodeDetails(graph, selectedNode),
    caption:
      activePathway?.narrative ||
      "The atlas shows the systems and pathways most relevant to the current fat-loss diagnosis."
  };
}

function resolveCanonicalNodes(graph) {
  return ATLAS_CANONICAL_SLOTS.flatMap(slot => {
    const node = slot.candidateIds
      .map(candidateId => graph.nodeMap.get(candidateId))
      .find(Boolean);

    if (!node) return [];

    return [adaptNodeForAtlas(node, {
      x: slot.x,
      y: slot.y,
      region: slot.region,
      label: slot.label,
      kind: slot.region === "outcomes" ? "outcome" : slot.region === "inputs" ? "input" : "system"
    })];
  });
}

function gatherAtlasNodes(graph, diagnosis, displayNodeMap) {
  const ids = new Set([
    ...(diagnosis?.activatedNodeIds || []).slice(0, 18),
    ...(diagnosis?.likelyIssues || []),
    ...(diagnosis?.recommendationPackage?.explanation?.likelyIssues || [])
  ]);

  return Array.from(ids)
    .map(nodeId => graph.nodeMap.get(nodeId))
    .filter(Boolean)
    .filter(node => !displayNodeMap.has(node.id));
}

function createSatelliteNode(node, displayNodeMap) {
  const region = inferAtlasRegion(node);
  const anchor = getRegionAnchor(region);
  const offsets = getOffsetsForRegion(region);
  const siblings = Array.from(displayNodeMap.values()).filter(item => item.region === region).length;
  const offset = offsets[siblings % offsets.length];

  return adaptNodeForAtlas(node, {
    x: anchor.x + offset[0],
    y: anchor.y + offset[1],
    region,
    label: node.label,
    kind: "satellite"
  });
}

function adaptNodeForAtlas(node, placement) {
  const region = placement.region || inferAtlasRegion(node);
  const palette = ATLAS_REGIONS[region] || ATLAS_REGIONS.behaviour;

  return {
    id: node.id,
    label: placement.label || node.label || formatLabel(node.id),
    baseLabel: node.label || formatLabel(node.id),
    x: placement.x,
    y: placement.y,
    region,
    color: palette.color,
    kind: placement.kind || "satellite",
    description:
      node.description ||
      node.reasoningPurpose ||
      node.coachingImplication ||
      "No atlas annotation available.",
    coaching:
      node.coachingImplication ||
      node.reasoningPurpose ||
      "Use this node to understand the mechanism behind the current diagnosis.",
    interventions: node.interventions || [],
    evidence: node.observedBy || node.influencedBy || [],
    type: node.type || "unknown"
  };
}

function buildVisibleEdges({
  graph,
  includedNodeIds,
  nodeLookup,
  activePathway,
  mode
}) {
  const rendered = [];
  const seen = new Set();
  const pathwayPairs = new Set();

  for (let index = 0; index < activePathway.nodeIds.length - 1; index += 1) {
    pathwayPairs.add(`${activePathway.nodeIds[index]}::${activePathway.nodeIds[index + 1]}`);
  }

  graph.edges.forEach(edge => {
    if (!includedNodeIds.has(edge.source) || !includedNodeIds.has(edge.target)) {
      return;
    }

    if (mode === "diagnostic" && !pathwayPairs.has(`${edge.source}::${edge.target}`)) {
      return;
    }

    const key = `${edge.source}:${edge.target}:${edge.relationship}`;
    if (seen.has(key)) return;
    seen.add(key);

    rendered.push(adaptEdgeForAtlas(edge, nodeLookup, pathwayPairs));
  });

  pathwayPairs.forEach(pair => {
    const [source, target] = pair.split("::");
    const key = `${source}:${target}`;
    if (rendered.some(edge => edge.key === key)) return;

    const sourceNode = nodeLookup.get(source);
    const targetNode = nodeLookup.get(target);
    if (!sourceNode || !targetNode) return;

    rendered.push(adaptEdgeForAtlas({
      source,
      target,
      relationship: "influences",
      explanation: `${sourceNode.label} influences ${targetNode.label}.`
    }, nodeLookup, pathwayPairs));
  });

  return rendered;
}

function adaptEdgeForAtlas(edge, nodeLookup, pathwayPairs) {
  const source = nodeLookup.get(edge.source);
  const target = nodeLookup.get(edge.target);
  const isPathway = pathwayPairs.has(`${edge.source}::${edge.target}`);

  return {
    id: `${edge.source}-${edge.target}-${edge.relationship || "edge"}`,
    key: `${edge.source}:${edge.target}`,
    source: edge.source,
    target: edge.target,
    relationship: edge.relationship || "related_to",
    explanation: edge.explanation || `${source?.label || edge.source} influences ${target?.label || edge.target}.`,
    path: buildCurve(source, target),
    isPathway,
    color: isPathway ? source?.color || "#6d7389" : "#b9b2a9"
  };
}

function buildCurve(source, target) {
  if (!source || !target) return "";

  const dx = target.x - source.x;
  const curvature = Math.max(65, Math.abs(dx) * 0.25);

  return `M ${source.x} ${source.y} C ${source.x} ${source.y + curvature}, ${target.x} ${target.y - curvature}, ${target.x} ${target.y}`;
}

function resolvePathways(graph, diagnosis) {
  const evidenceText = [
    diagnosis?.primaryHypothesis?.label || "",
    diagnosis?.primaryHypothesis?.explanation || "",
    ...(diagnosis?.likelyIssues || []),
    ...(diagnosis?.recommendationPackage?.explanation?.likelyIssues || [])
  ]
    .join(" ")
    .toLowerCase();

  const matched = PATHWAY_LIBRARY.filter(pathway =>
    pathway.match.some(term => evidenceText.includes(term))
  ).map(pathway => hydratePathway(graph, pathway));

  if (matched.length) {
    return dedupePathways(matched);
  }

  return [hydratePathway(graph, PATHWAY_LIBRARY[0])];
}

function hydratePathway(graph, pathway) {
  const nodeIds = pathway.nodeIds.filter(nodeId => graph.nodeMap.has(nodeId));

  return {
    id: pathway.id,
    label: pathway.label,
    narrative: pathway.narrative,
    nodeIds
  };
}

function dedupePathways(pathways) {
  const seen = new Set();

  return pathways.filter(pathway => {
    const key = pathway.nodeIds.join("|");
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

function createFallbackPathway(graph) {
  const fallbackIds = [
    "energy_intake",
    "energy_balance",
    "fat_mass",
    "body_weight_trend"
  ].filter(nodeId => graph.nodeMap.has(nodeId));

  return {
    id: "pathway_fallback",
    label: "Core fat-loss pathway",
    narrative:
      "Energy intake, balance, and body-mass outcomes form the core explanatory line when no more specific pathway has been selected.",
    nodeIds: fallbackIds
  };
}

function buildNodeDetails(graph, node) {
  if (!node) return null;

  const source = graph.nodeMap.get(node.id) || {};
  const outgoing = (graph.outgoing.get(node.id) || []).slice(0, 6);
  const incoming = (graph.incoming.get(node.id) || []).slice(0, 6);

  return {
    id: node.id,
    label: node.label,
    description: node.description,
    coaching: node.coaching,
    relationships: [
      ...outgoing.map(edge => ({
        direction: "influences",
        label: `${node.baseLabel} ${formatLabel(edge.relationship)} ${graph.nodeMap.get(edge.target)?.label || formatLabel(edge.target)}`,
        explanation: edge.explanation
      })),
      ...incoming.map(edge => ({
        direction: "is shaped by",
        label: `${graph.nodeMap.get(edge.source)?.label || formatLabel(edge.source)} ${formatLabel(edge.relationship)} ${node.baseLabel}`,
        explanation: edge.explanation
      }))
    ].slice(0, 8),
    interventions: source.interventions || [],
    evidence: source.observedBy || source.influencedBy || []
  };
}

function buildSectionBands() {
  return [
    { id: "outcomes", label: "Outcomes", y: 90, height: 120 },
    { id: "systems", label: "Major Systems", y: 280, height: 240 },
    { id: "inputs", label: "Inputs", y: 640, height: 130 }
  ];
}

function formatLabel(value) {
  return String(value || "unknown")
    .replaceAll("_", " ")
    .replace(/\b\w/g, char => char.toUpperCase());
}
