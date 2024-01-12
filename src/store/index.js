import { createStore } from "vuex";
import axios from "../axios-instance";

const store = createStore({
  state() {
    return {
      user: {},
      servers: [],
      sites: [],
      currentSite: {},
      currentServer: {
        stats: {
          usedMemory: 0,
          totalMemory: 0,
          uptime: 0,
          usedDisk: 0,
          totalDisk: 0,
          cpuideal: 100,
          loadavg: 0,
          bandwidth: 0,
          cores: 0,
        },
      },
      cpuMetrics: [{ data: [] }],
      cloudflare: {
        api: [],
        zones: [],
        current: {},
      },
      integrations: { backup: [] },
    };
  },
  mutations: {
    changeName(state, newName) {
      state.firstNname = newName;
    },
    setEmail(state, email) {
      state.email = email;
    },
    setServers(state, servers) {
      state.servers = servers;
    },
    setCurrentServer(state, server) {
      state.currentServer = server;
    },
    setSites(state, sites) {
      console.log(sites)
      state.sites = sites;
    },
    setCurrentSite(state, site) {
      state.currentSite = site;
    },
    setCurrentSiteDomain(state, domains) {
      state.currentSite.domains = domains
    },
    setCurrentPHP(state, php) {
      state.currentSite.php = php;
    },
    removeStaging(state) {
      state.currentSite.staging = "";
    },
    updateBackup(state, value) {
      state.currentSite.localbackup = value;
    },
    removeSite(state) {
      state.currentSite = "";
      state.sites = {};
    },
    addMetrics(state, value) {
      state.cpuMetrics = [{ data: value }];
    },
    set7G(state, data) {
      state.currentSite.firewall.sevenG = data;
    },
    initUser(state, data) {
      state.user = data;
    },
    cloudflareApi(state, data) {
      state.cloudflare.api = data;
    },
    cloudflareZones(state, data) {
      state.cloudflare.zones = data;
    },
    cloudflareCurrent(state, data) {
      state.cloudflare.current = data;
    },
    setUser(state, data) {
      state.user = data;
    },
    setUserIntegration(state, data) {
      state.integrations = data;
    },
    deleteDomain(state, data) {
      state.currentSite.domains = state.currentSite.domains.filter((domain) => domain.id !== data);
    }
  },
  actions: {
    getSites({ commit }, route) {
      axios
        .get("/server/" + route.route.params.serverid + "/sites")
        .then((res) => commit("setSites", res.data));
    },
  },
  getters:{
    sites:(state) => (id) => {
      if (typeof state.sites.filter === "function") {
        return state.sites?.filter(site => site?.serverId === id);
      }
      return []
    }
  }

});

export default store;
