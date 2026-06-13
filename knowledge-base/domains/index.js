import waterScaleNoiseDomain from "./water-scale-noise/index.js";
import energyBalanceDomain from "./energy-balance/index.js";
import adherenceBehaviourDomain from "./adherence-behaviour/index.js";
import activityNeatDomain from "./activity-neat/index.js";
import recoverySleepDomain from "./recovery-sleep/index.js";
import measurementNoiseDomain from "./measurement-noise/index.js";
import nutritionQualityDomain from "./nutrition-quality/index.js";
import appetiteSatietyDomain from "./appetite-satiety/index.js";
import dietFatigueDomain from "./diet-fatigue/index.js";
import stressPsychologyDomain from "./stress-psychology/index.js";
import habitDesignDomain from "./habit-design/index.js";
import bodyCompositionDomain from "./body-composition/index.js";
import exerciseTrainingDomain from "./exercise-training/index.js";
import glucoseInsulinDomain from "./glucose-insulin/index.js";
import medicationMedicalDomain from "./medication-medical/index.js";
import hormonesLifeStageDomain from "./hormones-life-stage/index.js";
import populationConstraintsDomain from "./population-constraints/index.js";
import riskManagementDomain from "./risk-management/index.js";
import contraindicationsDomain from "./contraindications/index.js";
import interventionStrategyDomain from "./intervention-strategy/index.js";
import sequencingDomain from "./sequencing/index.js";
import riskAdjustedRecommendationsDomain from "./risk-adjusted-recommendations/index.js";

export const KNOWLEDGE_DOMAINS = [
  waterScaleNoiseDomain,
  energyBalanceDomain,
  adherenceBehaviourDomain,
  activityNeatDomain,
  recoverySleepDomain,
  measurementNoiseDomain,
  nutritionQualityDomain,
  appetiteSatietyDomain,
  dietFatigueDomain,
  stressPsychologyDomain,
  habitDesignDomain,
  bodyCompositionDomain,
  exerciseTrainingDomain,
  glucoseInsulinDomain,
  medicationMedicalDomain,
  hormonesLifeStageDomain,
  populationConstraintsDomain,
  riskManagementDomain,
  contraindicationsDomain,
  interventionStrategyDomain,
  sequencingDomain,
  riskAdjustedRecommendationsDomain
];

export function listKnowledgeDomains() {
  return KNOWLEDGE_DOMAINS;
}

export function getKnowledgeDomain(domainId) {
  return KNOWLEDGE_DOMAINS.find(d => d.id === domainId) ?? null;
}

export function getAllKnowledgeNodes() {
  return KNOWLEDGE_DOMAINS.flatMap(d => d.nodes || []);
}

export function getAllKnowledgeEdges() {
  return KNOWLEDGE_DOMAINS.flatMap(d => d.edges || []);
}
