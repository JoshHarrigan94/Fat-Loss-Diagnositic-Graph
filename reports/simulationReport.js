/**
 * simulationReport.js
 *
 * Purpose:
 * - Summarise intervention simulation outputs
 * - Export simulation reasoning into Markdown
 */

export function generateSimulationSummary(simulations = []) {
  if (!simulations.length) {
    return {
      available: false,
      summary: "No intervention simulations available.",
      items: []
    };
  }

  const ranked = [...simulations].sort(
    (a, b) =>
      b.impact.estimatedWeeklyLossDelta -
      a.impact.estimatedWeeklyLossDelta
  );

  const top = ranked[0];

  return {
    available: true,
    summary: `The strongest projected intervention is ${top.label}, affecting ${top.impact.pathwayAffected}.`,
    topScenario: top,
    items: ranked
  };
}

export function simulationSummaryToMarkdown(summary) {
  if (!summary?.available) {
    return "## Intervention Simulation\n\nNo simulation data available.";
  }

  const rows = summary.items
    .map(
      (item) =>
        `| ${item.label} | ${round(item.impact.estimatedWeeklyLossDelta)} kg/wk | ${round(item.impact.projectedExpectedLoss)} kg/wk | ${item.impact.pathwayAffected} | ${item.impact.risk} |`
    )
    .join("\n");

  return `
## Intervention Simulation

${summary.summary}

| Scenario | Estimated Loss Delta | Projected Expected Loss | Pathway Affected | Risk |
|---|---:|---:|---|---|
${rows}
`.trim();
}

function round(value, decimals = 2) {
  if (!Number.isFinite(Number(value))) return "N/A";
  return Number(value).toFixed(decimals);
}