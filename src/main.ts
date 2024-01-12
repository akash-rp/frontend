import { createApp } from 'vue';

import App from './App.vue';
import router from './routes';
import store from './store/index';
import PrimeVue from 'primevue/config';
import Button from 'primevue/button';
import axios from './axios-instance';
import Antd from 'ant-design-vue';

import './index.css';
import '../node_modules/primevue/resources/themes/tailwind-light/theme.css'; //theme
import '../node_modules/primevue/resources/primevue.min.css'; //core css
import '../node_modules/primeicons/primeicons.css';
import Toast, { TYPE, useToast } from 'vue-toastification';
import 'vue-toastification/dist/index.css';
import TabView from 'primevue/tabview';
import TabPanel from 'primevue/tabpanel';

const app = createApp(App).use(Antd);

app.config.globalProperties.$axios = axios;
app.config.globalProperties.$toast = useToast();

app.use(router);
app.provide('$store', store);
app.provide('axios', axios);
app.provide('toast', useToast());
console.log(PrimeVue);
app.use(PrimeVue);
app.use(store);
app.use(Toast, {
  transition: 'Vue-Toastification__bounce',
  maxToasts: 20,
  newestOnTop: true,
  toastDefaults: {
    [TYPE.ERROR]: {
      position: 'top-right',
      timeout: 5000,
      closeOnClick: false,
      pauseOnFocusLoss: false,
      pauseOnHover: false,
      draggable: false,
      draggablePercent: 0.6,
      showCloseButtonOnHover: true,
      hideProgressBar: false,
      closeButton: 'button',
      icon: true,
      rtl: false
    },
    [TYPE.SUCCESS]: {
      position: 'top-right',
      timeout: 5000,
      closeOnClick: false,
      pauseOnFocusLoss: false,
      pauseOnHover: false,
      draggable: false,
      draggablePercent: 0.6,
      showCloseButtonOnHover: true,
      hideProgressBar: false,
      closeButton: 'button',
      icon: true,
      rtl: false
    }
  }
});
app.component('Button', Button);

app.mount('#app');
