import fs from "fs";
import matter from "gray-matter";

/** Get frontmatter from a Markdown file */
export function getFrontmatter(path: string) {
  const content = fs.readFileSync(path, "utf8");
  return matter(content).data;
}
