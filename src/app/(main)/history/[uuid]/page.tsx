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
    <div className="flex-1 min-h-0 flex flex-col pt-6">
      <HistoryDetailContent uuid={uuid} attempt={attempt} />
    </div>
  )
}
