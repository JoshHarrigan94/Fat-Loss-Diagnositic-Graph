export function renderAtlasScene(model, options = {}) {
  const {
    interactive = true,
    compact = false,
    pathwayMode = false
  } = options;

  const selectedId = model.selectedNode?.id || "";
  const activeNodeIds = new Set(model.activePathway?.nodeIds || []);

  return `
    <section class="atlas-shell ${compact ? "atlas-shell-compact" : ""}">
      <div class="atlas-frame">
        <svg
          class="atlas-svg ${pathwayMode ? "atlas-svg-pathway" : ""}"
          viewBox="0 0 ${model.viewBox.width} ${model.viewBox.height}"
          preserveAspectRatio="xMidYMid meet"
          ${interactive ? 'data-atlas-root="true"' : ""}
        >
          ${renderAtlasBackdrop(model)}
          ${model.edges.map(edge => renderEdge(edge, selectedId)).join("")}
          ${model.nodes.map(node => renderNode(node, selectedId, activeNodeIds, interactive)).join("")}
        </svg>
      </div>
      ${
        interactive
          ? `<p class="atlas-hover-note" data-atlas-hover-note="true" data-default-note="${escapeHtml(model.caption)}">${escapeHtml(model.caption)}</p>`
          : ""
      }
    </section>
  `;
}

function renderAtlasBackdrop(model) {
  return `
    <defs>
      <pattern id="atlas-grid" width="40" height="40" patternUnits="userSpaceOnUse">
        <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#ece4d8" stroke-width="1" />
      </pattern>
    </defs>

    <rect x="0" y="0" width="${model.viewBox.width}" height="${model.viewBox.height}" class="atlas-paper" />
    <rect x="0" y="0" width="${model.viewBox.width}" height="${model.viewBox.height}" fill="url(#atlas-grid)" opacity="0.65" />

    ${model.sectionBands.map(
      band => `
        <g class="atlas-band">
          <line x1="72" y1="${band.y + band.height}" x2="${model.viewBox.width - 72}" y2="${band.y + band.height}" />
          <text x="82" y="${band.y}" class="atlas-band-label">${escapeHtml(band.label)}</text>
        </g>
      `
    ).join("")}
  `;
}

function renderEdge(edge, selectedId) {
  const edgeClasses = [
    "atlas-edge",
    edge.isPathway ? "is-pathway" : "",
    selectedId && (edge.source === selectedId || edge.target === selectedId) ? "is-direct" : ""
  ]
    .filter(Boolean)
    .join(" ");

  return `
    <path
      class="${edgeClasses}"
      d="${edge.path}"
      stroke="${escapeHtml(edge.color)}"
      data-edge-source="${escapeHtml(edge.source)}"
      data-edge-target="${escapeHtml(edge.target)}"
      data-edge-explanation="${escapeHtml(edge.explanation)}"
    />
  `;
}

function renderNode(node, selectedId, activeNodeIds, interactive) {
  const classes = [
    "atlas-node",
    `atlas-node-${node.kind}`,
    node.id === selectedId ? "is-selected" : "",
    activeNodeIds.has(node.id) ? "is-active-path" : ""
  ]
    .filter(Boolean)
    .join(" ");

  const neighbors = (node.neighbors || []).join(",");
  const width = node.kind === "satellite" ? 156 : node.kind === "input" ? 146 : 178;
  const height = node.kind === "satellite" ? 44 : 56;

  return `
    <g
      class="${classes}"
      transform="translate(${node.x}, ${node.y})"
      ${interactive ? `data-atlas-node="${escapeHtml(node.id)}"` : ""}
      data-atlas-summary="${escapeHtml(node.description)}"
      data-atlas-neighbors="${escapeHtml(neighbors)}"
    >
      <rect
        x="${Math.round(width / -2)}"
        y="${Math.round(height / -2)}"
        width="${width}"
        height="${height}"
        rx="${node.kind === "satellite" ? 18 : 26}"
        fill="#fffaf4"
        stroke="${escapeHtml(node.color)}"
      />
      <text class="atlas-node-label" text-anchor="middle" dominant-baseline="middle">
        ${escapeHtml(node.label)}
      </text>
    </g>
  `;
}

export function attachNeighborMetadata(model) {
  const edgePairs = new Map();

  model.nodes.forEach(node => {
    edgePairs.set(node.id, new Set());
  });

  model.edges.forEach(edge => {
    edgePairs.get(edge.source)?.add(edge.target);
    edgePairs.get(edge.target)?.add(edge.source);
  });

  return {
    ...model,
    nodes: model.nodes.map(node => ({
      ...node,
      neighbors: Array.from(edgePairs.get(node.id) || [])
    }))
  };
}

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}
