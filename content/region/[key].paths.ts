import { metadata } from "../../src/metadata";

export default {
  paths() {
    return Object.entries(metadata.region).map(([key, val]) => ({
      params: { key, val },
    }));
  },
};
