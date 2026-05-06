export type JobPostingStatus = 'PENDING' | 'ANALYZING' | 'DONE' | 'FAILED'

export interface JobPosting {
  uuid: string
  url: string
  status: JobPostingStatus
}

export interface JobPostingDetail extends JobPosting {
  companyName: string
  companyDescription: string
  position: string
  responsibilities: string[]
  requiredSkills: string[]
  preferredSkills: string[]
  requiredExperience: string
  failureReason?: string
  createdAt: string
  updatedAt: string
}

export interface JobPostingListItem extends JobPosting {
  companyName: string
  position: string
  createdAt: string
}

export interface JobPostingAnalysisEvent {
  timeout: number
}

export interface JobPostingAnalysisRequest {
  url: string
}

export interface UpdateJobPostingCompanyNameRequest {
  companyName: string
}
