<script setup lang="ts">
import { onMounted, ref } from "vue"
import { useRoute } from "vue-router"
import CustomLayout from "./../../layouts/custom.vue"
import UIAlert from "./../../components/UI/Alert.vue"
import UISpinner from "./../../components/UI/Spinner.vue"
import UIHead from "./../../components/Client/Head.vue"
import { IProgram } from "./../../utils/types"
import { fsGet } from "./../../utils/firestore"

const route = useRoute()

const id = String(route.params.id)
const Error = ref()
const isError = ref(false)
const isShow = ref(true)
const item = ref<IProgram>()

const getItem = async () => {
  try {
    const result: any = await fsGet("programs", id)

    if (result) {
      const faculty = await getFaculty(result.facultyId)
      result.facultyId = await faculty

      item.value = result
    }
  } catch (error) {
    Error.value = error
    isError.value = true
  } finally {
    isShow.value = false
  }
}

const getFaculty = async (data: string) => {
  const faculty = await fsGet("faculties", data)
  return faculty.name
}

onMounted(() => getItem())
</script>

<template>
  <CustomLayout>
    <UIHead back backUrl="/programas">
      Programa
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
        <div class="row g-2 mb-3">
          <div class="col-md">
            <h6 class="fw-bold">Facultad</h6>
            <p>{{ item?.facultyId ? item?.facultyId : 'N/A' }}</p>
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
        <RouterLink :to="`/programas/${route.params.id}/componentes`" class="btn btn-secondary btn-sm rounded-pill mx-1">Componentes</RouterLink>
      </div>
    </div>
  </CustomLayout>
</template>

<style scoped></style>