import { expect, test } from "vitest";

import posts from "../src/posts";
import { getFrontmatter, getH1 } from "../src/utils";

test("frontmatter is loaded correctly", () => {
  const frontmatter = getFrontmatter("__test__/test.md");
  expect(frontmatter).toStrictEqual({ key1: "hello world", key2: 42 });
});

test("first heading is read correctly", () => {
  const h1 = getH1("__test__/test.md");
  expect(h1).toStrictEqual("Hello World");
});

test("cms loads posts correctly", () => {
  expect(posts.length).toBeGreaterThan(0);
  expect(posts[0]).toHaveProperty("metadata");
});
