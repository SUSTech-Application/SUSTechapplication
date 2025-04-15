import { resolve } from "node:path";

import { type UserConfig } from "vitepress";

import ViteYaml from "@modyfi/vite-plugin-yaml";

export default {
  resolve: { alias: { "@": resolve(__dirname, "src") } },
  // FIXME: ViteYaml is not correctly typed, file an issue
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  plugins: [ViteYaml()],
  // specifically typed for VitePress
} as UserConfig["vite"];
