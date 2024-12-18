<script setup lang="ts">
  import {
    Book,
    Business,
    Calendar,
    GridOutline,
    Location,
    Ribbon,
    School,
  } from "@vicons/ionicons5";

  const props = defineProps(["story"]); // named story due to queryContent API of Nuxt

  const FIELDS = [
    { key: "category", icon: GridOutline, type: "primary" },
    { key: "region", icon: Location, type: "info" },
    { key: "degree", icon: School, type: "success" },
    { key: "program", icon: Ribbon, type: "warning" },
    { key: "year", icon: Calendar, type: "warning" },
    { key: "department", icon: Book, type: "warning" },
    { key: "university", icon: Business, type: "warning" },
  ];

  const availableFields = computed(() =>
    FIELDS.filter((field) => props.story[field.key]),
  );
</script>

<template>
  <n-tag
    round
    :bordered="false"
    v-for="field in availableFields"
    :type="field.type"
  >
    <template #icon>
      <n-icon>
        <component :is="field.icon" />
      </n-icon>
    </template>
    {{ story[field.key] }}
  </n-tag>
</template>

<style scoped></style>
