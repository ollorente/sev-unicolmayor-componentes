<script setup lang="ts">
import { onMounted, ref } from "vue"
import { collection, getDocs, limit, query, where } from "firebase/firestore"
import CustomLayout from "./../layouts/custom.vue"
import UIAlert from "./../components/UI/Alert.vue"
import UIHead from "./../components/Client/Head.vue"
import UINone from "./../components/UI/None.vue"
import UISpinner from "./../components/UI/Spinner.vue"
import UITable from "./../components/UI/Table.vue"
import UITableItem from "./../components/UI/TableItem.vue"
import { db } from "./../utils/firebase"
import { FB_APP_ID, FB_APP_NAME, IFaculty, IProgram, IResource } from "./../utils/types"

const Error = ref()
const isError = ref(false)
const isShow = ref(true)
const components = ref<IResource[]>([])
const faculties = ref<IFaculty[]>([])
const programs = ref<IProgram[]>([])

const getComponents = async () => {
  try {
    const q = query(collection(db, FB_APP_NAME, FB_APP_ID, "resources"), where("isLock", "==", false), where("isActive", "==", true), limit(5))

    const querySnapshot = await getDocs(q)

    let items: any = []

    querySnapshot.forEach((doc) => {
      items.push(doc.data())
    })

    components.value = items
  } catch (error) {
    return error
  }
}

const getFaculties = async () => {
  try {
    const q = query(collection(db, FB_APP_NAME, FB_APP_ID, "faculties"), where("isLock", "==", false), where("isActive", "==", true), limit(5))

    const querySnapshot = await getDocs(q)

    let items: any = []

    querySnapshot.forEach((doc) => {
      items.push(doc.data())
    })

    faculties.value = items
  } catch (error) {
    return error
  }
}

const getPrograms = async () => {
  try {
    const q = query(collection(db, FB_APP_NAME, FB_APP_ID, "programs"), where("isLock", "==", false), where("isActive", "==", true), limit(5))

    const querySnapshot = await getDocs(q)

    let items: any = []

    querySnapshot.forEach((doc) => {
      items.push(doc.data())
    })

    programs.value = items
  } catch (error) {
    return error
  }
}

onMounted(() => {
  try {
    getComponents()
    getFaculties()
    getPrograms()
  } catch (error) {
    Error.value = error
    isError.value = true
  } finally {
    isShow.value = false
  }
})
</script>

<template>
  <CustomLayout>
    <UIHead>
      Home
    </UIHead>

    <UISpinner v-if="isShow">Loading...</UISpinner>

    <UIAlert v-else-if="isError" alert="danger">{{ Error }}</UIAlert>

    <div v-else class="my-3">
      <div class="card border-0 shadow-sm my-3">
        <div class="card-header bg-transparent fs-5 fw-semibold">Últimos componentes agregados</div>
        <div class="card-body">
          <UITable title="Componente">
            <UITableItem v-if="components.length > 0" v-for="(item, index) in components" :key="item.id"
              :index="index + 1" :name="item.title" :isActive="item.isActive" :url="`/componentes/${item.id}`">
            </UITableItem>

            <UINone v-else></UINone>
          </UITable>
        </div>
      </div>

      <div class="card border-0 shadow-sm my-3">
        <div class="card-header bg-transparent fs-5 fw-semibold">Últimas facultades agregadas</div>
        <div class="card-body">
          <UITable title="Facultad">
            <UITableItem v-if="faculties.length > 0" v-for="(item, index) in faculties" :key="item.id" :index="index + 1"
              :name="item.name" :isActive="item.isActive" :url="`/facultades/${item.id}`">
            </UITableItem>

            <UINone v-else></UINone>
          </UITable>
        </div>
      </div>

      <div class="card border-0 shadow-sm my-3">
        <div class="card-header bg-transparent fs-5 fw-semibold">Últimos programas agregados</div>
        <div class="card-body">
          <UITable title="Programa">
            <UITableItem v-if="programs.length > 0" v-for="(item, index) in programs" :key="item.id" :index="index + 1"
              :name="item.name" :isActive="item.isActive" :url="`/programas/${item.id}`">
            </UITableItem>

            <UINone v-else></UINone>
          </UITable>
        </div>
      </div>
    </div>
  </CustomLayout>
</template>

<style scoped></style>