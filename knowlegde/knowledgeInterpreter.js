/**
 * knowledgeInterpreter.js
 *
 * Purpose:
 * - Run all diagnostic knowledge packs against current signals
 * - Rank competing diagnostic domains
 * - Identify strongest explanation
 * - Surface supporting evidence, weakening evidence and missing data
 */

import {
  DIAGNOSTIC_DOMAINS
} from "./diagnosticDomains.js";

import {
  scoreEnergyBalancePack
} from "./energyBalancePack.js";

import {
  scoreAdherencePack
} from "./adherencePack.js";

import {
  scoreExpenditurePack
} from "./expenditurePack.js";

import {
  scoreWaterRetentionPack
} from "./waterRetentionPack.js";

import {
  scoreRecoveryStressPack
} from "./recoveryStressPack.js";

import {
  scoreMeasurementNoisePack
} from "./measurementNoisePack.js";

export function interpretKnowledge(signals = {}) {
  const scoredDomains = [
    scoreEnergyBalancePack(signals),
    scoreAdherencePack(signals),
    scoreExpenditurePack(signals),
    scoreWaterRetentionPack(signals),
    scoreRecoveryStressPack(signals),
    scoreMeasurementNoisePack(signals)
  ].map(enrichDomain);

  const rankedDomains = scoredDomains.sort(
    (a, b) => b.score - a.score
  );

  const strongestDomain =
    rankedDomains[0] || null;

  return {
    available: Boolean(strongestDomain),
    strongestDomain,
    rankedDomains,
    summary: buildSummary(strongestDomain),
    recommendation: buildRecommendation(strongestDomain)
  };
}

function enrichDomain(result) {
  const domain =
    DIAGNOSTIC_DOMAINS[result.domainId];

  return {
    ...result,
    title:
      domain?.title ||
      result.domainId,
    description:
      domain?.description ||
      "",
    graphNodes:
      domain?.graphNodes ||
      [],
    relatedDiagnoses:
      domain?.relatedDiagnoses ||
      [],
    confidence:
      scoreToConfidence(result.score)
  };
}

function buildSummary(domain) {
  if (!domain) {
    return "No diagnostic knowledge interpretation available.";
  }

  if (domain.score <= 0) {
    return "No domain is strongly supported yet. More consistent data may be needed before changing the plan.";
  }

  return `${domain.title} is currently the strongest diagnostic domain. It is supported by ${domain.supporting.length} signal(s) and weakened by ${domain.weakening.length} signal(s).`;
}

function buildRecommendation(domain) {
  if (!domain) {
    return "Collect more data before making a change.";
  }

  if (domain.score <= 0) {
    return "Hold the plan steady and improve data quality before making an intervention.";
  }

  const firstAction =
    domain.firstActions?.[0];

  if (!firstAction) {
    return "Review the strongest diagnostic domain before making a change.";
  }

  return `${firstAction.action}: ${firstAction.rationale}`;
}

function scoreToConfidence(score) {
  const confidence =
    50 + score * 7;

  return Math.min(
    Math.max(
      Math.round(confidence),
      20
    ),
    95
  );
}