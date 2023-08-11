<script setup lang="ts">
import CustomLayout from "./../../layouts/custom.vue"
import UIHead from "./../../components/Client/Head.vue"
</script>

<template>
  <CustomLayout>
    <UIHead back backUrl="/programas">
      Programa
    </UIHead>

    <div class="card border-0 shadow-sm my-3">
      <div class="card-body">
        <h4 class="card-title">Title</h4>
        <p class="card-text">Text</p>
      </div>
    </div>
  </CustomLayout>
</template>

<style scoped></style>