<script setup lang="ts">
  import { type Component, defineProps } from "vue";
  // ElButton has a better support for icons compared to ElTag
  import { ElButton, ElIcon } from "element-plus";

  defineProps<{
    text: string;
    type?: "primary" | "success" | "info" | "warning" | "danger";
    icon?: typeof ElIcon | null;
  }>();
</script>

<template>
  <el-button
    :type="type || 'primary'"
    :icon="icon as Component"
    :plain="true"
    class=""
  >
    <component :is="icon" />
    <span>{{ text }}</span>
  </el-button>
</template>

<style scoped></style>
