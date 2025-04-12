import posts from "../../src/posts";

const years = new Set(
  posts
    .filter((post) => post.metadata.year !== undefined)
    .map((post) => post.metadata.year),
);

export default {
  paths() {
    return [...years].map((year) => ({ params: { year } }));
  },
};
