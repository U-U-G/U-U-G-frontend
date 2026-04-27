import Header from '@/components/common/header/Header'
import CountdownSection from '@/components/interview/CountdownSection'

export default async function CountdownPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>
}) {
  const { q } = await searchParams
  const questionNumber = Math.max(1, parseInt(q ?? '1', 10) || 1)

  return (
    <main className="h-screen flex flex-col overflow-hidden">
      <Header />
      <CountdownSection questionNumber={questionNumber} />
    </main>
  )
}
