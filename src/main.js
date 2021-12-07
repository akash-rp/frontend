import { createApp } from "vue";

import App from "./App.vue";
import router from "./routes";
import store from "./store/index";
import axios from "axios";
import VueAxios from "vue-axios";
import "./index.css";

const app = createApp(App);

app.use(router);
app.use(store);
app.use(VueAxios, axios);
app.mount("#app");
