<script setup lang="ts">
import { onMounted, reactive, ref } from "vue"
import { useRoute, useRouter } from "vue-router"
// @ts-ignore
import { VueEditor } from "vue3-editor"
import { onAuthStateChanged } from "firebase/auth"
import { auth } from "./../../../utils/firebase"
import AdminLayout from "./../../../layouts/admin.vue"
import UIAlert from "./../../../components/UI/Alert.vue"
import UIMandatory from "./../../../components/UI/Mandatory.vue"
import UISpinner from "./../../../components/UI/Spinner.vue"
import UIHead from "./../../../components/Admin/Head.vue"
import { IFaculty, IProgram, IResource, RefResource, Resource } from "./../../../utils/types"
import { fsCreate, fsGet, fsList, fsListProgramsById, fsRemove, fsUpdate } from "./../../../utils/firestore"

onAuthStateChanged(auth, (user) => {
  const uid: any = user?.uid;
  currentUser.value = String(uid)
})
const route = useRoute()
const router = useRouter()

const id = String(route.params.id)
const Error = ref()
const isError = ref(false)
const isShow = ref(true)
const currentUser = ref()
const oldFacultyId = ref<string>()
const oldProgramId = ref<string>()
const faculties = ref<IFaculty[]>([])
const programs = ref<IProgram[]>([])
const item = reactive<IResource>({
  bibliography: "",
  component: "",
  content: "",
  createdAt: "",
  facultyId: "",
  id: "",
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

const getItem = async () => {
  isShow.value = true

  try {
    const itemFaculties: IFaculty[] = await getFaculties()
    faculties.value = itemFaculties

    const result: any = await fsGet("resources", id)

    if (result) {
      item.bibliography = result.bibliography
      item.component = result.component
      item.content = result.content
      // @ts-ignore
      item.createdAt = result.createdAt
      item.facultyId = result.facultyId
      // @ts-ignore
      item.id = result.id
      item.index = result.index
      item.introduction = result.introduction
      item.isActive = result.isActive
      item.isLock = result.isLock
      item.modifiedBy = result.modifiedBy
      item.programId = result.programId
      item.summary = result.summary
      item.teacher = result.teacher
      item.title = result.title
      item.unit = result.unit
      item.updatedAt = result.updatedAt
      item.userId = result.userId

      oldFacultyId.value = result.facultyId
      oldProgramId.value = result.programyId
    }

    if (result.facultyId) {
      const itemPrograms: any = await getPrograms(result.programyId)
      faculties.value = itemPrograms
    }
  } catch (error) {
    Error.value = error
    isError.value = true
  } finally {
    isShow.value = false
  }
}

const updateItem = async () => {
  try {
    isShow.value = true

    const data: any = {
      ...Resource(item),
      modifiedBy: currentUser,
      updatedAt: new Date().toISOString(),
    }

    if (oldFacultyId.value !== data.facultyId) {
      await fsRemove(`faculties/${oldFacultyId.value}/resources`, id)
    }

    if (data.facultyId) {
      await fsCreate(`faculties/${item.facultyId}/resources`, RefResource(item))
    }

    if (oldProgramId.value !== data.programId) {
      await fsRemove(`programs/${oldProgramId.value}/resources`, id)
    }

    if (data.programId) {
      await fsCreate(`programs/${item.programId}/resources`, RefResource(item))
    }

    await fsUpdate("resources", id, data)

    if (data.facultyId) {
      await fsUpdate(`faculties/${data.facultyId}/resources`, id, RefResource(data))
    }

    if (data.programId) {
      await fsUpdate(`programs/${data.programId}/resources`, id, RefResource(data))
    }

    await getItem()
  } catch (error) {
    Error.value = error
    isError.value = true
  } finally {
    isShow.value = false
  }
}

const removeItem = async () => {
  if (window.confirm(`Está a punto de borrar un elemento`)) {
    isShow.value = true

    const result: any = await fsRemove("resources", id)

    if (item.facultyId) {
      await fsRemove(`faculties/${item.facultyId}/resources`, id)
    }

    if (item.programId) {
      await fsRemove(`programs/${item.programId}/resources`, id)
    }

    if (result) {
      await router.push({ name: "AdminComponents" })
    }
    try {
    } catch (error) {
      Error.value = error
      isError.value = true
    }
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

  return result
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

onMounted(() => getItem())
</script>

<template>
  <AdminLayout>
    <UIHead back backUrl="/admin/componentes">
      Componente
    </UIHead>

    <UISpinner v-if="isShow"></UISpinner>

    <UIAlert v-else-if="isError" alert="danger">{{ Error }}</UIAlert>

    <div v-else class="card border-0 shadow-sm my-3">
      <UIMandatory />

      <div class="card-body">
        <form @submit.prevent="updateItem">
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

          <div class="row">
            <div class="col-12 col-md-6">
              <div class="mb-3">
                <div class="form-check form-switch">
                  <input class="form-check-input" type="checkbox" role="switch" id="isActive" :checked="item?.isActive"
                    v-model="item.isActive" />
                  <label class="form-check-label" for="isActive">{{ item.isActive ? 'Activo' : 'Inactivo' }}</label>
                </div>
              </div>
            </div>
            <div class="col-12 col-md-6 d-none">
              <div class="mb-3">
                <div class="form-check form-switch">
                  <input class="form-check-input" type="checkbox" role="switch" id="isLock" :checked="item?.isLock"
                    v-model="item.isLock" />
                  <label class="form-check-label" for="isLock">{{ item.isLock ? 'Bloqueado' : 'desbloqueado' }}</label>
                </div>
              </div>
            </div>
          </div>

          <button type="submit" class="btn btn-warning btn-sm rounded-pill mt-3">
            Actualizar
          </button>

          <hr />

          <div class="row">
            <div class="col-12 col-md-6">
              <div class="">
                <h6 class="small">Creado:</h6>
                <p class="pb-0 mb-0">{{ item?.createdAt?.split("T")[0] }}</p>
              </div>
            </div>
            <div v-if="item.createdAt !== item.updatedAt" class="col-12 col-md-6">
              <div class="">
                <h6 class="small">Modificado:</h6>
                <p class="pb-0 mb-0">{{ item?.updatedAt?.split("T")[0] }}</p>
              </div>
            </div>
          </div>
        </form>
      </div>
      <div class="card-footer bg-transparent d-flex justify-content-between align-items-center">
        <span></span>
        <span><button class="btn btn-outline-danger btn-sm rounded-pill mx-1 py-1 px-3" role="button"
            @click="removeItem">Eliminar</button></span>
      </div>
    </div>
    <pre class="d-none">{{ oldFacultyId }}</pre>
    <pre class="d-none">{{ oldProgramId }}</pre>
    <pre class="d-none">{{ item }}</pre>
    <pre class="d-none">{{ faculties }}</pre>
    <pre class="d-none">{{ programs }}</pre>
  </AdminLayout>
</template>

<style scoped></style>