import type { Metadata } from 'next'
import HistorySection from '@/components/history/HistorySection'

export const metadata: Metadata = {
  title: '연습 이력',
  description: '지난 면접 연습 기록을 확인하세요.',
}

export default function HistoryPage() {
  return (
    <div className="flex-1 min-h-0 flex flex-col overflow-hidden pb-10">
      <HistorySection />
    </div>
  )
}
