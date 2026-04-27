import { notFound } from 'next/navigation'
import Header from '@/components/common/header/Header'
import QuestionSection from '@/components/interview/QuestionSection'
import { interviewMockData } from '@/mocks/interviewMockData'

export default async function QuestionPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>
}) {
  const { q } = await searchParams
  const questionNumber = parseInt(q ?? '', 10)
  if (
    isNaN(questionNumber) ||
    questionNumber < 1 ||
    questionNumber > interviewMockData.questions.length
  ) {
    notFound()
  }

  return (
    <main className="h-screen flex flex-col overflow-hidden">
      <Header />
      <QuestionSection questionNumber={questionNumber} />
    </main>
  )
}
