import { publicClient } from '@/apis/common/publicClient'
import { ApiResponse } from '../common/type'
import {
  LoginRequest,
  LoginResponse,
  UserInfo,
  EmailVerificationConfirmRequest,
  ResetPasswordRequest,
} from './type'

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL

export const login = async (body: LoginRequest) => {
  const { data } = await publicClient.post<ApiResponse<LoginResponse>>(
    '/auth/login',
    body,
  )
  return data
}

export const loginWithKakao = () => `${BASE_URL}/oauth2/authorization/kakao`

export const loginWithGoogle = () => `${BASE_URL}/oauth2/authorization/google`

export const loginWithNaver = () => `${BASE_URL}/oauth2/authorization/naver`

export const loginApi = {
  login,
  loginWithKakao,
  loginWithGoogle,
  loginWithNaver,
}

export const forgotPassword = async (body: UserInfo) => {
  const { data } = await publicClient.post<ApiResponse<string>>(
    '/auth/forgot-password',
    body,
  )
  return data
}

export const resetPassword = async (body: ResetPasswordRequest) => {
  const { data } = await publicClient.post<ApiResponse<string>>(
    '/auth/reset-password',
    body,
  )
  return data
}

export const resetPasswordApi = {
  forgotPassword,
  resetPassword,
}
