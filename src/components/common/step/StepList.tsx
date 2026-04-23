import StepItem from './StepItem'

interface StepListProps {
  steps: string[]
}

export default function StepList({ steps }: StepListProps) {
  return (
    <ul className="flex flex-col">
      {steps.map((step, index) => (
        <StepItem
          key={step}
          label={step}
          isFirst={index === 0}
          isLast={index === steps.length - 1}
        />
      ))}
    </ul>
  )
}
