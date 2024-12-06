<script setup lang="ts">
  import { defineProps, computed } from "vue";
  import MetadataChips from "./MetadataChips.vue";

  const { post } = defineProps({
    post: { type: Object, required: true },
  });

  const id = computed(() => post.id);
  const data = computed(() => post.data);
</script>

<template>
  <a
    :href="`/post/${id}/`"
    class="block p-6 m-6 rounded-lg shadow-md hover:shadow-lg transition-shadow"
  >
    <h2 class="text-xl font-semibold">{{ data.title }}</h2>
    <!-- Author and Date -->
    <section>
      <div>[Author]</div>
      <div>
        <!--        <FormattedDate :date="data.pubDate"/>-->
      </div>
    </section>
    <!-- Other metadata -->
    <MetadataChips :data="data" />
  </a>
</template>
