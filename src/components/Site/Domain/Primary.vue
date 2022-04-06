<template>
  <div class="flex flex-col rounded">
    <div class="mb-5">
      <span class="inline text-2xl">Do you want to </span>
      <span class="inline text-2xl">make </span>
      <span class="inline-block text-2xl font-bold">{{ this.primaryUrl }}</span>
      <span class="inline text-2xl"> as Primary Domain for site </span>
      <span class="inline text-2xl font-bold">{{ site.name }}</span>
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
  methods: {},
};
</script>
