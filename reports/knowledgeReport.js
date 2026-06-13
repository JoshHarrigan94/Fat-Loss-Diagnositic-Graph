/**
 * knowledgeReport.js
 *
 * Purpose:
 * - Convert knowledge interpretation into readable UI/report content
 * - Add diagnostic domain reasoning to Markdown export
 */

export function generateKnowledgeSummary(knowledgeInterpretation) {
  if (!knowledgeInterpretation?.available) {
    return {
      available: false,
      summary: "No knowledge interpretation available.",
      strongestDomain: null,
      rankedDomains: []
    };
  }

  return {
    available: true,
    summary: knowledgeInterpretation.summary,
    recommendation: knowledgeInterpretation.recommendation,
    strongestDomain: knowledgeInterpretation.strongestDomain,
    rankedDomains: knowledgeInterpretation.rankedDomains
  };
}

export function knowledgeSummaryToMarkdown(summary) {
  if (!summary?.available) {
    return "## Diagnostic Knowledge Interpretation\n\nNo knowledge interpretation available.";
  }

  const rows = summary.rankedDomains
    .map(
      (domain) =>
        `| ${domain.title} | ${domain.score} | ${domain.confidence}% | ${domain.supporting.length} | ${domain.weakening.length} |`
    )
    .join("\n");

  const strongest = summary.strongestDomain;

  const supporting = strongest.supporting.length
    ? strongest.supporting.map((item) => `- ${item}`).join("\n")
    : "- None";

  const weakening = strongest.weakening.length
    ? strongest.weakening.map((item) => `- ${item}`).join("\n")
    : "- None";

  const avoid = strongest.avoid?.length
    ? strongest.avoid.map((item) => `- ${item}`).join("\n")
    : "- None";

  return `
## Diagnostic Knowledge Interpretation

${summary.summary}

Recommendation:

${summary.recommendation}

| Domain | Score | Confidence | Supporting Signals | Weakening Signals |
|---|---:|---:|---:|---:|
${rows}

### Strongest domain

${strongest.title}

${strongest.description}

### Supporting evidence

${supporting}

### Weakening evidence

${weakening}

### Avoid

${avoid}
`.trim();
}