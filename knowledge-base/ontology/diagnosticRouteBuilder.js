/**
 * diagnosticRouteBuilder.js
 *
 * Builds an ordered diagnostic route from a selected reasoning pathway.
 *
 * Purpose:
 * - Turn a pathway into a step-by-step reasoning sequence
 * - Make the knowledge graph more explainable
 */

import {
  getReasoningPathway
} from "./reasoningPathways.js";

export function buildDiagnosticRoute(pathwayId) {
  const pathway = getReasoningPathway(pathwayId);

  if (!pathway) {
    return {
      available: false,
      reason: `No pathway found for ${pathwayId}.`,
      steps: []
    };
  }

  const steps = pathway.reasoningOrder.map((domainId, index) => ({
    step: index + 1,
    domainId,
    prompt: buildPromptForDomain(domainId),
    purpose: buildPurposeForDomain(domainId)
  }));

  return {
    available: true,
    pathwayId: pathway.id,
    pathwayLabel: pathway.label,
    userProblem: pathway.userProblem,
    firstQuestion: pathway.firstQuestion,
    possibleDiagnoses: pathway.possibleDiagnoses,
    steps
  };
}

function buildPromptForDomain(domainId) {
  const prompts = {
    measurement_noise:
      "Is the data reliable enough to make a decision?",
    water_retention:
      "Could fat loss be hidden by water, glycogen, gut content or inflammation?",
    adherence_drift:
      "Is the planned deficit being reduced by inconsistent intake or logging?",
    reduced_expenditure:
      "Has activity or spontaneous movement dropped enough to reduce the deficit?",
    energy_balance_failure:
      "Is the planned deficit too small or based on an incorrect maintenance estimate?",
    hydration_status:
      "Could rapid weight change be explained by hydration shifts?",
    glycogen_shift:
      "Could carbohydrate or glycogen changes explain the weight change?",
    deficit_size:
      "Is the deficit appropriately sized for the goal and population?",
    muscle_retention_risk:
      "Is the current rate of loss increasing lean-mass risk?",
    medical_risk:
      "Is clinical caution or supervision required?",
    protein_fibre_food_volume:
      "Is the diet structured to control hunger and support satiety?",
    sleep_recovery:
      "Is sleep or recovery limiting progress?",
    stress_psychology:
      "Is stress, emotion or cognitive load affecting behaviour?",
    diet_duration:
      "Has the diet continued long enough to create fatigue or adaptation?",
    training_load:
      "Is training load appropriate for the user’s recovery capacity?",
    illness_medical_context:
      "Could illness, medication or medical context explain the signal?",
    carbohydrate_availability:
      "Is low carbohydrate availability reducing performance?",
    lean_mass_risk:
      "Is the plan protecting lean mass?",
    medical_context:
      "Does medical context change the interpretation or intervention?",
    glucose_insulin:
      "Is glucose or insulin regulation a primary driver?",
    activity_neat:
      "Is movement behaviour supporting health and fat loss?",
    nutrition_quality:
      "Is diet quality supporting the goal beyond calories?",
    fat_loss_rate:
      "Is the current fat-loss rate appropriate?"
  };

  return prompts[domainId] || `Investigate ${formatLabel(domainId)}.`;
}

function buildPurposeForDomain(domainId) {
  const purposes = {
    measurement_noise:
      "Prevents overreacting to poor or insufficient data.",
    water_retention:
      "Avoids unnecessary calorie cuts when fat loss may be masked.",
    adherence_drift:
      "Checks whether the plan is being executed as intended.",
    reduced_expenditure:
      "Identifies activity compensation before reducing food.",
    energy_balance_failure:
      "Confirms whether the underlying deficit model needs adjustment.",
    hydration_status:
      "Separates fluid shifts from true tissue change.",
    glycogen_shift:
      "Separates carbohydrate-related scale shifts from fat change.",
    deficit_size:
      "Assesses whether the intervention is proportionate and sustainable.",
    muscle_retention_risk:
      "Protects lean tissue and performance.",
    medical_risk:
      "Prevents unsafe recommendations.",
    protein_fibre_food_volume:
      "Improves satiety and dietary adherence.",
    sleep_recovery:
      "Identifies recovery bottlenecks.",
    stress_psychology:
      "Accounts for non-diet stressors affecting behaviour.",
    diet_duration:
      "Detects diet fatigue and adaptation pressure.",
    training_load:
      "Aligns training stress with recovery capacity.",
    illness_medical_context:
      "Avoids misdiagnosing illness or medication effects as diet failure.",
    carbohydrate_availability:
      "Checks whether performance decline is fuel-related.",
    lean_mass_risk:
      "Protects muscle and function.",
    medical_context:
      "Makes recommendations safer and more population-aware.",
    glucose_insulin:
      "Prioritises metabolic health where relevant.",
    activity_neat:
      "Uses movement as a low-risk intervention lever.",
    nutrition_quality:
      "Ensures health and satiety are supported.",
    fat_loss_rate:
      "Aligns rate of loss with safety and goal."
  };

  return purposes[domainId] || `Clarifies the role of ${formatLabel(domainId)}.`;
}

function formatLabel(value) {
  return String(value || "")
    .replaceAll("_", " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}