export function renderAtlasScene(model, options = {}) {
  const {
    interactive = true,
    compact = false,
    pathwayMode = false,
    railMode = "full",
    labelMode = "always",
    interactionProfile = "default"
  } = options;

  const selectedId = model.selectedNode?.id || "";
  const activeNodeIds = new Set(model.activePathway?.nodeIds || []);
  const details = model.nodeDetails;

  return `
    <section class="atlas-shell ${compact ? "atlas-shell-compact" : ""}">
      <div class="atlas-frame atlas-frame-poster">
        <svg
          class="atlas-svg atlas-svg-poster ${pathwayMode ? "atlas-svg-pathway" : ""} atlas-svg-${interactionProfile}"
          viewBox="0 0 ${model.viewBox.width} ${model.viewBox.height}"
          preserveAspectRatio="xMidYMid meet"
          ${interactive ? `data-atlas-root="true" data-interaction-profile="${escapeHtml(interactionProfile)}"` : ""}
        >
          ${renderDefinitions()}
          ${renderPosterPaper(model)}
          ${railMode === "full" ? renderPosterRails(model.poster, details) : ""}
          ${model.edges.map(edge => renderEdge(edge, selectedId)).join("")}
          ${renderPosterLabels(model, labelMode)}
          ${model.nodes.map(node => renderNode(node, selectedId, activeNodeIds, interactive, labelMode)).join("")}
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

export function attachNeighborMetadata(model) {
  const neighbors = new Map(model.nodes.map(node => [node.id, new Set()]));

  model.edges.forEach(edge => {
    neighbors.get(edge.source)?.add(edge.target);
    neighbors.get(edge.target)?.add(edge.source);
  });

  return {
    ...model,
    nodes: model.nodes.map(node => ({
      ...node,
      neighbors: Array.from(neighbors.get(node.id) || [])
    }))
  };
}

function renderDefinitions() {
  return `
    <defs>
      <pattern id="atlas-grid" width="36" height="36" patternUnits="userSpaceOnUse">
        <path d="M 36 0 L 0 0 0 36" fill="none" stroke="#ede5da" stroke-width="1" />
      </pattern>
      <filter id="atlas-grain" x="-10%" y="-10%" width="120%" height="120%">
        <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" seed="7" result="noise" />
        <feColorMatrix in="noise" type="saturate" values="0" />
        <feComponentTransfer>
          <feFuncA type="table" tableValues="0 0.04" />
        </feComponentTransfer>
      </filter>
      <radialGradient id="atlas-vignette" cx="50%" cy="50%" r="65%">
        <stop offset="0%" stop-color="#fffdf9" />
        <stop offset="100%" stop-color="#f7f0e7" />
      </radialGradient>
    </defs>
  `;
}

function renderPosterPaper(model) {
  return `
    <rect x="0" y="0" width="${model.viewBox.width}" height="${model.viewBox.height}" fill="url(#atlas-vignette)" />
    <rect x="0" y="0" width="${model.viewBox.width}" height="${model.viewBox.height}" fill="url(#atlas-grid)" opacity="0.65" />
    <rect x="0" y="0" width="${model.viewBox.width}" height="${model.viewBox.height}" filter="url(#atlas-grain)" opacity="0.42" />
    <line x1="250" y1="198" x2="1550" y2="198" class="atlas-band-line" />
    <line x1="250" y1="1032" x2="1550" y2="1032" class="atlas-band-line" />
    <text x="900" y="84" class="atlas-band-title" text-anchor="middle">OUTCOMES</text>
    <text x="900" y="1060" class="atlas-band-title" text-anchor="middle">FOUNDATION INPUTS</text>
  `;
}

function renderPosterRails(poster, details) {
  return `
    <g class="atlas-rail atlas-rail-left">
      <text x="42" y="78" class="atlas-hero-title">${renderMultilineSvgText(poster.title)}</text>
      <text x="42" y="148" class="atlas-hero-subtitle">${escapeHtml(poster.subtitle.toUpperCase())}</text>

      ${renderLabeledPanel(34, 190, 170, 190, "LEGEND", poster.leftRail.legend)}
      ${renderLabeledPanel(34, 420, 170, 188, "PRINCIPLES", poster.leftRail.principles, true)}
      ${renderLabeledPanel(34, 648, 170, 154, "LEVELS", poster.leftRail.levels, true)}
      ${renderQuotePanel(34, 840, 170, 200, poster.leftRail.quote)}
    </g>

    <g class="atlas-rail atlas-rail-right">
      ${renderLabeledPanel(1598, 92, 168, 178, "HOW TO READ", poster.rightRail.howToRead, true)}
      ${renderScalePanel(1598, 306, 168, 156, "INFLUENCE SCALE", poster.rightRail.influenceScale)}
      ${renderLabeledPanel(1598, 498, 168, 156, "TIME HORIZON", poster.rightRail.timeHorizon, true)}
      ${renderDynamicFocusPanel(1598, 690, 168, 238, details)}
      ${renderLabeledPanel(1598, 958, 168, 156, "NOTES", poster.rightRail.notes, true)}
    </g>
  `;
}

function renderPosterLabels(model, labelMode) {
  if (labelMode !== "always") return "";

  const rendered = [];

  model.nodes.forEach(node => {
    if (node.visualTier === "outcome") {
      rendered.push(`
        <g class="atlas-outcome-label">
          <text x="${node.x}" y="${node.y - 8}" text-anchor="middle" class="atlas-outcome-title">${escapeHtml(node.label)}</text>
          <text x="${node.x}" y="${node.y + 22}" text-anchor="middle" class="atlas-outcome-caption">${escapeHtml(node.caption || "")}</text>
        </g>
      `);
    }

    if (node.visualTier === "input") {
      rendered.push(`
        <g class="atlas-input-label">
          <text x="${node.x}" y="${node.y - 8}" text-anchor="middle" class="atlas-input-title">${escapeHtml(node.label)}</text>
          <text x="${node.x}" y="${node.y + 22}" text-anchor="middle" class="atlas-input-caption">${escapeHtml(node.caption || "")}</text>
        </g>
      `);
    }
  });

  return rendered.join("");
}

function renderEdge(edge, selectedId) {
  const edgeClasses = [
    "atlas-edge",
    `atlas-edge-${edge.kind}`,
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

function renderNode(node, selectedId, activeNodeIds, interactive, labelMode) {
  const classes = [
    "atlas-node",
    `atlas-node-${node.visualTier}`,
    node.id === selectedId ? "is-selected" : "",
    activeNodeIds.has(node.id) ? "is-active-path" : ""
  ]
    .filter(Boolean)
    .join(" ");

  const baseAttrs = interactive
    ? `data-atlas-node="${escapeHtml(node.id)}" data-atlas-summary="${escapeHtml(node.description)}" data-atlas-neighbors="${escapeHtml((node.neighbors || []).join(","))}"`
    : "";

  if (node.visualTier === "hub") {
    return `
      <g class="${classes}" transform="translate(${node.x}, ${node.y})" ${baseAttrs}>
        <circle r="78" class="atlas-hub-aura" />
        <circle r="56" class="atlas-hub-core" stroke="${escapeHtml(node.color)}" />
        <text class="atlas-hub-icon" text-anchor="middle" y="-6">${escapeHtml(node.icon || "")}</text>
        ${renderInteractionLabel(node, "atlas-hub-label atlas-node-reveal-label", 14)}
      </g>
    `;
  }

  if (node.visualTier === "center") {
    return `
      <g class="${classes}" transform="translate(${node.x}, ${node.y})" ${baseAttrs}>
        <circle r="102" class="atlas-center-aura" />
        <circle r="76" class="atlas-center-core" />
        ${labelMode === "always"
          ? `<text class="atlas-center-label" text-anchor="middle" y="-4">${renderMultilineSvgText(node.label)}</text>`
          : renderInteractionLabel(node, "atlas-center-label atlas-node-reveal-label", -4)}
      </g>
    `;
  }

  if (node.visualTier === "mechanism") {
    return `
      <g class="${classes}" transform="translate(${node.x}, ${node.y})" ${baseAttrs}>
        <circle r="5" fill="${escapeHtml(node.color)}" />
        <circle r="14" class="atlas-mechanism-ring" stroke="${escapeHtml(node.color)}" />
        ${renderInteractionLabel(node, "atlas-mechanism-label atlas-node-reveal-label", -18, false)}
      </g>
    `;
  }

  if (node.visualTier === "input") {
    return `
      <g class="${classes}" transform="translate(${node.x}, ${node.y})" ${baseAttrs}>
        <circle r="7" class="atlas-input-dot" />
        ${labelMode === "always"
          ? ""
          : renderInteractionLabel(node, "atlas-input-label atlas-node-reveal-label", -16, false, node.caption)}
      </g>
    `;
  }

  if (node.visualTier === "outcome") {
    return `
      <g class="${classes}" transform="translate(${node.x}, ${node.y})" ${baseAttrs}>
        <circle r="7" class="atlas-outcome-dot" />
        ${labelMode === "always"
          ? ""
          : renderInteractionLabel(node, "atlas-outcome-label atlas-node-reveal-label", -16, false, node.caption)}
      </g>
    `;
  }

  return "";
}

function renderInteractionLabel(node, className, y, multiline = true, caption = "") {
  const title = multiline ? renderMultilineSvgText(node.label) : escapeHtml(node.label);
  const titleBlock = `<text class="${className}" text-anchor="middle" y="${y}">${title}</text>`;
  const captionBlock = caption
    ? `<text class="atlas-node-reveal-caption" text-anchor="middle" y="${y + 18}">${escapeHtml(caption)}</text>`
    : "";

  return `
    <g class="atlas-node-reveal">
      ${titleBlock}
      ${captionBlock}
    </g>
  `;
}

function renderLabeledPanel(x, y, width, height, title, items, ordered = false) {
  const body = items.map((item, index) => {
    const prefix = ordered ? `${index + 1}. ` : "• ";
    return `${prefix}${item}`;
  });

  return renderTextPanel(x, y, width, height, title, body);
}

function renderTextPanel(x, y, width, height, title, items) {
  const lines = wrapLines(items.join("\n"), 28);
  return `
    <g class="atlas-panel">
      <rect x="${x}" y="${y}" width="${width}" height="${height}" rx="16" class="atlas-panel-box" />
      <text x="${x + 18}" y="${y + 28}" class="atlas-panel-title">${escapeHtml(title)}</text>
      ${renderPanelLines(x + 18, y + 54, lines)}
    </g>
  `;
}

function renderQuotePanel(x, y, width, height, quote) {
  const lines = wrapLines(`“${quote}”`, 24);
  return `
    <g class="atlas-panel">
      <rect x="${x}" y="${y}" width="${width}" height="${height}" rx="16" class="atlas-panel-box" />
      ${renderPanelLines(x + 18, y + 38, lines, "atlas-quote-line")}
    </g>
  `;
}

function renderScalePanel(x, y, width, height, title, labels) {
  return `
    <g class="atlas-panel">
      <rect x="${x}" y="${y}" width="${width}" height="${height}" rx="16" class="atlas-panel-box" />
      <text x="${x + 18}" y="${y + 28}" class="atlas-panel-title">${escapeHtml(title)}</text>
      <path d="M ${x + 38} ${y + 110} C ${x + 60} ${y + 72}, ${x + 106} ${y + 72}, ${x + 128} ${y + 110}" class="atlas-scale-arc" />
      <path d="M ${x + 48} ${y + 124} C ${x + 68} ${y + 90}, ${x + 100} ${y + 90}, ${x + 120} ${y + 124}" class="atlas-scale-arc atlas-scale-arc-light" />
      <circle cx="${x + 83}" cy="${y + 102}" r="4" class="atlas-scale-dot" />
      <circle cx="${x + 83}" cy="${y + 118}" r="3" class="atlas-scale-dot atlas-scale-dot-light" />
      <text x="${x + 83}" y="${y + 145}" text-anchor="middle" class="atlas-small-copy">${escapeHtml(labels[0])}</text>
      <text x="${x + 83}" y="${y + 161}" text-anchor="middle" class="atlas-small-copy">${escapeHtml(labels[1])}</text>
      <text x="${x + 83}" y="${y + 177}" text-anchor="middle" class="atlas-small-copy">${escapeHtml(labels[2])}</text>
    </g>
  `;
}

function renderDynamicFocusPanel(x, y, width, height, details) {
  const relationshipLines = wrapLines(
    (details?.relationships || []).slice(0, 3).map(item => item.label).join("\n"),
    28
  );
  const evidenceLines = wrapLines(
    (details?.evidence || []).slice(0, 3).map(item => formatLabel(item)).join("\n"),
    28
  );

  return `
    <g class="atlas-panel atlas-focus-panel">
      <rect x="${x}" y="${y}" width="${width}" height="${height}" rx="16" class="atlas-panel-box atlas-focus-box" />
      <text x="${x + 18}" y="${y + 28}" class="atlas-panel-title">CURRENT FOCUS</text>
      <text x="${x + 18}" y="${y + 56}" class="atlas-focus-title">${escapeHtml(details?.label || "Atlas node")}</text>
      ${renderPanelLines(x + 18, y + 82, wrapLines(details?.description || "", 28), "atlas-small-copy")}
      <text x="${x + 18}" y="${y + 154}" class="atlas-panel-subtitle">Possible causes</text>
      ${renderPanelLines(x + 18, y + 174, relationshipLines.length ? relationshipLines : ["No direct traces."], "atlas-small-copy")}
      <text x="${x + 18}" y="${y + 226}" class="atlas-panel-subtitle">Related pathways</text>
      ${renderPanelLines(x + 18, y + 246, evidenceLines.length ? evidenceLines : ["No attached traces."], "atlas-small-copy")}
    </g>
  `;
}

function renderPanelLines(x, startY, lines, className = "atlas-panel-copy") {
  return lines
    .filter(Boolean)
    .map((line, index) => `<text x="${x}" y="${startY + (index * 16)}" class="${className}">${escapeHtml(line)}</text>`)
    .join("");
}

function renderMultilineSvgText(value) {
  return String(value)
    .split("\n")
    .map((line, index) => `<tspan dy="${index === 0 ? 0 : 18}">${escapeHtml(line)}</tspan>`)
    .join("");
}

function wrapLines(text, maxLength) {
  if (!text) return [];

  const rawLines = String(text).split("\n").filter(Boolean);
  const wrapped = [];

  rawLines.forEach(rawLine => {
    const words = rawLine.split(/\s+/).filter(Boolean);
    let line = "";

    words.forEach(word => {
      const candidate = line ? `${line} ${word}` : word;
      if (candidate.length > maxLength && line) {
        wrapped.push(line);
        line = word;
      } else {
        line = candidate;
      }
    });

    if (line) wrapped.push(line);
  });

  return wrapped;
}

function formatLabel(value) {
  return String(value || "unknown")
    .replaceAll("_", " ")
    .replace(/\b\w/g, char => char.toUpperCase());
}

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}
