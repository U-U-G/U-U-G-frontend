import type { Metadata } from 'next'
import CompleteSection from '@/components/interview/CompleteSection'
import { TOTAL_QUESTIONS } from '@/utils/interview'

export const metadata: Metadata = {
  title: '면접 완료',
  description: '면접이 완료되었어요. 결과를 확인해보세요.',
}

export default async function CompletePage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>
}) {
  const { q } = await searchParams
  const currentQuestion = Math.max(1, parseInt(q ?? '1', 10) || 1)

  return (
    <CompleteSection
      currentQuestion={currentQuestion}
      totalQuestions={TOTAL_QUESTIONS}
    />
  )
}
