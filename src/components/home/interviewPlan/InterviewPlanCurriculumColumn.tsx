'use client'

import type { ScheduleDetail } from '@/apis/schedules/type'
import { formatMonthDay } from '@/utils/date'

type InterviewPlanCurriculumColumnProps = {
  selectedScheduleDetail?: ScheduleDetail
  isLoading: boolean
  hasSelectedSchedule: boolean
}

export default function InterviewPlanCurriculumColumn({
  selectedScheduleDetail,
  isLoading,
}: InterviewPlanCurriculumColumnProps) {
  const curriculums = selectedScheduleDetail?.curriculums ?? []
  const isEmpty = !isLoading && curriculums.length === 0

  return (
    <div className="flex flex-[1.3] flex-col ">
      <h3 className="mb-4 p2 text-text-primary">면접 커리큘럼</h3>

      {isEmpty ? (
        <div className="flex-1 rounded-lg border border-primary bg-white px-6.5 py-6.5">
          <div className="flex items-start gap-4">
            <span className="mt-2 inline-block h-2 w-2 rounded-full bg-[#977AFF]" />
            <span className="text-lg font-medium text-gray-3">
              일정을 등록하면 나만을 위한 맞춤 커리큘럼을 생성해요
            </span>
          </div>
        </div>
      ) : (
        <div className="py-6 max-h-[230px] min-h-0 flex-1 overflow-hidden rounded-lg border border-primary bg-white">
          <div className="h-full overflow-y-auto px-7">
            <div className="space-y-3">
              {curriculums.map((item) => (
                <div key={item.uuid} className="flex items-start gap-4">
                  <span
                    className={[
                      'mt-2 inline-block h-1.5 w-1.5 rounded-full',
                      item.isPast ? 'bg-[#C0AFFF]' : 'bg-[#977AFF]',
                    ].join(' ')}
                  />

                  <div className="flex min-w-0 flex-1 items-center justify-between gap-4">
                    <span
                      className={[
                        'p3',
                        item.isPast ? 'text-gray-4' : 'text-text-primary',
                      ].join(' ')}
                    >
                      {item.content}
                    </span>

                    <span
                      className={[
                        'shrink-0 p4',
                        item.isPast ? 'text-gray-4' : 'text-gray-3',
                      ].join(' ')}
                    >
                      {formatMonthDay(item.scheduledDate)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
