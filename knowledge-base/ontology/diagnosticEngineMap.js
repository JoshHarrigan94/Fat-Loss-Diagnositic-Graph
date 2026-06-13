/**
 * diagnosticEngineMap.js
 *
 * Maps common user-facing problems to reasoning pathways.
 */

export const DIAGNOSTIC_ENGINE_MAP = {
  weight_stalled: {
    label: "Weight stalled",
    pathway: "weight_not_moving",
    commonUserPhrases: [
      "my weight has stopped moving",
      "fat loss has stalled",
      "scale is stuck",
      "plateau"
    ]
  },

  gaining_weight: {
    label: "Gaining weight",
    pathway: "weight_increasing",
    commonUserPhrases: [
      "my weight is going up",
      "I gained weight",
      "scale jumped",
      "weight spike"
    ]
  },

  losing_too_fast: {
    label: "Losing too fast",
    pathway: "losing_too_fast",
    commonUserPhrases: [
      "losing weight too quickly",
      "dropping fast",
      "rapid weight loss"
    ]
  },

  persistent_hunger: {
    label: "Persistent hunger",
    pathway: "persistent_hunger",
    commonUserPhrases: [
      "always hungry",
      "cravings",
      "struggling with hunger",
      "can't stick to diet"
    ]
  },

  fatigue_high: {
    label: "Fatigue high",
    pathway: "fatigue_high",
    commonUserPhrases: [
      "tired all the time",
      "fatigue",
      "not recovering",
      "feel flat"
    ]
  },

  performance_dropping: {
    label: "Performance dropping",
    pathway: "performance_dropping",
    commonUserPhrases: [
      "strength is dropping",
      "training performance down",
      "workouts feel bad"
    ]
  },

  health_marker_priority: {
    label: "Health marker priority",
    pathway: "health_marker_priority",
    commonUserPhrases: [
      "blood sugar",
      "hba1c",
      "blood pressure",
      "health markers"
    ]
  }
};

export function getDiagnosticMapItem(itemId) {
  return DIAGNOSTIC_ENGINE_MAP[itemId] || null;
}

export function listDiagnosticMapItems() {
  return Object.values(DIAGNOSTIC_ENGINE_MAP);
}