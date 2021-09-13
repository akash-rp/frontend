import { createStore } from "vuex";

const store = createStore({
  state() {
    return {
      firstName: "",
      email: "",
      servers: [],
      sites: {},
      currentSite: {},
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
    setSites(state, sites) {
      state.sites = Object.assign(state.sites, sites);
    },
    setCurrentSite(state, site) {
      state.currentSite = site;
    },
    setCurrentPHP(state, php) {
      state.currentSite.php = php;
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
