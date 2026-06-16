function clamp(value, min = 0, max = 1) {
  return Math.min(max, Math.max(min, value));
}

function round(value) {
  return Math.round(value * 100) / 100;
}

function hasAny(values = [], candidates = []) {
  return candidates.some(candidate => values.includes(candidate));
}

function scoreToLabel(score) {
  if (score >= 0.75) return "high";
  if (score >= 0.45) return "moderate";
  return "low";
}

function createConfidenceScore(score, reasons = []) {
  const finalScore = clamp(score);

  return {
    score: round(finalScore),
    label: scoreToLabel(finalScore),
    reasons
  };
}

export function buildConfidenceProfile(diagnosis) {
  const {
    activatedNodeIds = [],
    likelyIssues = [],
    confidenceFlags = [],
    interpretationFlags = [],
    riskFlags = [],
    contraindications = [],
    primaryStrategy = null,
    recommendationMode = null,
    signalProfile = {}
  } = diagnosis;

  /**
   * Measurement confidence
   */
  let measurementScore = 0.75;
  const measurementReasons = [];

  if (signalProfile.scaleNoiseHigh) {
    measurementScore -= 0.25;
    measurementReasons.push(
      "Scale or body-weight data may be affected by measurement noise or temporary water shifts."
    );
  }

  if (interpretationFlags.includes("trend_requires_interpretation")) {
    measurementReasons.push(
      "Weight trend still requires interpretation, even if confidence is otherwise acceptable."
    );
  }

  if (confidenceFlags.includes("scale_noise_high")) {
    measurementScore -= 0.15;
    measurementReasons.push(
      "Short-term scale noise is possible."
    );
  }

  if (
    likelyIssues.includes("insufficient_weekly_energy_deficit") &&
    confidenceFlags.length === 0
  ) {
    measurementScore += 0.1;
    measurementReasons.push(
      "Low-noise stable weight supports stronger interpretation of the trend."
    );
  }

  /**
   * Intake confidence
   */
  let intakeScore = 0.75;
  const intakeReasons = [];

  if (
    signalProfile.dataQualityLow ||
    hasAny(activatedNodeIds, [
      "weekend_adherence_gap",
      "liquid_calorie_exposure"
    ])
  ) {
    intakeScore -= 0.3;
    intakeReasons.push(
      "Reported intake may not fully represent actual weekly energy intake."
    );
  }

  if (confidenceFlags.includes("data_quality_low")) {
    intakeScore -= 0.2;
    intakeReasons.push(
      "Calorie tracking confidence is low."
    );
  }

  if (likelyIssues.includes("weekend_deficit_erosion")) {
    intakeScore -= 0.1;
    intakeReasons.push(
      "Weekend behaviour may reduce the true weekly deficit."
    );
  }

  if (likelyIssues.includes("hidden_liquid_calorie_intake")) {
    intakeScore -= 0.1;
    intakeReasons.push(
      "Liquid calories may be under-accounted for."
    );
  }

  /**
   * Risk confidence
   */
  let riskScore = 0.8;
  const riskReasons = [];

  if (riskFlags.length > 0) {
    riskScore += 0.1;
    riskReasons.push(
      "Explicit risk flags are present."
    );
  }

  if (contraindications.length > 0) {
    riskScore += 0.1;
    riskReasons.push(
      "Contraindications are present and should be respected."
    );
  }

  if (
    hasAny(activatedNodeIds, [
      "hypoglycaemia_risk",
      "glucose_safety_risk",
      "contraindication_unsupervised_fasting",
      "contraindication_carbohydrate_restriction"
    ])
  ) {
    riskScore += 0.1;
    riskReasons.push(
      "Glucose or medication-sensitive safety signals are present."
    );
  }

  /**
   * Strategy confidence
   */
  let strategyScore = 0.65;
  const strategyReasons = [];

  if (!primaryStrategy) {
    strategyScore -= 0.25;
    strategyReasons.push(
      "No primary strategy was selected."
    );
  } else {
    strategyScore += 0.1;
    strategyReasons.push(
      `Primary strategy selected: ${primaryStrategy}.`
    );
  }

  if (recommendationMode === "recommendation_mode_referral_first") {
    strategyScore += 0.1;
    strategyReasons.push(
      "Referral-first mode is appropriate when safety-sensitive risks are present."
    );
  }

  if (recommendationMode === "recommendation_mode_monitor_only") {
    strategyScore += 0.05;
    strategyReasons.push(
      "Monitor-only mode is appropriate when confidence is limited."
    );
  }

  if (
    primaryStrategy === "strategy_calorie_adjustment" &&
    confidenceFlags.length > 0
  ) {
    strategyScore -= 0.3;
    strategyReasons.push(
      "Calorie adjustment is less appropriate when confidence flags are active."
    );
  }

  if (
    primaryStrategy === "strategy_activity_increase" &&
    (
      signalProfile.recoveryBottleneck ||
      signalProfile.dietFatigueLikely
    )
  ) {
    strategyScore -= 0.2;
    strategyReasons.push(
      "Activity increase is less appropriate when recovery constraints are active."
    );
  }

  /**
   * Overall confidence
   */
  const measurement = createConfidenceScore(measurementScore, measurementReasons);
  const intake = createConfidenceScore(intakeScore, intakeReasons);
  const risk = createConfidenceScore(riskScore, riskReasons);
  const strategy = createConfidenceScore(strategyScore, strategyReasons);

  const overallScore =
    recommendationMode === "recommendation_mode_referral_first"
      ? (risk.score * 0.45) +
        (strategy.score * 0.25) +
        (measurement.score * 0.15) +
        (intake.score * 0.15)
      : (measurement.score * 0.3) +
        (intake.score * 0.25) +
        (strategy.score * 0.3) +
        (risk.score * 0.15);

  const overallReasons = [
    `Measurement confidence is ${measurement.label}.`,
    `Intake confidence is ${intake.label}.`,
    `Risk confidence is ${risk.label}.`,
    `Strategy confidence is ${strategy.label}.`
  ];

  return {
    overall: createConfidenceScore(overallScore, overallReasons),
    measurement,
    intake,
    risk,
    strategy
  };
}

export default buildConfidenceProfile;
