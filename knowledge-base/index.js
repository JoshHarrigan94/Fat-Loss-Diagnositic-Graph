/**
 * index.js
 *
 * Root export for the standalone Fat Loss Knowledge Base.
 */

export * from "./schema/index.js";
export * from "./ontology/index.js";

export {
  WATER_SCALE_NOISE_DOMAIN,
  getWaterScaleNoiseDomain,
  getWaterScaleNoiseNodes,
  getWaterScaleNoiseEdges
} from "./domains/water-scale-noise/index.js";