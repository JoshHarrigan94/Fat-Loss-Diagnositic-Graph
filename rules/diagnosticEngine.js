/**
 * diagnosticEngine.js
 *
 * Rule-based diagnostic engine.
 *
 * Purpose:
 * - Evaluate calculated analytics signals against rules.json
 * - Return triggered diagnoses
 * - Rank diagnoses by priority and confidence
 *
 * The rules engine is intentionally explainable.
 * It does not replace the knowledge graph.
 * It identifies what diagnosis was triggered.
 * The graph explains why that diagnosis makes sense.
 */

export function evaluateRules(rules = [], signals = {}) {
  const triggered = [];

  for (const rule of rules) {
    const conditionResults = rule.conditions.map((condition) =>
      evaluateCondition(condition, signals)
    );

    const passed = conditionResults.every((result) => result.passed);

    if (!passed) continue;

    const confidence = calculateRuleConfidence(rule, conditionResults, signals);

    triggered.push({
      ruleId: rule.id,
      diagnosisId: rule.diagnosisId,
      title: rule.title,
      summary: rule.summary,
      priority: rule.priority,
      confidence,
      evidence: rule.evidence || [],
      recommendation: rule.recommendation,
      conditionResults
    });
  }

  return triggered.sort((a, b) => {
    if (a.priority !== b.priority) return a.priority - b.priority;
    return b.confidence - a.confidence;
  });
}

export function evaluateCondition(condition, signals) {
  const actual = signals[condition.metric];
  const expected = condition.value;
  const operator = condition.operator;

  let passed = false;

  switch (operator) {
    case "equals":
      passed = actual === expected;
      break;

    case "not_equals":
      passed = actual !== expected;
      break;

    case "greater_than":
      passed = Number(actual) > Number(expected);
      break;

    case "greater_than_or_equal":
      passed = Number(actual) >= Number(expected);
      break;

    case "less_than":
      passed = Number(actual) < Number(expected);
      break;

    case "less_than_or_equal":
      passed = Number(actual) <= Number(expected);
      break;

    default:
      throw new Error(`Unsupported rule operator: ${operator}`);
  }

  return {
    metric: condition.metric,
    operator,
    expected,
    actual,
    passed
  };
}

export function calculateRuleConfidence(rule, conditionResults, signals) {
  const base = 55;
  const passedCount = conditionResults.filter((r) => r.passed).length;
  const conditionScore = (passedCount / conditionResults.length) * 25;

  let signalBoost = 0;

  if (signals.deficitDetected) signalBoost += 4;
  if (signals.weightVolatilityHigh) signalBoost += 5;
  if (signals.weightTrendFlat) signalBoost += 5;
  if (signals.sleepPoor) signalBoost += 3;
  if (signals.trainingLoadHigh) signalBoost += 3;
  if (signals.calorieVariabilityHigh) signalBoost += 4;
  if (signals.weekendCaloriesHigher) signalBoost += 4;
  if (signals.stepsDropped) signalBoost += 4;

  const priorityAdjustment = Math.max(0, 7 - Number(rule.priority || 6));

  const confidence = Math.round(
    base + conditionScore + signalBoost + priorityAdjustment
  );

  return clamp(confidence, 50, 95);
}

export function getPrimaryDiagnosis(triggeredDiagnoses = []) {
  if (!triggeredDiagnoses.length) {
    return {
      diagnosisId: "insufficient_signal",
      title: "No strong diagnosis detected",
      summary:
        "The current data does not strongly match one of the diagnostic patterns.",
      confidence: 40,
      evidence: [
        "The current signals are either incomplete or not extreme enough to trigger a rule."
      ],
      recommendation:
        "Continue collecting data for another 7 days and review trend direction again."
    };
  }

  return triggeredDiagnoses[0];
}

export function buildDiagnosticSummary(triggeredDiagnoses = []) {
  const primary = getPrimaryDiagnosis(triggeredDiagnoses);

  const secondary = triggeredDiagnoses
    .filter((diagnosis) => diagnosis.ruleId !== primary.ruleId)
    .slice(0, 3);

  return {
    primary,
    secondary,
    diagnosisCount: triggeredDiagnoses.length
  };
}

export function createSignalAudit(signals = {}) {
  return Object.entries(signals).map(([key, value]) => ({
    metric: key,
    value,
    type: typeof value
  }));
}

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}