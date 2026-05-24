export interface UpdateProfileRequest {
  email: string
  nickname: string
  profileImageUrl?: string | null
}

export interface UserProfile {
  email: string
  nickname: string
  provider: 'LOCAL' | 'KAKAO' | 'GOOGLE' | 'NAVER'
  profileImageUrl: string
  createdAt: string
}

export interface ProfileImagePresignedUrlRequest {
  fileExtension: string
  contentType: string
}

export interface ProfileImagePresignedUrlResponse {
  preSignedUrl: string
  s3Key: string
  publicUrl: string
}

export interface UpdateProfileImageRequest {
  s3Key: string
}
