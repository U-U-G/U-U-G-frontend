import Header from '@/components/common/header/Header'
import CompleteSection from '@/components/interview/CompleteSection'
import { TOTAL_QUESTIONS } from '@/utils/interview'

export default async function CompletePage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>
}) {
  const { q } = await searchParams
  const currentQuestion = Math.max(1, parseInt(q ?? '1', 10) || 1)

  return (
    <main className="h-screen flex flex-col overflow-hidden">
      <Header />
      <CompleteSection
        currentQuestion={currentQuestion}
        totalQuestions={TOTAL_QUESTIONS}
      />
    </main>
  )
}
