import fg from "fast-glob";

import { getFrontmatter } from "./utils";

export class Post {
  path: string;
  url: string;
  metadata: Record<string, unknown>;

  /** path is relative to VitePress srcDir, i.e. `docs/` */
  constructor(path: string) {
    this.path = path;
    this.url = path.replace(/index\.md$/, "").replace(/\.md$/, "");
    this.metadata = getFrontmatter(`docs/${path}`);
  }
}

const paths = await fg(["**/*.md"], { cwd: "docs" });
const posts = paths.map((path) => new Post(path));

export default posts;
