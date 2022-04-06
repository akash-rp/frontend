<template>
  <div class="flex flex-col">
    <div class="flex flex-col">
      <p class="">
        All files, database and backup of the staging site
        <b>{{ name }}</b> will be deleted. It is not recoverable
      </p>
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
