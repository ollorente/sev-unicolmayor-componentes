<script setup lang="ts">
import { useRouter } from "vue-router"
import { signOut } from "firebase/auth"
import { auth } from "./../../utils/firebase"

const router = useRouter()

const logout = async () => {
  await signOut(auth)
    .then(() => {
      router.push({ name: "Login" })
    })
    .catch((error) => {
      console.log(error)
    })
}
</script>

<template>
  <div class="offcanvas offcanvas-start" tabindex="-1" id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">
    <div class="offcanvas-header">
      <h5 class="offcanvas-title" id="offcanvasExampleLabel">Offcanvas</h5>
      <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
    </div>
    <div class="offcanvas-body">
      <div>
        Some text as placeholder. In real life you can have the elements you have chosen. Like, text, images, lists, etc.
      </div>
      <div class="dropdown mt-3">
        <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown">
          Dropdown button
        </button>
        <ul class="dropdown-menu">
          <li><a class="dropdown-item" href="#">Action</a></li>
          <li><a class="dropdown-item" href="#">Another action</a></li>
          <li><a class="dropdown-item" href="#">Something else here</a></li>
        </ul>
      </div>
    </div>
  </div>

  <header class="w-100 p-3">
    <div class="container mx-auto">
      <div class="flex justify-between align-items-center">
        <div class="flex flex-row align-items-center">
          <a class="btn btn-primary" data-bs-toggle="offcanvas" href="#offcanvasExample" role="button"
            aria-controls="offcanvasExample">
            Link with href
          </a>
          <router-link :to="{ name: 'Home' }" class="text-3xl font-semibold">Unicolmayor</router-link>
          <ul class="flex flex-row">
            <li class="p-3"><router-link :to="{ name: 'Dashboard' }">Dashboard</router-link></li>
            <li class="p-3"><router-link :to="{ name: 'Dashboard' }">Dashboard</router-link></li>
            <li class="p-3"><router-link :to="{ name: 'Dashboard' }">Dashboard</router-link></li>
          </ul>
        </div>
        <div class="">
          <button class="bg-blue-600 text-white rounded-full m-auto py-1 px-4" @click="logout">Salir</button>
        </div>
      </div>
    </div>
  </header>
</template>

<style scoped></style>