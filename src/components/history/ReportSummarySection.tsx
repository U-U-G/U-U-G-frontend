import Image from 'next/image'
import character5 from '@/assets/image/uug-character5-img.png'
import Metric from './Metric'

export interface MetricItem {
  label: string
  value: string
  percent: number
  color: string
  background?: string
}

export interface ReportSummarySectionProps {
  totalScore: string
  feedback: string
  metrics: MetricItem[]
}

export default function ReportSummarySection({
  totalScore,
  feedback,
  metrics,
}: ReportSummarySectionProps) {
  return (
    <section className="grid grid-cols-[2fr_1fr] gap-6 mb-8">
      <div className="bg-secondary rounded-2xl p-6 flex justify-between items-center">
        <div className="flex flex-col gap-2 flex-1 mr-5">
          <span className="p3 text-primary">종합점수</span>
          <span className="text-5xl font-bold text-primary">{totalScore}</span>
          <p className="text-sm text-gray-600 leading-relaxed">{feedback}</p>
        </div>
        <Image
          src={character5}
          alt="캐릭터"
          width={200}
          height={200}
          className="object-contain"
        />
      </div>

      <div className="bg-secondary rounded-2xl p-6 flex flex-col gap-4">
        {metrics.map((metric) => (
          <Metric key={metric.label} {...metric} />
        ))}
      </div>
    </section>
  )
}
