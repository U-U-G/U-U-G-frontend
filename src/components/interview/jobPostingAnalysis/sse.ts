import type {
  JobPostingAnalysisDonePayload,
  JobPostingAnalysisErrorPayload,
} from '@/apis/job-postings/type'

export const SSE_EVENT_JOB_POSTING_ANALYSIS_DONE =
  'JOB_POSTING_ANALYSIS_DONE' as const
export const SSE_EVENT_ERROR = 'ERROR' as const

export function parseJobPostingDonePayload(
  data: string,
): JobPostingAnalysisDonePayload | null {
  try {
    return JSON.parse(data) as JobPostingAnalysisDonePayload
  } catch {
    return null
  }
}

export function parseErrorPayload(
  data: string,
): JobPostingAnalysisErrorPayload {
  const trimmed = data.trim()
  if (!trimmed) return {}
  try {
    return JSON.parse(trimmed) as JobPostingAnalysisErrorPayload
  } catch {
    return {}
  }
}
