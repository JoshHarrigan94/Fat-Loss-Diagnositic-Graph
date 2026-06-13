/**
 * graphAdapter.js
 *
 * Converts the diagnostic graph format into the interactive
 * canvas explorer format.
 *
 * Existing graph format:
 * node: { id, label, type, description }
 * edge: { source, target, relationship, explanation }
 *
 * Explorer format:
 * node: { id, label, category, weight, def, coaching }
 * edge: { from, to, label, explanation }
 */

export const GRAPH_CATEGORIES = {
  input: {
    label: "Input",
    color: "#4A7CF7"
  },
  behaviour: {
    label: "Behaviour",
    color: "#E8A838"
  },
  mechanism: {
    label: "Mechanism",
    color: "#A78BFA"
  },
  signal: {
    label: "Signal",
    color: "#38C4C4"
  },
  diagnosis: {
    label: "Diagnosis",
    color: "#C45C8A"
  },
  intervention: {
    label: "Intervention",
    color: "#5CC98A"
  },
  context: {
    label: "Context",
    color: "#F97316"
  },
  subtype: {
    label: "Subtype",
    color: "#8B5CF6"
  },
  other: {
    label: "Other",
    color: "#64748B"
  }
};

export function adaptGraphForExplorer(graph) {
  const nodes = (graph.nodes || []).map(adaptNode);
  const edges = (graph.edges || []).map(adaptEdge);

  return {
    nodes,
    edges,
    categories: GRAPH_CATEGORIES
  };
}

export function adaptNode(node) {
  const category = normaliseCategory(
    node.category || node.type
  );

  return {
    id: node.id,
    label: node.label || node.id,
    category,
    weight: node.weight || inferWeight(node),
    def: node.description || node.def || "No definition available.",
    coaching:
      node.coachingImplication ||
      node.coaching ||
      inferCoachingImplication(node)
  };
}

export function adaptEdge(edge) {
  return {
    from: edge.source || edge.from,
    to: edge.target || edge.to,
    label: edge.relationship || edge.label || "related_to",
    explanation: edge.explanation || ""
  };
}

function normaliseCategory(type) {
  const value = String(type || "other").toLowerCase();

  if (GRAPH_CATEGORIES[value]) return value;

  if (
    value === "calculated_signal" ||
    value === "diagnostic_signal" ||
    value === "observable"
  ) {
    return "signal";
  }

  if (value === "masker") {
    return "mechanism";
  }

  return "other";
}

function inferWeight(node) {
  const type = String(node.type || "").toLowerCase();

  if (type === "diagnosis") return 7;
  if (type === "intervention") return 5;
  if (type === "mechanism") return 5;
  if (type === "subtype") return 5;
  if (type === "signal" || type === "diagnostic_signal") return 4;
  if (type === "input") return 4;
  if (type === "context") return 3;

  return 3;
}

function inferCoachingImplication(node) {
  const id = String(node.id || "").toLowerCase();

  if (id.includes("water_retention")) {
    return "Before cutting calories, check whether water retention is masking the scale trend.";
  }

  if (id.includes("sleep") || id.includes("recovery")) {
    return "Recovery-related nodes should be checked before assuming the deficit has failed.";
  }

  if (id.includes("adherence") || id.includes("weekend")) {
    return "Audit behaviour consistency before changing the calorie target.";
  }

  if (id.includes("steps") || id.includes("neet")) {
    return "Restoring activity can improve the deficit without reducing food intake.";
  }

  if (id.includes("calories") || id.includes("energy")) {
    return "Energy balance is central, but it should be interpreted alongside masking and adherence signals.";
  }

  return "Use this node to understand how the diagnostic pathway is being supported.";
}