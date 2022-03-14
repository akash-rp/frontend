<template>
  <div class="main_bg">
    <h1 class="header">Backup</h1>
    <div class="mt-4">
      <router-link
        class="options mr-4"
        id="backup"
        :to="'/site/' + this.$route.params.siteid + '/backup/'"
        >Local Backups</router-link
      >
      <router-link
        class="options"
        id="backupSettings"
        :to="'/site/' + this.$route.params.siteid + '/backup/' + 'settings'"
        >Settings</router-link
      >
    </div>

    <router-view v-slot="{ Component }">
      <keep-alive include="backup">
        <component :is="Component" />
      </keep-alive>
    </router-view>
  </div>
</template>

<style>
#backup.active {
  border-bottom: 2px solid blue;
}
#backupSettings.active {
  border-bottom: 2px solid blue;
}
</style>
