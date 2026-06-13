/**
 * pathwaySelector.js
 *
 * Selects the most relevant reasoning pathway from current signals.
 */

import {
  REASONING_PATHWAYS
} from "./reasoningPathways.js";

export function selectReasoningPathway(signals = {}) {
  const scored = REASONING_PATHWAYS
    .map((pathway) => {
      const matchedEntrySignals = pathway.entrySignals.filter(
        (signal) => signals[signal] === true
      );

      const score = matchedEntrySignals.length;

      return {
        ...pathway,
        score,
        matchedEntrySignals
      };
    })
    .sort((a, b) => b.score - a.score);

  const best = scored[0] || null;

  return {
    available: Boolean(best && best.score > 0),
    selectedPathway: best && best.score > 0 ? best : null,
    rankedPathways: scored
  };
}

export function selectReasoningPathwayByProblem(problemId, diagnosticMap) {
  const item = diagnosticMap?.[problemId];

  if (!item) {
    return null;
  }

  return (
    REASONING_PATHWAYS.find(
      (pathway) => pathway.id === item.pathway
    ) || null
  );
}