<template>
  <div class="main_bg">
    <h1 class="header">Backup</h1>
    <div class="">
      <tab-menu :model="items" />
      <router-view v-slot="{ Component }">
        <keep-alive exclude="backupSettings">
          <component :is="Component" />
        </keep-alive>
      </router-view>
      <!-- <router-link
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
      > -->
    </div>

    <!-- <router-view v-slot="{ Component }">
      <keep-alive include="backup">
        <component :is="Component" />
      </keep-alive>
    </router-view> -->
  </div>
</template>

<script>
import TabMenu from "primevue/tabmenu";
export default {
  components: { TabMenu },
  data() {
    return {
      items: [
        {
          label: "Local Backup",
          to: "/site/" + this.$route.params.siteid + "/backup/",
        },
        {
          label: "Remote Backup",
          to: "/site/" + this.$route.params.siteid + "/backup/remote",
        },
        {
          label: "Settings",
          to: "/site/" + this.$route.params.siteid + "/backup/settings",
        },
      ],
    };
  },
};
</script>

<style>
#backup.active {
  border-bottom: 2px solid blue;
}
#backupSettings.active {
  border-bottom: 2px solid blue;
}
.p-tabmenu
  .p-tabmenu-nav
  .p-tabmenuitem
  .p-menuitem-link:not(.p-disabled):focus {
  box-shadow: none !important;
}
</style>
