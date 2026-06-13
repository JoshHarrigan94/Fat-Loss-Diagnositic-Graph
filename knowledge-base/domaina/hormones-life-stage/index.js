import { hormonesLifeStageNodes } from "./nodes.js";
import { hormonesLifeStageEdges } from "./edges.js";

export const hormonesLifeStageDomain = {
  id: "hormones-life-stage",
  label: "Hormones & Life Stage",
  description:
    "Models hormonal and life-stage modifiers including menstrual cycle, menopause, puberty, ageing, thyroid-risk signals, reproductive health, fat distribution, hormonal fluid shifts, and life-stage recovery capacity.",
  phase: 4,
  status: "active",
  primaryPurpose:
    "To make fat-loss reasoning life-stage aware, population-sensitive, medically safe, and better at interpreting appetite, recovery, scale noise, body composition, and intervention tolerance.",
  diagnosticQuestions: [
    "Does age or life stage modify the safety of the fat-loss plan?",
    "Could menstrual-cycle phase explain scale, hunger, or performance changes?",
    "Is menopause affecting sleep, recovery, or fat distribution?",
    "Is this a youth/growth context requiring conservative guidance?",
    "Is sarcopenia or age-related muscle loss a concern?",
    "Are thyroid or reproductive-health signals present that require medical review?",
    "Could hormonal fluid shifts explain short-term scale changes?"
  ],
  connectsTo: [
    "body-composition",
    "measurement-noise",
    "recovery-sleep",
    "appetite-satiety",
    "glucose-insulin",
    "medication-medical",
    "exercise-training",
    "population-constraints",
    "risk-management",
    "intervention-strategy"
  ],
  nodes: hormonesLifeStageNodes,
  edges: hormonesLifeStageEdges
};

export default hormonesLifeStageDomain;
