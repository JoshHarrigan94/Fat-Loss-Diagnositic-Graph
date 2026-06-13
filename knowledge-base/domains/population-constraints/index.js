import { populationConstraintsNodes } from "./nodes.js";
import { populationConstraintsEdges } from "./edges.js";

export const populationConstraintsDomain = {
  id: "population-constraints",
  label: "Population Constraints",
  description:
    "Models population-specific modifiers, priorities, and constraints that change intervention safety, sequencing, tolerance, and outcome weighting.",
  phase: 4,
  status: "active",
  primaryPurpose:
    "To ensure the same diagnosis can produce different recommendations depending on population context, safety constraints, recovery capacity, medical risk, and priority weighting.",
  diagnosticQuestions: [
    "Does this population context change the safest intervention pathway?",
    "Should fat loss, lean mass, glucose control, function, performance, or psychological safety be weighted most heavily?",
    "Are aggressive deficits appropriate or restricted?",
    "Does medical risk require review or conservative modification?",
    "Does low recovery capacity restrict training or deficit size?",
    "Does youth, older age, chronic illness, or athlete status change sequencing?",
    "Should monitoring methods be modified for psychological safety?"
  ],
  connectsTo: [
    "body-composition",
    "exercise-training",
    "glucose-insulin",
    "medication-medical",
    "hormones-life-stage",
    "adherence-behaviour",
    "stress-psychology",
    "habit-design",
    "risk-management",
    "intervention-strategy",
    "contraindications",
    "sequencing"
  ],
  nodes: populationConstraintsNodes,
  edges: populationConstraintsEdges
};

export default populationConstraintsDomain;
