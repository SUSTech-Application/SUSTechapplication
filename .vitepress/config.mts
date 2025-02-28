import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  srcDir: "./docs",
  ignoreDeadLinks: true, // FIXME:doing this just in dev
  title: "南方科技大学飞跃手册",
  description: "[description goes here...]",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: "主页", link: "/" },
      { text: "最近更新", link: "/updates" },
      { text: "分享经验", link: "/contribute" },
    ],

    // sidebar: [
    //   {
    //     text: "Examples",
    //     items: [
    //       { text: "Markdown Examples", link: "/markdown-examples" },
    //       { text: "Runtime API Examples", link: "/api-examples" },
    //     ],
    //   },
    // ],

    socialLinks: [
      {
        icon: "github",
        link: "https://github.com/SUSTech-Application/SUSTechapplication",
      },
    ],
  },
});
