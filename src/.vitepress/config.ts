import type { DefaultTheme, UserConfig } from "vitepress";

import vite from "../../vite.config";
import sidebar from "../sidebar";

/** @see https://vitepress.dev/reference/site-config */
export default {
  srcDir: "../content",
  outDir: "../dist",
  cacheDir: "../cache",
  cleanUrls: true,
  // FIXME: this is a temp workaround.
  // currently ignoring all dead links that is not an asset with extension
  ignoreDeadLinks: [/^.*\.[^.]+$/],
  title: "南方科技大学飞跃手册",
  description: "[description goes here...]",

  /** @see https://vitepress.dev/reference/default-theme-config */
  themeConfig: {
    outline: { level: "deep", label: "目录" },
    nav: [
      { text: "主页", link: "/" },
      { text: "最近更新", link: "updates", activeMatch: "updates" },
      {
        text: "分享经验",
        link: "docs/contribute",
        activeMatch: "docs/contribute",
      },
      { text: "参考文档", link: "docs/contribute", activeMatch: "docs" },
      { text: "技术博客", link: "blog", activeMatch: "blog" },
    ],
    sidebar: {
      "/docs": sidebar.docs,
      "/": sidebar.posts, // least precedence
    },
    socialLinks: [
      {
        icon: "github",
        link: "https://github.com/SUSTech-Application/SUSTechapplication",
      },
    ],
  } as DefaultTheme.Config,
  head: [
    [
      "script",
      {
        async: "",
        src: "https://googletagmanager.com/gtag/js?id=G-VVQKMMQ3VE",
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

  vite,
} as UserConfig;
