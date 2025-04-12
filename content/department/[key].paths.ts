import { metadata } from "../../src/metadata";

export default {
  paths() {
    return Object.entries(metadata.department).map(([key, val]) => ({
      params: { key, val },
    }));
  },
};
