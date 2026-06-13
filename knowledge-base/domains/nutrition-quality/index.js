import { nutritionQualityNodes } from "./nodes.js";
import { nutritionQualityEdges } from "./edges.js";

export const nutritionQualityDomain = {
  id: "nutrition-quality",
  label: "Nutrition Quality",
  description:
    "Models diet quality beyond calories, including protein, fibre, micronutrients, food processing, meal structure, variety, liquid calories, restriction risk, and satiety-supportive food choices.",
  phase: 3,
  status: "active",
  primaryPurpose:
    "To explain how food quality affects satiety, adherence, health, body composition, and sustainability during fat loss.",
  diagnosticQuestions: [
    "Is protein intake adequate for the goal and population?",
    "Is fibre intake supporting satiety, gut health, and glucose regulation?",
    "Is the diet micronutrient-dense enough to sustain the deficit?",
    "Are ultra-processed foods increasing passive overconsumption?",
    "Are liquid calories reducing the weekly deficit?",
    "Is meal structure helping or harming adherence?",
    "Is the diet too restrictive to sustain?"
  ],
  connectsTo: [
    "energy-balance",
    "adherence-behaviour",
    "appetite-satiety",
    "diet-fatigue",
    "body-composition",
    "glucose-insulin",
    "habit-design",
    "risk-management",
    "intervention-strategy"
  ],
  nodes: nutritionQualityNodes,
  edges: nutritionQualityEdges
};

export default nutritionQualityDomain;