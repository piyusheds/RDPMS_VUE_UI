import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import Toast from 'vue-toastification';
import 'vue-toastification/dist/index.css'; 

// BootstrapVue
import 'bootstrap/dist/css/bootstrap.min.css';
import BootstrapVue3 from 'bootstrap-vue-3';

createApp(App)
  .use(router)
  .use(Toast)  
  .use(BootstrapVue3)
  .mount('#app');
