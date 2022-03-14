<template>
  <div class="main_bg">
    <div class="m-auto mt-12 w-1/2 ">
      <input
        type="text"
        class="border p-4 w-72"
        placeholder="Enter staging URL"
        v-model="url"
      />
      <button
        class="bg-indigo-700 rounded p-4 text-white"
        @click="createStaging"
      >
        Create Staging site
      </button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      url: "",
    };
  },
  methods: {
    createStaging() {
      fetch(
        "http://localhost/site/" +
          this.$store.state.currentSite.siteId +
          "/createstaging",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ url: this.url }),
        }
      )
        .then((res) => res.json())
        .then((data) => {
          if (data.error) {
            console.log("something went wrong");
            return;
          }
          if (data) {
            this.$store.commit("setSites", data);
            this.$router.push(
              "/server/" + this.$store.state.currentSite.serverId + "/sites"
            );
          }
        });
    },
  },
};
</script>

<style></style>
