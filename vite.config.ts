import type { UserConfig } from "vite";

import Yaml from "@modyfi/vite-plugin-yaml";

export default { plugins: [Yaml()] } as UserConfig;
