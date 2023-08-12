<script setup lang="ts">
const props = defineProps({
  check: {
    type: Boolean,
    default: false,
  },
  id: {
    type: String,
    default: "",
  },
  titleCheck: {
    type: String,
    default: "Activado",
  },
  titleUncheck: {
    type: String,
    default: "Desactivado",
  },
})
</script>

<template>
  <div class="mb-3">
    <div class="form-check form-switch">
      <input class="form-check-input" type="checkbox" role="switch" :id="props.id" :checked="props.check" />
      <label class="form-check-label" :for="props.id">
        {{ props.check ? props.titleCheck : props.titleUncheck }}
      </label>
    </div>
  </div>
</template>
