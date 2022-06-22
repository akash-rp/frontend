<template>
  <section>
    <div class="p-5">
      <h2 class="font-semibold text-xl">Remote Backup</h2>
    </div>
    <a-form
      :model="remoteBackup"
      name="remoteBackup"
      id="remoteBackup"
      autocomplete="off"
      @finish="addRemoteBackup"
      :hideRequiredMark="true"
      layout="horizontal"
    >
      <a-form-item
        name="provider"
        label="Provider"
        :colon="false"
        :rules="[{ required: true, message: 'Please select provider' }]"
      >
        <a-select
          v-model:value="remoteBackup.provider"
          :options="providerOptions"
          @change="getBackupProviderKeys"
        ></a-select>
      </a-form-item>
      <a-form-item
        name="apiKey"
        label="API key"
        :colon="false"
        :rules="[{ required: true, message: 'Please select api key' }]"
      >
        <a-select
          v-model:value="remoteBackup.key"
          :options="apiKeys"
        ></a-select>
      </a-form-item>
    </a-form>
  </section>
</template>

<script>
export default {
  data() {
    return {
      remoteBackup: { provider: "" },
      providerOptions: [{ value: "backblaze", label: "Backblaze B2" }],
      apiKeys: [],
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
      this.$axios.get("/integration/backup").then((res) => {
        this.$store.state.integrations.backup = res.data.backup;
      });
    },
  },
};
</script>

<style lang="scss" scoped></style>
