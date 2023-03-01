<template>
  <a-modal
    title="Add 3rd Party API"
    v-model:visible="showAddIntegrationModal"
    :destroyOnClose="true"
  >
    <template #footer>
      <button
        class="py-2 px-4 font-medium border border-black rounded"
        @click="showAddIntegrationModal = false"
      >
        Cancel
      </button>
      <button
        class="py-2 px-4 bg-indigo-700 text-white rounded pointer"
        type="submit"
        form="addIntegration"
        html-type="submit"
      >
        Add API
      </button>
    </template>
    <add-integration
      @close="showAddIntegrationModal = false"
      @setIntegrations="setIntegrations"
    ></add-integration>
  </a-modal>
  <div class="w-full shadow bg-white">
    <div class="">
      <h1 class="p-5 text-xl font-semibold rounded-t">Integration</h1>
    </div>
    <div class="bg-white shadow">
      <DataTable
        :value="integrations"
        class="p-datatable-lg"
        :globalFilterFields="['name']"
        v-model:filters="filters1"
        :rowHover="true"
        dataKey="name"
        selectionMode="single"
        @rowSelect="onRowSelect"
      >
        <template #empty>
          <div class="">No Api keys available</div>
        </template>
        <template #header>
          <div
            class="flex bg-white justify-between"
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
            <div
              class="self-center p-2 mr-5 rounded text-white bg-indigo-800 text-sm"
              @click="showAddIntegrationModal = true"
            >
              Add API
            </div>
          </div>
        </template>
        <Column
          field="provider"
          header=""
          bodyStyle="padding-right:0px;"
          headerStyle="background-color:#eff3f8"
        >
          <template #body="{ data }">
            <img
              :src="'/assets/providers/' + data.provider + '.svg'"
              :alt="data.provider"
              height="20"
              width="20"
              :class="{ uc: data.provider == 'UC' }"
            />
          </template>
        </Column>
        <Column
          field="name"
          header="Label"
          bodyStyle="padding-left:0px;width:25%"
          headerStyle="padding-left:0px;background-color:#eff3f8;"
          bodyClass="font-bold"
        >
        </Column>
        <Column
          field="service"
          header="Service"
          headerStyle="background-color:#eff3f8;"
        ></Column>
      </DataTable>
    </div>
  </div>
</template>

<script>
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import { FilterMatchMode, FilterOperator } from "primevue/api";
import AddIntegration from "./AddIntegration.vue";
export default {
  components: { DataTable, Column, AddIntegration },
  data() {
    return {
      filters1: {
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
      },
      items: [
        {
          label: "Backup storage",
          to: "/settings/integration/backup/",
        },
      ],

      showAddIntegrationModal: false,
      integrations: [],
    };
  },
  watch: {
    "$store.state.integrations": {
      deep: true,
      handler() {
        this.integrations = [];
        for (let api of this.$store.state.integrations.dns) {
          this.integrations.push(api);
        }
        for (let api of this.$store.state.integrations.backup) {
          this.integrations.push(api);
        }
      },
    },
  },
  created() {
    this.$axios.get("/integration").then((res) => {
      this.$store.commit("setUserIntegration", res.data);
    });
  },
  methods: {
    setIntegrations(data) {
      this.$store.commit("setUserIntegration", data);
    },
  },
};
</script>

<style lang="scss" scoped>
:deep(.p-datatable) {
  .p-datatable-header {
    background-color: white;
    padding-top: 1rem !important;
    padding-bottom: 1rem !important;
  }
}
</style>
