'use client'

import { useState } from 'react'
import { IconCalendar } from '@tabler/icons-react'
import { useQueryClient } from '@tanstack/react-query'
import { useQuery, useMutation } from '@tanstack/react-query'
import InputBox from '@/components/common/input/InputBox'
import CalendarDropdown from '@/components/common/date/CalendarDropdown'
import FormPopupLayout from '@/components/common/popup/FormPopupLayout'
import { useDatePicker } from '@/hooks/useDatePicker'
import { useModal } from '@/hooks/useModal'
import { scheduleApi } from '@/apis/schedules'
import {
  CreateScheduleRequest,
  UpdateScheduleRequest,
} from '@/apis/schedules/type'

export type InterviewSchedulePopupMode = 'create' | 'edit'

interface InterviewScheduleRegisterPopupProps {
  onClose: () => void
  mode?: InterviewSchedulePopupMode
  scheduleUuid?: string
}

export default function InterviewScheduleRegisterPopup({
  onClose,
  mode = 'create',
  scheduleUuid,
}: InterviewScheduleRegisterPopupProps) {
  const { ref: popupRef } = useModal(true)
  const [companyName, setCompanyName] = useState('')
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

  const canSubmit = companyName.trim().length > 0 && selectedDate !== null

  const queryClient = useQueryClient()

  const createInterviewCurriculumsMutation = useMutation({
    mutationFn: scheduleApi.createInterviewSchedule,
    onSuccess: (curriculum) => {
      queryClient.invalidateQueries({ queryKey: ['schedules'] })
      onClose()
    },
    onError: (error) => {
      console.error('생성 실패', error) //TODO: 콘솔
    },
  })

  const updateInterviewCurriculumsMutation = useMutation({
    mutationFn: ({
      uuid,
      body,
    }: {
      uuid: string
      body: UpdateScheduleRequest
    }) => scheduleApi.updateInterviewSchedule(uuid, body),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['schedules'] })
      onClose()
    },
    onError: (error) => {
      console.error('수정 실패', error) //TODO: 콘솔
    },
  })

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!selectedDate) return

    const request: CreateScheduleRequest = {
      companyName: companyName,
      interviewDate: selectedDate.toISOString().slice(0, 10),
    }

    if (mode === 'edit' && scheduleUuid) {
      updateInterviewCurriculumsMutation.mutate({
        uuid: scheduleUuid,
        body: request,
      })
      return
    }

    createInterviewCurriculumsMutation.mutate(request)
  }

  const title = mode === 'edit' ? '면접 일정 수정' : '새로운 면접 일정 등록'
  const submitLabel = mode === 'edit' ? '수정하기' : '일정등록'

  return (
    <FormPopupLayout
      title={title}
      onClose={onClose}
      popupRef={popupRef}
      onSubmit={handleSubmit}
      submitLabel={submitLabel}
      canSubmit={canSubmit}
    >
      <div className="flex flex-col gap-4">
        <label htmlFor="interview-company-role" className="p4 text-gray-2">
          회사 및 직무
        </label>
        <InputBox
          id="interview-company-role"
          className="border-gray-5"
          value={companyName}
          onChange={(e) => setCompanyName(e.target.value)}
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
