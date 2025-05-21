import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import About from '../views/About.vue'
import News from '../views/News.vue'
import RecipesOnline from '../views/RecipesOnline.vue'
import Login from '../views/Login.vue'
import Signup from '../views/Signup.vue'
import CreateRecipe from '../views/CreateRecipe.vue'
import MyRecipes from '../views/MyRecipes.vue'

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
  },
  {
    path: '/login',
    name: 'Login',

    component: Login
  },
  {
    path: '/signup',
    name: 'Signup',

    component: Signup
  },
  {
    path: '/create-recipe',
    name: 'CreateRecipe',

    component: CreateRecipe
  },
  {
    path: '/my-recipe',
    name: 'MyRecipes',

    component: MyRecipes
  },
]

const router = createRouter({
  history: createWebHistory(''),
  routes
})

export default router
