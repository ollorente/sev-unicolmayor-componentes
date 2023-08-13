<script setup lang="ts">
import { onMounted, reactive, ref } from "vue"
import { useRoute } from "vue-router"
import { onAuthStateChanged } from "firebase/auth"
import { auth } from "./../../../utils/firebase"
import AdminLayout from "./../../../layouts/admin.vue"
import UIHead from "./../../../components/Admin/Head.vue"
import UICheckedComponent from "./../../../components/UI/CheckedComponent.vue"
import UICheckComponent from "./../../../components/UI/CheckComponent.vue"
import { ICheck } from "./../../../utils/types"
import { fsList } from "./../../../utils/firestore"

onAuthStateChanged(auth, (user) => {
  const uid: any = user?.uid
  currentuser.value = String(uid)
})
const route = useRoute()

const id = String(route.params.id)
const Error = ref()
const isError = ref(false)
const isShow = ref(true)
const currentuser = ref()
const approved = reactive<ICheck>({
  check: false,
  createdAt: "",
  updatedAt: "",
  userId: ""
})
const elaborated = reactive<ICheck>({
  check: false,
  createdAt: "",
  updatedAt: "",
  userId: ""
})
const integrated = reactive<ICheck>({
  check: false,
  createdAt: "",
  updatedAt: "",
  userId: ""
})
const revised = reactive<ICheck>({
  check: false,
  createdAt: "",
  updatedAt: "",
  userId: ""
})

const getItem = async () => {
  isShow.value = true

  try {
    const resultApproved: any = await fsList(`resources/${id}/approved`)
    console.log("🚀 ~ file: resourceStatus.vue:52 ~ getItem ~ resultApproved:", resultApproved)
    approved.check = resultApproved.check
    approved.createdAt = resultApproved.createdAt
    approved.updatedAt = resultApproved.updatedAt
    approved.userId = resultApproved.userId

    const resultElaborated: any = await fsList(`resources/${id}/elaborated`)
    console.log("🚀 ~ file: resourceStatus.vue:54 ~ getItem ~ resultElaborated:", resultElaborated)
    elaborated.check = resultElaborated.check
    elaborated.createdAt = resultElaborated.createdAt
    elaborated.updatedAt = resultElaborated.updatedAt
    elaborated.userId = resultElaborated.userId

    const resultIntegrated: any = await fsList(`resources/${id}/integrated`)
    console.log("🚀 ~ file: resourceStatus.vue:56 ~ getItem ~ resultIntegrated:", resultIntegrated)
    integrated.check = resultIntegrated.check
    integrated.createdAt = resultIntegrated.createdAt
    integrated.updatedAt = resultIntegrated.updatedAt
    integrated.userId = resultIntegrated.userId

    const resultRevised: any = await fsList(`resources/${id}/revised`)
    console.log("🚀 ~ file: resourceStatus.vue:58 ~ getItem ~ resultRevised:", resultRevised)
    revised.check = resultRevised.check
    revised.createdAt = resultRevised.createdAt
    revised.updatedAt = resultRevised.updatedAt
    revised.userId = resultRevised.userId
  } catch (error) {
    Error.value = error
    isError.value = true
  } finally {
    isShow.value = false
  }
}

const updateItem = () => { }

onMounted(() => getItem())
</script>

<template>
  <AdminLayout>
    <UIHead back :backUrl="`/admin/componentes/${route.params.id}`">
      Estado del componente
    </UIHead>

    <UISpinner v-if="isShow"></UISpinner>

    <UIAlert v-else-if="isError" alert="danger">{{ Error }}</UIAlert>

    <div v-else class="card border-0 shadow-sm my-3">
      <UIMandatory />

      <div class="card-body">
        <form @submit.prevent="updateItem">
          <div class="row g-2 mb-3 d-none">
            <div class="col-md">
              <UICheckedComponent title="Elaborado" id="elaboratedInput" :date="elaborated.updatedAt"
                v-model="elaborated.userId">Elaborado</UICheckedComponent>
              <UICheckComponent :check="elaborated.check" id="elaboratedCheck" titleCheck="Elaborado"
                titleUncheck="No elaborado" />
            </div>
            <div class="col-md">
              <UICheckedComponent title="Revisado" id="reviseddInput" :date="revised.updatedAt" v-model="revised.userId">
                Revisado</UICheckedComponent>
              <UICheckComponent :check="revised.check" id="reviseddCheck" titleCheck="Revisado"
                titleUncheck="No revisado" />
            </div>
            <div class="col-md">
              <UICheckedComponent title="Aprobado" id="approvedInput" :date="approved.updatedAt"
                v-model="approved.userId">Aprobado</UICheckedComponent>
              <UICheckComponent :check="approved.check" id="approvedCheck" titleCheck="Aprobado"
                titleUncheck="No aprobado" />
            </div>
            <div class="col-md">
              <UICheckedComponent title="Integrado" id="integratedInput" :date="integrated.updatedAt"
                v-model="integrated.userId">Integrado</UICheckedComponent>
              <UICheckComponent :check="integrated.check" id="integratedCheck" titleCheck="Integrado"
                titleUncheck="No integrado" />
            </div>
          </div>
        </form>
      </div>
    </div>
    <pre>{{ approved }}</pre>
    <pre>{{ elaborated }}</pre>
    <pre>{{ integrated }}</pre>
    <pre>{{ revised }}</pre>
  </AdminLayout>
</template>

