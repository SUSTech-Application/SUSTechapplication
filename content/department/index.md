# 按院系索引

<script setup>
import { DEPARTMENTS } from "./[key].paths"
</script>

<!-- TODO: add post count -->

<ul>
  <li v-for="(val, key) in DEPARTMENTS" :key="key">
    <a :href="`/department/${key}`">{{ val }}</a>
  </li>
</ul>
