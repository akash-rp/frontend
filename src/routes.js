import { createRouter, createWebHistory } from "vue-router";

import Login from "./components/Login";
import Servers from "./components/ServersList";
import Register from "./components/Register";
import NewServer from "./components/Server/NewServer";
import Server from "./components/Server";
import ServerInfo from "./components/Server/ServerInfo";
import Sites from "./components/Server/Sites";
import NewSite from "./components/Site/NewSite";
import Site from "./components/Site/Site";
import SiteSummary from "./components/Site/Summary";
import Domains from "./components/Site/Domain/Domain";

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
          path: "addsite",
          component: NewSite,
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
      ],
    },
  ],
  linkExactActiveClass: "active",
  linkActiveClass: "",
});

router.beforeEach((to) => {
  if (to.path === "/login" || to.path === "/register") {
    return true;
  } else if (!localStorage.token || localStorage.token == "undefined") {
    return "/login";
  }
});

export default router;
