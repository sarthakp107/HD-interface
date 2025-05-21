import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    authenticated: false,
    userEmail: '',
    userName: '', 
    userId: null
  }),
  actions: {
    login(email, name, id) {
      this.authenticated = true
      this.userEmail = email
      this.userName = name || 'Guest'
      this.userId = id 
    },
    logout() {
      this.authenticated = false
      this.userEmail = ''
      this.userName = ''
      this.userId = null
    }
  }
})
