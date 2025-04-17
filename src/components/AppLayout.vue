<script setup lang="ts">
import DefaultTheme from "vitepress/theme";

import SelectionShareMenu from "./SelectionShareMenu.vue";

const { Layout: DefaultLayout } = DefaultTheme;
</script>

<template>
  <DefaultLayout>
    <template #layout-bottom>
      <SelectionShareMenu />
    </template>
  </DefaultLayout>
</template>
