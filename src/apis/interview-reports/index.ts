import { privateClient } from '@/apis/common/privateClient'
import type { ApiResponse } from '@/apis/common/type'

export interface InterviewReportDetail {
  sessionUuid: string
  companyName: string | null
  position: string | null
  interviewDate: string
  startedAt: string
  endedAt: string
  totalScore: number
  silenceScore: number
  fillerScore: number
  logicScore: number
  aiSummary: string
  analyses: {
    uuid: string
    sequenceOrder: number
    questionContent: string
    answerTranscript: string
    aiReview: string
    totalScore: number
    silenceScore: number
    fillerScore: number
    logicScore: number
    totalSilenceDuration: number
    silenceCount: number
    fillerWords: { 음: number; 어: number; 그: number }
  }[]
}

export const getInterviewReport = async (
  sessionUuid: string,
): Promise<{ status: number; data?: InterviewReportDetail }> => {
  const response = await privateClient.get<ApiResponse<InterviewReportDetail>>(
    `/interview-reports/${sessionUuid}`,
    { validateStatus: (status) => status === 200 || status === 202 },
  )
  return {
    status: response.status,
    data: response.status === 200 ? response.data.data : undefined,
  }
}
