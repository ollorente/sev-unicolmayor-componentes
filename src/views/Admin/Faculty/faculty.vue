<script setup lang="ts">
import AdminLayout from "./../../../layouts/admin.vue"
import UIHead from "./../../../components/Client/Head.vue"
</script>

<template>
  <AdminLayout>
    <UIHead back backUrl="/admin/facultades">
      Facultad
    </UIHead>

    <div class="card border-0 shadow my-3">
      <div class="card-body">
        <h4 class="card-title">Title</h4>
        <p class="card-text">Text</p>
      </div>
    </div>
  </AdminLayout>
</template>

<style scoped></style>