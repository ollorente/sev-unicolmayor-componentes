<script setup lang="ts">
import { useRouter } from "vue-router"
import { signOut } from "firebase/auth"
import { auth } from "../utils/firebase"
import AdminFooter from "./../components/Admin/Footer.vue"
import AdminHeader from "./../components/Admin/Header.vue"

const router = useRouter()

const links = [
  {
    icon: "֎",
    title: "Dashboard",
    url: "/admin"
  },
  {
    icon: "֎",
    title: "Componentes",
    url: "/admin/componentes"
  },
  {
    icon: "֎",
    title: "Facultades",
    url: "/admin/facultades"
  },
  {
    icon: "֎",
    title: "Programas",
    url: "/admin/programas"
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
    <div class="container-fluid">
      <div class="row">

        <div class="col-12">
          <div class="d-none d-lg-block card border-0 shadow-sm mb-4 p-3 pb-3 fw-bold fs-1 text-white sky">
            ADMIN - Programas virtuales
          </div>
        </div>

        <nav class="navbar navbar-expand-lg col-lg-2 align-items-start">
          <div class="w-100 flex-lg-column mb-3">
            <button type="button" class="navbar-toggler" data-bs-toggle="offcanvas" data-bs-target="#asideMenu">
              <span class="navbar-toggler-icon"></span>
            </button>
            <h5 class="offcanvas-title fs-2 text-primary text-uppercase d-md-none">Programas virtuales</h5>

            <section id="asideMenu" class="offcanvas offcanvas-start" tabindex="-1">
              <div class="offcanvas-header" data-bs-theme="black">
                <h5 class="offcanvas-title">Programas virtuales</h5>
                <button type="button" class="btn-close" aria-label="Close" data-bs-dismiss="offcanvas"></button>
              </div>
              <div class="offcanvas-body d-flex flex-column justify-content-between px-0">
                <ul class="nav flex-column">
                  <li v-for="(link, index) in links" :key="index" class="nav-item my-1 px-3 py-0">
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

        <div class="col-12 col-lg-10">

          <slot></slot>

          <AdminFooter></AdminFooter>
        </div>
      </div>
    </div>
  </div>
  <div class="w-100 h-100 d-none">
    <AdminHeader />

    <main class="container mx-auto">
      <slot></slot>
    </main>

    <AdminFooter />
  </div>
</template>

<style scoped>
.sky {
  background-image: url("../assets/img/196655.webp");
  background-position: center center;
}

.nav-link:hover, button:hover {
  opacity: 0.6;
  background-color: #ffc107;
}

nav,
.offcanvas {
  background-color: #f8f9fa;
}

.navbar-toggler {
  border: none;
}

.navbar-toggler:focus {
  outline: none;
  box-shadow: none;
}

main {
  min-height: calc(100vh - 6rem);
}

@media(max-width: 768px) {
  .navbar-nav>li:hover {
    background-color: #dbdbdb;
  }

  main {
    min-height: calc(100vh - 17rem);
  }
}
</style>