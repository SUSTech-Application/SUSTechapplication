import { expect, test } from "vitest";

import posts from "../src/posts";
import { getFrontmatter } from "../src/utils";

test("frontmatter is loaded correctly", () => {
  const frontmatter = getFrontmatter("__test__/test.md");
  expect(frontmatter).toStrictEqual({ key1: "hello world", key2: 42 });
});

test("cms loads posts correctly", () => {
  expect(posts.length).toBeGreaterThan(0);
  expect(posts[0]).toHaveProperty("metadata");
});
