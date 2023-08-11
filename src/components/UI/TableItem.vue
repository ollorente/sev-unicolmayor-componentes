<script setup lang="ts">
import UIIconCircle from "./Icon/Circle.vue"
import UIIconCircleSolid from "./Icon/CircleSolid.vue"

const props = defineProps({
  isActive: {
    type: Boolean,
    default: false
  },
  index: {
    type: Number,
    default: 1
  },
  name: {
    type: String,
    default: "Nombre"
  },
  url: {
    type: String,
    required: true
  }
})
</script>

<template>
  <li class="list-group-item px-0">
    <RouterLink :to="props.url" class="d-flex justify-content-between align-items-start text-decoration-none text-dark">
      <div class="ms-2 me-auto"><b>{{ props.index }}</b>. {{ props.name }}</div>
      <UIIconCircleSolid v-if="props.isActive" class="fs-6" />
      <UIIconCircle v-else class="fs-6" />
    </RouterLink>
  </li>
</template>