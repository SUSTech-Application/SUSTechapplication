/**
 * Putting Vite config under root dir to make sure Vitest has access to it.
 * VitePress will import config from this module.
 */
import { resolve } from "node:path";

import { type UserConfig } from "vitepress";

import yaml from "@modyfi/vite-plugin-yaml";

export default {
  resolve: { alias: { "@": resolve(__dirname, "src") } },
  // FIXME: yaml is not correctly typed, file an issue
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  plugins: [yaml()],
  // specifically typed for VitePress
} as UserConfig["vite"];
