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
      targetNode: "poor_sleep_recovery",
      rationale: "Better sleep recovery may reduce recovery-driven water retention and weight volatility.",
      risk: "Low"
    },
    {
      lever: "Reduce unnecessary training fatigue",
      targetNode: "training_inflammation",
      rationale: "Lower fatigue and muscle damage may reduce inflammation-related water retention.",
      risk: "Low"
    },
    {
      lever: "Stabilise carbohydrate intake",
      targetNode: "carbohydrate_shift",
      rationale: "Consistent carbohydrate intake can reduce glycogen-driven scale swings.",
      risk: "Low"
    },
    {
      lever: "Stabilise sodium intake",
      targetNode: "sodium_intake",
      rationale: "Consistent sodium intake can reduce short-term water retention volatility.",
      risk: "Low"
    }
  ],

  recovery_masking: [
    {
      lever: "Improve sleep",
      targetNode: "poor_sleep_recovery",
      rationale: "Poor sleep recovery is directly connected to recovery strain and water retention risk.",
      risk: "Low"
    },
    {
      lever: "Deload training slightly",
      targetNode: "training_inflammation",
      rationale: "Reducing training inflammation may lower recovery-driven water retention.",
      risk: "Low"
    },
    {
      lever: "Reduce stress load",
      targetNode: "stress_load",
      rationale: "Lower stress may improve recovery and reduce scale masking.",
      risk: "Low"
    },
    {
      lever: "Check illness or inflammation",
      targetNode: "illness_inflammation",
      rationale: "Illness or immune stress can distort scale weight and recovery signals.",
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
    },
    {
      lever: "Standardise high-risk meals",
      targetNode: "calories_in",
      rationale: "Reducing variability in repeated meals can improve calorie confidence.",
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
  ],

  recovery_water_retention: [
    {
      lever: "Prioritise sleep recovery",
      targetNode: "poor_sleep_recovery",
      rationale: "Sleep is the highest-leverage recovery input for reducing recovery-driven masking.",
      risk: "Low"
    },
    {
      lever: "Reduce training inflammation",
      targetNode: "training_inflammation",
      rationale: "A short deload or reduced eccentric load may lower fluid retention from muscle damage.",
      risk: "Low"
    },
    {
      lever: "Reduce stress load",
      targetNode: "stress_load",
      rationale: "Stress reduction may improve recovery and reduce water retention volatility.",
      risk: "Low"
    }
  ],

  dietary_water_retention: [
    {
      lever: "Stabilise carbs",
      targetNode: "carbohydrate_shift",
      rationale: "Consistent carbohydrate intake can reduce glycogen and water swings.",
      risk: "Low"
    },
    {
      lever: "Stabilise sodium",
      targetNode: "sodium_intake",
      rationale: "Consistent sodium intake can make scale trends easier to interpret.",
      risk: "Low"
    },
    {
      lever: "Reduce alcohol variability",
      targetNode: "alcohol_intake",
      rationale: "Alcohol can affect sleep, hydration, appetite and short-term scale weight.",
      risk: "Low"
    },
    {
      lever: "Standardise food volume",
      targetNode: "gut_content_load",
      rationale: "Consistent food volume and fibre can reduce gut-content scale noise.",
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