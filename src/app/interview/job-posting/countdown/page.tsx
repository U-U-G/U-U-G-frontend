import { notFound } from 'next/navigation'
import Header from '@/components/common/header/Header'
import CountdownSection from '@/components/interview/CountdownSection'
import { interviewMockData } from '@/mocks/interviewMockData'

export default async function CountdownPage({
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
      <CountdownSection questionNumber={questionNumber} />
    </main>
  )
}
