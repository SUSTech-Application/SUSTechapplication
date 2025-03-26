import Ajv from "ajv";
import { expect, test } from "vitest";

import schema from "../schema";

test("frontmatter schema should be valid", () => {
  const ajv = new Ajv();
  expect(ajv.compile(schema)).toBeTruthy();
});
