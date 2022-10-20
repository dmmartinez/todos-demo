import { createRouter, createWebHistory } from 'vue-router'
import TodosPage from '../pages/TodosPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: TodosPage,
      props: { filter: 'all' }
    },
    {
      path: '/active',
      name: 'active',
      component: TodosPage,
      props: { filter: 'active' }
    },
    {
      path: '/completed',
      name: 'completed',
      component: TodosPage,
      props: { filter: 'completed' }
    }
  ]
})

export default router
