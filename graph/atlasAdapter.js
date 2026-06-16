import {
  ATLAS_VIEWBOX,
  atlasHubManifest,
  atlasInputManifest,
  atlasOutcomeManifest,
  atlasPathwayManifest,
  atlasPosterManifest,
  getHubManifest,
  getHubOffsets,
  inferAtlasHubId,
  inferAtlasRegion
} from "./atlasLayout.js";

const PATHWAY_LIBRARY = [
  {
    id: "pathway_stress_masking",
    match: ["stress", "recovery", "water_retention", "masked_fat_loss"],
    label: "Stress -> Sleep -> Water Retention",
    narrative:
      "Stress and recovery debt can increase fluid retention, making the scale look stalled even when fat loss may still be occurring.",
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
    label: "Calories -> Energy Balance -> Scale Trend",
    narrative:
      "When weekly intake and expenditure no longer create enough deficit, true fat-loss slows and the scale trend stabilises for real rather than by masking alone.",
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
      "Food environment, weekends, and tracking drift can erode the weekly deficit before the user experiences it as obvious plan failure.",
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
    id: "pathway_recovery_bottleneck",
    match: ["recovery", "sleep", "fatigue"],
    label: "Sleep -> Recovery -> Scale Distortion",
    narrative:
      "Poor sleep and recovery pressure can distort the visible trend through fatigue, inflammation, and water shifts before calories are the right target.",
    nodeIds: [
      "sleep_duration",
      "sleep_quality",
      "recovery_capacity",
      "subjective_fatigue",
      "water_retention",
      "scale_weight"
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

  const displayNodes = new Map();

  const centerNode = createCenterNode(diagnosis);
  displayNodes.set(centerNode.id, centerNode);

  atlasOutcomeManifest.forEach(slot => {
    const node = resolveManifestNode(graph, slot, "outcome");
    if (node) displayNodes.set(node.id, node);
  });

  atlasInputManifest.forEach(slot => {
    const node = resolveManifestNode(graph, slot, "input");
    if (node) displayNodes.set(node.id, node);
  });

  atlasHubManifest.forEach(hub => {
    const node = resolveManifestNode(graph, hub, "hub");
    if (node) displayNodes.set(node.id, node);
  });

  const pathwayNodes = activePathway.nodeIds
    .map(nodeId => graph.nodeMap.get(nodeId))
    .filter(Boolean);

  pathwayNodes.forEach(node => {
    if (displayNodes.has(node.id)) return;
    displayNodes.set(node.id, createMechanismNode(node, displayNodes));
  });

  if (mode !== "diagnostic") {
    gatherAtlasNodes(graph, diagnosis, displayNodes).forEach(node => {
      if (displayNodes.has(node.id)) return;
      displayNodes.set(node.id, createMechanismNode(node, displayNodes));
    });
  }

  const nodes = Array.from(displayNodes.values());
  const nodeLookup = new Map(nodes.map(node => [node.id, node]));
  const edges = buildEdges({
    graph,
    nodeLookup,
    activePathway,
    mode
  });

  const selectedNode =
    nodeLookup.get(selectedNodeId) ||
    nodeLookup.get(activePathway.nodeIds[0]) ||
    centerNode;

  return {
    mode,
    viewBox: ATLAS_VIEWBOX,
    poster: atlasPosterManifest,
    pathwayStyle: atlasPathwayManifest,
    nodes,
    edges,
    pathways,
    activePathway,
    selectedNode,
    nodeDetails: buildNodeDetails(graph, selectedNode, diagnosis),
    caption:
      activePathway?.narrative ||
      "The atlas shows the systems and pathways most relevant to the current fat-loss diagnosis."
  };
}

function createCenterNode(diagnosis) {
  return {
    id: "atlas_central_state",
    label: "FAT-LOSS\nSTATE",
    baseLabel: "Fat-Loss State",
    x: 900,
    y: 560,
    visualTier: "center",
    region: "outcomes",
    hubId: "energy",
    color: "#2b2a28",
    description:
      diagnosis?.primaryHypothesis?.explanation ||
      "The centre of the atlas represents the visible state the user experiences: movement, masking, and perceived progress.",
    coaching:
      diagnosis?.recommendationPackage?.primary?.message ||
      "Use the surrounding systems to understand why the visible state does or does not match expected fat loss.",
    interventions: [],
    evidence: diagnosis?.likelyIssues || [],
    annotation: [
      diagnosis?.primaryHypothesis?.label || "Current diagnostic interpretation",
      diagnosis?.confidenceProfile?.overall?.label || "Confidence profile"
    ],
    isSynthetic: true
  };
}

function resolveManifestNode(graph, manifest, visualTier) {
  const source = manifest.candidateIds
    .map(candidateId => graph.nodeMap.get(candidateId))
    .find(Boolean);

  if (!source) return null;

  const region = visualTier === "hub"
    ? inferAtlasRegion(source)
    : visualTier === "outcome"
      ? "outcomes"
      : "inputs";

  const hubManifest = visualTier === "hub" ? manifest : getHubManifest(inferAtlasHubId(source));

  return {
    id: source.id,
    label: manifest.label,
    baseLabel: source.label || manifest.label,
    caption: manifest.caption || "",
    x: manifest.x,
    y: manifest.y,
    visualTier,
    region,
    hubId: hubManifest.id,
    color: hubManifest.color,
    description:
      source.description ||
      source.reasoningPurpose ||
      "No atlas description available.",
    coaching:
      source.coachingImplication ||
      source.reasoningPurpose ||
      manifest.caption ||
      "No coaching implication available.",
    interventions: source.interventions || [],
    evidence: source.observedBy || source.influencedBy || [],
    annotation: manifest.annotation || [],
    icon: manifest.icon || "",
    type: source.type || "unknown"
  };
}

function createMechanismNode(node, displayNodes) {
  const hubId = inferAtlasHubId(node);
  const hub = getHubManifest(hubId);
  const offsets = getHubOffsets(hubId);
  const siblings = Array.from(displayNodes.values()).filter(item => item.hubId === hubId && item.visualTier === "mechanism").length;
  const offset = offsets[siblings % offsets.length];

  return {
    id: node.id,
    label: node.label || formatLabel(node.id),
    baseLabel: node.label || formatLabel(node.id),
    x: hub.x + offset[0],
    y: hub.y + offset[1],
    visualTier: "mechanism",
    region: inferAtlasRegion(node),
    hubId,
    color: hub.color,
    description:
      node.description ||
      node.reasoningPurpose ||
      node.coachingImplication ||
      "No atlas annotation available.",
    coaching:
      node.coachingImplication ||
      node.reasoningPurpose ||
      "Use this mechanism to understand why the visible scale signal is behaving the way it is.",
    interventions: node.interventions || [],
    evidence: node.observedBy || node.influencedBy || [],
    annotation: [],
    type: node.type || "unknown"
  };
}

function gatherAtlasNodes(graph, diagnosis, displayNodes) {
  const ids = new Set([
    ...(diagnosis?.activatedNodeIds || []).slice(0, 18),
    ...(diagnosis?.likelyIssues || []),
    ...(diagnosis?.recommendationPackage?.explanation?.likelyIssues || []),
    ...(diagnosis?.primaryHypothesis?.supportingEvidence || [])
  ]);

  return Array.from(ids)
    .map(nodeId => graph.nodeMap.get(nodeId))
    .filter(Boolean)
    .filter(node => !displayNodes.has(node.id));
}

function buildEdges({
  graph,
  nodeLookup,
  activePathway,
  mode
}) {
  const edges = [];
  const seen = new Set();

  const addEdge = (edge) => {
    const key = `${edge.source}:${edge.target}:${edge.relationship}:${edge.kind || "graph"}`;
    if (seen.has(key)) return;
    seen.add(key);
    edges.push(edge);
  };

  nodeLookup.forEach(node => {
    if (node.visualTier === "hub") {
      addEdge(createAtlasEdge(node.id, "atlas_central_state", "converges_on", nodeLookup, false, "system"));
    }

    if (node.visualTier === "input") {
      const hubNode = findHubNode(nodeLookup, node.hubId);
      if (hubNode) {
        addEdge(createAtlasEdge(node.id, hubNode.id, "feeds", nodeLookup, false, "input"));
      }
    }

    if (node.visualTier === "outcome") {
      addEdge(createAtlasEdge("atlas_central_state", node.id, "expresses", nodeLookup, false, "outcome"));
    }

    if (node.visualTier === "mechanism") {
      const hubNode = findHubNode(nodeLookup, node.hubId);
      if (hubNode) {
        addEdge(createAtlasEdge(hubNode.id, node.id, "contains", nodeLookup, false, "mechanism"));
      }
    }
  });

  const pathwayPairs = [];
  for (let index = 0; index < activePathway.nodeIds.length - 1; index += 1) {
    pathwayPairs.push([activePathway.nodeIds[index], activePathway.nodeIds[index + 1]]);
  }

  pathwayPairs.forEach(([source, target]) => {
    if (!nodeLookup.has(source) || !nodeLookup.has(target)) return;
    addEdge(createAtlasEdge(source, target, "pathway", nodeLookup, true, "pathway"));
  });

  if (mode === "atlas") {
    graph.edges.forEach(edge => {
      if (!nodeLookup.has(edge.source) || !nodeLookup.has(edge.target)) return;
      if (Math.abs(nodeLookup.get(edge.source).x - nodeLookup.get(edge.target).x) > 820) return;
      addEdge(createAtlasEdge(edge.source, edge.target, edge.relationship, nodeLookup, false, "graph", edge.explanation));
    });
  }

  return edges;
}

function createAtlasEdge(sourceId, targetId, relationship, nodeLookup, isPathway, kind, explanation = "") {
  const source = nodeLookup.get(sourceId);
  const target = nodeLookup.get(targetId);

  return {
    id: `${sourceId}-${targetId}-${kind}`,
    source: sourceId,
    target: targetId,
    relationship,
    isPathway,
    kind,
    color: isPathway ? "#223447" : "#b7ab99",
    path: buildCurve(source, target, kind),
    explanation:
      explanation ||
      `${source?.baseLabel || sourceId} ${formatLabel(relationship)} ${target?.baseLabel || targetId}.`
  };
}

function buildCurve(source, target, kind) {
  if (!source || !target) return "";

  const midX = (source.x + target.x) / 2;
  const lift = kind === "pathway"
    ? Math.max(42, Math.abs(source.x - target.x) * 0.18)
    : Math.max(22, Math.abs(source.x - target.x) * 0.1);

  let control1Y = source.y;
  let control2Y = target.y;

  if (source.y < target.y) {
    control1Y += lift;
    control2Y -= lift;
  } else {
    control1Y -= lift;
    control2Y += lift;
  }

  return `M ${source.x} ${source.y} C ${midX} ${control1Y}, ${midX} ${control2Y}, ${target.x} ${target.y}`;
}

function buildNodeDetails(graph, node, diagnosis) {
  if (!node) return null;

  if (node.isSynthetic) {
    return {
      label: node.baseLabel,
      description: node.description,
      coaching: node.coaching,
      relationships: [],
      interventions: diagnosis?.recommendationPackage?.tacticalLevers?.map(lever => lever.label) || [],
      evidence: diagnosis?.likelyIssues || []
    };
  }

  const source = graph.nodeMap.get(node.id) || {};
  const outgoing = (graph.outgoing.get(node.id) || []).slice(0, 5);
  const incoming = (graph.incoming.get(node.id) || []).slice(0, 5);

  return {
    label: node.baseLabel,
    description: node.description,
    coaching: node.coaching,
    relationships: [
      ...outgoing.map(edge => ({
        label: `${node.baseLabel} ${formatLabel(edge.relationship)} ${graph.nodeMap.get(edge.target)?.label || formatLabel(edge.target)}`,
        explanation: edge.explanation
      })),
      ...incoming.map(edge => ({
        label: `${graph.nodeMap.get(edge.source)?.label || formatLabel(edge.source)} ${formatLabel(edge.relationship)} ${node.baseLabel}`,
        explanation: edge.explanation
      }))
    ].slice(0, 7),
    interventions: source.interventions || [],
    evidence: source.observedBy || source.influencedBy || []
  };
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
  ).map(pathway => ({
    ...pathway,
    nodeIds: pathway.nodeIds.filter(nodeId => graph.nodeMap.has(nodeId))
  }));

  if (matched.length) return dedupePathways(matched);
  return [createFallbackPathway(graph)];
}

function createFallbackPathway(graph) {
  return {
    id: "pathway_fallback",
    label: "Core fat-loss pathway",
    narrative:
      "Energy intake, system regulation, and visible scale behaviour form the core explanatory line when no stronger pattern dominates.",
    nodeIds: [
      "energy_intake",
      "energy_balance",
      "fat_mass",
      "body_weight_trend"
    ].filter(nodeId => graph.nodeMap.has(nodeId))
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

function findHubNode(nodeLookup, hubId) {
  return Array.from(nodeLookup.values()).find(node => node.visualTier === "hub" && node.hubId === hubId) || null;
}

function formatLabel(value) {
  return String(value || "unknown")
    .replaceAll("_", " ")
    .replace(/\b\w/g, char => char.toUpperCase());
}
