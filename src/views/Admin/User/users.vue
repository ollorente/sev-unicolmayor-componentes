<script setup lang="ts">
import { onMounted, ref } from "vue"
import AdminLayout from "./../../../layouts/admin.vue"
import UIAlert from "./../../../components/UI/Alert.vue"
import UIHead from "./../../../components/Admin/Head.vue"
import UINone from "./../../../components/UI/None.vue"
import UISpinner from "./../../../components/UI/Spinner.vue"
import UITable from "./../../../components/UI/Table.vue"
import UITableItem from "./../../../components/UI/TableItem.vue"
import { IUser } from "./../../../utils/types"
import { fsList } from "./../../../utils/firestore"

const Error = ref()
const isError = ref(false)
const isShow = ref(true)
const items = ref<IUser[]>([])

const getItems = async () => {
  try {
    const result = await fsList("users")

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
  <AdminLayout>
    <UIHead>
      Usuarios
    </UIHead>

    <UISpinner v-if="isShow"></UISpinner>

    <UIAlert v-else-if="isError" alert="danger">{{ Error }}</UIAlert>

    <div v-else class="card border-0 shadow-sm my-3">
      <div class="card-body">
        <UITable title="Componente">
          <UITableItem v-if="items.length > 0" v-for="(item, index) in items" :key="item.id" :index="index + 1"
            :name="item.name" :isActive="item.isActive" :url="`/admin/usuarios/${item.id}`">
          </UITableItem>

          <UINone v-else></UINone>
        </UITable>
      </div>
    </div>
  </AdminLayout>
</template>
