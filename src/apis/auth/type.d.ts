export interface LoginRequest {
  email: string
  password: string
}

export interface LoginResponse {
  accessToken: string
  refreshToken: string
}

interface PasswordConfirmFields {
  password: string
  confirmPassword: string
}

interface NewPasswordConfirmFields {
  newPassword: string
  confirmPassword: string
}

export interface SignupRequest extends PasswordConfirmFields {
  email: string
  nickname: string
}

export interface ResetPasswordRequest extends NewPasswordConfirmFields {
  token: string
}

export interface ChangePasswordRequest extends NewPasswordConfirmFields {
  currentPassword: string
}
