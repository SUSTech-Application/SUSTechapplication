import allPosts from "./posts";

export const collections = Object.groupBy(allPosts, (post) => {
  if (post.path.startsWith("blog/")) return "blogs";
  if (post.path.startsWith("docs/")) return "docs";
  if (post.metadata.type === "page") return "pages";
  return "posts";
});

export const { blogs, docs, pages, posts } = collections;
