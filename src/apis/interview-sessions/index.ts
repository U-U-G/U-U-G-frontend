import {
  fetchEventSource,
  type FetchEventSourceInit,
} from '@microsoft/fetch-event-source'
import { privateClient } from '@/apis/common/privateClient'
import { getAccessToken } from '@/utils/tokenStorage'
import type { ApiResponse } from '@/apis/common/type'
import type {
  CreateInterviewSessionRequest,
  InterviewSession,
  InterviewQuestion,
} from './type'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL

export const createInterviewSession = async (
  body: CreateInterviewSessionRequest,
) => {
  const { data } = await privateClient.post<ApiResponse<InterviewSession>>(
    '/interview-sessions',
    body,
  )
  return data.data
}

export const startInterviewSession = async (uuid: string) => {
  const { data } = await privateClient.patch<ApiResponse<InterviewSession>>(
    `/interview-sessions/${uuid}/start`,
  )
  return data.data
}

export const completeInterviewSession = async (uuid: string) => {
  const { data } = await privateClient.patch<ApiResponse<InterviewSession>>(
    `/interview-sessions/${uuid}/complete`,
  )
  return data.data
}

export const abandonInterviewSession = async (uuid: string) => {
  const { data } = await privateClient.patch<ApiResponse<InterviewSession>>(
    `/interview-sessions/${uuid}/abandon`,
  )
  return data.data
}

export const getInterviewQuestions = async (
  uuid: string,
  sequenceOrder?: number,
) => {
  const { data } = await privateClient.get<ApiResponse<InterviewQuestion[]>>(
    `/interview-sessions/${uuid}/questions`,
    { params: sequenceOrder !== undefined ? { sequenceOrder } : undefined },
  )
  return data.data
}

export const createInterviewSessionEventSource = (
  uuid: string,
  options: FetchEventSourceInit,
) => {
  const accessToken = getAccessToken()

  return fetchEventSource(`${API_BASE_URL}/interview-sessions/${uuid}/stream`, {
    ...options,
    credentials: 'include',
    headers: {
      Accept: 'text/event-stream',
      Authorization: `Bearer ${accessToken ?? ''}`,
      ...options.headers,
    },
  })
}
