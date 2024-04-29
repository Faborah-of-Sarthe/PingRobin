import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import RoundView from '../views/RoundView.vue'
import ResultsView from '../views/ResultsView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/rounds',
      name: 'rounds',
      component: RoundView
    },
    {
      path: '/results',
      name: 'results',
      component: ResultsView
    }
  ]
})

export default router
