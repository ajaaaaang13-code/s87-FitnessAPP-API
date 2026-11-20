import { createRouter, createWebHistory } from 'vue-router'
import AddWorkout from '@/pages/AddWorkout.vue'
import ErrorPage from '@/pages/Error.vue'
import Home from '@/pages/Home.vue'
import Login from '@/pages/Login.vue'
import Logout from '@/pages/Logout.vue'
import Register from '@/pages/Register.vue'
import { useGlobalStore } from '@/stores/global'

const routes = [
  { path: '/', redirect: '/workouts' },
  { path: '/register', name: 'Register', component: Register },
  { path: '/login', name: 'Login', component: Login },
  { path: '/workouts', name: 'Workouts', component: Home, meta: { requiresAuth: true } },
  { path: '/addWorkouts', name: 'AddWorkout', component: AddWorkout, meta: { requiresAuth: true } },
  { path: '/logout', name: 'Logout', component: Logout },
  { path: '/:pathMatch(.*)*', name: 'Error', component: ErrorPage },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to) => {
  const user = useGlobalStore()

  if (to.meta.requiresAuth && !user.isAuthenticated()) {
    return { name: 'Login', query: { redirect: to.fullPath } }
  }
  if ((to.name === 'Login' || to.name === 'Register') && user.isAuthenticated()) {
    return { name: 'Workouts' }
  }
})

export default router


