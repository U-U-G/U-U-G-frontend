import { publicClient } from '@/apis/common/publicClient'
import { privateClient } from '@/apis/common/privateClient'
import { ApiResponse } from '@/apis/common/type'
import {
  LoginRequest,
  LoginResponse,
  ResetPasswordRequest,
  ChangePasswordRequest,
  SignupRequest,
  Term,
} from './type'
import { EmailField, EmailVerificationConfirmRequest } from '@/apis/common/type'

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL

const OAUTH_ORIGIN = BASE_URL ? new URL(BASE_URL).origin : ''

export const login = async (body: LoginRequest) => {
  const { data } = await publicClient.post<ApiResponse<LoginResponse>>(
    '/auth/login',
    body,
  )
  return data.data
}

export const logout = async () => {
  const { data } = await privateClient.post<ApiResponse<string>>('/auth/logout')
  return data.data
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
  const { data } = await privateClient.patch<ApiResponse<string>>(
    '/auth/password',
    body,
  )
  return data.data
}
export const checkEmail = async (email: string) => {
  const { data } = await publicClient.get<ApiResponse<string>>(
    '/users/email-check',
    { params: { email } },
  )
  return data.data
}
export const loginWithKakao = () => `${OAUTH_ORIGIN}/oauth2/authorization/kakao`

export const loginWithGoogle = () =>
  `${OAUTH_ORIGIN}/oauth2/authorization/google`

export const loginWithNaver = () => `${OAUTH_ORIGIN}/oauth2/authorization/naver`

export const loginApi = {
  login,
  loginWithKakao,
  loginWithGoogle,
  loginWithNaver,
}

export const getActiveTerms = async (): Promise<Term[]> => {
  const { data } = await publicClient.get<ApiResponse<Term[]>>(
    '/terms?isActive=true',
  )
  return data.data
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
