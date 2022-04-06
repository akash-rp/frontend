import { createRouter, createWebHistory } from "vue-router";

import Login from "./components/Login/Login.vue";
import Servers from "./components/Server/ServersList.vue";
import Register from "./components/Login/Register.vue";
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
import Staging from "./components/Site/Staging/Staging.vue";
import ServerHealth from "./components/Server/Health.vue";
import Services from "./components/Server/Services.vue";
import Firewall from "./components/Site/Firewall/Firewall.vue";

const router = createRouter({
  history: createWebHistory(),

  routes: [
    { path: "/login", component: Login, name: "login" },
    { path: "/", redirect: "/servers" },
    { path: "/servers", component: Servers },
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
          ],
        },
        {
          path: "staging",
          component: Staging,
        },
        {
          path: "firewall",
          component: Firewall,
        },
      ],
    },
  ],
  linkExactActiveClass: "active",
  linkActiveClass: "link-active",
});

router.beforeEach((to) => {
  if (to.path === "/login" || to.path === "/register") {
    return true;
  } else if (!localStorage.token || localStorage.token == "undefined") {
    return "/login";
  }
});

export default router;
