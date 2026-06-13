/**
 * interactiveGraphRenderer.js
 *
 * Interactive canvas knowledge graph explorer.
 *
 * Purpose:
 * - Render full graph, not just diagnosis subgraph
 * - Search nodes
 * - Filter by category
 * - Click nodes for definition, coaching implication and connected concepts
 * - Pan and zoom
 */

import { adaptGraphForExplorer } from "./graphAdapter.js";

export function renderInteractiveGraphExplorer(graph) {
  const explorer = adaptGraphForExplorer(graph);

  const containerId = "interactive-graph-container";
  const canvasId = "interactive-graph-canvas";

  requestAnimationFrame(() => {
    initialiseInteractiveGraph({
      containerId,
      canvasId,
      explorer
    });
  });

  return `
    <section class="panel interactive-graph-panel">
      <div class="section-title">
        <div>
          <h2>Full knowledge graph explorer</h2>
          <p class="chart-subtitle">
            Search, filter and explore the diagnostic knowledge graph.
          </p>
        </div>
        <span>${explorer.nodes.length} nodes · ${explorer.edges.length} edges</span>
      </div>

      <div class="kg-toolbar">
        <div class="kg-search-wrap">
          <span>Search</span>
          <input id="kg-search" type="text" placeholder="water retention, sleep, adherence..." />
        </div>

        <div id="kg-legend" class="kg-legend"></div>
      </div>

      <div id="${containerId}" class="interactive-graph-shell">
        <canvas id="${canvasId}"></canvas>

        <aside id="kg-panel" class="kg-panel">
          <div class="kg-panel-header">
            <span id="kg-panel-dot"></span>
            <div>
              <h3 id="kg-panel-title"></h3>
              <p id="kg-panel-category"></p>
            </div>
            <button id="kg-panel-close" type="button">×</button>
          </div>

          <div class="kg-panel-body">
            <p id="kg-panel-definition"></p>

            <div class="kg-panel-section">
              <h4>Coaching implication</h4>
              <p id="kg-panel-coaching"></p>
            </div>

            <div class="kg-panel-section">
              <h4>Connected concepts</h4>
              <div id="kg-panel-relations"></div>
            </div>
          </div>
        </aside>

        <div class="kg-hint">
          Click a node · scroll to zoom · drag to pan
        </div>
      </div>
    </section>
  `;
}

