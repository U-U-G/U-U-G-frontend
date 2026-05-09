import type { Metadata } from 'next'
import RankingSection from '@/components/ranking/RankingSection'

export const metadata: Metadata = {
  title: '랭킹',
  description: '다른 사용자들과 면접 점수를 비교해보세요.',
}

export default function RankingPage() {
  return <RankingSection />
}
