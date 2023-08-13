<script setup lang="ts">
import { onMounted, reactive, ref } from "vue"
import { useRouter } from "vue-router"
import { onAuthStateChanged } from "firebase/auth"
import { auth } from "./../../../utils/firebase"
import AdminLayout from "./../../../layouts/admin.vue"
import UIAlert from "./../../../components/UI/Alert.vue"
import UIMandatory from "./../../../components/UI/Mandatory.vue"
import UISpinner from "./../../../components/UI/Spinner.vue"
import UIHead from "./../../../components/Admin/Head.vue"
import { Program, IProgram, IFaculty } from "./../../../utils/types"
import { fsCreate, fsList } from "./../../../utils/firestore"

onAuthStateChanged(auth, (user) => {
  const uid: any = user?.uid;
  currentUser.value = String(uid)
})
const router = useRouter()

const Error = ref()
const isError = ref(false)
const isShow = ref(false)
const currentUser = ref()
const faculties = ref<IFaculty[]>([])
const item = reactive<IProgram>({
  facultyId: "",
  isActive: true,
  modifiedBy: "",
  name: "",
})

const getItems = async () => {
  try {
    const result = await fsList("faculties")

    result.sort((a: any, b: any) => {
      if (a.name > b.name) {
        return 1
      }
      if (a.name < b.name) {
        return -1
      }
      return 0
    })

    faculties.value = result
  } catch (error) {
    Error.value = error
    isError.value = true
  } finally {
    isShow.value = false
  }
}

const addItem = async () => {
  if (!item.name) return

  isShow.value = true

  try {
    const data: any = {
      ...Program(item),
      modifiedBy: currentUser
    }

    const result = await fsCreate("programs", data)
    if (item.facultyId) {
      await fsCreate(`faculties/${item.facultyId}/programs`, data)
    }

    if (result) {
      await router.push({ name: "AdminPrograms" })
    }
  } catch (error) {
    Error.value = error
    isError.value = true
  } finally {
    isShow.value = false
  }
}

onMounted(() => getItems())
</script>

<template>
  <AdminLayout>
    <UIHead back backUrl="/admin/programas">
      Agregar programa
    </UIHead>

    <div class="col-12">
      <UISpinner v-if="isShow">Loading...</UISpinner>

      <UIAlert v-else-if="isError" alert="danger">{{ Error }}</UIAlert>

      <div v-else class="card border-0 shadow-sm my-3">
        <UIMandatory />

        <div class="card-body">
          <form @submit.prevent="addItem">
            <div class="mb-3">
              <label for="name" class="form-label fw-bold">Título *</label>
              <input type="text" class="form-control" id="name" placeholder="Título *" v-model="item.name" required
                autofocus />
            </div>

            <div class="mb-3">
              <label class="form-label fw-bold" for="facultyId">Facultad</label>
              <select class="form-select" id="facultyId" v-model="item.facultyId" aria-label="Seleccionar">
                <option value="" selected>--- Seleccionar ---</option>
                <option v-for="faculty in faculties" :key="faculty.id" :value="faculty.id">{{ faculty.name }}</option>
              </select>
            </div>

            <div class="mb-3">
              <div class="form-check form-switch">
                <input class="form-check-input" type="checkbox" role="switch" id="isActive" :checked="item.isActive"
                  v-model="item.isActive" />
                <label class="form-check-label" for="isActive">Activo</label>
              </div>
            </div>

            <button type="submit" class="btn btn-primary btn-sm rounded-pill">
              Agregar
            </button>
          </form>
        </div>
      </div>
    </div>
  </AdminLayout>
</template>

<style scoped></style>