<template>
  <div class="flex flex-col">
    <div class="mb-5">
      <span class="inline">Do you want to </span>
      <span class="inline" v-if="!status">add </span>
      <span class="inline" v-if="status">remove </span>
      <span class="inline">wildcard for domian </span>
      <span class="inline-block font-bold">{{ url }}</span>
    </div>
  </div>
</template>

<script>
export default {
  props: ["url", "status", "type"],
  methods: {
    changeWildcard() {
      console.log(this.type);
      this.$axios
        .post("/site/" + this.site.siteId + "/wildcard", {
          url: this.url,
          serverid: this.site.serverId,
          wildcard: !this.status,
          type: this.type,
        })

        .then(() => {
          if (this.site.domain.primary.url == this.url) {
            this.site.domain.primary.wildcard = !this.status;
          } else {
            for (let ali of this.site.domain.alias) {
              if (ali.url == this.url) {
                ali.wildcard = !this.status;
                break;
              }
            }
          }
          this.$emit("close");
          // this.$store.commit("currentSite", this.site);
        })
        .catch(() => {
          this.$toast.error("Failed to change wildcard");
        });
    },
  },
  computed: {
    site() {
      return this.$store.state.currentSite;
    },
  },
};
</script>
