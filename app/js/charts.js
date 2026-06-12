/**
 * charts.js
 *
 * Lightweight SVG chart renderer.
 *
 * No dependencies.
 * Built for GitHub Pages and iPad-first portfolio demo.
 */

export function renderLineChart({
  title,
  subtitle,
  data = [],
  xKey = "date",
  yKey,
  secondaryYKey = null,
  yLabel = "",
  secondaryLabel = "",
  valueSuffix = "",
  height = 260
}) {
  const clean = data.filter((row) => Number.isFinite(Number(row[yKey])));

  if (!clean.length) {
    return renderEmptyChart(title, "No chart data available.");
  }

  const width = 900;
  const padding = {
    top: 28,
    right: 28,
    bottom: 44,
    left: 56
  };

  const yValues = clean
    .flatMap((row) => [
      Number(row[yKey]),
      secondaryYKey && Number.isFinite(Number(row[secondaryYKey]))
        ? Number(row[secondaryYKey])
        : null
    ])
    .filter(Number.isFinite);

  const minY = Math.min(...yValues);
  const maxY = Math.max(...yValues);
  const yRange = maxY - minY || 1;

  const xFor = (index) =>
    padding.left +
    (index / Math.max(clean.length - 1, 1)) *
      (width - padding.left - padding.right);

  const yFor = (value) =>
    height -
    padding.bottom -
    ((value - minY) / yRange) *
      (height - padding.top - padding.bottom);

  const primaryPath = buildPath(clean, yKey, xFor, yFor);
  const secondaryPath = secondaryYKey
    ? buildPath(clean, secondaryYKey, xFor, yFor)
    : "";

  const ticks = buildTicks(minY, maxY, 4);

  return `
    <section class="chart-card">
      <div class="section-title">
        <div>
          <h2>${escapeHtml(title)}</h2>
          <p class="chart-subtitle">${escapeHtml(subtitle || "")}</p>
        </div>
        <span>${escapeHtml(yLabel)}</span>
      </div>

      <div class="chart-scroll">
        <svg class="line-chart" viewBox="0 0 ${width} ${height}" preserveAspectRatio="none">
          ${ticks
            .map(
              (tick) => `
                <line
                  x1="${padding.left}"
                  y1="${yFor(tick)}"
                  x2="${width - padding.right}"
                  y2="${yFor(tick)}"
                  class="chart-grid-line"
                />
                <text
                  x="${padding.left - 12}"
                  y="${yFor(tick) + 4}"
                  text-anchor="end"
                  class="chart-axis-label"
                >
                  ${formatNumber(tick)}${escapeHtml(valueSuffix)}
                </text>
              `
            )
            .join("")}

          <path d="${primaryPath}" class="chart-line primary" />

          ${
            secondaryPath
              ? `<path d="${secondaryPath}" class="chart-line secondary" />`
              : ""
          }

          ${clean
            .filter((_, index) => index % Math.ceil(clean.length / 5) === 0)
            .map(
              (row, index, filtered) => {
                const originalIndex = clean.indexOf(row);
                return `
                  <text
                    x="${xFor(originalIndex)}"
                    y="${height - 12}"
                    text-anchor="middle"
                    class="chart-axis-label"
                  >
                    ${escapeHtml(shortDate(row[xKey]))}
                  </text>
                `;
              }
            )
            .join("")}
        </svg>
      </div>

      ${
        secondaryYKey
          ? `<p class="chart-legend">
              <span class="legend-dot primary"></span>${escapeHtml(yLabel)}
              <span class="legend-dot secondary"></span>${escapeHtml(secondaryLabel)}
            </p>`
          : ""
      }
    </section>
  `;
}

export function renderBarChart({
  title,
  subtitle,
  data = [],
  labelKey = "label",
  valueKey,
  valueSuffix = "",
  height = 260
}) {
  const clean = data.filter((row) => Number.isFinite(Number(row[valueKey])));

  if (!clean.length) {
    return renderEmptyChart(title, "No chart data available.");
  }

  const width = 900;
  const padding = {
    top: 24,
    right: 24,
    bottom: 48,
    left: 50
  };

  const maxValue = Math.max(...clean.map((row) => Number(row[valueKey])), 1);
  const barWidth =
    (width - padding.left - padding.right) / clean.length - 10;

  return `
    <section class="chart-card">
      <div class="section-title">
        <div>
          <h2>${escapeHtml(title)}</h2>
          <p class="chart-subtitle">${escapeHtml(subtitle || "")}</p>
        </div>
      </div>

      <div class="chart-scroll">
        <svg class="bar-chart" viewBox="0 0 ${width} ${height}" preserveAspectRatio="none">
          ${clean
            .map((row, index) => {
              const value = Number(row[valueKey]);
              const x =
                padding.left +
                index *
                  ((width - padding.left - padding.right) / clean.length);
              const barHeight =
                (value / maxValue) *
                (height - padding.top - padding.bottom);
              const y = height - padding.bottom - barHeight;

              return `
                <rect
                  x="${x}"
                  y="${y}"
                  width="${Math.max(barWidth, 8)}"
                  height="${barHeight}"
                  rx="8"
                  class="chart-bar"
                />
                <text
                  x="${x + barWidth / 2}"
                  y="${height - 18}"
                  text-anchor="middle"
                  class="chart-axis-label"
                >
                  ${escapeHtml(row[labelKey])}
                </text>
                <text
                  x="${x + barWidth / 2}"
                  y="${y - 8}"
                  text-anchor="middle"
                  class="chart-value-label"
                >
                  ${formatNumber(value)}${escapeHtml(valueSuffix)}
                </text>
              `;
            })
            .join("")}
        </svg>
      </div>
    </section>
  `;
}

function buildPath(data, key, xFor, yFor) {
  return data
    .map((row, index) => {
      const value = Number(row[key]);
      if (!Number.isFinite(value)) return "";

      const command = index === 0 ? "M" : "L";
      return `${command} ${xFor(index)} ${yFor(value)}`;
    })
    .join(" ");
}

function buildTicks(min, max, count = 4) {
  const range = max - min || 1;

  return Array.from({ length: count + 1 }, (_, index) => {
    return min + (range / count) * index;
  });
}

function renderEmptyChart(title, message) {
  return `
    <section class="chart-card">
      <div class="section-title">
        <h2>${escapeHtml(title)}</h2>
      </div>
      <p class="summary small">${escapeHtml(message)}</p>
    </section>
  `;
}

function shortDate(dateString) {
  const date = new Date(dateString);
  if (Number.isNaN(date.getTime())) return dateString;

  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short"
  });
}

function formatNumber(value) {
  if (!Number.isFinite(Number(value))) return "N/A";

  const number = Number(value);

  if (Math.abs(number) >= 1000) {
    return `${Math.round(number / 1000)}k`;
  }

  return number.toFixed(Math.abs(number) < 10 ? 1 : 0);
}

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}