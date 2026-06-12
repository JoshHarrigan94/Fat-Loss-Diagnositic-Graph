/**
 * timelineReport.js
 *
 * Purpose:
 * - Convert week-by-week diagnostic windows into readable summaries
 * - Provide timeline narrative for UI and Markdown reports
 */

export function generateTimelineSummary(timeline = []) {
  if (!timeline.length) {
    return {
      available: false,
      summary: "No timeline data available.",
      dominantDiagnosis: null,
      weeksAnalysed: 0,
      items: []
    };
  }

  const diagnosisCounts = countBy(
    timeline,
    "diagnosisTitle"
  );

  const dominantDiagnosis =
    Object.entries(diagnosisCounts)
      .sort((a, b) => b[1] - a[1])[0]?.[0] || null;

  const items = timeline.map((week) => ({
    week: week.week,
    dateRange: `${week.startDate} → ${week.endDate}`,
    diagnosis: week.diagnosisTitle,
    confidence: week.confidence,
    expectedLoss: round(week.expectedLossPerWeek),
    observedLoss: round(week.observedLossPerWeek),
    mismatch: round(week.mismatchKgPerWeek),
    adherenceScore: round(week.adherenceScore, 0),
    deficitType: formatLabel(week.deficitType),
    weightMomentum: formatLabel(week.weightMomentum),
    maskingRisk: week.maskingRisk ? "Likely" : "Lower"
  }));

  return {
    available: true,
    weeksAnalysed: timeline.length,
    dominantDiagnosis,
    summary: `Across ${timeline.length} week(s), the most common diagnostic pattern was: ${dominantDiagnosis}.`,
    items
  };
}

export function timelineSummaryToMarkdown(summary) {
  if (!summary.available) {
    return "## Diagnostic Timeline\n\nNo timeline data available.";
  }

  const rows = summary.items
    .map((item) => {
      return `| Week ${item.week} | ${item.dateRange} | ${item.diagnosis} | ${item.confidence}% | ${item.expectedLoss} | ${item.observedLoss} | ${item.mismatch} | ${item.adherenceScore}% | ${item.maskingRisk} |`;
    })
    .join("\n");

  return `
## Diagnostic Timeline

${summary.summary}

| Week | Dates | Diagnosis | Confidence | Expected Loss | Observed Loss | Mismatch | Adherence | Masking Risk |
|---|---|---:|---:|---:|---:|---:|---:|---:|
${rows}
`.trim();
}

function countBy(items = [], key) {
  return items.reduce((acc, item) => {
    const value = item[key] || "Unknown";
    acc[value] = (acc[value] || 0) + 1;
    return acc;
  }, {});
}

function round(value, decimals = 2) {
  if (
    value === null ||
    value === undefined ||
    Number.isNaN(value)
  ) {
    return "N/A";
  }

  return Number(value).toFixed(decimals);
}

function formatLabel(value) {
  return String(value || "unknown")
    .replaceAll("_", " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}