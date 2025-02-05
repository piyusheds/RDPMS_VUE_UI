import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
// import 'bootstrap/dist/css/bootstrap.min.css';
import BootstrapVue3 from 'bootstrap-vue-3';
import VueApexCharts from 'vue3-apexcharts'; // Import vue3-apexcharts
import vuetify from './plugins/vuetify'; 

const app = createApp(App);

app.use(router)
  .use(BootstrapVue3)
  .use(vuetify)
  .use(store)
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
    next({ name: 'sign' });
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
  router.push({ name: 'sign' }); // Redirect to login page
}
