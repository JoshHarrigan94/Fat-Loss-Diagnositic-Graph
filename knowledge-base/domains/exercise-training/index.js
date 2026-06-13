import { exerciseTrainingNodes } from "./nodes.js";
import { exerciseTrainingEdges } from "./edges.js";

export const exerciseTrainingDomain = {
  id: "exercise-training",
  label: "Exercise & Training",
  description:
    "Models resistance training, cardio, training dose, recovery cost, adherence, injury risk, goal alignment, and minimum effective training strategies.",
  phase: 4,
  status: "active",
  primaryPurpose:
    "To determine whether exercise is supporting fat loss, body composition, health, and performance without creating excessive fatigue, compensation, or injury risk.",
  diagnosticQuestions: [
    "Is resistance training sufficient to preserve lean mass?",
    "Is cardio helping expenditure or creating compensation?",
    "Is training volume recoverable during the deficit?",
    "Is training intensity appropriate for the person's recovery and risk profile?",
    "Is the person actually adhering to the training plan?",
    "Is injury risk limiting safe progression?",
    "What is the minimum effective training dose for this person right now?"
  ],
  connectsTo: [
    "body-composition",
    "activity-neat",
    "recovery-sleep",
    "diet-fatigue",
    "appetite-satiety",
    "glucose-insulin",
    "population-constraints",
    "risk-management",
    "intervention-strategy"
  ],
  nodes: exerciseTrainingNodes,
  edges: exerciseTrainingEdges
};

export default exerciseTrainingDomain;
