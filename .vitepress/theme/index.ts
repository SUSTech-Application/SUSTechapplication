// https://vitepress.dev/guide/custom-theme
import { watchEffect } from "vue";

import type { Router, Theme } from "vitepress";
import DefaultTheme from "vitepress/theme";

import "./style.css";

/** redirect hash based routing URL to history based routing */
const redirect = (router: Router) => {
  if (typeof window !== "undefined") {
    watchEffect(() => {
      if (window.location.hash.startsWith("#/")) {
        const path = window.location.hash.slice(2);
        router.go(`/${path}`);
      }
    });
  }
};

export default {
  extends: DefaultTheme,
  enhanceApp({ app, router, siteData }) {
    redirect(router);
  },
} satisfies Theme;
