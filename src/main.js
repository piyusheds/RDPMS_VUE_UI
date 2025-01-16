import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import Toast from 'vue-toastification';
import 'vue-toastification/dist/index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import BootstrapVue3 from 'bootstrap-vue-3';

const app = createApp(App);

app.use(router)
  .use(Toast)
  .use(BootstrapVue3)
  .use(store)
  .mount('#app');

// After the app is mounted, check the token in localStorage
app.config.globalProperties.$onBeforeRouteEnter = async (to, from, next) => {
  const token = localStorage.getItem('authToken');
  if (!token) {
    // Redirect to login if no token is found
    next({ name: 'sign' });
  } else {
    // Proceed with authenticated routes
    next();
  }
};

// Check the token directly after the app is mounted
const token = localStorage.getItem('authToken');
if (!token) {
  router.push({ name: 'sign' }); // Redirect to login page if no token
} else {
  // Proceed with the authenticated user, you can redirect to home page or any protected route
  router.push({ name: 'home' }); // Or your protected route
}
