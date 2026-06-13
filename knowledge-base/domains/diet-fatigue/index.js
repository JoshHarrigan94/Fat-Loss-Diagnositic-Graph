import { dietFatigueNodes } from "./nodes.js";
import { dietFatigueEdges } from "./edges.js";

export const dietFatigueDomain = {
  id: "diet-fatigue",
  label: "Diet Fatigue",
  description:
    "Models accumulated strain from sustained energy restriction, including hunger, fatigue, recovery debt, psychological load, reduced NEAT, performance decline, and readiness for refeeds or diet breaks.",
  phase: 3,
  status: "active",
  primaryPurpose:
    "To determine whether a fat-loss phase remains sustainable or whether the next intervention should reduce strain, improve recovery, or temporarily return to maintenance.",
  diagnosticQuestions: [
    "How long has the person been in a deficit?",
    "How aggressive is the deficit relative to their tolerance?",
    "Is hunger becoming persistent and disruptive?",
    "Is recovery debt amplifying diet strain?",
    "Is adherence declining because of fatigue?",
    "Are steps or training performance falling?",
    "Is a refeed, deload, smaller deficit, or diet break more appropriate than further restriction?"
  ],
  connectsTo: [
    "energy-balance",
    "adherence-behaviour",
    "activity-neat",
    "recovery-sleep",
    "appetite-satiety",
    "nutrition-quality",
    "exercise-training",
    "intervention-strategy",
    "risk-management"
  ],
  nodes: dietFatigueNodes,
  edges: dietFatigueEdges
};

export default dietFatigueDomain;
