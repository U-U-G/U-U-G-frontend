const DAYS_IN_WEEK = 7

/*Date 객체를 YYYY-MM-DD 형식의 문자열로 변환하는 함수*/
export const formatFullDate = (date: Date) => {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')

  return `${year}-${month}-${day}`
}

/*특정 주의 일요일부터 토요일까지 날짜 목록을 생성하는 함수*/
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
