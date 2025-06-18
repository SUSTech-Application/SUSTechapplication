// https://vitepress.dev/guide/custom-theme
import type { Theme } from "vitepress";
import DefaultTheme from "vitepress/theme";

import Aura from "@primeuix/themes/aura";
import PrimeVue from "primevue/config";


// Import components
import AppLayout from "@/components/AppLayout.vue";
import SelectionShareMenu from "@/components/SelectionShareMenu.vue";
import PostList from "@/components/PostList.vue";
import redirect from "@/redirect";

import "./style.css";

// Define the theme
export default {
  extends: DefaultTheme,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-assignment
  Layout: AppLayout as any,
  enhanceApp({ app, router }) {
    /* client side redirections */
    router.onBeforeRouteChange = (to) => redirect(to, router);

    /* register PrimeVue */
    app.use(PrimeVue, { theme: { preset: Aura } });

    /* register global components */
    app.component("PostList", PostList);
    app.component("SelectionShareMenu", SelectionShareMenu);
  },
} as Theme;
