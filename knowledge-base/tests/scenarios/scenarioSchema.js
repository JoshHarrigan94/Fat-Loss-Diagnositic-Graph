export const diagnosticScenarioSchema = {
  requiredFields: [
    "id",
    "label",
    "family",
    "difficulty",
    "case",
    "expected"
  ],

  expectedFields: [
    "primaryIssue",
    "recommendationMode",
    "primaryStrategy",
    "shouldInclude",
    "shouldAvoid"
  ]
};