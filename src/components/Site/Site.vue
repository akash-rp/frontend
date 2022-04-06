<template>
  <div class="flex flex-col">
    <header class="flex items-center py-4">
      <svg
        id="Layer_1"
        height="512"
        viewBox="0 0 24 24"
        width="512"
        xmlns="http://www.w3.org/2000/svg"
        data-name="Layer 1"
        class="w-6 h-6 fill-indigo-800 mr-2"
      >
        <path
          d="m5 11.5a1.5 1.5 0 0 1 1.5-1.5h11a1.5 1.5 0 0 1 0 3h-11a1.5 1.5 0 0 1 -1.5-1.5zm1.5 6.5h7a1.5 1.5 0 0 0 0-3h-7a1.5 1.5 0 0 0 0 3zm17.5-11.5v11a5.506 5.506 0 0 1 -5.5 5.5h-13a5.506 5.506 0 0 1 -5.5-5.5v-11a5.506 5.506 0 0 1 5.5-5.5h13a5.506 5.506 0 0 1 5.5 5.5zm-16-2a1.5 1.5 0 1 0 1.5-1.5 1.5 1.5 0 0 0 -1.5 1.5zm-5 0a1.5 1.5 0 1 0 1.5-1.5 1.5 1.5 0 0 0 -1.5 1.5zm18 3.5h-18v9.5a2.5 2.5 0 0 0 2.5 2.5h13a2.5 2.5 0 0 0 2.5-2.5z"
        />
      </svg>
      <h1 class="text-3xl font-semibold">{{ site.name }}</h1>
    </header>
    <main class="flex">
      <settings :menuItems="menuItems" type="site"></settings>
      <div class="w-full bg-white rounded shadow">
        <router-view></router-view>
      </div>
    </main>
    <delete-site v-if="showDeletePopup == true"></delete-site>
  </div>
</template>

<script>
import DeleteSite from "./DeleteSite.vue";
import Settings from "../SettingsSidepanel.vue";
export default {
  data() {
    return {
      showDeletePopup: false,
      menuItems: [
        { name: "Summary", to: "" },
        { name: "Domains", to: "/domains" },
        { name: "PHP", to: "/php" },
        { name: "Firewall", to: "/firewall" },
        { name: "Backup", to: "/backup", class: "backup" },
        { name: "Staging", to: "/staging" },
      ],
    };
  },
  created() {
    this.getSite();
  },
  components: { DeleteSite, Settings },
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
        .then((data) => this.$store.commit("setCurrentSite", data));
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
