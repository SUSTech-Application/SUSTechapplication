import METADATA from "../../src/metadata";

export default {
  paths() {
    return Object.entries(METADATA.department).map(([key, val]) => ({
      params: { key, val },
    }));
  },
};
