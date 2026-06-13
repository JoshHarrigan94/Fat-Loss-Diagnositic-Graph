import { habitDesignNodes } from "./nodes.js";
import { habitDesignEdges } from "./edges.js";

export const habitDesignDomain = {
  id: "habit-design",
  label: "Habit Design",
  description:
    "Models cues, defaults, friction, implementation intentions, feedback loops, environment design, relapse prevention, minimum viable behaviours, and habit stacking.",
  phase: 3,
  status: "active",
  primaryPurpose:
    "To convert fat-loss intentions into repeatable, low-friction behaviours that survive real-world disruption.",
  diagnosticQuestions: [
    "Are target behaviours supported by reliable cues?",
    "Is the plan too high-friction to repeat?",
    "Are there useful defaults that reduce decision fatigue?",
    "Does the environment make desired behaviours easier or harder?",
    "Are predictable barriers covered by if-then plans?",
    "Is there a minimum viable fallback for disrupted days?",
    "Does the person have a relapse prevention plan?"
  ],
  connectsTo: [
    "adherence-behaviour",
    "stress-psychology",
    "nutrition-quality",
    "activity-neat",
    "measurement-noise",
    "diet-fatigue",
    "population-constraints",
    "intervention-strategy",
    "risk-management"
  ],
  nodes: habitDesignNodes,
  edges: habitDesignEdges
};

export default habitDesignDomain;
