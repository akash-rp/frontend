<template>
  <div class="bg-white w-full rounded shadow">
    <h1 class="text-xl font-semibold p-5 border-b">Services</h1>
    <div class="">
      <p class="text-gray-500 p-5">
        Manage services of your server. You can Start, Restart, Stop services in
        a single click
      </p>
      <DataTable :value="services" class="p-datatable-lg" dataKey="siteId">
        <Column
          field="service"
          header="Service"
          headerStyle="background-color:#eff3f8;"
          bodyClass="w-72"
        >
        </Column>
        <Column
          field="running"
          header="Status"
          headerStyle="background-color:#eff3f8;"
          bodyClass="w-10"
        >
          <template #body="{ data }">
            <tag
              v-if="data.running == true"
              value="Running"
              severity="success"
            ></tag>
            <tag
              v-if="data.running == false"
              value="Stopped"
              severity="warning"
            ></tag>
          </template>
        </Column>

        <Column
          field="control"
          header=""
          headerStyle="background-color:#eff3f8;"
          bodyClass="control-padding"
        >
          <template #body="{ data }">
            <div v-if="data.running" class="w-fit flex flex-row">
              <div
                class="flex flex-row items-center p-1 rounded control cursor-pointer text-indigo-800"
                @click="controlService(data, 'restart')"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-4 w-4 mr-1"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z"
                    clip-rule="evenodd"
                  />
                </svg>
                <div class="">Restart</div>
              </div>
              <div
                class="flex flex-row items-center p-1 rounded control cursor-pointer ml-2 items-center text-red-800"
                v-if="
                  data.service !== 'Litespeed' &&
                  data.service !== 'Mariadb' &&
                  data.service !== 'PHP'
                "
                @click="controlService(data, 'stop')"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-4 w-4 mr-1"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8 7a1 1 0 00-1 1v4a1 1 0 001 1h4a1 1 0 001-1V8a1 1 0 00-1-1H8z"
                    clip-rule="evenodd"
                  />
                </svg>
                <div class="">Stop</div>
              </div>
            </div>
            <div v-if="!data.running" class="w-fit">
              <div
                class="flex flex-row items-center p-1 rounded control cursor-pointer text-green-800"
                @click="controlService(data, 'start')"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-5 w-5 mr-1"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                    clip-rule="evenodd"
                  />
                </svg>
                <div class="">Start</div>
              </div>
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
import Tag from "primevue/tag";
import { useToast } from "vue-toastification";

export default {
  setup() {
    const toast = useToast();
    return { toast };
  },
  components: { Column, DataTable, Tag },
  data() {
    return {
      services: [],
    };
  },
  methods: {
    getServices() {
      this.$axios
        .get("/server/" + this.$route.params.serverid + "/service/status")
        .then((res) => {
          this.services = res.data;
        })
        .catch(() => {
          this.toast.error("Failed to fetch services");
        });
    },
    controlService(data, control) {
      this.$axios
        .post(
          "/server/" +
            this.$route.params.serverid +
            "/service/" +
            control +
            "/" +
            data.process
        )
        .then((res) => {
          this.services = res.data;
          this.toast.success(data.service + " " + control + "ed");
        })
        .catch(() => {
          this.toast.error("Failed to " + control + " " + data.service);
        });
    },
  },
  activated() {
    this.getServices();
  },
};
</script>

<style lang="scss" scoped>
.control-padding {
  padding: 0 !important;
}
.control:hover {
  background-color: #eff3f8;
}
</style>
