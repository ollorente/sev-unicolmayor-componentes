<script setup lang="ts">
const props = defineProps({
  back: {
    type: Boolean,
    default: false
  },
  backUrl: {
    type: String,
    default: ""
  },
  edit: {
    type: Boolean,
    default: false
  },
  editUrl: {
    type: String,
    default: ""
  },
  new: {
    type: Boolean,
    default: false
  },
  newUrl: {
    type: String,
    default: ""
  },
  remove: {
    type: Boolean,
    default: false
  },
  removeUrl: {
    type: String,
    default: ""
  },
})
</script>

<template>
  <div class="d-flex justify-content-between align-items-center">
    <div class=""><h1 class="h2"><slot></slot></h1></div>
    <div class="">
      <router-link v-if="props.remove" :to="props.removeUrl" role="button" class="btn btn-outline-danger btn-sm rounded-pill mx-1 py-1 px-3">Eliminar</router-link>
      <router-link v-if="props.edit" :to="props.editUrl" role="button" class="btn btn-warning btn-sm rounded-pill mx-1 py-1 px-3">Editar</router-link>
      <router-link v-if="props.new" :to="props.newUrl" role="button" class="btn btn-primary btn-sm rounded-pill mx-1 py-1 px-3">Agregar</router-link>
      <router-link v-if="props.back" :to="props.backUrl" role="button" class="btn btn-outline-secondary btn-sm rounded-pill mx-1 py-1 px-3">Volver</router-link>
    </div>
  </div>
</template>