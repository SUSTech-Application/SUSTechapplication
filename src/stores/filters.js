import { atom } from "nanostores";

export const filters = atom([]);

export function updateFilters(newFilters) {
  filters.set(newFilters);
}

export function subscribeToFilters(callback) {
  return filters.subscribe(callback);
}
