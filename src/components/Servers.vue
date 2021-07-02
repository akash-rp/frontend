<template>
  <div class="servers">
    <div class="servers__main">
      <h1 class="title">Servers</h1>
      <button class="title__button" @click="$router.push('/createServer')">
        Create Server
      </button>
    </div>
    <div class="servers__padding"></div>
    <div class="server__list">
      <div
        class="server"
        v-for="server in servers"
        v-bind:key="server.name"
        @click="$router.push('/server/' + server.serverid)"
      >
        <img
          class="server__image"
          :src="'/assets/providers/' + server.provider + '.svg'"
        />
        <p class="server__name">{{ server.name }}</p>
        <p class="server__ip">{{ server.ip }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      servers: "",
      error: "",
      providerImg: "",
    };
  },
  created() {
    // fetch the data when the view is created and the data is
    // already being observed
    this.setServers();
  },

  methods: {
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
          this.servers = data;
          console.log(data);
        })
        .catch((err) => (this.error = err));
    },
  },
};
</script>

<style></style>
