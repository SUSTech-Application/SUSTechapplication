import fg from "fast-glob";

import { getFrontmatter } from "./utils";

export class Post {
  path: string;
  url: string;
  metadata: Record<string, unknown>;

  /** path is relative to VitePress srcDir, i.e. `content/` */
  constructor(path: string) {
    this.path = path;
    this.url = path.replace(/index\.md$/, "").replace(/\.md$/, "");
    this.metadata = getFrontmatter(`content/${path}`);
  }
}

const paths = await fg(["**/*.md"], { cwd: "content" });
const posts = paths.map((path) => new Post(path));

// TODO: add type validation for metadata
// TODO: after type validation, unwrap the metadata to simplify accessing

export default posts;