function initialiseInteractiveGraph({
  containerId,
  canvasId,
  explorer
}) {
  const container = document.getElementById(containerId);
  const canvas = document.getElementById(canvasId);

  if (!container || !canvas) return;

  const ctx = canvas.getContext("2d");

  const nodes = explorer.nodes.map((node) => ({ ...node }));
  const edges = explorer.edges.map((edge) => ({ ...edge }));
  const categories = explorer.categories;

  const nodeMap = {};
  nodes.forEach((node) => {
    nodeMap[node.id] = node;
  });

  let width = 0;
  let height = 0;

  let transform = {
    x: 0,
    y: 0,
    scale: 0.85
  };

  let dragging = false;

  let dragStart = {
    x: 0,
    y: 0
  };

  let transformStart = {
    x: 0,
    y: 0
  };

  let selectedNode = null;
  let hoveredNode = null;
  let searchQuery = "";
  let forceTicks = 0;
  let pulseTime = 0;

  const activeCategories = new Set(
    Object.keys(categories)
  );

  function resize() {
    const rect = container.getBoundingClientRect();

    width = canvas.width = Math.floor(rect.width);
    height = canvas.height = Math.floor(rect.height);

    if (!transform.x && !transform.y) {
      transform.x = width / 2;
      transform.y = height / 2;
    }
  }

  function initialisePositions() {
    nodes.forEach((node, index) => {
      const angle = (index / nodes.length) * Math.PI * 2;
      const radius = 220 + Math.random() * 120;

      node.x = Math.cos(angle) * radius;
      node.y = Math.sin(angle) * radius;
      node.vx = 0;
      node.vy = 0;
    });
  }

  function runForces() {
    const repel = 15000;
    const spring = 140;
    const damp = 0.84;
    const gravity = 0.008;

    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dx = nodes[j].x - nodes[i].x;
        const dy = nodes[j].y - nodes[i].y;

        const distanceSquared = dx * dx + dy * dy || 1;
        const distance = Math.sqrt(distanceSquared);

        const force = repel / distanceSquared;

        nodes[i].vx -= (dx / distance) * force;
        nodes[i].vy -= (dy / distance) * force;

        nodes[j].vx += (dx / distance) * force;
        nodes[j].vy += (dy / distance) * force;
      }
    }

    edges.forEach((edge) => {
      const source = nodeMap[edge.from];
      const target = nodeMap[edge.to];

      if (!source || !target) return;

      const dx = target.x - source.x;
      const dy = target.y - source.y;

      const distance = Math.sqrt(dx * dx + dy * dy) || 1;
      const force = (distance - spring) * 0.055;

      source.vx += (dx / distance) * force;
      source.vy += (dy / distance) * force;

      target.vx -= (dx / distance) * force;
      target.vy -= (dy / distance) * force;
    });

    nodes.forEach((node) => {
      node.vx -= node.x * gravity;
      node.vy -= node.y * gravity;

      node.vx *= damp;
      node.vy *= damp;

      node.x += node.vx;
      node.y += node.vy;
    });
  }

  function draw() {
    ctx.clearRect(0, 0, width, height);

    pulseTime += 0.035;

    const searchMatches = searchQuery
      ? new Set(
          nodes
            .filter((node) =>
              node.label
                .toLowerCase()
                .includes(searchQuery.toLowerCase())
            )
            .map((node) => node.id)
        )
      : null;

    const connectedSet = buildConnectedSet(
      selectedNode,
      edges
    );

    ctx.save();
    ctx.translate(transform.x, transform.y);
    ctx.scale(transform.scale, transform.scale);

    drawEdges({
      ctx,
      edges,
      nodeMap,
      categories,
      activeCategories,
      selectedNode,
      connectedSet,
      searchMatches,
      pulseTime,
      scale: transform.scale
    });

    drawNodes({
      ctx,
      nodes,
      categories,
      activeCategories,
      selectedNode,
      connectedSet,
      searchMatches,
      scale: transform.scale,
      pulseTime
    });

    ctx.restore();
  }

  function loop() {
    if (forceTicks < 300) {
      runForces();
      forceTicks++;
    }

    draw();
    requestAnimationFrame(loop);
  }

  function getNodeAt(screenX, screenY) {
    const world = toWorld(
      screenX,
      screenY,
      transform
    );

    for (let i = nodes.length - 1; i >= 0; i--) {
      const node = nodes[i];

      if (!activeCategories.has(node.category)) continue;

      const radius = nodeRadius(node);
      const dx = world.x - node.x;
      const dy = world.y - node.y;

      if (dx * dx + dy * dy < radius * radius) {
        return node;
      }
    }

    return null;
  }

  function openPanel(node) {
    selectedNode = node;

    const panel = document.getElementById("kg-panel");
    const dot = document.getElementById("kg-panel-dot");
    const title = document.getElementById("kg-panel-title");
    const category = document.getElementById("kg-panel-category");
    const definition = document.getElementById("kg-panel-definition");
    const coaching = document.getElementById("kg-panel-coaching");
    const relations = document.getElementById("kg-panel-relations");

    if (
      !panel ||
      !dot ||
      !title ||
      !category ||
      !definition ||
      !coaching ||
      !relations
    ) {
      return;
    }

    const cat = categories[node.category] || categories.other;

    dot.style.background = cat.color;
    title.textContent = node.label;
    category.textContent = cat.label;
    definition.textContent = node.def;
    coaching.textContent = node.coaching;

    relations.innerHTML = "";

    getRelatedNodes(node, edges, nodeMap).forEach((item) => {
      const tag = document.createElement("button");
      tag.className = "kg-relation-tag";
      tag.type = "button";
      tag.textContent = `${item.direction} ${item.node.label}`;
      tag.title = item.relationship;

      tag.addEventListener("click", () => {
        openPanel(item.node);
      });

      relations.appendChild(tag);
    });

    panel.classList.add("open");
  }

  function closePanel() {
    selectedNode = null;

    const panel = document.getElementById("kg-panel");

    if (panel) {
      panel.classList.remove("open");
    }
  }

  function buildLegend() {
    const legend = document.getElementById("kg-legend");

    if (!legend) return;

    legend.innerHTML = "";

    Object.entries(categories).forEach(([key, category]) => {
      const button = document.createElement("button");

      button.className = "kg-legend-item active";
      button.type = "button";
      button.dataset.category = key;

      button.innerHTML = `
        <span style="background:${category.color}"></span>
        ${category.label}
      `;

      button.addEventListener("click", () => {
        if (activeCategories.has(key)) {
          activeCategories.delete(key);
          button.classList.remove("active");
          button.classList.add("dimmed");
        } else {
          activeCategories.add(key);
          button.classList.add("active");
          button.classList.remove("dimmed");
        }
      });

      legend.appendChild(button);
    });
  }

  function bindEvents() {
    const search = document.getElementById("kg-search");
    const close = document.getElementById("kg-panel-close");

    if (search) {
      search.addEventListener("input", (event) => {
        searchQuery = event.target.value.trim();

        if (searchQuery) {
          closePanel();
        }
      });
    }

    if (close) {
      close.addEventListener("click", closePanel);
    }

    canvas.addEventListener("mousedown", (event) => {
      const node = getNodeAt(
        event.offsetX,
        event.offsetY
      );

      if (node) {
        openPanel(node);
        return;
      }

      dragging = true;

      dragStart = {
        x: event.clientX,
        y: event.clientY
      };

      transformStart = {
        x: transform.x,
        y: transform.y
      };

      canvas.classList.add("dragging");
    });

    canvas.addEventListener("mousemove", (event) => {
      if (dragging) {
        transform.x =
          transformStart.x +
          (event.clientX - dragStart.x);

        transform.y =
          transformStart.y +
          (event.clientY - dragStart.y);

        return;
      }

      hoveredNode = getNodeAt(
        event.offsetX,
        event.offsetY
      );

      canvas.style.cursor = hoveredNode
        ? "pointer"
        : "grab";
    });

    canvas.addEventListener("mouseup", () => {
      dragging = false;
      canvas.classList.remove("dragging");
    });

    canvas.addEventListener("mouseleave", () => {
      dragging = false;
      hoveredNode = null;
      canvas.classList.remove("dragging");
    });

    canvas.addEventListener(
      "wheel",
      (event) => {
        event.preventDefault();

        const delta =
          event.deltaY < 0 ? 1.1 : 0.91;

        const rect = canvas.getBoundingClientRect();

        const mouseX = event.clientX - rect.left;
        const mouseY = event.clientY - rect.top;

        transform.x =
          mouseX - (mouseX - transform.x) * delta;

        transform.y =
          mouseY - (mouseY - transform.y) * delta;

        transform.scale = Math.min(
          4,
          Math.max(
            0.25,
            transform.scale * delta
          )
        );
      },
      { passive: false }
    );

    window.addEventListener("resize", resize);
  }

  resize();
  initialisePositions();
  buildLegend();
  bindEvents();
  loop();
}

