/**
 * domains/index.js
 *
 * Registry for all knowledge-base domain packs.
 */

import {
  WATER_SCALE_NOISE_DOMAIN
} from "./water-scale-noise/index.js";

export const KNOWLEDGE_DOMAINS = [
  WATER_SCALE_NOISE_DOMAIN,
  ENERGY_BALANCE_DOMAIN
];

export function listKnowledgeDomains() {
  return KNOWLEDGE_DOMAINS;
}

export function getKnowledgeDomain(domainId) {
  return (
    KNOWLEDGE_DOMAINS.find((domain) => domain.id === domainId) ||
    null
  );
}

export function getAllKnowledgeNodes() {
  return KNOWLEDGE_DOMAINS.flatMap((domain) => domain.nodes);
}

export function getAllKnowledgeEdges() {
  return KNOWLEDGE_DOMAINS.flatMap((domain) => domain.edges);
}

import {
  ENERGY_BALANCE_DOMAIN
} from "./energy-balance/index.js";