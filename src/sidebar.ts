import { type DefaultTheme } from "vitepress";

import METADATA from "./metadata";

const posts: DefaultTheme.SidebarItem[] = [
  {
    // TODO: count posts automatically
    text: "研究生项目总结",
    collapsed: false,
    items: Object.entries(METADATA.department).map(([key, val]) => ({
      text: val,
      link: `department/${key}`,
    })),
  },
  { text: "就业", link: "type/job" },
  { text: "海外交流", link: "type/abroad" },
  { text: "专项经验分享", link: "type/experience" },
];

/** Sidebar object for documentations */
const docs: DefaultTheme.SidebarItem = {
  base: "docs/",
  items: [
    { text: "分享经验", link: "contribute" },
    { text: "路径格式", link: "path" },
    { text: "元数据", link: "metadata" },
  ],
};

export default { posts, docs };
