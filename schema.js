import { readFileSync } from "fs";
import { parse } from "yaml";

const metadata = parse(readFileSync("./metadata.yaml", "utf-8"));

let schema = {
  type: "object",
  properties: {
    department: { type: "string" },
    degree: { type: "string" },
    employer: { type: "string" },
    program: { type: "string" },
    region: { type: "object" },
    title: { type: "string" },
    type: {
      type: "string",
      enum: ["grad", "abroad", "job", "recruit", "experience"],
    },
    university: { type: "string" },
    year: { type: "number" },
  },
  required: ["title", "type"],
};

const gradSchema = {
  properties: { type: { const: "grad" } },
  required: ["department", "program", "region", "university", "year"],
  not: { required: ["employer"] },
};

const abroadSchema = {
  properties: { type: { const: "abroad" } },
  required: ["region", "university"],
  not: { required: ["degree", "employer"] },
};

const jobSchema = {
  properties: { type: { const: "job" }, employer: { type: "string" } },
  required: ["department", "employer", "region", "year"],
  not: { required: ["degree", "program", "university"] },
};

const recruitSchema = {
  properties: { type: { const: "recruit" } },
  required: ["program", "region", "university"],
  not: { required: ["employer"] },
};

const experienceSchema = { properties: { type: { const: "experience" } } };

schema.oneOf = [
  gradSchema,
  abroadSchema,
  jobSchema,
  recruitSchema,
  experienceSchema,
];

export default schema;
