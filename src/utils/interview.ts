import { interviewMockData } from '@/mocks/interviewMockData'

export function parseQuestionNumber(q: string | undefined): number | null {
  const n = parseInt(q ?? '', 10)
  if (isNaN(n) || n < 1 || n > interviewMockData.questions.length) return null
  return n
}
