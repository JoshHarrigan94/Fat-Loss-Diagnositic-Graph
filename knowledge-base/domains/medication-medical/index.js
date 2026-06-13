import { medicationMedicalNodes } from "./nodes.js";
import { medicationMedicalEdges } from "./edges.js";

export const medicationMedicalDomain = {
  id: "medication-medical",
  label: "Medication & Medical",
  description:
    "Models medication effects, clinical context, medical review flags, diabetes medications, corticosteroid exposure, bariatric surgery, eating disorder risk, pregnancy/postpartum context, and red-flag symptoms.",
  phase: 4,
  status: "active",
  primaryPurpose:
    "To ensure fat-loss reasoning remains medically safe, clinically aware, and appropriately conservative where medication or health status modifies recommendations.",
  diagnosticQuestions: [
    "Are any medications affecting appetite, weight, fatigue, glucose, or fluid balance?",
    "Is diabetes medication creating hypoglycaemia risk?",
    "Does the person need medical review before calorie, carbohydrate, fasting, or exercise changes?",
    "Is there bariatric surgery history requiring specialised nutrition logic?",
    "Is eating disorder risk present?",
    "Is pregnancy, breastfeeding, or postpartum status relevant?",
    "Are there red flag symptoms that override lifestyle recommendations?"
  ],
  connectsTo: [
    "glucose-insulin",
    "appetite-satiety",
    "measurement-noise",
    "nutrition-quality",
    "exercise-training",
    "recovery-sleep",
    "population-constraints",
    "risk-management",
    "intervention-strategy",
    "contraindications"
  ],
  nodes: medicationMedicalNodes,
  edges: medicationMedicalEdges
};

export default medicationMedicalDomain;
