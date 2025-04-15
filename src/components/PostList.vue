<script setup lang="ts">
import METADATA from "../metadata";
import type { Page } from "../pages.data";

defineProps<{ posts: Page[] }>();
</script>

<template>
  <ul>
    <li v-for="post in posts" :key="post.url">
      {{ post.metadata.date }} -
      <!-- FIXME: need to validate metadata type -->
      <!-- @vue-expect-error need to type this -->
      {{ `[${METADATA.type[post.metadata.type]}]` }} -
      <a :href="post.url">{{ post.title ?? "无标题" }}</a>
    </li>
  </ul>
</template>
