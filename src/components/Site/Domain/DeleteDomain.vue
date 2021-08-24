<template>
  <div
    class="w-screen h-screen flex justify-center items-center bg-gray-900 bg-opacity-50 top-0 left-0 fixed rounded"
    @keydown.esc="$emit('close')"
    tabindex="0"
    ref="deleteDomain"
    @click.self="$emit('close')"
  >
    <div class="flex flex-col bg-white  w-1/2 rounded">
      <h1 class="text-4xl font-bold p-10 border-b text-red-700">
        Delete Domain
      </h1>
      <div class="flex flex-col mt-5 px-10 text-2xl mb-10">
        <p>
          Do you realy want to delete domain <slot name="url"></slot> from
          <slot name="name"></slot> Site
        </p>
      </div>
      <div class="flex flex-row justify-end mb-5">
        <button
          class="rounded border-2 w-56 font-bold mr-10"
          @click="$emit('close')"
        >
          Cancel
        </button>
        <button
          class="bg-red-700 rounded text-white font-bold p-5 w-56 mr-10"
          @click="$emit('delete')"
        >
          Delete Domain
        </button>
      </div>
      <!-- <p v-if="error">{{ error }}</p> -->
    </div>
  </div>
</template>

<script>
export default {
  mounted() {
    this.$refs.deleteDomain.focus();
  },
};
</script>

<style></style>
