'use client'

import { useState } from 'react'
import { IconCalendar } from '@tabler/icons-react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import {
  createInterviewSchedule,
  getInterviewSchedule,
  updateInterviewSchedule,
} from '@/apis/schedules'
import type {
  CreateScheduleRequest,
  UpdateScheduleRequest,
} from '@/apis/schedules/type'
import { getHttpStatus } from '@/apis/common/httpError'

import CalendarDropdown from '@/components/common/date/CalendarDropdown'
import InputBox from '@/components/common/input/InputBox'
import HelperText from '@/components/common/text/HelperText'
import FormPopupLayout from '@/components/common/popup/FormPopupLayout'

import { useDatePicker } from '@/hooks/useDatePicker'
import { useModal } from '@/hooks/useModal'
import { formatFullDate } from '@/utils/date'

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
  const [hasInterviewDateError, setHasInterviewDateError] = useState(false)
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

  const { data: scheduleDetail } = useQuery({
    queryKey: ['schedule', scheduleUuid],
    queryFn: () => getInterviewSchedule(scheduleUuid!),
    enabled: mode === 'edit' && !!scheduleUuid,
  })

  const createInterviewCurriculumsMutation = useMutation({
    mutationFn: createInterviewSchedule,
    onSuccess: (curriculum) => {
      queryClient.invalidateQueries({ queryKey: ['schedules'] })
      onClose()
    },
    onError: (e) => {
      if (getHttpStatus(e) === 400) {
        setHasInterviewDateError(true)
      }
    },
  })

  const updateInterviewCurriculumsMutation = useMutation({
    mutationFn: ({
      uuid,
      body,
    }: {
      uuid: string
      body: UpdateScheduleRequest
    }) => updateInterviewSchedule(uuid, body),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['schedules'] })
      onClose()
    },
    onError: (e) => {
      if (getHttpStatus(e) === 400) {
        setHasInterviewDateError(true)
      }
    },
  })

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!selectedDate) return

    const request: CreateScheduleRequest = {
      companyName: companyName,
      interviewDate: formatFullDate(selectedDate),
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
          placeholder={
            scheduleDetail?.companyName ?? '지원 회사명과 직무를 입력해주세요'
          }
        />
      </div>

      <div className="flex flex-col gap-4">
        <label htmlFor="interview-date" className="p4 text-gray-2">
          면접 날짜
        </label>
        <div className="relative">
          <InputBox
            id="interview-date"
            className="border-gray-5 mb-2"
            value={dateInput}
            onChange={(e) => handleDateInputChange(e.target.value)}
            status="default"
            focusPrimary
            placeholder={scheduleDetail?.interviewDate ?? '0000년 00월 00일'}
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
          {hasInterviewDateError ? (
            <HelperText status="error">
              면접 일정은 면접일 하루 전까지만 등록할 수 있어요.
            </HelperText>
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
    </FormPopupLayout>
  )
}
