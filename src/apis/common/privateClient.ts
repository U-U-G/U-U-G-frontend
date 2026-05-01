import axios, { AxiosError, InternalAxiosRequestConfig } from 'axios'
import { publicClient } from '@/apis/common/publicClient'
import type { ApiResponse, RefreshTokenResponse } from '@/apis/common/type'
import {
  getAccessToken,
  getRefreshToken,
  setAccessToken,
  setRefreshToken,
  clearAuthTokens,
} from '@/utils/tokenStorage'

interface RetryConfig extends InternalAxiosRequestConfig {
  _retry?: boolean
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL

export const privateClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 5000,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
})

privateClient.interceptors.request.use((config) => {
  const accessToken = getAccessToken()

  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`
  }

  return config
})

privateClient.interceptors.response.use(
  (response) => response,

  async (error: AxiosError) => {
    const originalRequest = error.config as RetryConfig

    if (!error.response || !originalRequest) {
      return Promise.reject(error)
    }

    if (error.response.status !== 401) {
      return Promise.reject(error)
    }

    if (originalRequest._retry) {
      clearAuthTokens()
      window.location.href = '/login'
      return Promise.reject(error)
    }

    originalRequest._retry = true

    try {
      const refreshToken = getRefreshToken()

      const refreshRes = await publicClient.post<
        ApiResponse<RefreshTokenResponse>
      >('/auth/refresh', refreshToken ? { refreshToken } : undefined)

      if (!refreshRes.data.success) {
        throw new Error(refreshRes.data.message || 'refresh 실패')
      }

      const { accessToken, refreshToken: nextRefreshToken } =
        refreshRes.data.data

      setAccessToken(accessToken)

      if (nextRefreshToken) {
        setRefreshToken(nextRefreshToken)
      }

      originalRequest.headers.Authorization = `Bearer ${accessToken}`

      return privateClient(originalRequest)
    } catch (refreshError) {
      clearAuthTokens()
      window.location.href = '/login'

      return Promise.reject(refreshError)
    }
  },
)

export const getHttpStatus = (error: unknown): number | undefined =>
  axios.isAxiosError(error) ? error.response?.status : undefined
