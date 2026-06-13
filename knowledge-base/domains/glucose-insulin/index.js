import { glucoseInsulinNodes } from "./nodes.js";
import { glucoseInsulinEdges } from "./edges.js";

export const glucoseInsulinDomain = {
  id: "glucose-insulin",
  label: "Glucose & Insulin",
  description:
    "Models insulin sensitivity, post-meal glucose response, carbohydrate tolerance, muscle glucose disposal, meal composition, activity timing, glycaemic variability, hypoglycaemia risk, and metabolic-health benefits of fat loss.",
  phase: 4,
  status: "active",
  primaryPurpose:
    "To adapt fat-loss recommendations for metabolic health, type 2 diabetes risk, glucose control, carbohydrate tolerance, and medication-related safety constraints.",
  diagnosticQuestions: [
    "Is glucose regulation a major modifier of the fat-loss plan?",
    "Is insulin sensitivity likely impaired?",
    "Are post-meal glucose responses problematic?",
    "Would meal composition or post-meal movement improve glucose control?",
    "Does the person have hypoglycaemia risk?",
    "Should carbohydrate recommendations be modified by activity, medication, or glucose response?",
    "Is fat loss improving metabolic-health markers?"
  ],
  connectsTo: [
    "energy-balance",
    "body-composition",
    "nutrition-quality",
    "appetite-satiety",
    "activity-neat",
    "exercise-training",
    "recovery-sleep",
    "medication-medical",
    "population-constraints",
    "risk-management",
    "intervention-strategy"
  ],
  nodes: glucoseInsulinNodes,
  edges: glucoseInsulinEdges
};

export default glucoseInsulinDomain;
