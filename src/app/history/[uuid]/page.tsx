import Header from '@/components/common/header/Header'
import HistoryDetailContent from '@/components/history/HistoryDetailContent'

export default async function HistoryDetailPage({
  params,
  searchParams,
}: {
  params: Promise<{ uuid: string }>
  searchParams: Promise<{ attempt?: string }>
}) {
  const { uuid } = await params
  const { attempt } = await searchParams

  return (
    <main className="h-screen flex flex-col overflow-hidden px-6 gap-6">
      <Header />
      <HistoryDetailContent uuid={uuid} attempt={attempt} />
    </main>
  )
}
