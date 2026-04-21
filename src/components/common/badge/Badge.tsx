interface BadgeProps {
  label: string
}

export default function Badge({ label }: BadgeProps) {
  return (
    <span className="text-xs font-bold border border-primary text-primary rounded-full px-4 py-0.5 whitespace-nowrap">
      {label}
    </span>
  )
}
