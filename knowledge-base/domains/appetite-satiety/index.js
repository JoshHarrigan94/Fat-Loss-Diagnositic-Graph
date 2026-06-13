import { appetiteSatietyNodes } from "./nodes.js";
import { appetiteSatietyEdges } from "./edges.js";

export const appetiteSatietyDomain = {
  id: "appetite-satiety",
  label: "Appetite & Satiety",
  description:
    "Models hunger, fullness, cravings, meal satisfaction, reward-driven eating, palatability exposure, appetite suppression, and deficit tolerance.",
  phase: 3,
  status: "active",
  primaryPurpose:
    "To explain why appetite pressure rises, why adherence breaks, and which food, sleep, stress, or deficit adjustments may improve sustainability.",
  diagnosticQuestions: [
    "Is hunger physiological, reward-driven, stress-driven, or restriction-driven?",
    "Are meals producing enough satiety?",
    "Are cravings being amplified by sleep, stress, restriction, or food environment?",
    "Is early-day underfeeding causing evening overeating?",
    "Is appetite suppressed in a way that creates later rebound or nutrient risk?",
    "Is the deficit too aggressive for the person's current recovery and lifestyle?"
  ],
  connectsTo: [
    "nutrition-quality",
    "adherence-behaviour",
    "recovery-sleep",
    "energy-balance",
    "diet-fatigue",
    "glucose-insulin",
    "habit-design",
    "medication-medical",
    "intervention-strategy",
    "risk-management"
  ],
  nodes: appetiteSatietyNodes,
  edges: appetiteSatietyEdges
};

export default appetiteSatietyDomain;