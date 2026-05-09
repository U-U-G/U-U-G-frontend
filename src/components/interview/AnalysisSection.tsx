'use client'

import { useState, useEffect, useRef, useCallback, useMemo } from 'react'
import Image from 'next/image'
import { useRouter, useParams } from 'next/navigation'
import robotImg from '@/assets/image/uug-character4-img.png'
import analysisImg from '@/assets/image/analysis-img.png'
import Link from 'next/link'
import Button from '@/components/common/button/Button'
import { createInterviewSessionEventSource } from '@/apis/interview-sessions'
import {
  SSE_EVENT_SESSION_ANALYSIS_DONE,
  SSE_EVENT_ERROR,
} from '@/apis/interview-sessions/sse'
import { getInterviewReport } from '@/apis/interview-reports'

const BASE_MESSAGES = [
  '꼼꼼하게 분석 중이에요. 조금만 기다려주세요...',
  '곧 나만의 맞춤 면접 리포트가 완성됩니다...',
]

function buildMessages(companyName: string, position: string) {
  const first =
    companyName && position
      ? `${companyName} ${position} 면접 결과 분석중 ...`
      : '면접 결과 분석중 ...'
  return [first, ...BASE_MESSAGES]
}

const MESSAGE_INTERVAL = 4000
const PROGRESS_INTERVAL = 600
const MAX_PROGRESS = 92
const POLL_INTERVAL_MS = 5000

export default function AnalysisSection() {
  const router = useRouter()
  const { uuid } = useParams<{ uuid: string }>()
  const [progress, setProgress] = useState(0)
  const [messageIndex, setMessageIndex] = useState(0)
  const [isComplete, setIsComplete] = useState(false)
  const [isFailed, setIsFailed] = useState(false)
  const pollRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const messages = useMemo(() => {
    try {
      const raw = sessionStorage.getItem(`interview-meta-${uuid}`)
      const { companyName = '', position = '' } = raw ? JSON.parse(raw) : {}
      return buildMessages(companyName, position)
    } catch {
      return buildMessages('', '')
    }
  }, [uuid])

  const markComplete = useCallback(() => {
    if (pollRef.current) {
      clearInterval(pollRef.current)
      pollRef.current = null
    }
    setProgress(100)
    setIsComplete(true)
  }, [])

  const markFailed = useCallback(() => {
    if (pollRef.current) {
      clearInterval(pollRef.current)
      pollRef.current = null
    }
    setIsFailed(true)
  }, [])

  const startPolling = useCallback(() => {
    if (pollRef.current) return
    pollRef.current = setInterval(async () => {
      try {
        const result = await getInterviewReport(uuid)
        if (result.status === 200) {
          markComplete()
        }
        // 202 → keep polling
      } catch {
        markFailed()
      }
    }, POLL_INTERVAL_MS)
  }, [uuid, markComplete, markFailed])

  useEffect(() => {
    let streamFinished = false
    const controller = new AbortController()

    const progressTimer = setInterval(() => {
      setProgress((p) => (p < MAX_PROGRESS ? p + 1 : p))
    }, PROGRESS_INTERVAL)

    startPolling()

    createInterviewSessionEventSource(uuid, {
      signal: controller.signal,

      onmessage(ev) {
        if (streamFinished) return

        if (ev.event === SSE_EVENT_SESSION_ANALYSIS_DONE) {
          streamFinished = true
          controller.abort()
          clearInterval(progressTimer)
          markComplete()
          return
        }

        if (ev.event === SSE_EVENT_ERROR) {
          streamFinished = true
          controller.abort()
          clearInterval(progressTimer)
          markFailed()
          return
        }
      },

      onerror(err) {
        throw err
      },
    }).catch(() => {
      clearInterval(progressTimer)
      if (streamFinished || controller.signal.aborted) return
      startPolling()
    })

    return () => {
      streamFinished = true
      controller.abort()
      clearInterval(progressTimer)
      if (pollRef.current) {
        clearInterval(pollRef.current)
        pollRef.current = null
      }
    }
  }, [uuid, markComplete, markFailed, startPolling])

  useEffect(() => {
    if (isComplete || isFailed) return
    const timer = setInterval(() => {
      setMessageIndex((i) => (i + 1) % messages.length)
    }, MESSAGE_INTERVAL)
    return () => clearInterval(timer)
  }, [isComplete, isFailed, messages.length])

  if (isFailed) {
    return (
      <section className="flex flex-col flex-1 min-h-0 gap-5 px-10 pt-6.5 pb-10">
        <h1 className="h1 w-full">면접 연습 분석</h1>

        <div className="flex flex-col items-center justify-center w-full min-w-200 bg-secondary rounded-2xl border border-primary flex-1 min-h-0 gap-4.5">
          <p className="h1 text-text-point-red">분석에 실패했어요</p>
          <p className="p1 text-gray-1">연습 이력에서 다시 확인해주세요.</p>
          <Button
            className="rounded-full! py-3! px-15.5! mt-4.75"
            onClick={() => router.push('/interview')}
          >
            <span className="h3 text-white">돌아가기</span>
          </Button>
        </div>
      </section>
    )
  }

  if (isComplete) {
    return (
      <section className="flex flex-col flex-1 min-h-0 gap-5 px-10 pt-6.5 pb-10">
        <h1 className="h1 w-full">면접 연습 분석</h1>

        <div className="flex flex-col items-center justify-center w-full min-w-200 bg-secondary rounded-2xl border border-primary flex-1 min-h-0 gap-4.5">
          <div className="flex flex-col items-center gap-2.75">
            <p className="h1 text-primary">면접 분석이 완료되었어요!</p>
            <p className="p1 text-gray-1">
              생성된 리포트는{' '}
              <Link href="/history" className="text-primary">
                연습 이력
              </Link>{' '}
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
            onClick={() => router.push(`/history/${uuid}`)}
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
          <p className="h1 text-primary">면접 보느라 수고하셨어요!</p>
          <div className="flex flex-col items-center">
            <p className="p1 text-gray-1">
              리포트 결과는 10분 정도 소요 될 수 있습니다.
            </p>
            <p className="p1 text-gray-1">
              페이지를 벗어나도 분석은 중단되지 않으며,{' '}
              <Link href="/history" className="text-primary">
                연습 이력
              </Link>{' '}
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
          <p className="p3 text-gray-4">{messages[messageIndex]}</p>
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
