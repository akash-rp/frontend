<template>
  <h1 class="header">Site Details</h1>
  <div class="flex flex-row p-5 pt-0 gap-x-2">
    <div>
      <p class="font-medium">Domain</p>
      <p class="p-2 text-sm bg-gray-100 rounded">
        {{ data.domain.primary.url }}
      </p>
    </div>
    <div class="">
      <p class="font-medium">Public Path</p>
      <p class="p-2 text-sm bg-gray-100 rounded">
        {{ "/home/" + data.user + "/" + data.name + "/public" }}
      </p>
    </div>
    <div class="">
      <p class="font-medium">User</p>
      <p class="p-2 text-sm bg-gray-100 rounded">
        {{ data.user }}
      </p>
    </div>
    <div class="">
      <p class="font-medium">PHP Version</p>
      <p class="p-2 text-sm bg-gray-100 rounded">
        {{ data.php }}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    data() {
      return this.$store.state.currentSite;
    },
  },
};
</script>

<style lang="scss" scoped>
.site {
  &_lt {
    display: inline-block;
    width: 25%;
    font-size: var(--font-size-primary);
    color: dimgray;
    font-weight: bold;
  }
  &_rt {
    display: inline-block;
    font-size: var(--font-size-primary);
  }
}
.info {
  margin-top: 2rem;
}

.para {
  padding: 1rem 0;
  border-bottom: 1px solid #ccc;
}
.para:last-child {
  border-bottom: none;
}
</style>
