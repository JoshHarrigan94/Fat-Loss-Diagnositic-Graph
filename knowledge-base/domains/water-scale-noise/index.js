/**
 * index.js
 *
 * Water Retention & Scale Noise domain.
 *
 * Purpose:
 * - Single export point for the domain
 * - Supports graph assembly
 * - Supports future domain registry
 */

import { WATER_SCALE_NOISE_NODES } from "./nodes.js";
import { WATER_SCALE_NOISE_EDGES } from "./edges.js";

export const WATER_SCALE_NOISE_DOMAIN = {
  id: "water_scale_noise",

  label: "Water Retention & Scale Noise",

  description:
    "Explains why scale weight does not always reflect fat mass change. Covers water retention, glycogen, sodium, gut content and measurement noise.",

  version: "1.0.0",

  nodeCount: WATER_SCALE_NOISE_NODES.length,

  edgeCount: WATER_SCALE_NOISE_EDGES.length,

  nodes: WATER_SCALE_NOISE_NODES,

  edges: WATER_SCALE_NOISE_EDGES
};

export function getWaterScaleNoiseDomain() {
  return WATER_SCALE_NOISE_DOMAIN;
}

export function getWaterScaleNoiseNodes() {
  return WATER_SCALE_NOISE_NODES;
}

export function getWaterScaleNoiseEdges() {
  return WATER_SCALE_NOISE_EDGES;
}

export default WATER_SCALE_NOISE_DOMAIN;