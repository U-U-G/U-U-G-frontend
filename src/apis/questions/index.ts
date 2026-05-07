import { privateClient } from '@/apis/common/privateClient'
import type { ApiResponse } from '@/apis/common/type'
import type { SubmitAnswerRequest } from './type'

export const submitAnswer = async (
  questionUuid: string,
  body: SubmitAnswerRequest,
) => {
  const { data } = await privateClient.post<ApiResponse<null>>(
    `/questions/${questionUuid}/answers`,
    body,
  )
  return data.data
}
