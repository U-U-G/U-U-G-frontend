export interface CreateInterviewSessionRequest {
  jobPostingUuid: string
  interviewDate: string
  retry: boolean
}

export interface InterviewSession {
  uuid: string
  status: 'READY' | 'IN_PROGRESS' | 'COMPLETED' | 'ABANDONED'
}

export interface InterviewQuestion {
  uuid: string
  sequenceOrder: number
  content: string
}
