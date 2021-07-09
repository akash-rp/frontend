import { createStore } from "vuex";

const store = createStore({
  state() {
    return {
      firstName: "",
      email: "",
      servers: [],
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
  },
});

export default store;
