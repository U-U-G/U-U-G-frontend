export default function Metric({
  label,
  value,
  percent,
  color,
  background = 'bg-gray-5',
}: {
  label: string
  value: string
  percent: number
  color: string
  background?: string
}) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-between text-sm text-gray-700">
        <span>{label}</span>
        <span>{value}</span>
      </div>

      <div className={`w-full h-3 rounded-full overflow-hidden  ${background}`}>
        <div className={`h-full ${color}`} style={{ width: `${percent}%` }} />
      </div>
    </div>
  )
}
