import { recoverySleepNodes } from "./nodes.js";
import { recoverySleepEdges } from "./edges.js";

export const recoverySleepDomain = {
  id: "recovery-sleep",
  label: "Recovery & Sleep",
  description:
    "Models sleep, fatigue, recovery capacity, stress load, water retention, appetite pressure, training tolerance, and medical sleep-risk signals.",
  phase: 2,
  status: "active",
  primaryPurpose:
    "To determine whether the current fat-loss plan is recoverable, sustainable, and safe under the person's real-world stress and sleep conditions.",
  diagnosticQuestions: [
    "Is sleep duration sufficient?",
    "Is sleep quality poor despite enough time in bed?",
    "Is fatigue reducing adherence or activity?",
    "Is poor recovery causing water retention and misleading scale changes?",
    "Is training load suppressing NEAT or increasing hunger?",
    "Is stress making the plan harder to sustain?",
    "Are there medical sleep-risk signals that require triage?"
  ],
  connectsTo: [
    "energy-balance",
    "water-scale-noise",
    "adherence-behaviour",
    "activity-neat",
    "diet-fatigue",
    "appetite-satiety",
    "exercise-training",
    "glucose-insulin",
    "risk-management",
    "intervention-strategy"
  ],
  nodes: recoverySleepNodes,
  edges: recoverySleepEdges
};

export default recoverySleepDomain;