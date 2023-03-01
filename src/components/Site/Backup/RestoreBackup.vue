<template>
  <div class="flex flex-col">
    <p>
      Site:
      <span class="font-bold">{{ this.$store.state.currentSite.name }}</span>
    </p>
    <p>
      Date:
      <span class="font-bold">{{ restore.date }}</span>
    </p>
  </div>
  <div class="flex flex-col">
    <label class="font-semibold my-3">Restore Type</label>
    <a-radio-group v-model:value="restore.type">
      <a-radio style="radioStyle" value="webapp">Wordpress Files</a-radio>
      <a-radio style="radioStyle" value="db">Database</a-radio>
      <a-radio style="radioStyle" value="both">Both</a-radio>
    </a-radio-group>
  </div>
  <div class="bg-gray-100 my-4 px-5 py-2">
    <p class="">{{ restore.message }}</p>
  </div>
</template>

<script>
export default {
  props: ["restore"],
  watch: {
    "restore.type"() {
      if (this.restore.type == "both") {
        this.restore.message =
          "This process will overwrite both Web Application and Database";
      } else if (this.restore.type == "db") {
        this.restore.message = "This process will overwrite Database";
      } else if (this.restore.type == "webapp") {
        this.restore.message = "This process will overwrite Web Application";
      }
    },
  },
};
</script>

<style lang="scss" scoped></style>
