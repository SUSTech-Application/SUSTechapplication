<script setup lang="ts">
  import StoryList from "@/components/StoryList.vue";
  import Filter from "@/components/Filter.vue";

  const { data: stories } = await useFetch("/api/stories");
</script>

<template>
  <div class="max-w-4xl mx-auto px-4">
    <h1 class="text-center text-4xl mt-8 mb-4">南方科技大学飞跃手册</h1>
    <Filter />
    <StoryList :stories="stories" />
  </div>
</template>
