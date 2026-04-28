export interface LoginRequest {
  email: string
  password: string
}

export interface LoginResponse {
  accessToken: string
  refreshToken: string
}

export interface UserInfo {
  email: string
}

export interface EmailVerificationConfirmRequest {
  email: string
  code: string
}

export interface ResetPasswordRequest {
  token: string
  newPassword: string
  confirmPassword: string
}
