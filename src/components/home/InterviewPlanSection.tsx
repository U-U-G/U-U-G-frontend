import { IconPlus } from '@tabler/icons-react'

export default function InterviewPlanSection() {
  return (
    <section className="rounded-2xl bg-secondary p-7">
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

          <div className="space-y-4">
            <div className="flex h-16 items-center rounded-lg border border-primary bg-white px-5 py-4">
              <span className="mr-4 text-xl font-bold text-primary">D-day</span>
              <span className="text-lg font-medium text-gray-3">
                면접 일정을 등록해주세요
              </span>
            </div>
            <div className="h-14 rounded-lg bg-white" />
            <div className="h-14 rounded-lg bg-white" />
            <div className="h-10 rounded-t-lg bg-white" />
          </div>
        </div>

        <div className="hidden w-8 justify-center pt-[80px] lg:flex">
          <div className="h-px w-full bg-primary" />
        </div>

        <div className="flex flex-[1.2] flex-col">
          <h3 className="mb-5 text-lg font-bold text-text-primary">
            면접 커리큘럼
          </h3>

          <div className="flex-1 rounded-lg border border-primary bg-white px-6.5 py-6.5">
            <div className="flex items-start gap-4">
              <span className="mt-2 inline-block h-2.5 w-2.5 rounded-full bg-[#977AFF]" />
              <span className="text-lg font-medium text-gray-3">
                일정을 등록하면 나만을 위한 맞춤 커리큘럼을 생성해요
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
