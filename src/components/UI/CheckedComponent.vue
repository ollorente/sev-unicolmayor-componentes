<script setup lang="ts">
const props = defineProps({
  date: {
    type: String,
    default: "",
  },
  id: {
    type: String,
    default: "",
  },
  title: {
    type: String,
    required: true,
  },
})
</script>

<template>
  <div class="mb-2">
    <label :for="props.id" class="form-label d-flex justify-content-between align-items-center fw-bold text-secondary">
      <span class="text-dark"><slot></slot></span>
      <span style="font-size: 0.8rem;">{{ props.date }}</span>
    </label>
    <input type="text" class="form-control" :id="props.id" :placeholder="props.title">
  </div>
</template>
