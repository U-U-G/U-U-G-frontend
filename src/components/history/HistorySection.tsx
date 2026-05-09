'use client'

import { useState, useMemo, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { useQuery } from '@tanstack/react-query'
import {
  getInterviewReports,
  type InterviewReportListItem,
} from '@/apis/interview-reports'
import { formatMonthDayKo, formatDuration } from '@/utils/date'

interface CompanyGroup {
  companyName: string
  sessions: (InterviewReportListItem & { attemptNumber: number })[]
}

function groupByCompany(reports: InterviewReportListItem[]): CompanyGroup[] {
  const map = new Map<string, InterviewReportListItem[]>()

  for (const report of reports) {
    const key = report.companyName ?? '회사명 없음'
    const existing = map.get(key)
    if (existing) {
      existing.push(report)
    } else {
      map.set(key, [report])
    }
  }

  return Array.from(map.entries()).map(([companyName, sessions]) => {
    const sorted = [...sessions].sort((a, b) => {
      const tA = a.startedAt
        ? new Date(a.startedAt).getTime()
        : new Date(a.interviewDate ?? 0).getTime()
      const tB = b.startedAt
        ? new Date(b.startedAt).getTime()
        : new Date(b.interviewDate ?? 0).getTime()
      return tA - tB
    })
    return {
      companyName,
      sessions: sorted
        .map((s, i) => ({ ...s, attemptNumber: i + 1 }))
        .reverse(),
    }
  })
}

export default function HistorySection() {
  const router = useRouter()
  const {
    data: reports = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['interview-reports'],
    queryFn: getInterviewReports,
    refetchInterval: (query) => {
      const data = query.state.data as InterviewReportListItem[] | undefined
      return data?.some((r) => !r.analysisComplete) ? 10_000 : false
    },
  })

  const groups = useMemo(() => groupByCompany(reports), [reports])
  const [selectedCompany, setSelectedCompany] = useState<string | null>(null)

  const activeCompany = selectedCompany ?? groups[0]?.companyName ?? null
  const selectedGroup = groups.find((g) => g.companyName === activeCompany)

  if (isError) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <span className="p3 text-text-point-red">
          이력을 불러오지 못했습니다. 잠시 후 다시 시도해주세요.
        </span>
      </div>
    )
  }

  return (
    <div className="flex-1 min-h-0 flex flex-col pt-6.5">
      <h1 className="h1 mb-5">연습 이력을 확인해보세요</h1>

      <div className="flex min-h-0 flex-1 gap-7.5">
        <div className="w-60.5 shrink-0 flex flex-col min-h-0">
          <p className="p2 text-gray-1 pb-4.25 border-b border-gray-5">
            회사명
          </p>
          {isLoading ? (
            <div className="flex-1 flex items-center justify-center">
              <span className="p3 text-gray-3">불러오는 중...</span>
            </div>
          ) : (
            <ul className="flex flex-col overflow-y-auto py-6 gap-4">
              {groups.map((group) => (
                <li key={group.companyName}>
                  <button
                    type="button"
                    onClick={() => setSelectedCompany(group.companyName)}
                    className={`w-full text-left px-5.5 py-4 rounded-2xl p1 cursor-pointer ${
                      activeCompany === group.companyName
                        ? 'bg-secondary text-primary'
                        : 'text-gray-2 hover:text-primary'
                    }`}
                  >
                    {group.companyName}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="flex-1 flex flex-col min-h-0">
          <p className="p2 text-gray-1 pb-3.5">이력</p>
          <div className="bg-secondary flex-1 overflow-y-auto p-6 rounded-2xl">
            {!selectedGroup || selectedGroup.sessions.length === 0 ? (
              <div className="flex items-center justify-center h-full">
                <span className="p3 text-gray-3">이력이 없습니다</span>
              </div>
            ) : (
              <div className="flex flex-col gap-7.25">
                {selectedGroup.sessions.map((session) => (
                  <HistoryCard
                    key={session.sessionUuid}
                    session={session}
                    onDetail={() =>
                      router.push(
                        `/history/${session.sessionUuid}?attempt=${session.attemptNumber}`,
                      )
                    }
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

const PROGRESS_TARGET = 92
const TICK_MS = 300

function useAnalysisProgress(analysisComplete: boolean) {
  const [progress, setProgress] = useState(0)
  const currentRef = useRef(0)

  useEffect(() => {
    if (analysisComplete) return

    currentRef.current = 0
    setProgress(0)

    const id = setInterval(() => {
      const remaining = PROGRESS_TARGET - currentRef.current
      const increment = Math.max(0.1, remaining * 0.025)
      currentRef.current = Math.min(
        PROGRESS_TARGET,
        currentRef.current + increment,
      )
      setProgress(Math.floor(currentRef.current))

      if (currentRef.current >= PROGRESS_TARGET) clearInterval(id)
    }, TICK_MS)

    return () => clearInterval(id)
  }, [analysisComplete])

  return progress
}

function HistoryCard({
  session,
  onDetail,
}: {
  session: InterviewReportListItem & { attemptNumber: number }
  onDetail: () => void
}) {
  const dateLabel = formatMonthDayKo(session.interviewDate)
  const duration = formatDuration(session.startedAt, session.endedAt)
  const progress = useAnalysisProgress(session.analysisComplete)

  return (
    <div className="w-full rounded-2xl bg-white px-7.75 py-11.25 flex items-center gap-13.25">
      <div className="shrink-0 grid grid-cols-[auto_auto] items-center gap-x-6.75 gap-y-1.25">
        <span className="p2 border border-primary text-primary rounded-full px-2.5 py-0.5 bg-secondary whitespace-nowrap self-center">
          {session.attemptNumber}차 시도
        </span>
        <span className="h3">{session.position ?? '-'}</span>
        <span className="p4 text-gray-4 col-start-2">
          {dateLabel} · {session.questionCount}문항 · {duration}
        </span>
      </div>

      <div className="flex-1 min-w-0 flex items-center ml-17">
        {!session.analysisComplete ? (
          <div className="flex items-center gap-5.75 ml-auto w-88">
            <div className="flex-1 h-3.5 rounded-full bg-gray-5 overflow-hidden">
              <div
                className="h-full bg-primary rounded-full transition-[width] duration-300 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
            <span className="p4 text-gray-2 whitespace-nowrap">
              {progress}%
            </span>
          </div>
        ) : (
          <div className="flex items-center gap-12.25 ml-auto">
            <StatItem label="침묵" value={`${session.silenceScore}점`} />
            <StatItem label="습관어" value={`${session.fillerScore}점`} />
            <StatItem label="논리" value={`${session.logicScore}점`} />
            <StatItem
              label="총점"
              value={`${session.totalScore}점`}
              highlight
            />
          </div>
        )}
      </div>

      {!session.analysisComplete ? (
        <button
          type="button"
          disabled
          className="h3 w-33.75 h-14.25 flex items-center justify-center rounded-full bg-gray-5 text-gray-2 shrink-0 cursor-default"
        >
          분석중
        </button>
      ) : (
        <button
          type="button"
          onClick={onDetail}
          className="h3 w-33.75 h-14.25 flex items-center justify-center rounded-full bg-primary text-white shrink-0 cursor-pointer"
        >
          상세보기
        </button>
      )}
    </div>
  )
}

function StatItem({
  label,
  value,
  highlight = false,
}: {
  label: string
  value: string
  highlight?: boolean
}) {
  return (
    <div className="flex flex-col items-start">
      <span className={`p4 ${highlight ? 'text-primary' : 'text-gray-2'}`}>
        {label}
      </span>
      <span className={`h2 ${highlight ? 'text-primary' : 'text-gray-2'}`}>
        {value}
      </span>
    </div>
  )
}
