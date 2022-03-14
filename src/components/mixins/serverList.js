export default {
  methods: {
    getServersList() {
      fetch("http://localhost/servers", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: localStorage.id,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.error) {
            this.error = data.error;
            return;
          }
          console.log(data);
          this.$store.commit("setServers", data);
        })
        .catch((err) => (this.error = err));
    },
  },
};
