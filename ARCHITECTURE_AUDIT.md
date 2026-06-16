Architecture Audit

Product Direction

The primary product is a governed, explainable Fat Loss Diagnostic Knowledge Graph.

The goal is not to build another calorie tracker or chatbot.

The goal is to build a reusable reasoning engine capable of:

* Diagnosing stalled fat-loss outcomes
* Differentiating true plateaus from false plateaus
* Interpreting noisy weight trends
* Identifying adherence bottlenecks
* Identifying recovery and stress constraints
* Identifying population-specific constraints
* Identifying contraindications and medical risks
* Generating competing hypotheses
* Quantifying confidence
* Selecting appropriate interventions
* Producing explainable recommendations

The app is a consumer of the engine.

The graph is the product.

⸻

Guiding Principles

Ontology First

The ontology defines the meaning of the system.

All reasoning should ultimately trace back to ontology-defined concepts.

No duplicate ontology sources should exist.

⸻

Explainability First

Every recommendation should be traceable.

The engine should be able to explain:

* Why a node activated
* Why a hypothesis was generated
* Why a strategy was selected
* Why a recommendation was produced

⸻

Diagnostic Before Intervention

The system should answer:

“What is happening?”

before attempting to answer:

“What should be done?”

⸻

Governance Before Automation

A governed engine is preferred over a black-box AI system.

The graph should remain the primary source of truth.

Machine learning should support the graph rather than replace it.

⸻

Every File Must Earn Its Place

A file should exist only if it is:

* Used
* Unique
* Tested
* Clearly reserved for future functionality

Otherwise it should be:

* Merged
* Archived
* Deleted

⸻

Current Source of Truth

Primary source of truth:

knowledge-base/

This folder owns:

* Ontology
* Schema
* Domain packs
* Graph assembly
* Validation
* Reasoning
* Diagnosis
* Testing

No other folder should compete with this responsibility.

⸻

Current Architecture

Governed Engine

knowledge-base/

Contains:

* ontology/
* schema/
* domains/
* reasoning/
* tests/
* assembleGraph.js
* validateKnowledgeBase.js
* diagnoseCase.js
* diagnoseRows.js

Status:

KEEP

Role:

Primary product.

⸻

Analytics Layer

analytics/

Contains:

* adherence.js
* chartData.js
* deficit.js
* timeline.js
* trends.js
* weightSignal.js

Status:

PROMOTE

Purpose:

Transform raw user data into meaningful signals.

Examples:

* Weight trend analysis
* Deficit estimation
* Adherence analysis
* Timeline interpretation

Target destination:

knowledge-base/reasoning/signalExtractors/

Current action:

Being integrated through:

* analyticsSignalExtractor.js
* diagnoseRows.js

Decision:

Keep.

Promote useful logic.

Do not duplicate.

⸻

Legacy Graph Layer

graph/

Contains:

* activePathways.js
* graphAdapter.js
* graphEngine.js
* graphRenderer.js
* graphScoring.js
* interactiveGraphRenderer.js
* interventionMap.js
* pathwayExplorer.js
* nodes.json
* edges.json

Status:

REVIEW

Purpose:

Legacy graph traversal and graph visualisation.

Risk:

Potential overlap with:

* activationEngine.js
* routeBuilder.js
* hypothesisGenerator.js

Current decision:

No deletions.

Audit required.

Useful reasoning logic should be promoted.

Visualisation logic may remain app-facing.

⸻

Legacy Knowledge Layer

knowledge/

Contains:

* adherencePack.js
* diagnosticDomains.js
* energyBalancePack.js
* expenditurePack.js
* knowledgeInterpreter.js
* measurementNoisePack.js
* recoveryStressPack.js
* waterRetentionPack.js

Status:

MERGE THEN ARCHIVE

Purpose:

Legacy diagnostic knowledge packs.

Risk:

Competes with:

knowledge-base/domains/

Current action:

Useful heuristics promoted through:

legacyKnowledgeAdapter.js

Decision:

Knowledge-base remains ontology owner.

Knowledge folder should eventually become archive-only.

⸻

Rules Layer

rules/

Contains:

* diagnosticEngine.js
* rules.json

Status:

MERGE

Purpose:

Legacy rule-based reasoning.

Risk:

Duplicates:

* diagnoseCase.js
* hypothesisGenerator.js
* strategySelector.js

Decision:

Extract useful thresholds.

Convert useful logic into:

* scenario tests
* reasoning modules

Retire legacy engine.

⸻

Machine Learning Layer

ml/

Contains:

* featureEngineering.js
* modelComparison.js
* modelEvaluation.js
* prediction.js
* regressionModel.js

Status:

KEEP BUT PARK

Purpose:

Future enhancement.

Potential uses:

* Confidence calibration
* Pattern discovery
* Hypothesis weighting
* Outcome prediction

Decision:

Do not integrate yet.

Graph remains primary reasoning layer.

⸻

Simulation Layer

simulation/

Contains:

* interventionSimulator.js

Status:

KEEP

Purpose:

Future intervention modelling.

Potential future capabilities:

* Calorie adjustment simulation
* Activity increase simulation
* Diet break simulation
* Strategy comparison

Decision:

Keep parked until reasoning engine matures.

⸻

Reporting Layer

reports/

Contains:

