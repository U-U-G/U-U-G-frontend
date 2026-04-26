import { publicClient } from '@/apis/common/publicClient'
import { ApiResponse } from '../common/type'
import { LoginRequest, LoginResponse } from './type'

export async function login(body: LoginRequest) {
  const response = await publicClient.post<ApiResponse<LoginResponse>>(
    '/auth/login',
    body,
  )
  return response.data
}
