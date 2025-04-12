<script setup lang="ts">
import type { Post } from "../posts";

defineProps<{
  posts: Post[];
}>();
</script>

<template>
  <ul>
    <li v-for="post in posts" :key="post.url">
      {{ post.title }}
    </li>
  </ul>
</template>
