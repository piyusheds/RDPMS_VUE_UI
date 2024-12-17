import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

// Import Bootstrap CSS
import 'bootstrap/dist/css/bootstrap.min.css'
// Import BootstrapVue CSS (optional, but it adds custom styles)
import 'bootstrap-vue/dist/bootstrap-vue.css'

// Import BootstrapVue
import BootstrapVue3 from 'bootstrap-vue-3'
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import BootstrapVue from 'bootstrap-vue';
import { BCard } from 'bootstrap-vue';
import { Chart } from 'chart.js';



createApp(App)
  .use(router)  // Use the router (if you have routing setup)
  .use(BootstrapVue3)  // Use BootstrapVue3
  .mount('#app')

  
  