import Header from '@/components/common/header/Header'
import QuestionSection from '@/components/interview/QuestionSection'

export default async function QuestionPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>
}) {
  const { q } = await searchParams
  const questionNumber = Math.max(1, parseInt(q ?? '1', 10) || 1)

  return (
    <main className="h-screen flex flex-col overflow-hidden">
      <Header />
      <QuestionSection questionNumber={questionNumber} />
    </main>
  )
}
