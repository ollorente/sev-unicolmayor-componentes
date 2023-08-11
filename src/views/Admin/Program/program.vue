<script setup lang="ts">
import { onMounted, reactive, ref } from "vue"
import { useRoute, useRouter } from "vue-router"
import AdminLayout from "./../../../layouts/admin.vue"
import UIAlert from "./../../../components/UI/Alert.vue"
import UIMandatory from "./../../../components/UI/Mandatory.vue"
import UISpinner from "./../../../components/UI/Spinner.vue"
import UIHead from "./../../../components/Admin/Head.vue"
import { IFaculty, IProgram } from "./../../../utils/types"
import { fsGet, fsList, fsRemove, fsUpdate } from "./../../../utils/firestore"

const route = useRoute()
const router = useRouter()

const id = String(route.params.ide)
const Error = ref()
const isError = ref(false)
const isShow = ref(true)
const faculties = ref<IFaculty[]>([])
const item = reactive<IProgram>({
  createdAt: "",
  facultyId: "",
  id: "",
  isActive: false,
  isLock: false,
  name: "",
  updatedAt: "",
})

const getItem = async () => {
  try {
    const items: IFaculty[] = await getFaculties()
    faculties.value = items

    const result: any = await fsGet("programs", id)
    console.log("🚀 ~ file: program.vue:36 ~ getItem ~ result:", result)

    // @ts-ignore
    item.createdAt = result.createdAt
    // @ts-ignore
    item.id = result.id
    item.facultyId = result.facultyId
    item.isActive = result.isActive
    item.isLock = result.isLock
    item.name = result.name
    item.updatedAt = result.updatedAt

    isShow.value = false
  } catch (error) {
    Error.value = error
    isError.value = true
  }
}

const updateItem = async () => {
  try {
    isShow.value = true

    const data = {
      facultyId: item.facultyId,
      isActive: item.isActive,
      isLock: item.isLock,
      name: item.name,
      updatedAt: new Date().toISOString(),
    }

    await fsUpdate("programs", id, data)
    await fsUpdate(`faculties/${data.facultyId}/programs`, id, data)

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

    const result: any = await fsRemove("programs", id)
    await fsRemove(`faculties/${item.facultyId}/programs`, id)

    if (result) {
      await router.push({ name: "AdminPrograms" })
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

onMounted(() => getItem())
</script>

<template>
  <AdminLayout>
    <UIHead back backUrl="/admin/programas">
      Programa
    </UIHead>

    <UISpinner v-if="isShow">Loading...</UISpinner>

    <UIAlert v-else-if="isError" alert="danger">{{ Error }}</UIAlert>

    <div v-else class="card border-0 shadow-sm my-3">
      <UIMandatory />

      <div class="card-body">
        <form @submit.prevent="updateItem">
          <div class="mb-3">
            <label for="name" class="form-label">Título</label>
            <input type="text" class="form-control" id="name" placeholder="Título" v-model="item.name" />
          </div>

          <div class="mb-3">
            <label class="form-check-label" for="isActive">Facultad</label>
            <select class="form-select" v-model="item.facultyId" aria-label="Seleccionar">
              <option value="" selected>--- Seleccionar ---</option>
              <option v-for="faculty in faculties" :key="faculty.id" :value="faculty.id">{{ faculty.name }}</option>
            </select>
          </div>

          <div class="row">
            <div class="col-12 col-md-6">
              <div class="mb-3">
                <div class="form-check form-switch">
                  <input class="form-check-input" type="checkbox" role="switch" id="isActive" :checked="item?.isActive"
                    v-model="item.isActive" />
                  <label class="form-check-label" for="isActive">Activo</label>
                </div>
              </div>
            </div>
            <div class="col-12 col-md-6">
              <div class="mb-3">
                <div class="form-check form-switch">
                  <input class="form-check-input" type="checkbox" role="switch" id="isLock" :checked="item?.isLock"
                    v-model="item.isLock" />
                  <label class="form-check-label" for="isLock">Bloqueado</label>
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
      <div class="card-footer bg-transparent text-end">
        <button class="btn btn-outline-danger btn-sm rounded-pill mx-1 py-1 px-3" role="button"
          @click="removeItem">Eliminar</button>
      </div>
    </div>
  </AdminLayout>
</template>

<style scoped></style>