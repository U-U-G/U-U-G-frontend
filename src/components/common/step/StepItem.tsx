interface StepItemProps {
  label: string
  isLast: boolean
}

export default function StepItem({ label, isLast }: StepItemProps) {
  return (
    <li className="flex gap-3.75">
      <div className="relative flex items-center justify-center self-stretch">
        <span className={`relative w-1.75 h-1.75 rounded-full bg-primary shrink-0`} />
        {!isLast && (
          <span className="absolute w-[0.5px] bg-primary top-1/2 -bottom-[calc(50%+18px)]" />
        )}
      </div>
      <span className="p3 text-gray-2">{label}</span>
    </li>
  )
}
