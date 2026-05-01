import { IconChevronLeft, IconChevronRight } from '@tabler/icons-react'

const DAYS = ['일', '월', '화', '수', '목', '금', '토']

interface CalendarDropdownProps {
  calendarRef: React.RefObject<HTMLDivElement | null>
  year: number
  month: number
  tempDate: Date | null
  onPrevMonth: () => void
  onNextMonth: () => void
  onSelectDate: (date: Date) => void
  onConfirm: () => void
  onCancel: () => void
}

export default function CalendarDropdown({
  calendarRef,
  year,
  month,
  tempDate,
  onPrevMonth,
  onNextMonth,
  onSelectDate,
  onConfirm,
  onCancel,
}: CalendarDropdownProps) {
  const firstDay = new Date(year, month, 1).getDay()
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const calendarDays = Array.from({ length: 42 }, (_, i) => {
    const day = i - firstDay + 1
    return day > 0 && day <= daysInMonth ? day : null
  })

  return (
    <div
      ref={calendarRef}
      className="absolute bottom-18 right-0 z-50 bg-white rounded-xl shadow-[0_0_16px_0_rgba(99,99,99,0.16)] p-4 w-82"
    >
      <div className="flex items-center justify-between mb-3">
        <button
          type="button"
          onClick={onPrevMonth}
          className="cursor-pointer p-1 hover:text-primary"
        >
          <IconChevronLeft
            size={20}
            className="text-gray-4 hover:text-text-primary"
          />
        </button>
        <span className="p4">
          {year}년 {month + 1}월
        </span>
        <button
          type="button"
          onClick={onNextMonth}
          className="cursor-pointer p-1 hover:text-primary"
        >
          <IconChevronRight
            size={20}
            className="text-gray-4 hover:text-text-primary"
          />
        </button>
      </div>
      <div className="grid grid-cols-7 mb-2.5">
        {DAYS.map((day) => (
          <div key={day} className="text-center p4 text-gray-4">
            {day}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7">
        {calendarDays.map((day, i) => {
          const isSelected =
            tempDate !== null &&
            tempDate.getFullYear() === year &&
            tempDate.getMonth() === month &&
            tempDate.getDate() === day
          return (
            <button
              key={i}
              type="button"
              disabled={!day}
              onClick={() => day && onSelectDate(new Date(year, month, day))}
              className={`text-center p4 py-1.5 rounded-full ${!day ? 'invisible' : 'cursor-pointer'} ${isSelected ? 'text-primary' : 'hover:text-primary'}`}
            >
              {day}
            </button>
          )
        })}
      </div>
      <div className="flex justify-end gap-6">
        <button
          type="button"
          onClick={onCancel}
          className="p4 text-gray-4 cursor-pointer hover:text-primary"
        >
          취소
        </button>
        <button
          type="button"
          onClick={onConfirm}
          disabled={!tempDate}
          className={`p4 cursor-pointer ${tempDate ? 'text-primary' : 'text-gray-4'}`}
        >
          확인
        </button>
      </div>
    </div>
  )
}

// 나중에 이렇게 사용
// import CalendarDropdown from '@/components/common/calendar/CalendarDropdown'
// import { useDatePicker } from '@/hooks/useDatePicker'

// const { calendarRef, year, month, tempDate, setTempDate, ... } = useDatePicker()

// {showCalendar && (
//   <CalendarDropdown
//     calendarRef={calendarRef}
//     year={calendarYear}
//     month={calendarMonth}
//     tempDate={tempDate}
//     onPrevMonth={handlePrevMonth}
//     onNextMonth={handleNextMonth}
//     onSelectDate={setTempDate}
//     onConfirm={handleConfirm}
//     onCancel={handleCancel}
//   />
// )}
