'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import robotImg from '@/assets/image/uug-character4-img.png'
import analysisImg from '@/assets/image/analysis-img.png'
import Button from '@/components/common/button/Button'
import { interviewMockData } from '@/mocks/interviewMockData'

const { company: COMPANY, job: JOB, round: ROUND } = interviewMockData.session

const MESSAGES = [
  `${COMPANY} ${JOB} ${ROUND}차 면접 결과 분석중 ...`,
  '꼼꼼하게 분석 중이에요. 조금만 기다려주세요...',
  '곧 나만의 맞춤 면접 리포트가 완성됩니다...',
]

const MESSAGE_INTERVAL = 4000
const PROGRESS_INTERVAL = 600
const MAX_PROGRESS = 92
// TODO: API 연동 시 제거 — 실제로는 API 응답으로 complete 전환
const DEMO_COMPLETE_DELAY = 10000

export default function AnalysisSection() {
  const router = useRouter()
  const [progress, setProgress] = useState(0)
  const [messageIndex, setMessageIndex] = useState(0)
  const [isComplete, setIsComplete] = useState(false)

  useEffect(() => {
    const progressTimer = setInterval(() => {
      setProgress((p) => (p < MAX_PROGRESS ? p + 1 : p))
    }, PROGRESS_INTERVAL)

    const completeTimer = setTimeout(() => {
      setIsComplete(true)
      setProgress(100)
    }, DEMO_COMPLETE_DELAY)

    return () => {
      clearInterval(progressTimer)
      clearTimeout(completeTimer)
    }
  }, [])

  useEffect(() => {
    if (isComplete) return
    const timer = setInterval(() => {
      setMessageIndex((i) => (i + 1) % MESSAGES.length)
    }, MESSAGE_INTERVAL)
    return () => clearInterval(timer)
  }, [isComplete])

  if (isComplete) {
    return (
      <section className="flex flex-col flex-1 min-h-0 gap-5 px-10 pt-6.5 pb-10">
        <h1 className="h1 w-full">면접 연습 분석</h1>

        <div className="flex flex-col items-center justify-center w-full min-w-200 bg-secondary rounded-2xl border border-primary flex-1 min-h-0 gap-4.5">
          <div className="flex flex-col items-center gap-2.75">
            <p className="h1 text-primary">
              음어그님, 면접 분석이 완료되었어요!
            </p>
            <p className="p1 text-gray-1">
              생성된 리포트는{' '}
              <span className="text-primary cursor-pointer">연습 이력</span>{' '}
              에서 저장되었습니다.
            </p>
          </div>

          <Image
            src={analysisImg}
            alt="분석 완료"
            width={362}
            height={304}
            className="object-contain mt-0.5"
          />

          <Button
            className="rounded-full! py-3! px-18.25! mt-3.5"
            onClick={() => router.push('/history')}
          >
            <span className="h3">리포트 보러가기</span>
          </Button>
        </div>
      </section>
    )
  }

  return (
    <section className="flex flex-col flex-1 min-h-0 gap-5 px-10 pt-6.5 pb-10">
      <h1 className="h1 w-full">면접 연습 분석</h1>

      <div className="flex flex-col items-center justify-center w-full min-w-200 bg-secondary rounded-2xl border border-primary flex-1 min-h-0 gap-4.5">
        <div className="flex flex-col items-center gap-2">
          <p className="h1 text-primary">음어그님, 면접 보느라 수고하셨어요!</p>
          <div className="flex flex-col items-center">
            <p className="p1 text-gray-1">
              리포트 결과는 10분 정도 소요 될 수 있습니다.
            </p>
            <p className="p1 text-gray-1">
              페이지를 벗어나도 분석은 중단되지 않으며,{' '}
              <span className="text-primary cursor-pointer">연습 이력</span>{' '}
              에서 확인하실 수 있습니다.
            </p>
          </div>
        </div>

        <Image
          src={robotImg}
          alt="분석 중"
          width={437}
          height={267}
          className="object-contain"
        />

        <div className="flex flex-col items-center gap-3.25 w-172.5">
          <div className="w-full h-2 bg-gray-5 rounded-full overflow-hidden">
            <div
              className="h-full bg-primary rounded-full transition-all duration-500 ease-linear"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="p3 text-gray-4">{MESSAGES[messageIndex]}</p>
        </div>

        <Button
          variant="primary"
          className="rounded-full! py-3! px-15.5! mt-4.75"
          onClick={() => router.push('/interview')}
        >
          <span className="h3 text-white">다른 면접 진행하기</span>
        </Button>
      </div>
    </section>
  )
}
