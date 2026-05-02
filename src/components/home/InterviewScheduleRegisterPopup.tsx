'use client'

import { useState } from 'react'
import { IconCalendar } from '@tabler/icons-react'
import InputBox from '@/components/common/input/InputBox'
import CalendarDropdown from '@/components/common/date/CalendarDropdown'
import FormPopupLayout from '@/components/common/popup/FormPopupLayout'
import { useDatePicker } from '@/hooks/useDatePicker'
import { useModal } from '@/hooks/useModal'

interface InterviewScheduleRegisterPopupProps {
  onClose: () => void
}

export default function InterviewScheduleRegisterPopup({
  onClose,
}: InterviewScheduleRegisterPopupProps) {
  const { ref: popupRef } = useModal(true)
  const [companyAndRole, setCompanyAndRole] = useState('')
  const {
    calendarRef,
    selectedDate,
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
  } = useDatePicker()

  const canSubmit =
    companyAndRole.trim().length > 0 && selectedDate !== null

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!canSubmit) return
    // TODO: 면접 일정 등록 API 연동
    onClose()
  }

  return (
    <FormPopupLayout
      title="새로운 면접 일정 등록"
      onClose={onClose}
      popupRef={popupRef}
      onSubmit={handleSubmit}
      submitLabel="일정등록"
      canSubmit={canSubmit}
    >
      <div className="flex flex-col gap-4">
        <label htmlFor="interview-company-role" className="p4 text-gray-2">
          회사 및 직무
        </label>
        <InputBox
          id="interview-company-role"
          className="border-gray-5"
          value={companyAndRole}
          onChange={(e) => setCompanyAndRole(e.target.value)}
          status="default"
          focusPrimary
          placeholder="지원 회사명과 직무를 입력해주세요"
        />
      </div>

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
                className="cursor-pointer text-gray-4 hover:text-text-primary"
                aria-label="달력 열기"
              >
                <IconCalendar size={24} />
              </button>
            }
          />
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
    </FormPopupLayout>
  )
}
