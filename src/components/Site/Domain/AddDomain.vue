<template>
  <div class="flex flex-col">
    <label for="url" class="font-semibold mb-3">Domain Name</label>
    <input
      type="text"
      id="url"
      class="p-2 border border-gray-600 rounded"
      v-model="url"
      ref="input"
    />
  </div>
  <div class="flex flex-col mt-5">
    <label class="font-semibold mb-2">Domain Type</label>
    <div class="flex flex-row">
      <div class="flex flex-row items-center">
        <input
          type="radio"
          id="alias"
          class="form-radio h-4 w-4 mr-2"
          value=2
          v-model="type"
        />
        <label for="alias" class="text-xl mr-10">Alias</label>
      </div>
      <div class="flex flex-row items-center">
        <input
          type="radio"
          id="redirect"
          class="form-radio h-4 w-4 mr-2"
          value=3
          v-model="type"
        />
        <label for="redirect" class="text-xl">Redirect</label>
      </div>
    </div>
  </div>

  <p v-if="error">{{ error }}</p>
</template>

<script>
export default {
  props: ["site"],

  data() {
    return {
      url: "",
      type: 2,
      error: "",
    };
  },
  methods: {},
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

.form-radio {
  accent-color: var(--indigo-700);
}
</style>
