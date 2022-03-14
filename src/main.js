import { createApp } from "vue";

import App from "./App.vue";
import router from "./routes";
import store from "./store/index";
import VueAxios from "vue-axios";
import PrimeVue from "primevue/config";
import Button from "primevue/button";
import Ripple from "primevue/ripple";
import axios from "./axios-instance";

import "./index.css";
import "../node_modules/primevue/resources/themes/tailwind-light/theme.css"; //theme
import "../node_modules/primevue/resources/primevue.min.css"; //core css
import "../node_modules/primeicons/primeicons.css";
import Tooltip from "primevue/tooltip";
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";

const app = createApp(App);

app.config.globalProperties.$axios = axios;

app.use(router);
app.use(store);
app.use(VueAxios, axios);
app.use(PrimeVue, { ripple: true });
app.use(Toast, {
  transition: "Vue-Toastification__bounce",
  maxToasts: 20,
  newestOnTop: true,
});
app.component("Button", Button);
app.directive("tooltip", Tooltip);
app.directive("ripple", Ripple);
app.mount("#app");
