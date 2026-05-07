export interface SubmitAnswerRequest {
  totalElapsedMs: number
  transcript: string
  fillerWords: string[]
  silencePeriods: { startMs: number; endMs: number }[]
  speechPeriods: { startMs: number; endMs: number }[]
}
