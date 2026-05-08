export interface Curriculum {
  uuid: string
  jobPostingUuid: string | null
  companyName: string
  content: string
  scheduleDate: string
  isPast: boolean
}

export interface CurriculumList {
  curriculums: Curriculum[]
}
