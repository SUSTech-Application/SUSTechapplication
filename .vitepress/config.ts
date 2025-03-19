import { defineConfig } from "vitepress";

import taskLists from "markdown-it-task-lists";

import sidebar from "./sidebar";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  srcDir: "./docs",
  cleanUrls: true,
  title: "南方科技大学飞跃手册",
  description: "[description goes here...]",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    outline: { level: "deep", label: "目录" },
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
  head: [
    [
      "script",
      {
        async: "",
        src: "https://www.googletagmanager.com/gtag/js?id=G-VVQKMMQ3VE",
      },
    ],
    [
      "script",
      {},
      `window.dataLayer = window.dataLayer || [];
      function gtag() { dataLayer.push(arguments); };
      gtag("js", new Date());
      gtag("config", "G-VVQKMMQ3VE");`,
    ],
  ],
  markdown: {
    config: (md) => {
      md.use(taskLists);
    },
  },
});
