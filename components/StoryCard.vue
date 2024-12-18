<script setup lang="ts">
  import ChipGroup from "./ChipGroup.vue";

  defineProps(["story"]);
</script>

<template>
  <NuxtLink :to="story._path">
    <n-card hoverable :title="story.title" size="medium" class="m-4 rounded-lg">
      <template #header-extra> by [AUTHOR]</template>
      <template #footer>
        <ChipGroup :story="story" />
      </template>
    </n-card>
  </NuxtLink>
</template>
