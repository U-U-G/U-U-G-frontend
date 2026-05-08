/**
 * Date 객체를 YYYY-MM-DD 형식 문자열로 변환합니다.
 */
export function formatFullDate(date: Date): string {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')

  return `${year}-${month}-${day}`
}

/**
 * Date 객체를 YYYY년 MM월 DD일 형식 문자열로 변환합니다.
 */
export function formatDateKo(date: Date): string {
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')

  return `${y}년 ${m}월 ${d}일`
}

/**
 * YYYY-MM-DD 형식 문자열을 한국 날짜 포맷으로 변환합니다.
 */
export function formatDateToLocale(dateString: string): string {
  return formatDateKo(parseKoreanDate(dateString))
}

/**
 * YYYY-MM-DD 문자열을 한국 시간(KST) 기준 Date 객체로 변환합니다.
 */
export function parseKoreanDate(dateString: string): Date {
  const [year, month, day] = dateString.split('-').map(Number)

  return new Date(year, month - 1, day)
}

/**
 * YYYY-MM-DD 문자열을 MM.DD 형식으로 변환합니다.
 */
export function formatMonthDay(dateString: string): string {
  const date = parseKoreanDate(dateString)

  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')

  return `${month}.${day}`
}

/**
 * YYYY-MM-DD 문자열 기준 D-Day 문자열을 반환합니다.
 */
export function getDDay(dateString: string): string {
  const today = new Date()
  const target = parseKoreanDate(dateString)

  const todayDate = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate(),
  )

  const targetDate = new Date(
    target.getFullYear(),
    target.getMonth(),
    target.getDate(),
  )

  const diffDay = Math.ceil(
    (targetDate.getTime() - todayDate.getTime()) / (1000 * 60 * 60 * 24),
  )

  if (diffDay === 0) return 'D-Day'

  return `D-${diffDay}`
}
