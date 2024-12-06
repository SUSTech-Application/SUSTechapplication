<script setup lang="ts">
  import { defineProps } from "vue";
  import {
    Aim,
    Calendar,
    School,
    Location,
    Notebook,
  } from "@element-plus/icons-vue";
  import Chip from "./Chip.vue";

  defineProps({
    data: { type: Object, required: true },
  });
</script>

<template>
  <!--  TODO: Style the chip group  -->
  <div>
    <Chip :text="data.year + ' 级'" type="primary" :icon="Calendar" />
    <Chip :text="data.region.toUpperCase()" type="primary" :icon="Location" />
    <Chip :text="data.university" type="primary" :icon="School" />
    <Chip :text="data.major" type="primary" :icon="Notebook" />
    <Chip :text="data.program" type="primary" :icon="Aim" />
  </div>
</template>

<style scoped></style>
