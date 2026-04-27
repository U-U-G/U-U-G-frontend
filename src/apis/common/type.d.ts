export interface ApiResponse<T> {
  success: boolean
  data: T
  message: string
}

export interface RefreshTokenResponse {
  accessToken: string
  refreshToken: string
}

export interface RefreshTokenRequest {
  refreshToken: string
}
