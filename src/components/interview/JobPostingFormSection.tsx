'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import {
  IconCalendar,
  IconChevronLeft,
  IconChevronRight,
} from '@tabler/icons-react'
import { useMutation, useQuery } from '@tanstack/react-query'
import InputBox from '@/components/common/input/InputBox'
import HelperText from '@/components/common/text/HelperText'
import Button from '@/components/common/button/Button'
import character2 from '@/assets/image/uug-character2-img.png'
import character3 from '@/assets/image/uug-character3-img.png'
import speechBubble from '@/assets/image/speech-bubble-img.png'
import { useDatePicker } from '@/hooks/useDatePicker'
import { useModal } from '@/hooks/useModal'
import { createJobPosting } from '@/apis/job-postings'

const DAYS = ['일', '월', '화', '수', '목', '금', '토']

const JOB_URL_PATTERNS = [
  /^https?:\/\/(www\.)?wanted\.co\.kr\/wd\/\d+/,
  /^https?:\/\/(www\.)?saramin\.co\.kr\/zf_user\/jobs\//,
]

function isValidUrl(value: string): boolean {
  return JOB_URL_PATTERNS.some((pattern) => pattern.test(value))
}

function GeneratingPopup({
  popupRef,
  onClose,
}: {
  popupRef: React.RefObject<HTMLDivElement | null>
  onClose: () => void
}) {
  return (
    <div className="fixed inset-0 bg-black/13 flex items-center justify-center z-50">
      <div
        ref={popupRef}
        className="bg-white rounded-2xl py-25 flex flex-col items-center w-194.5 shadow-[0_0_16px_0_rgba(99,99,99,0.16)]"
      >
        <div className="relative mb-4.5">
          <Image
            src={character2}
            alt="캐릭터"
            width={158}
            height={154}
            className="object-contain"
          />
          <Image
            src={speechBubble}
            alt="말풍선"
            width={57}
            height={45}
            className="absolute -top-4 -right-6 object-contain"
          />
        </div>
        <div className="flex flex-col items-center gap-1.75 mb-12">
          <p className="h1 text-primary">질문을 생성 중이에요</p>
          <p className="p1 text-gray-2">
            공고에 특화된 질문을 AI가 생성하고 있습니다.
          </p>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="w-70 rounded-full border border-primary text-primary h3 py-3 cursor-pointer hover:bg-secondary"
        >
          중단 하기
        </button>
      </div>
    </div>
  )
}

function CompletePopup({
  popupRef,
  onStart,
}: {
  popupRef: React.RefObject<HTMLDivElement | null>
  onStart: () => void
}) {
  return (
    <div className="fixed inset-0 bg-black/13 flex items-center justify-center z-50">
      <div
        ref={popupRef}
        className="bg-white rounded-2xl pt-21.75 pb-25 flex flex-col items-center w-194.5 shadow-[0_0_16px_0_rgba(99,99,99,0.16)]"
      >
        <Image
          src={character3}
          alt="캐릭터"
          width={163}
          height={163}
          className="object-contain mb-5.5"
        />
        <div className="flex flex-col items-center gap-1.75">
          <p className="h1 text-primary">질문 생성이 완료되었어요!</p>
          <p className="p1 text-gray-2">면접을 시작해주세요.</p>
        </div>
        <Button
          className="w-70 rounded-full! py-3 cursor-pointer mt-12"
          onClick={onStart}
        >
          <span className="h3">시작 하기</span>
        </Button>
      </div>
    </div>
  )
}

function CalendarDropdown({
  calendarRef,
  year,
  month,
  tempDate,
  onPrevMonth,
  onNextMonth,
  onSelectDate,
  onConfirm,
  onCancel,
}: {
  calendarRef: React.RefObject<HTMLDivElement | null>
  year: number
  month: number
  tempDate: Date | null
  onPrevMonth: () => void
  onNextMonth: () => void
  onSelectDate: (date: Date) => void
  onConfirm: () => void
  onCancel: () => void
}) {
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

export default function JobPostingFormSection() {
  const router = useRouter()
  const [url, setUrl] = useState('')
  const [company, setCompany] = useState('')
  const [popupState, setPopupState] = useState<
    'generating' | 'complete' | null
  >(null)
  const [jobPostingUuid, setJobPostingUuid] = useState<string | null>(null)

  const { ref: popupRef } = useModal(popupState !== null)
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

  const urlError = url.trim().length > 0 && !isValidUrl(url)
  const urlValid = url.trim().length > 0 && isValidUrl(url)
  const isComplete =
    url.trim().length > 0 && company.trim().length > 0 && selectedDate !== null

  const createJobPostingMutation = useMutation({
    mutationFn: createJobPosting,
    onSuccess: (response) => {
      setPopupState('complete')
      setJobPostingUuid(response.uuid)
    },
    onError: (error) => {
      console.error('공고 조회 실패', error)
    },
  })

  return (
    <section className="flex flex-col flex-1 min-h-0 gap-5 px-10 pt-6.5 pb-10">
      <h1 className="h1 w-full">공고 맞춤 면접 연습</h1>

      <div className="flex-1 min-h-0 flex flex-col items-center justify-center w-full min-w-200 bg-secondary rounded-2xl border border-primary">
        <div className="flex flex-col gap-8.5 w-115">
          <div className="flex flex-col gap-5">
            <label className="p3 border-b border-gray-5 h-10">
              <span className="text-primary">채용 공고 링크</span>를
              입력해주세요
            </label>
            <div className="relative">
              <InputBox
                className="bg-white"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                status={urlError ? 'error' : 'default'}
                placeholder="원티드,사람인 사이트의 채용공고만 가능합니다."
                focusPrimary
              />
              <div className="absolute left-0 top-full pt-1">
                <HelperText
                  status={urlError ? 'error' : urlValid ? 'success' : 'empty'}
                >
                  {urlValid
                    ? '링크가 확인되었습니다.'
                    : '올바른 URL이 아닙니다. 다시 입력해주세요.'}
                </HelperText>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-5">
            <label className="p3 border-b border-gray-5 h-10">
              <span className="text-primary">회사명</span>을 입력해주세요
            </label>
            <InputBox
              className="bg-white"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              focusPrimary
            />
          </div>

          <div className="flex flex-col gap-5 relative">
            <label className="p3 border-b border-gray-5 h-10">
              <span className="text-primary">면접 일정</span>을 입력해주세요
            </label>
            <div className="relative">
              <InputBox
                className="bg-white"
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
                  >
                    <IconCalendar size={24} />
                  </button>
                }
              />
            </div>
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
              />
            )}
          </div>

          <Button
            disabled={!isComplete}
            className="mx-auto w-101.5 rounded-full! py-3! mt-11.75 disabled:bg-gray-4 disabled:opacity-100"
            onClick={() => {
              if (!isComplete || createJobPostingMutation.isPending) return

              setPopupState('generating')

              createJobPostingMutation.mutate({
                url: url.trim(),
              })
            }}
          >
            <span className="h3">완료</span>
          </Button>
        </div>
      </div>

      {popupState === 'generating' && (
        <GeneratingPopup
          popupRef={popupRef}
          onClose={() => setPopupState(null)}
        />
      )}
      {popupState === 'complete' && (
        <CompletePopup
          popupRef={popupRef}
          onStart={() =>
            router.push(`/interview/job-posting/${jobPostingUuid}/countdown`)
          }
        />
      )}
    </section>
  )
}
