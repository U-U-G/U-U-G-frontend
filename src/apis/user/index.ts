import { privateClient } from '@/apis/common/privateClient'
import { publicClient } from '@/apis/common/publicClient'
import { ApiResponse } from '@/apis/common/type'
import {
  ProfileImagePresignedUrlRequest,
  ProfileImagePresignedUrlResponse,
  UpdateProfileImageRequest,
  UpdateProfileRequest,
  UserProfile,
} from './type'
import { EmailField, EmailVerificationConfirmRequest } from '@/apis/common/type'

export const getProfile = async () => {
  const { data } =
    await privateClient.get<ApiResponse<UserProfile>>('/users/me')
  return data.data
}

export const signout = async () => {
  const { data } = await privateClient.delete<ApiResponse<string>>('/users/me')
  return data.data
}

export const updateProfile = async (body: UpdateProfileRequest) => {
  const { data } = await privateClient.patch<ApiResponse<string>>(
    '/users/me/profile',
    body,
  )
  return data.data
}

export const checkNicknameAvailability = async (nickname: string) => {
  await publicClient.get('/users/nickname-check', { params: { nickname } })
}

export const checkEmailAvailability = async (email: string) => {
  await publicClient.get('/users/email-check', { params: { email } })
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

export const getProfileImagePresignedUrl = async (
  body: ProfileImagePresignedUrlRequest,
) => {
  const { data } = await privateClient.post<
    ApiResponse<ProfileImagePresignedUrlResponse>
  >('/users/profile-image/presigned-url', body)
  return data.data
}

export const updateProfileImage = async (body: UpdateProfileImageRequest) => {
  const { data } = await privateClient.patch<ApiResponse<string>>(
    '/users/profile-image',
    body,
  )
  return data.data
}

export const uploadProfileImageToS3 = async (
  preSignedUrl: string,
  file: File,
  contentType: string,
) => {
  const response = await fetch(preSignedUrl, {
    method: 'PUT',
    body: file,
    headers: {
      'Content-Type': contentType,
    },
  })

  if (!response.ok) {
    throw new Error('프로필 이미지 업로드에 실패했습니다.')
  }
}

const MIME_TO_EXTENSION: Record<string, string> = {
  'image/jpeg': 'jpg',
  'image/png': 'png',
  'image/gif': 'gif',
  'image/webp': 'webp',
}

const getFileExtension = (file: File) => {
  const fromName = file.name.split('.').pop()?.toLowerCase()
  if (fromName) return fromName

  return MIME_TO_EXTENSION[file.type] ?? 'jpg'
}

export const uploadProfileImage = async (file: File) => {
  const fileExtension = getFileExtension(file)
  const contentType = file.type || 'application/octet-stream'

  const { preSignedUrl, s3Key } = await getProfileImagePresignedUrl({
    fileExtension,
    contentType,
  })

  await uploadProfileImageToS3(preSignedUrl, file, contentType)
  return updateProfileImage({ s3Key })
}
