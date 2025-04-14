// https://vitepress.dev/guide/custom-theme
import type { Theme } from "vitepress";
import DefaultTheme from "vitepress/theme";

import Aura from "@primeuix/themes/aura";
import PrimeVue from "primevue/config";

import PostList from "../../components/PostList.vue";
import "./style.css";

export default {
  extends: DefaultTheme,
  enhanceApp({ app, router }) {
    /* redirect legacy hash path, can only be done on client side */
    router.onAfterRouteChange = async (to) => {
      const hashPath = /^\/#\/(.+)\/?$/.exec(to);
      if (hashPath) {
        console.warn("Hash path is deprecated, redirecting...");
        await router.go(hashPath[1]);
      }
    };

    /* register PrimeVue */
    app.use(PrimeVue, { theme: { preset: Aura } });

    /* register global components */
    app.component("PostList", PostList);
  },
} satisfies Theme;
