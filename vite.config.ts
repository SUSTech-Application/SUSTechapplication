import type { UserConfig } from "vite";

import yaml from "@modyfi/vite-plugin-yaml";

export default { plugins: [yaml()] } as UserConfig;
