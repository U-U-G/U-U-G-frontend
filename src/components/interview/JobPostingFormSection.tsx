'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { useMutation } from '@tanstack/react-query'
import InputBox from '@/components/common/input/InputBox'
import HelperText from '@/components/common/text/HelperText'
import Button from '@/components/common/button/Button'
import character3 from '@/assets/image/uug-character3-img.png'
import { useModal } from '@/hooks/useModal'
import { createJobPosting } from '@/apis/job-postings'
import GeneratingPopup from '@/components/common/popup/GeneratingPopup'

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

export default function JobPostingFormSection() {
  const router = useRouter()
  const [url, setUrl] = useState('')
  const [popupState, setPopupState] = useState<
    'generating' | 'complete' | null
  >(null)

  const { ref: popupRef } = useModal(popupState !== null)

  const urlError = url.trim().length > 0 && !isValidUrl(url)
  const urlValid = url.trim().length > 0 && isValidUrl(url)
  const isComplete = urlValid

  const createJobPostingMutation = useMutation({
    mutationFn: createJobPosting,
    onSuccess: (jobPosting) => {
      setPopupState('complete')
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
          onStart={() => router.push('/interview/job-posting/countdown')}
        />
      )}
    </section>
  )
}
