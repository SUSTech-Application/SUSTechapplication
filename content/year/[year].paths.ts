import { posts } from "../../src/collections";

export const YEARS = [
  ...new Set(
    posts
      .filter((post) => post.metadata.year)
      .map((post) => post.metadata.year),
  ),
].sort();

export default {
  paths() {
    return YEARS.map((year) => ({ params: { year } }));
  },
};
