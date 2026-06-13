import { activityNeatNodes } from "./nodes.js";
import { activityNeatEdges } from "./edges.js";

export const activityNeatDomain = {
  id: "activity-neat",
  label: "Activity & NEAT",
  description:
    "Models daily movement, structured exercise, sedentary behaviour, NEAT adaptation, compensation, and activity-related constraints on fat-loss outcomes.",
  phase: 2,
  status: "active",
  primaryPurpose:
    "To explain how movement behaviour and adaptive changes in activity influence the real-world weekly energy deficit.",
  diagnosticQuestions: [
    "Is total activity expenditure high enough to support the intended deficit?",
    "Has NEAT fallen during the diet?",
    "Are steps consistent across the week?",
    "Is sedentary time creating a low-activity bottleneck?",
    "Is exercise being compensated for through more eating or less spontaneous movement?",
    "Are activity estimates reliable?",
    "Would increasing activity improve outcomes or worsen fatigue and recovery?"
  ],
  connectsTo: [
    "energy-balance",
    "adherence-behaviour",
    "recovery-sleep",
    "diet-fatigue",
    "exercise-training",
    "glucose-insulin",
    "intervention-strategy",
    "risk-management"
  ],
  nodes: activityNeatNodes,
  edges: activityNeatEdges
};

export default activityNeatDomain;