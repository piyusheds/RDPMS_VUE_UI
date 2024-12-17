import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Signin from '../views/Signin.vue'
import Sign from '../components/Sign.vue'
import Register from '../views/Register.vue'
import RegisterUp from '../components/RegisterUp.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: Sign  // Use Sign component here to show sign-in
    },
    {
      path: '/Register',
      component: RegisterUp
    },
    {
      path: '/Home',
      component: Home
    },
    {
      path: '/about',
      component: () => import('../views/About.vue')
    },
  ]
})




export default router