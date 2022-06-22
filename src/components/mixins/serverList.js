import axios from "../../axios-instance";

export default {
  methods: {
    getServersList() {
      axios
        .post("/servers", {
          userId: localStorage.id,
        })

        .then((res) => {
          this.$store.commit("setServers", res.data);
        })
        .catch((err) => (this.error = err));
    },
  },
};
