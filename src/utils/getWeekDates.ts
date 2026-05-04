import { formatFullDate } from '@/utils/date'

const DAYS_IN_WEEK = 7

export const getWeekDates = (weekOffset = 0) => {
  const today = new Date()
  const sunday = new Date(today)

  sunday.setDate(today.getDate() - today.getDay() + weekOffset * DAYS_IN_WEEK)

  return Array.from({ length: DAYS_IN_WEEK }, (_, index) => {
    const d = new Date(sunday)
    d.setDate(sunday.getDate() + index)

    return {
      fullDate: formatFullDate(d),
      date: d.getDate(),
    }
  })
}
