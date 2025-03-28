import { expect, test } from "vitest";

import { getFrontmatter } from "../src/utils";

test("frontmatter is loaded correctly", () => {
  const frontmatter = getFrontmatter("__test__/test.md");
  expect(frontmatter).toStrictEqual({ key1: "hello world", key2: 42 });
});

test("cms loads posts correctly", async () => {
  const post = await import("../src/posts.data");
  console.log(post);
});
