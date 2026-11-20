import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useGlobalStore = defineStore('global', () => {
  const token = ref(localStorage.getItem('token') || null)

  function setToken(value) {
    token.value = value
    localStorage.setItem('token', value)
  }

  function clearToken() {
    token.value = null
    localStorage.removeItem('token')
  }

  function isAuthenticated() {
    return Boolean(token.value)
  }

  return { token, setToken, clearToken, isAuthenticated }
})
