<template>
  <div class="w-full shadow">
    <div class="bg-white flex flex-row justify-between">
      <h1 class="p-5 text-xl font-semibold rounded-t">Sites</h1>
      <router-link
        :to="'/server/' + this.$route.params.serverid + '/new'"
        class="self-center p-2 mr-5 rounded text-white bg-indigo-800 text-sm"
        >Add Site</router-link
      >
    </div>
    <div>
      <DataTable
        :value="sites"
        class="p-datatable-lg"
        :rowHover="true"
        dataKey="siteId"
        selectionMode="single"
        @rowSelect="onSiteRowSelect"
        v-model:filters="filters1"
        :globalFilterFields="['name', 'domains', 'user']"
      >
        <template #empty>
          <div class="">No Sites available</div>
        </template>
        <template #header>
          <div
            class="flex justify-between bg-white items-center"
            headstyle="background-color:white"
          >
            <p class="font-normal">All sites of this server are shown here</p>
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
          </div>
        </template>
        <Column
          field="name"
          header="Name"
          headerStyle="background-color:#eff3f8;"
          bodyClass="font-bold "
        >
        </Column>
        <Column
          field="domains"
          header="Primary Domain"
          headerStyle="background-color:#eff3f8;"
          bodyClass=""
        >
          <template #body="{ data }">
            {{ data.domains[0].url}}
          </template>
        </Column>
        <Column
          field="user"
          header="User"
          headerStyle="background-color:#eff3f8;"
        >
        </Column>
        <Column
          field="php"
          header="PHP"
          headerStyle="background-color:#eff3f8;"
        >
        </Column>

        <Column
          field="type"
          header="Environment"
          headerStyle="background-color:#eff3f8;"
          bodyClass="w-[5%] text-center"
        >
          <template #body="{ data }">
            <tag v-if="data.type === 1">Live</tag>
            <tag v-if="data.type === 2" severity="warning" class="p-1"
              >Staging</tag
            >
          </template>
        </Column>
      </DataTable>
    </div>
  </div>
</template>

<script>
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import Tag from "primevue/tag";
import { FilterMatchMode, FilterOperator } from "primevue/api";
import siteList from "../mixins/siteList";

export default {
  mixins: [siteList],
  data() {
    return {
      filters1: {
        global: { value: null, matchMode: FilterMatchMode.CONTAINS },
      },
    };
  },
  components: { DataTable, Column, Tag },
  props: ["server"],
  created() {
    this.$store.dispatch("getSites", { route: this.$route });
  },

  watch: {
    "$route.params.serverid"() {
      if (this.$route.params.serverid == undefined) {
        return;
      }
      this.$store.dispatch("getSites", { route: this.$route });
    },
  },
  computed: {
    sites() {
      console.log(this.$store.state.sites)
      return this.$store.getters.sites(this.$route.params.serverid)
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
