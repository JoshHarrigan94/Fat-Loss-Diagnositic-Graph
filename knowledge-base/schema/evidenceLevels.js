/**
 * evidenceLevels.js
 *
 * Evidence ontology for the Fat Loss Knowledge Graph.
 *
 * Purpose:
 * - Classify how strongly a node or relationship is supported
 * - Separate high-confidence physiology from coaching heuristics
 * - Make the graph more trustworthy as it scales
 */

export const EVIDENCE_LEVELS = {
  clinical_guideline: {
    id: "clinical_guideline",
    label: "Clinical Guideline",
    rank: 5,
    description:
      "Supported by recognised clinical or public health guidance.",
    useCase:
      "Medical risk, obesity, diabetes, youth, older adults and contraindications."
  },

  systematic_review: {
    id: "systematic_review",
    label: "Systematic Review / Meta-analysis",
    rank: 5,
    description:
      "Supported by systematic review, meta-analysis or broad research consensus.",
    useCase:
      "Core physiology, energy balance, protein intake, resistance training and activity."
  },

  controlled_trial: {
    id: "controlled_trial",
    label: "Controlled Trial",
    rank: 4,
    description:
      "Supported by experimental human intervention data.",
    useCase:
      "Specific interventions, nutrition strategies or behaviour-change methods."
  },

  mechanistic_evidence: {
    id: "mechanistic_evidence",
    label: "Mechanistic Evidence",
    rank: 4,
    description:
      "Supported by plausible physiology or experimentally observed mechanisms.",
    useCase:
      "Water retention, glycogen, recovery, appetite and metabolic adaptation."
  },

  observational_evidence: {
    id: "observational_evidence",
    label: "Observational Evidence",
    rank: 3,
    description:
      "Supported by population or real-world observational patterns.",
    useCase:
      "Behaviour patterns, adherence, lifestyle constraints and long-term outcomes."
  },

  coaching_heuristic: {
    id: "coaching_heuristic",
    label: "Coaching Heuristic",
    rank: 2,
    description:
      "Supported by practical coaching logic and repeated field observation.",
    useCase:
      "First-action decisions, intervention sequencing and behavioural troubleshooting."
  },

  user_specific_pattern: {
    id: "user_specific_pattern",
    label: "User-specific Pattern",
    rank: 2,
    description:
      "Supported by repeated patterns in the individual user's own data.",
    useCase:
      "Personalisation, response history and adaptive coaching."
  },

  hypothesis: {
    id: "hypothesis",
    label: "Hypothesis",
    rank: 1,
    description:
      "A plausible but weakly supported relationship requiring more evidence.",
    useCase:
      "Exploratory nodes, early-stage reasoning and low-confidence pathways."
  }
};

export function getEvidenceLevel(levelId) {
  return EVIDENCE_LEVELS[levelId] || null;
}

export function listEvidenceLevels() {
  return Object.values(EVIDENCE_LEVELS);
}

export function isValidEvidenceLevel(levelId) {
  return Boolean(EVIDENCE_LEVELS[levelId]);
}