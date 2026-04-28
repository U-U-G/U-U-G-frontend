export interface ApiResponse<T> {
  success: boolean
  data: T
  message: string
}

export interface EmailField {
  email: string
}

export interface EmailVerificationConfirmRequest {
  email: string
  code: string
}

export interface RefreshTokenResponse {
  accessToken: string
  refreshToken: string
}

export interface RefreshTokenRequest {
  refreshToken: string
}
