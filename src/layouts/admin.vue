<script setup lang="ts">
import ClientFooter from "./../components/Client/Footer.vue"
import ClientHeader from "./../components/Client/Header.vue"
</script>

<template>
  <div class="w-100 h-100">
    <ClientHeader />
    
    <main class="container mx-auto">
      <slot></slot>
    </main>
    
    <ClientFooter />
  </div>
</template>

<style scoped></style>