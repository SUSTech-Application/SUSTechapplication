// https://vitepress.dev/guide/custom-theme
import { watchEffect } from "vue";

import type { Router, Theme } from "vitepress";
import DefaultTheme from "vitepress/theme";

import "./style.css";

export default {
  extends: DefaultTheme,
  enhanceApp({ app, router, siteData }) {},
} satisfies Theme;
