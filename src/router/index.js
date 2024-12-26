import { createRouter, createWebHistory } from 'vue-router';
import Sign from '../components/Sign.vue';
import RegisterUp from '../components/RegisterUp.vue';
import ForgetPsw from '../views/ForgetPsw.vue';
import AddDeviceTable from '../views/DeviceSection/AddDeviceTable.vue';
import UserTable from '../views/Users/UserTable.vue';
import Home from '../views/Home.vue';
import About from '../views/About.vue';
import LoginService from '../Services/LoginService';
import AddDevices from '../views/DeviceSection/AddDevices.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'sign',
      component: Sign,
    },
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
      meta: { requiresAuth: true }, // Protect this route
    },
    {
      path: '/AddDevices',
      name: 'AddDevices',
      component: AddDevices,
    },
    {
      path: '/AddDeviceTable',
      name: 'AddDeviceTable',
      component: AddDeviceTable,
      meta: { requiresAuth: true }, // Protect this route
    },
    {
      path: '/home',
      name: 'home',
      component: Home,
      meta: { requiresAuth: true }, // Protect this route
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
  ],
});

// Navigation guard to check for authentication before accessing protected routes
router.beforeEach((to, from, next) => {
  const isAuthenticated = LoginService.isAuthenticated(); // Check if the user is authenticated

  // If the route requires authentication and the user is not authenticated, redirect to SignIn page
  if (to.meta.requiresAuth && !isAuthenticated) {
    next({ name: 'sign' }); // Redirect to the SignIn page
  } else {
    next(); // Allow navigation
  }
});

export default router;