function drawEdges({
  ctx,
  edges,
  nodeMap,
  categories,
  activeCategories,
  selectedNode,
  connectedSet,
  searchMatches,
  pulseTime,
  scale
}) {
  edges.forEach((edge, index) => {
    const source = nodeMap[edge.from];
    const target = nodeMap[edge.to];

    if (!source || !target) return;

    if (
      !activeCategories.has(source.category) ||
      !activeCategories.has(target.category)
    ) {
      return;
    }

    const isActive =
      selectedNode &&
      connectedSet.has(source.id) &&
      connectedSet.has(target.id);

    const alpha = selectedNode
      ? isActive
        ? 0.75
        : 0.08
      : searchMatches
        ? 0.1
        : 0.35;

    ctx.beginPath();
    ctx.moveTo(source.x, source.y);
    ctx.lineTo(target.x, target.y);
    ctx.strokeStyle = `rgba(130,145,165,${alpha})`;
    ctx.lineWidth = isActive
      ? 1.4 / scale
      : 0.8 / scale;
    ctx.stroke();

    if (isActive) {
      drawArrow({
        ctx,
        source,
        target,
        scale
      });

      drawEdgeLabel({
        ctx,
        edge,
        source,
        target,
        scale
      });

      drawPulse({
        ctx,
        source,
        target,
        edgeIndex: index,
        pulseTime,
        color:
          categories[source.category]?.color ||
          categories.other.color,
        scale
      });
    }
  });
}

function drawNodes({
  ctx,
  nodes,
  categories,
  activeCategories,
  selectedNode,
  connectedSet,
  searchMatches,
  scale,
  pulseTime
}) {
  nodes.forEach((node) => {
    if (!activeCategories.has(node.category)) return;

    const category =
      categories[node.category] || categories.other;

    const radius = nodeRadius(node);

    const isSelected =
      selectedNode &&
      selectedNode.id === node.id;

    const isConnected =
      selectedNode &&
      connectedSet.has(node.id) &&
      !isSelected;

    const isDimmed =
      (selectedNode && !connectedSet.has(node.id)) ||
      (searchMatches && !searchMatches.has(node.id));

    const isSearchHit =
      searchMatches && searchMatches.has(node.id);

    ctx.globalAlpha = isDimmed ? 0.14 : 1;

    if (isSelected) {
      drawGlow({
        ctx,
        node,
        radius,
        color: category.color,
        pulseTime
      });
    }

    if (isSearchHit) {
      ctx.beginPath();
      ctx.arc(
        node.x,
        node.y,
        radius + 7,
        0,
        Math.PI * 2
      );
      ctx.strokeStyle = `${category.color}99`;
      ctx.lineWidth = 1.8 / scale;
      ctx.stroke();
    }

    ctx.beginPath();
    ctx.arc(
      node.x,
      node.y,
      radius,
      0,
      Math.PI * 2
    );

    ctx.fillStyle = isSelected
      ? category.color
      : isConnected
        ? `${category.color}55`
        : `${category.color}24`;

    ctx.fill();

    ctx.strokeStyle = category.color;
    ctx.lineWidth =
      isSelected || isConnected
        ? 1.8 / scale
        : 1.2 / scale;
    ctx.stroke();

    const fontSize = Math.max(
      9,
      11 / scale
    );

    ctx.font = `${isSelected ? 700 : 600} ${fontSize}px ui-monospace, SFMono-Regular, Menlo, monospace`;
    ctx.textAlign = "center";
    ctx.fillStyle = isSelected
      ? category.color
      : isConnected
        ? "#dbe7f4"
        : "#7b8798";

    ctx.fillText(
      node.label,
      node.x,
      node.y + radius + fontSize + 3
    );

    ctx.globalAlpha = 1;
  });
}

