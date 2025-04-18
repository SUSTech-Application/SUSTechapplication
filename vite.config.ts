/**
 * Putting Vite config under root dir to make sure Vitest has access to it.
 * VitePress will import config from this module.
 */
import { resolve } from "node:path";

import { type UserConfig } from "vitepress";

import yaml from "@modyfi/vite-plugin-yaml";

export default {
  resolve: { alias: { "@": resolve(__dirname, "src") } },
  plugins: [yaml()],
} as UserConfig["vite"]; // specifically typed for VitePress config
