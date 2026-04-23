interface StepItemProps {
  label: string
  isFirst: boolean
  isLast: boolean
}

export default function StepItem({ label, isFirst, isLast }: StepItemProps) {
  const dotColor = isFirst || isLast ? 'bg-primary' : 'bg-[#B09BFF]'

  return (
    <li className="flex items-center gap-5 h-12.25">
      <div className="relative flex items-center justify-center w-1.75 self-stretch">
        <span
          className={`relative z-10 w-1.75 h-1.75 rounded-full shrink-0 ${dotColor}`}
        />
        {!isLast && (
          <span className="absolute w-[0.5px] bg-[#B09BFF] top-1/2 -bottom-1/2 left-[calc(50%-0.25px)]" />
        )}
      </div>
      <span className="text-base text-gray3 font-medium">{label}</span>
    </li>
  )
}
