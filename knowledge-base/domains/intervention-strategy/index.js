import { interventionStrategyNodes } from "./nodes.js";
import { interventionStrategyEdges } from "./edges.js";

export const interventionStrategyDomain = {
  id: "intervention-strategy",
  label: "Intervention Strategy",
  description:
    "Models how diagnostic findings are converted into broad strategy choices such as calorie adjustment, activity increase, nutrition quality, appetite management, recovery repair, training adjustment, habit redesign, monitoring, diet breaks, or medical review.",
  phase: 5,
  status: "active",
  primaryPurpose:
    "To select the most appropriate intervention pathway after confidence, risk, contraindications, population modifiers, adherence capacity, and expected leverage have been considered.",
  diagnosticQuestions: [
    "Is calorie adjustment actually the right next lever?",
    "Should activity increase come before further restriction?",
    "Is poor nutrition quality or hunger the main bottleneck?",
    "Should recovery be repaired before escalation?",
    "Does training need to be adjusted to protect lean mass or performance?",
    "Is the real limitation habit design and environment?",
    "Should the graph monitor before changing the plan?",
    "Is medical review the primary strategy?"
  ],
  connectsTo: [
    "energy-balance",
    "adherence-behaviour",
    "activity-neat",
    "nutrition-quality",
    "appetite-satiety",
    "recovery-sleep",
    "exercise-training",
    "measurement-noise",
    "diet-fatigue",
    "risk-management",
    "contraindications",
    "sequencing"
  ],
  nodes: interventionStrategyNodes,
  edges: interventionStrategyEdges
};

export default interventionStrategyDomain;
