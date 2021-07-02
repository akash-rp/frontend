import { createStore } from "vuex";

const store = createStore({
  state() {
    return {
      firstName: "",
      email: "",
    };
  },
  mutations: {
    changeName(state, newName) {
      state.firstNname = newName;
    },
    setEmail(state, email) {
      state.email = email;
    },
  },
});

export default store;
