/**
 * importer.js
 *
 * Data ingestion layer.
 *
 * Purpose:
 * - Load CSV files
 * - Parse rows
 * - Validate schema
 * - Standardise records
 * - Generate import summary
 *
 * MVP Assumptions:
 * - Single CSV source
 * - One row per day
 * - User-generated data
 */

const REQUIRED_COLUMNS = [
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

export async function importCSV(file) {
  const text = await file.text();

  const rows = parseCSV(text);

  const validation = validateDataset(rows);

  return {
    rows,
    validation,
    summary: buildImportSummary(rows)
  };
}

export function parseCSV(csvText) {
  if (!csvText || !csvText.trim()) {
    return [];
  }

  const lines = csvText
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);

  if (lines.length < 2) {
    return [];
  }

  const headers = splitCSVLine(lines[0]);

  const records = [];

  for (let i = 1; i < lines.length; i++) {
    const values = splitCSVLine(lines[i]);

    const record = {};

    headers.forEach((header, index) => {
      record[header] = values[index] ?? "";
    });

    records.push(record);
  }

  return records;
}

export function splitCSVLine(line) {
  const result = [];

  let current = "";
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const character = line[i];

    if (character === '"') {
      inQuotes = !inQuotes;
      continue;
    }

    if (character === "," && !inQuotes) {
      result.push(current.trim());
      current = "";
      continue;
    }

    current += character;
  }

  result.push(current.trim());

  return result;
}

export function validateDataset(rows = []) {
  const validation = {
    valid: true,
    missingColumns: [],
    warnings: [],
    rowCount: rows.length
  };

  if (!rows.length) {
    validation.valid = false;
    validation.warnings.push("Dataset contains no rows.");

    return validation;
  }

  const columns = Object.keys(rows[0]);

  REQUIRED_COLUMNS.forEach((column) => {
    if (!columns.includes(column)) {
      validation.missingColumns.push(column);
    }
  });

  if (validation.missingColumns.length) {
    validation.valid = false;
  }

  const duplicateDates = detectDuplicateDates(rows);

  if (duplicateDates.length) {
    validation.warnings.push(
      `${duplicateDates.length} duplicate date(s) detected.`
    );
  }

  const invalidWeights = rows.filter(
    (row) =>
      row.bodyweight_kg &&
      (!Number.isFinite(Number(row.bodyweight_kg)) ||
        Number(row.bodyweight_kg) < 30 ||
        Number(row.bodyweight_kg) > 300)
  );

  if (invalidWeights.length) {
    validation.warnings.push(
      `${invalidWeights.length} unusual weight value(s) detected.`
    );
  }

  return validation;
}

export function detectDuplicateDates(rows = []) {
  const seen = new Set();
  const duplicates = [];

  rows.forEach((row) => {
    if (!row.date) return;

    if (seen.has(row.date)) {
      duplicates.push(row.date);
    }

    seen.add(row.date);
  });

  return duplicates;
}

export function buildImportSummary(rows = []) {
  if (!rows.length) {
    return {
      totalRows: 0
    };
  }

  const dates = rows
    .map((row) => row.date)
    .filter(Boolean)
    .sort();

  return {
    totalRows: rows.length,
    firstDate: dates[0],
    lastDate: dates[dates.length - 1],
    columns: Object.keys(rows[0])
  };
}

export function createDemoDataset() {
  return [
    {
      date: "2026-01-01",
      bodyweight_kg: 99.2,
      calories: 2800,
      protein_g: 190,
      carbs_g: 250,
      fat_g: 80,
      steps: 12000,
      sleep_hours: 7.5,
      sleep_quality: 4,
      training_load: 7
    },
    {
      date: "2026-01-02",
      bodyweight_kg: 99.0,
      calories: 2750,
      protein_g: 185,
      carbs_g: 240,
      fat_g: 75,
      steps: 11800,
      sleep_hours: 7.2,
      sleep_quality: 4,
      training_load: 7
    }
  ];
}

export function normaliseImportedRows(rows = []) {
  return rows.map((row) => ({
    date: row.date || "",
    bodyweight_kg: toNumber(row.bodyweight_kg),
    calories: toNumber(row.calories),
    protein_g: toNumber(row.protein_g),
    carbs_g: toNumber(row.carbs_g),
    fat_g: toNumber(row.fat_g),
    steps: toNumber(row.steps),
    sleep_hours: toNumber(row.sleep_hours),
    sleep_quality: toNumber(row.sleep_quality),
    training_load: toNumber(row.training_load)
  }));
}

function toNumber(value) {
  if (value === null || value === undefined || value === "") {
    return NaN;
  }

  const parsed = Number(value);

  return Number.isFinite(parsed) ? parsed : NaN;
}