<template>
  <div>
    <!-- Add SSL -->
    <a-modal
      v-model:visible="showAddSSL"
      title="Add SSL Certificate"
      style="border-radius: 1rem"
      :destroyOnClose="true"
    >
      <template #footer>
        <button
          class="py-2 px-4 font-medium border border-black rounded"
          @click="showAddSSL = false"
        >
          Cancel
        </button>
        <button
          class="py-2 px-4 bg-indigo-700 text-white rounded pointer"
          html-type="submit"
          form="deploySSL"
        >
          Add SSL
        </button>
      </template>

      <AddSsl
        :list="showList"
        @close="showAddSSL = false"
        @certs="updateList"
      ></AddSsl>
    </a-modal>
    <!-- Redeploy SSL -->
    <a-modal
      v-model:visible="showReSSL"
      title="Redeloy SSL Certificate"
      style="border-radius: 1rem"
      :destroyOnClose="true"
    >
      <template #footer>
        <button
          class="py-2 px-4 font-medium border border-black rounded"
          @click="showReSSL = false"
        >
          Cancel
        </button>
        <button
          class="py-2 px-4 bg-indigo-700 text-white rounded pointer"
          html-type="submit"
          form="deploySSL"
        >
          Redeloy SSL
        </button>
      </template>

      <AddSsl :name="cert.name" @close="showAddSSL = fasle"></AddSsl>
    </a-modal>
    <div class="flex flex-row justify-between items-center">
      <h1 class="header">SSL/TLS</h1>
      <button
        class="p-2 bg-indigo-700 text-white font-semibold rounded-md mr-5"
        @click="showAddSSL = true"
      >
        Add SSL
      </button>
    </div>
    <div>
      <DataTable
        :value="showList"
        class="p-datatable-lg mt-5"
        :rowHover="true"
        dataKey="name"
      >
        <template #empty>
          <div class="">No Certificates Available</div>
        </template>

        <Column
          field="domains"
          header="Domain"
          headerStyle="background-color:#eff3f8;"
        >
          <template #body="{ data }">
            <pre
              >{{ data.domains.join("\n") }}
           </pre
            >
          </template>
        </Column>
        <Column
          field="expiry"
          header="Expiry"
          headerStyle="background-color:#eff3f8;"
          bodyClass=""
        >
        </Column>
        <Column headerStyle="background-color:#eff3f8;">
          <template #body="{ data }">
            <a-dropdown :trigger="['click']">
              <a class="ant-dropdown-link" @click.prevent>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
                  />
                </svg>
              </a>
              <template #overlay>
                <a-menu @click="menuClick($event, data)">
                  <a-menu-item key="1">
                    <div class="flex flex-row text-indigo-700 py-1">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-6 w-6 mr-2"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        stroke-width="2"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                        />
                      </svg>
                      Redeploy
                    </div>
                  </a-menu-item>
                  <a-menu-item key="2">
                    <div class="flex flex-row text-red-700 py-1">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-6 w-6 mr-2"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        stroke-width="2"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                      Delete
                    </div>
                  </a-menu-item>
                </a-menu>
              </template>
            </a-dropdown>
          </template>
        </Column>
      </DataTable>
    </div>
  </div>
</template>

<script>
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import AddSsl from "./AddSsl.vue";
export default {
  components: { DataTable, Column, AddSsl },
  data() {
    return {
      showList: [],
      showAddSSL: false,
      showReSSL: false,
      cert: {},
    };
  },
  created() {
    console.log("Created");
    this.$axios
      .get("/site/" + this.$route.params.siteid + "/cert/list")
      .then((res) => {
        this.showList = res.data;
      })
      .catch(() => {
        this.$toast.error("Failed to get certs");
      });
  },
  methods: {
    menuClick({ key }, data) {
      console.log(data);
      if (key == 1) {
        this.showReSSL = true;
        this.cert = data;
      }
    },
    updateList(data) {
      this.showList = data;
    },
  },
};
</script>

<style lang="scss" scoped></style>
