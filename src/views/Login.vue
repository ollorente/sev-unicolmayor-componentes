<script setup lang="ts">
import { ref } from "vue"
import { useRouter } from "vue-router"
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth"
import UIAlert from "./../components/UI/Alert.vue"
import UISpinner from "./../components/UI/Spinner.vue"
import { User } from "./../utils/types"
import { auth } from './../utils/firebase'
import { fsCreate, fsGet } from './../utils/firestore'

const router = useRouter()

const Error = ref()
const isError = ref(false)
const isShow = ref(false)

const signinGoogle = async () => {
  const provider = new GoogleAuthProvider()

  try {
    const credentials = await signInWithPopup(auth, provider)
    const user: any = credentials.user

    if (user) {
      const result = await fsGet("users", user.uid)

      if (!result) {
        const data: any = User({
          email: user.email,
          id: user.uid,
          image: user.photoURL,
          name: user.displayName,
          phone: user.phoneNumber,
          provider: user.providerId,
          roles: ["guest"],
          isActive: true
        })

        await fsCreate("users", data)
      }

      await router.push({ name: "Home" })
    }
  } catch (error: any) {
    console.log("🚀 ~ file: Login.vue:33 ~ signinGoogle ~ error:", error)
    if (error.code === "auth/account-exists-with-different-credential") {
      alert("El usuario ya existe con otro proveedor")
    } else {
      alert("Algo salió mal")
    }
  }
}
</script>

<template>
  <div class="bg-light overflow-auto" style="height: 100dvh">
    <main class="form-signin w-100 h-100 d-flex flex-column m-auto py-5">

      <UISpinner v-if="isShow">Loading...</UISpinner>

      <UIAlert v-else-if="isError" alert="danger">{{ Error }}</UIAlert>

      <div v-else class="card border-0 shadow-sm py-5 px-4 px-md-5 my-auto">
        <img class="mb-4 mx-auto"
          src="https://res.cloudinary.com/un1c0lm4y0r/image/upload/v1666216346/mascota-subdireccion.png"
          alt="Mascota Eviut" style="width: 8rem" />
        <h1 class="h3 mb-3 fw-normal text-center">Programas Virtuales</h1>

        <button class="btn btn-danger w-100 py-2 rounded-pill border-0" type="button" @click="signinGoogle">
          <span>Entrar con</span> <br />
          <span class="fs-4 fw-semibold">Correo Unicolmayor</span>
        </button>

        <div class="text-center mt-2 mb-3 text-body-secondary">
          <div>Subdirección de Educación Virtual</div>
          <div>&copy; 2022 - {{ new Date().getFullYear() }}</div>
        </div>
      </div>

    </main>
  </div>
</template>

<style scoped>
html,
body {
  height: 100%;
}

.form-signin {
  max-width: 530px;
  padding: 1rem;
}

.form-signin .form-floating:focus-within {
  z-index: 2;
}

.form-signin input[type="email"] {
  margin-bottom: -1px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}

.form-signin input[type="password"] {
  margin-bottom: 10px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}

.bd-placeholder-img {
  font-size: 1.125rem;
  text-anchor: middle;
  -webkit-user-select: none;
  -moz-user-select: none;
  user-select: none;
}

@media (min-width: 768px) {
  .bd-placeholder-img-lg {
    font-size: 3.5rem;
  }
}

.b-example-divider {
  width: 100%;
  height: 3rem;
  background-color: rgba(0, 0, 0, 0.1);
  border: solid rgba(0, 0, 0, 0.15);
  border-width: 1px 0;
  box-shadow: inset 0 0.5em 1.5em rgba(0, 0, 0, 0.1),
    inset 0 0.125em 0.5em rgba(0, 0, 0, 0.15);
}

.b-example-vr {
  flex-shrink: 0;
  width: 1.5rem;
  height: 100vh;
}

.bi {
  vertical-align: -0.125em;
  fill: currentColor;
}

.nav-scroller {
  position: relative;
  z-index: 2;
  height: 2.75rem;
  overflow-y: hidden;
}

.nav-scroller .nav {
  display: flex;
  flex-wrap: nowrap;
  padding-bottom: 1rem;
  margin-top: -1px;
  overflow-x: auto;
  text-align: center;
  white-space: nowrap;
  -webkit-overflow-scrolling: touch;
}

.btn-bd-primary {
  --bd-violet-bg: #712cf9;
  --bd-violet-rgb: 112.520718, 44.062154, 249.437846;

  --bs-btn-font-weight: 600;
  --bs-btn-color: var(--bs-white);
  --bs-btn-bg: var(--bd-violet-bg);
  --bs-btn-border-color: var(--bd-violet-bg);
  --bs-btn-hover-color: var(--bs-white);
  --bs-btn-hover-bg: #6528e0;
  --bs-btn-hover-border-color: #6528e0;
  --bs-btn-focus-shadow-rgb: var(--bd-violet-rgb);
  --bs-btn-active-color: var(--bs-btn-hover-color);
  --bs-btn-active-bg: #5a23c8;
  --bs-btn-active-border-color: #5a23c8;
}

.bd-mode-toggle {
  z-index: 1500;
}
</style>