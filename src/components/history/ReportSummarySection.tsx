import Image from 'next/image'
import type { StaticImageData } from 'next/image'
import characterAngryImage from '@/assets/image/uug-character-angry-img.png'
import characterSadImage from '@/assets/image/uug-character-sad-img.png'
import characterHappyImage from '@/assets/image/uug-character-happy-img.png'
import characterAwesomeImage from '@/assets/image/uug-character-awesome-img.png'
import { getScoreBand, type ScoreBand } from '@/utils/reportScore'
import Metric from './Metric'

const SCORE_BAND_CHARACTER: Record<ScoreBand, StaticImageData> = {
  low: characterAngryImage,
  mid: characterSadImage,
  high: characterHappyImage,
  top: characterAwesomeImage,
}

//TODO: 백엔드 명세에 따라 수정 예정
export interface MetricItem {
  label: string
  value: string
  score: number
  background?: string
}

//TODO: 백엔드 명세에 따라 수정 예정
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
  const characterSrc = SCORE_BAND_CHARACTER[getScoreBand(scoreNum)]

  return (
    <section className="grid grid-cols-[2fr_1fr] gap-6 mb-8">
      <div className="bg-secondary rounded-2xl p-6 flex justify-between items-center">
        <div className="flex flex-col gap-2 flex-1 mr-5">
          <span className="p3 text-primary">종합점수</span>
          <span className="text-[3.0625rem] font-bold text-primary">
            {totalScore}
          </span>
          <p className="p4 text-gray-1 leading-relaxed">{feedback}</p>
        </div>
        <Image
          src={characterSrc}
          alt="종합 점수에 따른 결과 캐릭터"
          width={200}
          height={200}
          className="object-contain"
        />
      </div>

      <div className="bg-secondary rounded-2xl p-7.5 flex flex-col justify-between">
        {metrics.map((metric) => (
          <Metric key={metric.label} {...metric} />
        ))}
      </div>
    </section>
  )
}
