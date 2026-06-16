# Fat-Loss-Diagnositic-Graph

Explainable fat-loss diagnostic engine with a governed knowledge graph and a browser app presentation layer.

## Behavioural Contract

The graph is the product. The app is only the presentation layer.

This hardening pass makes the diagnosis engine follow a stricter contract:

- Stable weight alone does not imply low confidence.
- `trend_requires_interpretation` is separate from low-confidence states.
- Only genuine uncertainty triggers `recommendation_mode_monitor_only`.
- A true plateau with good data can recommend an intake or activity intervention.
- Safety, confidence, recovery, diet fatigue, adherence, NEAT, nutrition, and population protection are prioritised in a fixed hierarchy.
- Delayed strategies are not active recommendations.

## Diagnostic Hierarchy

The engine selects recommendation mode and strategies in this order:

1. Safety / contraindication
2. Data confidence
3. True plateau / true insufficient deficit
4. Recovery bottleneck
5. Diet fatigue
6. Adherence friction
7. NEAT / activity adaptation
8. Nutrition quality / appetite / satiety
9. Training and population-specific protection

## Signal Categories

The engine now distinguishes these signal categories explicitly:

- `trend_requires_interpretation`
- `trend_confidence_low`
- `scale_noise_high`
- `data_quality_low`
- `true_plateau_likely`

Only the low-confidence states should force monitor-only mode.

## Recommendation Modes

- `recommendation_mode_standard`: adequate confidence and no strong safety or protective modifier.
- `recommendation_mode_monitor_only`: confidence is genuinely too low to escalate.
- `recommendation_mode_conservative`: intervention can proceed, but recovery, diet fatigue, or lean-mass protection should constrain aggression.
- `recommendation_mode_referral_first`: safety-sensitive medical or contraindication state.

## Strategy Semantics

The engine output separates:

- `primaryStrategy`
- `secondaryStrategies`
- `delayedStrategies`
- `blockedStrategies`
- `avoidedStrategies`
- `contraindicatedStrategies`

`delayedStrategies` are conditional future options only. They do not count as active recommendations.

## Legacy Isolation

Legacy adapters still exist in `knowledge-base/reasoning/legacyKnowledgeAdapter.js` and `knowledge-base/reasoning/legacyRulesAdapter.js`.

- They are kept only as migration shims for useful old heuristics.
- They are isolated to signal generation.
- The governed ontology plus graph activation output is the primary diagnostic source of truth.
- Legacy adapters should be removed in a future pass once every remaining heuristic has a native ontology/home.

## App Flow

`app/js/app.js` is the real entry point.

On load it now:

1. Loads saved rows or demo rows.
2. Accepts manual entry updates.
3. Accepts CSV import.
4. Runs `diagnoseRows()` on the current dataset.
5. Renders the existing dashboard with updated tables, charts, graph reasoning, and recommendations.
6. Preserves existing export/report actions.

## Run And Test

Install dependencies if needed:

```bash
npm install
```

Validate the governed graph assembly:

```bash
npm run validate
```

Run the scenario suite:

```bash
npm run test:scenarios
```

Run the explicit recommendation-contract checks:

```bash
npm run test:contract
```

Open the app:

```bash
npm start
```
