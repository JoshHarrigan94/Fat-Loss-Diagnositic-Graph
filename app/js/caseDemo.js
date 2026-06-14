import { diagnoseCase } from "../../knowledge-base/diagnoseCase.js";
import { renderDiagnosis } from "./renderDiagnosis.js";

const demoCase = {
  id: "demo_case",
  inputs: {
    weightTrend: "stable",
    scaleWeightVariability: "high",
    calorieTrackingAccuracy: "high",
    adherenceConsistency: "high",
    stepCountConsistency: "high",
    sleepQuality: "low",
    stressLoad: "high",
    trainingSoreness: "high",
    scaleSpike: true
  }
};

export function runCaseDemo(container) {
  const diagnosis = diagnoseCase(demoCase);
  renderDiagnosis(container, diagnosis);
}