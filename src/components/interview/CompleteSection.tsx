'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'
import checkImg from '@/assets/image/check-img.png'
import Button from '@/components/common/button/Button'

interface CompleteSectionProps {
  currentQuestion: number
  totalQuestions: number
}

export default function CompleteSection({
  currentQuestion,
  totalQuestions,
}: CompleteSectionProps) {
  const router = useRouter()
  const isLast = currentQuestion >= totalQuestions
  const nextQuestion = currentQuestion + 1

  function handleNext() {
    if (isLast) {
      router.push('/interview/job-posting/analysis')
    } else {
      router.push(`/interview/job-posting/countdown?q=${nextQuestion}`)
    }
  }

  return (
    <section className="flex flex-col flex-1 min-h-0 gap-5 px-10 pt-6.5 pb-10">
      <h1 className="h1 w-full">공고 맞춤 면접 연습</h1>

      <div className="flex flex-col items-center justify-center w-full min-w-200 bg-secondary rounded-2xl border border-primary flex-1 min-h-0 gap-5.5">
        <Image
          src={checkImg}
          alt="완료"
          width={128}
          height={113}
          className="object-contain"
        />
        <div className="flex flex-col items-center gap-3.25">
          <p className="h1">수고하셨습니다</p>
          <p className="p3 text-gray-2">
            {isLast ? '면접이 모두 끝났습니다.' : '다음 질문으로 넘어가주세요.'}
          </p>
        </div>
        <Button
          className="rounded-full! py-3! px-16! mt-11"
          onClick={handleNext}
        >
          <span className="h3">
            {isLast
              ? '결과 보기'
              : `다음 질문 ${nextQuestion}/${totalQuestions}`}
          </span>
        </Button>
      </div>
    </section>
  )
}
