'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { interviewMockData } from '@/mocks/interviewMockData'

const TOTAL = 5
const RADIUS = 54
const CIRCUMFERENCE = 2 * Math.PI * RADIUS

interface CountdownSectionProps {
  questionNumber: number
}

export default function CountdownSection({
  questionNumber,
}: CountdownSectionProps) {
  const router = useRouter()
  const [count, setCount] = useState(TOTAL)

  const question = interviewMockData.questions[questionNumber - 1]!

  useEffect(() => {
    if (count === 0) {
      router.push(`/interview/job-posting/question?q=${questionNumber}`)
      return
    }
    const timer = setTimeout(() => setCount((c) => c - 1), 1000)
    return () => clearTimeout(timer)
  }, [count, router, questionNumber])

  const dashOffset = CIRCUMFERENCE * ((TOTAL - count) / TOTAL)

  return (
    <section className="flex flex-col flex-1 min-h-0 gap-5 px-10 pt-6.5 pb-10">
      <h1 className="h1 w-full">공고 맞춤 면접 연습</h1>

      <div className="flex flex-col items-center justify-center w-full min-w-200 bg-secondary rounded-2xl border border-primary flex-1 min-h-0 gap-6">
        <div className="flex flex-col items-center gap-4">
          <span className="bg-primary text-white h4 px-4.25 py-0.75 rounded-full">
            질문 {questionNumber}
          </span>
          <p className="h1">{question.text}</p>
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
