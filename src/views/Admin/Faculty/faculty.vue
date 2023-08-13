<script setup lang="ts">
import { onMounted, reactive, ref } from "vue"
import { onAuthStateChanged } from "firebase/auth"
import { auth } from "./../../../utils/firebase"
import { useRoute, useRouter } from "vue-router"
import AdminLayout from "./../../../layouts/admin.vue"
import UIAlert from "./../../../components/UI/Alert.vue"
import UIMandatory from "./../../../components/UI/Mandatory.vue"
import UISpinner from "./../../../components/UI/Spinner.vue"
import UIHead from "./../../../components/Admin/Head.vue"
import { fsGet, fsRemove, fsUpdate } from "./../../../utils/firestore"
import { IFaculty } from "./../../../utils/types"

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
const item = reactive<IFaculty>({
  createdAt: "",
  id: "",
  isActive: false,
  isLock: false,
  modifiedBy: "",
  name: "",
  updatedAt: "",
})

const getItem = async () => {
  try {
    const result: any = await fsGet("faculties", id)

    // @ts-ignore
    item.createdAt = result.createdAt
    // @ts-ignore
    item.id = result.id
    item.isActive = result.isActive
    item.isLock = result.isLock
    item.modifiedBy = result.modifiedBy
    item.name = result.name
    item.updatedAt = result.updatedAt
  } catch (error) {
    Error.value = error
    isError.value = true
  } finally {
    isShow.value = false
  }
}

const updateItem = async () => {
  isShow.value = true

  try {
    const result: any = await fsUpdate("faculties", id, {
      isActive: item.isActive,
      isLock: item.isLock,
      modifiedBy: item.modifiedBy,
      name: item.name,
      updatedAt: new Date().toISOString(),
    })

    if (result) {
      getItem()
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

    try {
      const result: any = await fsRemove("faculties", id)

      if (result) {
        await router.push({ name: "AdminFaculties" })
      }
    } catch (error) {
      Error.value = error
      isError.value = true
    }
  }
}

onMounted(() => getItem())
</script>

<template>
  <AdminLayout>
    <UIHead back backUrl="/admin/facultades">
      Facultad
    </UIHead>

    <UISpinner v-if="isShow"></UISpinner>

    <UIAlert v-else-if="isError" alert="danger">{{ Error }}</UIAlert>

    <div v-else class="card border-0 shadow-sm my-3">
      <UIMandatory />

      <div class="card-body">
        <form @submit.prevent="updateItem">
          <div class="mb-3">
            <label for="name" class="form-label fw-bold">Título *</label>
            <input type="text" class="form-control" id="name" placeholder="Título *" v-model="item.name" required />
          </div>

          <div class="row">
            <div class="col-12 col-md-6">
              <div class="mb-3">
                <div class="form-check form-switch">
                  <input class="form-check-input" type="checkbox" role="switch" id="isActive" :checked="item.isActive"
                    v-model="item.isActive" />
                  <label class="form-check-label" for="isActive">Activo</label>
                </div>
              </div>
            </div>
            <div class="col-12 col-md-6 d-none">
              <div class="mb-3">
                <div class="form-check form-switch">
                  <input class="form-check-input" type="checkbox" role="switch" id="isLock" :checked="item.isLock"
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