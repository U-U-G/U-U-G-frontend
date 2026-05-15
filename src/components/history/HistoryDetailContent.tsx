'use client'

import Link from 'next/link'
import { useMemo } from 'react'
import { useQuery } from '@tanstack/react-query'
import { IconChevronLeft } from '@tabler/icons-react'
import { getInterviewReport } from '@/apis/interview-reports'
import { getJobPostingList } from '@/apis/job-postings'
import HistoryReportSection from './HistoryReportSection'
import { formatMonthDayKo, formatDuration } from '@/utils/date'
import type { MetricItem } from './ReportSummarySection'
import type { QuestionAnalysisCardProps } from './QuestionAnalysisCard'

export default function HistoryDetailContent({
  uuid,
  attempt,
}: {
  uuid: string
  attempt?: string
}) {
  const {
    data: reportResult,
    isLoading: reportLoading,
    isError,
  } = useQuery({
    queryKey: ['interview-report', uuid],
    queryFn: () => getInterviewReport(uuid),
  })

  const { data: jobPostings = [] } = useQuery({
    queryKey: ['job-postings'],
    queryFn: getJobPostingList,
    enabled: reportResult?.status === 200,
  })

  const matchingPosting = useMemo(() => {
    const d = reportResult?.data
    if (!d) return undefined
    return jobPostings
      .filter(
        (p) =>
          p.companyName === d.companyName &&
          p.position === d.position &&
          p.status === 'DONE',
      )
      .sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      )[0]
  }, [jobPostings, reportResult?.data])

  if (isError) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <span className="p3 text-text-point-red">
          리포트를 불러오지 못했습니다. 잠시 후 다시 시도해주세요.
        </span>
      </div>
    )
  }

  if (reportLoading) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <span className="p3 text-gray-3">불러오는 중...</span>
      </div>
    )
  }

  if (reportResult?.status === 202 || !reportResult?.data) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center gap-3">
        <p className="h1 text-primary">분석 중이에요</p>
        <p className="p1 text-gray-2">잠시 후 다시 확인해주세요</p>
        <Link href="/history" className="p3 text-gray-4 underline mt-2">
          연습 이력으로 돌아가기
        </Link>
      </div>
    )
  }

  const data = reportResult.data

  const attemptNumber = Number(attempt) || 1
  const title = [data.companyName, data.position].filter(Boolean).join(' ')
  const dateLabel = formatMonthDayKo(data.interviewDate)
  const duration = formatDuration(data.startedAt, data.endedAt)
  const meta = `${dateLabel} · ${data.analyses.length}문항 · ${duration}`

  const metrics: MetricItem[] = [
    {
      label: '침묵',
      value: `${data.silenceScore}점`,
      score: data.silenceScore,
    },
    {
      label: '습관어',
      value: `${data.fillerScore}점`,
      score: data.fillerScore,
    },
    {
      label: '논리/구조',
      value: `${data.logicScore}점`,
      score: data.logicScore,
    },
  ]

  const questionAnalyses: (QuestionAnalysisCardProps & { uuid: string })[] =
    data.analyses.map((a) => ({
      uuid: a.uuid,
      questionNumber: a.sequenceOrder,
      question: a.questionContent,
      answer: a.answerTranscript,
      feedback: a.aiReview,
      totalScore: a.totalScore,
      silenceScore: a.silenceScore,
      fillerScore: a.fillerScore,
      logicScore: a.logicScore,
    }))

  return (
    <div className="flex flex-col flex-1 min-h-0 overflow-auto px-[clamp(16px,2.5vw,80px)] max-w-360 mx-auto pt-2 pb-10.75 gap-3.5">
      <section className="flex flex-col gap-5.25">
        <h1 className="h1 text-xl font-semibold text-text-primary">
          면접 리포트를 확인해보세요
        </h1>
        <Link
          href="/history"
          className="p3 flex items-center gap-1 text-gray-2"
        >
          <IconChevronLeft size={18} />
          <span>연습 이력</span>
        </Link>
      </section>

      <HistoryReportSection
        attempt={`${attemptNumber}차 시도`}
        title={title}
        meta={meta}
        totalScore={`${data.totalScore}점`}
        feedback={data.aiSummary}
        metrics={metrics}
        questionAnalyses={questionAnalyses}
        jobPostingUuid={matchingPosting?.uuid ?? null}
      />
    </div>
  )
}
