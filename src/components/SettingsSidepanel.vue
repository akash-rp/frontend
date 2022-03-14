<template>
  <div class="flex flex-col mr-5 w-32 shrink-0">
    <router-link
      class="options"
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

<style></style>
