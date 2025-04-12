# 按年级索引

<script setup>
// import { YEARS } from "./[year].paths"
// FIXME: need a better way to pass this info to client side
</script>

<ul>
  <li v-for="year in YEARS" :key="year">
    <a :href="`/year/${year}`">{{ `20${year} 级` }}</a>
  </li>
</ul>
