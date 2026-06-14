# Architecture Audit

## Product Direction

The product is a governed fat-loss diagnostic reasoning engine.

The app is not the core product. The core product is the reusable decision engine that can diagnose stalled, noisy, risky, or suboptimal fat-loss journeys and recommend the safest next action.

Primary product capabilities:

- Interpret fat-loss progress
- Detect true plateaus vs false plateaus
- Identify measurement noise
- Identify adherence and tracking uncertainty
- Detect recovery, stress, sleep, and diet-fatigue bottlenecks
- Detect population-specific constraints
- Detect medical and contraindication risks
- Generate explainable hypotheses
- Select strategies
- Produce risk-adjusted recommendations
- Support GitHub Pages/static deployment

## Current Source of Truth

Primary source of truth:

```txt
knowledge-base/