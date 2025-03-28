import Ajv from "ajv/dist/2020";
import { expect, test } from "vitest";

import schema from "../src/schema";

const ajv = new Ajv();
const validate = ajv.compile(schema);

test("frontmatter schema should be valid", () => {
  expect(validate).toBeTruthy();
});

test("schema should work as intended (positive)", () => {
  const data = {
    author: "Samuel Huang",
    type: "grad",
    year: 19,
    university: "nd",
    region: "us",
    department: "sme",
    title: "Notre Dame",
    degree: "master",
    date: "2025-03-26",
    program: "Computer Science and Engineering",
  };
  expect(validate(data)).toBe(true);
});
