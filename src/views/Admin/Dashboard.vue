<script setup lang="ts">
import { ref } from "vue"
import AdminLayout from "./../../layouts/admin.vue"
import UIAlert from "./../../components/UI/Alert.vue"
import UISpinner from "./../../components/UI/Spinner.vue"
import UIHead from "./../../components/Admin/Head.vue"

const Error = ref()
const isError = ref(false)
const isShow = ref(true)
</script>

<template>
  <AdminLayout>
    <UIHead>
      Dashboard
    </UIHead>

    <UISpinner v-if="isShow">Loading...</UISpinner>

    <UIAlert v-else-if="isError" alert="danger">{{ Error }}</UIAlert>

    <div v-else></div>
  </AdminLayout>
</template>

<style scoped></style>