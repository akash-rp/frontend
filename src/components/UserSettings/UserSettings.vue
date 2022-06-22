<template>
  <div class="flex flex-col">
    <header class="flex items-center py-4">
      <h1 class="text-3xl font-semibold">User Settings</h1>
    </header>
    <main class="flex">
      <settings :menuItems="menuItems"></settings>
      <router-view></router-view>
      <!-- <router-view></router-view> -->
    </main>
  </div>
</template>

<script>
import Settings from "../UserSettings/SideOptions.vue";

export default {
  components: { Settings },
  data() {
    return {
      menuItems: [{ name: "Integration", to: "/integration" }],
    };
  },
};
</script>

<style lang="scss" scoped></style>
