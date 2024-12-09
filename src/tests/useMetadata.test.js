import { describe, it, expect } from "vitest";
import useMetadata from "../utils/useMetadata.js";

describe("useMetadata", () => {
  it("should return a object of objects of string", () => {
    const result = useMetadata();
    console.log(result);

    expect(result).toBeInstanceOf(Object); // top-level is an object
    expect(Object.keys(result).length).toBeGreaterThan(0); // non-empty - multiple fields

    for (const [_, options] of Object.entries(result)) {
      expect(options).toBeInstanceOf(Object); // options is an object
      expect(Object.keys(options).length).toBeGreaterThan(0); // non-empty - multiple options

      for (const [_, value] of Object.entries(options)) {
        expect(typeof value).toBe("string"); // option value must be a string
        expect(value.length).toBeGreaterThan(0); // string must be non-empty
      }
    }
  });
});
