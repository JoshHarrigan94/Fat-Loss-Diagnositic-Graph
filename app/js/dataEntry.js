/**
 * dataEntry.js
 *
 * Helpers for manual daily data entry.
 *
 * Purpose:
 * - Read form values
 * - Validate required fields
 * - Upsert a row by date
 * - Delete a row by date
 * - Sort rows by date
 */

export const DATA_COLUMNS = [
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

export function getTodayDateString() {
  return new Date().toISOString().slice(0, 10);
}

export function createEmptyEntry(date = getTodayDateString()) {
  return {
    date,
    bodyweight_kg: "",
    calories: "",
    protein_g: "",
    carbs_g: "",
    fat_g: "",
    steps: "",
    sleep_hours: "",
    sleep_quality: "",
    training_load: ""
  };
}

export function readEntryForm() {
  const entry = {};

  DATA_COLUMNS.forEach((column) => {
    const input = document.querySelector(`[name="${column}"]`);
    entry[column] = input ? input.value : "";
  });

  return normaliseEntry(entry);
}

export function normaliseEntry(entry) {
  return {
    date: entry.date || getTodayDateString(),
    bodyweight_kg: toNumber(entry.bodyweight_kg),
    calories: toNumber(entry.calories),
    protein_g: toNumber(entry.protein_g),
    carbs_g: toNumber(entry.carbs_g),
    fat_g: toNumber(entry.fat_g),
    steps: toNumber(entry.steps),
    sleep_hours: toNumber(entry.sleep_hours),
    sleep_quality: toNumber(entry.sleep_quality),
    training_load: toNumber(entry.training_load)
  };
}

export function validateEntry(entry) {
  const errors = [];

  if (!entry.date) errors.push("Date is required.");

  if (!Number.isFinite(entry.bodyweight_kg)) {
    errors.push("Bodyweight is required.");
  }

  if (!Number.isFinite(entry.calories)) {
    errors.push("Calories are required.");
  }

  if (!Number.isFinite(entry.steps)) {
    errors.push("Steps are required.");
  }

  if (!Number.isFinite(entry.sleep_hours)) {
    errors.push("Sleep hours are required.");
  }

  return {
    valid: errors.length === 0,
    errors
  };
}

export function upsertRowByDate(rows = [], entry) {
  const normalised = normaliseEntry(entry);
  const validation = validateEntry(normalised);

  if (!validation.valid) {
    return {
      rows,
      validation,
      updated: false
    };
  }

  const existingIndex = rows.findIndex(
    (row) => row.date === normalised.date
  );

  let nextRows;

  if (existingIndex >= 0) {
    nextRows = rows.map((row, index) =>
      index === existingIndex ? normalised : row
    );
  } else {
    nextRows = [...rows, normalised];
  }

  return {
    rows: sortRowsByDate(nextRows),
    validation,
    updated: true
  };
}

export function deleteRowByDate(rows = [], date) {
  return sortRowsByDate(rows.filter((row) => row.date !== date));
}

export function findRowByDate(rows = [], date) {
  return rows.find((row) => row.date === date) || null;
}

export function sortRowsByDate(rows = []) {
  return [...rows].sort(
    (a, b) => new Date(a.date) - new Date(b.date)
  );
}

function toNumber(value) {
  if (value === "" || value === null || value === undefined) {
    return NaN;
  }

  const number = Number(value);
  return Number.isFinite(number) ? number : NaN;
}