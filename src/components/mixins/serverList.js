import axios from "../../axios-instance";

export default {
  methods: {
    getServersList() {
      axios
        .get("/servers")
        .then((res) => {
          this.$store.commit("setServers", res.data.servers);
        })
        .catch((err) => (this.error = err));
    },
  },
};
