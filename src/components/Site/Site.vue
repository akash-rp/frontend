<template>
  <div class="flex flex-col w-full mt-10 ml-10 w-60">
    <header class="flex items-center">
      <h1 class="head_name">{{ site.name }}</h1>
    </header>
    <main class="flex mt-5">
      <div class="flex flex-col mr-10">
        <router-link class="options" :to="/site/ + this.$route.params.siteid"
          >Summary</router-link
        >
        <router-link
          class="options"
          :to="/site/ + this.$route.params.siteid + /domains/"
          >Domains</router-link
        >
        <router-link
          class="options"
          :to="/site/ + this.$route.params.siteid + /php/"
          >PHP</router-link
        >
        <a href="#" class="options">Settings</a>
        <a href="#" class="options">Litespeed</a>
        <router-link
          class="options"
          :to="/site/ + this.$route.params.siteid + /backups/"
          >Backup</router-link
        >
        <a href="#" class="options">Tools</a>
        <a href="#" class="options">Firewall</a>
        <a href="#" class="options">Logs</a>
        <a href="#" class="options">Delete Site</a>
      </div>
      <div class="main main_bg">
        <router-view></router-view>
      </div>
    </main>
  </div>
</template>

<script>
export default {
  created() {
    this.getSite();
  },
  watch: {
    "$route.params.siteid"() {
      if (this.$route.params.siteid == undefined) {
        return;
      }
      this.getSite();
    },
  },

  methods: {
    getSite() {
      fetch("http://localhost/site/" + this.$route.params.siteid)
        .then((response) => response.json())
        .then((data) => this.$store.commit("setCurrentSite", data[0]));
    },
    domainAdd(data) {
      this.site.domain = data.domain;
    },
  },
  computed: {
    site() {
      return this.$store.state.currentSite;
    },
  },
};
</script>

<style></style>
