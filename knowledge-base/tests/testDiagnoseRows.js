import { diagnoseRows } from "../diagnoseRows.js";

const sampleRows = [
  {
    date: "2026-01-01",
    weight: 100.0,
    calories: 2400,
    protein: 170,
    steps: 9000,
    sleepHours: 7.5,
    sleepQuality: 8,
    trainingLoad: 5
  },
  {
    date: "2026-01-02",
    weight: 100.1,
    calories: 2450,
    protein: 165,
    steps: 9200,
    sleepHours: 7.2,
    sleepQuality: 8,
    trainingLoad: 5
  },
  {
    date: "2026-01-03",
    weight: 99.9,
    calories: 2500,
    protein: 160,
    steps: 8800,
    sleepHours: 7.4,
    sleepQuality: 7,
    trainingLoad: 4
  },
  {
    date: "2026-01-04",
    weight: 100.0,
    calories: 3200,
    protein: 130,
    steps: 6500,
    sleepHours: 5.8,
    sleepQuality: 5,
    trainingLoad: 7
  },
  {
    date: "2026-01-05",
    weight: 100.2,
    calories: 2450,
    protein: 160,
    steps: 8700,
    sleepHours: 6.1,
    sleepQuality: 5,
    trainingLoad: 7
  },
  {
    date: "2026-01-06",
    weight: 100.1,
    calories: 2500,
    protein: 165,
    steps: 8500,
    sleepHours: 6.0,
    sleepQuality: 5,
    trainingLoad: 6
  },
  {
    date: "2026-01-07",
    weight: 100.3,
    calories: 2550,
    protein: 160,
    steps: 8400,
    sleepHours: 5.9,
    sleepQuality: 5,
    trainingLoad: 6
  }
];

const diagnosis = diagnoseRows(sampleRows, {
  calorieTarget: 2400,
  proteinTarget: 180,
  maintenanceCalories: 2900
});

console.log("\nDiagnose Rows Test");
console.log("==================");
console.log(`Rows: ${diagnosis.rowCount}`);
console.log(`Primary hypothesis: ${diagnosis.primaryHypothesis?.label || "none"}`);
console.log(`Primary strategy: ${diagnosis.primaryStrategy || "none"}`);
console.log(`Recommendation mode: ${diagnosis.recommendationMode}`);
console.log(`Overall confidence: ${diagnosis.confidenceProfile.overall.label} (${diagnosis.confidenceProfile.overall.score})`);

if (!diagnosis.rowCount) {
  throw new Error("No rows were processed.");
}

if (!diagnosis.recommendationPackage) {
  throw new Error("No recommendation package was generated.");
}

if (!diagnosis.activatedNodeIds.length) {
  throw new Error("No graph nodes were activated.");
}

console.log("\nDiagnose rows test passed.");