import METADATA from "../../src/metadata";

export default {
  paths() {
    return Object.entries(METADATA.type).map(([key, val]) => ({
      params: { key, val },
    }));
  },
};
