export const habitDesignNodes = [
  {
    id: "habit_design",
    label: "Habit Design",
    type: "behaviour_change_system",
    domain: "habit-design",
    description:
      "The structured design of cues, routines, rewards, defaults, environments, and feedback loops that make fat-loss behaviours easier to repeat.",
    diagnosticRole: "core",
    appliesTo: ["fat_loss", "obesity", "general_health", "type_2_diabetes", "youth", "older_adults"],
    observableVia: [
      "routine_consistency",
      "cue_presence",
      "default_meals",
      "planning_frequency",
      "environment_design",
      "lapse_recovery"
    ],
    reasoningPurpose:
      "Converts intention into repeatable behaviours that reduce reliance on motivation and willpower.",
    evidenceLevel: "high",
    tags: ["habits", "behaviour-change", "systems", "adherence"]
  },

  {
    id: "implementation_intentions",
    label: "Implementation Intentions",
    type: "planning_tool",
    domain: "habit-design",
    description:
      "Specific if-then plans that define what action will be taken in a predictable situation.",
    diagnosticRole: "core",
    appliesTo: ["fat_loss", "obesity", "general_health", "type_2_diabetes"],
    observableVia: [
      "if_then_plans",
      "planned_responses",
      "scenario_preparation",
      "lapse_plans"
    ],
    reasoningPurpose:
      "Improves execution by pre-deciding responses to common barriers.",
    evidenceLevel: "high",
    tags: ["planning", "if-then", "behaviour-change", "adherence"]
  },

  {
    id: "environment_design",
    label: "Environment Design",
    type: "behavioural_context",
    domain: "habit-design",
    description:
      "The intentional arrangement of food, tools, reminders, social context, and physical spaces to make desired behaviours easier and undesired behaviours harder.",
    diagnosticRole: "core",
    appliesTo: ["fat_loss", "obesity", "general_health", "youth", "chronic_illness"],
    observableVia: [
      "food_visibility",
      "meal_prep_setup",
      "walking_access",
      "home_snack_availability",
      "gym_access",
      "reminder_systems"
    ],
    reasoningPurpose:
      "Reduces reliance on discipline by shaping the available choices and cues.",
    evidenceLevel: "high",
    tags: ["environment", "friction", "defaults", "food-cues"]
  },

  {
    id: "behavioural_friction",
    label: "Behavioural Friction",
    type: "execution_modifier",
    domain: "habit-design",
    description:
      "The practical difficulty, time cost, cognitive effort, or inconvenience required to perform a target behaviour.",
    diagnosticRole: "core",
    appliesTo: ["fat_loss", "obesity", "general_health", "older_adults", "chronic_illness"],
    observableVia: [
      "time_cost",
      "prep_complexity",
      "commute_barrier",
      "tracking_effort",
      "equipment_access",
      "decision_count"
    ],
    reasoningPurpose:
      "Explains why behaviours that are desirable in theory fail in real life.",
    evidenceLevel: "high",
    tags: ["friction", "execution", "simplicity", "adherence"]
  },

  {
    id: "default_behaviours",
    label: "Default Behaviours",
    type: "behavioural_default",
    domain: "habit-design",
    description:
      "Pre-selected repeatable behaviours that require minimal decision-making, such as default breakfasts, walking routes, meal templates, or check-in routines.",
    diagnosticRole: "core",
    appliesTo: ["fat_loss", "obesity", "general_health", "type_2_diabetes", "performance"],
    observableVia: [
      "default_meals",
      "default_shopping_list",
      "default_step_route",
      "default_training_slots",
      "repeatable_check_ins"
    ],
    reasoningPurpose:
      "Reduces decision fatigue and increases consistency through repeatable routines.",
    evidenceLevel: "high",
    tags: ["defaults", "routine", "decision-fatigue", "consistency"]
  },

  {
    id: "cue_reliability",
    label: "Cue Reliability",
    type: "habit_trigger",
    domain: "habit-design",
    description:
      "The consistency and strength of cues that prompt desired behaviours, such as meal timing, alarms, location, social prompts, or existing routines.",
    diagnosticRole: "supporting",
    appliesTo: ["fat_loss", "general_health", "obesity", "youth", "older_adults"],
    observableVia: [
      "cue_consistency",
      "alarm_use",
      "habit_stacking",
      "routine_anchor",
      "missed_cues"
    ],
    reasoningPurpose:
      "Determines whether target behaviours are being reliably triggered.",
    evidenceLevel: "moderate",
    tags: ["cue", "trigger", "habit-stacking", "routine"]
  },

  {
    id: "feedback_loop_quality",
    label: "Feedback Loop Quality",
    type: "self_regulation_process",
    domain: "habit-design",
    description:
      "The quality of feedback used to adjust behaviour, including check-ins, trend reviews, reflection, logs, and outcome interpretation.",
    diagnosticRole: "core",
    appliesTo: ["fat_loss", "body_recomposition", "obesity", "type_2_diabetes", "performance"],
    observableVia: [
      "weekly_review",
      "trend_review",
      "behaviour_reflection",
      "adjustment_history",
      "check_in_completion"
    ],
    reasoningPurpose:
      "Allows the person or system to correct drift before it becomes failure.",
    evidenceLevel: "high",
    tags: ["feedback", "self-monitoring", "review", "adjustment"]
  },

  {
    id: "habit_stacking",
    label: "Habit Stacking",
    type: "habit_strategy",
    domain: "habit-design",
    description:
      "Attaching a new behaviour to an already stable routine to improve repeatability.",
    diagnosticRole: "supporting",
    appliesTo: ["fat_loss", "general_health", "obesity", "older_adults", "youth"],
    observableVia: [
      "existing_anchor_behaviour",
      "stacked_behaviour",
      "routine_consistency",
      "completion_rate"
    ],
    reasoningPurpose:
      "Improves consistency by using existing routines as behavioural anchors.",
    evidenceLevel: "moderate",
    tags: ["habit-stacking", "routine", "cue", "behaviour-change"]
  },

  {
    id: "relapse_prevention_plan",
    label: "Relapse Prevention Plan",
    type: "risk_management_strategy",
    domain: "habit-design",
    description:
      "A planned response for predictable disruptions such as holidays, illness, stress, travel, injury, social events, or motivation dips.",
    diagnosticRole: "core",
    appliesTo: ["fat_loss", "obesity", "body_recomposition", "chronic_illness", "general_health"],
    observableVia: [
      "planned_disruption_strategy",
      "holiday_plan",
      "illness_plan",
      "travel_plan",
      "restart_protocol"
    ],
    reasoningPurpose:
      "Prevents predictable disruption from turning into prolonged regression.",
    evidenceLevel: "high",
    tags: ["relapse-prevention", "lapse-recovery", "planning", "resilience"]
  },

  {
    id: "minimum_viable_behaviour",
    label: "Minimum Viable Behaviour",
    type: "fallback_strategy",
    domain: "habit-design",
    description:
      "The smallest useful version of a target behaviour that can be maintained during low-energy, high-stress, or disrupted periods.",
    diagnosticRole: "core",
    appliesTo: ["fat_loss", "obesity", "general_health", "chronic_illness", "older_adults"],
    observableVia: [
      "fallback_steps",
      "minimum_meal_rule",
      "short_workout_option",
      "basic_tracking_rule",
      "low_energy_plan"
    ],
    reasoningPurpose:
      "Maintains continuity when full adherence is not realistic.",
    evidenceLevel: "moderate",
    tags: ["minimum-effective-dose", "fallback", "continuity", "adherence"]
  }
];
