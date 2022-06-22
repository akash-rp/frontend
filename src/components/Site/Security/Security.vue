<template>
  <h1 class="header">Security</h1>

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
import SevenG from "../Security/7G.vue";
import Modsec from "../Security/modsec.vue";

export default {
  components: { TabView, TabPanel, SevenG, Modsec },
  data() {
    return {};
  },
};
</script>

<style></style>
