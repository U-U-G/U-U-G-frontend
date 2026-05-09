import type { Metadata } from 'next'
import HistoryDetailContent from '@/components/history/HistoryDetailContent'

export const metadata: Metadata = {
  title: '리포트',
  description: '면접 연습 결과와 피드백을 상세히 확인하세요.',
}

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
