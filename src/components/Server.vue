<template>
  <div class="flex flex-col w-full mt-10 ml-10 w-60">
    <header class="flex items-center">
      <h1 class="head_name">{{ name }}</h1>
      <p class="head_ip">IP:</p>
      <p class="head_ip ip" id="ip">{{ ip }}</p>
      <svg
        @click.prevent="copyIP"
        class="head_ip_copy"
        version="1.1"
        id="Capa_1"
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        x="0px"
        y="0px"
        viewBox="0 0 488.3 488.3"
        style="enable-background:new 0 0 488.3 488.3;"
        xml:space="preserve"
      >
        <g>
          <g>
            <path
              d="M314.25,85.4h-227c-21.3,0-38.6,17.3-38.6,38.6v325.7c0,21.3,17.3,38.6,38.6,38.6h227c21.3,0,38.6-17.3,38.6-38.6V124
			C352.75,102.7,335.45,85.4,314.25,85.4z M325.75,449.6c0,6.4-5.2,11.6-11.6,11.6h-227c-6.4,0-11.6-5.2-11.6-11.6V124
			c0-6.4,5.2-11.6,11.6-11.6h227c6.4,0,11.6,5.2,11.6,11.6V449.6z"
            />
            <path
              d="M401.05,0h-227c-21.3,0-38.6,17.3-38.6,38.6c0,7.5,6,13.5,13.5,13.5s13.5-6,13.5-13.5c0-6.4,5.2-11.6,11.6-11.6h227
			c6.4,0,11.6,5.2,11.6,11.6v325.7c0,6.4-5.2,11.6-11.6,11.6c-7.5,0-13.5,6-13.5,13.5s6,13.5,13.5,13.5c21.3,0,38.6-17.3,38.6-38.6
			V38.6C439.65,17.3,422.35,0,401.05,0z"
            />
          </g>
        </g>
        <g></g>
        <g></g>
        <g></g>
        <g></g>
        <g></g>
        <g></g>
        <g></g>
        <g></g>
        <g></g>
        <g></g>
        <g></g>
        <g></g>
        <g></g>
        <g></g>
        <g></g>
      </svg>
    </header>
    <main class="flex mt-5">
      <div class="flex flex-col mr-10">
        <router-link
          class="options"
          :to="/server/ + this.$route.params.serverid"
        >
          Summary
        </router-link>

        <a href="#" class="options">Server Health</a>
        <router-link
          class="options"
          :to="/server/ + this.$route.params.serverid + /sites/"
          >Sites</router-link
        >
        <a href="#" class="options">Database</a>
        <a href="#" class="options">System Users</a>
        <a href="#" class="options">SSH Keys</a>
        <a href="#" class="options">Cron Jobs</a>
        <a href="#" class="options">Services</a>
        <a href="#" class="options">Settings</a>
        <a href="#" class="options">PHP</a>
        <a href="#" class="options">OpenLiteSpeed</a>
        <a href="#" class="options">Logs</a>
        <a href="#" class="options">Delete Server</a>
      </div>
      <router-view :server="server" v-if="server"></router-view>
    </main>
  </div>
</template>

<script>
export default {
  data() {
    return {
      server: "",
      error: "",
      name: "",
      ip: "",
    };
  },
  watch: {
    "$route.params.serverid"() {
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
    copyIP() {
      const range = document.createRange();
      range.selectNode(document.getElementById("ip"));
      window.getSelection().addRange(range);
      document.execCommand("copy");
      window.getSelection().removeAllRanges();
    },
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
        if (server.serverId == this.$route.params.serverid) {
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
          console.log(data);
          this.$store.commit("setServers", data);
        })
        .catch((err) => (this.error = err));
    },
  },
};
</script>

<style>
.options.active {
  color: black;
}
</style>
