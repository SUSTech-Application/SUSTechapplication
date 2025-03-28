// https://vitepress.dev/guide/custom-theme
import { h } from "vue";

import type { Theme } from "vitepress";
import DefaultTheme from "vitepress/theme";

import Aura from "@primeuix/themes/aura";
import PrimeVue from "primevue/config";

import "./style.css";

export default {
  extends: DefaultTheme,
  Layout: () => {
    return h(DefaultTheme.Layout, null, {
      // https://vitepress.dev/guide/extending-default-theme#layout-slots
    });
  },
  enhanceApp({ app, router }) {
    /* redirect legacy hash path */
    router.onAfterRouteChange = async (to) => {
      const hashPath = /^\/#\/(.+)\/?$/.exec(to);
      if (hashPath) {
        console.warn("Hash path is deprecated, redirecting...");
        await router.go(hashPath[1]);
      }
    };

    /* register PrimeVue */
    app.use(PrimeVue, { theme: { preset: Aura } });
  },
} satisfies Theme;
