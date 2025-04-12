# 按分享类型索引

<script setup>
import { TYPES } from "./[key].paths"
</script>

<ul>
  <li v-for="(val, key) in TYPES" :key="key">
    <a :href="`/type/${key}`">{{ val }}</a>
  </li>
</ul>
