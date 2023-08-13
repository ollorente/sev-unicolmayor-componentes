<script setup lang="ts">
import { ref } from "vue"
import { useRouter } from "vue-router"
import { signOut } from "firebase/auth"
import { auth } from "../utils/firebase"
import ClientFooter from "./../components/Client/Footer.vue"
import ClientHeader from "./../components/Client/Header.vue"
import ClientTopMenu from "./../components/Client/TopMenu.vue"

const router = useRouter()

const admin = ref()
const superuser = ref()
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

const current = localStorage.getItem("currentUser")
if (current) {
  const user = JSON.parse(current)

  admin.value = user.roles.includes('admin')
  superuser.value = user.roles.includes('superuser')
}

const logout = async () => {
  await signOut(auth)
    .then(() => {
      localStorage.removeItem("currentUser")

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

      <ClientTopMenu admin superuser />

      <div class="row">

        <nav class="navbar navbar-expand-lg col-lg-3 align-items-start">
          <div class="w-100 d-flex flex-row flex-lg-column mb-3">
            <button type="button" class="navbar-toggler" data-bs-toggle="offcanvas" data-bs-target="#asideMenu">
              <span class="navbar-toggler-icon"></span>
            </button>
            <h5 class="offcanvas-title fs-2 fw-bold text-uppercase d-md-none">Programas virtuales</h5>

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

          <div class="d-none d-lg-block card border-0 shadow-sm mb-4 pt-5 px-3 pb-3 fw-bold fs-1 text-white sky">
            Programas virtuales
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

<style scoped>
.container {
  scrollbar-gutter: stable;
}

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