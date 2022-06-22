<template>
  <div class="flex flex-col mr-5 shrink-0 w-32">
    <router-link
      class="options my-1"
      v-for="item of menuItems"
      v-bind:key="item.name"
      :to="'/settings' + item.to"
    >
      {{ item.name }}
    </router-link>
  </div>
</template>

<script>
export default {
  props: ["menuItems", "type"],
};
</script>

<style>
.link-active.backup {
  font-weight: bold;
}
</style>
