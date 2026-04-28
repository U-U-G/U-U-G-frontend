export interface UpdateProfileRequest {
  email: string
  nickname: string
  profileImageUrl?: string
}

export interface UserProfile {
  email: string
  nickname: string
  provider: 'LOCAL' | 'KAKAO' | 'GOOGLE' | 'NAVER'
  profileImageUrl: string
}
