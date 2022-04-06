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
      fetch("http://localhost/site/" + this.site.siteId + "/wildcard", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          url: this.url,
          serverid: this.site.serverId,
          wildcard: !this.status,
          type: this.type,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.error) {
            console.log(data.error);
          } else {
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
          }
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
