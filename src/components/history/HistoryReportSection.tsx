'use client'

import { useState } from 'react'
import QuestionAnalysisCard, {
  QuestionAnalysisCardProps,
} from './QuestionAnalysisCard'
import ReportSummarySection, {
  ReportSummarySectionProps,
} from './ReportSummarySection'
import GeneratingPopup from '@/components/common/popup/GeneratingPopup'
import { useModal } from '@/hooks/useModal'

interface HistoryReportSectionProps extends ReportSummarySectionProps {
  attempt: string
  title: string
  meta: string
  questionAnalyses: QuestionAnalysisCardProps[]
}

export default function HistoryReportSection({
  attempt,
  title,
  meta,
  totalScore,
  feedback,
  metrics,
  questionAnalyses,
}: HistoryReportSectionProps) {
  const [isGenerating, setIsGenerating] = useState(false)
  const { ref: popupRef } = useModal(isGenerating)

  return (
    <section className="flex flex-col gap-2 overflow-auto border border-primary rounded-2xl p-7">
      <div className="flex flex-row items-center justify-between mb-6">
        <div className="flex flex-col gap-2">
          <div className="flex flex-row items-center">
            <div className="bg-secondary p2 text-primary border text-center rounded-full mr-3 py-[1px] px-2">
              {attempt}
            </div>
            <div className="h2 text-text-primary">{title}</div>
          </div>
          <div className="p3 text-gray-4">{meta}</div>
        </div>

        <button
          type="button"
          onClick={() => setIsGenerating(true)}
          className="h3 w-30 h-13 flex items-center justify-center rounded-full bg-primary text-white shrink-0 cursor-pointer"
        >
          재시도
        </button>
      </div>

      <ReportSummarySection
        totalScore={totalScore}
        feedback={feedback}
        metrics={metrics}
      />

      <p className="p2 text-text-primary">질문별 분석</p>
      <section className="flex flex-col gap-14">
        {questionAnalyses.map((item) => (
          <QuestionAnalysisCard key={item.questionNumber} {...item} />
        ))}
      </section>

      {isGenerating && (
        <GeneratingPopup
          popupRef={popupRef}
          onClose={() => setIsGenerating(false)}
        />
      )}
    </section>
  )
}
