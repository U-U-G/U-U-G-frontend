export interface Curriculum {
  uuid: string
  jobPostingUuid: string
  content: string
  scheduledDate: string
  isPast: boolean
}

export interface Schedule {
  scheduleUuid: string
  companyName: string
  interviewDate: string
}

export interface ScheduleDetail extends Schedule {
  curriculums: Curriculum[]
}

export interface CreateScheduleRequest {
  jobPostingUuid: string
  interviewDate: string
}

export interface UpdateScheduleRequest {
  interviewDate: string
}

export type GetScheduleListParams = {
  from?: string
}

export type GetScheduleListResponse = Schedule[]

export interface ScheduleJobPosting {
  jobPostingUuid: string
  companyName: string
  position: string
  site: string
}

export type GetScheduleJobPostingsResponse = ScheduleJobPosting[]
