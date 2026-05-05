import {
  clampScore,
  getScoreBand,
  type ScoreBand,
} from '@/utils/reportScore'

const SCORE_BAND_BAR_CLASS: Record<ScoreBand, string> = {
  low: 'bg-text-point-red',
  mid: 'bg-point-yellow',
  high: 'bg-point-green',
  top: 'bg-primary',
}

//TODO: 백엔드 명세에 따라 수정 예정
export default function Metric({
  label,
  value,
  score,
  background = 'bg-gray-5',
}: {
  label: string
  value: string
  score: number
  background?: string
}) {
  const barWidth = clampScore(score)
  const barClass = SCORE_BAND_BAR_CLASS[getScoreBand(score)]

  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-between text-sm text-gray-2">
        <span>{label}</span>
        <span>{value}</span>
      </div>

      <div className={`w-full h-3 rounded-full overflow-hidden ${background}`}>
        <div
          className={`h-full ${barClass}`}
          style={{ width: `${barWidth}%` }}
        />
      </div>
    </div>
  )
}
