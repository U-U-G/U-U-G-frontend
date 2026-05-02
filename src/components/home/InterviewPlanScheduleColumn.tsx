'use client'

import { IconPlus } from '@tabler/icons-react'
import InterviewPlanDotsTrigger from '@/components/home/InterviewPlanDotsTrigger'
import { EMPTY_INTERVIEW_PLAN_ROWS } from '@/constants/interviewPlanEmptyRows'
import type { InterviewPlanItem } from '@/types/interviewPlan'

type InterviewPlanScheduleColumnProps = {
  data: readonly InterviewPlanItem[]
  isEmpty: boolean
  onToggleMenu: (key: string, el: HTMLElement) => void
  onOpenAddSchedule: () => void
}

export default function InterviewPlanScheduleColumn({
  data,
  isEmpty,
  onToggleMenu,
  onOpenAddSchedule,
}: InterviewPlanScheduleColumnProps) {
  return (
    <div className="flex-1 flex flex-col min-h-0">
      <div className="mb-4 flex items-center gap-2">
        <h3 className="p2 text-text-primary">면접 일정</h3>
        <button
          type="button"
          className="text-primary"
          aria-label="면접 일정 추가"
          onClick={onOpenAddSchedule}
        >
          <IconPlus className="h-5 w-5" />
        </button>
      </div>

      {isEmpty ? (
        <div className="space-y-3.5">
          {EMPTY_INTERVIEW_PLAN_ROWS.map((row) => (
            <div
              key={row.menuKey}
              data-interview-plan-row
              className={row.className}
            >
              {row.leading === 'prompt' ? (
                <div className="flex items-center gap-3 min-w-0">
                  <span className="h2 text-primary shrink-0">D-day</span>
                  <span className="p4 text-gray-3 truncate">
                    면접 일정을 등록해주세요
                  </span>
                </div>
              ) : null}
              <InterviewPlanDotsTrigger
                menuKey={row.menuKey}
                onToggleMenu={onToggleMenu}
              />
            </div>
          ))}
        </div>
      ) : (
        <div className="max-h-[248px] overflow-y-auto space-y-4 pr-2">
          {data.map((plan) => (
            <div
              key={plan.id}
              data-interview-plan-row
              className={[
                'flex h-14 items-center justify-between rounded-lg border bg-white px-5 py-3 gap-3',
                plan.isSelected ? 'border-primary' : 'border-gray-5',
              ].join(' ')}
            >
              <div className="flex items-center gap-4 overflow-hidden min-w-0 flex-1">
                <span className="h4 text-primary shrink-0">{plan.dDay}</span>

                <span className="shrink-0 p2 text-text-primary truncate">
                  {plan.companyName} {plan.title}
                </span>
              </div>

              <div className="flex items-center gap-3 shrink-0">
                <span className="p4 text-gray-3">{plan.date}</span>
                <InterviewPlanDotsTrigger
                  menuKey={`plan-${plan.id}`}
                  onToggleMenu={onToggleMenu}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
