/**
 * index.js
 *
 * Energy Balance domain.
 */

import { ENERGY_BALANCE_NODES } from "./nodes.js";
import { ENERGY_BALANCE_EDGES } from "./edges.js";

export const ENERGY_BALANCE_DOMAIN = {
  id: "energy_balance",

  label: "Energy Balance",

  description:
    "The core physics layer of fat loss. Explains how energy intake, energy expenditure, calorie deficit and fat-mass change relate over time.",

  version: "1.0.0",

  nodeCount: ENERGY_BALANCE_NODES.length,

  edgeCount: ENERGY_BALANCE_EDGES.length,

  nodes: ENERGY_BALANCE_NODES,

  edges: ENERGY_BALANCE_EDGES
};

export function getEnergyBalanceDomain() {
  return ENERGY_BALANCE_DOMAIN;
}

export function getEnergyBalanceNodes() {
  return ENERGY_BALANCE_NODES;
}

export function getEnergyBalanceEdges() {
  return ENERGY_BALANCE_EDGES;
}