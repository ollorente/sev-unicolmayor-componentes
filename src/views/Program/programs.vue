<script setup lang="ts">
import { onMounted, ref } from "vue"
import CustomLayout from "./../../layouts/custom.vue"
import UIAlert from "./../../components/UI/Alert.vue"
import UIHead from "./../../components/Admin/Head.vue"
import UINone from "./../../components/UI/None.vue"
import UISpinner from "./../../components/UI/Spinner.vue"
import UITable from "./../../components/UI/Table.vue"
import UITableItem from "./../../components/UI/TableItem.vue"
import { IProgram } from "./../../utils/types"
import { fsList } from "./../../utils/firestore"

const Error = ref()
const isError = ref(false)
const isShow = ref(true)
const items = ref<IProgram[]>([])

const getItems = async () => {
  try {
    const result = await fsList("programs")

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
  } catch (error) {
    Error.value = error
    isError.value = true
  } finally {
    isShow.value = false
  }
}

onMounted(() => getItems())
</script>

<template>
  <CustomLayout>
    <UIHead>
      Programas
    </UIHead>

    <UISpinner v-if="isShow">Loading...</UISpinner>

    <UIAlert v-else-if="isError" alert="danger">{{ Error }}</UIAlert>

    <div v-else class="card border-0 shadow-sm my-3">
      <div class="card-body">
        <UITable title="Programa">
          <UITableItem v-if="items.length > 0" v-for="(item, index) in items" :key="item.id" :index="index + 1"
            :name="item.name" :isActive="item.isActive" :url="`/programas/${item.id}`">
          </UITableItem>

          <UINone v-else></UINone>
        </UITable>
      </div>
    </div>
  </CustomLayout>
</template>

<style scoped></style>