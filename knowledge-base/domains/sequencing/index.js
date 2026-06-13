import { sequencingNodes } from "./nodes.js";
import { sequencingEdges } from "./edges.js";

export const sequencingDomain = {
  id: "sequencing",
  label: "Sequencing",
  description:
    "Models the ordering of intervention strategies based on safety, confidence, recovery, burden, readiness, contraindications, and diagnostic clarity.",
  phase: 5,
  status: "active",
  primaryPurpose:
    "To decide what should happen first, what should be delayed, what should be monitored, and what should not be used.",
  diagnosticQuestions: [
    "Does medical safety need to come before lifestyle advice?",
    "Is confidence high enough to escalate?",
    "Should low-burden strategies come first?",
    "Does recovery need repair before progression?",
    "Are foundational behaviours missing?",
    "Should only one major lever change at a time?",
    "Which strategy is primary, secondary, delayed, or blocked?"
  ],
  connectsTo: [
    "intervention-strategy",
    "risk-management",
    "contraindications",
    "measurement-noise",
    "adherence-behaviour",
    "nutrition-quality",
    "recovery-sleep",
    "diet-fatigue",
    "population-constraints",
    "recommendation-output"
  ],
  nodes: sequencingNodes,
  edges: sequencingEdges
};

export default sequencingDomain;
