export default function AnalysisBadge({
  label,
  value,
  active = false,
}: {
  label: string
  value: string
  active?: boolean
}) {
  return (
    <div
      className={`rounded-full border px-4 py-1 p1 bg-secondary text-primary ${
        active ? 'border-primary' : 'border-gray-5'
      }`}
    >
      {label} <span className="h4">{value}</span>
    </div>
  )
}
