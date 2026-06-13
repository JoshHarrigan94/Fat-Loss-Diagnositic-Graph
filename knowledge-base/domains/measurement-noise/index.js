import { measurementNoiseNodes } from "./nodes.js";
import { measurementNoiseEdges } from "./edges.js";

export const measurementNoiseDomain = {
  id: "measurement-noise",
  label: "Measurement Noise",
  description:
    "Models the interpretation of noisy progress signals, including scale weight, waist, photos, glycogen, sodium, digestion, stress, soreness, and population-specific fluid shifts.",
  phase: 2,
  status: "active",
  primaryPurpose:
    "To prevent premature or incorrect plan changes by distinguishing true fat-loss trends from temporary measurement noise.",
  diagnosticQuestions: [
    "Is the scale trend reliable enough to interpret?",
    "Are weigh-ins being performed consistently?",
    "Could glycogen, sodium, digestion, stress, or soreness explain the scale change?",
    "Are waist or photo measurements reliable enough to add context?",
    "Is the apparent plateau real or noise?",
    "Should the plan be changed now or should more data be collected?"
  ],
  connectsTo: [
    "energy-balance",
    "water-scale-noise",
    "adherence-behaviour",
    "activity-neat",
    "recovery-sleep",
    "body-composition",
    "hormones-life-stage",
    "risk-management",
    "intervention-strategy"
  ],
  nodes: measurementNoiseNodes,
  edges: measurementNoiseEdges
};

export default measurementNoiseDomain;