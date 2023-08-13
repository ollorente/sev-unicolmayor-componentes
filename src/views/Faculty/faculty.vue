<script setup lang="ts">
import { onMounted, ref } from "vue"
import { useRoute } from "vue-router"
import CustomLayout from "./../../layouts/custom.vue"
import UIAlert from "./../../components/UI/Alert.vue"
import UISpinner from "./../../components/UI/Spinner.vue"
import UIHead from "./../../components/Client/Head.vue"
import { IFaculty } from "./../../utils/types"
import { fsGet } from "./../../utils/firestore"

const route = useRoute()

const id = String(route.params.id)
const Error = ref()
const isError = ref(false)
const isShow = ref(true)
const item = ref<IFaculty>()

const getItem = async () => {
  try {
    const result: any = await fsGet("faculties", id)

    item.value = result
  } catch (error) {
    Error.value = error
    isError.value = true
  } finally {
    isShow.value = false
  }
}

onMounted(() => getItem())
</script>

<template>
  <CustomLayout>
    <UIHead back backUrl="/facultades">
      Facultad
    </UIHead>

    <UISpinner v-if="isShow">Loading...</UISpinner>

    <UIAlert v-else-if="isError" alert="danger">{{ Error }}</UIAlert>

    <div v-else class="card border-0 shadow-sm my-3">
      <div class="card-body">
        <div class="row g-2 mb-3">
          <div class="col-md">
            <h6 class="fw-bold">Nombre</h6>
            <p>{{ item?.name ? item?.name : 'N/A' }}</p>
          </div>
        </div>
        <div class="row g-2">
          <div class="col-md">
            <h6 class="fw-bold">Estado</h6>
            <p>{{ item?.isActive ? 'Activo' : 'Inactivo' }}</p>
          </div>
        </div>
      </div>
      <div class="card-footer text-start">
        <RouterLink :to="`/facultades/${route.params.id}/componentes`" class="btn btn-secondary btn-sm rounded-pill mx-1">Componentes</RouterLink>
        <RouterLink :to="`/facultades/${route.params.id}/programas`" class="btn btn-secondary btn-sm rounded-pill mx-1">Programas</RouterLink>
      </div>
    </div>
  </CustomLayout>
</template>

<style scoped></style>