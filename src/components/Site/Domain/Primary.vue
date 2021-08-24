<template>
  <div
    class="w-screen h-screen flex justify-center items-center bg-gray-900 bg-opacity-50 top-0 left-0 fixed rounded"
    @keydown.esc="$emit('close')"
    tabindex="0"
    ref="addDomain"
    @click.self="$emit('close')"
  >
    <div class="flex flex-col bg-white  w-1/2 rounded">
      <h1 class="text-4xl font-bold p-10 border-b">Primary Domain</h1>
      <div class="  mt-5 px-10 mb-5">
        <span class="inline text-2xl">Do you want to </span>
        <span class="inline text-2xl">make </span>
        <span class="inline-block text-2xl font-bold">{{
          this.primaryUrl
        }}</span>
        <span class="inline text-2xl"> as Primary Domain for site </span>
        <span class="inline text-2xl font-bold">{{ site.name }}</span>
      </div>
      <div class="flex flex-row justify-end mb-5">
        <button
          class="rounded border-2 w-56 font-bold mr-10"
          @click="$emit('close')"
        >
          Cancel
        </button>

        <button
          class="bg-indigo-700 rounded text-white font-bold p-5 w-56 mr-10"
          @click="changePrimary"
        >
          Make Primary
        </button>
        <p v-if="error">{{ error }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["primaryUrl"],
  computed: {
    site() {
      return this.$store.state.currentSite;
    },
  },
  methods: {
    changePrimary() {
      fetch("http://localhost/site/" + this.site.siteId + "/changePrimary", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          url: this.primaryUrl,
          serverid: this.site.serverId,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          if (data.error) {
            console.log(data.error);
          } else {
            let tempSite = this.site.domain.primary;
            this.site.domain.primary = this.site.domain.alias.find((ali) => {
              if (ali.url == this.primaryUrl) return ali;
            });
            this.site.domain.alias = this.site.domain.alias.filter(
              (ali) => ali.url != this.primaryUrl
            );

            this.site.domain.alias.push(tempSite);
            this.$emit("close");
          }
        });
    },
  },
};
</script>
