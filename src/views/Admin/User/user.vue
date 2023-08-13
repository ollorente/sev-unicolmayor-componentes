<script setup lang="ts">
import { onMounted, ref } from "vue"
import { useRoute } from "vue-router"
import AdminLayout from "./../../../layouts/admin.vue"
import UIAlert from "./../../../components/UI/Alert.vue"
import UISpinner from "./../../../components/UI/Spinner.vue"
import UIHead from "./../../../components/Admin/Head.vue"
import { IUser } from "./../../../utils/types"
import { fsGet } from "./../../../utils/firestore"

const route = useRoute()

const id = String(route.params.id)
const Error = ref()
const isError = ref(false)
const isShow = ref(true)
const item = ref<IUser>()

const getItem = async () => {
  try {
    const result: any = await fsGet("users", id)

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
  <AdminLayout>
    <UIHead back backUrl="/admin/usuarios">
      Usuario
    </UIHead>

    <UISpinner v-if="isShow"></UISpinner>

    <UIAlert v-else-if="isError" alert="danger">{{ Error }}</UIAlert>

    <div v-else class="card border-0 shadow-sm my-3">
      <div class="card-body">
        <div class="row g-2 mb-3">
          <div class="col-md text-center p-3">
            <img :src="item?.image" :alt="item?.image ? item?.image : item?.email" class="border rounded-circle mx-auto"
              style="width: 10rem;">
          </div>
        </div>
        <div class="row g-2 mb-3">
          <div class="col-md">
            <h6 class="fw-bold">Nombre</h6>
            <p>{{ item?.name ? item?.name : 'N/A' }}</p>
          </div>
          <div class="col-md">
            <h6 class="fw-bold">Correo electrónico</h6>
            <p>{{ item?.email }}</p>
          </div>
        </div>
        <div class="row g-2 mb-3">
          <div class="col-md">
            <h6 class="fw-bold">Teléfono</h6>
            <p>{{ item?.phone ? item?.phone : 'N/A' }}</p>
          </div>
          <div class="col-md">
            <h6 class="fw-bold">Correo electrónico</h6>
            <p>{{ item?.email }}</p>
          </div>
        </div>
        <div class="row g-2 mb-3">
          <div class="col-md">
            <h6 class="fw-bold">Creado</h6>
            <p>{{ item?.createdAt?.split("T")[0] }}</p>
          </div>
          <div v-if="item?.createdAt != item?.updatedAt" class="col-md">
            <h6 class="fw-bold">Actualizado</h6>
            <p>{{ item?.updatedAt?.split("T")[0] }}</p>
          </div>
        </div>
      </div>
    </div>
  </AdminLayout>
</template>
