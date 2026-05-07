'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { useMutation, useQuery } from '@tanstack/react-query'
import {
  startInterviewSession,
  getInterviewQuestions,
} from '@/apis/interview-sessions'
import Button from '@/components/common/button/Button'

import { TOTAL_QUESTIONS } from '@/utils/interview'

const TOTAL = TOTAL_QUESTIONS
const RADIUS = 54
const CIRCUMFERENCE = 2 * Math.PI * RADIUS

interface CountdownSectionProps {
  questionNumber: number
}

export default function CountdownSection({
  questionNumber,
}: CountdownSectionProps) {
  const router = useRouter()
  const { uuid } = useParams<{ uuid: string }>()
  const [count, setCount] = useState(TOTAL)
  const [startFailed, setStartFailed] = useState(false)
  const startedRef = useRef(false)

  const startMutation = useMutation({
    mutationFn: () => startInterviewSession(uuid),
    onError: () => setStartFailed(true),
  })

  useEffect(() => {
    if (questionNumber !== 1 || startedRef.current) return
    startedRef.current = true
    startMutation.mutate()
  }, [questionNumber, startMutation.mutate])

  const { data: questions } = useQuery({
    queryKey: ['interview-questions', uuid, questionNumber],
    queryFn: () => getInterviewQuestions(uuid, questionNumber),
  })

  const question = questions?.[0]

  useEffect(() => {
    if (!question) return
    if (count === 0) {
      router.push(`/interview/job-posting/${uuid}/question?q=${questionNumber}`)
      return
    }
    const timer = setTimeout(() => setCount((c) => c - 1), 1000)
    return () => clearTimeout(timer)
  }, [count, question, router, uuid, questionNumber])

  const dashOffset = CIRCUMFERENCE * ((TOTAL - count) / TOTAL)

  if (startFailed) {
    return (
      <section className="flex flex-col flex-1 min-h-0 gap-5 px-10 pt-6.5 pb-10">
        <h1 className="h1 w-full">공고 맞춤 면접 연습</h1>
        <div className="flex flex-col items-center justify-center w-full min-w-200 bg-secondary rounded-2xl border border-primary flex-1 min-h-0 gap-4.5">
          <p className="h1 text-text-point-red">면접 시작에 실패했어요</p>
          <p className="p1 text-gray-1">잠시 후 다시 시도해주세요.</p>
          <Button
            className="rounded-full! py-3! px-15.5! mt-4.75"
            onClick={() => router.push('/interview')}
          >
            <span className="h3">돌아가기</span>
          </Button>
        </div>
      </section>
    )
  }

  return (
    <section className="flex flex-col flex-1 min-h-0 gap-5 px-10 pt-6.5 pb-10">
      <h1 className="h1 w-full">공고 맞춤 면접 연습</h1>

      <div className="flex flex-col items-center justify-center w-full min-w-200 bg-secondary rounded-2xl border border-primary flex-1 min-h-0 gap-6 px-12">
        <div className="flex flex-col items-center gap-4">
          <span className="bg-primary text-white h4 px-4.25 py-0.75 rounded-full">
            질문 {questionNumber}
          </span>
          <p className="h1">{question?.content ?? ''}</p>
        </div>

        <div className="relative w-50 h-50">
          <svg className="w-full h-full rotate-90" viewBox="0 0 120 120">
            <circle
              cx="60"
              cy="60"
              r={RADIUS}
              fill="white"
              stroke="#663cff"
              strokeWidth="4"
              strokeLinecap="round"
              strokeDasharray={CIRCUMFERENCE}
              strokeDashoffset={dashOffset}
              style={{ transition: 'stroke-dashoffset 1s linear' }}
            />
          </svg>
          <span className="absolute inset-0 flex items-center justify-center text-[5rem] font-medium text-primary">
            {count}
          </span>
        </div>
      </div>
    </section>
  )
}
