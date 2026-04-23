import { IconChevronRight } from '@tabler/icons-react'

type WeekDate = {
  dayLabel: string
  date: number
  fullDate: string
  isSelected: boolean
}

type ScheduleItem = {
  id: number
  label: string
  title: string
  time: string
}

type TodayScheduleData = {
  selectedDate: string
  weekDates: readonly WeekDate[]
  schedules: readonly ScheduleItem[]
}

const weekDays = [
  { label: '일', date: 19 },
  { label: '월', date: 20, active: true },
  { label: '화', date: 21 },
  { label: '수', date: 22 },
  { label: '목', date: 23 },
  { label: '금', date: 24 },
  { label: '토', date: 25 },
]

export default function TodayScheduleSection({
  data,
}: {
  data: TodayScheduleData
}) {
  const isEmpty = data.schedules.length === 0

  return (
    <div className="h-[480px] flex-1 overflow-hidden rounded-2xl bg-secondary">
      <div className="flex h-full flex-col gap-8 p-7">
        <div className="flex items-center justify-between">
          <h3 className="p2 text-text-primary">오늘의 스케줄</h3>
        </div>

        <div className="flex gap-4 text-center">
          {data.weekDates.map((day) => (
            <div
              key={day.fullDate}
              className="flex flex-1 flex-col items-center gap-4"
            >
              <span className="p4 text-text-primary">{day.dayLabel}</span>
              <div
                className={[
                  'flex h-10 w-10 items-center justify-center rounded-full text-xl font-bold',
                  day.isSelected
                    ? 'bg-primary text-white'
                    : 'text-text-primary',
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

        <div className="mt-auto flex min-h-0 flex-1 flex-col">
          {isEmpty ? (
            <div className="space-y-3.5">
              <div className="p3 w-full rounded-lg border border-primary bg-white px-5 py-4 text-left text-gray-3">
                일정에 맞게 오늘의 스케줄을 생성해요
              </div>
              <div className="h-14 rounded-lg bg-white" />
              <div className="h-14 rounded-lg bg-white" />
              <div className="h-9 rounded-t-lg bg-white" />
            </div>
          ) : (
            <div className="space-y-3 overflow-y-auto pr-1">
              {data.schedules.map((schedule, index) => (
                <div
                  key={schedule.id}
                  className={[
                    'h-14 rounded-lg bg-white px-5 flex items-center justify-between',
                    index === 0 && 'border border-primary',
                  ].join(' ')}
                >
                  <div className="flex items-center gap-3">
                    <span className="p4 text-primary">{schedule.label}</span>
                    <p className="p3 text-text-primary">{schedule.title}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
