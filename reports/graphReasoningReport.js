/**
 * graphReasoningReport.js
 *
 * Purpose:
 * - Produce a human-readable graph reasoning summary
 * - Explain active pathways, competing diagnoses and interventions
 */

export function generateGraphReasoningSummary({
  activeNodes = [],
  competingExplanations = [],
  interventionExplanation = null
}) {
  const top = competingExplanations[0];

  return {
    activeNodes,
    topExplanation: top || null,
    competingExplanations,
    interventionExplanation,
    narrative: buildNarrative({
      activeNodes,
      top,
      interventionExplanation
    })
  };
}

export function graphReasoningToMarkdown(summary) {
  if (!summary) {
    return "## Graph Reasoning\n\nNo graph reasoning available.";
  }

  const competing = summary.competingExplanations
    .map(
      (item) =>
        `- ${item.rank}. ${item.title} — combined score ${item.combinedScore}; graph score ${item.graphScore}.`
    )
    .join("\n");

  const interventions =
    summary.interventionExplanation?.interventions
      ?.map(
        (item) =>
          `- ${item.lever}: ${item.rationale} Risk: ${item.risk}.`
      )
      .join("\n") || "No interventions mapped.";

  return `
## Graph Reasoning

${summary.narrative}

### Competing explanations

${competing}

### Intervention levers

${interventions}
`.trim();
}

function buildNarrative({
  activeNodes,
  top,
  interventionExplanation
}) {
  if (!top) {
    return "The graph did not identify a dominant explanatory pathway.";
  }

  const active = activeNodes
    .map(formatLabel)
    .join(", ");

  const intervention =
    interventionExplanation?.summary || "";

  return `The graph identified ${top.title} as the strongest pathway. Active mechanisms include: ${active}. ${intervention}`;
}

function formatLabel(value) {
  return String(value || "")
    .replaceAll("_", " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}