* downloadReport.js
* graphReasoningReport.js
* knowledgeReport.js
* mlReport.js
* reportGenerator.js
* simulationReport.js
* timelineReport.js

Status:

KEEP

Purpose:

Output layer.

Future requirement:

Reports should consume:

diagnoseCase()

rather than legacy engines.

⸻

Data Layer

data/

Contains:

* importer.js
* csvExport.js
* localStore.js
* sample.csv

Status:

KEEP

Purpose:

Local-first operation.

Supports:

* GitHub Pages deployment
* Browser-only workflows
* Low-cost SaaS architecture

⸻

Application Layer

app/

Status:

KEEP

Purpose:

Presentation layer.

Future requirement:

Consume:

diagnoseCase()
diagnoseRows()

rather than directly importing legacy systems.

⸻

Overlap Map

Water / Scale Noise

Legacy:

* waterRetentionPack.js
* weightSignal.js

Governed:

* water-scale-noise/
* measurement-noise/

Decision:

Ontology owned by governed domains.

Legacy contributes heuristics only.

⸻

Energy Balance

Legacy:

* energyBalancePack.js
* deficit.js

Governed:

* energy-balance/

Decision:

Domain owns concept.

Analytics owns calculations.

⸻

Adherence

Legacy:

* adherencePack.js
* adherence.js

Governed:

* adherence-behaviour/

Decision:

Domain owns ontology.

Analytics owns signal generation.

⸻

Recovery

Legacy:

* recoveryStressPack.js

Governed:

* recovery-sleep/
* stress-psychology/

Decision:

Promote useful heuristics.

Retire duplicate ontology.

⸻

Graph Reasoning

Legacy:

* graphEngine.js
* graphScoring.js
* activePathways.js
* pathwayExplorer.js

Governed:

* activationEngine.js
* routeBuilder.js
* hypothesisGenerator.js

Decision:

Audit before deletion.

Potential promotion candidates.

⸻

Promotion Candidates

High Priority

* analytics/trends.js
* analytics/weightSignal.js
* analytics/deficit.js
* analytics/adherence.js

Reason:

Real-world signal extraction.

⸻

Medium Priority

* graphScoring.js
* activePathways.js
* pathwayExplorer.js

Reason:

Potential reasoning improvements.

⸻

Medium Priority

* knowledge/*Pack.js
* rules.json

Reason:

Potential heuristic extraction.

⸻

Later Priority

* simulation/
* ml/

Reason:

Future enhancement layers.

⸻

Migration Plan

Pass 1

Architecture Inventory

Status:

Complete

⸻

Pass 2

Analytics Extraction

Status:

In Progress

Completed:

* analyticsSignalExtractor.js
* diagnoseRows.js

Goal:

Convert analytics into governed signal generation.

⸻

Pass 3

Knowledge Pack Consolidation

Status:

In Progress

Completed:

* legacyKnowledgeAdapter.js
* testLegacyKnowledgeAdapter.js

Goal:

Absorb useful heuristics.

Retire duplicate ontology.

⸻

# Pass 4 – Graph Engine Extraction

Status:

IN PROGRESS

Purpose:

Audit legacy graph engine for reusable reasoning capability.

Focus:

- pathway discovery
- pathway ranking
- intervention mapping
- graph traversal
- activation propagation

Non-focus:

- rendering
- visualisation
- UI

Desired outcome:

Promote capability,
not duplicate architecture.

⸻

Pass 5

Rules Consolidation

Status:

Pending

Goal:

Extract useful thresholds and decision rules.

Convert into governed reasoning and tests.

⸻

Pass 6

Simulation & ML Review

Status:

Pending

Goal:

Determine future integration points.

⸻

Pass 7

Application Alignment

Status:

Pending

Goal:

Make application consume:

* diagnoseCase()
* diagnoseRows()

⸻

Pass 8

Repository Cleanup

Status:

Pending

Goal:

Archive or remove redundant assets.

Achieve a single coherent architecture.

⸻

Success Criteria

The project is successful when:

* One ontology exists
* One graph exists
* One reasoning engine exists
* Legacy assets are either promoted or archived
* Every recommendation is explainable
* Every diagnosis is testable
* Every file has a clear purpose
* GitHub Pages can run the full diagnostic workflow locally
* The application becomes a thin layer over the reasoning engine

The graph is the product.

Everything else is a consumer.
## Hardening Pass Notes

This repo still contains legacy reasoning adapters, but they are now isolated to migration-only signal generation:

- `knowledge-base/reasoning/legacyKnowledgeAdapter.js`
- `knowledge-base/reasoning/legacyRulesAdapter.js`

The hardening pass changed the behavioural contract in these ways:

- Diagnosis state classification is shared between `diagnoseCase()` and `diagnoseRows()`.
- Stable weight no longer auto-activates low confidence.
- Confidence now distinguishes interpretation from low-confidence states.
- Strategy selection follows an explicit diagnostic hierarchy rather than a generic stable-weight fallback.
- Delayed strategies are separated from active strategies in both engine output and scenario tests.
- Assembled graph edges are normalized to the governed schema:
  - `source`
  - `target`
  - `relationship`
  - `strength`
  - `direction`
  - `explanation`
  - `diagnosticUse`

Future cleanup target:

- Remove legacy adapters after their remaining heuristics have native ontology coverage and dedicated tests.
