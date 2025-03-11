// https://vitepress.dev/guide/custom-theme
import { h } from "vue";

import type { Theme } from "vitepress";
import DefaultTheme from "vitepress/theme";

import "./style.css";

export default {
  extends: DefaultTheme,
  Layout: () => {
    return h(DefaultTheme.Layout, null, {
      // https://vitepress.dev/guide/extending-default-theme#layout-slots
    });
  },
  enhanceApp({ router }) {
    router.onAfterRouteChange = (to) => {
      const hashPath = to.match(/^\/#\/(.+)\/?$/);
      if (hashPath) {
        console.warn("Hash path is deprecated, redirecting...");
        router.go(hashPath[1]);
      }
    };
  },
} satisfies Theme;
