import axios from 'axios'
import clientConfig from '../fitnessAppClient.json'

const api = axios.create({
  baseURL: import.meta.env.DEV ? '' : clientConfig.url,
})

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

export function getApiError(error, fallback) {
  if (error.response?.status === 404) {
    return `The API route ${error.config?.url || ''} was not found.`
  }

  const serverError = error.response?.data?.error
  return (
    error.response?.data?.message ||
    (typeof serverError === 'string' ? serverError : serverError?.message) ||
    error.message ||
    fallback
  )
}

export const endpoints = clientConfig.endpoints

export default api
