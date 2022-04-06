<template>
  <div class="flex flex-col">
    <header class="flex items-center py-4">
      <h1 class="text-3xl font-semibold">{{ name }}</h1>
    </header>
    <main class="flex">
      <settings :menuItems="menuItems" type="server"></settings>
      <router-view v-slot="{ Component }">
        <keep-alive exclude="">
          <component :is="Component" :key="$route.fullPath"></component>
        </keep-alive>
      </router-view>
      <!-- <router-view></router-view> -->
    </main>
  </div>
</template>

<script>
import Settings from "../SettingsSidepanel.vue";
import { useToast } from "vue-toastification";
export default {
  setup() {
    const toast = useToast();
    return { toast };
  },
  components: { Settings },
  data() {
    return {
      server: "",
      error: "",
      name: "Akash",
      menuItems: [
        { name: "Summary", to: "" },
        { name: "Sites", to: "/sites" },
        { name: "Server Health", to: "/health" },
        { name: "Services", to: "/services" },
        { name: "Security", to: "/security" },
      ],
    };
  },
  watch: {
    "$route.params.serverid"() {
      this.getServerInfo();
    },
  },
  created() {
    this.error = "";
    this.getServerInfo();
  },
  methods: {
    getServerInfo() {
      if (!this.$route.params.serverid) {
        return;
      }
      this.$axios
        .get("http://localhost/server/" + this.$route.params.serverid)
        .then((res) => {
          var serverid = this.$route.params.serverid;
          var sites = { [serverid]: res.data.sites };
          this.$store.commit("setSites", sites);
          delete res.data.sites;
          this.$store.commit("setCurrentServer", res.data);
        })
        .catch(() => {
          this.toast.error("Failed to fetch Resource Usage");
        });
    },
  },
};
</script>

<style>
.options.active {
  background-color: #eff3f8;
  font-weight: 600;
}
</style>
