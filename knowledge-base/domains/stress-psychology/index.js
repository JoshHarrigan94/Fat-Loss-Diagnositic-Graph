import { stressPsychologyNodes } from "./nodes.js";
import { stressPsychologyEdges } from "./edges.js";

export const stressPsychologyDomain = {
  id: "stress-psychology",
  label: "Stress & Psychology",
  description:
    "Models stress, emotional eating, self-efficacy, autonomy, shame, executive load, lapse recovery, identity, social support, and psychological safety.",
  phase: 3,
  status: "active",
  primaryPurpose:
    "To explain how psychological and social context affects adherence, appetite, recovery, honest reporting, and long-term sustainability.",
  diagnosticQuestions: [
    "Is stress driving eating, poor sleep, or reduced adherence?",
    "Is eating being used for emotional regulation?",
    "Does the person believe they can execute the plan?",
    "Is the plan creating too much executive load?",
    "Do lapses become prolonged setbacks?",
    "Is shame reducing honest reporting or recovery after mistakes?",
    "Does the person's social environment support or undermine the plan?"
  ],
  connectsTo: [
    "adherence-behaviour",
    "appetite-satiety",
    "recovery-sleep",
    "nutrition-quality",
    "diet-fatigue",
    "habit-design",
    "population-constraints",
    "risk-management",
    "intervention-strategy"
  ],
  nodes: stressPsychologyNodes,
  edges: stressPsychologyEdges
};

export default stressPsychologyDomain;
