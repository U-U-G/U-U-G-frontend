export interface Curriculum {
  uuid: string
  jobPostingUuid: string | null
  companyName: string
  content: string
  scheduledDate: string
  isPast: boolean
}

export type CurriculumListResponse = Curriculum[]
