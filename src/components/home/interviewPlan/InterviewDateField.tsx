'use client'

import { IconCalendar } from '@tabler/icons-react'

import CalendarDropdown from '@/components/common/date/CalendarDropdown'
import InputBox from '@/components/common/input/InputBox'
import HelperText from '@/components/common/text/HelperText'
import { useDatePicker } from '@/hooks/useDatePicker'

interface InterviewDateFieldProps {
  datePicker: ReturnType<typeof useDatePicker>
  helperTextMessage: string
}

export default function InterviewDateField({
  datePicker,
  helperTextMessage,
}: InterviewDateFieldProps) {
  const {
    calendarRef,
    dateInput,
    showCalendar,
    calendarYear,
    calendarMonth,
    tempDate,
    setTempDate,
    openCalendar,
    handleDateInputChange,
    handlePrevMonth,
    handleNextMonth,
    handleConfirm,
    handleCancel,
  } = datePicker

  return (
    <div className="flex flex-col gap-4">
      <label htmlFor="interview-date" className="p4 text-gray-2">
        면접 날짜
      </label>

      <div className="relative">
        <InputBox
          id="interview-date"
          className="border-gray-5"
          value={dateInput}
          onChange={(e) => handleDateInputChange(e.target.value)}
          status="default"
          focusPrimary
          placeholder="0000년 00월 00일"
          rightElement={
            <button
              type="button"
              onClick={openCalendar}
              className="cursor-pointer text-gray-4 hover:text-primary"
              aria-label="달력 열기"
            >
              <IconCalendar size={24} />
            </button>
          }
        />

        {helperTextMessage ? (
          <HelperText status="error">{helperTextMessage}</HelperText>
        ) : (
          '\u00A0'
        )}

        {showCalendar && (
          <CalendarDropdown
            calendarRef={calendarRef}
            year={calendarYear}
            month={calendarMonth}
            tempDate={tempDate}
            onPrevMonth={handlePrevMonth}
            onNextMonth={handleNextMonth}
            onSelectDate={setTempDate}
            onConfirm={handleConfirm}
            onCancel={handleCancel}
            className="absolute right-0 bottom-full mb-2 z-[60] bg-white rounded-xl shadow-[0_0_16px_0_rgba(99,99,99,0.16)] p-4 w-82"
          />
        )}
      </div>
    </div>
  )
}
