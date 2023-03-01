<template>
  <section class="p-5">
    <div>
      <h2 class="font-semibold text-xl">Remote Backup</h2>
    </div>
    <a-modal
      title="Remote Storage settings"
      v-model:visible="showRemoteSettingsModal"
      :destroyOnClose="true"
    >
      <template #footer>
        <button
          class="py-2 px-4 font-medium border border-black rounded"
          @click="showRemoteSettingsModal = false"
        >
          Cancel
        </button>
        <button
          class="py-2 px-4 bg-indigo-700 text-white rounded pointer"
          type="submit"
          form="remoteSettings"
          html-type="submit"
        >
          Update
        </button>
      </template>
      <RemoteSettingsModal
        :settings="selectedRow"
        @remoteBackups="setBackups"
      ></RemoteSettingsModal>
    </a-modal>
    <a-form
      class="pt-5"
      :model="remoteBackup"
      name="remoteBackup"
      id="remoteBackup"
      autocomplete="off"
      @finish="addRemoteBackup"
      :hideRequiredMark="true"
      layout="horizontal"
      :labelCol="{ span: 2 }"
      :colon="false"
    >
      <a-form-item
        name="provider"
        label="Provider"
        :rules="[{ required: true, message: 'Please select provider' }]"
      >
        <a-select
          class="w-52"
          v-model:value="remoteBackup.provider"
          :options="providerOptions"
          @change="getBackupProviderKeys"
          placeholder="Select provider"
        ></a-select>
      </a-form-item>
      <a-form-item
        name="apiKey"
        label="API key"
        :rules="[{ required: true, message: 'Please select api key' }]"
        :validateStatus="backendError.apiKey.status"
        :help="backendError.apiKey.message"
      >
        <a-select
          class="w-52"
          v-model:value="remoteBackup.apiKey"
          :options="apiKeys"
          placeholder="Select api key"
          :loading="fetchingKeys"
        ></a-select>
      </a-form-item>
      <a-form-item
        name="bucket"
        label="Bucket"
        :rules="[{ required: true, message: 'Please enter bucket name' }]"
        :validateStatus="backendError.bucket.status"
        :help="backendError.bucket.message"
      >
        <a-input
          class="w-52"
          v-model:value="remoteBackup.bucket"
          placeholder="Bucket Name"
        />
      </a-form-item>
      <a-button htmlType="submit">Add Backup</a-button>
    </a-form>
    <DataTable
      :value="backups"
      class="p-datatable-lg mt-5"
      :rowHover="true"
      dataKey="bucket"
    >
      <template #empty>
        <div class="">No Remote storage Added</div>
      </template>

      <Column
        field="provider"
        header="Storage"
        headerStyle="background-color:#eff3f8;"
        bodyClass=""
      >
        <template #body="{ data }">
          {{ data.provider + "-" + data.bucket }}
        </template>
      </Column>
      <Column headerStyle="background-color:#eff3f8;" field="api" header="API">
      </Column>
      <Column
        field="automatic"
        headerStyle="background-color:#eff3f8;"
        headerClass="m-auto"
      >
        <template #header>
          <div class="m-auto">Automatic Bakup</div>
        </template>
        <template #body="{ data }">
          <div class="flex justify-center">
            <tag v-if="data.automatic" severity="success">On</tag>
            <tag v-if="!data.automatic" severity="danger">Off</tag>
          </div>
        </template>
      </Column>
      <Column
        field="frequency"
        header="Frequency"
        headerStyle="background-color:#eff3f8;"
        class="w-32"
      >
        <template #body="{ data }">
          <div class="flex justify-center">
            <div class="">
              {{ data.automatic ? data.frequency : "-" }}
            </div>
          </div>
        </template>
      </Column>

      <Column headerStyle="background-color:#eff3f8;" class="relative">
        <template #body="{ data }">
          <div
            class="absolute top-1/2 left-1/2 -translate-y-2/4 -translate-x-2/4 p-2 rounded-full hover:bg-white cursor-pointer"
            @click="showRemoteSettings(data)"
          >
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
                d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
              />
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
          </div>
        </template>
      </Column>
      <Column headerStyle="background-color:#eff3f8;" class="relative">
        <template #body>
          <div
            class="absolute top-1/2 left-1/2 -translate-y-2/4 -translate-x-2/4 p-2 rounded-full hover:bg-white cursor-pointer"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5 text-gray-400"
              viewBox="0 0 20 20"
            >
              <path
                fill-rule="evenodd"
                d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                clip-rule="evenodd"
              />
            </svg>
          </div>
        </template>
      </Column>
    </DataTable>
  </section>
