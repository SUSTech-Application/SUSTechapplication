# Hello

<script setup>
import { data } from "../src/pages.data.ts"
data.forEach((page) => console.log(page.url))
</script>

{{ data[100] }}
