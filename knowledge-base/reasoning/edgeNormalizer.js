function normalizeStrength(value) {
  if (value === "high" || value === "moderate" || value === "low") {
    return value;
  }

  if (typeof value === "number") {
    if (value >= 80) return "high";
    if (value >= 55) return "moderate";
    return "low";
  }

  return "moderate";
}

function normalizeDirection(relationship = "", direction = "") {
  if (direction) {
    return direction;
  }

  const positiveRelationships = new Set([
    "increases",
    "causes",
    "supports",
    "contributes_to",
    "indicates",
    "activates",
    "feeds",
    "informs",
    "gates",
    "modifies",
    "may_increase",
    "outputs",
    "reduces",
    "maps_to",
    "subtype_of"
  ]);

  return positiveRelationships.has(relationship)
    ? "contextual"
    : "contextual";
}

export function normalizeEdgeSchema(edge = {}, fallback = {}) {
  return {
    source: edge.source,
    target: edge.target,
    relationship: edge.relationship,
    strength: normalizeStrength(
      edge.strength ?? edge.mechanismStrength ?? edge.confidence
    ),
    direction: normalizeDirection(edge.relationship, edge.direction),
    explanation:
      edge.explanation ??
      edge.description ??
      fallback.explanation ??
      `${edge.source} ${edge.relationship} ${edge.target}`.trim(),
    diagnosticUse:
      edge.diagnosticUse ??
      fallback.diagnosticUse ??
      "Legacy edge mapped into governed schema for diagnostic reasoning.",
    ...(edge.id ? { id: edge.id } : {}),
    ...(edge.domain ? { domain: edge.domain } : {}),
    ...(edge.evidenceLevel ? { evidenceLevel: edge.evidenceLevel } : {}),
    ...(edge.populationApplicability
      ? { populationApplicability: edge.populationApplicability }
      : {}),
    ...(edge.metadata ? { metadata: edge.metadata } : {})
  };
}

