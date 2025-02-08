import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
// import 'bootstrap/dist/css/bootstrap.min.css';
import BootstrapVue3 from 'bootstrap-vue-3';
import VueApexCharts from 'vue3-apexcharts'; // Import vue3-apexcharts

import Toast from 'vue-toastification';
import 'vue-toastification/dist/index.css'; // Import default theme CSS


import vuetify from './plugins/vuetify';
import '@ag-grid-community/styles/ag-grid.css';
import '@ag-grid-community/styles/ag-theme-alpine.css';

// Import AG Grid Core and Modules
import { ModuleRegistry } from '@ag-grid-community/core';
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model';
// import { AgGridVue } from '@ag-grid-community/vue3';

// Register Modules
const app = createApp(App);
ModuleRegistry.registerModules([ClientSideRowModelModule]);



app.use(router)
  .use(BootstrapVue3)
  .use(vuetify)
  .use(store)
  .use(Toast, {
    position: 'top-right',     
  })
  .component('apexchart', VueApexCharts) // Register apexchart globally
  .mount('#app');

// Global Session Validation with Logout
app.config.globalProperties.$onBeforeRouteEnter = async (to, from, next) => {
  const token = localStorage.getItem('authToken');
  if (!token) {
    // Logout the user by clearing the token and any other session-related data
    localStorage.removeItem('authToken'); // Remove token
    store.dispatch('logout'); // Optionally, trigger store action to handle further logout processes
    // Redirect to login page
    next({ name: 'login' });
  } else {
    // Proceed with authenticated routes
    next();
  }
};

// Optional: Check session on app initialization
const token = localStorage.getItem('authToken');
if (!token) {
  // Logout immediately by clearing the session
  localStorage.removeItem('authToken');
  store.dispatch('logout'); // Trigger store action for logout
  router.push({ name: 'login' }); // Redirect to login page
}
