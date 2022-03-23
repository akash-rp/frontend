<template>
  <div
    class="w-screen h-screen flex justify-center items-start bg-gray-900 bg-opacity-50 top-0 left-0 fixed rounded z-50"
    @keydown.esc="$emit('close')"
    tabindex="0"
    ref="addDomain"
    @click.self="$emit('close')"
  >
    <div class="flex flex-col bg-white w-1/2 rounded top-10 mt-48">
      <h1 class="font-bold p-5 text-xl border-b">Wildcard Settings</h1>
      <div class="mt-5 px-5 mb-5">
        <span class="inline">Do you want to </span>
        <span class="inline" v-if="!status">add </span>
        <span class="inline" v-if="status">remove </span>
        <span class="inline">wildcard for domian </span>
        <span class="inline-block font-bold">{{ url }}</span>
      </div>
      <div class="flex flex-row justify-end mb-5 h-10">
        <button
          class="rounded border-2 font-bold p-1 px-2"
          @click="$emit('close')"
        >
          Cancel
        </button>
        <button
          class="bg-indigo-700 rounded text-white font-bold mx-5 p-1 px-2"
          @click="$emit('confirm')"
          v-if="!status"
        >
          Add Wildcard
        </button>
        <button
          class="bg-red-700 rounded text-white font-bold mx-5 p-1 px-2"
          @click="$emit('confirm')"
          v-if="status"
        >
          Remove Wildcard
        </button>
        <p v-if="error">{{ error }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["url", "status"],
  methods: {
    changeWildcard() {
      fetch("http://localhost/site/" + this.site.siteId + "/wildcard", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          url: this.url,
          serverid: this.site.serverId,
          wildcard: !this.status,
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
            this.$store.commit("currentSite", this.site);
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
