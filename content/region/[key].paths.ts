import METADATA from "../../src/metadata";

export const REGIONS = METADATA.region;

export default {
  paths() {
    return Object.entries(REGIONS).map(([key, val]) => ({
      params: { key, val },
    }));
  },
};
