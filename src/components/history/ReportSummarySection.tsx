import Image from 'next/image'
import type { StaticImageData } from 'next/image'
import characterAngryImage from '@/assets/image/uug-character-angry-img.png'
import characterSadImage from '@/assets/image/uug-character-sad-img.png'
import characterHappyImage from '@/assets/image/uug-character-happy-img.png'
import characterAwesomeImage from '@/assets/image/uug-character-awesome-img.png'
import Metric from './Metric'

function scoreToCharacterImage(score: number): StaticImageData {
  const n = Number.isFinite(score) ? score : 0
  if (n < 40) return characterAngryImage
  if (n < 80) return characterSadImage
  if (n < 90) return characterHappyImage
  return characterAwesomeImage
}

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
  const scoreNum = parseFloat(totalScore)
  const characterSrc = scoreToCharacterImage(scoreNum)

  return (
    <section className="grid grid-cols-[2fr_1fr] gap-6 mb-8">
      <div className="bg-secondary rounded-2xl p-6 flex justify-between items-center">
        <div className="flex flex-col gap-2 flex-1 mr-5">
          <span className="p3 text-primary">종합점수</span>
          <span className="text-5xl font-bold text-primary">{totalScore}</span>
          <p className="text-sm text-gray-600 leading-relaxed">{feedback}</p>
        </div>
        <Image
          src={characterSrc}
          alt="종합 점수에 따른 결과 캐릭터"
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
