/**
 * Maps major user problems
 * to graph reasoning routes.
 */

export const DIAGNOSTIC_ENGINE_MAP = {

  weight_stalled: {
    pathway: "weight_not_moving"
  },

  gaining_weight: {
    pathway: "weight_increasing"
  },

  excessive_hunger: {
    pathway: "hungry_all_the_time"
  },

  excessive_fatigue: {
    pathway: "fatigue_high"
  }

};