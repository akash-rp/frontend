<template>
  <div>
    <a-form
      class=""
      :model="ssl"
      name="deploySSL"
      id="deploySSL"
      autocomplete="off"
      :hideRequiredMark="true"
      layout="horizontal"
      :colon="false"
      @finish="addCert"
    >
      <a-form-item
        name="domainName"
        label="Domain"
        :rules="[{ required: true, message: 'Please select Domain' }]"
      >
        <a-select
          class=""
          v-model:value="ssl.domainName"
          :options="domainOptions"
          placeholder="Select Domain"
          :disabled="name"
        ></a-select>
      </a-form-item>
      <a-form-item
        name="provider"
        label="Provider"
        :rules="[{ required: true, message: 'Please select Provider' }]"
      >
        <a-select
          class=""
          v-model:value="ssl.provider"
          :options="providerOptions"
          placeholder="Select Provider"
        ></a-select>
      </a-form-item>
      <a-form-item
        name="challenge"
        label="Challenge Type"
        :rules="[{ required: true, message: 'Please select Challenge' }]"
      >
        <a-select
          class=""
          v-model:value="ssl.challenge"
          @change="listDomains"
          :options="challengeOptions"
          placeholder="Select Challenge"
        ></a-select>
      </a-form-item>
      <div v-if="ssl.challenge == 'dns-01'">
        <a-form-item
          name="dnsProvider"
          label="DNS Provider"
          :rules="[{ required: true, message: 'Please select DNS Provider' }]"
        >
          <a-select
            class=""
            v-model:value="ssl.dnsProvider"
            :options="dnsOptions"
            placeholder="Select DNS Provider"
            :loading="fetchingKeys"
          ></a-select>
        </a-form-item>
        <a-form-item
          name="api"
          label="API Key"
          :rules="[{ required: true, message: 'Please select API' }]"
        >
          <a-select
            class=""
            v-model:value="ssl.api"
            :options="apiKeys"
            placeholder="Select API Key"
            :loading="fetchingKeys"
          ></a-select>
        </a-form-item>
      </div>
      <a-form-item
        name="domains"
        label="Domains"
        :rules="[{ required: true, message: 'Atleast One domain is required' }]"
        v-if="ssl.domainName && ssl.challenge"
      >
        <a-checkbox-group
          v-model:value="ssl.domains"
          name="domainsGroup"
          :options="domainLists"
        />
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
import { parseDomain, fromUrl } from "parse-domain";
export default {
  props: ["list", "name"],
  created() {
    if (this.name) {
      this.ssl.domainName = this.name;
    }
  },
  data() {
    return {
      ssl: {
        domainName: undefined,
        provider: undefined,
        challenge: undefined,
        domains: undefined,
        dnsProvider: undefined,
        api: undefined,
      },
      providerOptions: [{ value: "Letsencrypt" }, { value: "Zerossl" }],
      challengeOptions: [{ value: "http-01" }, { value: "dns-01" }],
      domainLists: [],
      fetchingKeys: false,
      apiKeys: [],
      dnsOptions: [{ value: "Cloudflare" }, { value: "Digitalocean" }],
    };
  },
  computed: {
    domainOptions() {
      if (!this.list) {
        return [];
      }
      let domains = [];
      if (
        this.list.find(
          (cert) =>
            cert.name == this.$store.state.currentSite.domain.primary.url
        )
      ) {
        domains.push({
          value: this.$store.state.currentSite.domain.primary.url,
          disabled: true,
        });
      } else {
        domains.push({
          value: this.$store.state.currentSite.domain.primary.url,
        });
      }
      for (const domain of this.$store.state.currentSite.domain.alias) {
        if (this.list.find((cert) => cert.name == domain.url)) {
          domains.push({ value: domain.url, disabled: true });
        } else {
          domains.push({ value: domain.url });
        }
      }
      return domains;
    },
  },
  methods: {
    getDnsProviderKeys() {
      this.fetchingKeys = true;
      this.$axios
        .get("/integration/dns")
        .then((res) => {
          this.$store.state.integrations.dns = res.data.dns;
        })
        .finally(() => {
          this.fetchingKeys = false;
        });
    },
    listDomains() {
      if (!this.ssl.domainName) {
        return;
      } else if (!this.ssl.challenge) {
        return;
      }
      let domainName = this.ssl.domainName;
      const { subDomains, domain, topLevelDomains } = parseDomain(
        fromUrl(this.ssl.domainName)
      );
      if (subDomains && subDomains.length > 0) {
        this.domainLists = [{ value: domainName, label: domainName }];
      } else {
        this.domainLists = [
          { value: domainName, label: domainName },
          { value: "www." + domainName, label: "www." + domainName },
        ];
        if (this.ssl.challenge == "dns-01") {
          this.domainLists.push({
            value: "*." + domainName,
            label: "*." + domainName,
          });
        }
      }
    },
    addCert() {
      this.$axios
        .post("/site/" + this.$route.params.siteid + "/cert/add", {
          ...this.ssl,
        })
        .then(() => {
          this.$toast.success("SSL Certificate Issued");
        })
        .catch(() => {
          this.$toast.error("Failed to add ssl cert");
        })
        .finally(() => {
          this.$emit("close");
        });
    },
    getApiPerProvider() {
      this.apiKeys = [];
      if (this.$store.state.integrations?.dns) {
        for (let api of this.$store.state.integrations.dns) {
          if (api.provider == this.ssl.dnsProvider) {
            this.apiKeys.push({ value: api.name });
          }
        }
      }
    },
  },
  watch: {
    "ssl.domainName"() {
      console.log("chnaged domain name");
      this.listDomains();
    },
    "ssl.challenge"() {
      this.listDomains();
      if (this.ssl.challenge == "dns-01") {
        this.getDnsProviderKeys();
      }
    },
    "$store.state.integrations.dns": {
      deep: true,
      handler() {
        this.getApiPerProvider();
      },
    },
    "ssl.dnsProvider"() {
      this.getApiPerProvider();
    },
  },
};
</script>

<style lang="scss" scoped></style>
