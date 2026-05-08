'use client'

import { IconChevronRight, IconChevronLeft } from '@tabler/icons-react'
import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { getCurriculumsByDate } from '@/apis/curriculum'
import { formatFullDate } from '@/utils/date'
import { getWeekDates } from '@/utils/getWeekDates'

export default function TodayScheduleSection() {
  const [isNextWeek, setIsNextWeek] = useState(false)
  const [selectedDate, setSelectedDate] = useState(formatFullDate(new Date()))

  const weekOffset = isNextWeek ? 1 : 0

  const weekDates = getWeekDates(weekOffset).map((d) => ({
    ...d,
    isSelected: d.fullDate === selectedDate,
  }))

  const handleWeekToggle = () => {
    const nextIsNextWeek = !isNextWeek
    const nextWeekOffset = nextIsNextWeek ? 1 : 0
    const nextWeekDates = getWeekDates(nextWeekOffset)

    setIsNextWeek(nextIsNextWeek)

    if (nextIsNextWeek) {
      setSelectedDate(nextWeekDates[0].fullDate)
      return
    }

    const today = formatFullDate(new Date())
    const hasToday = nextWeekDates.some((d) => d.fullDate === today)
    setSelectedDate(hasToday ? today : nextWeekDates[0].fullDate)
  }

  const { data: curriculumData, isLoading } = useQuery({
    queryKey: ['curriculumsByDate', selectedDate],
    queryFn: () => getCurriculumsByDate(selectedDate),
    enabled: Boolean(selectedDate),
  })

  const curriculumList = curriculumData ?? []
  const isEmpty = curriculumList.length === 0

  return (
    <div className="h-full w-full min-h-0 overflow-hidden rounded-2xl bg-secondary">
      <div className="flex h-full flex-col gap-4 p-6">
        <div className="flex items-center justify-between">
          <h3 className="p2 text-text-primary">오늘의 스케줄</h3>
        </div>

        <div className="flex gap-4 text-center">
          {weekDates.map((day) => (
            <button
              key={day.fullDate}
              type="button"
              onClick={() => setSelectedDate(day.fullDate)}
              className="flex flex-1 flex-col items-center gap-2"
            >
              <div
                className={[
                  'flex h-10 w-10 items-center justify-center rounded-full text-lg font-bold cursor-pointer',
                  day.isSelected
                    ? 'bg-primary text-white'
                    : 'text-text-primary',
                ].join(' ')}
              >
                {day.date}
              </div>
            </button>
          ))}

          <button
            type="button"
            onClick={handleWeekToggle}
            className="text-3xl leading-none font-light text-primary transition cursor-pointer"
            aria-label={isNextWeek ? '이번 주 보기' : '다음 주 보기'}
          >
            {isNextWeek ? <IconChevronLeft /> : <IconChevronRight />}
          </button>
        </div>

        <div className="mt-auto flex min-h-0 flex-1 flex-col">
          {isEmpty ? (
            <div className="space-y-3 overflow-hidden">
              <div className="p3 w-full rounded-lg border border-primary bg-white px-5 py-4 text-left text-gray-3 ">
                일정에 맞게 오늘의 스케줄을 생성해요
              </div>
              <div className="h-14 rounded-lg bg-white" />
              <div className="h-14 rounded-lg bg-white" />
              <div className="h-14 rounded-t-lg bg-white" />
            </div>
          ) : (
            <div className="space-y-3 overflow-y-auto pr-1">
              {curriculumList.map((item, index) => (
                <div
                  key={item.uuid}
                  className={[
                    'h-14 rounded-lg bg-white px-5 flex items-center justify-between',
                    index === 0 && 'border border-primary',
                  ].join(' ')}
                >
                  <div className="flex items-center gap-3">
                    <span className="p4 text-primary">{item.companyName}</span>
                    <p className="p3 text-text-primary">{item.content}</p>
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
