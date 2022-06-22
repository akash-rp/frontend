<template>
  <div
    class="flex flex-col mr-5 shrink-0"
    :class="{ 'w-32': type == 'server', 'w-40': type == 'site' }"
  >
    <router-link
      class="options my-1"
      :class="{ backup: item.name == 'Backup' }"
      v-for="item of menuItems"
      v-bind:key="item.name"
      :to="'/' + type + '/' + id + item.to"
    >
      {{ item.name }}
    </router-link>
  </div>
</template>

<script>
export default {
  props: ["menuItems", "type"],
  computed: {
    id() {
      if (this.type == "server") {
        return this.$route.params.serverid;
      } else {
        return this.$route.params.siteid;
      }
    },
  },
};
</script>

<style>
.link-active.backup {
  font-weight: bold;
}
</style>
