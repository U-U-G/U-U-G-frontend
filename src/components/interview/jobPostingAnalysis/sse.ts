export const SSE_EVENT_JOB_POSTING_ANALYSIS_DONE =
  'JOB_POSTING_ANALYSIS_DONE' as const
export const SSE_EVENT_ERROR = 'ERROR' as const

export function parseJobPostingDonePayload(data: string): {
  jobPostingUuid?: string
} | null {
  try {
    return JSON.parse(data) as { jobPostingUuid?: string }
  } catch {
    return null
  }
}

export function parseErrorPayload(data: string): { message?: string } {
  const trimmed = data.trim()
  if (!trimmed) return {}
  try {
    return JSON.parse(trimmed) as { message?: string }
  } catch {
    return {}
  }
}
