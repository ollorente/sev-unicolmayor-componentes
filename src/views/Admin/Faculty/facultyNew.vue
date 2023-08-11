<script setup lang="ts">
import { reactive, ref } from "vue"
import { useRouter } from "vue-router"
import AdminLayout from "./../../../layouts/admin.vue"
import UIAlert from "./../../../components/UI/Alert.vue"
import UIHead from "./../../../components/Admin/Head.vue"
import { Faculty, IFaculty } from "./../../../utils/types"
import { fsCreate } from "./../../../utils/firestore"

const router = useRouter()

const Error = ref()
const isError = ref(false)
const isShow = ref(false)
const faculty = reactive<IFaculty>({
  name: "",
  isActive: true,
})

const addItem = async () => {
  if (!faculty.name) return

  isShow.value = true

  try {
    const data = Faculty(faculty)

    const result = await fsCreate("faculties", data)

    if (result) {
      await router.push("/admin/facultades")
    }
  } catch (error) {
    Error.value = error
    isError.value = true
  } finally {
    isShow.value = false
  }
}
</script>

<template>
  <AdminLayout>
    <UIHead back backUrl="/admin/facultades">
      Agregar facultad
    </UIHead>

    <div class="col-12">
      <UISpinner v-if="isShow">Loading...</UISpinner>

      <UIAlert v-else-if="isError" alert="danger">{{ Error }}</UIAlert>

      <div v-else class="card border-0 shadow-sm my-3">
        <div class="card-body">
          <form @submit.prevent="addItem">
            <div class="mb-3">
              <label for="name" class="form-label fw-bold">Título</label>
              <input type="text" class="form-control" id="name" placeholder="Título" v-model="faculty.name" />
            </div>

            <div class="mb-3">
              <div class="form-check form-switch">
                <input class="form-check-input" type="checkbox" role="switch" id="isActive" :checked="faculty.isActive"
                  v-model="faculty.isActive" />
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