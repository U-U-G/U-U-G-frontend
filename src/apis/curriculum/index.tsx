import { privateClient } from '../common/privateClient'
import { ApiResponse } from '../common/type'
import type { CurriculumListResponse } from './type'

export const getCurriculumsByDate = async (date: string) => {
  const { data } = await privateClient.get<ApiResponse<CurriculumListResponse>>(
    '/curriculum',
    {
      params: {
        date,
      },
    },
  )

  return data.data
}
