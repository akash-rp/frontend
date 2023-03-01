import { createRouter, createWebHistory } from "vue-router";

import Login from "./components/Auth/Login.vue";
import Servers from "./components/Server/ServersList.vue";
import Register from "./components/Auth/Register.vue";
import NewServer from "./components/Server/NewServer.vue";
import Server from "./components/Server/Server.vue";
import ServerInfo from "./components/Server/ServerInfo.vue";
import Sites from "./components/Server/Sites.vue";
import NewSite from "./components/Site/NewSite.vue";
import Site from "./components/Site/Site.vue";
import SiteSummary from "./components/Site/Summary.vue";
import Domains from "./components/Site/Domain/Domain.vue";
import PHP from "./components/Site/PHP/PHP.vue";
import Backup from "./components/Site/Backup/Backup.vue";
import BackupSettings from "./components/Site/Backup/BackupSettings.vue";
import BackupListLocal from "./components/Site/Backup/LocalBackupList.vue";
import RemoteBackupList from "./components/Site/Backup/RemoteBackupList.vue";
import Staging from "./components/Site/Staging/Staging.vue";
import ServerHealth from "./components/Server/Health.vue";
import Services from "./components/Server/Services.vue";
import SiteSecurity from "./components/Site/Security/Security.vue";
import ServerSecurity from "./components/Server/Security/Security.vue";
import SystemUser from "./components/Server/SystemUser/SystemUser.vue";
import SshKey from "./components/Server/SshKeys/SshKey.vue";
import PluginAndTheme from "./components/Site/PluginAndTheme.vue";
import ServerSettings from "./components/Server/Settings.vue";
import SiteTools from "./components/Site/Tools.vue";
import DNS from "./components/DnsManagement/Dns.vue";
import UserSettings from "./components/UserSettings/UserSettings.vue";
import Integration from "./components/UserSettings/Integration.vue";
import SSL from "./components/Site/SSL/ssl.vue";

const router = createRouter({
  history: createWebHistory(),

  routes: [
    { path: "/login", component: Login, name: "login" },
    {
      path: "/settings",
      component: UserSettings,
      children: [
        {
          path: "integration",
          component: Integration,
        },
      ],
    },
    {
      path: "/servers",
      component: Servers,
    },
    { path: "/register", component: Register, name: "register" },
    { path: "/createServer", component: NewServer },
    {
      path: "/server/:serverid",
      component: Server,
      children: [
        {
          path: "",
          component: ServerInfo,
        },
        {
          path: "sites",
          component: Sites,
        },
        {
          path: "new",
          component: NewSite,
        },
        {
          path: "health",
          component: ServerHealth,
          name: "health",
        },
        {
          path: "services",
          component: Services,
        },
        {
          path: "security",
          component: ServerSecurity,
        },
        {
          path: "users",
          component: SystemUser,
        },
        {
          path: "ssh",
          component: SshKey,
        },
        {
          path: "settings",
          component: ServerSettings,
        },
      ],
    },
    {
      path: "/site/:siteid",
      component: Site,
      children: [
        {
          path: "",
          component: SiteSummary,
        },
        {
          path: "domains",
          component: Domains,
        },
        {
          path: "php",
          component: PHP,
        },
        {
          path: "backup",
          component: Backup,
          children: [
            {
              path: "settings",
              component: BackupSettings,
              name: "backupSettings",
            },
            { path: "", component: BackupListLocal, name: "backup" },
            { path: "remote", component: RemoteBackupList },
          ],
        },
        {
          path: "staging",
          component: Staging,
        },
        {
          path: "security",
          component: SiteSecurity,
        },
        {
          path: "plugins",
          component: PluginAndTheme,
        },
        {
          path: "tools",
          component: SiteTools,
        },
        {
          path: "ssl",
          component: SSL,
        },
      ],
    },
    { path: "/dns-management", component: DNS },
    { path: "/sites", component: Servers },
  ],
  linkExactActiveClass: "active",
  linkActiveClass: "link-active",
});

export default router;
