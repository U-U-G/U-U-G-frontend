import { useState, useRef, useEffect } from 'react'

function formatDate(date: Date): string {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}년 ${month}월 ${day}일`
}

function autoFormatDate(value: string): string {
  const digits = value.replace(/\D/g, '').slice(0, 8)
  if (digits.length === 0) return ''
  if (digits.length < 5) return digits
  if (digits.length < 7) return `${digits.slice(0, 4)}년 ${digits.slice(4)}`
  return `${digits.slice(0, 4)}년 ${digits.slice(4, 6)}월 ${digits.slice(6)}일`
}

function parseDate(value: string): Date | null {
  const match = value.match(/^(\d{4})년\s*(\d{2})월\s*(\d{2})일$/)
  if (!match) return null
  const date = new Date(
    Number(match[1]),
    Number(match[2]) - 1,
    Number(match[3]),
  )
  if (isNaN(date.getTime())) return null
  return date
}

export function useDatePicker() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [dateInput, setDateInput] = useState('')
  const [tempDate, setTempDate] = useState<Date | null>(null)
  const [showCalendar, setShowCalendar] = useState(false)
  const [calendarYear, setCalendarYear] = useState(new Date().getFullYear())
  const [calendarMonth, setCalendarMonth] = useState(new Date().getMonth())
  const calendarRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        calendarRef.current &&
        !calendarRef.current.contains(e.target as Node)
      ) {
        setShowCalendar(false)
        setTempDate(null)
      }
    }
    if (showCalendar) {
      document.addEventListener('mousedown', handleClickOutside)
    }
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [showCalendar])

  function handleDateInputChange(value: string) {
    const formatted = autoFormatDate(value)
    setDateInput(formatted)
    setSelectedDate(parseDate(formatted))
  }

  function handlePrevMonth() {
    if (calendarMonth === 0) {
      setCalendarMonth(11)
      setCalendarYear((y) => y - 1)
    } else {
      setCalendarMonth((m) => m - 1)
    }
  }

  function handleNextMonth() {
    if (calendarMonth === 11) {
      setCalendarMonth(0)
      setCalendarYear((y) => y + 1)
    } else {
      setCalendarMonth((m) => m + 1)
    }
  }

  function handleConfirm() {
    if (tempDate) {
      setSelectedDate(tempDate)
      setDateInput(formatDate(tempDate))
    }
    setShowCalendar(false)
    setTempDate(null)
  }

  function handleCancel() {
    setShowCalendar(false)
    setTempDate(null)
  }

  return {
    calendarRef,
    selectedDate,
    dateInput,
    showCalendar,
    calendarYear,
    calendarMonth,
    tempDate,
    setTempDate,
    openCalendar: () => setShowCalendar(true),
    handleDateInputChange,
    handlePrevMonth,
    handleNextMonth,
    handleConfirm,
    handleCancel,
  }
}
