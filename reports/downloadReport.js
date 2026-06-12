/**
 * downloadReport.js
 *
 * Purpose:
 * - Download the generated diagnostic report as a Markdown file
 */

export function downloadMarkdownReport(markdown, filename = "fat-loss-diagnostic-report.md") {
  const blob = new Blob([markdown], {
    type: "text/markdown;charset=utf-8"
  });

  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = filename;

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  URL.revokeObjectURL(url);
}