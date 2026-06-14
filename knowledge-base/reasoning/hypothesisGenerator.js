function hasAny(values = [], candidates = []) {
  return candidates.some(candidate => values.includes(candidate));
}

function createHypothesis({
  id,
  label,
  explanation,
  confidence = "moderate",
  score = 0.5,
  supportingEvidence = [],
  opposingEvidence = [],
  suggestedStrategy = null
}) {
  return {
    id,
    label,
    explanation,
    confidence,
    score,
    supportingEvidence,
    opposingEvidence,
    suggestedStrategy
  };
}

function scoreToConfidence(score) {
  if (score >= 0.75) return "high";
  if (score >= 0.45) return "moderate";
  return "low";
}

function finaliseHypothesis(hypothesis) {
  const score = Math.max(0, Math.min(1, hypothesis.score));

  return {
    ...hypothesis,
    score: Math.round(score * 100) / 100,
    confidence: scoreToConfidence(score)
  };
}

export function generateHypotheses(diagnosis) {
  const {
    activatedNodeIds = [],
    likelyIssues = [],
    confidenceFlags = [],
    riskFlags = [],
    contraindications = []
  } = diagnosis;

  const hypotheses = [];

  /**
   * 1. True plateau / insufficient deficit
   */
  if (
    likelyIssues.includes("insufficient_weekly_energy_deficit") ||
    activatedNodeIds.includes("weekly_energy_deficit")
  ) {
    let score = 0.65;
    const supportingEvidence = [
      "Stable weight with relatively low noise can indicate insufficient weekly deficit."
    ];
    const opposingEvidence = [];

    if (confidenceFlags.length > 0) {
      score -= 0.25;
      opposingEvidence.push(
        "Confidence flags are present, so calorie adjustment may be premature."
      );
    }

    if (
      hasAny(activatedNodeIds, [
        "scale_weight_variability",
        "water_retention_from_stress",
        "training_inflammation_shift"
      ])
    ) {
      score -= 0.2;
      opposingEvidence.push(
        "Scale noise or water retention may mask true fat loss."
      );
    }

    hypotheses.push(
      finaliseHypothesis(
        createHypothesis({
          id: "hypothesis_true_plateau_insufficient_deficit",
          label: "True plateau from insufficient deficit",
          explanation:
            "The person may not be creating enough weekly energy deficit to continue losing fat.",
          score,
          supportingEvidence,
          opposingEvidence,
          suggestedStrategy: "strategy_calorie_adjustment"
        })
      )
    );
  }

  /**
   * 2. False plateau from water / scale noise
   */
  if (
    likelyIssues.includes("scale_noise_possible") ||
    hasAny(activatedNodeIds, [
      "measurement_noise_interpretation",
      "scale_weight_variability",
      "water_retention_from_stress",
      "training_inflammation_shift"
    ])
  ) {
    let score = 0.65;
    const supportingEvidence = [
      "Scale weight variability or water-retention signals are present."
    ];
    const opposingEvidence = [];

    if (activatedNodeIds.includes("water_retention_from_stress")) {
      score += 0.15;
      supportingEvidence.push(
        "Stress or poor sleep may be causing temporary water retention."
      );
    }

    if (activatedNodeIds.includes("training_inflammation_shift")) {
      score += 0.1;
      supportingEvidence.push(
        "Training soreness may temporarily increase body water."
      );
    }

    if (activatedNodeIds.includes("weekly_energy_deficit")) {
      score -= 0.15;
      opposingEvidence.push(
        "There is also some evidence for insufficient deficit."
      );
    }

    hypotheses.push(
      finaliseHypothesis(
        createHypothesis({
          id: "hypothesis_false_plateau_water_retention",
          label: "False plateau from water retention or scale noise",
          explanation:
            "The scale may not currently reflect fat-loss progress because temporary water, stress, soreness, digestion, or measurement noise is obscuring the trend.",
          score,
          supportingEvidence,
          opposingEvidence,
          suggestedStrategy: "strategy_monitoring_confidence"
        })
      )
    );
  }

  /**
   * 3. Low intake confidence / hidden intake drift
   */
  if (
    likelyIssues.includes("low_intake_confidence") ||
    hasAny(activatedNodeIds, [
      "calorie_tracking_accuracy",
      "energy_intake_estimate",
      "weekend_adherence_gap",
      "liquid_calorie_exposure"
    ])
  ) {
    let score = 0.7;
    const supportingEvidence = [
      "Intake confidence signals suggest reported calories may not equal actual weekly intake."
    ];
    const opposingEvidence = [];

    if (activatedNodeIds.includes("weekend_adherence_gap")) {
      score += 0.1;
      supportingEvidence.push(
        "Weekend adherence gaps may erode the weekly deficit."
      );
    }

    if (activatedNodeIds.includes("liquid_calorie_exposure")) {
      score += 0.1;
      supportingEvidence.push(
        "Liquid calories may be under-accounted for."
      );
    }

    hypotheses.push(
      finaliseHypothesis(
        createHypothesis({
          id: "hypothesis_low_intake_confidence",
          label: "Low intake confidence or hidden intake drift",
          explanation:
            "Progress may be unclear because actual intake is not being captured reliably enough.",
          score,
          supportingEvidence,
          opposingEvidence,
          suggestedStrategy: "strategy_monitoring_confidence"
        })
      )
    );
  }

  /**
   * 4. Recovery bottleneck
   */
  if (
    likelyIssues.includes("poor_sleep_recovery_constraint") ||
    hasAny(activatedNodeIds, [
      "sleep_quality",
      "stress_load",
      "recovery_debt",
      "constraint_low_recovery_capacity"
    ])
  ) {
    let score = 0.65;
    const supportingEvidence = [
      "Sleep, stress, or recovery signals suggest limited tolerance for additional pressure."
    ];
    const opposingEvidence = [];

    if (activatedNodeIds.includes("sleep_quality")) {
      score += 0.1;
      supportingEvidence.push(
        "Poor sleep is directly present."
      );
    }

    if (activatedNodeIds.includes("stress_load")) {
      score += 0.1;
      supportingEvidence.push(
        "High stress load is present."
      );
    }

    hypotheses.push(
      finaliseHypothesis(
        createHypothesis({
          id: "hypothesis_recovery_bottleneck",
          label: "Recovery bottleneck",
          explanation:
            "Poor sleep, stress, or recovery debt may be limiting adherence, activity, training, appetite regulation, or scale interpretation.",
          score,
          supportingEvidence,
          opposingEvidence,
          suggestedStrategy: "strategy_recovery_repair"
        })
      )
    );
  }

  /**
   * 5. Diet fatigue
   */
  if (
    likelyIssues.includes("diet_fatigue_risk") ||
    hasAny(activatedNodeIds, [
      "diet_fatigue_risk",
      "deficit_duration",
      "fatigue_driven_adherence_decline",
      "performance_decline_during_deficit"
    ])
  ) {
    let score = 0.7;
    const supportingEvidence = [
      "Diet duration, hunger, adherence decline, or performance decline suggest accumulating diet fatigue."
    ];
    const opposingEvidence = [];

    if (activatedNodeIds.includes("performance_decline_during_deficit")) {
      score += 0.1;
      supportingEvidence.push(
        "Training performance is declining during the deficit."
      );
    }

    if (activatedNodeIds.includes("hunger_pressure")) {
      score += 0.1;
      supportingEvidence.push(
        "Hunger pressure is elevated."
      );
    }

    hypotheses.push(
      finaliseHypothesis(
        createHypothesis({
          id: "hypothesis_diet_fatigue",
          label: "Diet fatigue",
          explanation:
            "The current phase may have accumulated enough fatigue that reducing pressure is more useful than escalating restriction.",
          score,
          supportingEvidence,
          opposingEvidence,
          suggestedStrategy: "strategy_diet_break_or_maintenance"
        })
      )
    );
  }

  /**
   * 6. Low activity / NEAT bottleneck
   */
  if (
    likelyIssues.includes("low_activity_bottleneck") ||
    hasAny(activatedNodeIds, [
      "low_activity_bottleneck",
      "sedentary_time",
      "step_count_consistency",
      "neat_adaptation"
    ])
  ) {
    let score = 0.65;
    const supportingEvidence = [
      "Activity signals suggest expenditure may be lower or less consistent than expected."
    ];
    const opposingEvidence = [];

    if (hasAny(activatedNodeIds, ["sleep_quality", "diet_fatigue_risk"])) {
      score -= 0.15;
      opposingEvidence.push(
        "Recovery constraints may make activity increases less appropriate immediately."
      );
    }

    hypotheses.push(
      finaliseHypothesis(
        createHypothesis({
          id: "hypothesis_low_activity_neat_bottleneck",
          label: "Low activity or NEAT bottleneck",
          explanation:
            "Daily movement may be too low or inconsistent to support the expected deficit.",
          score,
          supportingEvidence,
          opposingEvidence,
          suggestedStrategy: "strategy_activity_increase"
        })
      )
    );
  }

  /**
   * 7. Medical / glucose safety constraint
   */
  if (
    riskFlags.length > 0 ||
    contraindications.length > 0 ||
    hasAny(activatedNodeIds, [
      "hypoglycaemia_risk",
      "glucose_safety_risk",
      "diabetes_medication_context",
      "contraindication_unsupervised_fasting",
      "contraindication_carbohydrate_restriction"
    ])
  ) {
    let score = 0.85;
    const supportingEvidence = [
      "Medical, glucose, or contraindication signals are present."
    ];
    const opposingEvidence = [];

    hypotheses.push(
      finaliseHypothesis(
        createHypothesis({
          id: "hypothesis_medical_or_glucose_safety_constraint",
          label: "Medical or glucose safety constraint",
          explanation:
            "The case includes safety-sensitive factors that should modify or delay lifestyle recommendations.",
          score,
          supportingEvidence,
          opposingEvidence,
          suggestedStrategy: "strategy_medical_review"
        })
      )
    );
  }

  /**
   * 8. Lean mass / function protection
   */
  if (
    likelyIssues.includes("lean_mass_retention_priority") ||
    hasAny(activatedNodeIds, [
      "population_older_adult",
      "sarcopenia_risk",
      "priority_functional_independence",
      "priority_lean_mass_retention",
      "resistance_training_quality",
      "protein_adequacy"
    ])
  ) {
    let score = 0.7;
    const supportingEvidence = [
      "Population or body-composition signals suggest lean mass and function should be protected."
    ];
    const opposingEvidence = [];

    if (activatedNodeIds.includes("protein_adequacy")) {
      score += 0.1;
      supportingEvidence.push(
        "Protein adequacy may be insufficient."
      );
    }

    if (activatedNodeIds.includes("resistance_training_quality")) {
      score += 0.1;
      supportingEvidence.push(
        "Resistance training quality may be insufficient."
      );
    }

    hypotheses.push(
      finaliseHypothesis(
        createHypothesis({
          id: "hypothesis_lean_mass_function_protection",
          label: "Lean mass or function protection priority",
          explanation:
            "The plan should protect muscle, function, and training quality rather than simply maximising scale loss.",
          score,
          supportingEvidence,
          opposingEvidence,
          suggestedStrategy: "strategy_training_adjustment"
        })
      )
    );
  }

  return hypotheses.sort((a, b) => b.score - a.score);
}

export default generateHypotheses;