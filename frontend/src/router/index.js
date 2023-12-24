import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', name: 'Login', component: () => import ('@/views/LoginView.vue') },
  { path: '/home', name: 'Home', component: () => import ('@/views/HomeView.vue') },
  { path: '/users_data/:id', name:'Dynamic', component: () => import ('@/views/DynamicView.vue') },
  { path: '/:pathMatch(.*)*', name:'NotFound', component: () => import ('@/views/NotFoundView.vue') },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
