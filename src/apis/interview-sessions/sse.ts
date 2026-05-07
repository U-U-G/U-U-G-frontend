export const SSE_EVENT_QUESTIONS_READY = 'QUESTIONS_READY' as const
export const SSE_EVENT_SESSION_ANALYSIS_DONE = 'SESSION_ANALYSIS_DONE' as const
export const SSE_EVENT_ERROR = 'ERROR' as const

export function parseSessionPayload(data: string): { sessionUuid?: string } {
  try {
    return JSON.parse(data) as { sessionUuid?: string }
  } catch {
    return {}
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
