import METADATA from "../../src/metadata";

export const TYPES = METADATA.type;

export default {
  paths() {
    return Object.entries(TYPES).map(([key, val]) => ({
      params: { key, val },
    }));
  },
};
