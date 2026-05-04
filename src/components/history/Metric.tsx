function scoreToBarClass(score: number) {
  const n = Math.min(100, Math.max(0, Number.isFinite(score) ? score : 0))
  if (n < 40) return 'bg-text-point-red'
  if (n < 80) return 'bg-point-yellow'
  if (n < 90) return 'bg-point-green'
  return 'bg-primary'
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
  const barClass = scoreToBarClass(score)
  const barWidth = Math.min(
    100,
    Math.max(0, Number.isFinite(score) ? score : 0),
  )

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
