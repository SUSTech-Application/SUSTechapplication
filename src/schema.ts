import { options } from "./metadata";

const schema = {
  type: "object",
  properties: {
    author: { type: "string" },
    date: { type: "string", pattern: "^\\d{4}-\\d{2}-\\d{2}$" },
    degree: { type: "string", enum: options.degree },
    department: { type: "string", enum: options.department },
    employer: { type: "string" },
    program: { type: "string" },
    region: {
      // either a region, or a list of regions
      oneOf: [
        { type: "string", enum: options.region },
        {
          type: "array",
          minItems: 2,
          items: { type: "string", enum: options.region },
        },
      ],
    },
    title: { type: "string" },
    type: { type: "string", enum: options.type },
    university: { type: "string", enum: options.university },
    year: { type: "integer", minimum: 11, maximum: 99 },
  },
  required: ["author", "date", "title", "type"],
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

// @ts-expect-error oneOf doesn't exist on schema
schema.oneOf = [
  gradSchema,
  abroadSchema,
  jobSchema,
  recruitSchema,
  experienceSchema,
];

export default schema;
