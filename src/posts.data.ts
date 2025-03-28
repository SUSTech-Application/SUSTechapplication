import fg from "fast-glob";

import { getFrontmatter } from "./utils";

class Post {
  path: string;
  metadata: any;
  url: string;

  constructor(path: string) {
    this.path = path;
    this.url = path.replace(/\.md$/, "");
    this.metadata = getFrontmatter(`docs/${path}`);
  }
}

const paths = await fg(["**/*.md"], { cwd: "docs" });
const post = new Post(paths[0]);
console.log(new Post(paths[0]));

export default post;
