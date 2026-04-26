import { publicClient } from '@/apis/common/publicClient'
import { ApiResponse } from '../common/type'
import { LoginRequest, LoginResponse } from './type'

const baseUrl = publicClient.defaults.baseURL

export const loginApi = {
  login: async (body: LoginRequest) => {
    const response = await publicClient.post<ApiResponse<LoginResponse>>(
      '/auth/login',
      body,
    )
    return response.data
  },
  withKakao: () => `${baseUrl}/oauth2/authorization/kakao`,
  withGoogle: () => `${baseUrl}/oauth2/authorization/google`,
  withNaver: () => `${baseUrl}/oauth2/authorization/naver`,
}
