/** Loads metadata fields from metadata.yaml */
import { resolve } from "path";
import { readFileSync } from "fs";
import { parse } from "yaml";

const filePath = resolve(process.cwd(), "metadata.yaml"); // relative to root
const file = readFileSync(filePath, "utf8");
const metadata = parse(file);

export default defineEventHandler(async () => metadata);
