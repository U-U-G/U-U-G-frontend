'use client'

import { useState } from 'react'
import Image from 'next/image'
import InputBox from '@/components/common/input/InputBox'
import HelperText from '@/components/common/text/HelperText'
import Button from '@/components/common/button/Button'
import character3 from '@/assets/image/uug-character3-img.png'
import { useModal } from '@/hooks/useModal'
import { useJobPostingAnalysisFlow } from '@/components/interview/jobPostingAnalysis/useJobPostingAnalysisFlow'
import AnalyzingPopup from '@/components/common/popup/AnalyzingPopup'
import GeneratingPopup from '@/components/common/popup/GeneratingPopup'
import CompanyNamePopup from '@/components/common/popup/CompanyNamePopup'
import FailedPopup from '@/components/common/popup/FailedPopup'

const JOB_URL_PATTERNS = [
  /^https?:\/\/(www\.)?wanted\.co\.kr\/wd\/\d+/,
  /^https?:\/\/(www\.)?saramin\.co\.kr\/zf_user\/jobs\//,
  /^https?:\/\/(www\.)?jobkorea\.co\.kr\/[Rr]ecruit\/[Gg][Ii]_[Rr]ead\//,
]

function isValidUrl(value: string): boolean {
  return JOB_URL_PATTERNS.some((pattern) => pattern.test(value))
}

function CompletePopup({
  popupRef,
  title,
  subtitle,
  actionLabel,
  onAction,
}: {
  popupRef: React.RefObject<HTMLDivElement | null>
  title: string
  subtitle: string
  actionLabel: string
  onAction: () => void
}) {
  return (
    <div className="fixed inset-0 bg-black/13 flex items-center justify-center z-50">
      <div
        ref={popupRef}
        className="bg-white rounded-2xl h-140.75 flex flex-col items-center justify-center w-194.5 shadow-[0_0_16px_0_rgba(99,99,99,0.16)]"
      >
        <Image
          src={character3}
          alt=""
          width={163}
          height={163}
          className="object-contain mb-5.5"
        />
        <div className="flex flex-col items-center gap-1.75 text-center px-6">
          <p className="h1 text-primary">{title}</p>
          <p className="p1 text-gray-2">{subtitle}</p>
        </div>
        <Button
          className="w-70 rounded-full! py-3 cursor-pointer mt-12"
          onClick={onAction}
        >
          <span className="h3">{actionLabel}</span>
        </Button>
      </div>
    </div>
  )
}

export default function JobPostingFormSection() {
  const [url, setUrl] = useState('')
  const {
    popupState,
    setPopupState,
    companyName,
    createJobPostingMutation,
    handleClose,
    handleCompanyNameSubmit,
    handleStartInterview,
  } = useJobPostingAnalysisFlow()

  const { ref: popupRef } = useModal(popupState !== null)

  const urlError = url.trim().length > 0 && !isValidUrl(url)
  const urlValid = url.trim().length > 0 && isValidUrl(url)
  const isComplete = urlValid

  return (
    <section className="flex flex-col flex-1 min-h-0 gap-5 pt-6.5 pb-10">
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
                placeholder="원티드, 사람인, 잡코리아 사이트의 채용공고만 가능합니다."
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

          <Button
            disabled={!isComplete}
            className="mx-auto w-101.5 rounded-full! py-3! mt-11.75 disabled:bg-gray-4 disabled:opacity-100"
            onClick={() => {
              if (!isComplete || createJobPostingMutation.isPending) return

              setPopupState('analyzing')

              createJobPostingMutation.mutate({
                url: url.trim(),
              })
            }}
          >
            <span className="h3">완료</span>
          </Button>
        </div>
      </div>

      {popupState === 'analyzing' && (
        <AnalyzingPopup popupRef={popupRef} onClose={handleClose} />
      )}
      {popupState === 'analysisFailed' && (
        <FailedPopup
          popupRef={popupRef}
          title="채용 공고 링크 분석에 실패했어요"
          onClose={handleClose}
        />
      )}
      {popupState === 'companyName' && (
        <CompanyNamePopup
          popupRef={popupRef}
          onClose={handleClose}
          onSubmit={handleCompanyNameSubmit}
        />
      )}
      {popupState === 'generating' && (
        <GeneratingPopup popupRef={popupRef} onClose={handleClose} />
      )}
      {popupState === 'questionFailed' && (
        <FailedPopup
          popupRef={popupRef}
          title="질문 생성에 실패했어요"
          onClose={handleClose}
        />
      )}
      {popupState === 'analysisComplete' && (
        <CompletePopup
          popupRef={popupRef}
          title="채용 공고 분석이 완료되었어요!"
          subtitle={`${companyName} 질문 생성을 시작해주세요.`}
          actionLabel="시작하기"
          onAction={handleStartInterview}
        />
      )}
      {popupState === 'generateQuestioncomplete' && (
        <CompletePopup
          popupRef={popupRef}
          title="질문 생성이 완료되었어요!"
          subtitle={`${companyName} 면접을 시작해주세요.`}
          actionLabel="시작하기"
          onAction={handleStartInterview}
        />
      )}
      {popupState === 'sessionCreating' && (
        <GeneratingPopup popupRef={popupRef} onClose={handleClose} />
      )}
      {popupState === 'sessionFailed' && (
        <FailedPopup
          popupRef={popupRef}
          title="면접 세션 생성에 실패했어요"
          onClose={handleClose}
        />
      )}
    </section>
  )
}
