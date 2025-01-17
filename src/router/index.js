import { createRouter, createWebHistory } from 'vue-router';
import Sign from '../components/Sign.vue';
import RegisterUp from '../components/RegisterUp.vue';
import ForgetPsw from '../views/ForgetPsw.vue';
import AddDeviceTable from '../views/DeviceSection/AddDeviceTable.vue';
import UserTable from '../views/Users/UserTable.vue';
import Home from '../views/Home.vue';
import About from '../views/About.vue';
import AddDevices from '../views/DeviceSection/AddDevices.vue';
import LoginService from '../Services/LoginService';
import HistoryData from '../views/Data/HistoryData.vue';
import LiveData from '../views/Data/LiveData.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/register',
      name: 'Register',
      component: RegisterUp,
    },
    {
      path: '/forget',
      name: 'Forget',
      component: ForgetPsw,
    },
    {
      path: '/UserTable',
      name: 'UserTable',
      component: UserTable,
      meta: { requiresAuth: true },
    },
    {
      path: '/AddDevices',
      name: 'AddDevices',
      component: AddDevices,
      meta: { requiresAuth: true },
    },
    {
      path: '/AddDeviceTable',
      name: 'AddDeviceTable',
      component: AddDeviceTable,
      meta: { requiresAuth: true },
    },
    {
      path: '/HistoryData',
      name: 'HistoryData',
      component: HistoryData,
      meta: { requiresAuth: true },
    },
    {
      path: '/LiveData',
      name: 'LiveData',
      component: LiveData,
      meta: { requiresAuth: true },
    },
    {
      path: '/home',
      name: 'home',
      component: Home,
      meta: { requiresAuth: true },
    },
    {
      path: '/forgetPsw',
      name: 'forgetpsw',
      component: ForgetPsw,
    },
    {
      path: '/about',
      name: 'about',
      component: About,
    },
    {
      path: '/sign',
      name: 'sign',
      component: Sign,
    },
  ],
});

// Navigation guard to check for authentication before accessing protected routes
router.beforeEach((to, from, next) => {
  const token = LoginService.getToken(); // Get token from auth service
  const isAuthenticated = !!token;

  // If route requires authentication and user is not authenticated, redirect to sign page
  if (to.meta.requiresAuth && !isAuthenticated) {
    next({ name: 'sign' }); // Redirect to the sign page if not authenticated
  } else {
    next(); // Proceed to the route
  }
});

// Store the route in localStorage only if not already storing it to prevent the loop
router.beforeEach((to, from, next) => {
  if (to.path !== from.path) {
    // Store the current route if it isn't already stored in localStorage
    localStorage.setItem('currentRoute', to.fullPath);
  }
  next();
});

// Handle restoring the route after a page refresh, but only if authenticated
router.afterEach((to) => {
  const token = LoginService.getToken();
  if (token) {
    const storedRoute = localStorage.getItem('currentRoute');
    if (storedRoute && to.fullPath !== storedRoute) {
      // Prevent navigating to the stored route again if already on it
      router.push(storedRoute); // Restore the previous route from localStorage
    }
  }
});

export default router;
