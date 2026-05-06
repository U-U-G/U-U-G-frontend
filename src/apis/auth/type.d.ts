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
  agreedTerms: string[]
}

export interface Term {
  uuid: string
  title: string
  version: string
  content: string
  type: 'TERMS_OF_SERVICE' | 'PRIVACY_POLICY'
  required: boolean
  isActive: boolean
}

export interface ResetPasswordRequest extends NewPasswordConfirmFields {
  token: string
}

export interface ChangePasswordRequest extends NewPasswordConfirmFields {
  currentPassword: string
}
