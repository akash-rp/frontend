<template>
  <p>
    ModSecurity is an open source, cross platform web application firewall. Our
    waf includes
    <b> OWASP ModSecurity Core Rule Set </b>
    and <b> GeoLite2 </b>
    data developed by Maxmind
  </p>
  <div>
    <div class="mt-5 mb-7">
      <label for="enable" class="mr-5 inline-block font-semibold"
        >Enable WAF</label
      >
      <a-switch
        id="enable"
        v-model:checked="enabled"
        checked-children="On"
        un-checked-children="Off"
      />
    </div>
    <div class="pb-7">
      <p class="font-semibold">Paranoia Level</p>
      <p class="mt-2">
        With each paranoia level increase, the CRS enables additional rules,
        giving you a higher level of security. However, higher paranoia levels
        also increase the possibility of blocking some legitimate traffic due to
        false alarms (also named false positives or FPs).
      </p>
      <p class="mt-2">
        <b class="font-medium">Recomended level is 1-2</b>
      </p>
      <a-slider
        v-model:value="level"
        :marks="levelOptions"
        :step="null"
        :tooltip-visible="false"
        :max="4"
        :min="1"
        :disabled="!enabled"
      >
        <template #mark="{ label }">
          {{ label }}
        </template>
      </a-slider>
    </div>
    <div class="pb-5">
      <p class="font-semibold">Anomaly Threshold</p>
      <p class="mt-2">
        Modsecurity assigns a scrore for each secruity risk found in the
        request/response according. If the assigned score is above the anomaly
        threshold the request is blocked.
      </p>
      <p class="mt-2"><b class="font-medium">Recomended score is 5-10</b></p>
      <div class="">
        <a-slider
          v-model:value="threshold"
          :marks="thresholdOptions"
          :disabled="!enabled"
        >
          <template #mark="{ label }">
            {{ label }}
          </template>
        </a-slider>
      </div>
    </div>
    <Button label="Update" @click="updateModsec" :loading="loading['update']" />
  </div>
</template>

<script>
import Button from "primevue/button";

export default {
  components: { Button },
  data() {
    return {
      loading: {},
      enabled: false,
      levelOptions: {
        1: "1",
        2: "2",
        3: "3",
        4: "4",
      },
      thresholdOptions: {
        0: "0",
        100: "100",
      },
      level: 1,
      threshold: 5,
    };
  },
  methods: {
    updateModsec() {
      this.loading["update"] = true;
      this.$axios
        .post(
          "/site/" + this.$route.params.siteid + "/firewall/modsec/update",
          {
            enabled: this.enabled,
            paranoiaLevel: this.level,
            anomalyThreshold: this.threshold,
          }
        )
        .then((res) => {
          this.$store.commit("setCurrentSite", res.data);
          this.$toast.success("Updated Modsecurity WAF");
        })
        .catch(() => {
          this.$toast.error("Modsecurity WAF update failed");
        })
        .finally(() => {
          this.loading["update"] = false;
        });
    },
  },
  created() {
    this.enabled = this.$store.state.currentSite.firewall.modsecurity.enabled;
    this.level =
      this.$store.state.currentSite.firewall.modsecurity.paranoiaLevel;
    this.threshold =
      this.$store.state.currentSite.firewall.modsecurity.anomalyThreshold;
  },
};
</script>

<style lang="scss">
.ant-slider-mark-text:last-of-type {
  width: 100px;
}
</style>
>
