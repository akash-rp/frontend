<template>
  <h1 class="header">Security</h1>

  <div>
    {{$route.name}}
    <a-tabs v-model:activekey="activeTab">
      <a-tab-pane key="1" tab="7G WAF"><seven-g :firewall="firewall" v-if="firewall?.sevenG"></seven-g></a-tab-pane>
      <a-tab-pane key="2" tab="ModSecurity WAF"><ModSec :firewall="firewall" v-if="firewall?.modsecurity"></ModSec></a-tab-pane>
    </a-tabs>
  </div>
</template>

<script>
import TabView from "primevue/tabview";
import TabPanel from "primevue/tabpanel";
import SevenG from "../Security/7G.vue";
import ModSec from "../Security/modsec.vue";

export default {
  components: { TabView, TabPanel, SevenG, ModSec },
  data() {
    return {
      firewall:{},
      activeTab:'1'
    };
  },
  created() {
    this.$axios
        .get("/site/" + this.$route.params.siteid + "/firewall")
        .then((res) => {
          this.firewall = res.data;
        })
        .catch(() => {
          this.$toast.error("Failed to fetch firewall details");
        })
    console.log(this.$route)
  }
};
</script>

<style></style>
