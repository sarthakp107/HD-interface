<template>
  <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/about">About</router-link> |
    <router-link to="/news">News</router-link> |
    <router-link  to="/recipes-online">Chicken Recipes |</router-link>  
    <router-link  v-if="auth.authenticated" to="/create-recipe"> Create Recipe |</router-link>  
    <router-link  v-if="auth.authenticated" to="/my-recipe"> My Recipe |</router-link>  
    <router-link v-if="!auth.authenticated" to="/login">Login | </router-link>
    <router-link v-if="!auth.authenticated" to="/signup">Sign up | </router-link> 
    <button v-if="auth.authenticated" @click="handleLogout">Logout</button>

  </nav>
  <router-view/>
</template>

<script setup>
import { useAuthStore } from './stores/auth'

const auth = useAuthStore()
function handleLogout() {
  auth.logout();
  this.router.push('/')
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
