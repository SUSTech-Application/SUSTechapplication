import { type Page, data } from "./pages.data";

const collections = Object.groupBy(data, (page) => {
  if (page.url.startsWith("/blog/")) return "blogs";
  if (page.url.startsWith("/docs/")) return "docs";
  if (page.metadata.type === "page") return "pages";
  return "posts";
  // assert that all types of pages exist
}) as Record<"blogs" | "docs" | "pages" | "posts", Page[]>;

export const { blogs, docs, pages, posts } = collections;
