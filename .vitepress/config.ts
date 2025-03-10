import { defineConfig } from "vitepress";

import sidebar from "./sidebar";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  srcDir: "./docs",
  cleanUrls: true,
  title: "南方科技大学飞跃手册",
  description: "[description goes here...]",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: "主页", link: "/" },
      { text: "最近更新", link: "/updates" },
      { text: "分享经验", link: "/contribute" },
    ],
    sidebar,
    socialLinks: [
      {
        icon: "github",
        link: "https://github.com/SUSTech-Application/SUSTechapplication",
      },
    ],
  },
});
