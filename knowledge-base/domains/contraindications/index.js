import { contraindicationsNodes } from "./nodes.js";
import { contraindicationsEdges } from "./edges.js";

export const contraindicationsDomain = {
  id: "contraindications",
  label: "Contraindications",
  description:
    "Models contexts where otherwise valid interventions should be avoided, modified, delayed, monitored, or referred due to medical, psychological, developmental, glucose, recovery, injury, or population-specific risk.",
  phase: 5,
  status: "active",
  primaryPurpose:
    "To prevent unsafe intervention selection by screening for contraindications before intervention strategy and sequencing.",
  diagnosticQuestions: [
    "Is an aggressive calorie deficit contraindicated?",
    "Is fasting or meal skipping unsafe without medical supervision?",
    "Is strict tracking psychologically unsafe?",
    "Is high-intensity or high-impact exercise inappropriate?",
    "Is carbohydrate restriction unsafe or poorly matched to context?",
    "Would a large activity increase create injury or recovery risk?",
    "Should the recommendation be avoided, modified, delayed, monitored, or referred?"
  ],
  connectsTo: [
    "risk-management",
    "medication-medical",
    "population-constraints",
    "glucose-insulin",
    "stress-psychology",
    "exercise-training",
    "recovery-sleep",
    "appetite-satiety",
    "intervention-strategy",
    "sequencing"
  ],
  nodes: contraindicationsNodes,
  edges: contraindicationsEdges
};

export default contraindicationsDomain;
