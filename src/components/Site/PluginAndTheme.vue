<template>
  <div>
    <h1 class="header">Plugins</h1>
    <p class="px-5">Here you can update plugins installed in your site.</p>
    <div class="mt-5">
      <DataTable
        :value="plugins"
        class="p-datatable-lg"
        :rowHover="true"
        dataKey="name"
        v-model:filters="pluginFilter"
        :globalFilterFields="['title']"
      >
        <template #empty>
          <div class="">No Plugins found</div>
        </template>
        <template #header>
          <div class="flex bg-white" headstyle="background-color:white">
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
                placeholder="Search by name"
                autocomplete="off"
                v-model="pluginFilter['global'].value"
              />
            </div>
          </div>
        </template>
        <Column header="Name" field="title" class=""> </Column>
        <Column header="Status" class="" field="status"> </Column>
        <Column header="Version" field="version"></Column>
        <Column header="Latest" field="update_version">
          <template #body="{ data }">
            {{ showUpdateVersion(data) }}
          </template>
        </Column>
        <Column class="w-5">
          <template #body="{ data }">
            <div class="flex flex-row">
              <tag
                v-if="data.status == 'inactive'"
                class="cursor-pointer mr-5"
                severity="success"
                @click="updatePlugin(data.name, 'activate')"
                >Activate</tag
              >
              <tag
                v-if="data.status == 'active'"
                class="cursor-pointer mr-5"
                severity="danger"
                @click="updatePlugin(data.name, 'deactivate')"
                >Deactivate</tag
              >
              <tag
                v-if="data.update !== 'none'"
                class="cursor-pointer"
                @click="updatePlugin(data.name, 'update')"
                >Update</tag
              >
            </div>
          </template>
        </Column>
      </DataTable>
    </div>
  </div>
  <hr class="border-4" style="border-color: #eff3f8" />
  <div class="rounded">
    <h1 class="header">Themes</h1>
    <p class="px-5">Here you can update themes installed in your site.</p>
    <div class="mt-5">
      <DataTable
        :value="themes"
        class="p-datatable-lg"
        :rowHover="true"
        dataKey="index"
        v-model:filters="themeFilter"
        :globalFilterFields="['title']"
      >
        <template #empty>
          <div class="">No Themes found</div>
        </template>
        <template #header>
          <div class="flex bg-white" headstyle="background-color:white">
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
                placeholder="Search by name"
                autocomplete="off"
                v-model="themeFilter['global'].value"
              />
            </div>
          </div>
        </template>
        <Column header="Name" field="title" class=""> </Column>
        <Column header="Status" class="" field="status"> </Column>
        <Column header="Version" field="version"></Column>
        <Column header="Latest" field="update_version">
          <template #body="{ data }">
            {{ showUpdateVersion(data) }}
          </template>
        </Column>
        <Column class="w-5">
          <template #body="{ data }">
            <div class="flex flex-row">
              <tag
                v-if="data.status == 'inactive'"
                class="cursor-pointer mr-5"
                severity="success"
                @click="updateTheme(data.name, 'activate')"
                >Activate</tag
              >
              <tag
                v-if="data.update !== 'none'"
                class="cursor-pointer"
                @click="updateTheme(data.name, 'update')"
                >Update</tag
              >
            </div>
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
import Tag from "primevue/tag";

export default {
  components: { DataTable, Column, Tag },
  data() {
    return {
      plugins: [],
      themes: [],
      selectedPlugins: null,
      pluginFilter: {
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
      },
      themeFilter: {
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
      },
    };
  },
  created() {
    this.$axios
      .get("/site/" + this.$route.params.siteid + "/plugin/list")
      .then((res) => {
        this.plugins = res.data;
      });
    this.$axios
      .get("/site/" + this.$route.params.siteid + "/theme/list")
      .then((res) => {
        this.themes = res.data;
      });
  },
  methods: {
    showUpdateVersion(data) {
      if (!data.update_version) {
        return "Up-to-date";
      } else return data.update_version;
    },
    updatePlugin(name, operation) {
      this.$axios
        .post("/site/" + this.$route.params.siteid + "/plugins", {
          names: [name],
          operation: operation,
        })
        .then((res) => {
          this.plugins = res.data;
          this.$toast.success("Plugin " + operation + "d");
        })
        .catch((res) => {
          this.$toast.error("Failed to " + opertation + " plugin");
        });
    },
    updateTheme(name, operation) {
      this.$axios
        .post("/site/" + this.$route.params.siteid + "/themes", {
          names: [name],
          operation: operation,
        })
        .then((res) => {
          this.themes = res.data;
          this.$toast.success("Theme " + operation + "d");
        })
        .catch((res) => {
          this.$toast.error("Failed to " + opertation + " theme");
        });
    },
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
