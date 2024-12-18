<script setup lang="ts">
  import StoryCard from "./StoryCard.vue";

  defineProps(["stories"]);
</script>

<template>
  <ul class="">
    <li v-for="story in stories">
      <StoryCard :story="story" />
    </li>
  </ul>
</template>
