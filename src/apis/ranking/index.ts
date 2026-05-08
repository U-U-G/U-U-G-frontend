import { privateClient } from '@/apis/common/privateClient'
import { ApiResponse } from '@/apis/common/type'
import { RankingResponse } from './type'

export const getRanking = async () => {
  const { data } =
    await privateClient.get<ApiResponse<RankingResponse>>('/ranking')
  return data.data
}
