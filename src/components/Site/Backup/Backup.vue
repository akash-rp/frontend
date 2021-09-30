<template>
  <h1 class="text-3xl font-bold">Backup</h1>
  <div class="mt-4">
    <router-link
      class="options mr-4"
      id="backup"
      :to="/site/ + this.$route.params.siteid + /backups/"
      >Local Backups</router-link
    >
    <router-link
      class="options"
      id="backupSettings"
      :to="/site/ + this.$route.params.siteid + /backups/ + 'settings'"
      >Settings</router-link
    >
  </div>

  <router-view v-slot="{ Component }">
    <keep-alive include="backup">
      <component :is="Component" />
    </keep-alive>
  </router-view>
</template>

<style>
#backup.active {
  border-bottom: 2px solid blue;
}
#backupSettings.active {
  border-bottom: 2px solid blue;
}
</style>
