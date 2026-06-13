import { riskAdjustedRecommendationsNodes } from "./nodes.js";
import { riskAdjustedRecommendationsEdges } from "./edges.js";

export const riskAdjustedRecommendationsDomain = {
  id: "risk-adjusted-recommendations",
  label: "Risk-Adjusted Recommendations",
  description:
    "Models how sequenced strategies become safe, proportionate, population-aware recommendation outputs.",
  phase: 5,
  status: "active",
  primaryPurpose:
    "To convert diagnostic reasoning into final recommendations while adjusting for risk, contraindications, confidence, burden, population context, and safety boundaries.",
  diagnosticQuestions: [
    "Should the output be standard, modified, conservative, monitor-only, or referral-first?",
    "How intense should the recommendation be?",
    "How much monitoring is appropriate?",
    "Does language need to be adapted for psychological safety or population context?",
    "Are safety caveats required?",
    "When should the recommendation be reviewed?",
    "What is the final recommendation package?"
  ],
  connectsTo: [
    "sequencing",
    "risk-management",
    "contraindications",
    "population-constraints",
    "measurement-noise",
    "stress-psychology",
    "intervention-strategy"
  ],
  nodes: riskAdjustedRecommendationsNodes,
  edges: riskAdjustedRecommendationsEdges
};

export default riskAdjustedRecommendationsDomain;
