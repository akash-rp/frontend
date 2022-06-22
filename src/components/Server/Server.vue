<template>
  <div class="flex flex-col" v-if="!notFound">
    <header class="flex items-center py-4">
      <h1 class="text-3xl font-semibold">
        {{ $store.state.currentServer.name }}
      </h1>
    </header>
    <main class="flex" v-if="!loading">
      <settings :menuItems="menuItems" type="server"></settings>
      <router-view v-slot="{ Component }">
        <keep-alive exclude="settings">
          <component :is="Component" :key="$route.fullPath"></component>
        </keep-alive>
      </router-view>
      <!-- <router-view></router-view> -->
    </main>
  </div>
  <NotFound v-if="notFound"></NotFound>
</template>

<script>
import Settings from "../SettingsSidepanel.vue";
import { useToast } from "vue-toastification";
import NotFound from "../NotFound.vue";
export default {
  setup() {
    const toast = useToast();
    return { toast };
  },
  components: { Settings, NotFound },
  data() {
    return {
      server: "",
      error: "",
      menuItems: [
        { name: "Summary", to: "" },
        { name: "Sites", to: "/sites" },
        { name: "Server Health", to: "/health" },
        { name: "Services", to: "/services" },
        { name: "Security", to: "/security" },
        { name: "System Users", to: "/users" },
        { name: "SSH Keys", to: "/ssh" },
        { name: "Settings", to: "/settings" },
      ],
      notFound: false,
      loading: true,
    };
  },
  watch: {
    "$route.params.serverid"() {
      this.getServerInfo();
    },
  },
  activated() {
    this.error = "";
    this.getServerInfo();
  },
  methods: {
    getServerInfo() {
      if (!this.$route.params.serverid) {
        return;
      }
      this.$axios
        .get("/server/" + this.$route.params.serverid)
        .then((res) => {
          var serverid = this.$route.params.serverid;
          var sites = { [serverid]: res.data.sites };
          this.$store.commit("setSites", sites);
          delete res.data.sites;
          console.log(res.data);
          this.$store.commit("setCurrentServer", res.data);
        })
        .catch((err) => {
          if (err.response.status == 404) {
            this.notFound = true;
          }
          this.toast.error("Failed to fetch Resource Usage");
        })
        .finally(() => {
          this.loading = false;
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
