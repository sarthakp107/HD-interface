import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import About from '../views/About.vue'
import News from '../views/News.vue'
import RecipesOnline from '../views/RecipesOnline.vue'
import Login from '../views/Login.vue'
import Signup from '../views/Signup.vue'
import CreateRecipe from '../views/CreateRecipe.vue'
import MyRecipes from '../views/MyRecipes.vue'
import Delete from '../views/Delete.vue'
import Edit from '../views/Edit.vue'
import BrowseRecipes from '../views/BrowseRecipes.vue'

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
  {
    path: '/delete',
    name: 'Delete',

    component: Delete
  },
  {
    path: '/edit',
    name: 'Edit',

    component: Edit
  },
  {
    path: '/browse',
    name: 'BrowseRecipes',

    component: BrowseRecipes
  },
]

const router = createRouter({
  history: createWebHistory('/cos30043/s104817068/hd-interface/'),
  routes
})

export default router
