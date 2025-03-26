import { readFileSync } from "fs";
import { parse } from "yaml";

const metadata = parse(readFileSync("./metadata.yaml", "utf-8"));
const regions = Object.keys(metadata.region);
const universities = Object.keys(metadata.university);
const departments = Object.keys(metadata.department);
const degrees = Object.keys(metadata.degree);
const type = Object.keys(metadata.type);

let schema = {
  type: "object",
  properties: {
    department: { type: "string", enum: departments },
    degree: { type: "string", enum: degrees },
    employer: { type: "string" },
    program: { type: "string" },
    region: {
      // either a region, or a list of regions
      oneOf: [
        { type: "string", enum: regions },
        { type: "array", items: { type: "string", enum: regions } },
      ],
    },
    title: { type: "string" },
    type: { type: "string", enum: type },
    university: { type: "string", enum: universities },
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
