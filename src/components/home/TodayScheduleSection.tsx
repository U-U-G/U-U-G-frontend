import { IconChevronRight } from '@tabler/icons-react'

const weekDays = [
  { label: '일', date: 19 },
  { label: '월', date: 20, active: true },
  { label: '화', date: 21 },
  { label: '수', date: 22 },
  { label: '목', date: 23 },
  { label: '금', date: 24 },
  { label: '토', date: 25 },
]

export default function TodayScheduleSection() {
  return (
    <div className="h-[480px] flex-1 overflow-hidden rounded-2xl bg-secondary">
      <div className="flex h-full flex-col gap-8 p-7">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-text-primary">오늘의 스케줄</h3>
        </div>

        <div className="flex gap-4 text-center">
          {weekDays.map((day) => (
            <div
              key={`${day.label}-${day.date}`}
              className="flex flex-1 flex-col items-center gap-1.5"
            >
              <span className="text-lg font-medium text-[#6f6f73]">
                {day.label}
              </span>
              <div
                className={[
                  'flex h-10 w-10 items-center justify-center rounded-full text-xl font-bold',
                  day.active ? 'bg-primary text-white' : 'text-text-primary',
                ].join(' ')}
              >
                {day.date}
              </div>
            </div>
          ))}
          <button
            type="button"
            className="text-3xl leading-none font-light text-primary transition"
            aria-label="다음 주 보기"
          >
            <IconChevronRight />
          </button>
        </div>

        <div className="mt-auto space-y-3.5">
          <div className="w-full rounded-lg border border-primary bg-white px-5 py-4 text-left text-lg font-medium text-gray-3">
            일정에 맞게 오늘의 스케줄을 생성해요
          </div>
          <div className="h-14 rounded-lg bg-white" />
          <div className="h-14 rounded-lg bg-white" />
          <div className="h-9 rounded-t-lg bg-white" />
        </div>
      </div>
    </div>
  )
}
