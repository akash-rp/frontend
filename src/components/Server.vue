<template>
  <div class="Server">
    <h1 class="Server_name">{{ name }}</h1>

    <div class="Server_option">
      <a href="#" class="options">Info</a>
    </div>

    <div class="Server_details">
      <server-info :server="server"></server-info>
      <sites></sites>
    </div>
  </div>
  <p>{{ error }}</p>
</template>

<script>
import ServerInfo from "./Server/ServerInfo";
import Sites from "./Server/Sites.vue";
export default {
  components: { ServerInfo, Sites },
  data() {
    return {
      server: "",
      error: "",
      name: "",
      ip: "",
    };
  },
  watch: {
    $route() {
      this.getServer();
      this.changeData();
    },
    "$store.state.servers"() {
      this.changeData();
    },
  },
  created() {
    this.error = "";
    this.getServer();
    this.changeData();
  },
  methods: {
    getServer() {
      if (!this.$route.params.serverid) {
        return;
      }
      fetch("http://localhost/server/" + this.$route.params.serverid, {
        method: "GET",
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.error) {
            this.server = "";
            this.error = data.error;
            return;
          }
          this.server = data;
        })
        .catch((err) => {
          this.server = "";
          this.error = err;
        });
    },
    changeData() {
      if (!this.$route.params.serverid) {
        return;
      }
      if (this.$store.state.servers.length == 0) {
        if (this.error !== "") {
          return;
        }
        this.setServers();
      }
      let servers = this.$store.state.servers;
      servers.forEach((server) => {
        if (server.serverid == this.$route.params.serverid) {
          this.name = server.name;
          this.ip = server.ip;
        }
      });
    },
    setServers() {
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
          this.$store.commit("setServers", data);
        })
        .catch((err) => (this.error = err));
    },
  },
};
</script>

<style></style>
