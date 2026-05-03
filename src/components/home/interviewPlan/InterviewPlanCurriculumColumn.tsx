'use client'

import type { InterviewPlanItem } from '@/types/interviewPlan'

type InterviewPlanCurriculumColumnProps = {
  isEmpty: boolean
  selectedPlan: InterviewPlanItem | null
}

export default function InterviewPlanCurriculumColumn({
  isEmpty,
  selectedPlan,
}: InterviewPlanCurriculumColumnProps) {
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
        <div className="max-h-[248px] flex-1 rounded-lg border border-primary bg-white px-6.5 py-6.5">
          <div className="space-y-4">
            {selectedPlan?.curriculum.slice(0, 5).map((item) => (
              <div key={item.id} className="flex items-start gap-4">
                <span className="mt-2 inline-block h-1.5 w-1.5 rounded-full bg-[#977AFF]" />
                <div className="flex min-w-0 flex-1 items-center justify-between gap-4">
                  <span className="truncate p3 text-text-primary">
                    {item.title}
                  </span>
                  <span className="shrink-0 p4 text-gray-3">{item.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
