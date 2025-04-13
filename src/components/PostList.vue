<script setup lang="ts">
import type { Page } from "../pages.data";

defineProps<{ posts: Page[] }>();
</script>

<template>
  <ul>
    <li v-for="post in posts" :key="post.url">
      {{ post.metadata.date }} -
      <a :href="post.url">{{ post.title ?? "无标题" }}</a>
    </li>
  </ul>
</template>
