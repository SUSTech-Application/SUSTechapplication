<script setup>
import { useData } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import SelectionShareMenu from './SelectionShareMenu.vue'

const { Layout } = DefaultTheme
</script>

<template>
  <Layout>
    <template #layout-bottom>
      <SelectionShareMenu />
    </template>
  </Layout>
</template>
