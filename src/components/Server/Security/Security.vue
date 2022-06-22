<template>
  <div class="bg-white w-full rounded shadow">
    <h1 class="header">Security</h1>
    <p class="px-5">
      In this section you can manage Firewall, SSH Session and Fail2Ban
    </p>
    <div>
      <tab-view>
        <TabPanel header="Firewall">
          <ufw></ufw>
        </TabPanel>
        <TabPanel header="SSH Session"><ssh></ssh></TabPanel>
        <TabPanel header="Fail2Ban"><failtoban></failtoban></TabPanel>
      </tab-view>
    </div>
  </div>
</template>

<script>
import TabView from "primevue/tabview";
import TabPanel from "primevue/tabpanel";
import Ufw from "./ufw.vue";
import ssh from "./ssh.vue";
import failtoban from "./fail2ban.vue";
export default {
  components: { TabView, TabPanel, Ufw, ssh, failtoban },
};
</script>

<style></style>
