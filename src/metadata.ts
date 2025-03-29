import { readFileSync } from "node:fs";

import { parse } from "yaml";

// TODO: we should probably move to a better runtime typing tool, maybe Zod?

type Key = "type" | "degree" | "region" | "department" | "university";
type Metadata = Record<Key, Record<string, string>>;
type Options = Record<Key, string[]>;

export const metadata = parse(
  readFileSync("src/metadata.yaml", "utf8"),
) as Metadata;

export const options = Object.fromEntries(
  Object.keys(metadata).map((k) => [k, Object.keys(metadata[k as Key])]),
) as Options;
