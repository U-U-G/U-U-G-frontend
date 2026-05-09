import { notFound } from 'next/navigation'
import CountdownSection from '@/components/interview/CountdownSection'
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
