import axios from 'axios'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL

export const publicClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 5000,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
})
