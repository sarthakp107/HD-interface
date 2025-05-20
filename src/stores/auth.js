import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    authenticated: false,
    userEmail: '',
    userName: '', 
  }),
  actions: {
    login(email, name) {
      this.authenticated = true
      this.userEmail = email
      this.userName = name || 'Guest'
    },
    logout() {
      this.authenticated = false
      this.userEmail = ''
      this.userName = ''
    }
  }
})
