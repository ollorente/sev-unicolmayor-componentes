<script setup lang="ts">
const props = defineProps({
  admin: {
    type: Boolean,
    default: false
  },
  superuser: {
    type: Boolean,
    default: false
  ,}
})
</script>

<template>
  <div v-if="props.superuser || admin" class="row">
    <div class="col-12">
      <div class="card border-0 shadow-sm rounded-pill mb-3 p-3 d-flex flex-row justify-content-end">
        <RouterLink v-if="props.admin" to="/admin" role="button" class="btn btn-outline-primary btn-sm rounded-pill mx-1">
          Admin
        </RouterLink>
        <RouterLink v-if="props.superuser" to="/super" role="button" class="btn btn-outline-primary btn-sm rounded-pill mx-1">
          Super
        </RouterLink>
      </div>
    </div>
  </div>
</template>