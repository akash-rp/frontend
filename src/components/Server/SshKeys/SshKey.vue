<template>
  <div class="w-full rounded shadow bg-white">
    <a-modal
      title="Add SSH Key"
      v-model:visible="showAddSshModal"
      :destroyOnClose="true"
    >
      <template #footer>
        <button
          class="py-2 px-4 font-medium border border-black rounded"
          @click="showAddSshModal = false"
        >
          Cancel
        </button>
        <button
          class="py-2 px-4 bg-indigo-700 text-white rounded pointer"
          type="submit"
          form="addKey"
          html-type="submit"
        >
          Add
        </button>
      </template>
      <AddSshKey @keys="keyAdded"></AddSshKey>
    </a-modal>
    <h1 class="header">SSH Keys</h1>
    <div>
      <DataTable
        :value="keys"
        class="p-datatable-lg"
        :rowHover="true"
        dataKey="index"
        v-model:filters="filters1"
        :globalFilterFields="['label', 'username', 'key']"
        :responsive="true"
      >
        <template #loading> Loading records, please wait... </template>
        <template #empty>
          <div class="">No Keys Found</div>
        </template>
        <template #header>
          <div
            class="flex justify-between bg-white items-center"
            headstyle="background-color:white"
          >
            <div
              class="relative text-gray-600 focus-within:text-indigo-800 text-gray-400"
            >
              <span class="absolute inset-y-0 left-0 flex items-center pl-2">
                <svg
                  fill="none"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  viewBox="0 0 24 24"
                  class="w-6 h-6"
                >
                  <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
              </span>
              <input
                type="search"
                name="q"
                class="py-2 text-sm text-black rounded-md pl-10 focus:bg-white focus:text-gray-900 focus:ring focus:outline-none focus:ring-1 focus:ring-indigo-800 ring-1 ring-gray-400"
                placeholder="Search"
                autocomplete="off"
                v-model="filters1['global'].value"
              />
            </div>
            <button
              class="p-2 bg-indigo-700 text-white font-semibold rounded-md"
              @click="showAddSshModal = true"
            >
              Add SSH Key
            </button>
          </div>
        </template>
        <Column header="Label" field="label"> </Column>
        <Column header="User" field="username"> </Column>
        <Column
          header="Public Key"
          field="key"
          class="truncate"
          style="max-width: 400px"
        >
        </Column>
        <Column header="Added On" field="addedOn">
          <template #body="{ data }">
            {{ addedOn(data) }}
          </template>
        </Column>
        <Column class="w-5 relative">
          <template #body="{ data }">
            <a-popconfirm
              placement="topRight"
              title="Are you sure to delete this SSH key?"
              ok-text="Delete"
              cancel-text="No"
              @confirm="deleteSshKey(data)"
              :disabled="data.sites > 0"
            >
              <div
                class="absolute top-1/2 left-1/2 -translate-y-2/4 -translate-x-2/4 p-2 rounded-full hover:bg-white cursor-pointer"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5 text-red-700"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                    clip-rule="evenodd"
                  />
                </svg>
              </div>
            </a-popconfirm>
          </template>
        </Column>
      </DataTable>
    </div>
  </div>
</template>

<script>
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import { FilterMatchMode } from "primevue/api";
import AddSshKey from "./AddSshKey.vue";

export default {
  components: { DataTable, Column, AddSshKey },
  data() {
    return {
      showAddSshModal: false,
      filters1: {
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
      },
      keys: [],
    };
  },
  methods: {
    keyAdded(data) {
      this.showAddSshModal = false;
      this.keys = data;
      this.$toast.success("SSH Key Added");
    },
    addedOn(data) {
      if (!data.timestamp) {
        return "-";
      }
      return window.dayjs(data.timestamp).fromNow();
    },
    async deleteSshKey(data) {
      return this.$axios
        .delete(
          "/server/" + this.$route.params.serverid + "/sshKey",
          {
            label: data.label,
            user: data.user,
            key: data.key,
          },
          {
            Headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((res) => {
          this.keys = res.data;
          this.$toast.success("SSH Key Deleted");
        })
        .catch(() => {
          this.$toast.error("Failed to delete SSH key");
        });
    },
  },
  created() {
    this.$axios
      .get("/server/" + this.$route.params.serverid + "/sshKeys")
      .then((res) => {
        this.keys = res.data;
      })
      .catch(() => {
        this.$toast.error("Failed to get SSH Keys");
      });
  },
};
</script>

<style lang="scss" scoped>
:deep(.p-datatable) {
  .p-datatable-header {
    background-color: white;
    padding: 1rem !important;
  }
}
</style>
