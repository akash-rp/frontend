<template>
  <p>{{ server }}</p>
  <p>{{ error }}</p>
  <p @click="$router.push('/server/ajdhhhgf')">Next</p>
</template>

<script>
export default {
  data() {
    return {
      server: "",
      error: "",
    };
  },
  watch: {
    $route() {
      this.getServer();
    },
  },
  created() {
    this.getServer();
  },
  methods: {
    getServer() {
      console.log(this.$route.params.serverid);
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
  },
};
</script>

<style></style>
