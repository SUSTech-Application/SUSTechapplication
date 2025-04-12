import { metadata } from "../../src/metadata";

export default {
  paths() {
    return Object.entries(metadata.type).map(([key, val]) => ({
      params: { key, val },
    }));
  },
};
