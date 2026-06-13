import { bodyCompositionNodes } from "./nodes.js";
import { bodyCompositionEdges } from "./edges.js";

export const bodyCompositionDomain = {
  id: "body-composition",
  label: "Body Composition",
  description:
    "Models fat mass change, lean mass retention, recomposition, muscle gain potential, rate of loss, body-fat context, measurement quality, visual signals, and sarcopenia risk.",
  phase: 4,
  status: "active",
  primaryPurpose:
    "To distinguish high-quality fat loss from simple weight loss and protect lean mass, performance, function, and population-specific safety.",
  diagnosticQuestions: [
    "Is the person losing fat, lean mass, water, or a mixture?",
    "Is the rate of weight loss appropriate for the person?",
    "Is lean mass being protected?",
    "Is recomposition likely despite stable scale weight?",
    "Are body-composition measurements reliable?",
    "Does the starting body-fat context change the target rate of loss?",
    "Is sarcopenia risk present?"
  ],
  connectsTo: [
    "energy-balance",
    "nutrition-quality",
    "exercise-training",
    "measurement-noise",
    "recovery-sleep",
    "diet-fatigue",
    "hormones-life-stage",
    "population-constraints",
    "risk-management",
    "intervention-strategy"
  ],
  nodes: bodyCompositionNodes,
  edges: bodyCompositionEdges
};

export default bodyCompositionDomain;
