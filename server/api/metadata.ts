/** Loads metadata fields from metadata.yaml */
import { resolve } from "path";
import { readFileSync } from "fs";
import { parse } from "yaml";

export default defineEventHandler(async (event) => {
  const filePath = resolve(process.cwd(), "config/metadata.yaml"); // relative to root
  const file = readFileSync(filePath, "utf8");
  return parse(file);
});
