import METADATA from "../../src/metadata";

export default {
  paths() {
    return Object.entries(METADATA.region).map(([key, val]) => ({
      params: { key, val },
    }));
  },
};
