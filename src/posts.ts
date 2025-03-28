import fg from "fast-glob";

import { getFrontmatter, getH1 } from "./utils";

export class Post {
  /** File path of the MD file, relative to `srcDir`, ie. `content/` */
  path: string;
  url: string;
  title: string;
  metadata: Record<string, unknown>;

  /** path is relative to VitePress srcDir, i.e. `content/` */
  constructor(path: string) {
    this.path = path;
    this.url = path.replace(/index\.md$/, "").replace(/\.md$/, "");
    this.title = getH1(`content/${path}`);
    this.metadata = getFrontmatter(`content/${path}`);
  }
}

const paths = await fg(["**/*.md"], { cwd: "content" });
const posts = paths.map((path) => new Post(path));

// TODO: add type validation for metadata
// TODO: after type validation, unwrap the metadata to simplify accessing

/** All posts */
export default posts;
