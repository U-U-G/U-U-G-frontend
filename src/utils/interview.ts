export const TOTAL_QUESTIONS = 5

export function parseQuestionNumber(q: string | undefined): number | null {
  const n = parseInt(q ?? '', 10)
  if (isNaN(n) || n < 1 || n > TOTAL_QUESTIONS) return null
  return n
}
