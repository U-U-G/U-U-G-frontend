import { notFound } from 'next/navigation'
import Header from '@/components/common/header/Header'
import QuestionSection from '@/components/interview/QuestionSection'
import { parseQuestionNumber } from '@/utils/interview'

export default async function QuestionPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>
}) {
  const { q } = await searchParams
  const questionNumber = parseQuestionNumber(q)
  if (questionNumber === null) notFound()

  return (
    <main className="h-screen flex flex-col overflow-hidden">
      <Header />
      <QuestionSection questionNumber={questionNumber} />
    </main>
  )
}
