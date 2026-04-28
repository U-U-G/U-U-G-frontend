import { publicClient } from '@/apis/common/publicClient'
import { privateClient } from '@/apis/common/privateClient'
import { ApiResponse } from '@/apis/common/type'
import {
  LoginRequest,
  LoginResponse,
  ResetPasswordRequest,
  ChangePasswordRequest,
  SignupRequest,
} from './type'
import { EmailField, EmailVerificationConfirmRequest } from '@/apis/common/type'

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL

export const login = async (body: LoginRequest) => {
  const { data } = await publicClient.post<ApiResponse<LoginResponse>>(
    '/auth/login',
    body,
  )
  return data.data
}

export const logout = async () => {
  await privateClient.post<ApiResponse<string>>('/auth/logout')
}

export const forgotPassword = async (body: EmailField) => {
  const { data } = await publicClient.post<ApiResponse<string>>(
    '/auth/forgot-password',
    body,
  )
  return data.data
}

export const resetPassword = async (body: ResetPasswordRequest) => {
  const { data } = await publicClient.post<ApiResponse<string>>(
    '/auth/reset-password',
    body,
  )
  return data.data
}

export const signup = async (body: SignupRequest) => {
  const { data } = await publicClient.post<ApiResponse<string>>(
    '/auth/signup',
    body,
  )
  return data.data
}

export const sendEmailVerificationCode = async (body: EmailField) => {
  const { data } = await publicClient.post<ApiResponse<string>>(
    '/auth/email-verifications',
    body,
  )
  return data.data
}

export const verifyEmailVerification = async (
  body: EmailVerificationConfirmRequest,
) => {
  const { data } = await publicClient.post<ApiResponse<string>>(
    '/auth/email-verifications/verify',
    body,
  )
  return data.data
}

export const changePassword = async (body: ChangePasswordRequest) => {
  const { data } = await publicClient.post<ApiResponse<string>>(
    '/auth/password',
    body,
  )
  return data.data
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

export const signupApi = {
  signup,
  sendEmailVerificationCode,
  verifyEmailVerification,
}

export const resetPasswordApi = {
  forgotPassword,
  resetPassword,
}
