import axios from 'axios'
import { getAccessToken } from '@/utils/tokenStorage'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL

export const privateClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
})

privateClient.interceptors.request.use((config) => {
  const token = getAccessToken()

  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})
