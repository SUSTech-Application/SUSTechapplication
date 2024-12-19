<script setup>
  import { ref } from "vue";

  const { data: metadata } = await useFetch("/api/metadata");

  // extract the choices
  const options = computed(() =>
    Object.fromEntries(
      Object.entries(metadata.value).map(([field, choices]) => [
        field,
        Object.entries(choices).map(([k, v]) => ({ label: v, value: k })),
      ]),
    ),
  );
  const filter = ref({}); // empty filter by default
</script>

<template>
  <n-tabs type="segment" justify-content="space-around" @update:value="">
    <n-tab-pane v-for="(val, key) in metadata.category" :name="key" :tab="val">
      <n-space vertical>
        <n-flex>
          年级范围
          <n-date-picker type="yearrange" clearable />
        </n-flex>
        <n-select
          multiple
          clearable
          filterable
          placeholder="选择大学"
          :options="options.university"
        />
        <n-select
          multiple
          clearable
          filterable
          placeholder="选择区域"
          :options="options.region"
          :disabled="false"
        />
        <n-flex>
          学位类型
          <n-radio-group name="degree">
            <n-radio-button
              multiple
              v-for="(val, key) in metadata.degree"
              :value="key"
              :label="val"
            />
          </n-radio-group>
        </n-flex>
      </n-space>
    </n-tab-pane>
  </n-tabs>
</template>

<style scoped></style>
