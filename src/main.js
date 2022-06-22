import { createApp } from "vue";

import App from "./App.vue";
import router from "./routes";
import store from "./store/index";
import VueAxios from "vue-axios";
import PrimeVue from "primevue/config";
import Button from "primevue/button";
import Ripple from "primevue/ripple";
import axios from "./axios-instance";
import Antd from "ant-design-vue";
import "ant-design-vue/dist/antd.css";

import "./index.css";
import "../node_modules/primevue/resources/themes/tailwind-light/theme.css"; //theme
import "../node_modules/primevue/resources/primevue.min.css"; //core css
import "../node_modules/primeicons/primeicons.css";
import Tooltip from "primevue/tooltip";
import Toast, { TYPE } from "vue-toastification";
import "vue-toastification/dist/index.css";
import { useToast } from "vue-toastification";

const app = createApp(App).use(Antd);

app.config.globalProperties.$axios = axios;
app.config.globalProperties.$toast = useToast();

app.use(router);
app.use(store);
app.use(VueAxios, axios);
app.use(PrimeVue, { ripple: true });
app.use(Toast, {
  transition: "Vue-Toastification__bounce",
  maxToasts: 20,
  newestOnTop: true,
  toastDefaults: {
    [TYPE.ERROR]: {
      position: "top-right",
      timeout: 5000,
      closeOnClick: false,
      pauseOnFocusLoss: false,
      pauseOnHover: false,
      draggable: false,
      draggablePercent: 0.6,
      showCloseButtonOnHover: true,
      hideProgressBar: false,
      closeButton: "button",
      icon: true,
      rtl: false,
    },
    [TYPE.SUCCESS]: {
      position: "top-right",
      timeout: 5000,
      closeOnClick: false,
      pauseOnFocusLoss: false,
      pauseOnHover: false,
      draggable: false,
      draggablePercent: 0.6,
      showCloseButtonOnHover: true,
      hideProgressBar: false,
      closeButton: "button",
      icon: true,
      rtl: false,
    },
  },
});
app.component("Button", Button);
app.directive("tooltip", Tooltip);
app.directive("ripple", Ripple);

app.mount("#app");
