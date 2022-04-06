<template>
  <p>
    The 7G Firewall offers lightweight, server-level protection against a wide
    range of malicious requests, bad bots, automated attacks, spam, and many
    other types of threats and nonsense.
  </p>
  <div>
    <div class="mt-5 mb-7">
      <label for="enable" class="w-52 inline-block">Enable WAF</label>
      <a-switch
        id="enable"
        v-model:checked="enabled"
        checked-children="On"
        un-checked-children="Off"
      />
    </div>
    <div class="mb-7">
      <label for="agent" class="w-52 inline-block">Block Bad Agents</label>
      <a-switch
        id="agent"
        v-model:checked="waf['agent']"
        checked-children="On"
        un-checked-children="Off"
        :disabled="!enabled"
      />
    </div>
    <div class="mb-7">
      <label for="host" class="w-52 inline-block">Block Bad Hosts</label>
      <a-switch
        id="host"
        v-model:checked="waf['host']"
        checked-children="On"
        un-checked-children="Off"
        :disabled="!enabled"
      />
    </div>
    <div class="mb-7">
      <label for="query" class="w-52 inline-block"
        >Block Bad Query Strings</label
      >
      <a-switch
        id="query"
        v-model:checked="waf['query']"
        checked-children="On"
        un-checked-children="Off"
        :disabled="!enabled"
      />
    </div>
    <div class="mb-7">
      <label for="request" class="w-52 inline-block">Block Bad Requests</label>
      <a-switch
        id="request"
        v-model:checked="waf['request']"
        checked-children="On"
        :disabled="!enabled"
        un-checked-children="Off"
      />
    </div>
    <div class="mb-7">
      <label for="referrer" class="w-52 inline-block"
        >Block Bad Referrers</label
      >
      <a-switch
        id="referrer"
        v-model:checked="waf['referrer']"
        checked-children="On"
        :disabled="!enabled"
        un-checked-children="Off"
      />
    </div>
  </div>
  <Button label="Update" :loading="loading['update']" @click="update7g" />
</template>

<script>
import Button from "primevue/button";

export default {
  components: { Button },
  data() {
    return {
      loading: {},
      enabled: false,
      waf: {
        query: false,
        method: false,
        request: false,
        agent: false,
        host: false,
        referrer: false,
      },
    };
  },
  watch: {
    enabled(data) {
      Object.keys(this.waf).forEach((key) => {
        this.waf[key] = data;
      });
    },
  },
  created() {
    console.log("next error");
    this.enabled = this.$store.state.currentSite.firewall.sevenG.enabled;
    this.$store.state.currentSite.firewall.sevenG.disable.forEach((item) => {
      this.waf[item] = false;
    });
  },
  methods: {
    update7g() {
      this.loading["update"] = true;
      let disable = [];
      for (let [key, value] of Object.entries(this.waf)) {
        if (!value) {
          disable.push(key);
        }
      }
      console.log("before axios");
      this.$axios
        .post(
          "/site/" + this.$route.params.siteid + "/firewall/sevenG/update",
          {
            enabled: this.enabled,
            disable: disable,
          }
        )
        .then((res) => {
          this.$store.commit("setCurrentSite", res.data);
          this.$toast.success("Updated 7G WAF");
        })
        .catch((error) => {
          console.log(error);
          this.$toast.error("Failed to update 7G WAF");
        })
        .finally(() => {
          this.loading["update"] = false;
        });
    },
  },
};
</script>

<style></style>
