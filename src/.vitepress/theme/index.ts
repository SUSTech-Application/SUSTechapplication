// https://vitepress.dev/guide/custom-theme
import type { Theme } from "vitepress";
import DefaultTheme from "vitepress/theme";

import Aura from "@primeuix/themes/aura";
import PrimeVue from "primevue/config";

import PostList from "@/components/PostList.vue";
import redirect from "@/redirect";

import "./style.css";

export default {
  extends: DefaultTheme,
  enhanceApp({ app, router }) {
    /* client side redirections */
    router.onBeforeRouteChange = (to) => redirect(to, router);

    /* register PrimeVue */
    app.use(PrimeVue, { theme: { preset: Aura } });

    /* register global components */
    app.component("PostList", PostList);
  },
} satisfies Theme;
