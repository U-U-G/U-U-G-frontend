'use client'

import { useState, useEffect, useRef } from 'react'
import { IconCalendar, IconChevronDown } from '@tabler/icons-react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import {
  createInterviewSchedule,
  getScheduleJobPostings,
  updateInterviewSchedule,
} from '@/apis/schedules'
import type {
  ScheduleJobPosting,
  UpdateScheduleRequest,
} from '@/apis/schedules/type'
import { getHttpStatus } from '@/apis/common/httpError'

import CalendarDropdown from '@/components/common/date/CalendarDropdown'
import InputBox from '@/components/common/input/InputBox'
import HelperText from '@/components/common/text/HelperText'
import FormPopupLayout from '@/components/common/popup/FormPopupLayout'

import { useDatePicker } from '@/hooks/useDatePicker'
import { useModal } from '@/hooks/useModal'
import { formatFullDate, formatDateKo, parseKoreanDate } from '@/utils/date'

export type InterviewSchedulePopupMode = 'create' | 'edit'

type JobPostingLabelSource = {
  companyName?: string
  position?: string
}

function formatJobPostingLabel({
  companyName,
  position,
}: JobPostingLabelSource) {
  return [companyName, position].filter(Boolean).join(' / ')
}

interface InterviewScheduleRegisterPopupProps {
  onClose: () => void
  mode?: InterviewSchedulePopupMode
  scheduleUuid?: string
  initialSchedule?: {
    companyName: string
    interviewDate: string
  }
}

export default function InterviewScheduleRegisterPopup({
  onClose,
  mode = 'create',
  scheduleUuid,
  initialSchedule,
}: InterviewScheduleRegisterPopupProps) {
  const isEditMode = mode === 'edit'
  const { ref: popupRef } = useModal(true)
  const companyDropdownRef = useRef<HTMLDivElement>(null)
  const [selectedJobPostingLabel, setSelectedJobPostingLabel] = useState('')
  const [selectedJobPostingUuid, setSelectedJobPostingUuid] = useState<
    string | null
  >(null)
  const [showCompanyListDropdown, setShowCompanyListDropdown] = useState(false)
  const [helperTextMessage, setHelperTextMessage] = useState('')
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
    (isEditMode ? true : !!selectedJobPostingUuid) && selectedDate !== null

  const queryClient = useQueryClient()

  const { data: jobPostings = [], isLoading: isJobPostingsLoading } = useQuery({
    queryKey: ['schedules', 'job-postings'],
    queryFn: getScheduleJobPostings,
    enabled: !isEditMode && showCompanyListDropdown,
  })

  const createScheduleMutation = useMutation({
    mutationFn: createInterviewSchedule,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['schedules'] })
      onClose()
    },
    onError: handleScheduleError,
  })

  const updateScheduleMutation = useMutation({
    mutationFn: ({
      uuid,
      body,
    }: {
      uuid: string
      body: UpdateScheduleRequest
    }) => updateInterviewSchedule(uuid, body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['schedules'] })
      onClose()
    },
    onError: handleScheduleError,
  })

  function handleScheduleError(error: unknown) {
    const status = getHttpStatus(error)

    if (status === 400) {
      setHelperTextMessage(
        '면접 일정은 면접일 하루 전 날짜까지만 등록할 수 있어요.',
      )
      return
    }

    if (status === 409) {
      setHelperTextMessage(
        '해당 채용 공고에 대한 면접 일정이 이미 등록되어 있습니다.',
      )
    }
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!selectedDate) return

    const interviewDate = formatFullDate(selectedDate)

    if (isEditMode && scheduleUuid) {
      updateScheduleMutation.mutate({
        uuid: scheduleUuid,
        body: { interviewDate },
      })
      return
    }

    if (!selectedJobPostingUuid) return

    createScheduleMutation.mutate({
      jobPostingUuid: selectedJobPostingUuid,
      interviewDate,
    })
  }

  const title = isEditMode ? '면접 일정 수정' : '새로운 면접 일정 등록'
  const submitLabel = isEditMode ? '수정하기' : '일정등록'

  useEffect(() => {
    if (!isEditMode || !initialSchedule) return

    setSelectedJobPostingLabel(formatJobPostingLabel(initialSchedule))

    handleDateInputChange(
      formatDateKo(parseKoreanDate(initialSchedule.interviewDate)),
    )
  }, [isEditMode, initialSchedule])

  useEffect(() => {
    if (!showCompanyListDropdown) return

    function handleClickOutside(e: MouseEvent) {
      if (companyDropdownRef.current?.contains(e.target as Node)) return
      setShowCompanyListDropdown(false)
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [showCompanyListDropdown])

  const handleSelectJobPosting = (item: ScheduleJobPosting) => {
    setSelectedJobPostingLabel(formatJobPostingLabel(item))
    setSelectedJobPostingUuid(item.jobPostingUuid)
    setShowCompanyListDropdown(false)
  }

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
        {isEditMode ? (
          <InputBox
            id="interview-company-role"
            className="border-gray-5 text-gray-4"
            value={selectedJobPostingLabel}
            disabled
            status="default"
          />
        ) : (
          <div className="relative" ref={companyDropdownRef}>
            <div
              className={`rounded-lg border border-gray-4 bg-white ${
                showCompanyListDropdown ? 'rounded-b-none border-b-0' : ''
              }`}
            >
              <InputBox
                id="interview-company-role"
                className="cursor-pointer rounded-none border-0 hover:border-0 focus:border-0"
                value={selectedJobPostingLabel}
                readOnly
                status="default"
                focusPrimary={false}
                placeholder="지원 회사와 직무를 선택해 주세요."
                rightElement={
                  <button
                    type="button"
                    onClick={() => setShowCompanyListDropdown((prev) => !prev)}
                    className="cursor-pointer text-gray-4 hover:text-text-primary"
                    aria-label="회사 및 직무 선택"
                    aria-expanded={showCompanyListDropdown}
                  >
                    <IconChevronDown size={24} aria-hidden />
                  </button>
                }
              />
            </div>
            {showCompanyListDropdown && (
              <div className="absolute z-[60] w-full overflow-hidden rounded-b-lg border border-t-0 border-gray-4 bg-white ">
                <div className="mx-4 border-t border-gray-5" />
                <div className="max-h-48 overflow-y-auto">
                  {isJobPostingsLoading ? (
                    <p className="p4 px-4 py-3 text-gray-3">
                      목록을 불러오는 중입니다. 잠시만 기다려주세요.
                    </p>
                  ) : jobPostings.length === 0 ? (
                    <p className="p4 px-4 py-3 text-gray-3">
                      등록된 채용공고가 없어요.
                    </p>
                  ) : (
                    jobPostings.map((item) => (
                      <button
                        key={item.jobPostingUuid}
                        type="button"
                        onClick={() => handleSelectJobPosting(item)}
                        className="p4 w-full cursor-pointer px-4 py-3 text-left text-text-primary hover:bg-secondary"
                      >
                        {formatJobPostingLabel(item)}
                      </button>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>
        )}
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
    </FormPopupLayout>
  )
}
