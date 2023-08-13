<script setup lang="ts">
import { ref, onMounted, reactive } from "vue"
import { useRouter } from "vue-router"
// @ts-ignore
import { VueEditor } from "vue3-editor"
import { onAuthStateChanged } from "firebase/auth"
import { auth } from "./../../../utils/firebase"
import AdminLayout from "./../../../layouts/admin.vue"
import UIAlert from "./../../../components/UI/Alert.vue"
import UIHead from "./../../../components/Admin/Head.vue"
import UIMandatory from "./../../../components/UI/Mandatory.vue"
import UISpinner from "./../../../components/UI/Spinner.vue"
import { IFaculty, IProgram, IResource, RefResource, Resource } from './../../../utils/types'
import { fsCreate, fsList, fsListProgramsById } from "./../../../utils/firestore"

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
const programs = ref<IProgram[]>([])
const item = reactive<IResource>({
  bibliography: "",
  component: "",
  content: "",
  createdAt: "",
  facultyId: "",
  index: "",
  introduction: "",
  isActive: true,
  isLock: false,
  modifiedBy: "",
  programId: "",
  summary: "",
  teacher: "",
  title: "",
  unit: "",
  updatedAt: "",
  userId: ""
})

const addItem = async () => {
  isShow.value = true

  try {
    if (
      !item.teacher &&
      !item.title &&
      !item.unit
    ) return

    const data: any = {
      ...Resource(item),
      modifiedBy: currentUser,
      userId: currentUser
    }

    const result = await fsCreate("resources", data)

    if (data.facultyId) {
      await fsCreate(`faculties/${data.facultyId}/components`, RefResource(data))
    }

    if (data.programId) {
      await fsCreate(`programs/${data.facultyId}/components`, RefResource(data))
    }

    if (result) {
      await router.push({ name: "AdminComponents" })
    }
  } catch (error) {
    Error.value = error
    isError.value = true
  } finally {
    isShow.value = false
  }
}

const getFaculties = async () => {
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
}

const getPrograms = async (id: string) => {
  const result = await fsListProgramsById("programs", id)

  result.sort((a: any, b: any) => {
    if (a.name > b.name) {
      return 1
    }
    if (a.name < b.name) {
      return -1
    }
    return 0
  })

  programs.value = result
}

// const customToolbar = [
//   ["header", "picker", "expanded"],
//   ["bold", "italic", "underline"],
//   [{ list: "ordered" }, { list: "bullet" }],
//   ["image", "code-block"]
// ]

onMounted(() => getFaculties())
</script>

<template>
  <AdminLayout>
    <UIHead back backUrl="/admin/componentes">
      Agregar componente
    </UIHead>

    <UISpinner v-if="isShow"></UISpinner>

    <UIAlert v-else-if="isError" alert="danger">{{ Error }}</UIAlert>

    <div v-else class="card border-0 shadow-sm my-3">
      <UIMandatory />

      <div class="card-body">
        <form @submit.prevent="addItem">
          <div class="form-floating mb-3">
            <input type="text" class="form-control" id="title" v-model="item.title" placeholder="Título *" autofocus
              required>
            <label for="title">Título *</label>
          </div>

          <div class="form-floating mb-3">
            <input type="text" class="form-control" id="component" v-model="item.component" placeholder="Componente *"
              required>
            <label for="component">Componente *</label>
          </div>

          <div class="form-floating mb-3">
            <input type="text" class="form-control" id="teacher" v-model="item.teacher" placeholder="Docente *" required>
            <label for="teacher">Docente *</label>
          </div>

          <div class="form-floating mb-3">
            <input type="text" class="form-control" id="unit" v-model="item.unit" placeholder="Unidad *" required>
            <label for="unit">Unidad *</label>
          </div>

          <div class="form-floating mb-3">
            <select class="form-select" id="facultyId" aria-label="Facultad" v-model="item.facultyId"
              @change="getPrograms(item.facultyId)">
              <option value="" disabled>--- Seleccione ---</option>
              <option v-for="faculty in faculties" :key="faculty.id" :value="faculty.id">{{ faculty.name }}</option>
            </select>
            <label for="facultyId">Facultad</label>
          </div>

          <div class="form-floating mb-3">
            <select class="form-select" id="programId" aria-label="Programa" v-model="item.programId">
              <option value="" disabled>--- Seleccione ---</option>
              <option v-for="program in programs" :key="program.id" :value="program.id">{{ program.name }}</option>
            </select>
            <label for="programId">Programa</label>
          </div>

          <div class="form-floating mb-3">
            <textarea class="form-control" placeholder="Descripción" id="summary" style="height: 100px"
              v-model="item.summary"></textarea>
            <label for="summary">Descripción</label>
          </div>

          <div class="mb-3">
            <label for="index" class="form-label fw-bold">Índice *</label>
            <vue-editor id="index" v-model="item.index" class="rounded" required></vue-editor>
          </div>

          <div class="mb-3">
            <label for="introduction" class="form-label fw-bold">Introducción *</label>
            <vue-editor id="introduction" v-model="item.introduction" class="rounded" required></vue-editor>
          </div>

          <div class="mb-3">
            <label for="content" class="form-label fw-bold">Contenido *</label>
            <vue-editor id="content" v-model="item.content" class="rounded" required></vue-editor>
          </div>

          <div class="mb-3">
            <label for="bibliography" class="form-label fw-bold">Bibliografía *</label>
            <vue-editor id="bibliography" v-model="item.bibliography" class="rounded" required></vue-editor>
          </div>

          <button type="submit" class="btn btn-primary rounded-pill py-1 px-5">Crear</button>
        </form>
      </div>
    </div>
  </AdminLayout>
</template>

<style scoped></style>