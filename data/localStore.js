/**
 * localStore.js
 *
 * Browser persistence layer.
 *
 * Purpose:
 * - Save user-entered dataset to localStorage
 * - Load saved dataset on app start
 * - Clear saved dataset when user resets
 */

const STORAGE_KEY = "fatLossDiagnosticGraph.rows.v1";

export function saveRowsToLocalStore(rows = []) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(rows));
}

export function loadRowsFromLocalStore() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;

    const rows = JSON.parse(raw);

    return Array.isArray(rows) ? rows : null;
  } catch {
    return null;
  }
}

export function clearLocalStore() {
  localStorage.removeItem(STORAGE_KEY);
}

export function hasLocalRows() {
  return Boolean(localStorage.getItem(STORAGE_KEY));
}