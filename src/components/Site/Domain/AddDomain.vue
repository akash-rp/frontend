<template>
  <div
    class="w-screen h-screen flex justify-center items-center bg-gray-900 bg-opacity-50 top-0 left-0 fixed rounded z-50"
    @keydown.esc="$emit('close')"
    tabindex="0"
    ref="addDomain"
    @click.self="$emit('close')"
  >
    <div class="flex flex-col bg-white w-1/2 rounded">
      <h1 class="text-4xl font-bold p-10 border-b">Add New Domain</h1>
      <div class="flex flex-col mt-5 px-10">
        <label for="url" class="text-2xl font-semibold mb-3">Domain Name</label>
        <input
          type="text"
          id="url"
          class="p-5 border border-gray-600 rounded"
          v-model="url"
          ref="input"
        />
      </div>
      <div class="flex flex-col mt-5 px-10">
        <label class="text-2xl font-semibold mb-3">Domain Type</label>
        <div>
          <input
            type="radio"
            id="alias"
            class="form-radio h-7 w-7 mr-5"
            value="alias"
            v-model="type"
          />
          <label for="alias" class="text-2xl mr-10">Alias</label>
          <input
            type="radio"
            id="redirect"
            class="form-radio h-7 w-7 mr-5"
            value="redirect"
            v-model="type"
          />
          <label for="redirect" class="text-2xl">Redirect</label>
        </div>
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
          @click="addDomain"
        >
          Add Domain
        </button>
      </div>
      <p v-if="error">{{ error }}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: ["site"],
  mounted() {
    this.$refs.addDomain.focus();
    this.$refs.input.focus();
  },
  data() {
    return {
      url: "",
      type: "alias",
      error: "",
    };
  },
  methods: {
    addDomain() {
      fetch("http://localhost/site/" + this.site.siteId + "/addDomain", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          url: this.url,
          type: this.type,
          id: this.site.serverId,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          if (data.error) {
            this.error = data.error;
          } else {
            this.$store.commit("setCurrentSite", data);
            this.$emit("close");
          }
        });
    },
  },
};
</script>

<style>
.outside {
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0px;
  left: 0px;
}
</style>
