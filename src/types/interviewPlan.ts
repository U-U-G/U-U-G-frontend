export type CurriculumItem = {
  id: number
  title: string
  date: string
}

export type InterviewPlanItem = {
  id: number
  dDay: string
  companyName: string
  title: string
  date: string
  isSelected: boolean
  curriculum: readonly CurriculumItem[]
}
