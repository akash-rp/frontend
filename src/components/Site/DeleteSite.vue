<template>
  <div
    class="w-screen h-screen flex justify-center items-center bg-gray-900 bg-opacity-50 top-0 left-0 fixed rounded"
    @keydown.esc="$emit('close')"
    tabindex="0"
    ref="addDomain"
    @click.self="$emit('close')"
  >
    <div class="flex flex-col bg-white w-1/2 rounded">
      <h1 class="text-4xl font-bold p-10 border-b">Delete Site</h1>
      <div class="flex flex-col mt-5 px-10">
        <p class="text-2xl">
          All files and database of the site
          <b>{{ name }}</b> will be deleted. It is not recoverable
        </p>
        <p class="text-2xl mt-2">
          And the Staging Site and its files,database and backup will be deleted
        </p>
      </div>
      <div class="flex flex-col mt-5 px-10">
        <label class="text-2xl" for="sitename">
          Enter the site name <b>{{ name }}</b> in the input field to confirm.
        </label>
        <input
          type="text"
          id="sitename"
          class="p-5 border border-gray-600 rounded"
          placeholder="Site Name"
          v-model="checkName"
        />
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
            class="rounded text-white font-bold p-5 w-56 mr-10"
            :class="{
              'cursor-not-allowed bg-red-100': name != checkname,
              'bg-red-700': name == checkname,
            }"
            @click="deleteSite"
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
  methods: {
    deleteSite() {
      if (this.name == this.checkName) {
        this.axios
          .get(
            "http://localhost/site/" +
              this.$store.state.currentSite.staging +
              "/delete"
          )
          .then(() => {
            this.$store.commit("removeSite");
            this.$emit("close");
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },
  },
  data() {
    return {
      name: this.$store.state.currentSite.name,
      checkName: "",
    };
  },
};
</script>
