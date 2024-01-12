<template>
  <div class="border-b">
    <h1 class="header">Site Info</h1>
    <div class="grid grid-col-auto px-5 gap-4 pb-5">
      <div class="">
        <p>Domain</p>
        <input
          class="bg-gray-100 p-1 px-2 rounded"
          :value="primaryDomain.url"
          disabled
        />
      </div>
      <div class="">
        <p>Public Path</p>
        <input
          class="bg-gray-100 p-1 px-2 rounded overscroll-x-auto"
          disabled
          :value="'/home/' + site.user + '/' + site.name + '/public/'"
        />
      </div>
      <div class="">
        <p>Owner</p>
        <input
          disabled
          class="bg-gray-100 p-1 px-2 rounded"
          :value="site.user"
        />
      </div>
      <div class="">
        <p>IP Address</p>
        <input class="bg-gray-100 p-1 px-2 rounded" disabled :value="site.ip" />
      </div>
      <div class="">
        <p>PHP Version</p>
        <input
          class="bg-gray-100 p-1 px-2 rounded"
          disabled
          :value="site.php"
        />
      </div>
    </div>
  </div>
  <div class="border-b">
    <h1 class="header">Database Info</h1>
    <div class="grid grid-col-auto px-5 gap-4 pb-5">
      <div>
        <p>Database Name</p>
        <input
          class="bg-gray-100 p-1 px-2 rounded"
          disabled
          :value="site?.db?.name"
        />
      </div>
      <div>
        <p>Database User</p>
        <input
          class="bg-gray-100 p-1 px-2 rounded"
          disabled
          :value="site?.db?.user"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    site() {
      return this.$store.state.currentSite;
    },
    primaryDomain() {
      return this.$store.state.currentSite.domains.filter(domain => domain.type === 1)[0]
    }
  },
};
</script>

<style lang="scss">
.grid-col-auto {
  grid-template-columns: repeat(auto-fill, minmax(225px, 1fr));
}
</style>
