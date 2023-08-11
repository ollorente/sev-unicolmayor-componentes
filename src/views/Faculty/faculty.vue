<script setup lang="ts">
import { ref } from "vue"
import CustomLayout from "./../../layouts/custom.vue"
import UIAlert from "./../../components/UI/Alert.vue"
import UISpinner from "./../../components/UI/Spinner.vue"
import UIHead from "./../../components/Client/Head.vue"

const Error = ref()
const isError = ref(false)
const isShow = ref(true)
</script>

<template>
  <CustomLayout>
    <UIHead back backUrl="/facultades">
      facultad
    </UIHead>

    <UISpinner v-if="isShow">Loading...</UISpinner>

    <UIAlert v-else-if="isError" alert="danger">{{ Error }}</UIAlert>

    <div v-else class="card border-0 shadow-sm my-3">
      <div class="card-body">
        <h4 class="card-title">Title</h4>
        <p class="card-text">Text</p>
      </div>
    </div>
  </CustomLayout>
</template>

<style scoped></style>