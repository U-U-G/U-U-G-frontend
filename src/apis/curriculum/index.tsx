import { privateClient } from '../common/privateClient'
import { ApiResponse } from '../common/type'
import type { CurriculumList } from './type'

export const getCurriculumsByDate = async (date: string) => {
  const { data } = await privateClient.get<ApiResponse<CurriculumList>>(
    '/curriculum',
    {
      params: {
        date,
      },
    },
  )

  return data.data
}
