import StepItem from './StepItem'

interface StepListProps {
  steps: string[]
}

export default function StepList({ steps }: StepListProps) {
  return (
    <ul className="flex flex-col gap-4.5">
      {steps.map((step, index) => (
        <StepItem key={step} label={step} isLast={index === steps.length - 1} />
      ))}
    </ul>
  )
}
