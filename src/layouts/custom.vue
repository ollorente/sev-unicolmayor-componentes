<script setup lang="ts">
import { useRouter } from "vue-router"
import { signOut } from "firebase/auth"
import { auth } from "../utils/firebase"
import ClientFooter from "./../components/Client/Footer.vue"
import ClientHeader from "./../components/Client/Header.vue"

const router = useRouter()

const links = [
  {
    icon: "֎",
    title: "Home",
    url: "/"
  },
  {
    icon: "֎",
    title: "Componentes",
    url: "/componentes"
  },
  {
    icon: "֎",
    title: "Facultades",
    url: "/facultades"
  },
  {
    icon: "֎",
    title: "Programas",
    url: "/programas"
  },
]

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
  <div class="bg-light overflow-auto" style="height: 100dvh">
    <div class="container py-3">
      <div class="row">

        <nav class="navbar navbar-expand-lg col-lg-3 align-items-start">
          <div class="container-fluid flex-lg-column">
            <router-link :to="{ name: 'Home' }" class="navbar-brand fw-semibold">Programas virtuales</router-link>

            <button type="button" class="navbar-toggler" data-bs-toggle="offcanvas" data-bs-target="#asideMenu">
              <span class="navbar-toggler-icon"></span>
            </button>

            <section id="asideMenu" class="offcanvas offcanvas-start" tabindex="-1">
              <div class="offcanvas-header" data-bs-theme="black">
                <h5 class="offcanvas-title">Programas virtuales</h5>
                <button type="button" class="btn-close" aria-label="Close" data-bs-dismiss="offcanvas"></button>
              </div>
              <div class="offcanvas-body d-flex flex-column justify-content-between px-0">
                <ul class="nav flex-column">
                  <li v-for="(link, index) in links" :key="index" class="nav-item p-3 py-1">
                    <router-link :to="link.url" class="nav-link text-dark rounded-pill" :class="$route.path.includes(link.url) ? 'bg-warning' : ''">{{ link.icon ? link.icon : '&#9733' }} {{ link.title }}</router-link>
                  </li>
                </ul>
                <ul class="nav py-4">
                  <li class="w-100 nav-item p-3 py-1 text-center d-grid gap-2">
                    <button class="btn btn-primary btn-sm rounded-pill" @click="logout">Salir</button>
                  </li>
                </ul>
              </div>
            </section>
          </div>
        </nav>

        <div class="col-12 col-lg-9">

          <div class="d-none d-lg-block card border-0 shadow-sm mb-4">
            <img src="../assets/img/196655.webp" alt="Pasillo" class="w-100 h-100 object-fit-cover border rounded" />
          </div>

          <slot></slot>

          <ClientFooter></ClientFooter>
        </div>
      </div>
    </div>
  </div>
  <div class="w-100 h-100 d-none">
    <ClientHeader />

    <main class="container mx-auto">
      <slot></slot>
    </main>

    <ClientFooter />
  </div>
</template>

<style scoped></style>