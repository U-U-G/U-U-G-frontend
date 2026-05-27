'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useMutation } from '@tanstack/react-query'
import QuestionAnalysisCard, {
  QuestionAnalysisCardProps,
} from './QuestionAnalysisCard'
import ReportSummarySection, {
  ReportSummarySectionProps,
} from './ReportSummarySection'
import GeneratingPopup from '@/components/common/popup/GeneratingPopup'
import { useModal } from '@/hooks/useModal'
import { createInterviewSession } from '@/apis/interview-sessions'
import { useWaitForSessionQuestions } from '@/hooks/useWaitForSessionQuestions'
import { formatFullDate } from '@/utils/date'

interface HistoryReportSectionProps extends ReportSummarySectionProps {
  attempt: string
  title: string
  meta: string
  questionAnalyses: (QuestionAnalysisCardProps & { uuid: string })[]
  jobPostingUuid?: string | null
}

export default function HistoryReportSection({
  attempt,
  title,
  meta,
  totalScore,
  feedback,
  metrics,
  questionAnalyses,
  jobPostingUuid,
}: HistoryReportSectionProps) {
  const router = useRouter()
  const [isGenerating, setIsGenerating] = useState(false)
  const { ref: popupRef } = useModal(isGenerating, handleClose)
  const [sessionUuid, setSessionUuid] = useState<string | null>(null)

  useWaitForSessionQuestions({
    sessionUuid,
    onReady: (uuid) =>
      router.push(`/interview/job-posting/${uuid}/countdown?q=1`),
    onError: () => {
      setIsGenerating(false)
      setSessionUuid(null)
    },
  })

  const retryMutation = useMutation({
    mutationFn: () =>
      createInterviewSession({
        jobPostingUuid: jobPostingUuid!,
        interviewDate: formatFullDate(new Date()),
        retry: true,
      }),
    onSuccess: (data) => {
      if (data.questions && data.questions.length > 0) {
        router.push(`/interview/job-posting/${data.uuid}/countdown?q=1`)
        return
      }
      setSessionUuid(data.uuid)
    },
    onError: () => setIsGenerating(false),
  })

  function handleRetry() {
    if (!jobPostingUuid) return
    setIsGenerating(true)
    retryMutation.mutate()
  }

  function handleClose() {
    setIsGenerating(false)
    setSessionUuid(null)
  }

  return (
    <section className="flex flex-col gap-2 overflow-auto border border-primary rounded-2xl pt-6 px-8 pb-12">
      <div className="flex flex-row items-center justify-between mb-6">
        <div className="flex flex-col gap-2">
          <div className="flex flex-row items-center">
            <div className="bg-secondary p2 text-primary border text-center rounded-full mr-3 py-px px-2">
              {attempt}
            </div>
            <div className="h2 text-text-primary">{title}</div>
          </div>
          <div className="p3 text-gray-4">{meta}</div>
        </div>

        <button
          type="button"
          onClick={handleRetry}
          disabled={!jobPostingUuid}
          className="h3 w-30 h-13 flex items-center justify-center rounded-full bg-primary text-white shrink-0 cursor-pointer disabled:bg-gray-5 disabled:text-gray-2 disabled:cursor-default"
        >
          재시도
        </button>
      </div>

      <ReportSummarySection
        totalScore={totalScore}
        feedback={feedback}
        metrics={metrics}
      />

      <p className="p2 text-gray-1 mb-3.5">질문별 분석</p>
      <section className="flex flex-col gap-20">
        {questionAnalyses.map(({ uuid, ...item }) => (
          <QuestionAnalysisCard key={uuid} {...item} />
        ))}
      </section>

      {isGenerating && (
        <GeneratingPopup popupRef={popupRef} onClose={handleClose} />
      )}
    </section>
  )
}
