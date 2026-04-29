'use client'

import { useState } from 'react'
import { historyMockData, type PracticeSession } from '@/mocks/historyMockData'

export default function HistorySection() {
  const [selectedId, setSelectedId] = useState<number>(
    historyMockData[0]?.id ?? -1,
  )

  const selectedCompany = historyMockData.find((c) => c.id === selectedId)

  return (
    <div className="flex-1 min-h-0 flex flex-col overflow-hidden">
      <div className="flex-1 min-h-0 max-w-360 w-full mx-auto flex flex-col pt-6.5 px-10">
        <h1 className="h1 mb-5">연습 이력을 확인해보세요</h1>

        <div className="flex min-h-0 flex-1 gap-7.5">
          <div className="w-60.5 shrink-0 flex flex-col min-h-0">
            <p className="p2 text-gray-1 pb-4.25 border-b border-gray-5">
              회사명
            </p>
            <ul className="flex flex-col overflow-y-auto py-6 gap-4">
              {historyMockData.map((company) => (
                <li key={company.id}>
                  <button
                    type="button"
                    onClick={() => setSelectedId(company.id)}
                    className={`w-full text-left px-5.5 py-4 rounded-2xl p1 cursor-pointer ${
                      selectedId === company.id
                        ? 'bg-secondary text-primary'
                        : 'text-gray-2 hover:text-primary'
                    }`}
                  >
                    {company.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex-1 flex flex-col min-h-0">
            <p className="p2 text-gray-1 pb-3.5">이력</p>
            <div className="bg-secondary flex-1 overflow-y-auto p-6 rounded-2xl">
              <div className="flex flex-col gap-7.25">
                {selectedCompany?.sessions.map((session) => (
                  <HistoryCard key={session.id} session={session} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function HistoryCard({ session }: { session: PracticeSession }) {
  return (
    <div className="w-full rounded-2xl bg-white px-7.75 py-11.25 flex items-center gap-13.25">
      <div className="shrink-0 grid grid-cols-[auto_auto] items-center gap-x-6.75 gap-y-1.25">
        <span className="p2 border border-primary text-primary rounded-full px-2.5 py-0.5 bg-secondary whitespace-nowrap self-center">
          {session.attempt}차 시도
        </span>
        <span className="h3">{session.job}</span>
        <span className="p4 text-gray-4 col-start-2">
          {session.date} · {session.questionCount}문항 · {session.duration}
        </span>
      </div>

      <div className="flex-1 min-w-0 flex items-center ml-17">
        {session.status === 'analyzing' ? (
          <div className="flex items-center gap-5.75 ml-auto w-88">
            <div className="flex-1 h-3.5 rounded-full bg-gray-5 overflow-hidden">
              <div
                className="h-full bg-primary rounded-full"
                style={{ width: `${session.analysisProgress}%` }}
              />
            </div>
            <span className="p4 text-gray-2 whitespace-nowrap">
              {session.analysisProgress}%
            </span>
          </div>
        ) : (
          <div className="flex items-center gap-12.25 ml-auto">
            <StatItem label="침묵" value={`${session.silenceSec}초`} />
            <StatItem label="습관어" value={`${session.fillerCount}회`} />
            <StatItem label="논리" value={`${session.logicScore}점`} />
            <StatItem
              label="총점"
              value={`${session.totalScore}점`}
              highlight
            />
          </div>
        )}
      </div>

      {session.status === 'analyzing' ? (
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
