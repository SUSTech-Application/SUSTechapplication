import allPosts from "./posts";

// create different collections

/** Collection of technical blogs */
export const blogs = allPosts.filter((post) => post.path.startsWith("blog/"));

/** Collection of documentations */
export const docs = allPosts.filter((post) => post.path.startsWith("docs/"));

/** Collection of pages */
export const pages = allPosts.filter((post) => post.metadata.type === "page");

/** Collection of regular posts */
export const posts = allPosts.filter(
  (post) => ![...blogs, ...docs, ...pages].includes(post), // anything that's left
);

console.log(posts);
