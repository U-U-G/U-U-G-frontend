import { IconPlus } from '@tabler/icons-react'

type CurriculumItem = {
  id: number
  title: string
  date: string
}

type InterviewPlanItem = {
  id: number
  dDay: string
  companyName: string
  title: string
  date: string
  isSelected: boolean
  curriculum: readonly CurriculumItem[]
}

type InterviewPlanSectionProps = {
  data: readonly InterviewPlanItem[]
}

export default function InterviewPlanSection({
  data,
}: InterviewPlanSectionProps) {
  const isEmpty = data.length === 0

  const selectedPlan = data.find((plan) => plan.isSelected) ?? data[0] ?? null

  return (
    <section className="min-h-[420px] rounded-2xl bg-secondary p-7">
      <div className="flex h-full">
        <div className="flex-1">
          <div className="mb-5 flex items-center gap-2">
            <h3 className="text-lg font-bold text-text-primary">면접 일정</h3>
            <button
              type="button"
              className="text-primary"
              aria-label="면접 일정 추가"
            >
              <IconPlus className="h-5 w-5" />
            </button>
          </div>

          {isEmpty ? (
            <div className="space-y-4">
              <div className="flex h-16 items-center rounded-lg border border-primary bg-white px-5 py-4">
                <span className="mr-4 h2 text-primary">D-day</span>
                <span className="p4 text-gray-3">면접 일정을 등록해주세요</span>
              </div>
              <div className="h-14 rounded-lg bg-white" />
              <div className="h-14 rounded-lg bg-white" />
              <div className="h-10 rounded-t-lg bg-white" />
            </div>
          ) : (
            <div className="space-y-4">
              {data.map((plan, index) => (
                <div
                  key={plan.id}
                  className={[
                    'flex h-14 items-center justify-between rounded-lg bg-white px-5 py-3',
                    plan.isSelected ? 'border border-primary' : '',
                  ].join(' ')}
                >
                  <div className="flex items-center gap-4 overflow-hidden">
                    <span className="h4 text-primary">{plan.dDay}</span>

                    <span className="shrink-0 p2 text-text-primary">
                      {plan.companyName} {plan.title}
                    </span>
                  </div>

                  <span className="p4 text-gray-3">{plan.date}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="hidden w-8 justify-center pt-[220px] lg:flex">
          <div className="h-px w-full bg-primary" />
        </div>

        <div className="flex flex-[1.3] flex-col">
          <h3 className="mb-5 text-lg font-bold text-text-primary">
            면접 커리큘럼
          </h3>

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
            <div className="flex-1 rounded-lg border border-primary bg-white px-6.5 py-6.5">
              <div className="space-y-5">
                {selectedPlan?.curriculum.map((item) => (
                  <div key={item.id} className="flex items-start gap-4">
                    <span className="mt-2 inline-block h-1.5 w-1.5 rounded-full bg-[#977AFF]" />
                    <div className="flex min-w-0 flex-1 items-center justify-between gap-4">
                      <span className="truncate p3 text-text-primary">
                        {item.title}
                      </span>
                      <span className="shrink-0 p4 text-gray-3">
                        {item.date}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
