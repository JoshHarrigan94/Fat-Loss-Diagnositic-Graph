/**
 * graphRenderer.js
 *
 * Lightweight SVG renderer for knowledge graph subgraphs.
 *
 * Purpose:
 * - Render diagnosis explanation nodes and edges
 * - Keep rendering separate from graph reasoning
 * - Work well on iPad/mobile without canvas libraries
 */

export function renderGraphSvg(subgraph) {
  if (!subgraph || !subgraph.nodes?.length) {
    return `
      <div class="empty-graph">
        No graph pathway available.
      </div>
    `;
  }

  const layout = createSimpleLayout(subgraph);

  const edges = subgraph.edges
    .map((edge) => renderEdge(edge, layout))
    .join("");

  const nodes = subgraph.nodes
    .map((node) => renderNode(node, layout))
    .join("");

  return `
    <div class="graph-canvas">
      <svg viewBox="0 0 900 440" preserveAspectRatio="xMidYMid meet">
        <defs>
          <marker
            id="arrow"
            markerWidth="10"
            markerHeight="10"
            refX="8"
            refY="3"
            orient="auto"
            markerUnits="strokeWidth"
          >
            <path d="M0,0 L0,6 L9,3 z" />
          </marker>
        </defs>

        ${edges}
        ${nodes}
      </svg>
    </div>
  `;
}

function createSimpleLayout(subgraph) {
  const nodes = subgraph.nodes;

  const columns = groupNodesIntoColumns(nodes);

  const positions = {};

  columns.forEach((column, columnIndex) => {
    const x = 110 + columnIndex * 220;
    const spacing = 320 / Math.max(column.length, 1);

    column.forEach((node, rowIndex) => {
      positions[node.id] = {
        x,
        y: 80 + rowIndex * spacing
      };
    });
  });

  return positions;
}

function groupNodesIntoColumns(nodes) {
  const input = [];
  const mechanism = [];
  const signal = [];
  const diagnosis = [];

  nodes.forEach((node) => {
    if (node.type === "input" || node.type === "behaviour") {
      input.push(node);
      return;
    }

    if (
      node.type === "mechanism" ||
      node.type === "masker" ||
      node.type === "context"
    ) {
      mechanism.push(node);
      return;
    }

    if (
      node.type === "signal" ||
      node.type === "observable" ||
      node.type === "diagnostic_signal" ||
      node.type === "calculated_signal"
    ) {
      signal.push(node);
      return;
    }

    diagnosis.push(node);
  });

  return [input, mechanism, signal, diagnosis].filter(
    (column) => column.length > 0
  );
}

function renderEdge(edge, layout) {
  const source = layout[edge.source];
  const target = layout[edge.target];

  if (!source || !target) return "";

  return `
    <line
      x1="${source.x + 72}"
      y1="${source.y}"
      x2="${target.x - 72}"
      y2="${target.y}"
      class="graph-edge"
      marker-end="url(#arrow)"
    />
  `;
}

function renderNode(node, layout) {
  const position = layout[node.id];

  if (!position) return "";

  const label = escapeSvg(node.label);

  const className = [
    "graph-node",
    `graph-node-${node.type}`
  ].join(" ");

  return `
    <g class="${className}" transform="translate(${position.x}, ${position.y})">
      <rect
        x="-78"
        y="-26"
        width="156"
        height="52"
        rx="18"
      />
      <text
        text-anchor="middle"
        dominant-baseline="middle"
      >
        ${label}
      </text>
    </g>
  `;
}

function escapeSvg(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}