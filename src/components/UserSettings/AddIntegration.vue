<template>
  <div>
    <a-form
      :model="integration"
      name="addIntegration"
      id="addIntegration"
      autocomplete="off"
      @finish="addIntegration"
      :hideRequiredMark="true"
      layout="vertical"
    >
      <a-form-item
        label="Name"
        name="name"
        :rules="[{ required: true, message: 'Name is required!' }]"
      >
        <a-input v-model:value="integration.name" />
      </a-form-item>

      <a-form-item
        label="Service Type"
        name="service"
        :rules="[{ required: true, message: 'Please select service type' }]"
      >
        <a-select
          v-model:value="integration.service"
          :options="serviceOptions"
        ></a-select>
      </a-form-item>
      <a-form-item
        label="Provider"
        name="provider"
        :rules="[{ required: true, message: 'Please select provider' }]"
      >
        <a-select
          v-model:value="integration.provider"
          :options="providerOptions"
        ></a-select>
      </a-form-item>
      <div v-if="integration.provider == 'backblaze'">
        <a-form-item
          label="Key ID"
          name="accessKey"
          :rules="[{ required: true, message: 'Key is required!' }]"
        >
          <a-input v-model:value="integration.accessKey" />
        </a-form-item>
        <a-form-item
          label="Application Key"
          name="secretKey"
          :rules="[{ required: true, message: 'Key is required!' }]"
        >
          <a-input v-model:value="integration.secretKey" />
        </a-form-item>
      </div>
      <div
        v-if="integration.provider == 'wasabi' || integration.provider == 'aws'"
      >
        <a-form-item
          label="Access Token"
          name="accessKey"
          :rules="[{ required: true, message: 'Key is required!' }]"
        >
          <a-input v-model:value="integration.accessKey" />
        </a-form-item>
        <a-form-item
          label="Secret Key"
          name="secretKey"
          :rules="[{ required: true, message: 'Key is required!' }]"
        >
          <a-input v-model:value="integration.secretKey" />
        </a-form-item>
        <a-form-item
          label="Region"
          name="region"
          :rules="[{ required: true, message: 'Select Region' }]"
        >
          <a-select
            v-model:value="integration.region"
            :options="providerOptions"
          ></a-select>
        </a-form-item>
      </div>
    </a-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      integration: {
        name: "",
        service: "",
        provider: "",
        accessKey: "",
        secretKey: "",
        region: "",
      },
      serviceOptions: [{ value: "backup", label: "Backup storage" }],
      providerOptions: [],
    };
  },
  methods: {
    addIntegration() {
      this.$axios
        .post("/integration/add", {
          ...this.integration,
        })
        .then((res) => {
          this.$store.commit("setIntegrations", res.data);
          this.$toast.success("Successfully added API key");
        })
        .catch((err) => {
          console.log(err);
          this.$toast.error("Failed to add API key");
        })
        .finally(() => {
          this.$emit("close");
        });
    },
  },
  watch: {
    "integration.service"() {
      switch (this.integration.service) {
        case "backup":
          return (this.providerOptions = [
            { value: "backblaze", label: "Backblaze B2" },
            { value: "aws", label: "AWS S3" },
            { value: "wasabi", label: "Wasabi" },
          ]);
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>
