import fs from "fs";
import matter from "gray-matter";

/** Get frontmatter from a Markdown file */
export function getFrontmatter(path: string) {
  const content = fs.readFileSync(path, "utf8");
  return matter(content).data;
}

/** Get the first heading */
export function getH1(path: string) {
  const content = fs.readFileSync(path, "utf-8");
  const match = /^# (.+)$/m.exec(content);
  return match?.at(1)?.trim() ?? "";
}