</template>

<script>
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import Tag from "primevue/tag";
import Button from "primevue/button";
import RemoteSettingsModal from "./RemoteSettingsModal.vue";
import { Form } from "ant-design-vue";
const useForm = Form.useForm;

export default {
  components: { DataTable, Column, Tag, Button, RemoteSettingsModal },
  data() {
    return {
      remoteBackup: {
        provider: undefined,
        apiKey: undefined,
        bucket: undefined,
      },
      providerOptions: [
        { value: "backblaze", label: "Backblaze B2" },
        { value: "wasabi", label: "Wasabi" },
        { value: "aws", label: "AWS S3" },
      ],
      apiKeys: [],
      fetchingKeys: false,
      backups: [],
      showRemoteSettingsModal: false,
      selectedRow: {},
      backendError: {
        bucket: {
          status: undefined,
          message: undefined,
        },
        apiKey: {
          status: undefined,
          message: undefined,
        },
      },
    };
  },
  watch: {
    "remoteBackup.provider"() {
      this.apiKeys = [];
      if (this.$store.state.integrations?.backup) {
        for (let api of this.$store.state.integrations.backup) {
          if (api.provider == this.remoteBackup.provider) {
            this.apiKeys.push({ value: api.name });
          }
        }
      }
    },

    "$store.state.integrations": {
      deep: true,
      handler() {
        this.apiKeys = [];
        if (this.$store.state.integrations?.backup) {
          for (let api of this.$store.state.integrations.backup) {
            if (api.provider == this.remoteBackup.provider) {
              this.apiKeys.push({ value: api.name });
            }
          }
        }
      },
    },
  },
  methods: {
    getBackupProviderKeys() {
      this.fetchingKeys = true;
      this.$axios
        .get("/integration/backup")
        .then((res) => {
          this.$store.state.integrations.backup = res.data.backup;
        })
        .finally(() => {
          this.fetchingKeys = false;
        });
    },
    addRemoteBackup() {
      this.axios
        .post("/site/" + this.$route.params.siteid + "/backup/remote/add", {
          name: this.remoteBackup.apiKey,
          provider: this.remoteBackup.provider,
          bucketName: this.remoteBackup.bucket,
        })
        .then((res) => {
          this.backups = res.data;
          this.$toast.success("Added Remote Backup");
        })
        .catch((res) => {
          console.log(res.response.data);
          if (res.response.data.errors) {
            res.response.data.errors.forEach((error) => {
              this.backendError[error.field] = {
                status: "error",
                message: error.message,
              };
            });
          }

          this.$toast.error("Failed to add remote backup");
        });
    },
    getRemoteBackups() {
      this.$axios
        .get("/site/" + this.$route.params.siteid + "/backup/remote")
        .then((res) => {
          this.backups = res.data;
        });
    },
    showRemoteSettings(data) {
      this.selectedRow = data;
      this.showRemoteSettingsModal = true;
    },
    setBackups(data) {
      this.showRemoteSettingsModal = false;
      this.backups = data;
    },
  },
  created() {
    this.getRemoteBackups();
  },
};
</script>

<style lang="scss" scoped>
:deep(.ant-form) {
  .ant-form-item-label {
    text-align: start;
  }
}
</style>
