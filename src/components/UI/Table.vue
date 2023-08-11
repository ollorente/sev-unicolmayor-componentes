<script setup lang="ts">
const props = defineProps({
  title: {
    type: String,
    default: "Nombre"
  }
})
</script>

<template>
  <ul class="list-group list-group-flush">
    <li class="list-group-item d-flex justify-content-between align-items-start fw-bold text-decoration-none text-dark px-0">
      <div class="ms-2 me-auto"><b class="me-2">#</b> {{ props.title }}</div>
      <span>Estado</span>
    </li>
    <slot></slot>
  </ul>
</template>