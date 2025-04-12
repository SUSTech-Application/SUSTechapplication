# 按地区索引

<script setup>
import { REGIONS } from "./[key].paths"
</script>

<!-- TODO: add post count -->

<ul>
  <li v-for="(val, key) in REGIONS" :key="key">
    <a :href="`/region/${key}`">{{ `${key.toUpperCase()} - ${val}` }}</a>
  </li>
</ul>
