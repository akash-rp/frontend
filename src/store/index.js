import { createStore } from "vuex";

const store = createStore({
  state() {
    return {
      firstName: "",
      email: "",
      servers: [],
      sites: {},
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
      state.sites = Object.assign(state.sites, sites);
    },
    setCurrentSite(state, site) {
      state.currentSite = site;
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
  },
  actions: {
    getSites({ commit }, route) {
      fetch("http://localhost/server/" + route.route.params.serverid + "/sites")
        .then((response) => response.json())
        .then((data) => commit("setSites", data));
    },
  },
});

export default store;
