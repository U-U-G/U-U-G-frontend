import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import CountdownSection from '@/components/interview/CountdownSection'

export const metadata: Metadata = {
  title: '면접 준비',
  description: '면접을 시작하기 전 마이크를 확인하세요.',
}
import { parseQuestionNumber } from '@/utils/interview'

export default async function CountdownPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>
}) {
  const { q } = await searchParams
  const questionNumber = parseQuestionNumber(q)
  if (questionNumber === null) notFound()

  return <CountdownSection questionNumber={questionNumber} />
}
