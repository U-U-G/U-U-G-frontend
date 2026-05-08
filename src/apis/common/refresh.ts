import { publicClient } from '@/apis/common/publicClient'
import { TokenResponse, ApiResponse } from '@/apis/common/type'

export async function refreshAccessToken(refreshToken: string) {
  const { data } = await publicClient.post<ApiResponse<TokenResponse>>(
    '/auth/refresh',
    { refreshToken },
  )

  return data.data
}
