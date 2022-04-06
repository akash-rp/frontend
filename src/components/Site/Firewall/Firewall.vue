<template>
  <h1 class="header">Firewall</h1>
  <p class="px-5">
    Firewall gives protection against serveral types of attacks. You can enable
    either <b> 7G WAF, </b><b> Modsec WAF </b>or both.
  </p>
  <div>
    <tab-view>
      <TabPanel header="7G WAF">
        <seven-g></seven-g>
      </TabPanel>
      <TabPanel header="Modsecurity WAF">
        <modsec></modsec>
      </TabPanel>
    </tab-view>
  </div>
</template>

<script>
import TabView from "primevue/tabview";
import TabPanel from "primevue/tabpanel";
import SevenG from "../Firewall/7G.vue";
import Modsec from "../Firewall/modsec.vue";

export default {
  components: { TabView, TabPanel, SevenG, Modsec },
  data() {
    return {};
  },
};
</script>

<style></style>
