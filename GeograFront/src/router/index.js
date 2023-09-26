import { createRouter, createWebHistory } from 'vue-router'
import LoginPage from '../components/GeoLoginPage.vue'
import MainPage from '../components/GeoMainPage.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'LoginPage',
      component: LoginPage
    },
    {
      path: '/main',
      name: 'MainPage',
      component: MainPage
    },
  ]
})

export default router
