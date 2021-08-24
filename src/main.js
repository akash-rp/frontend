import { createApp } from "vue";

import App from "./App.vue";
import router from "./routes";
import store from "./store/index";
import "./index.css";

const app = createApp(App);

app.use(router);
app.use(store);

app.mount("#app");