function drawArrow({
  ctx,
  source,
  target,
  scale
}) {
  const angle = Math.atan2(
    target.y - source.y,
    target.x - source.x
  );

  const targetRadius =
    nodeRadius(target) + 4;

  const arrowX =
    target.x -
    Math.cos(angle) * targetRadius;

  const arrowY =
    target.y -
    Math.sin(angle) * targetRadius;

  ctx.beginPath();
  ctx.moveTo(arrowX, arrowY);
  ctx.lineTo(
    arrowX - Math.cos(angle - 0.45) * 8,
    arrowY - Math.sin(angle - 0.45) * 8
  );
  ctx.lineTo(
    arrowX - Math.cos(angle + 0.45) * 8,
    arrowY - Math.sin(angle + 0.45) * 8
  );
  ctx.closePath();

  ctx.fillStyle = "rgba(160,175,195,0.7)";
  ctx.fill();
}

function drawEdgeLabel({
  ctx,
  edge,
  source,
  target,
  scale
}) {
  const midX = (source.x + target.x) / 2;
  const midY = (source.y + target.y) / 2;

  ctx.font = `${9 / scale}px ui-monospace, SFMono-Regular, Menlo, monospace`;
  ctx.fillStyle = "rgba(160,175,195,0.85)";
  ctx.textAlign = "center";

  ctx.fillText(
    edge.label,
    midX,
    midY - 6 / scale
  );
}

function drawPulse({
  ctx,
  source,
  target,
  edgeIndex,
  pulseTime,
  color,
  scale
}) {
  const t =
    (Math.sin(pulseTime * 2.5 + edgeIndex) + 1) / 2;

  const x =
    source.x + (target.x - source.x) * t;

  const y =
    source.y + (target.y - source.y) * t;

  ctx.beginPath();
  ctx.arc(
    x,
    y,
    2.6 / scale,
    0,
    Math.PI * 2
  );
  ctx.fillStyle = `${color}cc`;
  ctx.fill();
}

function drawGlow({
  ctx,
  node,
  radius,
  color,
  pulseTime
}) {
  const glowRadius =
    radius + 10 + Math.sin(pulseTime * 2.2) * 3;

  const gradient = ctx.createRadialGradient(
    node.x,
    node.y,
    radius,
    node.x,
    node.y,
    glowRadius + 10
  );

  gradient.addColorStop(0, `${color}55`);
  gradient.addColorStop(1, `${color}00`);

  ctx.beginPath();
  ctx.arc(
    node.x,
    node.y,
    glowRadius + 10,
    0,
    Math.PI * 2
  );
  ctx.fillStyle = gradient;
  ctx.fill();
}

function buildConnectedSet(selectedNode, edges) {
  const connectedSet = new Set();

  if (!selectedNode) {
    return connectedSet;
  }

  connectedSet.add(selectedNode.id);

  edges.forEach((edge) => {
    if (edge.from === selectedNode.id) {
      connectedSet.add(edge.to);
    }

    if (edge.to === selectedNode.id) {
      connectedSet.add(edge.from);
    }
  });

  return connectedSet;
}

function getRelatedNodes(node, edges, nodeMap) {
  const related = [];

  edges.forEach((edge) => {
    if (edge.from === node.id && nodeMap[edge.to]) {
      related.push({
        node: nodeMap[edge.to],
        relationship: edge.label,
        direction: "→"
      });
    }

    if (edge.to === node.id && nodeMap[edge.from]) {
      related.push({
        node: nodeMap[edge.from],
        relationship: edge.label,
        direction: "←"
      });
    }
  });

  return related;
}

function nodeRadius(node) {
  return 8 + Number(node.weight || 3) * 2.3;
}

function toWorld(screenX, screenY, transform) {
  return {
    x: (screenX - transform.x) / transform.scale,
    y: (screenY - transform.y) / transform.scale
  };
}