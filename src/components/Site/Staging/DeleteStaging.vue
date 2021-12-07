<template>
  <div
    class="w-screen h-screen flex justify-center items-center bg-gray-900 bg-opacity-50 top-0 left-0 fixed rounded"
    @keydown.esc="$emit('close')"
    tabindex="0"
    ref="addDomain"
    @click.self="$emit('close')"
  >
    <div class="flex flex-col bg-white w-1/2 rounded">
      <h1 class="text-4xl font-bold p-10 border-b">Delete Staging Site</h1>
      <div class="flex flex-col mt-5 px-10">
        <p class="text-2xl">
          All files, database and backup of the staging site
          <b>{{ name }}</b> will be deleted. It is not recoverable
        </p>
      </div>
      <div class="flex flex-col mt-5 px-10">
        <div class="flex flex-row justify-end mb-5">
          <button
            class="rounded border-2 w-56 font-bold mr-10"
            @click="$emit('close')"
          >
            Cancel
          </button>
          <button
            class="bg-red-700 rounded text-white font-bold p-5 w-56 mr-10"
            @click="deleteStaging"
          >
            Delete Site
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["name"],
  methods: {
    deleteStaging() {
      this.axios
        .get(
          "http://localhost/staging/" +
            this.$store.state.currentSite.staging +
            "/delete"
        )
        .then(() => {
          this.$store.commit("removeStaging");
          this.$emit("close");
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>
