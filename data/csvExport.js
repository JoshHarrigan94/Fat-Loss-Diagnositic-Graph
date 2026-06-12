/**
 * csvExport.js
 *
 * Exports the current dataset as CSV.
 */

const COLUMNS = [
  "date",
  "bodyweight_kg",
  "calories",
  "protein_g",
  "carbs_g",
  "fat_g",
  "steps",
  "sleep_hours",
  "sleep_quality",
  "training_load"
];

export function rowsToCSV(rows = []) {
  const header = COLUMNS.join(",");

  const body = rows
    .map((row) =>
      COLUMNS.map((column) => cleanCsvValue(row[column])).join(",")
    )
    .join("\n");

  return `${header}\n${body}`;
}

export function downloadRowsAsCSV(rows = [], filename = "fat-loss-data.csv") {
  const csv = rowsToCSV(rows);

  const blob = new Blob([csv], {
    type: "text/csv;charset=utf-8"
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

function cleanCsvValue(value) {
  if (value === null || value === undefined) return "";

  const stringValue = String(value);

  if (
    stringValue.includes(",") ||
    stringValue.includes('"') ||
    stringValue.includes("\n")
  ) {
    return `"${stringValue.replaceAll('"', '""')}"`;
  }

  return stringValue;
}