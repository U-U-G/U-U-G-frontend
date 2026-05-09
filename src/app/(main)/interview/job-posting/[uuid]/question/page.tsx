import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import QuestionSection from '@/components/interview/QuestionSection'
import { parseQuestionNumber } from '@/utils/interview'

export const metadata: Metadata = {
  title: '면접 진행',
  description: 'AI 면접관의 질문에 답변해보세요.',
}

export default async function QuestionPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>
}) {
  const { q } = await searchParams
  const questionNumber = parseQuestionNumber(q)
  if (questionNumber === null) notFound()

  return <QuestionSection questionNumber={questionNumber} />
}
