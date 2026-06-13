import { riskManagementNodes } from "./nodes.js";
import { riskManagementEdges } from "./edges.js";

export const riskManagementDomain = {
  id: "risk-management",
  label: "Risk Management",
  description:
    "Models medical, psychological, injury, recovery, glucose, monitoring, and population-sensitive risk before recommendations are generated.",
  phase: 5,
  status: "active",
  primaryPurpose:
    "To gate and modify fat-loss recommendations based on safety, clinical context, psychological risk, injury risk, recovery tolerance, glucose safety, and measurement confidence.",
  diagnosticQuestions: [
    "Is there medical risk that requires conservative advice or clinical review?",
    "Is psychological risk high enough to modify tracking, weighing, or restriction?",
    "Is injury risk high enough to modify training recommendations?",
    "Is recovery capacity too low for escalation?",
    "Is glucose safety a concern?",
    "Should the graph proceed normally, modify, monitor, or refer?",
    "Are recommendations safe for this population?"
  ],
  connectsTo: [
    "medication-medical",
    "population-constraints",
    "hormones-life-stage",
    "exercise-training",
    "glucose-insulin",
    "stress-psychology",
    "measurement-noise",
    "diet-fatigue",
    "intervention-strategy",
    "contraindications",
    "sequencing"
  ],
  nodes: riskManagementNodes,
  edges: riskManagementEdges
};

export default riskManagementDomain;
