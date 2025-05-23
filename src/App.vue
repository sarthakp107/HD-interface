<template>
  <nav>
    <router-link to="/">Home</router-link> 
    <router-link to="/about">About</router-link> 
    <router-link to="/news">News</router-link> 
    <router-link  to="/recipes-online">Chicken Recipes </router-link>  
    <router-link  v-if="auth.authenticated" to="/create-recipe"> Create Recipe </router-link>  
    <router-link  v-if="auth.authenticated" to="/my-recipe"> My Recipe </router-link>  
    <router-link  v-if="auth.authenticated" to="/browse"> Browse </router-link>  
    <router-link  v-if="auth.authenticated" to="/drag"> Drag And Drop </router-link>  
     <router-link  v-if="auth.authenticated" to="/delete"> Delete </router-link>  
     <router-link  v-if="auth.authenticated" to="/edit"> Edit </router-link>  
    <router-link v-if="!auth.authenticated" to="/login"> Login </router-link>
    <router-link v-if="!auth.authenticated" to="/signup"> Sign up  </router-link> 
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
  background-color: #f9f9f9;
  padding: 20px;
}

nav {
  padding: 30px;
  background-color: #ffffff;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  border-radius: 8px;
  display: flex;
  justify-content: center;
  gap: 20px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
  text-decoration: none;
  padding: 8px 16px;
  border-radius: 4px;
  transition: background-color 0.3s, color 0.3s;
}

nav a:hover {
  background-color: #e6f4f1;
  color: #42b983;
}

nav a.router-link-exact-active {
  color: #42b983;
  background-color: #e0f7ec;
}

</style>
