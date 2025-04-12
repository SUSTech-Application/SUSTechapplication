import METADATA from "@/metadata";

export const DEPARTMENTS = METADATA.department;

export default {
  paths() {
    return Object.entries(DEPARTMENTS).map(([key, val]) => ({
      params: { key, val },
    }));
  },
};
