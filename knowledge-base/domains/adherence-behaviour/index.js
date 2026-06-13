import { adherenceBehaviourNodes } from "./nodes.js";
import { adherenceBehaviourEdges } from "./edges.js";

export const adherenceBehaviourDomain = {
  id: "adherence-behaviour",
  label: "Adherence & Behaviour",
  description:
    "Models the behavioural, environmental, psychological, and execution-related factors that determine whether a fat-loss plan is actually followed in the real world.",
  phase: 2,
  status: "active",
  primaryPurpose:
    "To distinguish failed physiology from failed execution, poor plan-person fit, tracking error, behavioural compensation, and sustainability limits.",
  diagnosticQuestions: [
    "Is the person consistently executing the plan?",
    "Is reported intake likely to match actual intake?",
    "Are weekends or social events erasing the weekly deficit?",
    "Is the plan too burdensome to sustain?",
    "Is poor adherence caused by the person, the environment, or the plan design?",
    "Is exercise being compensated for through increased eating or reduced NEAT?",
    "Is the person interpreting noisy scale data correctly?"
  ],
  connectsTo: [
    "energy-balance",
    "water-scale-noise",
    "activity-neat",
    "recovery-sleep",
    "nutrition-quality",
    "diet-fatigue",
    "habit-design",
    "intervention-strategy"
  ],
  nodes: adherenceBehaviourNodes,
  edges: adherenceBehaviourEdges
};

export default adherenceBehaviourDomain;