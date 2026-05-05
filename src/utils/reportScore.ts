export const SCORE_BREAKPOINT_MID = 40
export const SCORE_BREAKPOINT_HIGH = 80
export const SCORE_BREAKPOINT_TOP = 90

export function clampScore(score: number): number {
  return Math.min(100, Math.max(0, Number.isFinite(score) ? score : 0))
}

export type ScoreBand = 'low' | 'mid' | 'high' | 'top'

export function getScoreBand(score: number): ScoreBand {
  const n = clampScore(score)
  if (n < SCORE_BREAKPOINT_MID) return 'low'
  if (n < SCORE_BREAKPOINT_HIGH) return 'mid'
  if (n < SCORE_BREAKPOINT_TOP) return 'high'
  return 'top'
}
