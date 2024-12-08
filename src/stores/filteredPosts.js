import { atom } from "nanostores";

export const filteredPosts = atom([]);

/**
 * Update the filteredPosts store with new data.
 * @param {Array} posts - The new array of filtered posts.
 */
export function updateFilteredPosts(posts) {
  filteredPosts.set(posts);
}

/**
 * Subscribe to changes in the filteredPosts store.
 * @param {Function} callback - A function to execute when the store updates.
 * @returns {Function} - A function to unsubscribe from the store.
 */
export function subscribeToFilteredPosts(callback) {
  return filteredPosts.subscribe(callback);
}
