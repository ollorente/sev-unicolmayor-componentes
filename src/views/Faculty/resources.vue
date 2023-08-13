<script setup lang="ts">
import { onMounted, ref } from "vue"
import { useRoute } from "vue-router"
import CustomLayout from "./../../layouts/custom.vue"
import UIAlert from "./../../components/UI/Alert.vue"
import UIHead from "./../../components/Admin/Head.vue"
import UINone from "./../../components/UI/None.vue"
import UISpinner from "./../../components/UI/Spinner.vue"
import UITable from "./../../components/UI/Table.vue"
import UITableItem from "./../../components/UI/TableItem.vue"
import { IResource } from "./../../utils/types"
import { fsList } from "./../../utils/firestore"

const route = useRoute()

const id = String(route.params.id)
const Error = ref()
const isError = ref(false)
const isShow = ref(true)
const items = ref<IResource[]>([])

const getItems = async () => {
  try {
    const result = await fsList(`faculties/${id}/resources`)

    result.sort((a: any, b: any) => {
      if (a.name > b.name) {
        return 1
      }
      if (a.name < b.name) {
        return -1
      }
      return 0
    })

    items.value = result
    isShow.value = false
  } catch (error) {
    Error.value = error
    isError.value = true
  }
}

onMounted(() => getItems())
</script>

<template>
  <CustomLayout>
    <UIHead back :backUrl="`/facultades/${id}`">
      Componentes de la facultad
    </UIHead>

    <UISpinner v-if="isShow">Loading...</UISpinner>

    <UIAlert v-else-if="isError" alert="danger">{{ Error }}</UIAlert>

    <div v-else class="card border-0 shadow-sm my-3">
      <div class="card-body">
        <UITable title="Componente">
          <UITableItem v-if="items.length > 0" v-for="(item, index) in items" :key="item.id" :index="index + 1"
            :name="item.title" :isActive="item.isActive" :url="`/componentes/${item.id}`">
          </UITableItem>

          <UINone v-else></UINone>
        </UITable>
      </div>
    </div>
  </CustomLayout>
</template>

<style scoped></style>