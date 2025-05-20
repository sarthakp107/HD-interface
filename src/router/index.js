import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import About from '../views/About.vue'
import News from '../views/News.vue'
import RecipesOnline from '../views/RecipesOnline.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/about',
    name: 'about',

    component: About
  },
  {
    path: '/news',
    name: 'news',

    component: News
  },
  {
    path: '/recipes-online',
    name: 'RecipesOnline',

    component: RecipesOnline
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
