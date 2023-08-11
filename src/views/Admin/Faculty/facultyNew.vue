<script setup lang="ts">
import { reactive, ref } from "vue"
import { useRouter } from "vue-router";
import AdminLayout from "./../../../layouts/admin.vue"
import UIHead from "./../../../components/Admin/Head.vue"
import { IFaculty } from "./../../../utils/types"
import { fsCreate } from "./../../../utils/firestore";

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
    const result = await fsCreate("faculties", faculty)

    if (result) {
      isShow.value = false

      await router.push("/administracion/facultades")
    }
  } catch (error) {
    Error.value = error
    isError.value = true
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

      <div v-else-if="isError">{{ Error }}</div>

      <div v-else class="card border-0 shadow-sm my-3">
        <div class="card-body">
          <form @submit.prevent="addItem">
            <div class="mb-3">
              <label for="name" class="form-label">Título</label>
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