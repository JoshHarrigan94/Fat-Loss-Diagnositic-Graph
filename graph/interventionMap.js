/**
 * interventionMap.js
 *
 * Purpose:
 * - Map diagnoses and graph pathways to possible intervention levers
 * - Explain what would change the diagnosis
 * - Help avoid wrong interventions
 */

export const INTERVENTION_MAP = {
  masked_fat_loss: [
    {
      lever: "Wait 7 days",
      targetNode: "weight_trend",
      rationale: "If scale masking is likely, more time can reveal the underlying trend without unnecessary calorie cuts.",
      risk: "Low"
    },
    {
      lever: "Improve sleep consistency",
      targetNode: "recovery",
      rationale: "Better recovery may reduce water retention and weight volatility.",
      risk: "Low"
    },
    {
      lever: "Reduce unnecessary training fatigue",
      targetNode: "training_load",
      rationale: "Lower fatigue may reduce short-term water retention.",
      risk: "Low"
    }
  ],

  recovery_masking: [
    {
      lever: "Improve sleep",
      targetNode: "sleep",
      rationale: "Sleep is directly connected to recovery and water retention risk.",
      risk: "Low"
    },
    {
      lever: "Deload training slightly",
      targetNode: "training_load",
      rationale: "Reducing training stress may improve recovery and reduce masking.",
      risk: "Low"
    }
  ],

  adherence_drift: [
    {
      lever: "Audit weekends",
      targetNode: "weekend_drift",
      rationale: "Weekend drift can erase a weekday deficit.",
      risk: "Low"
    },
    {
      lever: "Improve logging accuracy",
      targetNode: "logging_accuracy",
      rationale: "More accurate logging improves confidence that the deficit is real.",
      risk: "Low"
    }
  ],

  reduced_expenditure: [
    {
      lever: "Restore step floor",
      targetNode: "steps",
      rationale: "Increasing steps restores NEAT before needing to reduce calories.",
      risk: "Low"
    },
    {
      lever: "Increase low-intensity activity",
      targetNode: "neet",
      rationale: "NEAT contributes to total expenditure and can improve the deficit without cutting food.",
      risk: "Low"
    }
  ],

  true_plateau: [
    {
      lever: "Reduce calories slightly",
      targetNode: "calories_in",
      rationale: "If masking and adherence issues are unlikely, a small calorie reduction may restore progress.",
      risk: "Medium"
    },
    {
      lever: "Increase steps",
      targetNode: "steps",
      rationale: "A small activity increase can widen the deficit without reducing food intake.",
      risk: "Low"
    }
  ]
};

export function getInterventionsForDiagnosis(diagnosisId) {
  return INTERVENTION_MAP[diagnosisId] || [];
}

export function buildInterventionExplanation({
  diagnosisId,
  competingExplanations = []
}) {
  const interventions = getInterventionsForDiagnosis(diagnosisId);

  const topCompeting = competingExplanations[0];

  return {
    diagnosisId,
    interventions,
    summary: buildSummary(topCompeting, interventions)
  };
}

function buildSummary(topCompeting, interventions) {
  if (!topCompeting) {
    return "No intervention reasoning available.";
  }

  if (!interventions.length) {
    return `No mapped intervention levers are currently available for ${topCompeting.title}.`;
  }

  return `The highest-ranked pathway is ${topCompeting.title}. The first recommended lever is ${interventions[0].lever}, because it targets ${formatLabel(interventions[0].targetNode)}.`;
}

function formatLabel(value) {
  return String(value || "")
    .replaceAll("_", " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}