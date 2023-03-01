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
        label="Label"
        name="name"
        :rules="[{ required: true, message: 'Name is required!' }]"
      >
        <a-input
          v-model:value="integration.name"
          placeholder="Enter Name For API"
        />
      </a-form-item>

      <a-form-item
        label="Service Type"
        name="service"
        :rules="[{ required: true, message: 'Please select service type' }]"
      >
        <a-select
          v-model:value="integration.service"
          :options="serviceOptions"
          placeholder="Select Service"
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
          placeholder="Select Provider"
        ></a-select>
      </a-form-item>
      <div v-if="integration.provider == 'backblaze'">
        <a-form-item
          label="Key ID"
          name="accessKey"
          :rules="[{ required: true, message: 'Key is required!' }]"
        >
          <a-input
            v-model:value="integration.accessKey"
            placeholder="Enter Key ID"
          />
        </a-form-item>
        <a-form-item
          label="Application Key"
          name="secretKey"
          :rules="[{ required: true, message: 'Key is required!' }]"
        >
          <a-input
            v-model:value="integration.secretKey"
            placeholder="Enter Application Key"
          />
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
          <a-input
            v-model:value="integration.accessKey"
            placeholder="Enter Access Token"
          />
        </a-form-item>
        <a-form-item
          label="Secret Key"
          name="secretKey"
          :rules="[{ required: true, message: 'Key is required!' }]"
        >
          <a-input
            v-model:value="integration.secretKey"
            placeholder="Enter Secret Key"
          />
        </a-form-item>
        <a-form-item
          label="Region"
          name="region"
          :rules="[{ required: true, message: 'Select Region' }]"
          v-if="integration.service == 'backup'"
        >
          <a-select
            v-model:value="integration.region"
            :options="regionOptions"
            placeholder="Select Region"
          ></a-select>
        </a-form-item>
      </div>

      <a-form-item
        label="Access Token"
        name="accessKey"
        :rules="[{ required: true, message: 'Key is required!' }]"
        v-if="integration.service == 'dns'"
      >
        <a-input
          v-model:value="integration.accessKey"
          placeholder="Enter Access Token"
        />
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      integration: {
        name: undefined,
        service: undefined,
        provider: undefined,
        accessKey: undefined,
        secretKey: undefined,
        region: undefined,
      },
      serviceOptions: [
        { value: "backup", label: "Backup storage" },
        { value: "dns", label: "DNS" },
      ],
      providerOptions: [],
      regionOptions: [],
    };
  },
  methods: {
    addIntegration() {
      this.$axios
        .post("/integration/add/" + this.integration.service, {
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
      this.integration.provider = undefined;
      switch (this.integration.service) {
        case "backup":
          return (this.providerOptions = [
            { value: "backblaze", label: "Backblaze B2" },
            { value: "aws", label: "AWS S3" },
            { value: "wasabi", label: "Wasabi" },
          ]);
        case "dns":
          return (this.providerOptions = [
            { value: "Cloudflare", label: "Cloudflare" },
            { value: "Digitalocean", label: "DigitalOcean" },
          ]);
      }
    },
    "integration.provider"() {
      switch (this.integration.provider) {
        case "wasabi":
          this.regionOptions = [
            { label: "US East 1", value: "us-east-1" },
            { label: "US East 2 ", value: "us-east-2" },
            { label: "US Central 1 ", value: "us-central-1" },
            { label: "US West 1 ", value: "us-west-1" },
            { label: "CA Central 1 ", value: "ca-central-1" },
            { label: "EU Central 1 ", value: "eu-central-1" },
            { label: "EU Central 2 ", value: "eu-central-2" },
            { label: "EU West 1 ", value: "eu-west-1" },
            { label: "EU West 2 ", value: "eu-west-2" },
            { label: "AP Northeast 1", value: "ap-northeast-1" },
            { label: "AP Northeast 2", value: "ap-northeast-2" },
            { label: "AP Southeast 1", value: "ap-southeast-1" },
            { label: "AP Southeast 2", value: "ap-southeast-2" },
          ];
          break;
        case "aws":
          this.regionOptions = [
            { label: "US East 1", value: "us-east-1" },
            { label: "US East 2 ", value: "us-east-2" },
            { label: "US West 1 ", value: "us-west-1" },
            { label: "US West 2 ", value: "us-west-2" },
            { label: "AF South 1", value: "af-south-1" },
            { label: "AP East 1", value: "ap-east-1" },
            { label: "AP Southeast 3", value: "ap-southeast-3" },
            { label: "AP Southeast 1", value: "ap-southeast-1" },
            { label: "AP Southeast 2", value: "ap-southeast-2" },
            { label: "AP South 1", value: "ap-south-1" },
            { label: "AP Northeast 3", value: "ap-northeast-3" },
            { label: "AP Northeast 2", value: "ap-northeast-2" },
            { label: "AP Northeast 1", value: "ap-northeast-1" },
            { label: "CA Central 1 ", value: "ca-central-1" },
            { label: "CN North 1", value: "cn-north-1" },
            { label: "CN Northwest 1", value: "cn-northwest-1" },
            { label: "EU Central 1 ", value: "eu-central-1" },
            { label: "EU West 1", value: "eu-west-1" },
            { label: "EU West 2", value: "eu-west-2" },
            { label: "EU West 3", value: "eu-west-3" },
            { label: "EU North 1", value: "eu-north-1" },
            { label: "EU South 1", value: "eu-south-1" },
            { label: "SA East 1", value: "sa-east-1" },
            { label: "ME South 1", value: "me-south-1" },
          ];
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>
