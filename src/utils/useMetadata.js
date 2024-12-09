/** Loads metadata fields from metadata.yaml */
import { load } from "js-yaml";
import { readFileSync } from "fs";

export default function useMetadata() {
  const filePath = "./src/metadata.yaml"; // relative to root
  const file = readFileSync(filePath);
  return load(file);
}
