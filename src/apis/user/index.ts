import { privateClient } from '@/apis/common/privateClient'
import { ApiResponse } from '@/apis/common/type'
import { UpdateProfileRequest, UserProfile } from './type'
import { EmailField, EmailVerificationConfirmRequest } from '@/apis/common/type'

export const getProfile = async () => {
  const { data } =
    await privateClient.get<ApiResponse<UserProfile>>('/users/me')
  return data.data
}

export const signout = async () => {
  const { data } = await privateClient.delete<ApiResponse<string>>('/users/me')
  return data
}

export const updateProfile = async (body: UpdateProfileRequest) => {
  const { data } = await privateClient.patch<ApiResponse<string>>(
    '/users/me/profile',
    body,
  )
  return data.data
}

export const checkNicknameAvailability = async (nickname: string) => {
  const { data } = await privateClient.get<ApiResponse<string>>(
    '/users/nickname-check',
    {
      params: { nickname },
    },
  )
  return data.data
}

export const sendEmailVerificationCode = async (body: EmailField) => {
  const { data } = await privateClient.post<ApiResponse<string>>(
    '/users/email-verifications',
    body,
  )
  return data.data
}

export const verifyEmailVerification = async (
  body: EmailVerificationConfirmRequest,
) => {
  const { data } = await privateClient.post<ApiResponse<string>>(
    '/users/email-verifications/verify',
    body,
  )
  return data.data
}
