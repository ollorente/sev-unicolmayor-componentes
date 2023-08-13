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
      <div class="ms-2 me-auto d-flex"><div class="fw-bold">{{ props.index }}. </div><div class="ms-2">{{ props.name }}</div></div>
      <div class="text-end" style="width: 2rem;">
        <UIIconCircleSolid v-if="props.isActive" class="text-primary mx-2" />
        <UIIconCircle v-else class="text-primary mx-2" />
      </div>
    </RouterLink>
  </li>
</template>