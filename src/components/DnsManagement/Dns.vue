<template>
  <div>
    <h1 class="text-3xl font-medium py-4">DNS Management</h1>
    <div class="bg-white shadow">
      <div>
        <DataTable
          :value="domains"
          class="p-datatable-lg"
          :rowHover="true"
          dataKey="serverId"
          selectionMode="single"
          @rowSelect="onRowSelect"
        >
          <template #empty>
            <div class="">No Domains found</div>
          </template>
          <template #header>
            <div class="flex flex-row justify-between">
              <a-select
                v-model:value="api"
                show-search
                placeholder="Please select an api key"
                :options="$store.state.cloudflare.api"
                @select="fetchZones"
              ></a-select>
              <button>Add New Domain</button>
            </div>
          </template>

          <Column
            field="domain"
            header="Domain"
            headerStyle="background-color:#eff3f8;"
            bodyClass="font-bold"
          >
          </Column>
          <Column
            field="account"
            header="Account"
            headerStyle="background-color:#eff3f8;"
          ></Column>

          <Column
            field="status"
            header="Status"
            headerStyle="background-color:#eff3f8;"
          ></Column>
        </DataTable>
      </div>
    </div>
  </div>
</template>

<script>
import DataTable from "primevue/datatable";
import Column from "primevue/column";
export default {
  components: { DataTable, Column },
  data() {
    return {
      domains: [],
      api: undefined,
    };
  },
  created() {
    this.$axios
      .post("/integration/cloudflare", {
        id: localStorage.id,
      })
      .then((res) => {
        let apis = res.data;
        apis.map((api) => {
          api.value = api.label;
        });
        this.$store.commit("cloudflareApi", res.data);
      })
      .catch(() => {
        this.$toast.error("Failed to fetch api list");
      });
  },
  methods: {
    fetchZones() {
      this.$axios.get("/dns/" + this.api);
    },
  },
};
</script>

<style lang="scss" scoped></style>
