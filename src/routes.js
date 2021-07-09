import { createRouter, createWebHistory } from "vue-router";

import Login from "./components/Login";
import Servers from "./components/ServersList";
import Register from "./components/Register";
import NewServer from "./components/NewServer";
import Server from "./components/Server";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/login", component: Login, name: "login" },
    { path: "/", redirect: "/servers" },
    { path: "/servers", component: Servers },
    { path: "/register", component: Register, name: "register" },
    { path: "/createServer", component: NewServer },
    { path: "/server/:serverid", component: Server },
  ],
});

router.beforeEach((to) => {
  if (to.path === "/login" || to.path === "/register") {
    return true;
  } else if (!localStorage.token || localStorage.token == "undefined") {
    return "/login";
  }
});

export default router;
